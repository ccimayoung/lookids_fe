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
  <svg
    width="8"
    height="6"
    viewBox="0 0 6 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      y1="-0.25"
      x2="3.68907"
      y2="-0.25"
      transform="matrix(-0.670962 0.741491 0.675024 0.737796 5.19434 0.63623)"
      stroke="black"
      stroke-width="0.5"
    />
    <line
      y1="-0.25"
      x2="3.68714"
      y2="-0.25"
      transform="matrix(-0.675024 -0.737796 -0.670962 0.741491 2.71973 3.37158)"
      stroke="black"
      stroke-width="0.5"
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
