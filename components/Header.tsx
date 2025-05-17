"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import Image from "next/image";
import Discord from "./socials/discord";
import { X } from "./socials/x";
import { ChevronDown } from "lucide-react";
import { Developers, HeaderCommunity, HeaderEcosystem, HeaderResources } from "@/data/links";
import Link from "next/link";

const Header = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  //   const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="bg-header-bg sticky z-[1000] top-0">
      <div className="max-w-[1344px] mx-auto flex items-center p-4 w-full lg:px-8">
        <div>
          <Link href="/">
            <Image
              src="/starknet-logo-light.svg"
              alt=""
              width={152}
              height={35}
              className="!min-w-[152px]"
              priority
            />
          </Link>
        </div>
        <nav className="flex flex-row items-center bg-header-bg basis-0 lg:basis-full lg:justify-between ml-auto">
          <div>
            <ul className="flex w-full p-5 flex-col lg:flex-row lg:gap-4.5 lg:py-0 lg:pr-0 lg:pl-8.5">
              <li
                className="relative group"
                // onClick={() => setOpenMenu(openMenu === "developers" ? null : "developers")}
              >
                <span className="header-list-heading">
                  Developers
                  <ChevronDown className="transition-transform mt-0.5 ml-2 lg:size-[13px] group-hover:-rotate-180 duration-300 ease-initial" />
                </span>
                <HeaderSubMenu
                  list={Developers}
                  // isOpen={openMenu === "developers"}
                />
              </li>
              <li className="relative group">
                <span className="header-list-heading">
                  Ecosystem
                  <ChevronDown className="transition-transform mt-0.5 ml-2 lg:size-[13px] group-hover:-rotate-180 duration-300 ease-initial" />
                </span>
                <HeaderSubMenu list={HeaderEcosystem} />
              </li>
              <li className="relative group">
                <span className="header-list-heading">
                  Community
                  <ChevronDown className="transition-transform mt-0.5 ml-2 lg:size-[13px] group-hover:-rotate-180 duration-300 ease-initial" />
                </span>
                <HeaderSubMenu list={HeaderCommunity} />
              </li>
              <li className="relative group">
                <span className="header-list-heading">
                  Resources
                  <ChevronDown className="transition-transform mt-0.5 ml-2 lg:size-[13px] group-hover:-rotate-180 duration-300 ease-initial" />
                </span>
                <ResourceMenu list={HeaderResources} />
              </li>
            </ul>
          </div>
          <a
            className="rounded-[8px] text-sm leading-6 px-4 py-2 border border-white text-[#E8E8F7FF] hover:text-[#AFCAFF] hover:bg-[#DEDEF614] hover:border-[#AFCAFF] transition-colors mx-auto"
            href="https://starkgate.starknet.io/"
            target="_blank">
            Bridge
          </a>
          {isDesktop && <HeaderSocials />}
        </nav>
      </div>
    </header>
  );
};
export default Header;

const HeaderSocials = () => {
  return (
    <div className="flex gap-2.5 items-center pt-5 px-4 lg:py-0 lg:pr-4 lg:pl-6">
      <a
        href="https://discord.gg/starknet-community"
        target="_blank"
        rel="noopener noreferrer"
        className="px-1.5">
        <Discord />
      </a>{" "}
      <a
        href="https://twitter.com/Starknet"
        target="_blank"
        rel="noopener noreferrer"
        className="px-1.5">
        <X />
      </a>
    </div>
  );
};

const HeaderSubMenu = ({
  list,
  isOpen = false,
}: {
  list: { title?: string; link?: string; showArrow?: boolean; heading?: string }[];
  isOpen?: boolean;
}) => {
  return (
    <ul
      className={`lg:block lg:absolute header-submenu bg-[#1B1B1B] rounded-[8px] lg:p-6 lg:w-max lg:right-auto transition-all lg:left-0 opacity-0 origin-top text-left top-auto scale-95 translate-z-0 group-hover:scale-100 group-hover:opacity-100 group-hover:left-auto group-hover:delay-150 group-hover:h-auto group-hover:overflow-visible
     ${isOpen ? "transform-none opacity-100 left-auto delay-150 h-auto overflow-visible" : ""}`}>
      {list.map((item, index) =>
        item.heading ? (
          <p key={index} className="p-4 text-sm font-bold text-white uppercase leading-[17px]">
            {item.heading}
          </p>
        ) : (
          <li key={index} className="flex flex-col w-full">
            <a
              href={item.link}
              title={item.title}
              className="text-sm text-secondary/80 rounded-[18px] bg-none flex items-center gap-1 hover:bg-header-bg hover:text-[#AFCAFF] transition-colors duration-300 py-2 px-4"
              {...(item.showArrow ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {item.title}
              {item.showArrow && (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z"
                    clipRule="evenodd"></path>
                </svg>
              )}
            </a>
          </li>
        )
      )}
    </ul>
  );
};

const ResourceMenu = ({
  list,
  isOpen = false,
}: {
  list: {
    title?: string;
    link?: string;
    showArrow?: boolean;
    heading?: string;
    children?: any[];
  }[];
  isOpen?: boolean;
}) => {
  return (
    <ul
      className={`lg:block lg:absolute header-submenu bg-[#1B1B1B] rounded-[8px] lg:p-6 lg:w-max lg:right-auto transition-all lg:left-0 opacity-0 origin-top text-left top-auto scale-95 translate-z-0 group-hover:scale-100 group-hover:opacity-100 group-hover:left-auto group-hover:delay-150 group-hover:h-auto group-hover:overflow-visible
     ${isOpen ? "scale-100 opacity-100 left-auto delay-150 h-auto overflow-visible" : ""}`}>
      {list.map((item, index) =>
        item.heading ? (
          <p key={index} className="p-4 text-sm font-bold text-white uppercase leading-[17px]">
            {item.heading}
          </p>
        ) : (
          <li
            key={index}
            className={`flex flex-col w-full ${item.children ? "group/blog relative" : ""}`}>
            <a
              href={item.link}
              title={item.title}
              className="text-sm text-secondary/80 rounded-[18px] bg-none flex items-center gap-1 hover:bg-header-bg hover:text-[#AFCAFF] transition-colors duration-300 py-2 px-4"
              {...(item.showArrow ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {item.title}
              {item.showArrow && (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z"
                    clipRule="evenodd"></path>
                </svg>
              )}
              {item.children && (
                <svg
                  className="ml-2"
                  width="14"
                  height="14"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true">
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </a>
            {item.children && (
              <ul className="lg:absolute left-full -top-[23px] w-max bg-[#1B1B1B] rounded-r-[8px] opacity-0 pointer-events-none group-hover/blog:opacity-100 group-hover/blog:pointer-events-auto transition-opacity z-20 p-6">
                {item.children.map((child, childIdx) => (
                  <li key={childIdx}>
                    <a
                      href={child.link}
                      className="flex gap-2 px-4 py-2 text-sm text-secondary/80 hover:bg-header-bg hover:text-[#AFCAFF] rounded-[8px] transition-colors">
                      <Image src={child.icon} alt="" width={24} height={24} className="mr-0.5" />
                      <div>
                        <p className="text-sm font-bold">{child.title}</p>
                        <p className="text-xs text-secondary/80">{child.subtitle}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )
      )}
    </ul>
  );
};
