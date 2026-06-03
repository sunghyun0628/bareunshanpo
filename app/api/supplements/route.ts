import { NextRequest, NextResponse } from 'next/server';

// 건강 유형별 검색 키워드 (여러 개 중 하나라도 매칭되면 표시)
const keywordMap: Record<string, string[]> = {
  '피로': ['피로', '에너지', '활력', '비타민B', '항산화', '면역'],
  '수면': ['수면', '긴장', '스트레스', '테아닌', '마그네슘', '신경'],
  '체지방': ['체지방', '체중', '다이어트', '지방', '혈당', '탄수화물'],
  '면역': ['면역', '항산화', '유산균', '프로바이오틱스', '비타민', '아연'],
  '관절': ['관절', '뼈', '연골', '칼슘', '글루코사민', '근력'],
  '혈액': ['혈액', '혈행', '콜레스테롤', '혈압', '오메가', '혈중'],
};

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

    const mapItem = (entry: { item: { ENTRPS?: string; PRDUCT?: string; MAIN_FNCTN?: string; SRV_USE?: string } }) => ({
      company: entry.item.ENTRPS || '',
      product: entry.item.PRDUCT || '',
      function: entry.item.MAIN_FNCTN || '',
      usage: entry.item.SRV_USE || '',
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

    // 키워드로 못 찾으면 대표 제품 3개라도 보여주기
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