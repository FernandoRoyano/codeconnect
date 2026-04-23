interface AccordionItemProps {
  question: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ question, children, defaultOpen = false }: AccordionItemProps) {
  return (
    <details
      open={defaultOpen}
      className="acc bg-white rounded-2xl border border-[#e7e5e4] overflow-hidden group transition-[border-color,box-shadow] duration-[260ms] ease-out hover:border-[#71C648]/40 open:border-[#71C648]/40 open:shadow-soft"
    >
      <summary className="flex justify-between items-center cursor-pointer p-5 sm:p-6 gap-4">
        <h3 className="font-semibold text-[#194973] tracking-tight">{question}</h3>
        <span className="acc-chevron flex-shrink-0 w-8 h-8 rounded-full bg-[#71C648]/10 text-[#71C648] flex items-center justify-center group-open:bg-[#71C648] group-open:text-white">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </summary>
      <div className="acc-body">
        <div className="acc-body-inner">
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-[#57534e] leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </details>
  );
}

export default function Accordion({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`space-y-3 ${className}`}>{children}</div>;
}
