const Component = ({ color }: { color: string }) => (
  <svg
    width="12"
    height="11"
    viewBox="0 0 12 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.43301 10.25C6.24056 10.5833 5.75944 10.5833 5.56699 10.25L3 5.80385L0.433012 1.35769C0.240562 1.02436 0.481125 0.607694 0.866025 0.607694L11.134 0.607694C11.5189 0.607694 11.7594 1.02436 11.567 1.35769L6.43301 10.25Z"
      fill={color}
    />
  </svg>
);

export default Component;
