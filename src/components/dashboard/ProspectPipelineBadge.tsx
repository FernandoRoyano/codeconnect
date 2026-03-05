import { PIPELINE_STATUS_CONFIG, type ProspectPipelineStatus } from "@/lib/constants/prospect";

export default function ProspectPipelineBadge({ status }: { status: ProspectPipelineStatus }) {
  const config = PIPELINE_STATUS_CONFIG[status] || PIPELINE_STATUS_CONFIG.identificado;
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
