import "./globals.css";

export const metadata = {
  title: "SSTEAM GUESS — Target 90% (Backtest Based)",
  description: "Register → Admin approval → Premium expiry (7 days).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
