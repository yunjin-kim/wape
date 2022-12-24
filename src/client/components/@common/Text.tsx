import { PropsWithChildren } from 'react';
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Colors } from '../../styles/colors';

interface Props extends PropsWithChildren {
  size: number;
  color?: keyof Colors;
}

type TextColorProps = Props & Record<'theme', Theme>;

const Text = ({ size, color, children }: Props) => {
  return (
    <S.Container size={size} color={color}>
      {children}
    </S.Container>
  );
};

const S = {
  Container: styled.p`
    font-size: ${({ size }: Pick<Props, 'size'>) => `${size}rem`};
    color: ${({ theme, color }: TextColorProps) => (color ? color : theme.colors.BLACK_700)};
  `,
};

export default Text;
