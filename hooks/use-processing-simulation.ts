"use client";

import { useEffect, useRef, useState } from "react";

export const PROCESSING_DURATION_SECONDS = 35;

export type ProcessingStage = {
  title: string;
  description: string;
  startsAt: number;
};

export const processingStages: ProcessingStage[] = [
  { title: "Report received", description: "Your report has been received. We are preparing the information for analysis.", startsAt: 0 },
  { title: "Extracting report information", description: "Relevant information is being extracted from the report.", startsAt: 5 },
  { title: "Analyzing findings", description: "The system is analyzing reported findings.", startsAt: 12 },
  { title: "Generating clinical interpretation", description: "The clinical interpretation is being prepared for review.", startsAt: 22 },
];

type UseProcessingSimulationOptions = {
  active: boolean;
  onComplete: () => void;
};

export function useProcessingSimulation({ active, onComplete }: UseProcessingSimulationOptions) {
  const startedAtRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!active) {
      startedAtRef.current = null;
      completedRef.current = false;
      setElapsedSeconds(0);
      return;
    }

    startedAtRef.current = Date.now();
    completedRef.current = false;

    const updateElapsedTime = () => {
      const start = startedAtRef.current;
      if (!start) return;
      const elapsed = Math.min(PROCESSING_DURATION_SECONDS, Math.floor((Date.now() - start) / 1000));
      setElapsedSeconds(elapsed);
    };

    updateElapsedTime();
    const intervalId = window.setInterval(updateElapsedTime, 250);
    return () => window.clearInterval(intervalId);
  }, [active]);

  useEffect(() => {
    if (elapsedSeconds >= PROCESSING_DURATION_SECONDS && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  }, [elapsedSeconds, onComplete]);

  const currentStageIndex = processingStages.reduce((index, stage, stageIndex) => (
    elapsedSeconds >= stage.startsAt ? stageIndex : index
  ), 0);

  return {
    elapsedSeconds,
    progress: Math.round((elapsedSeconds / PROCESSING_DURATION_SECONDS) * 100),
    currentStageIndex,
    currentStage: processingStages[currentStageIndex],
    isTakingLonger: elapsedSeconds >= 30,
  };
}
