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
const Component = () => (
  <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <rect width="14" height="14" fill="url(#pattern0)" />
    <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_29_10594" transform="scale(0.00390625)" />
      </pattern>
      <image
        id="image0_29_10594"
        width="256"
        height="256"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

export default Component;