"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, FileCheck2, FileText, Upload } from "lucide-react";
import { ChangeEvent, DragEvent, KeyboardEvent, useRef, useState } from "react";

const supportedExtensions = ["pdf", "docx"];

function getExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

function isSupportedReport(file: File) {
  return supportedExtensions.includes(getExtension(file.name));
}

type ReportUploadProps = {
  onConfirm: (file: File) => void;
};

export function ReportUpload({ onConfirm }: ReportUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  function openFilePicker() {
    inputRef.current?.click();
  }

  function handleFile(file: File | undefined) {
    if (!file) return;

    if (!isSupportedReport(file)) {
      setSelectedFile(null);
      setError("This file type is not supported.");
      return;
    }

    setError(null);
    setSelectedFile(file);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleFile(event.target.files?.[0]);
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFilePicker();
    }
  }

  const documentType = selectedFile && getExtension(selectedFile.name) === "pdf" ? "PDF document" : "Word document";

  return (
    <div>
      <input
        ref={inputRef}
        id="clinical-report-input"
        className="sr-only"
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        aria-label="Select a PDF or DOCX clinical report"
        onChange={handleInputChange}
      />

      <div
        role="button"
        tabIndex={0}
        aria-controls="clinical-report-input"
        aria-describedby="upload-formats"
        onClick={openFilePicker}
        onKeyDown={handleKeyDown}
        onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }}
        onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = "copy"; setIsDragging(true); }}
        onDragLeave={(event) => { event.preventDefault(); if (event.currentTarget === event.target) setIsDragging(false); }}
        onDrop={handleDrop}
        className={`cursor-pointer rounded-2xl border-2 border-dashed px-6 py-10 text-center outline-none transition-colors sm:px-10 sm:py-12 ${isDragging ? "border-primary bg-primary/5" : "border-border bg-white shadow-sm hover:border-primary/60 hover:bg-primary/[0.02] hover:shadow-md"} focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15`}
      >
        <div className={`relative mx-auto flex size-16 items-center justify-center rounded-2xl transition-colors ${isDragging ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
          <FileText aria-hidden="true" className="size-8" strokeWidth={1.8} />
          <span className={`absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full border-2 border-white ${isDragging ? "bg-white text-primary" : "bg-primary text-white"}`}><Upload aria-hidden="true" className="size-3.5" strokeWidth={2.5} /></span>
        </div>
        <p className="mt-6 text-base font-semibold text-foreground">{isDragging ? "Drop your report to begin" : "Drop your clinical report here"}</p>
        <p className="mt-2 text-sm text-muted-foreground">or select a file manually</p>
        <span aria-hidden="true" className="pointer-events-none mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors">
          <Upload aria-hidden="true" className="size-4" />
          Select report
        </span>
        <p id="upload-formats" className="mt-5 text-xs font-medium tracking-wide text-muted-foreground">PDF / DOCX <span aria-hidden="true" className="px-1.5">•</span> Prototype workflow</p>
      </div>

      <div className="mt-4 grid gap-2 text-xs font-medium text-muted-foreground sm:grid-cols-3 sm:gap-3" aria-label="Upload workflow details">
        <p className="flex items-center gap-1.5"><Check aria-hidden="true" className="size-3.5 text-success" />Fictional test data</p>
        <p className="flex items-center gap-1.5"><Check aria-hidden="true" className="size-3.5 text-success" />PDF and DOCX</p>
        <p className="flex items-center gap-1.5"><Check aria-hidden="true" className="size-3.5 text-success" />~30–60 sec processing</p>
      </div>

      <AnimatePresence initial={false}>
        {error && (
          <motion.div initial={reduceMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reduceMotion ? undefined : { opacity: 0, height: 0 }} transition={{ duration: reduceMotion ? 0 : 0.18 }} className="overflow-hidden">
            <div role="alert" className="mt-4 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-foreground">
              <p className="font-semibold">{error}</p>
              <p className="mt-1 text-muted-foreground">Please select a PDF or DOCX report.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {selectedFile && (
          <motion.section initial={reduceMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -6 }} transition={{ duration: reduceMotion ? 0 : 0.18 }} aria-label="Selected report" className="mt-5 rounded-2xl border border-success/30 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success"><FileCheck2 aria-hidden="true" className="size-5" /></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-success">Report selected</p>
                <p className="mt-1 truncate text-sm font-medium text-foreground" title={selectedFile.name}>{selectedFile.name}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><FileText aria-hidden="true" className="size-3.5" />{documentType}</p>
              </div>
              </div>
              <button type="button" onClick={() => onConfirm(selectedFile)} className="inline-flex w-full shrink-0 items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 active:bg-primary/95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 sm:w-auto">Continue</button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
