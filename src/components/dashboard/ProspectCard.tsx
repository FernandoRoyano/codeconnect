import Link from "next/link";
import ProspectPipelineBadge from "./ProspectPipelineBadge";
import WebsiteQualityStars from "./WebsiteQualityStars";
import { SEGMENTS, type ProspectPipelineStatus } from "@/lib/constants/prospect";

interface Prospect {
  id: string;
  name: string;
  position: string | null;
  company: string | null;
  city: string | null;
  country: string | null;
  segment: string | null;
  website_url: string | null;
  has_online_booking: boolean;
  has_app: boolean;
  website_quality: number | null;
  pipeline_status: ProspectPipelineStatus;
}

export default function ProspectCard({ prospect }: { prospect: Prospect }) {
  const segmentLabel = SEGMENTS.find((s) => s.value === prospect.segment)?.label || prospect.segment;
  const location = [prospect.city, prospect.country].filter(Boolean).join(", ");

  return (
    <Link
      href={`/dashboard/prospectos/${prospect.id}`}
      className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#71C648] hover:shadow-lg hover:shadow-[#71C648]/10 transition-all"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-[#194973] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
          {(prospect.company || prospect.name).charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold text-[#194973] truncate">{prospect.name}</div>
          {prospect.company && <div className="text-xs text-[#5A6D6D] truncate">{prospect.company}</div>}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 mb-3">
        {prospect.position && (
          <div className="text-xs text-[#5A6D6D] truncate">{prospect.position}</div>
        )}
        {location && (
          <div className="text-xs text-[#5A6D6D] truncate">{location}</div>
        )}
        {segmentLabel && (
          <div className="inline-flex self-start px-2 py-0.5 bg-[#f8f9fa] rounded text-xs text-[#5A6D6D]">{segmentLabel}</div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <ProspectPipelineBadge status={prospect.pipeline_status} />
        <div className="flex items-center gap-2">
          {prospect.website_quality && (
            <WebsiteQualityStars value={prospect.website_quality} readOnly />
          )}
          <div className="flex gap-1">
            {prospect.has_online_booking && (
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center" title="Reserva online">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </span>
            )}
            {prospect.has_app && (
              <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center" title="Tiene App">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
