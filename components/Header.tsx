"use client";

import { useState } from "react";
import Link from "next/link";
import useMediaQuery from "@/hooks/useMediaQuery";
import Image from "next/image";
import Discord from "./socials/discord";
import { X } from "./socials/x";
import { ChevronDown, Menu, XIcon } from "lucide-react";
import { Developers, HeaderCommunity, HeaderEcosystem, HeaderResources } from "@/data/links";

const Header = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [openMenu, setOpenMenu] = useState(false);
  const [openList, setOpenList] = useState<string | null>(null);

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
          <div
            className={`fixed w-full h-screen-minus-79 z-99 top-[79px] left-0  transition-transform items-center flex flex-col bg-header-bg overflow-auto lg:overflow-visible lg:visible lg:top-0 lg:static lg:w-auto lg:h-auto ${
              openMenu ? "translate-x-0" : "-translate-x-full lg:translate-0"
            }`}>
            <ul className="flex w-full p-5 flex-col lg:flex-row lg:gap-4.5 lg:py-0 lg:pr-0 lg:pl-8.5">
              <NavMenuItem
                label="Developers"
                list={Developers}
                isDesktop={isDesktop}
                openList={openList}
                setOpenList={setOpenList}
                submenuComponent={HeaderSubMenu}
              />
              <NavMenuItem
                label="Ecosystem"
                list={HeaderEcosystem}
                isDesktop={isDesktop}
                openList={openList}
                setOpenList={setOpenList}
                submenuComponent={HeaderSubMenu}
              />
              <NavMenuItem
                label="Community"
                list={HeaderCommunity}
                isDesktop={isDesktop}
                openList={openList}
                setOpenList={setOpenList}
                submenuComponent={HeaderSubMenu}
              />
              <li
                className={`relative ${isDesktop && "group"}`}
                onClick={() => setOpenList(openList === "Resources" ? null : "Resources")}>
                <span
                  className={`header-list-heading rounded-sm ${
                    !isDesktop && openList === "Resources" && "bg-[#AFCAFF] text-header-bg "
                  }`}>
                  Resources
                  <ChevronDown
                    className={`transition-transform mt-0.5 ml-2 size-8 lg:size-[13px] group-hover:-rotate-180 duration-300 ease-initial ${
                      !isDesktop && openList === "Resources" && "-rotate-180"
                    }`}
                  />
                </span>
                <ResourceMenu
                  list={HeaderResources}
                  isOpen={openList === "Resources"}
                  isDesktop={isDesktop}
                />
              </li>
              {!isDesktop && <HeaderSocials />}
            </ul>
          </div>
          <a
            className="rounded-[8px] text-sm leading-6 px-4 py-2 border border-white text-[#E8E8F7FF] hover:text-[#AFCAFF] hover:bg-[#DEDEF614] hover:border-[#AFCAFF] transition-colors mx-auto"
            href="https://starkgate.starknet.io/"
            target="_blank">
            Bridge
          </a>
          {isDesktop && <HeaderSocials />}
          <button
            aria-expanded={openMenu}
            onClick={() => {
              setOpenMenu(!openMenu);
              setOpenList(null);
            }}
            className="lg:hidden py-3 pl-6">
            {openMenu ? <XIcon color="white" /> : <Menu color="white" />}
            <span className="sr-only">Menu</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
export default Header;

type NavMenuItemProps = {
  label: string;
  list: any[];
  isDesktop: boolean;
  openList?: string | null;
  setOpenList?: (val: string | null) => void;
  submenuComponent?: React.ComponentType<{ list: any[]; isOpen?: boolean }>;
};

const NavMenuItem = ({
  label,
  list,
  isDesktop,
  openList,
  setOpenList,
  submenuComponent: SubmenuComponent = HeaderSubMenu,
}: NavMenuItemProps) => (
  <li
    className={`relative ${isDesktop && "group"}`}
    onClick={setOpenList ? () => setOpenList(openList === label ? null : label) : undefined}>
    <span
      className={`header-list-heading rounded-sm ${
        !isDesktop && openList === label && "bg-[#AFCAFF] text-header-bg "
      }`}>
      {label}
      <ChevronDown
        className={`transition-transform mt-0.5 ml-2 size-8 lg:size-[13px] group-hover:-rotate-180 duration-300 ease-initial
        ${!isDesktop && openList === label && "-rotate-180 "}
        `}
      />
    </span>
    <SubmenuComponent list={list} isOpen={openList === label} />
  </li>
);

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
      className={`lg:block lg:absolute header-submenu bg-[#1B1B1B] rounded-[8px] lg:p-6 lg:w-max lg:right-auto lg:transition-all lg:left-0 lg:opacity-0 origin-top text-left top-auto lg:scale-95 translate-z-0 group-hover:scale-100 group-hover:opacity-100 group-hover:left-auto group-hover:delay-150 w-full group-hover:overflow-visible lg:pointer-events-none lg:group-hover:pointer-events-auto overflow-hidden
      ${isOpen ? "flex flex-col py-2 pointer-events-auto" : "hidden pointer-events-none"}`}>
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

type ResourceChild = {
  icon: string;
  title: string;
  subtitle: string;
  link: string;
};

type ResourceItem = {
  title?: string;
  link?: string;
  showArrow?: boolean;
  heading?: string;
  children?: ResourceChild[];
};

const ResourceMenu = ({
  list,
  isOpen = false,
  isDesktop,
}: {
  list: ResourceItem[];
  isOpen?: boolean;
  isDesktop: boolean;
}) => {
  return (
    <ul
      className={`lg:block lg:absolute header-submenu bg-[#1B1B1B] rounded-[8px] lg:p-6 lg:w-max lg:right-auto lg:transition-all lg:left-0 lg:opacity-0 origin-top text-left top-auto lg:scale-95 translate-z-0 group-hover:scale-100 group-hover:opacity-100 group-hover:left-auto group-hover:delay-150 w-full group-hover:overflow-visible lg:pointer-events-none lg:group-hover:pointer-events-auto overflow-hidden
      ${isOpen ? "flex flex-col py-2 pointer-events-auto" : "hidden pointer-events-none"}`}>
      {list.map((item, index) =>
        item.heading ? (
          <p key={index} className="p-4 text-sm font-bold text-white uppercase leading-[17px]">
            {item.heading}
          </p>
        ) : (
          <li
            key={index}
            className={`flex flex-col w-full ${
              isDesktop && item.children ? "group/blog relative" : ""
            }`}>
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
              <ul className="lg:absolute left-full -top-6 lg:w-max bg-[#1B1B1B] rounded-r-[8px] lg:opacity-0 lg:pointer-events-none group-hover/blog:opacity-100 group-hover/blog:pointer-events-auto transition-opacity z-20 lg:p-6 p-3 w-full">
                {item.children.map((child, childIdx) => (
                  <li key={childIdx}>
                    <a
                      href={child.link}
                      className="flex gap-2 px-4 py-2 text-sm text-secondary/80 hover:bg-header-bg hover:text-[#AFCAFF] rounded-[8px] transition-colors items-center">
                      <Image
                        src={child.icon}
                        alt=""
                        width={24}
                        height={24}
                        className="mr-0.5 size-6"
                      />
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
