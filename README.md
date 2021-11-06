![Asset 1](https://user-images.githubusercontent.com/79692272/140050154-3aec18e9-d242-45e4-9482-664177f19a5c.png)

# 걷기 웹앱, 워피 1.0
### 워피는 걷기가 우리의 건강과 삶에 미치는 좋은 영향이 크다는 것을 알려주고 실천할 수 있게 도와주는 서비스 입니다

## 현재 기능 구현 중입니다

## 기획, 브랜딩, UI, UX 설계
https://notefolio.net/sion11290805/250934

## 활용 기술
- Node.js express
- MySQL
- JavaScript

## 로그인 회원가입 페이지

![screencapture-localhost-8880-page-login-2021-11-02-21_16_45](https://user-images.githubusercontent.com/79692272/140051090-6b7de78c-4b02-4e23-877b-d1fea70863da.png)

![screencapture-localhost-8880-page-join-2021-11-02-21_16_59](https://user-images.githubusercontent.com/79692272/140051127-7abf0f74-a619-4929-a1e2-c003f00c41a5.png)

- Node.js 의 express를 활용하여 서버, 로그인, 회원가입을 구현했고 MySQL에 회원 정보를 저장합니다

## 메인 페이지
![screencapture-localhost-8880-page-main-2021-11-06-21_16_55](https://user-images.githubusercontent.com/79692272/140609296-117a7348-cf3c-46c5-84de-feaacb0e341a.png)

- 유저가 목표 걸음 수를 정할 수 있습니다
- 유저가 걷고 싶은 시간대에 걷기를 계획할 수 있습니다
- 유저의 건강에 도움이 되는 정보를 제공합니다
- 오늘 날씨 정보를 제공합니다
- 유저가 입력한 정보를 화면에 바로 볼 수 있게 설계하였습니다

## 분석 페이지
![screencapture-localhost-8880-page-anay-2021-11-02-21_12_57](https://user-images.githubusercontent.com/79692272/140052178-7f922754-3181-4678-b619-b751c476b4a7.png)

- 구글 fitness를 통해 유저의 장보를 불러올려고 했으나 현재는 noCodeApi를 활용하여 제 데이터만 가져와서 활용하고 있습니다
- 유저의 걸음수에 대한 다양한 통계치를 제공합니다
- 유저가 체중과 수면시간을 기록할 수 있습니다
- 목표 걸음수에 따른 목표 달성 유무를 제공합니다
- 데이터로 화면을 구성하므로 데이터에 대한 예외처리를 신경써서 설계하였습니다

## 은행 페이지
![screencapture-localhost-8880-page-bank-2021-11-02-21_13_13](https://user-images.githubusercontent.com/79692272/140052758-2ea6e9ea-c9d0-4b4c-ad05-911f29957fc0.png)

- 유저의 한달동안의 데이터를 활용하여 다양한 정보를 제공합니다

## 지도 페이지
![screencapture-localhost-8880-page-map-2021-11-02-21_14_11](https://user-images.githubusercontent.com/79692272/140052917-14051626-abc8-4f9e-b4ad-4e04d488d030.png)

- 카카오 지도 API를 활용하였습니다
- 유저에게 다양한 걷기 코스를 제공합니다
- 드래그를 통해 드래그 위치에서 가장 가까운 두 걷기 코스를 화면에 제공합니다
- 걷기 코스를 클릭하면 해당 걷기 코스 위치로 이동합니다
- 걷기 코스의 핀을 클릭하면 해당 걷기 코스를 제공합니다