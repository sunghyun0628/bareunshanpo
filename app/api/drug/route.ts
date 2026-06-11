import { NextRequest, NextResponse } from 'next/server';

// 식품의약품안전처 의약품개요정보(e약은요) 실시간 조회
// data.go.kr DrbEasyDrugInfoService — 기존 식약처 제품 API와 동일 인증키(NEXT_PUBLIC_FOOD_API_KEY) 사용
// ※ data.go.kr에서 해당 API "활용신청"이 승인돼 있어야 동작합니다.

interface DrugItem {
  name: string;
  company: string;
  efcy: string;
  atpn: string;
  intrc: string;
  se: string;
}

function clean(text: string | undefined, max = 280): string {
  if (!text) return '';
  let t = text.replace(/\s+/g, ' ').trim();
  // 식약처 원문 앞 군더더기 제거 ("이 약은 …", "이 약을 …")
  t = t.replace(/^이 약(은|을)\s*/, '');
  return t.length > max ? t.slice(0, max) + '…' : t;
}

export async function GET(request: NextRequest) {
  const name = (request.nextUrl.searchParams.get('name') || '').trim();
  const apiKey = process.env.NEXT_PUBLIC_FOOD_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API 키가 없습니다' }, { status: 500 });
  }
  if (!name) {
    return NextResponse.json({ items: [] });
  }

  try {
    const url =
      `https://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList` +
      `?serviceKey=${apiKey}&itemName=${encodeURIComponent(name)}&type=json&numOfRows=5&pageNo=1`;

    const res = await fetch(url, { cache: 'no-store' });
    const text = await res.text();

    // 미승인/오류 시 data.go.kr이 "Forbidden" 등 비-JSON 텍스트를 반환
    if (!text.trim().startsWith('{')) {
      return NextResponse.json(
        { items: [], notReady: true, reason: text.slice(0, 100) },
        { status: 200 },
      );
    }

    const data = JSON.parse(text);
    const rawItems: Record<string, string>[] = data?.body?.items || [];

    const items: DrugItem[] = rawItems.map((it) => ({
      name: clean(it.itemName, 80),
      company: clean(it.entpName, 60),
      efcy: clean(it.efcyQesitm),
      atpn: clean(it.atpnQesitm),
      intrc: clean(it.intrcQesitm),
      se: clean(it.seQesitm),
    }));

    return new NextResponse(JSON.stringify({ items }), {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  } catch {
    return NextResponse.json({ error: 'API 호출 실패' }, { status: 500 });
  }
}
