import { SVGProps } from 'react';

const RightArrowIcon = ({ width, height, color }: SVGProps<SVGMaskElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 40 40">
      <g id="그룹_169" data-name="그룹 169" transform="translate(1531 1303) rotate(180)">
        <g id="그룹_80" data-name="그룹 80" transform="translate(1422.5 1165)">
          <path
            id="패스_41"
            data-name="패스 41"
            d="M81.5,103,96,118,81.5,133"
            fill="none"
            stroke="#42a22c"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            id="패스_42"
            data-name="패스 42"
            d="M81.5,103,96,118,81.5,133"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </g>
        <rect
          id="사각형_23979"
          data-name="사각형 23979"
          width="40"
          height="40"
          transform="translate(1491 1263)"
          fill="none"
          opacity="0.2"
        />
      </g>
    </svg>
  );
};

export default RightArrowIcon;
