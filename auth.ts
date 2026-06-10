import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import Resend from "next-auth/providers/resend";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "@neondatabase/serverless";

// Neon(서버리스 Postgres) 연결 풀. 실제 연결은 쿼리 시점에 lazy하게 맺어집니다.
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 환경변수 (Auth.js 자동 인식 이름 규칙):
//   소셜: AUTH_GOOGLE_ID/SECRET, AUTH_KAKAO_ID/SECRET
//   이메일(매직링크): AUTH_RESEND_KEY, 발신주소 AUTH_EMAIL_FROM
//   DB: DATABASE_URL,  서명키: AUTH_SECRET
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  providers: [
    Google,
    Kakao,
    Resend({
      // 운영에선 Resend에서 인증한 도메인 주소로 바꾸세요.
      // 도메인 인증 전에는 onboarding@resend.dev 로 본인 메일로만 발송 테스트 가능합니다.
      from: process.env.AUTH_EMAIL_FROM || "onboarding@resend.dev",
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
