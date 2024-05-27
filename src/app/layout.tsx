import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Clothes shop Admin Dashboard",
  description: "Clothes shop Admin Dashboard web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        
          <main className="w-full  p-4 bg-indigo-100 shadow-md rounded-3xl">
            {children}
          </main>
        
      </body>
    </html>
  );
}
