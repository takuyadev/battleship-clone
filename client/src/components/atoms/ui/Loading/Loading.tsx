const Loading = ({ percentage }: { percentage: number }) => {
  console.log(percentage);
  return (
    <svg style={{ rotate: '-90deg' }} viewBox='0 0 100 100'>
      <circle
        className='duration-200'
        style={{
          strokeDashoffset: 123 + (193 * percentage) / 100,
          strokeDasharray: 315,
        }}
        strokeLinecap='round'
        stroke='red'
        fill='none'
        cx='50'
        cy='50'
        strokeWidth='4'
        r='30'
      />
    </svg>
  );
};

export default Loading;
