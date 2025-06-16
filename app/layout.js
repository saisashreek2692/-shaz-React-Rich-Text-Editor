import { Jost } from "next/font/google";
import "./globals.css";

const jostSans = Jost({
  variable: "--font-jost-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "React Rich Text Editor",
  description:
    "Created this Text Editor for ReactJS Applications, It supports from version 18+.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jostSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
