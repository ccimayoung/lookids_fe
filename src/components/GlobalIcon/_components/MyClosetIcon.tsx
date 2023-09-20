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
  <svg
    width="19"
    height="24"
    viewBox="0 0 19 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0.5 1.23077C0.5 0.551036 1.05103 0 1.73077 0H17.7308C18.4105 0 18.9615 0.551035 18.9615 1.23077V20.9231C18.9615 21.6028 18.4105 22.1538 17.7308 22.1538H1.73077C1.05103 22.1538 0.5 21.6028 0.5 20.9231V1.23077ZM1.73077 1.23077V20.9231H17.7308V1.23077L1.73077 1.23077Z"
      fill={color}
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.11542 21.5384V0.615356H10.3462V21.5384H9.11542ZM2.34619 22.7692V21.5384H3.57696V22.7692H4.80773V21.5384H6.0385V22.7692C6.0385 23.4489 5.48747 24 4.80773 24H3.57696C2.89723 24 2.34619 23.4489 2.34619 22.7692ZM13.4231 22.7692V21.5384H14.6539V22.7692H15.8847V21.5384H17.1154V22.7692C17.1154 23.4489 16.5644 24 15.8847 24H14.6539C13.9741 24 13.4231 23.4489 13.4231 22.7692Z"
      fill={color}
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.88467 10.4615C8.22454 10.4615 8.50006 10.7371 8.50006 11.0769V12.3077C8.50006 12.6476 8.22454 12.9231 7.88467 12.9231C7.5448 12.9231 7.26929 12.6476 7.26929 12.3077V11.0769C7.26929 10.7371 7.5448 10.4615 7.88467 10.4615Z"
      fill={color}
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.5768 10.4615C11.9167 10.4615 12.1922 10.7371 12.1922 11.0769V12.3077C12.1922 12.6476 11.9167 12.9231 11.5768 12.9231C11.2369 12.9231 10.9614 12.6476 10.9614 12.3077V11.0769C10.9614 10.7371 11.2369 10.4615 11.5768 10.4615Z"
      fill={color}
    />
  </svg>
);

export default Component;
