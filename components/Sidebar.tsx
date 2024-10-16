import React from "react";
import Link from 'next/link';
import { IconStars, IconSticker2, IconAddressBook } from "@tabler/icons-react";
import Welcome from "./Welcome";
import Social from "./Social";
import Footer from "./Footer";

interface Props {
  showMenu: boolean;
}

const Sidebar: React.FC<Props> = ({ showMenu }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow p-4 bg-base-100 text-base-content overflow-auto">
        <Welcome />
        <div className="flex flex-col mt-16">
          {showMenu && (
            <ul className="menu menu-lg">
              <li className="font-medium">
                <a href="/blog">
                  <IconSticker2 />
                  <span className="underline decoration-primary">Blog</span>
                </a>
              </li>
              <li className="font-medium">
                <a href="/projects">
                  <IconStars />
                  <span className="underline decoration-primary">Projects</span>
                </a>
              </li>
              <li className="font-medium">
                <a href="/contact">
                  <IconAddressBook />
                  <span className="underline decoration-primary">Contact</span>
                </a>
              </li>
            </ul>
          )}
          <Social />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sidebar;
