import './globals.css';

export const metadata = {
  title: 'AI Chat Support',
  description: 'Chat with AI using Ollama',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}
