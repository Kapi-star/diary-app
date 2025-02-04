import Link from "next/link"

export default function Home() {
  return (
    <>
      <h1>日記アプリログイン</h1>
      <div>
        <Link href="/todaySummary">今日のまとめ（home）</Link>
      </div>
    </>
  );
}
