'use client';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main
      style={{ fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif", backgroundColor: '#FAF7F2', minHeight: '100vh' }}
      className="flex flex-col items-center justify-center px-6 text-center"
    >
      <div className="max-w-sm">
        <p className="text-5xl mb-6">🌿</p>
        <h1 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#3B2314' }}>
          잠시 문제가 생겼어요
        </h1>
        <p className="text-sm leading-relaxed mb-8" style={{ color: '#7A5C4E' }}>
          일시적인 오류일 수 있어요.<br />다시 시도하거나 잠시 후 접속해주세요.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#5C3D2E', color: '#FAF7F2' }}
          >
            다시 시도
          </button>
          <a
            href="/"
            className="px-6 py-3.5 rounded-full font-medium text-sm hover:opacity-70 transition-opacity"
            style={{ border: '1px solid #C4A898', color: '#7A5C4E' }}
          >
            홈으로
          </a>
        </div>
      </div>
    </main>
  );
}
