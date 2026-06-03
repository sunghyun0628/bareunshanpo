import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get('keyword') || '';

  const apiKey = process.env.NEXT_PUBLIC_FOOD_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API 키가 없습니다' }, { status: 500 });
  }

  try {
    const url = `https://apis.data.go.kr/1471000/HtfsInfoService03/getHtfsItem01?serviceKey=${apiKey}&pageNo=1&numOfRows=50&type=json`;

    const res = await fetch(url, { cache: 'no-store' });

    const buffer = await res.arrayBuffer();
    const decoder = new TextDecoder('utf-8');
    const text = decoder.decode(buffer);
    const data = JSON.parse(text);

    const items = data?.body?.items || [];

    const filtered = items
      .filter((entry: { item?: { MAIN_FNCTN?: string; PRDUCT?: string } }) => {
        const item = entry.item;
        if (!item) return false;
        const fnctn = item.MAIN_FNCTN || '';
        const product = item.PRDUCT || '';
        return fnctn.includes(keyword) || product.includes(keyword);
      })
      .slice(0, 3)
      .map((entry: { item: { ENTRPS?: string; PRDUCT?: string; MAIN_FNCTN?: string; SRV_USE?: string } }) => ({
        company: entry.item.ENTRPS || '',
        product: entry.item.PRDUCT || '',
        function: entry.item.MAIN_FNCTN || '',
        usage: entry.item.SRV_USE || '',
      }));

    return new NextResponse(JSON.stringify({ items: filtered }), {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  } catch {
    return NextResponse.json({ error: 'API 호출 실패' }, { status: 500 });
  }
}