import Link from 'next/link'

export default function Home() {
  return (
    <>
      <main>
        <nav>
          <ul>
            <li>
              <Link href="/providers/ethereum">ethereum-provider</Link>
              <Link href="/sign/html">sign-html</Link>
              <Link href="/auth/html">auth-html</Link>
            </li>
          </ul>
        </nav>
      </main>
    </>
  )
}
