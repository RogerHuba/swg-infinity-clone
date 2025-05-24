"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, MessageCircle, Play } from "lucide-react";
import { ServerStatus } from "@/components/ServerStatus";

// Define types for nav items
interface SubmenuItem {
  name: string;
  href: string;
  external?: boolean;
}

interface NavItem {
  name: string;
  href: string;
  submenu?: SubmenuItem[];
}

// Define the navigation menu items
const navItems: NavItem[] = [
  {
    name: "ABOUT INFINITY",
    href: "/about-infinity",
    submenu: [
      { name: "Latest Patch Notes", href: "/blog" },
      { name: "Infinity Specific Rules", href: "/about-infinity/infinity-specific-rules" },
      { name: "Roadmap", href: "/about-infinity/roadmap" },
      { name: "Vision and Mantras", href: "/about-infinity/vision-and-mantras" },
      { name: "Meet the team", href: "/about-infinity/meet-the-team" },
      { name: "Join the Team", href: "/join-the-team" },
    ],
  },
  {
    name: "GUIDES",
    href: "/guides",
    submenu: [
      { name: "Jedi Unlock", href: "/guides/jedi-unlock" },
      { name: "The Knight Trials", href: "/guides/the-knight-trials" },
      { name: "The Warren", href: "/guides/the-warren" },
      { name: "Treasure Hunting", href: "/guides/treasure-hunting" },
      { name: "Character Builder", href: "/character-builder" },
    ],
  },
  {
    name: "SERVER INFORMATION",
    href: "/server-information",
    submenu: [
      { name: "Cities", href: "/server-information/cities" },
      { name: "Guilds", href: "/server-information/guilds" },
      { name: "Heritage", href: "/server-information/heritage" },
      { name: "Game Pictures", href: "/server-information/game-pictures" },
      { name: "Resources", href: "/server-information/resources" },
      { name: "Schematics", href: "/server-information/schematics" },
      { name: "Galactic Civil War", href: "/server-information/galactic-civil-war" },
    ],
  },
  {
    name: "SUPPORT",
    href: "/support-2",
    submenu: [
      { name: "FAQ for New Players", href: "/faq" },
      { name: "New Infinity Launcher", href: "/new-launcher" },
      { name: "Multiple Account Request", href: "/multiple-account-request" },
    ],
  },
  { name: "DONATE", href: "/donate" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (name: string) => {
    if (activeSubmenu === name) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(name);
    }
  };

  return (
    <header className="main-nav sticky top-0 z-50 py-3">
      <div className="container mx-auto flex items-center justify-between px-2 lg:px-4">
        {/* Logo with Mobile Discord */}
        <div className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="https://ext.same-assets.com/906812322/2537617269.png"
                alt="SWG Infinity | Play Star Wars Galaxies: An Empire Divided Today!"
                width={80}
                height={42}
                className="lg:w-[106px] lg:h-[56px] xl:w-[120px] xl:h-[64px]"
                priority
              />
            </Link>
          </div>

          {/* Mobile-only Discord Button */}
          <a
            href="https://discord.gg/jyakeRJ"
            target="_blank"
            rel="noopener noreferrer"
            className="lg:hidden bg-[#5865F2] hover:bg-[#4752C4] text-white px-2 py-1.5 rounded-lg flex items-center space-x-1 transition-all duration-200 font-medium shadow-lg text-xs"
          >
            <MessageCircle className="h-3 w-3" />
            <span>Discord</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center flex-1 justify-between ml-2 lg:ml-4 xl:ml-6 min-w-0">
          <div className="border-l border-gray-600 pl-4 xl:pl-6 flex-1 min-w-0">
            <ul className="flex space-x-2 lg:space-x-4 xl:space-x-8 justify-center">
              {navItems.map((item) => (
                <li key={item.name} className="relative group">
                  {item.submenu ? (
                    <div className="group">
                      <span className="text-white hover:text-gray-300 cursor-pointer text-xs lg:text-sm font-semibold py-2 px-1 flex items-center tracking-wide whitespace-nowrap">
                        {item.name}
                        <svg
                          className="ml-1 h-3 lg:h-4 w-3 lg:w-4 text-gray-400 group-hover:text-gray-300"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <div className="absolute left-0 mt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-1 z-10">
                        <div className="bg-[#0d0d30] py-1 rounded shadow-lg border border-[#1a1a4a]">
                          {item.submenu.map((subItem) =>
                            subItem.external ? (
                              <a
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#1a1a4a] hover:text-white"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {subItem.name}
                              </a>
                            ) : (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#1a1a4a] hover:text-white"
                              >
                                {subItem.name}
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-white hover:text-gray-300 text-xs lg:text-sm font-semibold py-2 px-1 tracking-wide transition-colors whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Status Panel */}
          <div className="border-l border-gray-600 pl-3 xl:pl-6 flex items-center space-x-2 xl:space-x-3 flex-shrink-0">
            {/* Server Status - 2 slot wide box */}
            <div className="bg-[#0d0d30] border border-[#1a1a4a] rounded-lg px-3 lg:px-4 xl:px-6 py-2 xl:py-3 min-w-[180px] lg:min-w-[200px] xl:min-w-[240px] flex items-center justify-center">
              <ServerStatus showRefresh={false} />
            </div>

            {/* Action Buttons Stack */}
            <div className="flex flex-col space-y-1 xl:space-y-2">
              {/* Discord Button */}
              <a
                href="https://discord.gg/jyakeRJ"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-2 lg:px-3 xl:px-4 py-1.5 xl:py-2 rounded-lg flex items-center justify-center space-x-1 xl:space-x-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 min-w-[100px] lg:min-w-[120px] xl:min-w-[140px] text-xs xl:text-sm"
              >
                <MessageCircle className="h-3 xl:h-4 w-3 xl:w-4" />
                <span>Discord</span>
              </a>

              {/* Play Now Button */}
              <Link
                href="/play-now"
                className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white px-2 lg:px-3 xl:px-4 py-1.5 xl:py-2 rounded-lg flex items-center justify-center space-x-1 xl:space-x-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 min-w-[100px] lg:min-w-[120px] xl:min-w-[140px] text-xs xl:text-sm"
              >
                <Play className="h-3 xl:h-4 w-3 xl:w-4" />
                <span>Play Now</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Button */}
        <div className="lg:hidden">
          <button
            type="button"
            className="text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#0d0d30] border-t border-[#1a1a4a] mt-3">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Status Panel */}
            <div className="px-3 py-3 border-b border-[#1a1a4a] mb-3">
              <div className="flex flex-col space-y-3">
                {/* Mobile Server Status Box - Full Width */}
                <div className="bg-[#1a1a4a] border border-[#2a2a6a] rounded-lg px-4 py-3">
                  <ServerStatus showRefresh={true} />
                </div>

                {/* Mobile Action Buttons Row */}
                <div className="flex space-x-2">
                  {/* Mobile Discord Button */}
                  <a
                    href="https://discord.gg/jyakeRJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 font-medium shadow-lg flex-1 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Discord</span>
                  </a>

                  {/* Mobile Play Now Button */}
                  <Link
                    href="/play-now"
                    className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 font-medium shadow-lg flex-1 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Play className="h-4 w-4" />
                    <span>Play Now</span>
                  </Link>
                </div>
              </div>
            </div>

            {navItems.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <div className="py-2">
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className="w-full flex justify-between items-center text-white font-medium px-3 py-2"
                    >
                      <span>{item.name}</span>
                      <svg
                        className={`h-4 w-4 text-gray-400 transform ${
                          activeSubmenu === item.name ? 'rotate-180' : ''
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {activeSubmenu === item.name && (
                      <div className="pl-6 space-y-2 mt-1">
                        {item.submenu.map((subItem) =>
                          subItem.external ? (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="text-gray-300 hover:text-white block px-3 py-1 text-sm"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.name}
                            </a>
                          ) : (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="text-gray-300 hover:text-white block px-3 py-1 text-sm"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-white hover:bg-[#1a1a4a] block px-3 py-2 text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
