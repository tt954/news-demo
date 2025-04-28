import NavLink from './nav-link';

export default function Header() {
  return (
    <header className="flex items-center justify-between no-underline m-8">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/news">News</NavLink>
      <NavLink href="/archive">Archive</NavLink>
    </header>
  );
}
