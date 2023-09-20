import React from 'react';
import { IIconProps } from '../globalIconType';

const Component = ({ onClick }: IIconProps) => (
  <svg
    onClick={onClick}
    width="98"
    height="23"
    viewBox="0 0 98 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.9 19.8H1.34V3H4.9V19.8ZM13.1905 7.8C14.3771 7.8 15.4438 8.06667 16.3905 8.6C17.3371 9.12 18.0771 9.84667 18.6105 10.78C19.1438 11.7133 19.4105 12.7667 19.4105 13.94C19.4105 15.1133 19.1438 16.1667 18.6105 17.1C18.0771 18.0333 17.3371 18.76 16.3905 19.28C15.4438 19.8133 14.3771 20.08 13.1905 20.08C12.0038 20.08 10.9371 19.8133 9.99047 19.28C9.0438 18.76 8.3038 18.0333 7.77047 17.1C7.23714 16.1667 6.97047 15.1133 6.97047 13.94C6.97047 12.7667 7.23714 11.7133 7.77047 10.78C8.3038 9.84667 9.0438 9.12 9.99047 8.6C10.9371 8.06667 12.0038 7.8 13.1905 7.8ZM13.1905 10.84C12.3638 10.84 11.6905 11.1333 11.1705 11.72C10.6638 12.2933 10.4105 13.0333 10.4105 13.94C10.4105 14.8467 10.6638 15.5933 11.1705 16.18C11.6905 16.7533 12.3638 17.04 13.1905 17.04C14.0171 17.04 14.6838 16.7533 15.1905 16.18C15.7105 15.5933 15.9705 14.8467 15.9705 13.94C15.9705 13.0333 15.7105 12.2933 15.1905 11.72C14.6838 11.1333 14.0171 10.84 13.1905 10.84ZM27.1163 7.8C28.3029 7.8 29.3696 8.06667 30.3163 8.6C31.2629 9.12 32.0029 9.84667 32.5363 10.78C33.0696 11.7133 33.3363 12.7667 33.3363 13.94C33.3363 15.1133 33.0696 16.1667 32.5363 17.1C32.0029 18.0333 31.2629 18.76 30.3163 19.28C29.3696 19.8133 28.3029 20.08 27.1163 20.08C25.9296 20.08 24.8629 19.8133 23.9163 19.28C22.9696 18.76 22.2296 18.0333 21.6963 17.1C21.1629 16.1667 20.8963 15.1133 20.8963 13.94C20.8963 12.7667 21.1629 11.7133 21.6963 10.78C22.2296 9.84667 22.9696 9.12 23.9163 8.6C24.8629 8.06667 25.9296 7.8 27.1163 7.8ZM27.1163 10.84C26.2896 10.84 25.6163 11.1333 25.0963 11.72C24.5896 12.2933 24.3363 13.0333 24.3363 13.94C24.3363 14.8467 24.5896 15.5933 25.0963 16.18C25.6163 16.7533 26.2896 17.04 27.1163 17.04C27.9429 17.04 28.6096 16.7533 29.1163 16.18C29.6363 15.5933 29.8963 14.8467 29.8963 13.94C29.8963 13.0333 29.6363 12.2933 29.1163 11.72C28.6096 11.1333 27.9429 10.84 27.1163 10.84ZM40.402 15.5L38.982 17.1V19.8H35.422V3H38.982V12.86L43.122 8.08H47.082L42.582 13.08L47.322 19.8H43.262L40.402 15.5ZM50.5419 2.42C51.1685 2.42 51.6885 2.62667 52.1019 3.04C52.5152 3.45333 52.7219 3.97333 52.7219 4.6C52.7219 5.22667 52.5152 5.74667 52.1019 6.16C51.6885 6.57333 51.1685 6.78 50.5419 6.78C49.9152 6.78 49.3952 6.57333 48.9819 6.16C48.5685 5.74667 48.3619 5.22667 48.3619 4.6C48.3619 3.97333 48.5685 3.45333 48.9819 3.04C49.3952 2.62667 49.9152 2.42 50.5419 2.42ZM52.3219 19.84H48.7619V8.08H52.3219V19.84ZM60.0923 20.08C58.9857 20.08 57.999 19.8133 57.1323 19.28C56.2657 18.76 55.5923 18.0333 55.1123 17.1C54.6323 16.1667 54.3923 15.1133 54.3923 13.94C54.3923 12.7667 54.6323 11.7133 55.1123 10.78C55.5923 9.84667 56.2657 9.12 57.1323 8.6C57.999 8.06667 58.9857 7.8 60.0923 7.8C61.599 7.8 62.719 8.29333 63.4523 9.28V3H67.0123V19.8H63.4523V18.6C62.719 19.5867 61.599 20.08 60.0923 20.08ZM60.6523 17.04C61.519 17.04 62.2123 16.7533 62.7323 16.18C63.2523 15.5933 63.5123 14.8467 63.5123 13.94C63.5123 13.0333 63.2523 12.2933 62.7323 11.72C62.2123 11.1333 61.519 10.84 60.6523 10.84C59.8123 10.84 59.139 11.1333 58.6323 11.72C58.1257 12.2933 57.8723 13.0333 57.8723 13.94C57.8723 14.8467 58.1257 15.5933 58.6323 16.18C59.139 16.7533 59.8123 17.04 60.6523 17.04ZM74.5994 7.8C75.5727 7.8 76.4594 7.96 77.2594 8.28C78.0594 8.58667 78.6994 9.02667 79.1794 9.6C79.6594 10.1733 79.9194 10.84 79.9594 11.6H76.5194C76.466 11.24 76.2527 10.96 75.8794 10.76C75.5194 10.5467 75.0727 10.44 74.5394 10.44C74.006 10.44 73.5594 10.5267 73.1994 10.7C72.8527 10.86 72.6794 11.0733 72.6794 11.34C72.6794 11.62 72.886 11.8467 73.2994 12.02C73.7127 12.1933 74.4327 12.36 75.4594 12.52C77.1527 12.7733 78.3594 13.1933 79.0794 13.78C79.7994 14.3667 80.1594 15.1733 80.1594 16.2C80.1594 16.9733 79.9127 17.6533 79.4194 18.24C78.926 18.8267 78.2594 19.28 77.4194 19.6C76.5794 19.92 75.6594 20.08 74.6594 20.08C73.646 20.08 72.726 19.9133 71.8994 19.58C71.086 19.26 70.4327 18.8 69.9394 18.2C69.4594 17.6 69.1994 16.9 69.1594 16.1H72.5994C72.6527 16.4733 72.8794 16.78 73.2794 17.02C73.6794 17.2467 74.1594 17.36 74.7194 17.36C75.2927 17.36 75.766 17.2667 76.1394 17.08C76.5127 16.8933 76.6994 16.6667 76.6994 16.4C76.6994 16.12 76.4794 15.8867 76.0394 15.7C75.5994 15.5 74.8794 15.3267 73.8794 15.18C72.346 14.9533 71.186 14.5667 70.3994 14.02C69.626 13.4733 69.2394 12.64 69.2394 11.52C69.2394 10.7733 69.4727 10.12 69.9394 9.56C70.4194 9 71.066 8.56667 71.8794 8.26C72.6927 7.95333 73.5994 7.8 74.5994 7.8Z"
      fill="black"
    />
    <path
      d="M92.5336 3.92683C92.5336 5.54327 91.2232 6.85366 89.6068 6.85366C87.9903 6.85366 86.6799 5.54327 86.6799 3.92683C86.6799 2.31039 87.9903 1 89.6068 1C91.2232 1 92.5336 2.31039 92.5336 3.92683Z"
      fill="#FFD600"
    />
    <path
      d="M85.4603 8.31708C85.4603 7.50886 86.1155 6.85367 86.9237 6.85367H92.2896C93.0978 6.85367 93.753 7.50886 93.753 8.31708V14.1707C93.753 14.979 93.0978 15.6342 92.2896 15.6342H86.9237C86.1155 15.6342 85.4603 14.979 85.4603 14.1707V8.31708Z"
      fill="#FFD600"
    />
    <path
      d="M86.6799 15.6342C86.6799 15.0954 87.1167 14.6586 87.6555 14.6586H88.1433C88.6822 14.6586 89.119 15.0954 89.119 15.6342V20.0244C89.119 20.5632 88.6822 21 88.1433 21H87.6555C87.1167 21 86.6799 20.5632 86.6799 20.0244V15.6342Z"
      fill="#FFD600"
    />
    <path
      d="M90.0945 15.6342C90.0945 15.0954 90.5313 14.6586 91.0701 14.6586H91.5579C92.0967 14.6586 92.5335 15.0954 92.5335 15.6342V20.0244C92.5335 20.5632 92.0967 21 91.5579 21H91.0701C90.5313 21 90.0945 20.5632 90.0945 20.0244V15.6342Z"
      fill="#FFD600"
    />
    <path
      d="M94.6165 9.73239C94.2743 10.3125 93.5267 10.5054 92.9466 10.1632C92.3664 9.82099 92.1736 9.07331 92.5158 8.4932L94.4985 5.13196C94.8407 4.55185 95.5883 4.35898 96.1684 4.70117C96.7486 5.04336 96.9414 5.79104 96.5992 6.37115L94.6165 9.73239Z"
      fill="#FFD600"
    />
    <path
      d="M84.7097 5.09632C84.3429 4.53146 83.5876 4.37092 83.0228 4.73774C82.4579 5.10457 82.2974 5.85984 82.6642 6.4247L85.0553 10.1067C85.4221 10.6715 86.1774 10.8321 86.7422 10.4652C87.3071 10.0984 87.4676 9.34314 87.1008 8.77828L84.7097 5.09632Z"
      fill="#FFD600"
    />
    <path
      d="M89.1189 3.43907C89.1189 3.70848 89.0097 3.92687 88.875 3.92687C88.7403 3.92687 88.6311 3.70848 88.6311 3.43907C88.6311 3.16966 88.7403 2.95126 88.875 2.95126C89.0097 2.95126 89.1189 3.16966 89.1189 3.43907Z"
      fill="white"
    />
    <path
      d="M90.5823 3.43907C90.5823 3.70848 90.4731 3.92687 90.3384 3.92687C90.2037 3.92687 90.0945 3.70848 90.0945 3.43907C90.0945 3.16966 90.2037 2.95126 90.3384 2.95126C90.4731 2.95126 90.5823 3.16966 90.5823 3.43907Z"
      fill="white"
    />
    <path
      d="M90.1369 4.9024H89.0772C88.8906 4.9024 88.7821 5.1133 88.8905 5.26513C89.0341 5.46607 89.2658 5.58533 89.5128 5.58533H89.7014C89.9483 5.58533 90.1801 5.46607 90.3236 5.26513C90.432 5.1133 90.3235 4.9024 90.1369 4.9024Z"
      fill="white"
    />
  </svg>
);
// const Component = ({size = 20, color, style}) => {
//   return (
//     <IconWrapper style={style}>
//       <ArrowLeftIcon size={size} color={color} />
//     </IconWrapper>
//   );
// };

export default Component;
