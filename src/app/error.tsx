"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="container page-intro">
      <h1>Something didn’t load.</h1>
      <p>
        Please try again. If the problem continues, come back a little later.
      </p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
