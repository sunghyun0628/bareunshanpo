'use client';

export default function Home() {
  return (
    <main style={{ fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif", backgroundColor: '#FAF7F2' }} className="text-gray-900">

      {/* 네비게이션 */}
      <nav style={{ backgroundColor: 'rgba(250,247,242,0.92)', borderBottom: '1px solid #E8DDD6' }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm px-8 py-5 flex items-center justify-between">
        <div className="text-xl font-bold" style={{ color: '#3B2314' }}>바른한포</div>
        <div className="hidden md:flex gap-10 text-sm font-medium" style={{ color: '#9C7B6B' }}>
          <a href="#about" className="hover:text-stone-900 transition-colors">서비스 소개</a>
          <a href="#how" className="hover:text-stone-900 transition-colors">이용방법</a>
          <a href="#mbti" className="hover:text-stone-900 transition-colors">건강 MBTI</a>
          <a href="#result" className="hover:text-stone-900 transition-colors">추천 결과</a>
        </div>
        <button style={{ backgroundColor: '#5C3D2E', color: '#FAF7F2' }} className="text-sm px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
          구독 시작하기
        </button>
      </nav>

      {/* 히어로 */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <p className="text-sm font-semibold tracking-widest uppercase mb-8" style={{ color: '#9C7B6B' }}>
          공공 마이데이터 기반 · 시니어 헬스케어
        </p>
        <h1 className="text-7xl md:text-8xl font-bold leading-none tracking-tighter mb-8" style={{ color: '#3B2314' }}>
          하루 한 포,<br />
          <span style={{ color: '#D4B8A8' }}>건강한 습관</span>
        </h1>
        <p className="text-xl mb-12 max-w-lg leading-relaxed" style={{ color: '#7A5C4E' }}>
          부모님의 국가 건강검진 데이터를 분석해<br />
          딱 맞는 영양제를 매달 배송해드립니다
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <a href="/mbti" style={{ backgroundColor: '#5C3D2E', color: '#FAF7F2' }} className="px-10 py-5 rounded-full text-base font-medium hover:opacity-90 transition-opacity">
            지금 바로 시작하기
          </a>
          <a href="#about" style={{ border: '1px solid #C4A898', color: '#7A5C4E' }} className="px-10 py-5 rounded-full text-base font-medium hover:opacity-70 transition-opacity">
            서비스 알아보기 →
          </a>
        </div>

        <div className="mt-24 flex gap-16 pt-12" style={{ borderTop: '1px solid #E8DDD6' }}>
          {[
            { num: '80%', label: '60대 이상 영양제 복용률' },
            { num: '2년', label: '국가 건강검진 주기' },
            { num: '1포', label: '하루 맞춤 섭취량' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-4xl font-bold mb-2" style={{ color: '#3B2314' }}>{item.num}</p>
              <p className="text-xs" style={{ color: '#9C7B6B' }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 서비스 소개 */}
      <section id="about" className="py-32 px-6" style={{ backgroundColor: '#F2EBE3' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: '#9C7B6B' }}>WHY 바른한포</p>
          <h2 className="text-5xl font-bold leading-tight tracking-tight mb-20" style={{ color: '#3B2314' }}>
            데이터가 증명하는<br />안전한 영양제
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', icon: '🏥', title: '건강검진 데이터 분석', desc: '국민건강보험 마이데이터로 부모님의 실제 건강 수치를 과학적으로 분석합니다' },
              { num: '02', icon: '💊', title: '약사 검수 처방', desc: '전문 약사가 기존 복용 약물과의 상호작용을 확인하고 안전한 조합을 설계합니다' },
              { num: '03', icon: '📦', title: '1일 1포 정기배송', desc: '매달 딱 맞는 영양제를 하루 한 포씩 소분 포장해서 정기 배송해드립니다' },
            ].map((item) => (
              <div key={item.num} className="p-10 rounded-3xl" style={{ backgroundColor: '#FAF7F2' }}>
                <p className="text-5xl font-bold mb-6" style={{ color: '#E8DDD6' }}>{item.num}</p>
                <p className="text-3xl mb-4">{item.icon}</p>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#3B2314' }}>{item.title}</h3>
                <p className="leading-relaxed" style={{ color: '#7A5C4E' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 이용방법 */}
      <section id="how" className="py-32 px-6" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: '#9C7B6B' }}>HOW IT WORKS</p>
          <h2 className="text-5xl font-bold leading-tight tracking-tight mb-20" style={{ color: '#3B2314' }}>
            4단계로 완성되는<br />맞춤 영양제
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: '건강 데이터 연동', desc: '국민건강보험 마이데이터에 동의하고 부모님 건강검진 결과를 연동합니다' },
              { step: '02', title: '건강 MBTI 설문', desc: '생활 습관과 건강 목표에 대한 간단한 설문을 진행합니다' },
              { step: '03', title: '맞춤 처방 설계', desc: 'AI와 약사가 함께 최적의 영양제 조합을 설계합니다' },
              { step: '04', title: '정기 배송 시작', desc: '매달 하루 한 포씩 소분된 영양제가 집으로 배송됩니다' },
            ].map((item) => (
              <div key={item.step} className="pt-8" style={{ borderTop: '2px solid #5C3D2E' }}>
                <p className="text-5xl font-bold mb-6" style={{ color: '#E8DDD6' }}>{item.step}</p>
                <h3 className="text-lg font-bold mb-3" style={{ color: '#3B2314' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7A5C4E' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 건강 MBTI */}
      <section id="mbti" className="py-32 px-6" style={{ backgroundColor: '#F2EBE3' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: '#9C7B6B' }}>건강 MBTI</p>
          <h2 className="text-5xl font-bold leading-tight tracking-tight mb-6" style={{ color: '#3B2314' }}>
            부모님의 건강 유형은<br />무엇인가요?
          </h2>
          <p className="mb-16" style={{ color: '#9C7B6B' }}>해당하는 유형을 선택하면 맞춤 영양제를 추천해드립니다</p>
          <div className="grid grid-cols-2 gap-5 mb-10">
            {[
              { type: '피로누적형', emoji: '😴', desc: '항상 피곤하고 에너지가 부족한 유형' },
              { type: '수면부족형', emoji: '😪', desc: '수면의 질이 낮고 자주 깨는 유형' },
              { type: '다이어트형', emoji: '🥗', desc: '체중 관리와 대사 개선이 필요한 유형' },
              { type: '면역강화형', emoji: '🛡️', desc: '잦은 감기와 면역력 저하가 걱정인 유형' },
              { type: '관절케어형', emoji: '🦵', desc: '관절통과 근육통이 주요 고민인 유형' },
              { type: '혈관건강형', emoji: '❤️', desc: '혈압과 콜레스테롤 관리가 필요한 유형' },
            ].map((item) => (
              <a href="/mbti" key={item.type} className="block p-8 rounded-3xl transition-all hover:opacity-80" style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8DDD6' }}>
                <p className="text-4xl mb-5">{item.emoji}</p>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#3B2314' }}>{item.type}</h3>
                <p style={{ color: '#7A5C4E' }}>{item.desc}</p>
              </a>
            ))}
          </div>
          <a href="/mbti" className="block w-full text-center py-5 rounded-full font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: '#5C3D2E', color: '#FAF7F2' }}>
            건강 MBTI 테스트 시작하기
          </a>
        </div>
      </section>

      {/* 추천 결과 */}
      <section id="result" className="py-32 px-6" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: '#9C7B6B' }}>RESULT</p>
          <h2 className="text-5xl font-bold leading-tight tracking-tight mb-20" style={{ color: '#3B2314' }}>
            이런 결과를<br />받아보실 수 있어요
          </h2>
          <div className="rounded-3xl p-10" style={{ border: '1px solid #E8DDD6', backgroundColor: '#FFFCF9' }}>
            <div className="flex items-center gap-4 mb-8 pb-8" style={{ borderBottom: '1px solid #E8DDD6' }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: '#F2EBE3' }}>👴</div>
              <div>
                <p className="font-bold text-lg" style={{ color: '#3B2314' }}>홍길동님 (72세)</p>
                <p className="text-sm mt-1" style={{ color: '#9C7B6B' }}>2024년 건강검진 데이터 기반 분석</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { name: '비타민D 2000IU', reason: '검진 결과 비타민D 수치 부족 (18 ng/mL)', tag: '필수' },
                { name: '오메가3 1000mg', reason: '중성지방 수치 개선 필요 (185 mg/dL)', tag: '권장' },
                { name: '마그네슘 300mg', reason: '수면 질 개선 및 근육 경련 완화', tag: '권장' },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between p-5 rounded-2xl" style={{ backgroundColor: '#F2EBE3' }}>
                  <div>
                    <p className="font-bold" style={{ color: '#3B2314' }}>{item.name}</p>
                    <p className="text-sm mt-1" style={{ color: '#9C7B6B' }}>{item.reason}</p>
                  </div>
                  <span className="text-xs font-bold px-4 py-2 rounded-full" style={{ backgroundColor: item.tag === '필수' ? '#5C3D2E' : '#E8DDD6', color: item.tag === '필수' ? '#FAF7F2' : '#7A5C4E' }}>
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
            <a href="/mbti" className="block w-full text-center mt-8 py-5 rounded-full font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: '#5C3D2E', color: '#FAF7F2' }}>
              나도 맞춤 처방 받기
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center" style={{ backgroundColor: '#3B2314' }}>
        <p className="text-xs font-bold tracking-widest uppercase mb-8" style={{ color: '#9C7B6B' }}>GET STARTED</p>
        <h2 className="text-6xl font-bold leading-none tracking-tighter mb-6" style={{ color: '#FAF7F2' }}>
          지금 바로<br />시작해보세요
        </h2>
        <p className="mb-12 text-lg" style={{ color: '#9C7B6B' }}>부모님께 드리는 가장 과학적인 선물</p>
        <a href="/mbti" className="inline-block px-12 py-5 rounded-full text-base font-bold hover:opacity-90 transition-opacity" style={{ backgroundColor: '#FAF7F2', color: '#3B2314' }}>
          구독 시작하기
        </a>
      </section>

      {/* 푸터 */}
      <footer className="py-12 px-8" style={{ borderTop: '1px solid #E8DDD6', backgroundColor: '#FAF7F2' }}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <p className="font-bold text-lg mb-1" style={{ color: '#3B2314' }}>바른한포</p>
            <p className="text-sm" style={{ color: '#9C7B6B' }}>공공 마이데이터 기반 시니어 맞춤 영양제 구독 서비스</p>
          </div>
          <p className="text-sm" style={{ color: '#9C7B6B' }}>© 2026 Book Of Job 8:7</p>
        </div>
      </footer>
    </main>
  );
}