"use client";

import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";

type ProcessingPlaceholderProps = {
  fileName: string;
};

export function ProcessingPlaceholder({ fileName }: ProcessingPlaceholderProps) {
  return (
    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} aria-labelledby="processing-heading" className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Clock3 aria-hidden="true" className="size-6" /></div>
      <h1 id="processing-heading" className="mt-6 text-2xl font-semibold tracking-tight text-foreground">Processing will begin here</h1>
      <p className="mt-3 text-base leading-7 text-muted-foreground"><span className="font-medium text-foreground">{fileName}</span> is ready for processing. This state is prepared for Phase 4.</p>
    </motion.section>
  );
}
