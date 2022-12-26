import styled from '@emotion/styled';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import RightArrowIcon from '../../client/components/@common/icons/RightArrowIcon';
import MarginBox from '../../client/components/@common/MarginBox';
import Text from '../../client/components/@common/Text';
import Layout from '../../client/components/layout';
import {ROUTES} from '../../client/constants/routes';
import {theme} from '../../client/styles/theme';

export default function Splash() {
  return (
    <Layout page={'splash'}>
      <Head>
        <title>splash | wape</title>
      </Head>
      <S.Container>
        <MarginBox bottom={6.25} />

        <Image priority src={'/images/wape.png'} width={100} height={100} alt={'워피로고'} />
        <MarginBox bottom={1.875} />

        <Text size={1}>건강하고 행복한 삶을 위한 첫 걸음</Text>
        <MarginBox bottom={1.25} />

        <S.Title>워피</S.Title>
        <MarginBox bottom={18.75} />

        <S.NextPageBox>
          <Text size={1}>걷기의 힘을 아시나요?</Text>
          <MarginBox right={0.5} />
          <Link href={ROUTES.ONBOARDING}>
            <RightArrowIcon width={10} height={14} color={theme.colors.BLACK_900} />
          </Link>
        </S.NextPageBox>
      </S.Container>
    </Layout>
  );
}

const S = {
  Container: styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  Title: styled.h1`
    font-size: 2.25rem;
    color: ${({theme}) => theme.colors.GREEN_700};
  `,

  NextPageBox: styled.div`
    display: flex;
    align-items: center;
  `,
};
