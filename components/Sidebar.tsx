"use client";
import React from "react";
import Link from 'next/link';
import { IconStars, IconSticker2, IconAddressBook, IconHome } from "@tabler/icons-react";
import Welcome from "./Welcome";
import Social from "./Social";
import Footer from "./Footer";

interface Props {
  showMenu: boolean;
  toggleDrawer?: () => void;
}

const Sidebar: React.FC<Props> = ({ showMenu, toggleDrawer }) => {
  const handleLinkClick = () => {
    if (toggleDrawer) {
      toggleDrawer();
    }
  };

  return (
    <aside className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200 shadow-lg">
      <div className="flex-grow p-6 text-base-content overflow-auto">
        <Welcome />
        <nav className="flex flex-col mt-12">
          {showMenu && (
            <ul className="menu menu-lg space-y-4">
              <li className="font-semibold text-lg">
                <Link href="/" className="flex items-center space-x-2 hover:text-primary transition-colors duration-300" onClick={handleLinkClick}>
                  <IconHome />
                  <span className="underline decoration-primary">Home</span>
                </Link>
              </li>
              <li className="font-semibold text-lg">
                <Link href="/blog" className="flex items-center space-x-2 hover:text-primary transition-colors duration-300" onClick={handleLinkClick}>
                  <IconSticker2 />
                  <span className="underline decoration-primary">Blog</span>
                </Link>
              </li>
              <li className="font-semibold text-lg">
                <Link href="/projects" className="flex items-center space-x-2 hover:text-primary transition-colors duration-300" onClick={handleLinkClick}>
                  <IconStars />
                  <span className="underline decoration-primary">Projects</span>
                </Link>
              </li>
              <li className="font-semibold text-lg">
                <Link href="/contact" className="flex items-center space-x-2 hover:text-primary transition-colors duration-300" onClick={handleLinkClick}>
                  <IconAddressBook />
                  <span className="underline decoration-primary">Contact</span>
                </Link>
              </li>
            </ul>
          )}
          <Social />
        </nav>
      </div>
      <Footer />
    </aside>
  );
};

export default Sidebar;
