export const buttonSizes = {
  LARGE: { width: 15, height: 2.5 },
} as const;

export type ButtonSizes = typeof buttonSizes;

export type ButtonKeys = keyof typeof buttonSizes;
