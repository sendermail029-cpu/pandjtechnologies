"use client";

import { usePagePath } from "@/lib/use-page-path";


// Renders its children everywhere except on the listed pages
export function HideOn({ paths, children }: { paths: string[]; children: React.ReactNode }) {
  const pathname = usePagePath();
  return paths.includes(pathname) ? null : <>{children}</>;
}
