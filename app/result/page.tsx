'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const results: Record<string, { emoji: string; desc: string; keyword: string; supplements: { name: string; reason: string; tag: string }[] }> = {
  피로누적형: {
    emoji: '😴',
    desc: '항상 피곤하고 기운이 없으신 부모님께 활력을 더해드리는 영양 조합입니다.',
    keyword: '피로',
    supplements: [
      { name: '비타민B 컴플렉스', reason: '쉽게 지치지 않게 도와줘요', tag: '필수' },
      { name: '철분 + 비타민C', reason: '기운이 나도록 도와줘요', tag: '필수' },
      { name: '코엔자임Q10', reason: '몸에 활력을 더해줘요', tag: '권장' },
    ],
  },
  수면부족형: {
    emoji: '😪',
    desc: '잠을 자도 개운하지 않으신 부모님의 편안한 숙면을 돕는 영양 조합입니다.',
    keyword: '수면',
    supplements: [
      { name: '마그네슘', reason: '밤에 푹 주무시도록 도와줘요', tag: '필수' },
      { name: 'L-테아닌', reason: '긴장을 풀고 편안하게 해줘요', tag: '필수' },
      { name: '비타민D', reason: '수면 리듬을 맞춰줘요', tag: '권장' },
    ],
  },
  다이어트형: {
    emoji: '🥗',
    desc: '체중 관리가 고민이신 부모님의 건강한 다이어트를 돕는 영양 조합입니다.',
    keyword: '체지방',
    supplements: [
      { name: '가르시니아', reason: '뱃살 관리에 도움을 줘요', tag: '필수' },
      { name: 'CLA', reason: '체지방을 줄이는 데 도움을 줘요', tag: '필수' },
      { name: '크롬', reason: '식후 혈당 관리를 도와줘요', tag: '권장' },
    ],
  },
  면역강화형: {
    emoji: '🛡️',
    desc: '잔병치레가 잦으신 부모님의 면역력을 키워주는 영양 조합입니다.',
    keyword: '면역',
    supplements: [
      { name: '비타민C', reason: '감기를 이겨내도록 도와줘요', tag: '필수' },
      { name: '아연', reason: '면역력을 튼튼하게 해줘요', tag: '필수' },
      { name: '유산균', reason: '장 건강과 면역을 함께 챙겨줘요', tag: '권장' },
    ],
  },
  관절케어형: {
    emoji: '🦵',
    desc: '무릎과 관절이 불편하신 부모님의 활동을 돕는 영양 조합입니다.',
    keyword: '관절',
    supplements: [
      { name: '글루코사민', reason: '관절을 부드럽게 해줘요', tag: '필수' },
      { name: '칼슘 + 비타민K', reason: '뼈를 튼튼하게 해줘요', tag: '필수' },
      { name: '오메가3', reason: '관절 통증을 줄이는 데 도움을 줘요', tag: '권장' },
    ],
  },
  혈관건강형: {
    emoji: '❤️',
    desc: '혈압과 콜레스테롤이 걱정이신 부모님의 혈관 건강을 돕는 영양 조합입니다.',
    keyword: '혈액',
    supplements: [
      { name: '오메가3', reason: '혈관을 깨끗하게 도와줘요', tag: '필수' },
      { name: '코엔자임Q10', reason: '심장 건강을 지켜줘요', tag: '필수' },
      { name: '나토키나제', reason: '피가 잘 돌도록 도와줘요', tag: '권장' },
    ],
  },
};

interface RealProduct {
  company: string;
  product: string;
  functions: string[];
}

function ResultContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || '피로누적형';
  const result = results[type] || results['피로누적형'];

  const [realProducts, setRealProducts] = useState<RealProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(`/api/supplements?keyword=${encodeURIComponent(result.keyword)}`);
        const data = await res.json();
        setRealProducts(data.items || []);
      } catch {
        setRealProducts([]);
      }
      setLoading(false);
    }
    fetchProducts();
  }, [result.keyword]);

  return (
    <main style={{ fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif", backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      <nav style={{ backgroundColor: 'rgba(250,247,242,0.92)', borderBottom: '1px solid #E8DDD6' }} className="px-8 py-5 flex items-center justify-between">
        <a href="/" className="text-xl font-bold" style={{ color: '#3B2314' }}>바른한포</a>
        <a href="/mbti" className="text-sm" style={{ color: '#9C7B6B' }}>다시 테스트하기</a>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-sm font-bold tracking-widest uppercase mb-6" style={{ color: '#9C7B6B' }}>
          건강 MBTI 결과
        </p>

        <div className="text-center py-12 rounded-3xl mb-8" style={{ backgroundColor: '#F2EBE3' }}>
          <p className="text-6xl mb-4">{result.emoji}</p>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#3B2314' }}>{type}</h1>
          <p className="text-base leading-relaxed px-6" style={{ color: '#7A5C4E' }}>{result.desc}</p>
        </div>

        <h2 className="text-2xl font-bold mb-6" style={{ color: '#3B2314' }}>맞춤 영양제 추천</h2>
        <div className="space-y-4 mb-12">
          {result.supplements.map((item) => (
            <div key={item.name} className="flex items-center justify-between p-6 rounded-2xl" style={{ backgroundColor: '#FFFCF9', border: '1px solid #E8DDD6' }}>
              <div>
                <p className="font-bold mb-1" style={{ color: '#3B2314' }}>{item.name}</p>
                <p className="text-sm" style={{ color: '#9C7B6B' }}>{item.reason}</p>
              </div>
              <span className="text-xs font-bold px-4 py-2 rounded-full" style={{
                backgroundColor: item.tag === '필수' ? '#5C3D2E' : '#E8DDD6',
                color: item.tag === '필수' ? '#FAF7F2' : '#7A5C4E'
              }}>
                {item.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-bold" style={{ color: '#3B2314' }}>식약처 인증 제품</h2>
          <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#E8DDD6', color: '#7A5C4E' }}>
            공공데이터 연동
          </span>
        </div>
        <p className="text-sm mb-6" style={{ color: '#9C7B6B' }}>
          {result.keyword === '체지방' ? '체중 관리' : result.keyword}에 도움을 주는 식약처 인증 제품을 찾았어요. 카드를 누르면 제품 정보를 볼 수 있어요.
        </p>

        {loading ? (
          <div className="text-center py-12" style={{ color: '#9C7B6B' }}>제품 정보를 불러오는 중...</div>
        ) : realProducts.length > 0 ? (
          <div className="space-y-4 mb-8">
            {realProducts.map((p, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#FFFCF9', border: '1px solid #E8DDD6' }}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full text-left p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💊</span>
                        <div>
                          <p className="font-bold" style={{ color: '#3B2314' }}>
                            {p.functions[0] || '건강 기능성 제품'}
                          </p>
                          <p className="text-xs mt-1" style={{ color: '#9C7B6B' }}>식약처 인증 · 누르면 제품 정보 보기</p>
                        </div>
                      </div>
                      <span style={{ color: '#9C7B6B', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-0" style={{ borderTop: '1px solid #F2EBE3' }}>
                      <p className="text-xs mt-4 mb-1" style={{ color: '#9C7B6B' }}>{p.company}</p>
                      <p className="font-bold mb-4" style={{ color: '#3B2314' }}>{p.product}</p>
                      <div className="space-y-2">
                        {p.functions.map((fn, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span style={{ color: '#5C3D2E' }} className="font-bold flex-shrink-0">✓</span>
                            <p className="text-sm leading-relaxed" style={{ color: '#7A5C4E' }}>{fn}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 mb-8" style={{ color: '#9C7B6B' }}>관련 제품을 찾을 수 없습니다.</div>
        )}

        <a href="/subscribe" className="block w-full text-center py-5 rounded-full font-medium mb-4 hover:opacity-90 transition-opacity" style={{ backgroundColor: '#5C3D2E', color: '#FAF7F2' }}>
          이 조합으로 구독 시작하기
        </a>
        <a href="/mbti" className="block w-full text-center py-5 rounded-full font-medium hover:opacity-70 transition-opacity" style={{ border: '1px solid #C4A898', color: '#7A5C4E' }}>
          다시 테스트하기
        </a>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }} />}>
      <ResultContent />
    </Suspense>
  );
}