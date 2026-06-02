'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const questions = [
  {
    id: 1,
    question: '부모님이 평소에 가장 자주 느끼는 증상은 무엇인가요?',
    options: [
      { text: '항상 피곤하고 기운이 없어요', type: '피로누적형' },
      { text: '잠을 자도 개운하지 않아요', type: '수면부족형' },
      { text: '체중 조절이 잘 안 돼요', type: '다이어트형' },
      { text: '감기에 자주 걸려요', type: '면역강화형' },
      { text: '관절이나 무릎이 아파요', type: '관절케어형' },
      { text: '혈압이나 콜레스테롤이 걱정돼요', type: '혈관건강형' },
    ],
  },
  {
    id: 2,
    question: '부모님의 수면 패턴은 어떤가요?',
    options: [
      { text: '잠들기 어렵고 자주 깨요', type: '수면부족형' },
      { text: '낮에도 졸리고 피곤해요', type: '피로누적형' },
      { text: '수면은 괜찮은 편이에요', type: '혈관건강형' },
      { text: '수면이 불규칙해요', type: '다이어트형' },
      { text: '통증 때문에 잠을 못 자요', type: '관절케어형' },
      { text: '수면제를 복용하고 있어요', type: '면역강화형' },
    ],
  },
  {
    id: 3,
    question: '부모님의 식습관은 어떤가요?',
    options: [
      { text: '식욕이 없고 잘 안 드세요', type: '피로누적형' },
      { text: '야식이나 간식을 자주 드세요', type: '다이어트형' },
      { text: '채소나 과일을 잘 안 드세요', type: '면역강화형' },
      { text: '짜거나 기름진 음식을 좋아하세요', type: '혈관건강형' },
      { text: '단백질 섭취가 부족한 것 같아요', type: '관절케어형' },
      { text: '식사가 불규칙해요', type: '수면부족형' },
    ],
  },
  {
    id: 4,
    question: '부모님이 가장 걱정하시는 건강 문제는?',
    options: [
      { text: '만성 피로와 무기력감', type: '피로누적형' },
      { text: '수면의 질과 숙면', type: '수면부족형' },
      { text: '체중과 혈당 관리', type: '다이어트형' },
      { text: '면역력과 잦은 감기', type: '면역강화형' },
      { text: '관절통과 근육통', type: '관절케어형' },
      { text: '혈압과 콜레스테롤', type: '혈관건강형' },
    ],
  },
  {
    id: 5,
    question: '부모님의 활동량은 어느 정도인가요?',
    options: [
      { text: '거의 움직이지 않아요', type: '피로누적형' },
      { text: '산책 정도는 하세요', type: '혈관건강형' },
      { text: '운동하고 싶지만 관절이 아파요', type: '관절케어형' },
      { text: '운동 후 회복이 느려요', type: '수면부족형' },
      { text: '체중 때문에 운동이 힘들어요', type: '다이어트형' },
      { text: '야외활동을 즐기세요', type: '면역강화형' },
    ],
  },
];

export default function MBTIPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    if (current + 1 < questions.length) {
      setAnswers(newAnswers);
      setCurrent(current + 1);
      setSelected(null);
    } else {
      const count: Record<string, number> = {};
      newAnswers.forEach((t) => { count[t] = (count[t] || 0) + 1; });
      const resultType = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
      router.push(`/result?type=${encodeURIComponent(resultType)}`);
    }
  };

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  return (
    <main style={{ fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif", backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      <nav style={{ backgroundColor: 'rgba(250,247,242,0.92)', borderBottom: '1px solid #E8DDD6' }} className="px-8 py-5 flex items-center justify-between">
        <a href="/" className="text-xl font-bold" style={{ color: '#3B2314' }}>바른한포</a>
        <p className="text-sm" style={{ color: '#9C7B6B' }}>{current + 1} / {questions.length}</p>
      </nav>

      <div style={{ backgroundColor: '#E8DDD6', height: '4px' }}>
        <div style={{ backgroundColor: '#5C3D2E', height: '4px', width: `${progress}%`, transition: 'width 0.3s ease' }} />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-sm font-bold tracking-widest uppercase mb-6" style={{ color: '#9C7B6B' }}>
          건강 MBTI · 질문 {current + 1}
        </p>
        <h2 className="text-3xl font-bold mb-12 leading-tight" style={{ color: '#3B2314' }}>
          {q.question}
        </h2>

        <div className="space-y-4">
          {q.options.map((option) => (
            <button
              key={option.text}
              onClick={() => setSelected(option.type)}
              className="w-full text-left p-6 rounded-2xl transition-all"
              style={{
                backgroundColor: selected === option.type ? '#5C3D2E' : '#FFFCF9',
                color: selected === option.type ? '#FAF7F2' : '#3B2314',
                border: selected === option.type ? '2px solid #5C3D2E' : '1px solid #E8DDD6',
              }}
            >
              {option.text}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!selected}
          className="w-full mt-8 py-5 rounded-full font-medium"
          style={{
            backgroundColor: selected ? '#5C3D2E' : '#D4B8A8',
            color: '#FAF7F2',
            cursor: selected ? 'pointer' : 'not-allowed',
          }}
        >
          {current + 1 === questions.length ? '결과 보기' : '다음 질문 →'}
        </button>
      </div>
    </main>
  );
}