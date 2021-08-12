import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="site-navigation">
      <Link href="/">
        <a>Start</a>
      </Link>

      <Link href="/historic">
        <a>Historic</a>
      </Link>
    </nav>
  );
}
