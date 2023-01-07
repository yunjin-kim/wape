export const colors = {
  BLACK_900: '#000000',
  BLACK_700: '#191919',
  BLACK_OPACITY_200: 'rgba(0, 0, 0, 0.2)',

  GRAY_200: '#F8F8FA',
  GRAY_300: '#F1F1F5',
  GRAY_400: '#EDEDED',
  GRAY_500: '#DBDBDB',
  GRAY_700: '#999999',
  GRAY_900: '#707070',

  GREEN_700: '#42AB34',

  YELLOW_700: '#E5C84D',

  RED_700: '#FF0000',

  WHITE_000: '#FFFFFF',
} as const;

export type Colors = typeof colors;

export type ColorsValue = typeof colors[keyof Colors];

export const buttonStyles = {
  BRAND: { font: colors.WHITE_000, back: colors.GREEN_700, border: colors.GREEN_700 },
  BRAND_REVERSE: { font: colors.GREEN_700, back: colors.WHITE_000, border: colors.GRAY_700 },
  BASIC: { font: colors.BLACK_700, back: colors.WHITE_000, border: colors.WHITE_000 },
};

export type ButtonStyles = typeof buttonStyles;

export type ButtonStylesKey = keyof typeof buttonStyles;
