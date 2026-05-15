import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";
import CareerCoachChat from "@/components/career-coach-chat";
import { Info, Phone, Mail } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "AI Career Coach",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <CareerCoachChat />

            {/* FOOTER */}
            <footer className="footer">
              {/* CENTER TAGLINE */}
              <div className="footer-center">
                <h2>PathPilot</h2>
                <p>AI-powered career development platform for professional success.</p>
              </div>
              <br />
              <br />
              <hr style={{ borderColor: '#1c6b3a', margin: '20px 0' }} />
              <br />
              {/* BOTTOM ROW */}
              <div className="footer-bottom">
                {/* LEFT */}
                <div className="footer-left">
                  <a href="/aboutus">
                    <Info className="mr-2" /> About Us
                  </a>
                  <a href="/contact">
                    <Phone className="mr-2" /> Contact Us
                  </a>
                  <a href="mailto:pathpilot.forprofessionalsuccess@gmail.com">
                    <Mail className="mr-2" /> pathpilot.forprofessionalsuccess@gmail.com
                  </a>
                </div>

                {/* RIGHT */}
                <div className="footer-right">
                  © 2026 PathPilot | BS CSDA IIT Patna Semester 2 Capstone Project
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}