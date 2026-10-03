"use client";

import { processingStages, useProcessingSimulation } from "@/hooks/use-processing-simulation";
import { Check, Circle, LoaderCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type ProcessingSimulationProps = {
  fileName: string;
  onComplete: () => void;
};

export function ProcessingSimulation({ fileName, onComplete }: ProcessingSimulationProps) {
  const reduceMotion = useReducedMotion();
  const { elapsedSeconds, progress, currentStageIndex, currentStage, isTakingLonger } = useProcessingSimulation({ active: true, onComplete });
  const circumference = 2 * Math.PI * 45;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <section aria-labelledby="processing-heading" className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8 lg:p-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <div className="flex flex-col items-center text-center lg:w-48 lg:shrink-0">
          <div className="relative flex size-36 items-center justify-center" aria-hidden="true">
            <svg className="size-full -rotate-90" viewBox="0 0 112 112">
              <circle cx="56" cy="56" r="45" fill="none" stroke="#E4E7EC" strokeWidth="7" />
              <circle cx="56" cy="56" r="45" fill="none" stroke="#155EEF" strokeWidth="7" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={progressOffset} style={{ transition: reduceMotion ? "none" : "stroke-dashoffset 400ms ease" }} />
            </svg>
            <motion.div animate={reduceMotion ? undefined : { scale: [1, 1.08, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} className="absolute flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <LoaderCircle className={`size-5 ${reduceMotion ? "" : "animate-spin"}`} style={reduceMotion ? undefined : { animationDuration: "2.4s" }} />
            </motion.div>
          </div>
          <p className="mt-4 text-sm font-semibold text-foreground">Processing progress</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-primary">{progress}%</p>
          <p className="mt-2 text-sm text-muted-foreground">{elapsedSeconds} {elapsedSeconds === 1 ? "second" : "seconds"} elapsed</p>
        </div>

        <div className="min-w-0 flex-1">
          <p className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-primary">Clinical report processing</p>
          <h1 id="processing-heading" className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Preparing your report</h1>
          <p className="mt-3 truncate text-sm font-medium text-muted-foreground" title={fileName}>{fileName}</p>

          <div className="mt-6 rounded-xl bg-background px-4 py-4">
            <p className="text-sm font-semibold text-foreground">{currentStage.title}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{currentStage.description}</p>
            <p className="sr-only" role="status" aria-live="polite">Current processing stage: {currentStage.title}.</p>
          </div>

          <ol className="mt-7 space-y-4" aria-label="Processing stages">
            {processingStages.map((stage, index) => {
              const isComplete = index < currentStageIndex;
              const isCurrent = index === currentStageIndex;
              return (
                <li key={stage.title} aria-label={`${stage.title}: ${isComplete ? "completed" : isCurrent ? "in progress" : "upcoming"}`} aria-current={isCurrent ? "step" : undefined} className="flex items-center gap-3 text-sm">
                  {isComplete ? (
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-success text-white"><Check aria-hidden="true" className="size-3.5" strokeWidth={3} /></span>
                  ) : isCurrent ? (
                    <motion.span aria-label="Current stage" animate={reduceMotion ? undefined : { opacity: [1, 0.55, 1] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary"><span className="size-1.5 rounded-full bg-white" /></motion.span>
                  ) : (
                    <Circle aria-hidden="true" className="size-5 shrink-0 text-border" />
                  )}
                  <span className={isComplete ? "font-medium text-foreground" : isCurrent ? "font-semibold text-foreground" : "text-muted-foreground"}>{stage.title}</span>
                </li>
              );
            })}
          </ol>

          {isTakingLonger && (
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} role="status" className="mt-7 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3">
              <p className="text-sm font-semibold text-foreground">Still processing</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">This is taking a little longer than expected. Processing is still in progress and the interpretation will appear here when ready.</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
