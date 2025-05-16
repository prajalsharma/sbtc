import Image from "next/image";
import Discord from "./socials/discord";
import { Github } from "./socials/github";
import { X } from "./socials/x";
import { Youtube } from "./socials/youtube";
import { Developers, Ecosystem, Community, Resources } from "@/data/links";

const footerSocials = [
  {
    icon: <Discord />,
    title: "Discord",
    link: "https://discord.gg/starknet-community",
  },
  {
    icon: <Github />,
    title: "Github",
    link: "https://github.com/keep-starknet-strange/awesome-starknet",
  },
  {
    icon: <Youtube />,
    title: "Youtube",
    link: "https://www.youtube.com/channel/UCnDWguR8mE2oDBsjhQkgbvg",
  },
  {
    icon: <X />,
    title: "X-logo",
    link: "https://twitter.com/Starknet",
  },
];

const Footer = () => {
  return (
    <footer className="text-[15px] text-left text-secondary">
      <div className="p-0 flex-col flex items-center justify-center mx-auto max-w-[75rem]">
        <div className="w-full px-7.5 pb-10 pt-16 md:mb-0">
          <ul className="flex flex-col md:flex-row gap-y-5 justify-between">
            <li className="flex flex-col w-full md:border-r md:border-divider md:pr-8">
              <span className="footer-list-heading">Developers</span>
              <FooterList list={Developers} />
            </li>
            <li className="flex flex-col w-full md:border-r md:border-divider md:px-8">
              <span className="footer-list-heading">Ecosystem</span>
              <FooterList list={Ecosystem} />
            </li>
            <li className="flex flex-col w-full md:border-r md:border-divider md:px-8">
              <span className="footer-list-heading">Community</span>
              <FooterList list={Community} />
            </li>
            <li className="flex flex-col w-full md:pl-8">
              <span className="footer-list-heading">Resources</span>
              <FooterList list={Resources} />
            </li>
          </ul>
        </div>
        <div className="p-0 w-full flex flex-col md:flex-row md:items-center md:justify-between md:px-7.5 md:py-15 text-left">
          <div className="text-sm text-[#858585] flex flex-col md:flex-row gap-7.5 py-10 px-7.5 md:p-0 border-y border-divider md:border-none">
            <a href="/legal-disclaimers/">Privacy Policy</a>
            <a href="/legal-disclaimers/#terms-&amp;-conditions">Terms &amp; Conditions</a>
            <a href="/legal-disclaimers/#terms-of-use">Terms Of Use</a>
          </div>
          <div className="py-10 px-7.5 md:p-0 md:-order-1">
            <a href="/">
              <Image src="/starknet-logo-light.svg" alt="starknet-logo" width={152} height={35} />
            </a>
          </div>
          <div className="flex gap-6 pt-0 px-7.5 pb-15 md:p-0 text-white">
            {footerSocials.map((social, index) => (
              <a
                href={social.link}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

const FooterList = ({ list }: { list: { title: string; link: string; showArrow?: boolean }[] }) => {
  return (
    <ul className="flex flex-col">
      {list.map((item, index) => (
        <li key={index} className="flex flex-col w-full">
          <a
            href={item.link}
            className="text-sm text-[#858585] rounded-[18px] bg-none mt-4 flex items-center gap-1 hover:bg-header-bg hover:text-[#5C94FF]"
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
      ))}
    </ul>
  );
};
