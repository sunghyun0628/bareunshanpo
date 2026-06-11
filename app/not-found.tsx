export default function NotFound() {
  return (
    <main
      style={{ fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif", backgroundColor: '#FAF7F2', minHeight: '100vh' }}
      className="flex flex-col items-center justify-center px-6 text-center"
    >
      <div className="max-w-sm">
        <p className="text-6xl font-bold mb-4 tracking-tight" style={{ color: '#5C3D2E' }}>404</p>
        <h1 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#3B2314' }}>
          페이지를 찾을 수 없어요
        </h1>
        <p className="text-sm leading-relaxed mb-8" style={{ color: '#7A5C4E' }}>
          주소가 바뀌었거나 사라진 페이지예요.
        </p>
        <a
          href="/"
          className="inline-block px-7 py-3.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#5C3D2E', color: '#FAF7F2' }}
        >
          홈으로 돌아가기
        </a>
      </div>
    </main>
  );
}
