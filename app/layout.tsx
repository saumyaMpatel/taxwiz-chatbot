import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Providers from "./providers"
import { Inter, Fira_Code } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const firaCode = Fira_Code({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: "TaxWiz | Your AI Tax Assistant",
  description: "A helpful AI chatbot for all your tax-related questions",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${firaCode.className} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

