import {Theme} from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Text from '../../../client/components/@common/Text';

export interface WalkEffectInfo {
  imgSrc: string;
  alt: string;
  text: string;
  top: number;
  left: number;
  zIndex: number;
}

type StyledProps = Pick<WalkEffectInfo, 'top' | 'left' | 'zIndex'> & Record<'theme', Theme>;

interface Props {
  WalkEffectInfo: WalkEffectInfo;
}

export default function WalkEffectInfoBox({WalkEffectInfo}: Props) {
  const {imgSrc, alt, text, top, left, zIndex} = WalkEffectInfo;

  return (
    <S.Container top={top} left={left} zIndex={zIndex}>
      <Image priority src={imgSrc} width={50} height={50} alt={alt} />
      <Text size={0.625} align={'center'}>
        {text}
      </Text>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    position: absolute;
    top: ${({top}: StyledProps) => `${top}rem`};
    left: ${({left}: StyledProps) => `${left}rem`};
    z-index: ${({zIndex}: StyledProps) => zIndex};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 6.25rem;
    height: 6.25rem;
    padding: 0.75rem 1rem;
    border: 1px solid ${({theme}) => theme.colors.BLACK_700};
    border-radius: 1rem;
    box-shadow: 0.1875rem 0.1875rem 0.3125rem ${({theme}) => theme.colors.BLACK_OPACITY_200};
    background-color: ${({theme}) => theme.colors.WHITE_000};
  `,
};
