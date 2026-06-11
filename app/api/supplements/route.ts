import { NextRequest, NextResponse } from 'next/server';

const keywordMap: Record<string, string[]> = {
  '피로': ['피로', '에너지', '활력', '비타민B', '항산화'],
  '수면': ['수면', '긴장', '스트레스', '테아닌', '마그네슘', '신경'],
  '체지방': ['체지방', '체중', '다이어트', '지방', '혈당', '탄수화물'],
  '면역': ['면역', '항산화', '유산균', '프로바이오틱스', '아연'],
  '관절': ['관절', '뼈', '연골', '칼슘', '글루코사민', '근력'],
  '혈액': ['혈액', '혈행', '콜레스테롤', '혈압', '오메가', '혈중'],
};

const priorityMap: Record<string, string[]> = {
  '피로': ['에너지', '피로'],
  '수면': ['수면', '긴장', '신경'],
  '체지방': ['체지방', '혈당', '지방'],
  '면역': ['면역', '항산화'],
  '관절': ['관절', '연골', '뼈', '칼슘'],
  '혈액': ['혈액', '혈관', '혈행', '콜레스테롤', '혈압'],
};

const ingredientKeywords = [
  '오메가3', '오메가', '유산균', '프로바이오틱스', '글루코사민', '마그네슘',
  '비타민C', '비타민D', '비타민B', '종합비타민', '멀티비타민', '비타민',
  '루테인', '밀크씨슬', '코엔자임', '아연', '칼슘', '철분', '엽산',
  '홍삼', '프로폴리스', '콜라겐', '가르시니아', '크롬', '나토키나제',
  '테아닌', 'MSM', '보스웰리아', '쏘팔메토', '아르기닌', '셀레늄',
];

function extractIngredient(product: string): string | null {
  for (const ing of ingredientKeywords) {
    if (product.includes(ing)) return ing;
  }
  return null;
}

const phraseMap: { from: RegExp; to: string }[] = [
  { from: /항산화\s*작용/, to: '세포 보호 (항산화)' },
  { from: /유해산소로부터\s*세포/, to: '세포 보호 (항산화)' },
  { from: /결합조직\s*형성/, to: '피부·연골 건강' },
  { from: /철의?\s*흡수/, to: '철분 흡수 도움' },
  { from: /정상적인\s*면역/, to: '면역 기능 도움' },
  { from: /면역\s*기능/, to: '면역 기능 도움' },
  { from: /면역력\s*증진/, to: '면역력 증진' },
  { from: /정상적인\s*세포분열/, to: '세포 분열 도움' },
  { from: /유산균\s*증식/, to: '장 건강 도움' },
  { from: /유해균\s*억제/, to: '유해균 억제' },
  { from: /배변활동/, to: '배변 활동 도움' },
  { from: /장\s*건강/, to: '장 건강 도움' },
  { from: /혈소판\s*응집/, to: '혈액 순환 도움' },
  { from: /혈액\s*흐름|혈행\s*개선/, to: '혈액 순환 도움' },
  { from: /식후\s*혈당/, to: '식후 혈당 관리' },
  { from: /혈중\s*콜레스테롤/, to: '콜레스테롤 관리' },
  { from: /체지방\s*감소/, to: '체지방 감소 도움' },
  { from: /체내\s*에너지/, to: '에너지 생성 도움' },
  { from: /에너지\s*생성/, to: '에너지 생성 도움' },
  { from: /탄수화물과?\s*에너지|에너지\s*대사/, to: '에너지 대사 도움' },
  { from: /단백질\s*및\s*아미노산|단백질\s*이용/, to: '단백질 활용 도움' },
  { from: /뼈의?\s*형성|뼈\s*건강/, to: '뼈 건강 도움' },
  { from: /칼슘과\s*인|칼슘\s*흡수/, to: '칼슘 흡수 도움' },
  { from: /골다공증/, to: '뼈 건강 도움' },
  { from: /기억력/, to: '기억력 개선 도움' },
  { from: /피로\s*개선|피로\s*회복/, to: '피로 개선 도움' },
  { from: /눈\s*건강|시력/, to: '눈 건강 도움' },
  { from: /간\s*건강|간\s*기능/, to: '간 건강 도움' },
  { from: /혈압/, to: '혈압 관리 도움' },
  { from: /근력|근육/, to: '근력 유지 도움' },
  { from: /관절/, to: '관절 건강 도움' },
  { from: /연골/, to: '연골 건강 도움' },
  { from: /수면/, to: '수면 도움' },
  { from: /긴장\s*완화|스트레스/, to: '긴장 완화 도움' },
];

