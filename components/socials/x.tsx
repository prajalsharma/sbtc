import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#E0E0E0"
        d="M10.694 7.614 17.381 0h-1.585l-5.81 6.61L5.35 0H0l7.014 9.996L0 17.98h1.585l6.132-6.982 4.898 6.982h5.35L10.694 7.614Zm-2.172 2.47-.712-.996L2.157 1.17h2.435l4.564 6.392.709.996 5.932 8.309h-2.434l-4.84-6.783Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#E0E0E0" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);
export { SvgComponent as X };
