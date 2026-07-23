import { expect, test } from "@playwright/test";

test("ana sayfa ve temel navigasyon erişilebilir", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: /Sağlıklı Bir Yaşam İçin/ }),
  ).toBeVisible();
  if (isMobile) {
    await page.getByRole("button", { name: "Menüyü aç" }).click();
  }
  const navigation = page.getByRole("navigation", { name: "Ana menü" });
  await expect(navigation).toBeVisible();
  await expect(
    navigation.getByRole("link", { name: "Hizmetler", exact: true }),
  ).toBeVisible();
});

test("public içerik sayfaları yükleniyor metnine bağımlı değil", async ({
  page,
}) => {
  for (const path of ["/makaleler", "/hizmetler", "/videolar"]) {
    await page.goto(path);
    await expect(page.getByText("Yükleniyor...")).toHaveCount(0);
    await expect(page.locator("main h1")).toBeVisible();
  }
});

test("mobil menü Escape ile kapanır", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Yalnız mobil projede çalışır.");
  await page.goto("/");
  const menuButton = page.locator('button[aria-controls="primary-navigation"]');
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
});

test("analiz tercihi saklanır", async ({ page }) => {
  await page.goto("/");
  const banner = page.getByRole("complementary", {
    name: "Çerez ve analiz tercihi",
  });
  await expect(banner).toBeVisible();
  await page.getByRole("button", { name: "Reddet" }).click();
  await expect(banner).toHaveCount(0);
  await page.reload();
  await expect(banner).toHaveCount(0);
});

test("anonim admin isteği login sayfasına yönlenir", async ({ page }) => {
  await page.goto("/admin/hizmetler");
  await expect(page).toHaveURL(/\/login$/);
  await expect(
    page.getByRole("heading", { name: "Admin Girişi" }),
  ).toBeVisible();
});

test("sahte admin cookie'si sunucu doğrulamasını geçemez", async ({
  context,
  page,
}) => {
  await context.addCookies([
    {
      name: "admin_session",
      value: "sahte-session",
      domain: "127.0.0.1",
      path: "/",
      httpOnly: true,
      sameSite: "Strict",
    },
  ]);
  await page.goto("/admin/hizmetler");
  await expect(page).toHaveURL(/\/login$/);
});

test("sitemap olmayan video detay rotaları üretmez", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  const body = await response.text();
  expect(body).not.toMatch(/\/videolar\/[^<]+/);
});

test("temel güvenlik başlıkları gönderilir", async ({ request }) => {
  const response = await request.get("/");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["x-frame-options"]).toBe("SAMEORIGIN");
  expect(response.headers()["content-security-policy"]).toContain(
    "default-src 'self'",
  );
});

const adminCredentialsAvailable = Boolean(
  process.env.E2E_ADMIN_EMAIL && process.env.E2E_ADMIN_PASSWORD,
);

test("admin login, hizmet CRUD ve logout akışı", async ({ page }) => {
  test.skip(
    !adminCredentialsAvailable,
    "Firebase admin E2E bilgileri tanımlı değil.",
  );

  const uniqueTitle = `E2E Hizmet ${Date.now()}`;
  const updatedTitle = `${uniqueTitle} Güncel`;

  await page.goto("/login");
  await page.getByLabel("E-posta").fill(process.env.E2E_ADMIN_EMAIL!);
  await page.getByLabel("Şifre").fill(process.env.E2E_ADMIN_PASSWORD!);
  await page.getByRole("button", { name: "Giriş Yap" }).click();
  await expect(page).toHaveURL(/\/admin\/hizmetler$/);

  await page.getByRole("link", { name: "Yeni Hizmet Ekle" }).click();
  await page.getByLabel("Başlık").fill(uniqueTitle);
  await page
    .getByLabel("Açıklama (Markdown)")
    .fill("Playwright tarafından oluşturulan geçici hizmet.");
  await page.getByRole("button", { name: "Kaydet" }).click();
  await expect(page.getByRole("heading", { name: uniqueTitle })).toBeVisible();

  const createdItem = page.getByRole("article").filter({ hasText: uniqueTitle });
  await createdItem.getByRole("link", { name: "Düzenle" }).click();
  await page.getByLabel("Başlık").fill(updatedTitle);
  await page.getByRole("button", { name: "Güncelle" }).click();
  await expect(page.getByRole("heading", { name: updatedTitle })).toBeVisible();

  const updatedItem = page
    .getByRole("article")
    .filter({ hasText: updatedTitle });
  page.once("dialog", (dialog) => dialog.accept());
  await updatedItem.getByRole("button", { name: "Sil" }).click();
  await expect(
    page.getByRole("heading", { name: updatedTitle }),
  ).toHaveCount(0);

  await page.getByRole("button", { name: "Çıkış Yap" }).click();
  await expect(page).toHaveURL(/\/login$/);
});
