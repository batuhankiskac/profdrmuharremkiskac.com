import { describe, expect, it } from "vitest";
import {
  allowedImageSrc,
  citationParts,
  EXTERNAL_LINK,
  sitePath,
} from "@/lib/markdown-media";

describe("allowedImageSrc", () => {
  it.each([
    "https://firebasestorage.googleapis.com/v0/b/bucket/o/a.jpg?alt=media",
    "https://storage.googleapis.com/bucket/a.png",
  ])("izinli Storage görselini olduğu gibi döndürür: %s", (src) => {
    expect(allowedImageSrc(src)).toBe(src);
  });

  it.each([
    ["http şeması", "http://firebasestorage.googleapis.com/v0/b/x/o/a.jpg"],
    ["izinli olmayan host", "https://example.com/a.jpg"],
    ["host adına eklenmiş alan", "https://firebasestorage.googleapis.com.evil.com/a.jpg"],
    ["javascript şeması", "javascript:alert(1)"],
    ["bozuk adres", "not a url"],
  ])("%s reddedilir", (_label, src) => {
    expect(allowedImageSrc(src)).toBeNull();
  });

  it("boş ya da tanımsız kaynağı reddeder", () => {
    expect(allowedImageSrc(undefined)).toBeNull();
    expect(allowedImageSrc("")).toBeNull();
  });
});

describe("citationParts", () => {
  it("bağlantıları metinden ayırır", () => {
    expect(citationParts("Kaynak: https://example.com/a yayını")).toEqual([
      "Kaynak: ",
      "https://example.com/a",
      " yayını",
    ]);
  });

  it("URL sonundaki noktalama işaretlerini bağlantıya dahil etmez", () => {
    expect(citationParts("Bkz. https://example.com/x. Devamı")).toEqual([
      "Bkz. ",
      "https://example.com/x",
      ". Devamı",
    ]);
  });

  it("URL içermeyen metni tek parça olarak döndürür", () => {
    expect(citationParts("Yazar, 2020")).toEqual(["Yazar, 2020"]);
  });
});

describe("EXTERNAL_LINK", () => {
  it.each([
    ["https://example.com", true],
    ["HTTP://example.com", true],
    ["/hizmetler", false],
    ["#bolum", false],
    ["mailto:info@example.com", false],
  ])("%s dış bağlantı mı: %s", (href, expected) => {
    expect(EXTERNAL_LINK.test(href)).toBe(expected);
  });
});

describe("sitePath", () => {
  it("sitenin kendi tam adreslerini göreli yola çevirir", () => {
    expect(sitePath("https://profdrmuharremkiskac.com/hizmetler/abc#ozet")).toBe(
      "/hizmetler/abc#ozet",
    );
    expect(sitePath("https://www.profdrmuharremkiskac.com/makaleler?x=1")).toBe(
      "/makaleler?x=1",
    );
  });

  it("dış adresler ve geçersiz değerler için null döndürür", () => {
    expect(sitePath("https://pubmed.ncbi.nlm.nih.gov/123")).toBeNull();
    expect(sitePath("/goreli")).toBeNull();
    expect(sitePath("mailto:a@profdrmuharremkiskac.com")).toBeNull();
  });
});
