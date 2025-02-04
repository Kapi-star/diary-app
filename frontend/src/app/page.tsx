"use client";
import { useState } from 'react';
// import { useRouter } from 'next/router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const router = useRouter();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const res = await fetch('/api/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email, password }),
  //   });

  //   if (res.ok) {
  //     router.push('/todaySummary'); // ログイン後のページ
  //   } else {
  //     alert('ログイン失敗');
  //   }
  // };

  return (
    <div>
      <h2>ログイン</h2>
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}
