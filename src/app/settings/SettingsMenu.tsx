"use client";
import { useTranslation } from "@refinedev/core";
import Link from "next/link";
import {usePathname} from "next/navigation";

const menuItems = [
    {label: "products", path: "/settings/products"},
    {label: "categories", path: "/settings/categories"},
    {label: "warehouse", path: "/settings/warehouse"},
    {label: "locations", path: "/settings/locations"},
    {label: "customer", path: "/settings/customer"},
    {label: "users", path: "/settings/users"},
    {label: "permissions", path: "/settings/permissions"},
    {label: "department", path: "/settings/department"},
];

export default function SettingsMenu() {
    const pathname = usePathname();
    const {translate: t} = useTranslation()
    return (
        <nav className="bg-[var(--ant-color-bg-container)] to-gray-50 backdrop-blur-xl shadow-md rounded-full border border-gray-100 inline-flex p-2">
                {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                    <Link href={item.path} key={item.path} legacyBehavior>
                        <p
                            className={`px-[12px] py-[9px] rounded-full font-medium transition-all duration-300 mx-1
                                flex items-center group
                                ${isActive
                                    ? "bg-[var(--ant-color-primary-active)] text-white hover:bg-blue-700 shadow-sm"
                                    : "text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                                }
                            `}>
                                {t(`settings.navbar.${item.label}`)}
                        </p>
                    </Link>
                );
            })}
        </nav>
    );

}
