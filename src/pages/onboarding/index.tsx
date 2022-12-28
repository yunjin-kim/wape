import styled from '@emotion/styled';
import Head from 'next/head';
import React from 'react';
import Layout from '../../client/components/layout';
import useCarouselScroll from '../../client/hooks/useCarouselScroll';
import WalkEffectInfoBox, {WalkEffectInfo} from './components/WalkEffectInfoBox';

const WalkEffectInfos: WalkEffectInfo[] = [
  {
    imgSrc: '/images/growth.png',
    alt: '상승하는 화살표',
    text: '기억력, 인지능력이 향상된다',
    top: 3.125,
    left: 13.75,
    zIndex: 10,
  },
  {
    imgSrc: '/images/lightbulb.png',
    alt: '번쩍이는 전구',
    text: '더 창의적인 생각을 할 수 있다',
    top: 5.375,
    left: 3.25,
    zIndex: 10,
  },
  {
    imgSrc: '/images/coronavirus.png',
    alt: '코로나 바이러스',
    text: '코로나 시기에 가장 전략적인 행동',
    top: 10,
    left: 8.75,
    zIndex: 20,
  },
  {
    imgSrc: '/images/brain.png',
    alt: '사람 뇌 형상',
    text: '뇌 건강에 매우 좋다',
    top: 16,
    left: 2,
    zIndex: 10,
  },
  {
    imgSrc: '/images/waist.png',
    alt: '홀쭉한 사람 형상',
    text: '다이어트, 성인병 예방',
    top: 15,
    left: 14,
    zIndex: 10,
  },
  {
    imgSrc: '/images/happy.png',
    alt: '웃고 있는 이모지',
    text: '항우울 효과가 있다',
    top: 24,
    left: 9,
    zIndex: 10,
  },
];

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
            <S.TopLayout>
              {WalkEffectInfos.map((WalkEffectInfo, index) => (
                <WalkEffectInfoBox key={index} WalkEffectInfo={WalkEffectInfo} />
              ))}
            </S.TopLayout>
            <p>page1</p>
          </S.Page>

          <S.Page>
            <p>page2</p>
          </S.Page>

          <S.Page>
            <p>page3</p>
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
    min-width: 100%;
    height: 100vh;
    border: 1px solid black;
  `,

  TopLayout: styled.div`
    position: relative;
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
