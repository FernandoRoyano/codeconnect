import Image from "next/image";
import { AUTHOR_IMAGE } from "@/lib/seo";

/** Foto de Fernando. Decorativa: el nombre siempre va al lado en texto. */
export default function AuthorAvatar({ size, className = "" }: { size: number; className?: string }) {
  return (
    <Image
      src={AUTHOR_IMAGE}
      alt=""
      width={size}
      height={size}
      sizes={`${size}px`}
      className={`rounded-full object-cover flex-shrink-0 ${className}`}
    />
  );
}
