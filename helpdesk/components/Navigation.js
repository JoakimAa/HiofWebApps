import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="nav">
      <Link href="/">
        <a>Issues</a>
      </Link>
      <Link href="/issues/create">
        <a>New Issue</a>
      </Link>
    </nav>
  )
}
