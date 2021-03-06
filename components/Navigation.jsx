import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="site-navigation">
      <Link href="/">
        <a>Start</a>
      </Link>

      <Link href="/Quiz">
        <a>Quiz</a>
      </Link>
    </nav>
  );
}
