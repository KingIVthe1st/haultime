"use client";

import { useMemo, useState } from "react";
import type { DashboardStateSnapshot, LeadRecord, LeadStatus } from "@/lib/dashboard-state";

const filters: Array<{ label: string; value: "all" | LeadStatus }> = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Hot", value: "hot" },
  { label: "Contacted", value: "contacted" },
  { label: "Quote", value: "quote" },
  { label: "Won", value: "won" },
];

const statusOptions: LeadStatus[] = ["new", "hot", "contacted", "quote", "won", "stale"];

function formatTime(input?: string) {
  if (!input) return "No timestamp";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(input));
}

export function DashboardCrmPanel({ initialSnapshot }: { initialSnapshot: DashboardStateSnapshot }) {
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [filter, setFilter] = useState<"all" | LeadStatus>("all");
  const [selectedId, setSelectedId] = useState(initialSnapshot.leads[0]?.id || null);
  const [saving, setSaving] = useState<string | null>(null);

  const leads = useMemo(
    () => (filter === "all" ? snapshot.leads : snapshot.leads.filter((lead) => lead.status === filter)),
    [filter, snapshot.leads],
  );

  const selectedLead = leads.find((lead) => lead.id === selectedId) || snapshot.leads.find((lead) => lead.id === selectedId) || leads[0] || null;

  async function updateLeadStatus(lead: LeadRecord, status: LeadStatus) {
    setSaving(lead.id);
    try {
      const response = await fetch(`/api/dashboard/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = (await response.json()) as LeadRecord;
      setSnapshot((current) => ({
        ...current,
        leads: current.leads.map((item) => (item.id === lead.id ? data : item)),
        leadSummary: {
          total: current.leads.length,
          hot: current.leads.map((item) => (item.id === lead.id ? data : item)).filter((item) => item.status === "hot" || item.priority === "critical").length,
          needingCallback: current.leads.map((item) => (item.id === lead.id ? data : item)).filter((item) => ["new", "hot"].includes(item.status)).length,
          quotesInFlight: current.leads.map((item) => (item.id === lead.id ? data : item)).filter((item) => item.status === "quote").length,
          wonThisBoard: current.leads.map((item) => (item.id === lead.id ? data : item)).filter((item) => item.status === "won").length,
        },
      }));
      setSelectedId(data.id);
    } finally {
      setSaving(null);
    }
  }

  return (
    <section className="crmPanelShell">
      <div className="crmSummaryGrid">
        <article className="crmSummaryCard">
          <span>Leads captured</span>
          <strong>{snapshot.leadSummary.total}</strong>
          <p>Form and chat leads land here automatically.</p>
        </article>
        <article className="crmSummaryCard">
          <span>Need callback</span>
          <strong>{snapshot.leadSummary.needingCallback}</strong>
          <p>These are the ones Antoine and Anthony should hit first.</p>
        </article>
        <article className="crmSummaryCard">
          <span>Hot or risky</span>
          <strong>{snapshot.leadSummary.hot}</strong>
          <p>Urgent, same-day, or restricted-item conversations.</p>
        </article>
        <article className="crmSummaryCard">
          <span>Quotes in motion</span>
          <strong>{snapshot.leadSummary.quotesInFlight}</strong>
          <p>Qualified but still waiting on a clean close.</p>
        </article>
      </div>

      <div className="crmToolbar">
        <div className="crmFilterRow">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              className={filter === item.value ? "crmFilterButton active" : "crmFilterButton"}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="crmToolbarNote">Lead fills from the website form and qualified website chat sessions should land here automatically.</p>
      </div>

      <div className="crmGrid">
        <div className="crmLeadList">
          {leads.length ? (
            leads.map((lead) => (
              <button
                key={lead.id}
                type="button"
                className={selectedLead?.id === lead.id ? "crmLeadRow active" : "crmLeadRow"}
                onClick={() => setSelectedId(lead.id)}
              >
                <div className="crmLeadRowTop">
                  <strong>{lead.name || lead.phone || lead.serviceType || "New lead"}</strong>
                  <span className={`crmStatusPill crmStatus${lead.status}`}>{lead.status}</span>
                </div>
                <p>{lead.serviceType || "Website chat lead"}</p>
                <div className="crmLeadMeta">
                  <span>{lead.zipCode || "ZIP pending"}</span>
                  <span>{lead.timeline || "Timing pending"}</span>
                  <span>{formatTime(lead.updatedAt)}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="crmEmptyCard">No leads in this slice yet.</div>
          )}
        </div>

        <div className="crmLeadDetail">
          {selectedLead ? (
            <>
              <div className="crmLeadHero">
                <div>
                  <p className="dashboardEyebrow">Selected lead</p>
                  <h4>{selectedLead.name || selectedLead.phone || "Website lead"}</h4>
                  <p>{selectedLead.serviceType || "Junk removal inquiry"}</p>
                </div>
                <span className={`crmStatusPill crmStatus${selectedLead.status}`}>{selectedLead.status}</span>
              </div>

              <div className="crmDetailGrid">
                <article className="crmMiniCard">
                  <span>Phone</span>
                  <strong>{selectedLead.phone || "Pending"}</strong>
                </article>
                <article className="crmMiniCard">
                  <span>ZIP</span>
                  <strong>{selectedLead.zipCode || "Pending"}</strong>
                </article>
                <article className="crmMiniCard">
                  <span>Timeline</span>
                  <strong>{selectedLead.timeline || "Pending"}</strong>
                </article>
                <article className="crmMiniCard">
                  <span>Priority</span>
                  <strong>{selectedLead.priority}</strong>
                </article>
              </div>

              <article className="crmNarrativeCard">
                <p className="dashboardEyebrow">What came in</p>
                <p>{selectedLead.details || selectedLead.lastMessage || "Waiting on more detail from the lead."}</p>
              </article>

              <article className="crmNarrativeCard">
                <p className="dashboardEyebrow">Expected next move</p>
                <p>{selectedLead.nextAction || "Review the lead and decide the next contact move."}</p>
                <strong>{selectedLead.nextActionDue ? `Due ${formatTime(selectedLead.nextActionDue)}` : "No due time yet"}</strong>
              </article>

              <div className="crmActionRow">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={selectedLead.status === status ? "crmActionButton active" : "crmActionButton"}
                    onClick={() => updateLeadStatus(selectedLead, status)}
                    disabled={saving === selectedLead.id}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="crmEmptyCard">Once leads start landing, the full brief will show here.</div>
          )}
        </div>
      </div>
    </section>
  );
}
