"use client";
import { Provider } from "react-redux";
import NavBar from "../ui/NavBar";
import { store } from "@/redux/store";

interface ContentLayoutProps {
    title: string;
    children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
    return (
        <div>
            <NavBar title={title} />
            <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
        </div>
    );
}
