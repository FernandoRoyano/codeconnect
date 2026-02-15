"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  features?: string[];
}

export default function ServiceCard({ title, description, icon, href, features }: ServiceCardProps) {
  const t = useTranslations("serviceCard");

  return (
    <Link href={href as never} className="group block">
      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100 hover:border-[#71C648] group-hover:-translate-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-[#71C648] to-[#194973] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-[#194973] mb-3 group-hover:text-[#71C648] transition-colors">{title}</h3>
        <p className="text-[#5A6D6D] mb-4 leading-relaxed">{description}</p>
        {features && features.length > 0 && (
          <ul className="space-y-2 mb-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-[#5A6D6D]">
                <svg className="w-4 h-4 mr-2 text-[#71C648]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center text-[#71C648] font-medium group-hover:text-[#194973] transition-colors">
          <span>{t("learnMore")}</span>
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
