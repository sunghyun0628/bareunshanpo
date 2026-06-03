'use client';
import { useState } from 'react';

const plans = [
  { id: 'basic', name: '베이직', price: '19,900', desc: '기본 영양 관리', features: ['건강 유형 분석', '기본 영양제 3종', '하루 1포 소분 배송'] },
  { id: 'standard', name: '스탠다드', price: '29,900', desc: '맞춤 집중 관리', features: ['건강 유형 심층 분석', '맞춤 영양제 5종', '하루 1포 소분 배송', '약사 1:1 상담 월 1회'], best: true },
  { id: 'premium', name: '프리미엄', price: '39,900', desc: '온 가족 건강 관리', features: ['2인 건강 분석', '각각 맞춤 영양제 5종', '하루 1포 소분 배송', '약사 1:1 상담 월 2회'] },
];

export default function SubscribePage() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    if (name && phone) {
      setStep(3);
    }
  };

  return (
    <main style={{ fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif", backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      <nav style={{ backgroundColor: 'rgba(250,247,242,0.92)', borderBottom: '1px solid #E8DDD6' }} className="px-8 py-5 flex items-center justify-between">
        <a href="/" className="text-xl font-bold" style={{ color: '#3B2314' }}>바른한포</a>
        <a href="/" className="text-sm" style={{ color: '#9C7B6B' }}>홈으로</a>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex items-center justify-center gap-2 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{
                backgroundColor: step >= s ? '#5C3D2E' : '#E8DDD6',
                color: step >= s ? '#FAF7F2' : '#9C7B6B'
              }}>
                {s}
              </div>
              {s < 3 && <div className="w-12 h-0.5" style={{ backgroundColor: step > s ? '#5C3D2E' : '#E8DDD6' }} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h1 className="text-4xl font-bold mb-3 text-center" style={{ color: '#3B2314' }}>구독 플랜 선택</h1>
            <p className="text-center mb-12" style={{ color: '#9C7B6B' }}>부모님께 맞는 플랜을 골라주세요</p>
            <div className="space-y-4 mb-8">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className="w-full text-left p-6 rounded-3xl transition-all relative"
                  style={{
                    backgroundColor: selectedPlan === plan.id ? '#F2EBE3' : '#FFFCF9',
                    border: selectedPlan === plan.id ? '2px solid #5C3D2E' : '1px solid #E8DDD6',
                  }}
                >
                  {plan.best && (
                    <span className="absolute top-6 right-6 text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#5C3D2E', color: '#FAF7F2' }}>
                      인기
                    </span>
                  )}
                  <p className="text-xl font-bold mb-1" style={{ color: '#3B2314' }}>{plan.name}</p>
                  <p className="text-sm mb-3" style={{ color: '#9C7B6B' }}>{plan.desc}</p>
                  <p className="text-2xl font-bold mb-4" style={{ color: '#3B2314' }}>
                    {plan.price}<span className="text-sm font-normal" style={{ color: '#9C7B6B' }}>원 / 월</span>
                  </p>
                  <div className="space-y-1">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <span style={{ color: '#5C3D2E' }}>✓</span>
                        <span className="text-sm" style={{ color: '#7A5C4E' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="w-full py-5 rounded-full font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: '#5C3D2E', color: '#FAF7F2' }}>
              다음 단계 →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-4xl font-bold mb-3 text-center" style={{ color: '#3B2314' }}>신청자 정보</h1>
            <p className="text-center mb-12" style={{ color: '#9C7B6B' }}>배송과 상담을 위한 정보를 입력해주세요</p>
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: '#3B2314' }}>이름</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full p-4 rounded-2xl outline-none"
                  style={{ backgroundColor: '#FFFCF9', border: '1px solid #E8DDD6', color: '#3B2314' }}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: '#3B2314' }}>연락처</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-1234-5678"
                  className="w-full p-4 rounded-2xl outline-none"
                  style={{ backgroundColor: '#FFFCF9', border: '1px solid #E8DDD6', color: '#3B2314' }}
                />
              </div>
              <div className="p-4 rounded-2xl" style={{ backgroundColor: '#F2EBE3' }}>
                <p className="text-sm" style={{ color: '#7A5C4E' }}>
                  선택한 플랜: <span className="font-bold">{plans.find((p) => p.id === selectedPlan)?.name}</span> ({plans.find((p) => p.id === selectedPlan)?.price}원/월)
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-5 rounded-full font-medium hover:opacity-70 transition-opacity" style={{ border: '1px solid #C4A898', color: '#7A5C4E' }}>
                ← 이전
              </button>
              <button
                onClick={handleSubmit}
                disabled={!name || !phone}
                className="flex-1 py-5 rounded-full font-medium transition-opacity"
                style={{ backgroundColor: name && phone ? '#5C3D2E' : '#D4B8A8', color: '#FAF7F2', cursor: name && phone ? 'pointer' : 'not-allowed' }}
              >
                신청 완료
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#3B2314' }}>신청이 완료되었어요!</h1>
            <p className="mb-2" style={{ color: '#7A5C4E' }}>{name}님, 바른한포 구독을 신청해주셔서 감사합니다.</p>
            <p className="mb-12" style={{ color: '#9C7B6B' }}>입력하신 연락처로 곧 상담 연락을 드릴게요.</p>
            <div className="p-6 rounded-3xl mb-8 text-left" style={{ backgroundColor: '#F2EBE3' }}>
              <p className="text-sm mb-2" style={{ color: '#9C7B6B' }}>신청 내역</p>
              <p className="font-bold mb-1" style={{ color: '#3B2314' }}>{plans.find((p) => p.id === selectedPlan)?.name} 플랜</p>
              <p className="text-sm" style={{ color: '#7A5C4E' }}>{plans.find((p) => p.id === selectedPlan)?.price}원 / 월</p>
              <p className="text-sm mt-3" style={{ color: '#7A5C4E' }}>신청자: {name} ({phone})</p>
            </div>
            <a href="/" className="block w-full py-5 rounded-full font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: '#5C3D2E', color: '#FAF7F2' }}>
              홈으로 돌아가기
            </a>
          </div>
        )}
      </div>
    </main>
  );
}