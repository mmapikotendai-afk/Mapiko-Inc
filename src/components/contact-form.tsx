"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import { services } from "@/lib/content";
import { Arrow } from "./icons";
export function ContactForm({
  configured,
  initialService,
}: {
  configured: boolean;
  initialService: string;
}) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [startedAt] = useState(() => Date.now());
  const requestKey = useRef<string | null>(null);
  const sending = useRef(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current || !configured) return;
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    sending.current = true;
    setStatus("sending");
    setError("");
    requestKey.current ??= crypto.randomUUID();
    try {
      const values = Object.fromEntries(new FormData(form));
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": requestKey.current,
        },
        body: JSON.stringify({ ...values, startedAt }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Please try again.");
      setStatus("success");
      form.reset();
      requestKey.current = null;
    } catch (e) {
      setStatus("error");
      setError(
        e instanceof Error
          ? e.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      sending.current = false;
    }
  }
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      onChange={() => {
        if (!sending.current) requestKey.current = null;
      }}
      aria-label="Project enquiry"
    >
      {!configured && (
        <div className="form-notice" role="status">
          <strong>Enquiries are not open yet.</strong>
          <p>
            Email enquiries are temporarily unavailable. Please check back once
            our contact service is ready.
          </p>
        </div>
      )}
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">
            Your name <span>(required)</span>
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={100}
            required
            placeholder="Your name"
          />
        </div>
        <div className="field">
          <label htmlFor="email">
            Email address <span>(required)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            placeholder="you@company.com"
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="organisation">
          Organisation <span>(optional)</span>
        </label>
        <input
          id="organisation"
          name="organisation"
          autoComplete="organization"
          maxLength={150}
          placeholder="Your business or institution"
        />
      </div>
      <div className="field">
        <label htmlFor="service">
          What can we help with? <span>(required)</span>
        </label>
        <select
          id="service"
          name="service"
          required
          defaultValue={initialService || ""}
        >
          <option value="" disabled>
            Select a service
          </option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
          <option value="unsure">Not sure yet — let’s work it out</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">
          Tell us about your project <span>(required)</span>
        </label>
        <textarea
          id="message"
          name="message"
          minLength={20}
          maxLength={5000}
          required
          rows={5}
          placeholder="What would you like to build or improve?"
          aria-describedby="message-hint"
        />
        <small id="message-hint">
          A few sentences about your needs is a good place to start. Please
          avoid sensitive information.
        </small>
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="budget">
            Budget range <span>(optional)</span>
          </label>
          <input
            id="budget"
            name="budget"
            maxLength={100}
            placeholder="Your range and currency"
          />
        </div>
        <div className="field">
          <label htmlFor="timeframe">
            Desired timeframe <span>(optional)</span>
          </label>
          <input
            id="timeframe"
            name="timeframe"
            maxLength={150}
            placeholder="A date, or still exploring"
          />
        </div>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input name="website" id="website" tabIndex={-1} autoComplete="off" />
      </div>
      {status === "error" && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {status === "success" && (
        <div className="form-success" role="status">
          <strong>Your enquiry has been sent.</strong>
          <p>
            Thank you for sharing your project. We’ll reply to the email address
            you provided.
          </p>
        </div>
      )}
      <button
        className="button"
        disabled={!configured || status === "sending"}
        type="submit"
      >
        {status === "sending" ? "Sending enquiry…" : "Send project enquiry"}
        <Arrow diagonal />
      </button>
      <p className="form-privacy">
        When sending is available, your details are emailed to Loom Digital to
        respond to your enquiry. This website does not save them to a database.{" "}
        <Link href="/privacy">Read our privacy policy.</Link>
      </p>
    </form>
  );
}
