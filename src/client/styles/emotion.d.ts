import '@emotion/react';

import { ButtonStyles, Colors } from './colors';
import { ButtonSizes } from './sizes';

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors;
    buttonSizes: ButtonSizes;
    buttonStyles: ButtonStyles;
  }
}
