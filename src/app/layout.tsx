import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { ChatProvider } from '../context/ChatContext';
import { FrameworkProvider } from '../context/FrameworkContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Component Generator</title>
      </head>
      <body className="min-h-screen bg-base-200">
        <ThemeProvider attribute="data-theme" defaultTheme="light">
          <FrameworkProvider>
            <ChatProvider>
              {children}
            </ChatProvider>
          </FrameworkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}