import '@emotion/react';

import { Colors } from './colors';

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors;
  }
}
