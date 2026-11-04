"use client";

import { usePathname } from "next/navigation";

// The current page's address. When a pre-built page is refreshed in the background (ISR), the home page can
// report itself as "/index"; treat that as "/" so the navbar colour, active links and page transitions stay right.
export function usePagePath() {
  const path = usePathname() || "/";
  if (path === "/index") return "/";
  return path.endsWith("/index") ? path.slice(0, -"/index".length) : path;
}
