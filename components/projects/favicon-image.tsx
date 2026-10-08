"use client";

import { useState } from "react";

type Props = {
  src: string;
  size?: number;
  className?: string;
};

export function FaviconImage({ src, size = 16, className = "" }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
