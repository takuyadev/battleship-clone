const selectMove = (): number[] => {
  const x = Math.floor(Math.random() * 9) + 1;
  const y = Math.floor(Math.random() * 9) + 1;

  return [x, y]
};

export { selectMove };
