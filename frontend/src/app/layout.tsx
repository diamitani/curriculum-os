import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CurriculumOS — AI Curriculum Architect",
  description:
    "Research, index, and generate personalized learning paths with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
