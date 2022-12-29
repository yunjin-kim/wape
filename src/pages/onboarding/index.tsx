import styled from '@emotion/styled';
import Head from 'next/head';
import React from 'react';
import MarginBox from '../../client/components/@common/MarginBox';
import Text from '../../client/components/@common/Text';
import Layout from '../../client/components/layout';
import useCarouselScroll from '../../client/hooks/useCarouselScroll';
import {StyledProps} from '../../client/types/style';
import WalkEffectInfoBox from './components/WalkEffectInfoBox';
import {WalkEffectInfos} from './static';

export default function Onboarding() {
  const {carouselUlRef, handleTouchStart, handleTouchEnd} = useCarouselScroll({dragDistanceForScroll: 150});

  return (
    <Layout page={'onboarding'}>
      <Head>
        <title>onboarding | wape</title>
      </Head>
      <S.Container>
        <S.PageBox ref={carouselUlRef} onTouchEnd={handleTouchEnd} onTouchStart={handleTouchStart}>
          <S.Page>
            <S.TopLayout top={6.25} left={4}>
              <Text size={1.2}>
                <S.StrongText>홍시영</S.StrongText> 님의
              </Text>

              <MarginBox bottom={1.875} />
              <Text size={1.2}>오늘 3km 걸음으로써 </Text>

              <MarginBox bottom={1.875} />
              <Text size={1.2}>40,000원을 벌었어요!</Text>
            </S.TopLayout>
            <S.BottomLayout>
              <Text size={1} align={'center'}>
                하루에 걸은 거리에 비례해서 미래의
                <br /> 건강관리 비용을 아낀 값을 알 수 있어요!
              </Text>
            </S.BottomLayout>
          </S.Page>

          <S.Page>
            <S.TopLayout top={0} left={0}>
              {WalkEffectInfos.map((WalkEffectInfo, index) => (
                <WalkEffectInfoBox key={index} WalkEffectInfo={WalkEffectInfo} />
              ))}
            </S.TopLayout>
          </S.Page>

          <S.Page>
            <S.TopLayout top={6.25} left={4}>
              <Text size={1.2}>
                <S.StrongText>홍시영</S.StrongText> 님의
              </Text>

              <MarginBox bottom={1.875} />
              <Text size={1.2}>걷기 계획은 </Text>

              <MarginBox bottom={1.875} />
              <Text size={1.2}>20시 00분 입니다.</Text>
            </S.TopLayout>
            <S.BottomLayout>
              <Text size={1} align={'center'}>
                자기만의 걷기 계획을 정해서 정해진
                <br />
                시간에 알림이 와 꾸준한 걷기를 도와줘요!
              </Text>
            </S.BottomLayout>
          </S.Page>

          <S.Page>
            <p>page4</p>
          </S.Page>

          <S.Page>
            <p>page5</p>
          </S.Page>
        </S.PageBox>

        <S.ButtonBox>
          <S.OptionButton />
          <S.OptionButton />
          <S.OptionButton />
          <S.OptionButton />
          <S.OptionButton />
        </S.ButtonBox>
      </S.Container>
    </Layout>
  );
}

const S = {
  Container: styled.article`
    width: 100%;
  `,

  PageBox: styled.ul`
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    flex-direction: row;
    width: 100%;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }
  `,

  Page: styled.li`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-width: 100%;
    height: 90vh;
    border: 1px solid black;
  `,

  TopLayout: styled.div`
    position: absolute;
    top: ${({top}: StyledProps<Record<'top' | 'left', number>>) => `${top}rem`};
    left: ${({left}: StyledProps<Record<'top' | 'left', number>>) => `${left}rem`};
  `,

  BottomLayout: styled.div`
    line-height: 24px;
  `,

  StrongText: styled.span`
    font-size: 1.875rem;
    font-weight: 700;
  `,

  ButtonBox: styled.div`
    width: 100%;
  `,

  OptionButton: styled.button`
    width: 1rem;
    height: 1rem;
    border: 1px solid ${({theme}) => theme.colors.BLACK_900};
    border-radius: 1rem;
    background-color: ${({theme}) => theme.colors.WHITE_000};
  `,
};
