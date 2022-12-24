import Head from 'next/head';
import styled from '@emotion/styled';
import { GlobalStyles } from '../styles/globalStyle';
import { Global, ThemeProvider } from '@emotion/react';
import { theme } from '../styles/theme';

interface Props {
  children: JSX.Element | JSX.Element[];
  page: string;
}

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
        <S.Container>{children}</S.Container>
      </ThemeProvider>
    </div>
  );
}

const S = {
  Container: styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 23.4375rem;
    min-height: 100vh;
    margin: auto;
    padding: 0 3rem;
    border: 1px solid black;
  `,
};
