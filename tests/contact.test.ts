import test from "node:test";
import assert from "node:assert/strict";
import { contactSchema } from "../src/lib/contact.ts";
const valid = {
  name: "Test User",
  email: "person@example.com",
  service: "websites",
  message: "We need a website for our organisation.",
  startedAt: Date.now(),
};
test("accepts a genuine enquiry and trims names", () => {
  const result = contactSchema.parse({ ...valid, name: "  Test User  " });
  assert.equal(result.name, "Test User");
  assert.equal(result.organisation, "");
});
test("rejects bad addresses, missing messages, and unknown services", () => {
  for (const patch of [
    { email: "bad" },
    { message: "short" },
    { service: "fake" },
    { name: "" },
    { message: "x".repeat(5001) },
  ])
    assert.equal(
      contactSchema.safeParse({ ...valid, ...patch }).success,
      false,
    );
});
