"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useTranslation} from "@refinedev/core";

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
    const {translate: t} = useTranslation();
    return (
            <nav className="bg-gradient-to-b from-white to-gray-50 backdrop-blur-xl shadow-md rounded-full border border-gray-100 inline-flex">
                <div className="flex flex-row items-center px-[15px]">
                    {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link href={item.path} key={item.path} legacyBehavior>
                            <p
                                className={`mx-[3px] my-[12px] px-4 py-2 rounded-full font-large transition-all duration-300
                                    flex items-center group cursor-pointer
                                    ${isActive
                                        ? "bg-gray-600 text-white hover:bg-gray-700 shadow-sm"
                                        : "text-gray-600 hover:bg-gray-200 hover:text-gray-600"
                                    }
                                `}
                            >
                                 {t(`settings.navbar.${item.label}`)}
                            </p>
                        </Link>
                    );
                })}
                </div>
            </nav>
    );

}
