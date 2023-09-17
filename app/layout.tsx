import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import styles from "@/app/page.module.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'State Maestro',
  description: 'Generate custom FMS and play with it!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.main}>
          <div className={styles.center}>
            <div className={styles.top}>{children}</div>
          </div>
        </div>
      </body>
    </html>
  )
}
