import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDate } from "@/lib/format";
import styles from "./ContentDetail.module.css";

interface ContentDetailProps {
  backHref: string;
  backLabel: string;
  title: string;
  imageUrl?: string | null;
  imageAlt?: string;
  date?: string | null;
  markdown: string;
  citations?: string[];
}

// URL sonundaki noktalama işaretleri bağlantıya dahil edilmez.
const URL_PATTERN = /(https?:\/\/[^\s]*[^\s.,;:!?)\]}'"])/g;

const EXTERNAL_LINK = /^https?:\/\//i;

function citationParts(value: string) {
  return value.split(URL_PATTERN).filter(Boolean);
}

export default function ContentDetail({
  backHref,
  backLabel,
  title,
  imageUrl,
  imageAlt = "",
  date,
  markdown,
  citations = [],
}: ContentDetailProps) {
  return (
    <main className={styles.container}>
      <article>
        <Link href={backHref} className={styles.backLink}>
          ← {backLabel}
        </Link>
        {imageUrl && (
          <div className={styles.imageContainer}>
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              preload
              sizes="(max-width: 850px) 100vw, 800px"
              className={styles.image}
            />
          </div>
        )}
        <h1 className={styles.title}>{title}</h1>
        {date && (
          <time dateTime={date} className={styles.date}>
            {formatDate(date)}
          </time>
        )}
        <div className={styles.content}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Sayfa başlığı zaten h1 olduğundan içerikteki h1'ler h2'ye indirilir.
              h1: ({ node, ...props }) => {
                void node;
                return <h2 {...props} />;
              },
              // react-markdown'ın verdiği `node` DOM'a aktarılmaz.
              a: ({ node, href, children, ...props }) => {
                void node;
                const external = href ? EXTERNAL_LINK.test(href) : false;
                return (
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    {...props}
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>

        {citations.length > 0 && (
          <section
            className={styles.citationsSection}
            aria-labelledby="sources"
          >
            <h2 id="sources" className={styles.citationsTitle}>
              Kaynakça
            </h2>
            <ol className={styles.citationsList}>
              {citations.map((citation, index) => (
                <li
                  key={`${citation}-${index}`}
                  className={styles.citationItem}
                >
                  {citationParts(citation).map((part, partIndex) =>
                    EXTERNAL_LINK.test(part) ? (
                      <a
                        key={`${part}-${partIndex}`}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {part}
                      </a>
                    ) : (
                      <span key={`${part}-${partIndex}`}>{part}</span>
                    ),
                  )}
                </li>
              ))}
            </ol>
          </section>
        )}
      </article>
    </main>
  );
}
