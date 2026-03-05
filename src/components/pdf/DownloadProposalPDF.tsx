"use client";

import { useState, useCallback } from "react";
import type { ProposalDisplayData } from "@/lib/utils/proposalData";

interface Props {
  data: ProposalDisplayData;
  fileName?: string;
  className?: string;
}

export default function DownloadProposalPDF({ data, fileName, className }: Props) {
  const [generating, setGenerating] = useState(false);

  const handleDownload = useCallback(async () => {
    setGenerating(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { default: ProposalPDF } = await import("./ProposalPDF");

      const blob = await pdf(<ProposalPDF data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || `Propuesta-${data.displayId}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
    setGenerating(false);
  }, [data, fileName]);

  return (
    <button onClick={handleDownload} disabled={generating} className={className}>
      {generating ? "Generando PDF..." : "Descargar PDF"}
    </button>
  );
}
