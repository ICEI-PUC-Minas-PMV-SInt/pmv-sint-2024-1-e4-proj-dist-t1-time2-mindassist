import '@/app/globals.css'

import { ptBR } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

import '@stream-io/video-react-sdk/dist/css/styles.css'
import 'react-datepicker/dist/react-datepicker.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'MindAssit | Seu Parceiro de Vida',
  description: 'Um verdadeiro parceiro para ajudar a pensar no seu futuro, problemas e soluções',
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider
      localization={ptBR}
      appearance={{
        elements: {
          socialButtonsIconButton: {
            backgroundColor: '#ffffff20',
          },
        },
        layout: {
          socialButtonsPlacement: 'bottom',
          logoImageUrl: '/images/mind-assist-logo.png',
          logoPlacement: 'inside',
          socialButtonsVariant: 'iconButton',
        },
        variables: {
          colorText: '#fff',
          colorPrimary: '#0E78F9',
          colorBackground: '#1c1f2e',
          colorInputBackground: '#252a41',
          colorInputText: '#fff',
        },
      }}
    >
      <html lang="en" suppressHydrationWarning className="flex size-full overflow-clip">
        <body className={cn('flex flex-1 font-sans antialiased bg-dark-2 overflow-clip', fontSans.variable)}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </body>
        <Toaster />
      </html>
    </ClerkProvider>
  )
}
