import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Text & Files | DiffMate",
  description:
    "Compare text snippets, code, documents, and files side by side with our advanced comparison tool.",
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
