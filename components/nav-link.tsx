'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const path = usePathname();
  const isActive = href === '/' ? path === '/' : path.startsWith(href);

  return (
    <Link
      href={href}
      className={`relative font-medium text-lg transition-colors duration-200 ${
        isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
      }`}
    >
      {children}
    </Link>
  );
}
