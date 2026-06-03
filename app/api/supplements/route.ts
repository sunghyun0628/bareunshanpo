import { NextRequest, NextResponse } from 'next/server';

const keywordMap: Record<string, string[]> = {
  '피로': ['피로', '에너지', '활력', '비타민B', '항산화', '면역'],
  '수면': ['수면', '긴장', '스트레스', '테아닌', '마그네슘', '신경'],
  '체지방': ['체지방', '체중', '다이어트', '지방', '혈당', '탄수화물'],
  '면역': ['면역', '항산화', '유산균', '프로바이오틱스', '비타민', '아연'],
  '관절': ['관절', '뼈', '연골', '칼슘', '글루코사민', '근력'],
  '혈액': ['혈액', '혈행', '콜레스테롤', '혈압', '오메가', '혈중'],
};

function cleanCompany(name: string): string {
  return name
    .replace(/\(주\)|\(유\)|주식회사|유한회사/g, '')
    .replace(/제\d+공장|\d+공장|세종\d+공장|본사/g, '')
    .trim();
}

function cleanFunction(text: string): string[] {
  if (!text) return [];

  let cleaned = text.replace(/\[.*?\]/g, ''); // [비타민C] 제거

  // 모든 숫자 기호를 공통 구분자(|)로 변환
  cleaned = cleaned
    .replace(/[①②③④⑤⑥⑦⑧⑨⑩]/g, '|')      // ①②③
    .replace(/\(\d+\)/g, '|')                  // (1)(2)(3)
    .replace(/⑴|⑵|⑶|⑷|⑸|⑹|⑺|⑻|⑼|⑽/g, '|')  // ⑴⑵⑶
    .replace(/\d+\.\s/g, '|')                   // 1. 2.
    .replace(/·/g, '|');                        // 가운뎃점

  const parts = cleaned
    .split('|')
    .map((s) => s.replace(/에 도움을 줄 수 있음/g, '').trim()) // 반복 문구 제거
    .map((s) => s.replace(/에 도움$/, '').trim())
    .filter((s) => s.length > 3);

  return parts.slice(0, 3);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get('keyword') || '';

  const apiKey = process.env.NEXT_PUBLIC_FOOD_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API 키가 없습니다' }, { status: 500 });
  }

  const searchKeywords = keywordMap[keyword] || [keyword];

  try {
    const url = `https://apis.data.go.kr/1471000/HtfsInfoService03/getHtfsItem01?serviceKey=${apiKey}&pageNo=1&numOfRows=100&type=json`;

    const res = await fetch(url, { cache: 'no-store' });

    const buffer = await res.arrayBuffer();
    const decoder = new TextDecoder('utf-8');
    const text = decoder.decode(buffer);
    const data = JSON.parse(text);

    const items = data?.body?.items || [];

    const mapItem = (entry: { item: { ENTRPS?: string; PRDUCT?: string; MAIN_FNCTN?: string } }) => ({
      company: cleanCompany(entry.item.ENTRPS || ''),
      product: entry.item.PRDUCT || '',
      functions: cleanFunction(entry.item.MAIN_FNCTN || ''),
    });

    let filtered = items
      .filter((entry: { item?: { MAIN_FNCTN?: string; PRDUCT?: string } }) => {
        const item = entry.item;
        if (!item) return false;
        const fnctn = item.MAIN_FNCTN || '';
        const product = item.PRDUCT || '';
        return searchKeywords.some((kw) => fnctn.includes(kw) || product.includes(kw));
      })
      .slice(0, 3)
      .map(mapItem);

    if (filtered.length === 0) {
      filtered = items
        .filter((entry: { item?: { MAIN_FNCTN?: string } }) => entry.item?.MAIN_FNCTN)
        .slice(0, 3)
        .map(mapItem);
    }

    return new NextResponse(JSON.stringify({ items: filtered }), {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  } catch {
    return NextResponse.json({ error: 'API 호출 실패' }, { status: 500 });
  }
}