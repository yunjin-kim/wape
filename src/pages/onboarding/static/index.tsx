import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';
import Text from '../../../client/components/@common/Text';
import {StyledProps} from '../../../client/types/style';
import WalkEffectInfoBox, {WalkEffectInfo} from '../components/WalkEffectInfoBox';
import MarginBox from '../../../client/components/@common/MarginBox';
import Button from '../../../client/components/@common/Button';
import {ROUTES} from '../../../client/constants/routes';

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

const S = {
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

export const sections = [
  {
    top: (
      <S.TopLayout top={0} left={0}>
        {WalkEffectInfos.map((WalkEffectInfo, index) => (
          <WalkEffectInfoBox key={index} WalkEffectInfo={WalkEffectInfo} />
        ))}
      </S.TopLayout>
    ),
    bottom: <></>,
  },
  {
    top: (
      <S.TopLayout top={6.25} left={4}>
        <Text size={1.2}>
          <S.Span>홍시영</S.Span> 님의
        </Text>
        <MarginBox bottom={1.875} />
        <Text size={1.2}>오늘 3km 걸음으로써 </Text>
        <MarginBox bottom={1.875} />
        <Text size={1.2}>40,000원을 벌었어요!</Text>
      </S.TopLayout>
    ),
    bottom: (
      <S.BottomLayout>
        <Text size={1} align={'center'}>
          하루에 걸은 거리에 비례해서 미래의
          <br /> 건강관리 비용을 아낀 값을 알 수 있어요!
        </Text>
      </S.BottomLayout>
    ),
  },
  {
    top: (
      <S.TopLayout top={6.25} left={4}>
        <Text size={1.2}>
          <S.Span>홍시영</S.Span> 님의
        </Text>
        <MarginBox bottom={1.875} />
        <Text size={1.2}>걷기 계획은 </Text>
        <MarginBox bottom={1.875} />
        <Text size={1.2}>20시 00분 입니다.</Text>
      </S.TopLayout>
    ),
    bottom: (
      <S.BottomLayout>
        <Text size={1} align={'center'}>
          자기만의 걷기 계획을 정해서 정해진
          <br />
          시간에 알림이 와 꾸준한 걷기를 도와줘요!
        </Text>
      </S.BottomLayout>
    ),
  },
  {
    top: (
      <S.TopLayout top={6.25} left={4}>
        <Image priority src={'/images/onboarding-map.png'} width={250} height={250} alt={'효창동 지도'} />
      </S.TopLayout>
    ),
    bottom: (
      <S.BottomLayout>
        <Text size={1} align={'center'}>
          집 주변 걷기 코스를 살펴보세요 <br />
          자기만의 걷기 코스를 만들 수 도 있어요!
        </Text>
      </S.BottomLayout>
    ),
  },
  {
    top: (
      <>
        <S.WalkingBackImage />
        <S.TopLayout top={6.25} left={4}>
          <S.Text size={2}>
            오늘은 <br /> 가볍게 <br /> 걸어볼까요?
          </S.Text>
        </S.TopLayout>
      </>
    ),
    bottom: (
      <S.BottomLayout>
        <Link href={ROUTES.LOGIN}>
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
    ),
  },
];
