export function ProjectVisual({ kind, name }: { kind: string; name: string }) {
  return (
    <figure
      className={`project-visual visual-${kind}`}
      aria-label={`${name}: illustrative project preview`}
    >
      {kind === "results" || kind === "school" ? (
        <div className="preview-window">
          <div className="preview-bar">
            <span className="preview-dot" />
            <span>
              {kind === "results" ? "Academic workspace" : "School information"}
            </span>
          </div>
          <div className="preview-content">
            <div className="preview-sidebar">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="preview-main">
              <span className="preview-caption">
                {kind === "results"
                  ? "RESULTS & REPORTS"
                  : "PRESBYTERIAN HIGH SCHOOL"}
              </span>
              <strong>
                {kind === "results" ? "A clearer view." : "A place to grow."}
              </strong>
              <div className="preview-table">
                {["Student records", "Subject marks", "Report cards"].map(
                  (x, i) => (
                    <div key={x}>
                      <span>
                        {kind === "results"
                          ? x
                          : ["Academics", "Admissions", "School news"][i]}
                      </span>
                      <span className="preview-line" />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      ) : kind === "fashion" ? (
        <div className="fashion-preview">
          <span>FLORINS</span>
          <div className="fashion-rule" />
          <strong>
            Elegance in
            <br />
            <em>every detail.</em>
          </strong>
          <span className="fashion-caption">
            A considered digital presence.
          </span>
        </div>
      ) : kind === "prediction" ? (
        <div className="prediction-preview">
          <span>MODEL → API → INTERFACE</span>
          <strong>
            From data
            <br />
            to possibility.
          </strong>
          <div className="prediction-path">
            <span>Input</span>
            <svg viewBox="0 0 100 20" aria-hidden="true">
              <path
                d="M0 10h95m-8-6 8 6-8 6"
                fill="none"
                stroke="currentColor"
              />
            </svg>
            <span>Prediction</span>
          </div>
          <small>Synthetic-data demonstration</small>
        </div>
      ) : (
        <div className="vision-preview">
          <div className="vision-frame">
            <span>Object detection</span>
            <svg viewBox="0 0 200 140" aria-hidden="true">
              <path
                d="M30 40V20h20m100 0h20v20m0 60v20h-20M50 120H30v-20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <rect
                x="75"
                y="43"
                width="50"
                height="57"
                rx="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <small>Pretrained YOLOv3-tiny</small>
          </div>
        </div>
      )}
      <figcaption>Illustrative interface concept</figcaption>
    </figure>
  );
}
