import styled from '@emotion/styled';

interface Props {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

const MarginBox = ({ ...props }: Props) => {
  return <S.Container {...props} />;
};

const S = {
  Container: styled.div`
    margin: ${({ top = 0, right = 0, bottom = 0, left = 0 }: Props) =>
      `${top}rem ${right}rem ${bottom}rem ${left}rem`};
  `,
};

export default MarginBox;
