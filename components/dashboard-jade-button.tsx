"use client";

type Props = {
  section: string;
  prompt: string;
  label?: string;
  compact?: boolean;
};

export function DashboardJadeButton({ section, prompt, label = "Ask Jade", compact = false }: Props) {
  function handleClick() {
    window.dispatchEvent(
      new CustomEvent("dashboard-jade-open", {
        detail: { section, prompt },
      }),
    );

    const target = document.getElementById("jade");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={compact ? "dashboardJadeButton dashboardJadeButtonCompact" : "dashboardJadeButton"}
    >
      {label}
    </button>
  );
}
