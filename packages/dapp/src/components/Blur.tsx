import { FC, SVGProps, useId } from "react";

type BlurProps = SVGProps<SVGSVGElement> & {};

export const Blur: FC<BlurProps> = props => {
  let id = useId();

  return (
    <svg viewBox="0 0 1140 34" fill="none" {...props}>
      <g opacity=".6" filter={`url(#${id}-a)`}>
        <path fill={`url(#${id}-b)`} d="M6 6h1128v22H6z" />
        <path fill={`url(#${id}-c)`} d="M6 6h1128v22H6z" />
      </g>
      <defs>
        <radialGradient
          id={`${id}-c`}
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 -22 1128 0 563 28)"
        >
          <stop offset=".273" stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </radialGradient>
        <linearGradient id={`${id}-b`} x1={6} y1={6} x2={1134} y2={6} gradientUnits="userSpaceOnUse">
          <stop stopColor="#A78BFA" stopOpacity={0} />
          <stop offset=".323" stopColor="#A78BFA" />
          <stop offset=".672" stopColor="#EC4899" stopOpacity=".3" />
          <stop offset={1} stopColor="#EC4899" stopOpacity={0} />
        </linearGradient>
        <filter
          id={`${id}-a`}
          x={0}
          y={0}
          width={1140}
          height={34}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation={3} result="effect1_foregroundBlur_311_43535" />
        </filter>
      </defs>
    </svg>
  );
};
