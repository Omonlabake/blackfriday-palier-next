"use client";

import { useEffect } from "react";

type Props = { message: string | null; onFin: () => void };

export default function Toast({ message, onFin }: Props) {
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(onFin, 2800);
    return () => clearTimeout(id);
  }, [message, onFin]);

  if (!message) return null;

  return (
    <div
      role="status"
      className="fixed bottom-20 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2.5 rounded-xl bg-encre px-5 py-3 text-sm font-bold text-white shadow-xl md:bottom-6"
    >
      <span className="h-2 w-2 rounded-full bg-orange" aria-hidden="true" />
      {message}
    </div>
  );
}