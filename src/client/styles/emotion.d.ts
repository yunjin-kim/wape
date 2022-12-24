import '@emotion/react';

import { Colors } from './colorList';

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors;
  }
}
