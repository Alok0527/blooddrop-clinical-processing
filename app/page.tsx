"use client";

import { ProcessingSimulation } from "@/components/processing/processing-simulation";
import { ReportReady } from "@/components/processing/report-ready";
import { ClinicalInterpretation } from "@/components/interpretation/clinical-interpretation";
import { ReportUpload } from "@/components/upload/report-upload";
import type { AppState } from "@/types/application-state";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, CircleCheck, Droplets } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("upload");
  const [reportName, setReportName] = useState("");
  const reduceMotion = useReducedMotion();

  function confirmReport(file: File) {
    setReportName(file.name);
    setAppState("confirmed");
  }

  function startAgain() {
    setReportName("");
    setAppState("upload");
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 sm:py-10 lg:py-14">
      <div className="mx-auto w-full max-w-3xl">
        <header className="flex items-center justify-between gap-4 border-b border-border pb-6 sm:pb-7">
          <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
            <Droplets aria-hidden="true" className="size-5" strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-foreground">BloodDrop</p>
            <p className="mt-0.5 text-sm text-muted-foreground">Clinical Report Processing</p>
          </div>
          </div>
          <p className="hidden items-center gap-1.5 text-xs font-medium text-muted-foreground sm:inline-flex"><span aria-hidden="true" className="size-1.5 rounded-full bg-success" />Prototype workspace</p>
        </header>

        <section className="pt-10 sm:pt-14">
          <div className="mx-auto max-w-xl">
            <AnimatePresence mode="wait">
              {appState === "upload" && (
                <motion.div key="upload" initial={reduceMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -6 }} transition={{ duration: reduceMotion ? 0 : 0.18 }}>
                  <div className="max-w-lg">
                    <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"><CircleCheck aria-hidden="true" className="size-4" />Clinical report workflow</p>
                    <h1 id="upload-heading" className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Upload Clinical Report</h1>
                    <p className="mt-3 text-base leading-7 text-muted-foreground">Begin by uploading a clinical report. BloodDrop will process the document before making an AI Clinical Interpretation available for review.</p>
                  </div>
                  <div className="mt-8"><ReportUpload onConfirm={confirmReport} /></div>
                  <section aria-labelledby="next-steps-heading" className="mt-8 rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 id="next-steps-heading" className="text-base font-semibold text-foreground">What happens next</h2>
                      <p className="shrink-0 text-xs font-medium text-muted-foreground">~30–60 sec</p>
                    </div>
                    <ol className="mt-5 grid gap-5 sm:grid-cols-3 sm:gap-4">
                      {[
                        ["01", "Report received"],
                        ["02", "Information analyzed"],
                        ["03", "Interpretation prepared"],
                      ].map(([number, label]) => (
                        <li key={number} className="flex gap-3 sm:block">
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">{number}</span>
                          <p className="pt-1 text-sm font-medium leading-5 text-foreground sm:mt-3 sm:pt-0">{label}</p>
                        </li>
                      ))}
                    </ol>
                  </section>
                </motion.div>
              )}

              {appState === "confirmed" && (
                <motion.section key="confirmed" initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -6 }} transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }} aria-labelledby="confirmation-heading" className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm sm:p-10">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-success text-white shadow-sm"><Check aria-hidden="true" className="size-7" strokeWidth={2.5} /></div>
                  <div role="status" aria-live="polite" className="mt-6">
                    <h1 id="confirmation-heading" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Report received</h1>
                    <p className="mt-4 break-words text-sm font-semibold text-foreground sm:text-base">{reportName}</p>
                    <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-muted-foreground">Your report has been successfully received and is ready for processing.</p>
                  </div>
                  <button type="button" onClick={() => setAppState("processing")} className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25">Begin processing</button>
                </motion.section>
              )}

              {appState === "processing" && <ProcessingSimulation key="processing" fileName={reportName} onComplete={() => setAppState("ready")} />}

              {appState === "ready" && <motion.div key="ready" initial={reduceMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}><ReportReady fileName={reportName} onReview={() => setAppState("interpretation")} /></motion.div>}

              {appState === "interpretation" && <ClinicalInterpretation key="interpretation" fileName={reportName} onStartAgain={startAgain} />}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
}
