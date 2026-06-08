import { clerkMiddleware } from '@clerk/nextjs/server';

// Next.js 16: Middleware는 Proxy로 이름이 바뀌었습니다. (파일명 proxy.ts)
// 모든 페이지가 공개라 별도 보호 라우트는 없지만, Clerk이 인증 상태(로그인/로그아웃)를
// 채우려면 요청마다 미들웨어가 실행돼야 합니다.
export default clerkMiddleware();

export const config = {
  matcher: [
    // _next 내부 파일과 정적 파일(이미지/폰트 등)은 제외, 나머지 모든 경로에서 실행
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // API 라우트에서는 항상 실행
    '/(api|trpc)(.*)',
  ],
};
