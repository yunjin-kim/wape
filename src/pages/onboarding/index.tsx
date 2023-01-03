import styled from '@emotion/styled';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../../client/components/@common/Button';
import MarginBox from '../../client/components/@common/MarginBox';
import Text from '../../client/components/@common/Text';
import Layout from '../../client/components/layout';
import OptionButton from '../../client/components/OptionButton';
import useCarouselScroll from '../../client/hooks/useCarouselScroll';
import {StyledProps} from '../../client/types/style';
import WalkEffectInfoBox from './components/WalkEffectInfoBox';
import {WalkEffectInfos} from './static';

export default function Onboarding() {
  const {currentPage, carouselUlRef, handleClick, handleTouchStart, handleTouchEnd} = useCarouselScroll({dragDistanceForScroll: 150});

  return (
    <Layout page={'onboarding'}>
      <Head>
        <title>onboarding | wape</title>
      </Head>
      <S.Container>
        <S.PageBox ref={carouselUlRef} onTouchEnd={handleTouchEnd} onTouchStart={handleTouchStart}>
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
                <S.Span>홍시영</S.Span> 님의
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
            <S.TopLayout top={6.25} left={4}>
              <Text size={1.2}>
                <S.Span>홍시영</S.Span> 님의
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
            <S.TopLayout top={6.25} left={4}>
              <Image priority src={'/images/onboarding-map.png'} width={250} height={250} alt={'효창동 지도'} />
            </S.TopLayout>

            <S.BottomLayout>
              <Text size={1} align={'center'}>
                집 주변 걷기 코스를 살펴보세요 <br />
                자기만의 걷기 코스를 만들 수 도 있어요!
              </Text>
            </S.BottomLayout>
          </S.Page>

          <S.Page>
            <S.WalkingBackImage />
            <S.TopLayout top={6.25} left={4}>
              <S.Text size={2}>
                오늘은 <br /> 가볍게 <br /> 걸어볼까요?
              </S.Text>
            </S.TopLayout>

            <S.BottomLayout>
              <Link href={'/login'}>
                <Button size={'LARGE'} buttonStyle={'BRAND'} textSize={1.125}>
                  로그인
                </Button>
              </Link>
              <Link href={'/join'}>
                <Button size={'LARGE'} buttonStyle={'BRAND'} textSize={1.125}>
                  회원가입
                </Button>
              </Link>
            </S.BottomLayout>
          </S.Page>
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

  TopLayout: styled.div`
    position: absolute;
    top: ${({top}: StyledProps<Record<'top' | 'left', number>>) => `${top}rem`};
    left: ${({left}: StyledProps<Record<'top' | 'left', number>>) => `${left}rem`};
    width: 100%;
  `,

  BottomLayout: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.625rem;
    line-height: 1.5rem;
  `,

  Text: styled(Text)`
    line-height: 3.75rem;
  `,

  Span: styled.span`
    font-size: 1.875rem;
    font-weight: 700;
  `,

  OptionButtonBox: styled.div`
    display: flex;
    justify-content: center;
    gap: 0.375rem;
  `,

  WalkingBackImage: styled.div`
    position: absolute;
    top: -4.875rem;
    left: -4.375rem;
    width: 31.25rem;
    height: 31.25rem;
    background-repeat: no-repeat;
    background-size: 31.25rem;
    background-image: url('/images/walking-back.png');
  `,
};
