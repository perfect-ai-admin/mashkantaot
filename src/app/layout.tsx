import type { Metadata } from "next";
import "./globals.css";
import { WhatsAppButton } from "@/components/ui/whatsapp-button"

export const metadata: Metadata = {
  title: "משכנתא חכמה — מערכת למשכנתאות, מחזור ואיחוד הלוואות",
  description:
    "מערכת דיגיטלית חכמה למשכנתא חדשה, מחזור משכנתא ואיחוד הלוואות. בדיקת זכאות, מחשבונים, העלאת מסמכים ומעקב תהליך — הכל במקום אחד.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
