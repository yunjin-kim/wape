export const buttonSizes = {
  TINY: { width: 2, height: 1 },
  SMALL: { width: 5.625, height: 1.75 },
  LARGE: { width: 15, height: 2.5 },
} as const;

export type ButtonSizes = typeof buttonSizes;

export type ButtonKeys = keyof typeof buttonSizes;
