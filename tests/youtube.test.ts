import { describe, expect, it } from "vitest";
import { extractYoutubeId } from "@/lib/youtube";

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
