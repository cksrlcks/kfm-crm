import { transporter } from "@/server/transporter";

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  try {
    await transporter.sendMail({
      from: "changistory@naver.com",
      to: email,
      subject: "KFM CRM 비밀번호 재설정 메일",
      text: "KFM CRM 비밀번호 재설정 메일",
      html: `
        <p>비밀번호 재설정 링크입니다. : <a href="${resetLink}" target="_blank">비밀번호 재설정</a></p>
      `,
    });
  } catch {
    throw new Error("메일 전송 실패");
  }
}
