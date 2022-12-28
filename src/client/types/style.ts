import { Theme } from '@emotion/react';

export type StyledProps<T> = T & Record<'theme', Theme>;
