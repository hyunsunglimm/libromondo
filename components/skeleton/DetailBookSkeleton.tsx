"use client";

import { useEffect } from "react";

export default function DetailBookSkeleton() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="border-2 border-black rounded-sm p-8 w-full">
      <div className="flex gap-8">
        <div className="animate-pulse bg-slate-300 w-1/3 rounded-lg shadow-lg shrink-0 h-[22rem]" />
        <div className="flex flex-col justify-between w-full">
          <div className="flex flex-col gap-4">
            <p className="animate-pulse bg-slate-300 w-full p-4 rounded-md" />
            <p className="animate-pulse bg-slate-300 w-full p-4 rounded-md" />
            <p className="animate-pulse bg-slate-300 w-full p-4 rounded-md" />
            <p className="animate-pulse bg-slate-300 w-full p-4 rounded-md" />
          </div>
        </div>
      </div>
      <p className="animate-pulse bg-slate-300 w-full h-72 rounded-md my-8" />
      <p className="animate-pulse bg-slate-300 w-full p-4 rounded-md" />
    </div>
  );
}
