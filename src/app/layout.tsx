import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ToastProvider from "@/providers/ToastProvider";
import { ServerAuthProvider } from "@/providers/ServerAuthProvider";
import ClientAuthProvider from "@/providers/ClientAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "shoe store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <div className="container">
            <div className="wrapper">
              <ServerAuthProvider>
                  <Navbar />
                    {children}
                  <Footer />
              </ServerAuthProvider>
            </div>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