function toFriendly(text: string): string | null {
  for (const { from, to } of phraseMap) {
    if (from.test(text)) return to;
  }
  const t = text.trim();
  if (t.length > 0 && t.length <= 15 && !t.includes('…')) return t;
  return null;
}

function cleanCompany(name: string): string {
  return name
    .replace(/\(주\)|\(유\)|주식회사|유한회사/g, '')
    .replace(/제\d+공장|\d+공장|세종\d+공장|본사/g, '')
    .trim();
}

function cleanFunction(text: string, keyword: string): string[] {
  if (!text) return [];

  let cleaned = text.replace(/\[.*?\]/g, '');

  cleaned = cleaned
    .replace(/[①②③④⑤⑥⑦⑧⑨⑩]/g, '|')
    .replace(/\(\d+\)/g, '|')
    .replace(/⑴|⑵|⑶|⑷|⑸|⑹|⑺|⑻|⑼|⑽/g, '|')
    .replace(/\d+\)\s/g, '|')
    .replace(/\d+\.\s/g, '|')
    .replace(/\//g, '|')
    .replace(/·/g, '|')
    .replace(/,/g, '|')
    .replace(/:/g, '|');

  const rawParts = cleaned.split('|');

  const priorities = priorityMap[keyword] || [];
  rawParts.sort((a, b) => {
    const aScore = priorities.some((p) => a.includes(p)) ? 0 : 1;
    const bScore = priorities.some((p) => b.includes(p)) ? 0 : 1;
    return aScore - bScore;
  });

  const parts = rawParts
    .map((s) => toFriendly(s))
    .filter((s): s is string => s !== null);

  return [...new Set(parts)].slice(0, 3);
}

function isMostlyKorean(text: string): boolean {
  const korean = (text.match(/[가-힣]/g) || []).length;
  const english = (text.match(/[a-zA-Z]/g) || []).length;
  return korean >= english;
}

interface RealProductLike {
  company: string;
  product: string;
  functions: string[];
  title: string;
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

    const res = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(8000) });

    const buffer = await res.arrayBuffer();
    const decoder = new TextDecoder('utf-8');
    const text = decoder.decode(buffer);
    const data = JSON.parse(text);

    const items = data?.body?.items || [];

    const mapItem = (entry: { item: { ENTRPS?: string; PRDUCT?: string; MAIN_FNCTN?: string } }): RealProductLike => {
      const product = (entry.item.PRDUCT || '').trim();
      const functions = cleanFunction(entry.item.MAIN_FNCTN || '', keyword);
      const ingredient = extractIngredient(product);
      const title = ingredient && functions.length > 0
        ? `${ingredient} · ${functions[0]}`
        : (functions[0] || '건강 기능성 제품');
      return {
        company: cleanCompany(entry.item.ENTRPS || ''),
        product,
        functions,
        title,
      };
    };

    const isValid = (product: string) =>
      !product.includes('키즈') &&
      !product.includes('어린이') &&
      !product.includes('아동') &&
      !product.includes('주니어') &&
      !product.includes('수출') &&
      !product.includes('export') &&
      !product.includes('Export') &&
      isMostlyKorean(product);

    // 제목 중복 제거하면서 최대 3개 추리기
    const pickUnique = (list: RealProductLike[]): RealProductLike[] => {
      const seen = new Set<string>();
      const result: RealProductLike[] = [];
      for (const item of list) {
        if (item.functions.length === 0) continue;
        if (seen.has(item.title)) continue;
        seen.add(item.title);
        result.push(item);
        if (result.length >= 3) break;
      }
      return result;
    };

    const matched = items
      .filter((entry: { item?: { MAIN_FNCTN?: string; PRDUCT?: string } }) => {
        const item = entry.item;
        if (!item) return false;
        const fnctn = item.MAIN_FNCTN || '';
        const product = item.PRDUCT || '';
        if (!isValid(product)) return false;
        return searchKeywords.some((kw) => fnctn.includes(kw) || product.includes(kw));
      })
      .map(mapItem);

    let filtered = pickUnique(matched);

    if (filtered.length < 3) {
      const fallback = items
        .filter((entry: { item?: { MAIN_FNCTN?: string; PRDUCT?: string } }) => entry.item?.MAIN_FNCTN && isValid(entry.item?.PRDUCT || ''))
        .map(mapItem);
      // 기존 것과 합쳐서 다시 중복 제거
      filtered = pickUnique([...filtered, ...fallback]);
    }

    return new NextResponse(JSON.stringify({ items: filtered }), {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  } catch {
    return NextResponse.json({ error: 'API 호출 실패' }, { status: 500 });
  }
}