import Image from "next/image";

export function BrandLogo() {
  return (
    <Image
      src="/brand/loom-digital.svg"
      alt="Loom Digital"
      width={337}
      height={108}
      className="brand-logo"
      loading="eager"
      unoptimized
    />
  );
}
