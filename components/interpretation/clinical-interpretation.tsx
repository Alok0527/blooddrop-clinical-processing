"use client";

import { AlertTriangle, FileText, RotateCcw } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type ClinicalInterpretationProps = {
  fileName: string;
  onStartAgain: () => void;
};

function reportTitle(fileName: string) {
  return fileName.replace(/\.(pdf|docx)$/i, "").replace(/[_-]+/g, " ");
}

export function ClinicalInterpretation({ fileName, onStartAgain }: ClinicalInterpretationProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} aria-labelledby="interpretation-heading" className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8">
      <div className="flex items-start gap-3 border-b border-border pb-6">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><FileText aria-hidden="true" className="size-5" /></div>
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">For professional clinical review</p>
          <h1 id="interpretation-heading" className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">AI Clinical Interpretation</h1>
          <p className="mt-2 truncate text-sm text-muted-foreground" title={fileName}>{reportTitle(fileName)}</p>
        </div>
      </div>

      <div className="pt-7">
        <h2 className="text-lg font-semibold text-foreground">Summary</h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">The submitted report has been processed by the simulated interpretation workflow.</p>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">Key observations</h2>
        <ul className="mt-4 space-y-3 text-base leading-7 text-muted-foreground">
          <li className="flex gap-3"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />Hemoglobin measurement recorded in the submitted report.</li>
          <li className="flex gap-3"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />White blood cell count recorded in the submitted report.</li>
          <li className="flex gap-3"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />Platelet measurement recorded in the submitted report.</li>
        </ul>
      </div>

      <aside aria-labelledby="clinical-notice-heading" className="mt-8 rounded-xl border border-warning/30 bg-warning/10 p-4 sm:p-5">
        <div className="flex gap-3">
          <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-warning" />
          <div>
            <h2 id="clinical-notice-heading" className="font-semibold text-foreground">Clinical review required</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">This AI-generated interpretation is intended to support professional review and does not replace clinical judgment.</p>
          </div>
        </div>
      </aside>

      <button type="button" onClick={onStartAgain} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"><RotateCcw aria-hidden="true" className="size-4 text-primary" />Start another report</button>
    </motion.section>
  );
}
