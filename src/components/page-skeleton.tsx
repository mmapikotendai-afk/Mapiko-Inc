type SkeletonVariant = "page" | "blog" | "article" | "contact";

function Lines() {
  return (
    <div className="skeleton-copy">
      <span className="skeleton skeleton-line" />
      <span className="skeleton skeleton-line" />
      <span className="skeleton skeleton-line skeleton-short" />
    </div>
  );
}

export function PageSkeleton({ variant = "page" }: { variant?: SkeletonVariant }) {
  return (
    <div className={`page-skeleton page-skeleton-${variant}`}>
      <p className="sr-only" role="status">Loading page…</p>
      <div aria-hidden="true" className={variant === "article" ? "container skeleton-article" : "container"}>
        <div className="page-intro skeleton-intro">
          <div className="skeleton-heading">
            <span className="skeleton skeleton-title" />
            <span className="skeleton skeleton-title skeleton-title-short" />
          </div>
          <Lines />
        </div>
        {variant === "contact" ? (
          <div className="contact-layout skeleton-contact">
            <div><span className="skeleton skeleton-subtitle" /><Lines /></div>
            <div className="skeleton-form">
              <div className="form-grid">
                <span className="skeleton skeleton-field" />
                <span className="skeleton skeleton-field" />
              </div>
              <span className="skeleton skeleton-field" />
              <span className="skeleton skeleton-field" />
              <span className="skeleton skeleton-message" />
              <span className="skeleton skeleton-button" />
            </div>
          </div>
        ) : variant === "article" ? (
          <>
            <span className="skeleton skeleton-article-image" />
            <div className="skeleton-article-copy"><Lines /><Lines /></div>
          </>
        ) : variant === "blog" ? (
          <div className="skeleton-blog-grid">
            {[0, 1].map((item) => (
              <div key={item}>
                <span className="skeleton skeleton-card-image" />
                <span className="skeleton skeleton-subtitle" />
                <Lines />
              </div>
            ))}
          </div>
        ) : (
          <div className="skeleton-rows">
            {[0, 1, 2].map((item) => (
              <div className="skeleton-row" key={item}>
                <span className="skeleton skeleton-subtitle" /><Lines />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
