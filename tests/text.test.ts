import { describe, expect, it } from "vitest";
import { excerpt, stripMarkdown } from "@/lib/text";

describe("stripMarkdown", () => {
  it("başlık, vurgu, bağlantı ve kod işaretlerini kaldırır", () => {
    expect(
      stripMarkdown(
        "## Diyabet\n\n**Kan şekeri** ve _insülin_ için [rehber](https://example.com) `kod`",
      ),
    ).toBe("Diyabet Kan şekeri ve insülin için rehber kod");
  });

  it("liste işaretlerini ve alıntıları kaldırıp boşlukları birleştirir", () => {
    expect(stripMarkdown("- Bir\n* İki\n1. Üç\n> Alıntı\n\n\nSon")).toBe(
      "Bir İki Üç Alıntı Son",
    );
  });

  it("görselleri alternatif metne çevirir", () => {
    expect(stripMarkdown("![Kapak görseli](/a.jpg) metin")).toBe(
      "Kapak görseli metin",
    );
  });
});

describe("excerpt", () => {
  it("kısa metni olduğu gibi döndürür", () => {
    expect(excerpt("**Kısa** metin")).toBe("Kısa metin");
  });

  it("uzun metni kelime sınırında kesip üç nokta ekler", () => {
    const result = excerpt("Sağlıklı yaşam için dengeli beslenme önemlidir.", 20);
    expect(result).toBe("Sağlıklı yaşam için…");
    expect(result.length).toBeLessThanOrEqual(21);
  });

  it("kesim sonundaki noktalama işaretlerini temizler", () => {
    expect(excerpt("Bir, iki, üç, dört beş", 9)).toBe("Bir, iki…");
  });

  it("varsayılan olarak 160 karakteri aşmaz", () => {
    const result = excerpt("kelime ".repeat(100));
    expect(result.length).toBeLessThanOrEqual(161);
    expect(result.endsWith("…")).toBe(true);
  });
});
