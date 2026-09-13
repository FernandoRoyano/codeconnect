import { Link } from "@/i18n/navigation";
import type { Block } from "@/content/blog";

/**
 * Renderiza los bloques de un articulo con los estilos del sitio.
 *
 * En el texto se admiten dos marcas en linea: **negrita** y [texto](url). Se
 * procesan por trozos y se devuelven como nodos de React, nunca como HTML
 * crudo, asi que no hay forma de inyectar marcado desde el contenido.
 */

const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

function inline(text: string, keyPrefix: string): React.ReactNode[] {
  return text.split(INLINE).filter(Boolean).map((part, i) => {
    const key = `${keyPrefix}-${i}`;

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={key} className="font-semibold text-[#194973]">
          {part.slice(2, -2)}
        </strong>
      );
    }

    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("/")) {
        return (
          <Link key={key} href={href as never} className="text-[#39751f] underline hover:text-[#194973]">
            {label}
          </Link>
        );
      }
      return (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#39751f] underline hover:text-[#194973]"
        >
          {label}
        </a>
      );
    }

    return <span key={key}>{part}</span>;
  });
}

export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-2xl">
      {blocks.map((block, i) => {
        const k = `b${i}`;
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={k}
                className="font-bold text-[#194973] tracking-tight mt-12 mb-4 scroll-mt-24"
                style={{ fontSize: "var(--fs-2xl)", lineHeight: 1.2 }}
              >
                {block.text}
              </h2>
            );

          case "h3":
            return (
              <h3
                key={k}
                className="font-bold text-[#194973] tracking-tight mt-8 mb-3"
                style={{ fontSize: "var(--fs-lg)", lineHeight: 1.3 }}
              >
                {block.text}
              </h3>
            );

          case "p":
            return (
              <p key={k} className="text-[#44403c] leading-[1.75] mb-5" style={{ fontSize: "var(--fs-base)" }}>
                {inline(block.text, k)}
              </p>
            );

          case "ul":
            return (
              <ul key={k} className="mb-6 space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={`${k}-${j}`} className="flex gap-3 text-[#44403c] leading-[1.7]">
                    <span aria-hidden className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#71C648] flex-shrink-0" />
                    <span>{inline(item, `${k}-${j}`)}</span>
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={k} className="mb-6 space-y-3 counter-reset">
                {block.items.map((item, j) => (
                  <li key={`${k}-${j}`} className="flex gap-3 text-[#44403c] leading-[1.7]">
                    <span
                      aria-hidden
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-[#eff8ea] text-[#39751f] text-sm font-bold flex items-center justify-center mt-0.5"
                    >
                      {j + 1}
                    </span>
                    <span>{inline(item, `${k}-${j}`)}</span>
                  </li>
                ))}
              </ol>
            );

          case "callout":
            return (
              <aside key={k} className="my-8 rounded-2xl border border-[#dfe8dc] bg-[#f6faf4] p-5 sm:p-6">
                {block.title && (
                  <p className="font-bold text-[#194973] mb-2" style={{ fontSize: "var(--fs-base)" }}>
                    {block.title}
                  </p>
                )}
                <p className="text-[#44403c] leading-[1.7]" style={{ fontSize: "var(--fs-sm)" }}>
                  {inline(block.text, k)}
                </p>
              </aside>
            );

          case "quote":
            return (
              <blockquote
                key={k}
                className="my-8 border-l-4 border-[#71C648] pl-5 text-[#194973] font-medium leading-[1.6]"
                style={{ fontSize: "var(--fs-lg)" }}
              >
                {inline(block.text, k)}
              </blockquote>
            );

          case "table":
            return (
              <div key={k} className="my-8 overflow-x-auto rounded-2xl border border-[#e7e5e4]">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#fafaf9]">
                    <tr>
                      {block.head.map((h, j) => (
                        <th
                          key={`${k}-h${j}`}
                          scope="col"
                          className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#5A6D6D] whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f1f0]">
                    {block.rows.map((row, j) => (
                      <tr key={`${k}-r${j}`}>
                        {row.map((cell, c) => (
                          <td key={`${k}-r${j}c${c}`} className="px-4 py-3 text-sm text-[#44403c] align-top">
                            {inline(cell, `${k}-r${j}c${c}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
