"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type Props = Omit<ImageProps, "onLoad" | "onError"> & { wrapperClassName?: string };

export function LoadingImage({ wrapperClassName = "", ...props }: Props) {
  // A different source gets a fresh loading state, even if this component is reused.
  return <ImageWithSkeleton key={String(props.src)} {...props} wrapperClassName={wrapperClassName} />;
}

function ImageWithSkeleton({ wrapperClassName, ...props }: Props) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <span className={`loading-image ${wrapperClassName}`} data-state={status}>
      {status === "loading" && <span className="skeleton loading-image-placeholder" aria-hidden="true" />}
      <Image {...props} onLoad={() => setStatus("loaded")} onError={() => setStatus("error")} />
      {status === "error" && (
        <span className="loading-image-error" role="img" aria-label={props.alt}>
          Image unavailable
        </span>
      )}
    </span>
  );
}
