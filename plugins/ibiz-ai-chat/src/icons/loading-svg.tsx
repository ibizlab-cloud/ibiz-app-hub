export const LoadingSvg = (props: { className?: string }) => (
  <svg
    className={props.className}
    width='16'
    height='16'
    viewBox='0 0 50 50'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle
      cx='25'
      cy='25'
      r='20'
      stroke='currentColor'
      strokeWidth='5'
      fill='none'
      strokeDasharray='31.415, 31.415'
      strokeLinecap='round'
    >
      <animateTransform
        attributeName='transform'
        type='rotate'
        from='0 25 25'
        to='360 25 25'
        dur='1s'
        repeatCount='indefinite'
      />
    </circle>
  </svg>
);
