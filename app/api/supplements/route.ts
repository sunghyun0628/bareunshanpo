import { NextRequest, NextResponse } from 'next/server';

const keywordMap: Record<string, string[]> = {
  '피로': ['피로', '에너지', '활력', '비타민B', '항산화'],
  '수면': ['수면', '긴장', '스트레스', '테아닌', '마그네슘', '신경'],
  '체지방': ['체지방', '체중', '다이어트', '지방', '혈당', '탄수화물'],
  '면역': ['면역', '항산화', '유산균', '프로바이오틱스', '아연'],
  '관절': ['관절', '뼈', '연골', '칼슘', '글루코사민', '근력'],
  '혈액': ['혈액', '혈행', '콜레스테롤', '혈압', '오메가', '혈중'],
};

// 길고 어려운 식약처 표현 → 짧고 친숙한 말
const phraseMap: { from: RegExp; to: string }[] = [
  { from: /항산화\s*작용을\s*하여\s*유해산소로부터\s*세포를?\s*보호.*/, to: '세포 보호 (항산화)' },
  { from: /결합조직\s*형성과\s*기능유지.*/, to: '피부·연골 건강' },
  { from: /철의?\s*흡수.*/, to: '철분 흡수 도움' },
  { from: /정상적인\s*면역기능.*/, to: '면역 기능 도움' },
  { from: /정상적인\s*세포분열.*/, to: '세포 분열 도움' },
  { from: /유산균\s*증식\s*및\s*유해균\s*억제.*배변활동.*/, to: '장 건강·배변 활동 도움' },
  { from: /혈소판\s*응집\s*억제를?\s*통한\s*혈액흐름.*/, to: '혈액 순환 도움' },
  { from: /식후\s*혈당상승\s*억제.*/, to: '식후 혈당 관리' },
  { from: /체내\s*에너지\s*생성.*/, to: '에너지 생성 도움' },
  { from: /탄수화물과?\s*에너지\s*대사.*/, to: '에너지 대사 도움' },
  { from: /단백질\s*및\s*아미노산\s*이용.*/, to: '단백질 활용 도움' },
  { from: /뼈의?\s*형성과\s*유지.*/, to: '뼈 건강 도움' },
  { from: /칼슘과\s*인이?\s*흡수.*/, to: '칼슘 흡수 도움' },
  { from: /기억력\s*개선.*/, to: '기억력 개선' },
  { from: /면역력\s*증진.*/, to: '면역력 증진' },
  { from: /피로\s*개선.*/, to: '피로 개선' },
];

function applyPhraseMap(text: string): string {
  for (const { from, to } of phraseMap) {
    if (from.test(text)) return to;
  }
  return text;
}

function cleanCompany(name: string): string {
  return name
    .replace(/\(주\)|\(유\)|주식회사|유한회사/g, '')
    .replace(/제\d+공장|\d+공장|세종\d+공장|본사/g, '')
    .trim();
}

function cleanFunction(text: string): string[] {
  if (!text) return [];

  let cleaned = text.replace(/\[.*?\]/g, '');

  cleaned = cleaned
    .replace(/[①②③④⑤⑥⑦⑧⑨⑩]/g, '|')
    .replace(/\(\d+\)/g, '|')
    .replace(/⑴|⑵|⑶|⑷|⑸|⑹|⑺|⑻|⑼|⑽/g, '|')
    .replace(/\d+\)\s/g, '|')
    .replace(/\d+\.\s/g, '|')
    .replace(/\//g, '|')
    .replace(/·/g, '|');

  const parts = cleaned
    .split('|')
    .map((s) => {
      let t = s.trim();
      t = t.replace(/에 도움을 줄 수 있음/g, '');
      t = t.replace(/에 필요/g, '');
      t = t.replace(/하는데|되는데/g, '');
      if (t.includes(':')) {
        const [nutrient, effect] = t.split(':');
        const shortEffect = (effect || '').split(',')[0].trim();
        t = `${nutrient.trim()} - ${shortEffect}`;
      }
      t = t.split(',')[0].trim();
      // 친숙한 표현으로 치환
      t = applyPhraseMap(t);
      // 그래도 길면 자름
      if (t.length > 20) t = t.slice(0, 20) + '…';
      return t;
    })
    .filter((s) => s.length > 2);

  return [...new Set(parts)].slice(0, 3);
}

function isMostlyKorean(text: string): boolean {
  const korean = (text.match(/[가-힣]/g) || []).length;
  const english = (text.match(/[a-zA-Z]/g) || []).length;
  return korean >= english;
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
      product: (entry.item.PRDUCT || '').trim(),
      functions: cleanFunction(entry.item.MAIN_FNCTN || ''),
    });

    const isValid = (product: string) =>
      !product.includes('키즈') &&
      !product.includes('어린이') &&
      !product.includes('아동') &&
      !product.includes('주니어') &&
      !product.includes('수출') &&
      !product.includes('export') &&
      !product.includes('Export') &&
      isMostlyKorean(product);

    let filtered = items
      .filter((entry: { item?: { MAIN_FNCTN?: string; PRDUCT?: string } }) => {
        const item = entry.item;
        if (!item) return false;
        const fnctn = item.MAIN_FNCTN || '';
        const product = item.PRDUCT || '';
        if (!isValid(product)) return false;
        return searchKeywords.some((kw) => fnctn.includes(kw) || product.includes(kw));
      })
      .slice(0, 3)
      .map(mapItem);

    if (filtered.length === 0) {
      filtered = items
        .filter((entry: { item?: { MAIN_FNCTN?: string; PRDUCT?: string } }) => entry.item?.MAIN_FNCTN && isValid(entry.item?.PRDUCT || ''))
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