import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import "../globals.css";
import UmamiScript from "../_components/umami";

export default function V2eLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UmamiScript websiteId="89f091d0-82db-416e-b801-16faa132c94f" />
      <body>
          <div className="min-h-screen">
            {/* <ConfettiComponent /> */}
              {children}
            <Analytics />
            <SpeedInsights />
          </div>
      </body>
    </html>
  );
}
