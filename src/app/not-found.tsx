import { PageIntro, ButtonLink } from "@/components/shared";
export default function NotFound() {
  return (
    <PageIntro
      title="A small detour."
      description="We couldn’t find that page. Let’s get you back to the work."
    >
      <ButtonLink href="/">Back to home</ButtonLink>
    </PageIntro>
  );
}
