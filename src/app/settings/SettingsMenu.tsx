"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./settings-menu.css";

const menuItems = [
  { label: "Products", path: "/settings/products" },
  { label: "Categories", path: "/settings/categories" },
  { label: "Warehouse", path: "/settings/warehouse" },
  { label: "Locations", path: "/settings/locations" },
  { label: "Customer", path: "/settings/customer" },
  { label: "Users", path: "/settings/users" },
  { label: "Permissions", path: "/settings/permissions" },
  { label: "Department", path: "/settings/department" },
];

export default function SettingsMenu() {
  const pathname = usePathname();
  return (
    <nav className="settings-menu-nav">
      <ul className="settings-menu-list">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link href={item.path} legacyBehavior>
              <a
                className={
                  "settings-menu-link" + (pathname === item.path ? " active" : "")
                }
              >
                {item.label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
