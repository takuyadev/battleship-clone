const Loading = ({ percentage }: { percentage: number }) => {
  return (
    <svg className="w-64 min-w-3xl" style={{ rotate: '-90deg' }} viewBox='0 0 100 100'>
      <circle
        className='duration-200'
        style={{
          strokeDashoffset: 123 + (193 * percentage) / 100,
          strokeDasharray: 315,
        }}
        strokeLinecap='round'
        stroke='#6366f1'
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
