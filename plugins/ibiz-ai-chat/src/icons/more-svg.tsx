export const MoreSvg = (props: {
  className?: string;
  onClick?: (event: MouseEvent) => void;
}) => (
  <svg
    className={props.className}
    onClick={props.onClick}
    viewBox='0 0 1024 1024'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M128 384a128 128 0 1 1 0 256 128 128 0 0 1 0-256z m768 0a128 128 0 1 1 0 256 128 128 0 0 1 0-256z m-372.4288 0a128 128 0 1 1 0 256 128 128 0 0 1 0-256z'></path>
  </svg>
);
