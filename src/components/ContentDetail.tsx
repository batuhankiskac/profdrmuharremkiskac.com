import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import bioData from "@/data/bio.json";
import { formatDate } from "@/lib/format";
import {
  allowedImageSrc,
  citationParts,
  EXTERNAL_LINK,
  sitePath,
} from "@/lib/markdown-media";
import { jsonLd } from "@/lib/schema";
import ExternalLink from "./ExternalLink";
import styles from "./ContentDetail.module.css";

interface ContentDetailProps {
  backHref: string;
  backLabel: string;
  // Başlığın üstündeki kısa etiket (ör. "Makale").
  eyebrow?: string;
  title: string;
  imageUrl?: string | null;
  imageAlt?: string;
  date?: string | null;
  // Gösterilen tarihten farklı bir günse "Son güncelleme" olarak yazılır.
  updatedAt?: string | null;
  // Yazar satırı (makalelerde hekim adı ve unvanı, hakkında sayfasına bağlı).
  showAuthor?: boolean;
  // Sayfaya özel JSON-LD (bkz. lib/schema.ts detailSchema).
  schema?: object;
  markdown: string;
  citations?: string[];
}

const at = (i: number) => ({ "--i": i }) as CSSProperties;

export default function ContentDetail({
  backHref,
  backLabel,
  eyebrow,
  title,
  imageUrl,
  imageAlt = "",
  date,
  updatedAt,
  showAuthor = false,
  schema,
  markdown,
  citations = [],
}: ContentDetailProps) {
  const updated =
    date && updatedAt && updatedAt.slice(0, 10) !== date.slice(0, 10)
      ? updatedAt
      : null;

  return (
    <main id="main-content" className={styles.page}>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      )}
      <article>
        <header className={styles.header}>
          <Link
            href={backHref}
            className={styles.backLink}
            data-enter
            style={at(0)}
          >
            ← {backLabel}
          </Link>
          {eyebrow && (
            <p className={styles.eyebrow} data-enter style={at(1)}>
              {eyebrow}
            </p>
          )}
          <h1 className={styles.title} data-enter style={at(2)}>
            {title}
          </h1>
          {(date || showAuthor) && (
            <p className={styles.date} data-enter style={at(3)}>
              {showAuthor && (
                <>
                  <Link href="/hakkinda" rel="author" className={styles.author}>
                    {bioData.name}
                  </Link>
                  , {bioData.title}
                  {date && " · "}
                </>
              )}
              {date && <time dateTime={date}>{formatDate(date)}</time>}
              {updated && (
                <>
                  {" · Son güncelleme: "}
                  <time dateTime={updated}>{formatDate(updated)}</time>
                </>
              )}
            </p>
          )}
        </header>

        {imageUrl && (
          <div className={styles.media} data-reveal="mask">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              preload
              fetchPriority="high"
              sizes="(max-width: 1240px) 100vw, 1240px"
              className={styles.image}
            />
          </div>
        )}

        <div className={styles.column}>
          <div className={styles.prose}>
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
                  const internal = href ? sitePath(href) : null;
                  if (internal) {
                    return (
                      <Link href={internal} {...props}>
                        {children}
                      </Link>
                    );
                  }
                  if (href && EXTERNAL_LINK.test(href)) {
                    return (
                      <ExternalLink href={href} {...props}>
                        {children}
                      </ExternalLink>
                    );
                  }
                  return (
                    <a href={href} {...props}>
                      {children}
                    </a>
                  );
                },
                // Görseller tembel yüklenir ve yalnız izinli Storage adreslerinden
                // gösterilir; diğer kaynaklar hiç render edilmez.
                img: ({ node, src, alt }) => {
                  void node;
                  const safeSrc =
                    typeof src === "string" ? allowedImageSrc(src) : null;
                  if (!safeSrc) return null;
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={safeSrc}
                      alt={alt ?? ""}
                      loading="lazy"
                      decoding="async"
                    />
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
              <h2
                id="sources"
                className={styles.citationsTitle}
                data-reveal
              >
                Kaynakça
              </h2>
              <ol className={styles.citationsList}>
                {citations.map((citation, index) => (
                  <li
                    key={`${citation}-${index}`}
                    className={styles.citationItem}
                    data-reveal
                    style={{ "--i": index % 4 } as CSSProperties}
                  >
                    {citationParts(citation).map((part, partIndex) =>
                      EXTERNAL_LINK.test(part) ? (
                        <ExternalLink key={`${part}-${partIndex}`} href={part}>
                          {part}
                        </ExternalLink>
                      ) : (
                        <span key={`${part}-${partIndex}`}>{part}</span>
                      ),
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          <footer className={styles.footer}>
            <Link href={backHref} className={styles.backButton}>
              ← {backLabel}
            </Link>
          </footer>
        </div>
      </article>
    </main>
  );
}
