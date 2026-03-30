import { useState } from "react";
import { ToggleGroup } from "radix-ui";
import { SurfaceCard } from "../ui/SurfaceCard";

const feelingOptions = [
  { emoji: "😍", label: "Incrivel", value: "incrivel" },
  { emoji: "🙂", label: "Bom", value: "bom" },
  { emoji: "😐", label: "Ok", value: "ok" },
  { emoji: "😕", label: "Ruim", value: "ruim" },
  { emoji: "😵", label: "Pesado", value: "pesado" },
];

export function FeedbackPanel() {
  const [feeling, setFeeling] = useState("bom");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <SurfaceCard className="p-6 sm:p-7">
      <div>
        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--home-text)] [font-family:var(--font-mono)]">
          Como esta sua experiencia?
        </h2>
        <p className="mt-2 text-sm text-[var(--home-text-muted)]">
          Seu feedback nos ajuda a ajustar o ritmo e melhorar as proximas aulas.
        </p>
      </div>

      <form
        className="mt-7 space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <ToggleGroup.Root
          type="single"
          value={feeling}
          onValueChange={(value) => {
            if (value) {
              setFeeling(value);
              setSubmitted(false);
            }
          }}
          className="grid grid-cols-2 gap-3 md:grid-cols-5"
          aria-label="Como esta sua experiencia?"
        >
          {feelingOptions.map((option) => (
            <ToggleGroup.Item
              key={option.value}
              value={option.value}
              className="rounded-[1.35rem] border border-[var(--home-border)] bg-[rgba(255,255,255,0.02)] px-4 py-4 text-left transition hover:border-[rgba(0,255,163,0.2)] data-[state=on]:border-[rgba(0,255,163,0.32)] data-[state=on]:bg-[rgba(0,255,163,0.08)]"
            >
              <span className="block text-3xl">{option.emoji}</span>
              <span className="mt-3 block text-sm text-[var(--home-text)] [font-family:var(--font-mono)]">
                {option.label}
              </span>
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>

        <textarea
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            setSubmitted(false);
          }}
          placeholder="Conte mais sobre sua experiencia..."
          rows={4}
          className="w-full rounded-[1.35rem] border border-[var(--home-border)] bg-[rgba(255,255,255,0.03)] px-4 py-4 text-[var(--home-text)] outline-none transition placeholder:text-[var(--home-text-muted)] focus:border-[rgba(0,255,163,0.28)]"
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--home-text-muted)]">
            {submitted
              ? "Feedback salvo localmente para a proxima iteracao da interface."
              : "Selecione um sentimento e escreva o que pode melhorar."}
          </p>

          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#00ffa3_0%,#13c7ff_100%)] px-5 text-sm font-semibold text-[#04120c] transition hover:opacity-90"
          >
            Enviar feedback
          </button>
        </div>
      </form>
    </SurfaceCard>
  );
}
