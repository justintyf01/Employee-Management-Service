"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GeistSans } from "geist/font/sans";

import { AuthProvider } from "./components/providers/auth-provider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//     title: "Employee",
//     description: "Generated by create next app",
// };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={GeistSans.className}>
                <Provider store={store}>
                    <AuthProvider>
                        {/* <Suspense fallback={<CircularProgress />}>{children}</Suspense> */}
                        {children}

                        {/* <Toaster /> */}
                    </AuthProvider>
                </Provider>
            </body>
        </html>
    );
}
