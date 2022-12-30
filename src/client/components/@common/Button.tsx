import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { ButtonStylesKey } from '../../styles/colors';
import { ButtonKeys } from '../../styles/sizes';
import { StyledProps } from '../../types/style';

interface Props extends PropsWithChildren {
  size: ButtonKeys;
  buttonStyle: ButtonStylesKey;
  textSize: number;
  onClick?: () => void;
}

const Button = ({ size, buttonStyle, textSize, onClick, children }: Props) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <S.Container size={size} buttonStyle={buttonStyle} onClick={handleClick}>
      <S.Text buttonStyle={buttonStyle} textSize={textSize}>
        {children}
      </S.Text>
    </S.Container>
  );
};

const S = {
  Container: styled.button`
    ${({ theme, size, buttonStyle }: StyledProps<Pick<Props, 'size' | 'buttonStyle'>>) => css`
      width: ${theme.buttonSizes[size].width}rem;
      height: ${theme.buttonSizes[size].height}rem;
      background-color: ${theme.buttonStyles[buttonStyle].back};
    `}
    border: none;
    border-radius: 1.25rem;
  `,

  Text: styled.p`
    ${({
      theme,
      buttonStyle,
      textSize,
    }: StyledProps<Pick<Props, 'buttonStyle' | 'textSize'>>) => css`
      color: ${theme.buttonStyles[buttonStyle].font};
      font-size: ${textSize}rem;
    `}
  `,
};

export default Button;
