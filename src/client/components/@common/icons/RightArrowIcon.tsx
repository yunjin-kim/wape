import { SVGProps } from 'react';

const RightArrowIcon = ({ width, height, color }: SVGProps<SVGMaskElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 17.305 32.828"
    >
      <g id="그룹_80" data-name="그룹 80" transform="translate(-80.086 -101.586)">
        <path
          id="패스_41"
          data-name="패스 41"
          d="M81.5,103,96,118,81.5,133"
          fill="none"
          stroke={color}
          stroke-linecap="round"
          stroke-miterlimit="10"
          stroke-width="2"
        />
        <path
          id="패스_42"
          data-name="패스 42"
          d="M81.5,103,96,118,81.5,133"
          fill="none"
          stroke="#000"
          stroke-linecap="round"
          stroke-miterlimit="10"
          stroke-width="2"
        />
      </g>
    </svg>
  );
};

export default RightArrowIcon;
