'use client';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Mail } from 'lucide-react';

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}

function KakaoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 256 256" aria-hidden="true">
      <path fill="#000000" d="M128 36C70.562 36 24 72.713 24 118c0 29.279 19.466 54.97 48.748 69.477-1.593 5.494-10.237 35.344-10.581 37.689 0 0-.207 1.762.934 2.434 1.14.672 2.483.15 2.483.15 3.272-.457 37.943-24.811 43.937-29.04 6.043.854 12.255 1.29 18.479 1.29 57.438 0 104-36.712 104-82 0-45.287-46.562-82-104-82z" />
    </svg>
  );
}

function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    signIn('resend', { email, callbackUrl });
  };

  return (
    <main
      style={{ fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif", backgroundColor: '#FAF7F2', minHeight: '100vh' }}
      className="flex flex-col"
    >
      <nav style={{ backgroundColor: 'rgba(250,247,242,0.92)', borderBottom: '1px solid #E8DDD6' }} className="px-5 md:px-8 py-4 md:py-5">
        <a href="/" className="text-lg md:text-xl font-bold" style={{ color: '#3B2314' }}>바른한포</a>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#9C7B6B' }}>로그인 / 회원가입</p>
            <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-3" style={{ color: '#3B2314' }}>
              바른한포 시작하기
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: '#7A5C4E' }}>
              간편하게 로그인하고<br />부모님 맞춤 결과를 확인하세요
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => signIn('kakao', { callbackUrl })}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-medium text-sm md:text-base hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#FEE500', color: 'rgba(0,0,0,0.85)' }}
            >
              <KakaoIcon />
              카카오로 시작하기
            </button>

            <button
              onClick={() => signIn('google', { callbackUrl })}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-medium text-sm md:text-base hover:opacity-80 transition-opacity"
              style={{ backgroundColor: '#FFFCF9', color: '#3B2314', border: '1px solid #E8DDD6' }}
            >
              <GoogleIcon />
              구글로 시작하기
            </button>
          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: '#E8DDD6' }} />
            <span className="text-xs" style={{ color: '#9C7B6B' }}>또는 이메일로</span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#E8DDD6' }} />
          </div>

          <form onSubmit={handleEmail} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소"
              className="w-full px-4 py-4 rounded-2xl text-sm md:text-base outline-none"
              style={{ backgroundColor: '#FFFCF9', color: '#3B2314', border: '1px solid #E8DDD6' }}
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-medium text-sm md:text-base hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#5C3D2E', color: '#FAF7F2', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}
            >
              <Mail size={18} strokeWidth={2} />
              {submitting ? '메일 보내는 중...' : '이메일로 로그인 링크 받기'}
            </button>
          </form>

          <p className="text-xs text-center mt-8 leading-relaxed" style={{ color: '#9C7B6B' }}>
            로그인 시 결과 저장과 구독 관리를 위한<br />최소한의 정보(이름·프로필)만 수집합니다.
          </p>

          <div className="text-center mt-8">
            <a href="/" className="text-sm hover:opacity-70 transition-opacity" style={{ color: '#9C7B6B' }}>
              ← 홈으로 돌아가기
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }} />}>
      <LoginContent />
    </Suspense>
  );
}
