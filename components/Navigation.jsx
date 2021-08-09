import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="site-navigation">
      <Link href="/">
        <a>Start</a>
      </Link>
      <Link href="/standorte">
        <a>Standorte</a>
      </Link>
    </nav>
  );
}
