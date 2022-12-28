import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { Colors } from '../../styles/colors';
import { StyledProps } from '../../types/style';

interface Props extends PropsWithChildren {
  size?: number;
  align?: 'center' | 'left' | 'right' | 'initial';
  color?: keyof Colors;
}

const Text = ({ size = 1, align = 'initial', color = 'BLACK_700', children }: Props) => {
  return (
    <S.Container size={size} align={align} color={color}>
      {children}
    </S.Container>
  );
};

const S = {
  Container: styled.p`
    font-size: ${({ size }: StyledProps<Omit<Props, 'children'>>) => `${size}rem`};
    color: ${({ color }: StyledProps<Omit<Props, 'children'>>) => color};
    text-align: ${({ align }: StyledProps<Omit<Props, 'children'>>) => align};
  `,
};

export default Text;
