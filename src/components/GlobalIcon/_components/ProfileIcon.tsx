/* eslint-disable max-len */
import React from 'react';
/**
 *
 * @param {object} props
 * @param {'arrow-down'} props.name
 * @param {number} props.size
 * @param {string} props.color
 * @Reference https://oblador.github.io/react-native-vector-icons/
 * @returns
 */
const Component = ({ color = '#FFCBCB', backColor = '#FFCBCB' }: { color?: string; backColor?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_168_153)">
      <rect width="24" height="24" rx="12" fill={backColor} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0277 12.2578C14.6394 12.2578 16.7566 10.1406 16.7566 7.52894C16.7566 4.91724 14.6394 2.80005 12.0277 2.80005C9.41599 2.80005 7.29879 4.91724 7.29879 7.52894C7.29879 10.1406 9.41599 12.2578 12.0277 12.2578ZM0.800049 21.1408C0.800049 18.7548 3.93517 13.6266 12.0001 13.6266C20.0649 13.6266 23.2001 18.7548 23.2001 21.1395C23.2001 23.5255 16.5246 24.1606 12.0001 24.1606C7.47554 24.1606 0.800049 23.5255 0.800049 21.1408Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_168_153">
        <rect width="24" height="24" rx="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default Component;
