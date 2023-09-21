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
const Component = ({ color = '#FFCBCB' }: { color: string }) => (
  <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 11.5C0 10.6716 0.671573 10 1.5 10H21.5C22.3284 10 23 10.6716 23 11.5C23 12.3284 22.3284 13 21.5 13H1.5C0.671573 13 0 12.3284 0 11.5Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.5 0C12.3284 3.62118e-08 13 0.671573 13 1.5L13 21.5C13 22.3284 12.3284 23 11.5 23C10.6716 23 10 22.3284 10 21.5L10 1.5C10 0.671573 10.6716 -3.62116e-08 11.5 0Z"
      fill={color}
    />
  </svg>
);

export default Component;
