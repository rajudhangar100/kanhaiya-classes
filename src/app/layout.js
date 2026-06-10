import "./globals.css";
import { Poppins, Playfair_Display } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Kanhaiya Classes",
  description:
    "Empowering students from 1st to 12th with quality education and progress tracking.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${playfair.variable}`}
      >
        {children}
      </body>
    </html>
  );
}