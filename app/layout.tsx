import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incomingHeaders = await headers();
  const host =
    incomingHeaders.get("x-forwarded-host") ??
    incomingHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    incomingHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const siteUrl = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", siteUrl).toString();

  return {
    metadataBase: siteUrl,
    title: "Midhun Somanunnithan — Machine Learning Researcher & Builder",
    description:
      "Portfolio of Midhun Somanunnithan: computer vision research, deep learning from scratch, agent systems, automation, and embedded machine learning.",
    icons: {
      icon: "/profile.png",
      shortcut: "/profile.png",
    },
    openGraph: {
      title: "Midhun Somanunnithan — Machine Learning Researcher & Builder",
      description:
        "Computer vision research, deep learning from scratch, agent systems, automation, and embedded machine learning.",
      type: "website",
      url: siteUrl,
      images: [
        {
          url: socialImage,
          width: 1536,
          height: 1024,
          alt: "Midhun Somanunnithan — Learning systems, from first principles.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Midhun Somanunnithan — Machine Learning Researcher & Builder",
      description:
        "I build learning systems from first principles, then test what survives reality.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
