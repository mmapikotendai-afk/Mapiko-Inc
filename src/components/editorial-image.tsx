import { LoadingImage } from "./loading-image";

export function EditorialImage({
  subject,
  className = "",
  preload = false,
}: {
  subject: "workspace" | "connections" | "services-development";
  className?: string;
  preload?: boolean;
}) {
  const workspace = subject === "workspace";
  const development = subject === "services-development";
  return (
    <figure className={`editorial-image ${className}`}>
      <LoadingImage
        src={`/images/${subject}.webp`}
        width={development ? 1600 : 1536}
        height={development ? 640 : 1024}
        alt={
          workspace
            ? "A navy laptop, open notebook and blue pen on a sunlit wooden desk"
            : development
              ? "Hands sketching software wireframes beside a laptop displaying a dashboard"
              : "Sculptural blue ribbons converging into one navy ribbon on an ivory surface"
        }
        sizes={
          className === "services-image"
            ? "(max-width: 640px) calc(100vw - 40px), (max-width: 1100px) calc(100vw - 64px), (max-width: 1432px) calc(100vw - 112px), 1320px"
            : "(max-width: 640px) calc(100vw - 40px), (max-width: 820px) calc(100vw - 64px), (max-width: 1432px) 50vw, 640px"
        }
        preload={preload}
      />
      <figcaption>
        {workspace
          ? "Illustrative workspace"
          : development
            ? "Software planning & development"
            : "Connected possibilities"}
      </figcaption>
    </figure>
  );
}
