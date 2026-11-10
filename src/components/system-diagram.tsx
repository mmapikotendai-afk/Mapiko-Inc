export function SystemDiagram() {
  return (
    <figure
      className="system-figure"
      aria-label="Concept diagram: connect your idea, workflow and data to a useful digital product"
    >
      <div className="diagram-top">
        <span>From complexity</span>
        <span>to clarity</span>
      </div>
      <svg
        viewBox="0 0 640 390"
        role="img"
        aria-label="Your idea, workflow and data connect through software to a digital product"
      >
        <defs>
          <marker
            id="arrow-end"
            markerWidth="8"
            markerHeight="8"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="m0 0 6 3-6 3" fill="none" stroke="currentColor" />
          </marker>
        </defs>
        <g
          className="connection-lines"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M146 87h77q30 0 30 30v48q0 30 30 30h35" />
          <path d="M146 195h172" />
          <path d="M146 303h77q30 0 30-30v-48q0-30 30-30h35" />
          <path d="M380 195h105" markerEnd="url(#arrow-end)" />
        </g>
        <g className="diagram-nodes">
          <rect x="16" y="59" width="130" height="56" rx="5" />
          <rect x="16" y="167" width="130" height="56" rx="5" />
          <rect x="16" y="275" width="130" height="56" rx="5" />
          <rect x="318" y="163" width="64" height="64" rx="12" />
          <rect x="494" y="140" width="130" height="110" rx="7" />
        </g>
        <g className="diagram-labels">
          <text x="81" y="93">
            Your idea
          </text>
          <text x="81" y="201">
            Workflow
          </text>
          <text x="81" y="309">
            Your data
          </text>
          <text x="559" y="189">
            A useful
          </text>
          <text x="559" y="212">
            digital product
          </text>
        </g>
        <g fill="none" stroke="#e5ecff" strokeWidth="2">
          <path d="m339 185-9 10 9 10m22-20 9 10-9 10m-7-24-8 28" />
        </g>
      </svg>
      <figcaption>Conceptual workflow · Built around your needs</figcaption>
    </figure>
  );
}
