export interface NavigationLink {
  href: string;
  label: string;
}

export const navigationLinks: NavigationLink[] = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkinda", label: "Hakkında" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/makaleler", label: "Makaleler" },
  { href: "/videolar", label: "Videolar" },
];

export const contactLink: NavigationLink = {
  href: "/iletisim",
  label: "İletişim",
};

export function isActivePath(pathname: string, href: string): boolean {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}
