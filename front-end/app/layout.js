import NavBar from "./Components/Sections/NavBar";
import "./globals.css";

export const metadata = {
  title: "Velvet Code"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
