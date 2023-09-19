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
  <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M23.4616 16.284C19.8505 20.5423 14.6328 22.0752 11.8076 19.7077C8.98233 17.3402 9.61942 11.9689 13.2305 7.71049C16.8417 3.4521 22.0594 1.91924 24.8846 4.28674C27.7098 6.65424 27.0727 12.0256 23.4616 16.284Z"
      fill={color}
    />
    <path
      d="M16.7716 7.71289C20.3838 11.9726 21.0218 17.345 18.1966 19.7125C15.3713 22.08 10.1527 20.546 6.54051 16.2863C2.92829 12.0266 2.29031 6.65422 5.11556 4.28673C7.9408 1.91924 13.1594 3.45318 16.7716 7.71289Z"
      fill={color}
    />
  </svg>
);

export default Component;
