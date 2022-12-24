export const colors = {
  BLACK_900: '#00000',
  BLACK_700: '#191919',

  GRAY_200: '#F8F8FA',
  GRAY_300: '#F1F1F5',
  GRAY_400: '#EDEDED',
  GRAY_500: '#DBDBDB',
  GRAY_700: '#99999',
  GRAY_900: '#707070',

  GREEN_700: '#42AB34',

  YELLOW_700: '#E5C84D',

  WHITE_000: '#FFFFF',
} as const;

export type Colors = typeof colors;
