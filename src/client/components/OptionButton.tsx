import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StyledProps } from '../types/style';

interface Props {
  index: number;
  currentCheck: number;
  onClick?: () => void;
}

interface OptionProps {
  order: number;
  currentCheck: number;
}

export default function OptionButton({ index, currentCheck, onClick }: Props) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <S.Container onClick={handleClick}>
      <S.CarouselChecked order={index} currentCheck={currentCheck} />
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    ${({ theme }) => css`
      border: 1px solid ${theme.colors.BLACK_900};
      background-color: ${theme.colors.WHITE_000};
    `}
  `,

  CarouselChecked: styled.div`
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    ${({ theme, order, currentCheck }: StyledProps<OptionProps>) => css`
      border: 1px solid ${theme.colors.BLACK_900};
      background-color: ${theme.colors.BLACK_900};
      opacity: ${order === currentCheck ? 0.99 : 0};
    `}
  `,
};
