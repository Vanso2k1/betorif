"use client";

import React, { useEffect, useState } from "react";

type MobileCollapseProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export default function MobileCollapse({
  title,
  subtitle,
  children,
  defaultOpen = false,
}: MobileCollapseProps) {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  // md+ always open
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");

    const sync = () => {
      setOpen(mq.matches ? true : defaultOpen);
    };

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [defaultOpen]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v: boolean) => !v)}
        className="w-full px-4 sm:px-6 py-4 flex items-start justify-between gap-4 md:cursor-default"
      >
        <div className="text-left">
          <div className="font-display text-base sm:text-lg font-semibold text-slate-900">
            {title}
          </div>
          {subtitle ? (
            <div className="mt-1 text-sm text-slate-600">{subtitle}</div>
          ) : null}
        </div>

        {/* Arrow only on mobile */}
        <span
          className={[
            "md:hidden mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-900",
            "transition-transform",
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
          aria-hidden
        >
          ▾
        </span>
      </button>

      <div className={open ? "block" : "hidden md:block"}>
        <div className="px-4 sm:px-6 pb-6">{children}</div>
      </div>
    </div>
  );
}
