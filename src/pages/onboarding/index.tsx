import styled from '@emotion/styled';
import Head from 'next/head';
import MarginBox from '../../client/components/@common/MarginBox';
import Layout from '../../client/components/layout';
import OptionButton from '../../client/components/OptionButton';
import useCarouselScroll from '../../client/hooks/useCarouselScroll';

import {sections} from './static';

export default function Onboarding() {
  const {currentPage, carouselUlRef, handleClick, handleTouchStart, handleTouchEnd} = useCarouselScroll({dragDistanceForScroll: 150});

  return (
    <Layout page={'onboarding'}>
      <Head>
        <title>onboarding | wape</title>
      </Head>
      <S.Container>
        <S.PageBox ref={carouselUlRef} onTouchEnd={handleTouchEnd} onTouchStart={handleTouchStart}>
          {sections.map(({top, bottom}, index) => (
            <S.Page key={index}>
              {top}
              {bottom}
            </S.Page>
          ))}
        </S.PageBox>

        <MarginBox bottom={3.375} />
        <S.OptionButtonBox>
          {Array.from({length: 5}).map((_, index) => (
            <OptionButton key={index} index={index} currentCheck={currentPage} onClick={handleClick(index)} />
          ))}
        </S.OptionButtonBox>
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
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-width: 100%;
    height: 80vh;
  `,

  OptionButtonBox: styled.div`
    display: flex;
    justify-content: center;
    gap: 0.375rem;
  `,
};
