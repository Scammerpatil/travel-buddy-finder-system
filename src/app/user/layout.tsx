"use client";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { UserProvider, useUser } from "@/context/UserContext";
import SideNav from "./SideNav";
import { useEffect } from "react";
import axios from "axios";
import FillDetails from "@/Components/FillDetails";

const Component = ({ children }: { children: React.ReactNode }) => {
  const { setUser, user } = useUser();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("/api/auth/verifytoken");
      if (response.data) {
        setUser(response.data.user);
      }
    };
    fetchUser();
  }, []);
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
        {user?.destinations?.length === 0 || user?.interests?.length === 0 ? (
          <FillDetails />
        ) : (
          <>
            <Toaster />
            <SideNav>{children}</SideNav>
          </>
        )}
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
