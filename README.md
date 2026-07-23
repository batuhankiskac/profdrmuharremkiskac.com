# profdrmuharremkiskac.com

Prof. Dr. Muharrem Kıskaç’ın Next.js tabanlı kurumsal sitesi ve içerik yönetim
paneli. Public sayfalar Firebase Admin ile sunucuda render edilir; tarayıcıya
yalnız admin girişinde gereken Firebase Auth kodu gönderilir.

## Gereksinimler

- Node.js 22+
- Firebase projesi, Firestore ve Storage
- Firebase Authentication üzerinde e-posta/şifre sağlayıcısı
- Admin kullanıcıda `admin: true` custom claim’i

## Yerel kurulum

```bash
npm ci
cp env-example.txt .env.local
npm run dev
```

`.env.local` içindeki Firebase client değerleri yalnız login ekranı içindir.
`FIREBASE_CLIENT_EMAIL` ve `FIREBASE_PRIVATE_KEY` gibi Admin değerleri yalnız
sunucuda tutulmalı, `NEXT_PUBLIC_` öneki almamalı ve repoya eklenmemelidir.

Yönetici hesabına Firebase Admin SDK ile `admin: true` custom claim’i verilmesi
zorunludur; yalnız e-posta eşleşmesi yönetici yetkisi sağlamaz.

## Veri ve güvenlik

- Public makale, hizmet ve video okumaları sunucudan yapılır.
- Admin oturumu doğrulanmış Firebase ID token’dan üretilen `HttpOnly` cookie
  kullanır.
- Admin ekleme, güncelleme ve silme işlemleri server action olarak çalışır.
- Yüklenen görseller maksimum 5 MB kabul edilir, 1600 px içine küçültülür ve
  WebP olarak saklanır.
- `firestore.rules` ve `storage.rules` client erişimini admin claim’iyle sınırlar.

Kuralları production’a almadan önce Firebase CLI ile doğru projeyi seçin:

```bash
firebase deploy --only firestore:rules,storage
```

Eski `image` alanlarını silmeden `imageUrl` alanına kopyalayan migration:

```bash
npm run migrate:images
```

Migration doğrulandıktan sonra legacy alanların kaldırılması ayrı bir bakım
adımıdır.

## Kontroller

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

Playwright testleri sistemde kurulu Google Chrome’u kullanır. Firebase Admin env
değerleri yoksa public koleksiyonlar boş gösterilir ve admin login entegrasyonu
yerine anonim ve sahte-cookie yönlendirme davranışı test edilir.
`E2E_ADMIN_EMAIL` ile `E2E_ADMIN_PASSWORD` tanımlandığında login, hizmet
ekleme-düzenleme-silme ve logout akışı da geçici bir kayıtla çalıştırılır.

## Production notları

- Hostinger ortamında bütün server-only env değerlerini tanımlayın.
- hCDN bot challenge ayarının Lighthouse ve güvenilir izleme araçlarına `403`
  döndürmediğini doğrulayın.
- Google Ads ve telefon dönüşümü GTM konteyneri içinde tutulmalıdır. Site yalnız
  kullanıcı analiz izni verdikten sonra GTM’yi yükler.
