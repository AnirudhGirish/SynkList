import Link from "next/link";

export const metadata = {
  title: "Synclist (SynkList)",
  description:
    "Synclist is a common misspelling of SynkList — the AI Command Center in WhatsApp.",
  alternates: { canonical: "/synclist" },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Synclist → SynkList</h1>
      <p className="mt-4 text-zinc-700">
        People often search <strong>Synclist</strong> when they mean{" "}
        <strong>SynkList</strong> — the AI-powered command center in WhatsApp.
      </p>
      <p className="mt-4">
        Learn more on our <Link href="/" className="underline">home page</Link>{" "}
        or see our <a href="/features" className="underline">features</a> and{" "}
        <a href="/docs" className="underline">docs</a>.
      </p>
    </main>
  );
}
