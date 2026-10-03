"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

type ReportReadyProps = {
  fileName: string;
  onReview: () => void;
};

export function ReportReady({ fileName, onReview }: ReportReadyProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="ready-heading" className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm sm:p-10">
      <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.24, ease: "easeOut" }} className="mx-auto flex size-14 items-center justify-center rounded-full bg-success text-white shadow-sm">
        <Check aria-hidden="true" className="size-7" strokeWidth={2.5} />
      </motion.div>
      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, delay: reduceMotion ? 0 : 0.08 }}>
        <h1 id="ready-heading" className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Clinical Interpretation Ready</h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted-foreground">The report has been processed and an interpretation is available for clinical review.</p>
        <p className="mt-6 break-words text-sm font-semibold text-foreground">{fileName}</p>
        <p className="mt-3 inline-flex rounded-full bg-success/10 px-3 py-1 text-sm font-semibold text-success">Ready for review</p>
        <button type="button" onClick={onReview} className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25">Review interpretation</button>
      </motion.div>
    </section>
  );
}
