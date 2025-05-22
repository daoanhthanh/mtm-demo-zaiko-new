"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
// import "./settings-menu.css";

const menuItems = [
    {label: "Products", path: "/settings/products"},
    {label: "Categories", path: "/settings/categories"},
    {label: "Warehouse", path: "/settings/warehouse"},
    {label: "Locations", path: "/settings/locations"},
    {label: "Customer", path: "/settings/customer"},
    {label: "Users", path: "/settings/users"},
    {label: "Permissions", path: "/settings/permissions"},
    {label: "Department", path: "/settings/department"},
];

export default function SettingsMenu() {
    const pathname = usePathname();
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
                                 {item.label}
                            </p>
                        </Link>
                    );
                })}
                </div>
            </nav>
    );

}
