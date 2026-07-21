import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CSPostHogProvider } from '../providers'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import SidebarMobile from "@/components/SidebarMobile";
import UmamiScript from "../_components/umami";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://hilars.dev'),
  title: "There is no place like 127.0.0.1",
  description: "A passionate Software and Systems Engineer specializing in Python, JavaScript, Linux and DevOps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UmamiScript websiteId="89f091d0-82db-416e-b801-16faa132c94f" />
      <body className={inter.className}>
        <CSPostHogProvider>
          <div className="font-sans min-h-screen flex flex-col">
            <div className="fixed md:hidden top-0 left-0 w-full z-50">
              <SidebarMobile />
            </div>
            <div className="flex flex-grow">
              <div className="hidden md:flex lg:flex md:w-60 lg:w-96 h-screen fixed top-0 overflow-y-auto">
                <Sidebar showMenu={true} />
              </div>
              <div className="flex-grow md:ml-60 lg:ml-96 overflow-y-auto flex justify-center items-start">
                <div className="block md:card bg-base-100 lg:m-10 md:m-5 md:shadow-xl w-full max-w-screen-lg">
                  {children}
                  <Analytics />
                  <SpeedInsights />
                </div>
              </div>
            </div>
          </div>
        </CSPostHogProvider>
      </body>
    </html>
  );
}
