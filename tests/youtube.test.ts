import { describe, expect, it } from "vitest";
import {
  extractYoutubeId,
  videoThumbnail,
  youtubeThumbnail,
} from "@/lib/youtube";

describe("extractYoutubeId", () => {
  it.each([
    ["https://www.youtube.com/watch?v=dQw4w9WgXcQ", "dQw4w9WgXcQ"],
    ["https://youtu.be/dQw4w9WgXcQ", "dQw4w9WgXcQ"],
    ["https://youtube.com/shorts/dQw4w9WgXcQ", "dQw4w9WgXcQ"],
    ["https://youtube.com/embed/dQw4w9WgXcQ", "dQw4w9WgXcQ"],
  ])("%s adresini ayrıştırır", (url, expected) => {
    expect(extractYoutubeId(url)).toBe(expected);
  });

  it.each([
    "https://example.com/watch?v=dQw4w9WgXcQ",
    "https://youtube.com/watch?v=short",
    "not-a-url",
  ])("%s adresini reddeder", (url) => {
    expect(extractYoutubeId(url)).toBeNull();
  });
});

describe("videoThumbnail", () => {
  const youtubeId = "dQw4w9WgXcQ";

  it("görsel yoksa hqdefault kullanır", () => {
    expect(videoThumbnail({ youtubeId, imageUrl: null })).toBe(
      youtubeThumbnail(youtubeId),
    );
    expect(youtubeThumbnail(youtubeId)).toBe(
      "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    );
  });

  it("kayıtlı maxresdefault adresini yok sayar", () => {
    expect(
      videoThumbnail({
        youtubeId,
        imageUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      }),
    ).toBe(youtubeThumbnail(youtubeId));
  });

  it("özel görsel adresini korur", () => {
    const imageUrl = "https://firebasestorage.googleapis.com/v0/b/x/o/a.jpg";
    expect(videoThumbnail({ youtubeId, imageUrl })).toBe(imageUrl);
  });
});
