import Link from "next/link"

export default function Home() {
  return (
    <>
      <h1>日記アプリ</h1>
      <div>
        <Link href="/todo">Todoリスト</Link>
      </div>
      <div>
        <Link href="/diary">日記</Link>
      </div>
      <div>
        <Link href="/createDiary">日記作成</Link>
      </div>
    </>
  );
}
