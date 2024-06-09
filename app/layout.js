"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
            <title>Perangkat Lunak Simulasi FRS</title>
            <meta name="description" content="Perangkat Lunak Simulasi FRS." />
      </head>
      <SessionProvider>
        <body className={inter.className}>
            {children}
        </body>
      </SessionProvider>
    </html>
  )
}
