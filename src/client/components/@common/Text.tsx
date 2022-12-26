import { PropsWithChildren } from 'react';
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Colors } from '../../styles/colors';

interface Props extends PropsWithChildren {
  size?: number;
  align?: 'center' | 'left' | 'right' | 'initial';
  color?: keyof Colors;
}

type StyledProps = Omit<Props, 'children'> & Record<'theme', Theme>;

const Text = ({ size = 1, align = 'initial', color = 'BLACK_700', children }: Props) => {
  return (
    <S.Container size={size} align={align} color={color}>
      {children}
    </S.Container>
  );
};

const S = {
  Container: styled.p`
    font-size: ${({ size }: StyledProps) => `${size}rem`};
    color: ${({ color }: StyledProps) => color};
    text-align: ${({ align }: StyledProps) => align};
  `,
};

export default Text;
