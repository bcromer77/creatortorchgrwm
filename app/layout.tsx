// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "CreatorTorch",
  description: "Connecting brands with creators through data",
};

export default function RootLayout({ children }: { children: ReactNode }) 
{
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

