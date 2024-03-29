import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { ColorsValue } from '../../styles/colors';
import { StyledProps } from '../../types/style';
import { theme } from '../../styles/theme';

interface Props extends PropsWithChildren {
  size?: number;
  align?: 'center' | 'left' | 'right' | 'initial';
  color?: ColorsValue;
}

const Text = ({
  size = 1,
  align = 'initial',
  color = theme.colors.BLACK_700,
  children,
  ...props
}: Props) => {
  return (
    <S.Container size={size} align={align} color={color} {...props}>
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
