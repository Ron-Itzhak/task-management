import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import localFont from "next/font/local";
import NavBar from "../components/navigation-bar";
import { CatalogsProvider } from "./contexts/catalogs-context";
import "./globals.css";
import { TasksProvider } from "./contexts/tasks-context";
import { CategoriesProvider } from "./contexts/categories-context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TasksProvider>
      <CategoriesProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <NavBar></NavBar>
            {children}
            <Toaster />
          </body>
        </html>
      </CategoriesProvider>
    </TasksProvider>
  );
}
