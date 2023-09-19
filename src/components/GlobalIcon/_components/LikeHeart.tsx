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
    width="30"
    height="24"
    viewBox="0 0 10 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse
      cx="2.2248"
      cy="3.36997"
      rx="2.2248"
      ry="3.36997"
      transform="matrix(0.766466 0.642285 -0.646763 0.762691 6.58984 0)"
      fill={color}
    />
    <ellipse
      cx="2.2248"
      cy="3.37101"
      rx="2.2248"
      ry="3.37101"
      transform="matrix(0.766467 -0.642283 0.646762 0.762692 0 2.85791)"
      fill={color}
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
