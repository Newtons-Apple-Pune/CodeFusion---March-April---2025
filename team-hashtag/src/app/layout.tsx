import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Cyber Secure Docs",
  description: "Upload and analyze sensitive documents to get analysis on vulnerabilities or to know whether your images are corrupted.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
