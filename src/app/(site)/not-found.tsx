import type { Metadata } from "next";
import NotFoundContent from "@/components/NotFoundContent";
import { NOT_FOUND_METADATA } from "@/lib/metadata";

export const metadata: Metadata = NOT_FOUND_METADATA;

export default function NotFound() {
  return <NotFoundContent />;
}
