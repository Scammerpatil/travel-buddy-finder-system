"use client";
import "../globals.css";
import Header from "@/Components/Header";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/context/UserContext";

const Component = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>Travel Buddy Finder System</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Connect with solo travelers and find perfect travel buddies based on your preferences."
        />
      </head>
      <body className={`antialiased`}>
        <Header />
        <Toaster />
        {children}
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <Component>{children}</Component>
    </UserProvider>
  );
}
