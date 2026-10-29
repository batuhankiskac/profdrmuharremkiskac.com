import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFoundContent from "@/components/NotFoundContent";
import { NOT_FOUND_METADATA } from "@/lib/metadata";

export const metadata: Metadata = NOT_FOUND_METADATA;

// Eşleşmeyen URL'ler (site) düzenine girmez; başlık ve alt bilgi burada eklenir.
export default function RootNotFound() {
  return (
    <>
      <Header />
      <NotFoundContent />
      <Footer />
    </>
  );
}
