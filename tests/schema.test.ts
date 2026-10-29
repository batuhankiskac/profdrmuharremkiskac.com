import { describe, expect, it } from "vitest";
import { detailSchema, jsonLd, PERSON_ID, siteSchema } from "@/lib/schema";

describe("siteSchema", () => {
  it("hekim, muayenehane ve site düğümlerini @id ile bağlar", () => {
    const types = siteSchema["@graph"].map((node) => node["@type"]);
    expect(types).toEqual(["Person", "Physician", "WebSite"]);
    expect(siteSchema["@graph"][0]["@id"]).toBe(PERSON_ID);
  });
});

describe("detailSchema", () => {
  const base = {
    path: "/makaleler/abc",
    title: "Şişkinlik",
    description: "Özet",
    imageUrl: null,
    createdAt: "2026-10-27T10:00:00.000Z",
    updatedAt: "2026-10-29T08:00:00.000Z",
  };

  it("makalede yazar ve tarih bilgili Article üretir", () => {
    const graph = detailSchema({ ...base, kind: "article", citations: ["Kaynak"] })["@graph"];
    expect(graph).toHaveLength(2);
    expect(graph[1]).toMatchObject({
      "@type": "Article",
      author: { "@id": PERSON_ID },
      datePublished: base.createdAt,
      dateModified: base.updatedAt,
      citation: ["Kaynak"],
    });
    expect(graph[0]).toMatchObject({ "@type": "MedicalWebPage", lastReviewed: "2026-10-29" });
  });

  it("hizmette yalnız web sayfası ve gezinme yolu üretir", () => {
    const graph = detailSchema({ ...base, kind: "service", path: "/hizmetler/x" })["@graph"];
    expect(graph).toHaveLength(1);
    expect(JSON.stringify(graph)).toContain("https://profdrmuharremkiskac.com/hizmetler");
  });
});

describe("jsonLd", () => {
  it("betiği kapatabilecek < karakterini kaçırır", () => {
    expect(jsonLd({ name: "</script>" })).toBe('{"name":"\\u003c/script>"}');
  });
});
