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
    title: "Midhun Somanunnithan — Machine Learning Researcher & Engineer",
    description:
      "Portfolio of Midhun Somanunnithan: computer vision research, intelligent automation, deep learning systems, and embedded machine learning.",
    icons: {
      icon: "/profile.png",
      shortcut: "/profile.png",
    },
    openGraph: {
      title: "Midhun Somanunnithan — Machine Learning Researcher & Engineer",
      description:
        "Computer vision research, intelligent automation, deep learning systems, and embedded machine learning.",
      type: "website",
      url: siteUrl,
      images: [
        {
          url: socialImage,
          width: 1536,
          height: 1024,
          alt: "Midhun Somanunnithan — Machine Learning Researcher & Engineer.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Midhun Somanunnithan — Machine Learning Researcher & Engineer",
      description:
        "Computer vision, intelligent automation, and machine learning systems grounded in measurable results.",
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
