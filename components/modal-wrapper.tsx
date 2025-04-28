'use client';

import { useRouter } from 'next/navigation';

export default function ModalWrapper() {
  const router = useRouter();
  return <div onClick={router.back} />;
}
