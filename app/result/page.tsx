'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const results: Record<string, { emoji: string; desc: string; keyword: string; supplements: { name: string; reason: string; tag: string }[] }> = {
  피로누적형: {
    emoji: '😴',
    desc: '만성 피로와 에너지 부족이 주요 증상입니다. 비타민B군과 철분이 도움이 됩니다.',
    keyword: '피로',
    supplements: [
      { name: '비타민B 컴플렉스', reason: '에너지 대사 촉진 및 피로 회복', tag: '필수' },
      { name: '철분 + 비타민C', reason: '빈혈 예방 및 산소 운반 능력 향상', tag: '필수' },
      { name: '코엔자임Q10', reason: '세포 에너지 생성 지원', tag: '권장' },
    ],
  },
  수면부족형: {
    emoji: '😪',
    desc: '수면의 질이 낮고 숙면이 어려운 유형입니다. 마그네슘과 테아닌이 도움이 됩니다.',
    keyword: '수면',
    supplements: [
      { name: '마그네슘 300mg', reason: '근육 이완 및 수면 질 개선', tag: '필수' },
      { name: 'L-테아닌', reason: '긴장 완화 및 숙면 유도', tag: '필수' },
      { name: '비타민D 2000IU', reason: '수면 호르몬 조절 지원', tag: '권장' },
    ],
  },
  다이어트형: {
    emoji: '🥗',
    desc: '체중 관리와 대사 개선이 필요한 유형입니다. 가르시니아와 CLA가 도움이 됩니다.',
    keyword: '체지방',
    supplements: [
      { name: '가르시니아 캄보지아', reason: '지방 합성 억제 및 식욕 조절', tag: '필수' },
      { name: 'CLA 1000mg', reason: '체지방 감소 및 근육량 유지', tag: '필수' },
      { name: '크롬 피콜리네이트', reason: '혈당 조절 및 인슐린 감수성 개선', tag: '권장' },
    ],
  },
  면역강화형: {
    emoji: '🛡️',
    desc: '면역력이 약하고 잦은 감기가 걱정인 유형입니다. 비타민C와 아연이 도움이 됩니다.',
    keyword: '면역',
    supplements: [
      { name: '비타민C 1000mg', reason: '면역세포 활성화 및 항산화 작용', tag: '필수' },
      { name: '아연 15mg', reason: '면역 기능 강화 및 상처 회복', tag: '필수' },
      { name: '프로바이오틱스', reason: '장내 면역력 강화', tag: '권장' },
    ],
  },
  관절케어형: {
    emoji: '🦵',
    desc: '관절통과 근육통이 주요 고민인 유형입니다. 칼슘과 글루코사민이 도움이 됩니다.',
    keyword: '관절',
    supplements: [
      { name: '글루코사민 1500mg', reason: '연골 보호 및 관절 유연성 개선', tag: '필수' },
      { name: '칼슘 + 비타민K2', reason: '뼈 강도 유지 및 골다공증 예방', tag: '필수' },
      { name: '오메가3 1000mg', reason: '관절 염증 완화 및 통증 감소', tag: '권장' },
    ],
  },
  혈관건강형: {
    emoji: '❤️',
    desc: '혈압과 콜레스테롤 관리가 필요한 유형입니다. 오메가3와 코엔자임Q10이 도움이 됩니다.',
    keyword: '혈액',
    supplements: [
      { name: '오메가3 2000mg', reason: '중성지방 감소 및 혈관 건강 개선', tag: '필수' },
      { name: '코엔자임Q10 100mg', reason: '심장 기능 강화 및 혈압 조절', tag: '필수' },
      { name: '나토키나제', reason: '혈전 예방 및 혈액 순환 개선', tag: '권장' },
    ],
  },
};

interface RealProduct {
  company: string;
  product: string;
  function: string;
  usage: string;
}

function ResultContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || '피로누적형';
  const result = results[type] || results['피로누적형'];

  const [realProducts, setRealProducts] = useState<RealProduct[]>([]);
  const [loading, setLoading] = useState(true);

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

        {/* 실제 식약처 인증 제품 */}
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold" style={{ color: '#3B2314' }}>식약처 인증 제품</h2>
          <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#E8DDD6', color: '#7A5C4E' }}>
            공공데이터 연동
          </span>
        </div>

        {loading ? (
          <div className="text-center py-12" style={{ color: '#9C7B6B' }}>제품 정보를 불러오는 중...</div>
        ) : realProducts.length > 0 ? (
          <div className="space-y-4 mb-8">
            {realProducts.map((p, i) => (
              <div key={i} className="p-6 rounded-2xl" style={{ backgroundColor: '#FFFCF9', border: '1px solid #E8DDD6' }}>
                <p className="text-xs mb-1" style={{ color: '#9C7B6B' }}>{p.company}</p>
                <p className="font-bold mb-3" style={{ color: '#3B2314' }}>{p.product}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#7A5C4E' }}>
                  {p.function.length > 100 ? p.function.slice(0, 100) + '...' : p.function}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 mb-8" style={{ color: '#9C7B6B' }}>관련 제품을 찾을 수 없습니다.</div>
        )}

        <button className="w-full py-5 rounded-full font-medium mb-4 hover:opacity-90 transition-opacity" style={{ backgroundColor: '#5C3D2E', color: '#FAF7F2' }}>
          이 조합으로 구독 시작하기
        </button>
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