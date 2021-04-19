export const getPx = (n: number | string) =>
  typeof n === 'number' ? `${n}px` : n;

export const idxx = (mask = 'xxxxxxxxxx', map = '0123456789abcdef') => {
  const length = map.length;
  return mask.replace(/x/g, () => map[Math.floor(Math.random() * length)]);
};
