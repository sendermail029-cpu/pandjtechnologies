import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false, badge = false }: { light?: boolean; badge?: boolean }) {
  // compact white badge, for the header on navy pages
  if (badge) {
    return (
      <Link href="/" className="inline-flex items-center rounded-xl bg-white px-2.5 py-1.5 shadow-lg shadow-black/30 sm:px-3" aria-label="P & J Technologies home">
        <Image src="/logo-full.png" alt="P & J Technologies" width={598} height={115} priority className="h-8 w-auto sm:h-9" />
      </Link>
    );
  }

  if (!light) {
    return (
      <Link href="/" className="inline-flex items-center" aria-label="P & J Technologies home">
        <Image src="/logo-full.png" alt="P & J Technologies" width={598} height={115} priority className="h-11 w-auto" />
      </Link>
    );
  }

  // On dark backgrounds: the same full logo, set on a white badge so its navy lettering stays readable
  return (
    <Link href="/" className="inline-flex items-center rounded-2xl bg-white px-4 py-3 shadow-lg shadow-black/20" aria-label="P & J Technologies home">
      <Image src="/logo-full.png" alt="P & J Technologies" width={598} height={115} className="h-11 w-auto" />
    </Link>
  );
}
