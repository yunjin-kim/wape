import Head from 'next/head';
import styled from '@emotion/styled';
import { GlobalStyles } from '../styles/globalStyle';
import { Global, Theme, ThemeProvider } from '@emotion/react';
import { theme } from '../styles/theme';

interface Props {
  children: JSX.Element | JSX.Element[];
  page: string;
}

type StyledProps = Omit<Props, 'children'> & Record<'theme', Theme>;

export default function Layout({ children, page }: Props) {
  return (
    <div>
      <Head>
        <meta
          name="description"
          content="워피는 걷기가 우리의 건강과 삶에 미치는 좋은 영향이 크다는 것을 알려주고 실천할 수 있게 도와주는 서비스 입니다"
        />
      </Head>
      <Global styles={GlobalStyles} />
      <ThemeProvider theme={theme}>
        <S.Container page={page}>{children}</S.Container>
      </ThemeProvider>
    </div>
  );
}

const S = {
  Container: styled.main`
    overflow: auto;
    width: 23.4375rem;
    min-height: 100vh;
    margin: auto;
    padding: ${({ page }: StyledProps) => (page === 'onboarding' ? '0' : '0 1.5rem')};
  `,
};
