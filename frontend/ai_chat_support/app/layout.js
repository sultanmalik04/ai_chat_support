import { Inter } from 'next/font/google'
import './globals.css'
import ChatWidget from './components/ChatWidget'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Chat Support',
  description: 'AI-powered chat support system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
