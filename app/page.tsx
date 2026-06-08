'use client';
import { Stethoscope, Pill, Package, BatteryLow, Moon, Salad, Shield, Bone, HeartPulse, MessageCircle, Bell } from 'lucide-react';
import { Show, SignInButton, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <main style={{ fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif", backgroundColor: '#FAF7F2' }} className="text-gray-900">

      <nav style={{ backgroundColor: 'rgba(250,247,242,0.92)', borderBottom: '1px solid #E8DDD6' }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm px-5 md:px-8 py-4 md:py-5 flex items-center justify-between">
        <div className="text-lg md:text-xl font-bold" style={{ color: '#3B2314' }}>바른한포</div>
        <div className="hidden md:flex gap-10 text-sm font-medium" style={{ color: '#9C7B6B' }}>
          <a href="#about" className="hover:text-stone-900 transition-colors">서비스 소개</a>
          <a href="#how" className="hover:text-stone-900 transition-colors">이용방법</a>
          <a href="#mbti" className="hover:text-stone-900 transition-colors">건강 MBTI</a>
          <a href="#result" className="hover:text-stone-900 transition-colors">추천 결과</a>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: '#7A5C4E' }}>
                로그인
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
          <a href="/subscribe" style={{ backgroundColor: '#5C3D2E', color: '#FAF7F2' }} className="text-sm px-5 md:px-6 py-2.5 md:py-3 rounded-full font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
            구독 시작하기
          </a>
        </div>
      </nav>

      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/hero.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: '75% center',
            filter: 'brightness(1.05)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(30,18,10,0.72), rgba(30,18,10,0.45) 70%), linear-gradient(to bottom, rgba(40,25,15,0.4), rgba(40,25,15,0.65))' }}
        />
        <div className="relative z-10 flex flex-col items-center">
          <p className="text-xs md:text-sm font-semibold tracking-widest uppercase mb-6 md:mb-8" style={{ color: '#E0D2C5' }}>
            식약처 공공데이터 기반 · 시니어 헬스케어
          </p>
          <h1 className="text-5xl md:text-8xl font-bold leading-tight md:leading-none tracking-tighter mb-6 md:mb-8" style={{ color: '#FAF7F2', textShadow: '0 2px 16px rgba(0,0,0,0.45)' }}>
            하루 한 포,<br />
            <span style={{ color: '#E5C9B5' }}>건강한 습관</span>
          </h1>
          <p className="text-base md:text-xl mb-10 md:mb-12 max-w-lg leading-relaxed" style={{ color: '#EADFD5', textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}>
            부모님의 건강 상태를 분석해<br />
            딱 맞는 영양제를 매달 배송해드립니다
          </p>
          <div className="flex gap-3 md:gap-4 flex-wrap justify-center">
            <a href="/mbti" style={{ backgroundColor: '#FAF7F2', color: '#3B2314' }} className="px-8 md:px-10 py-4 md:py-5 rounded-full text-sm md:text-base font-medium hover:opacity-90 transition-opacity">
              지금 바로 시작하기
            </a>
            <a href="#about" style={{ border: '1px solid rgba(250,247,242,0.6)', color: '#FAF7F2' }} className="px-8 md:px-10 py-4 md:py-5 rounded-full text-sm md:text-base font-medium hover:opacity-70 transition-opacity">
              서비스 알아보기 →
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 md:py-32 px-6" style={{ backgroundColor: '#F2EBE3' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-4 md:mb-6" style={{ color: '#9C7B6B' }}>WHY 바른한포</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-12 md:mb-20" style={{ color: '#3B2314' }}>
            데이터가 증명하는<br />안전한 영양제
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { num: '01', Icon: Stethoscope, title: '건강 상태 분석', desc: '간단한 설문으로 부모님의 건강 유형을 파악하고 꼭 필요한 영양소를 찾아드립니다' },
              { num: '02', Icon: Pill, title: '약사 검수 처방', desc: '전문 약사가 기존 복용 약물과의 상호작용을 확인하고 안전한 조합을 설계합니다' },
              { num: '03', Icon: Package, title: '1일 1포 정기배송', desc: '매달 딱 맞는 영양제를 하루 한 포씩 소분 포장해서 정기 배송해드립니다' },
            ].map((item) => (
              <div key={item.num} className="p-8 md:p-10 rounded-3xl" style={{ backgroundColor: '#FAF7F2' }}>
                <p className="text-4xl md:text-5xl font-bold mb-4 md:mb-6" style={{ color: '#E8DDD6' }}>{item.num}</p>
                <item.Icon size={32} strokeWidth={1.5} style={{ color: '#5C3D2E' }} className="mb-4" />
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: '#3B2314' }}>{item.title}</h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: '#7A5C4E' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="py-20 md:py-32 px-6" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-4 md:mb-6" style={{ color: '#9C7B6B' }}>HOW IT WORKS</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-12 md:mb-20" style={{ color: '#3B2314' }}>
            4단계로 완성되는<br />맞춤 영양제
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: '건강 MBTI 설문', desc: '부모님의 생활 습관과 건강 고민에 대한 간단한 설문을 진행합니다' },
              { step: '02', title: '건강 유형 분석', desc: '설문 결과로 6가지 건강 유형 중 부모님께 맞는 유형을 찾아드립니다' },
              { step: '03', title: '맞춤 처방 설계', desc: '약사가 유형에 맞는 최적의 영양제 조합을 설계합니다' },
              { step: '04', title: '정기 배송 시작', desc: '매달 하루 한 포씩 소분된 영양제가 집으로 배송됩니다' },
            ].map((item) => (
              <div key={item.step} className="pt-6 md:pt-8" style={{ borderTop: '2px solid #5C3D2E' }}>
                <p className="text-4xl md:text-5xl font-bold mb-4 md:mb-6" style={{ color: '#E8DDD6' }}>{item.step}</p>
                <h3 className="text-lg font-bold mb-2 md:mb-3" style={{ color: '#3B2314' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7A5C4E' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="mbti" className="py-20 md:py-32 px-6" style={{ backgroundColor: '#F2EBE3' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-4 md:mb-6" style={{ color: '#9C7B6B' }}>건강 MBTI</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-4 md:mb-6" style={{ color: '#3B2314' }}>
            부모님의 건강 유형은<br />무엇인가요?
          </h2>
          <p className="text-sm md:text-base mb-10 md:mb-16" style={{ color: '#9C7B6B' }}>해당하는 유형을 선택하면 맞춤 영양제를 추천해드립니다</p>
          <div className="grid grid-cols-2 gap-4 md:gap-5 mb-8 md:mb-10">
            {[
              { type: '피로누적형', Icon: BatteryLow, desc: '항상 피곤하고 기운이 없는 유형' },
              { type: '수면부족형', Icon: Moon, desc: '잠을 자도 개운하지 않은 유형' },
              { type: '다이어트형', Icon: Salad, desc: '체중 관리가 고민인 유형' },
              { type: '면역강화형', Icon: Shield, desc: '잔병치레가 잦은 유형' },
              { type: '관절케어형', Icon: Bone, desc: '무릎과 관절이 아픈 유형' },
              { type: '혈관건강형', Icon: HeartPulse, desc: '혈압과 콜레스테롤이 걱정인 유형' },
            ].map((item) => (
              <a href="/mbti" key={item.type} className="block p-5 md:p-8 rounded-3xl transition-all hover:opacity-80" style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8DDD6' }}>
                <item.Icon size={32} strokeWidth={1.5} style={{ color: '#5C3D2E' }} className="mb-3 md:mb-5" />
                <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 whitespace-nowrap" style={{ color: '#3B2314' }}>{item.type}</h3>
                <p className="text-sm md:text-base" style={{ color: '#7A5C4E' }}>{item.desc}</p>
              </a>
            ))}
          </div>
          <a href="/mbti" className="block w-full text-center py-4 md:py-5 rounded-full font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: '#5C3D2E', color: '#FAF7F2' }}>
            건강 MBTI 테스트 시작하기
          </a>
        </div>
      </section>

      <section id="result" className="py-20 md:py-32 px-6" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-4 md:mb-6" style={{ color: '#9C7B6B' }}>RESULT</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-12 md:mb-20" style={{ color: '#3B2314' }}>
            이런 결과를<br />받아보실 수 있어요
          </h2>
          <div className="rounded-3xl p-6 md:p-10" style={{ border: '1px solid #E8DDD6', backgroundColor: '#FFFCF9' }}>
            <div className="flex items-center gap-4 mb-6 md:mb-8 pb-6 md:pb-8" style={{ borderBottom: '1px solid #E8DDD6' }}>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F2EBE3' }}>
                <BatteryLow size={26} strokeWidth={1.5} style={{ color: '#5C3D2E' }} />
              </div>
              <div>
                <p className="font-bold text-base md:text-lg" style={{ color: '#3B2314' }}>피로누적형 결과 예시</p>
                <p className="text-xs md:text-sm mt-1" style={{ color: '#9C7B6B' }}>건강 유형별 맞춤 분석</p>
              </div>
            </div>
            <div className="space-y-3 md:space-y-4">
              {[
                { name: '비타민B 컴플렉스', reason: '쉽게 지치지 않게 도와줘요', tag: '필수' },
                { name: '철분 + 비타민C', reason: '기운이 나도록 도와줘요', tag: '필수' },
                { name: '코엔자임Q10', reason: '몸에 활력을 더해줘요', tag: '권장' },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between p-4 md:p-5 rounded-2xl" style={{ backgroundColor: '#F2EBE3' }}>
                  <div>
                    <p className="font-bold text-sm md:text-base" style={{ color: '#3B2314' }}>{item.name}</p>
                    <p className="text-xs md:text-sm mt-1" style={{ color: '#9C7B6B' }}>{item.reason}</p>
                  </div>
                  <span className="text-xs font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-full flex-shrink-0 ml-3" style={{ backgroundColor: item.tag === '필수' ? '#5C3D2E' : '#E8DDD6', color: item.tag === '필수' ? '#FAF7F2' : '#7A5C4E' }}>
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
            <a href="/mbti" className="block w-full text-center mt-6 md:mt-8 py-4 md:py-5 rounded-full font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: '#5C3D2E', color: '#FAF7F2' }}>
              나도 맞춤 처방 받기
            </a>
          </div>
        </div>
      </section>

      <section id="pharmacist" className="py-20 md:py-32 px-6" style={{ backgroundColor: '#F2EBE3' }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-6" style={{ backgroundColor: '#E8DDD6', color: '#7A5C4E' }}>
            준비 중 · 오픈 예정
          </span>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-4 md:mb-6" style={{ color: '#3B2314' }}>
            약사가 직접<br />봐드릴 예정이에요
          </h2>
          <p className="text-sm md:text-base mb-12 md:mb-16 max-w-xl mx-auto leading-relaxed" style={{ color: '#9C7B6B' }}>
            여러 영양제, 혹시 드시는 약과 부딪히진 않을까 걱정되셨죠?<br className="hidden md:block" />
            전문 약사가 안전하게 봐드리는 1:1 상담을 곧 제공할 예정입니다.
          </p>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-12 text-left">
            {[
              { Icon: Pill, title: '약물 상호작용 확인', desc: '복용 중인 약과 영양제가 부딪히지 않는지 약사가 확인합니다' },
              { Icon: Shield, title: '안전한 조합 설계', desc: '건강 유형에 맞춰 과하지 않은 안전한 조합을 설계합니다' },
              { Icon: MessageCircle, title: '1:1 질문', desc: '궁금한 점은 약사에게 직접 물어보고 답을 받을 수 있습니다' },
            ].map((item) => (
              <div key={item.title} className="p-6 md:p-8 rounded-3xl" style={{ backgroundColor: '#FFFCF9', border: '1px solid #E8DDD6' }}>
                <item.Icon size={28} strokeWidth={1.5} style={{ color: '#5C3D2E' }} className="mb-4" />
                <h3 className="text-base md:text-lg font-bold mb-2" style={{ color: '#3B2314' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7A5C4E' }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 rounded-full font-medium" style={{ backgroundColor: '#E8DDD6', color: '#7A5C4E' }}>
            <Bell size={18} strokeWidth={1.5} />
            약사 상담은 오픈 준비 중이에요
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 text-center" style={{ backgroundColor: '#3B2314' }}>
        <p className="text-xs font-bold tracking-widest uppercase mb-6 md:mb-8" style={{ color: '#9C7B6B' }}>GET STARTED</p>
        <h2 className="text-4xl md:text-6xl font-bold leading-tight md:leading-none tracking-tighter mb-4 md:mb-6" style={{ color: '#FAF7F2' }}>
          지금 바로<br />시작해보세요
        </h2>
        <p className="mb-10 md:mb-12 text-base md:text-lg" style={{ color: '#9C7B6B' }}>부모님께 드리는 가장 과학적인 선물</p>
        <a href="/subscribe" className="inline-block px-10 md:px-12 py-4 md:py-5 rounded-full text-sm md:text-base font-bold hover:opacity-90 transition-opacity" style={{ backgroundColor: '#FAF7F2', color: '#3B2314' }}>
          구독 시작하기
        </a>
      </section>

      <footer className="py-10 md:py-12 px-6 md:px-8" style={{ borderTop: '1px solid #E8DDD6', backgroundColor: '#FAF7F2' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 md:gap-0 justify-between md:items-center">
          <div>
            <p className="font-bold text-lg mb-1" style={{ color: '#3B2314' }}>바른한포</p>
            <p className="text-sm" style={{ color: '#9C7B6B' }}>식약처 공공데이터 기반 시니어 맞춤 영양제 구독 서비스</p>
          </div>
          <p className="text-sm" style={{ color: '#9C7B6B' }}>© 2026 Book Of Job 8:7</p>
        </div>
      </footer>
    </main>
  );
}