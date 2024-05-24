# ro1ling

![image](https://github.com/un0211/ro1ling/assets/24778465/54814f59-60ed-4f92-8c18-7c924c1250e8)
배포 링크: https://ro1ling.netlify.app/

## README 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [팀원 소개](#팀원-소개)
3. [개발 환경](#개발-환경)
4. [개발 기간 및 작업 관리](#개발-기간-및-작업-관리)
5. [프로젝트 구조](#프로젝트-구조)
6. [페이지별 기능](#페이지별-기능)
7. [개선 사항](#개선-사항)
8. [트러블 슈팅](#트러블-슈팅)
9. [프로젝트 후기](#프로젝트-후기)

## 프로젝트 소개

- 추억의 롤링페이퍼 서비스입니다.
- 자신만의 롤링페이퍼 페이지를 만들고 친구에게 공유할 수 있습니다.
- 친구의 롤링페이퍼에 반응과 메세지를 남길 수 있습니다.

## 팀원 소개

|                                                           김서영                                                            |                                                           김세민                                                            |                                                           류혜원                                                            |                                                           장익재                                                            |                                                           홍서하                                                            |
| :-------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/un0211/ro1ling/assets/24778465/02020c58-7cff-443f-a5ef-be2554e0b17e" width="150" height="150"> | <img src="https://github.com/un0211/ro1ling/assets/24778465/210cb608-2418-4ad5-8bbe-16c7cd3cf640" width="150" height="150"> | <img src="https://github.com/un0211/ro1ling/assets/24778465/3774744a-0343-412f-91df-ef82d41c06b3" width="150" height="150"> | <img src="https://github.com/un0211/ro1ling/assets/24778465/55f24950-a5e3-4ea5-84f7-fd972f18d7b6" width="150" height="150"> | <img src="https://github.com/un0211/ro1ling/assets/24778465/0dbff6b1-8910-4ae3-afae-30faf1ac903d" width="150" height="150"> |
|                                           [@ssseeo0](https://github.com/ssseeo0)                                            |                                          [@sermain2](https://github.com/sermain2)                                           |                                            [@un0211](https://github.com/un0211)                                             |                                            [@Ik5606](https://github.com/Ik5606)                                             |                                         [@hongseoha](https://github.com/hongseoha)                                          |

// REVIEW - ALL: 역할 분담 여기 쓸까요? 아니면 따로 섹션 만들까요?

## 개발 환경

### 프론트엔드

// TODO - 서하님: 로고 이미지로 or 글씨와 이미지 적절히 (아래 예시)

<img src="https://github.com/un0211/ro1ling/assets/24778465/6f16eb65-6e77-4e6c-8a88-d42a2c041315" width="80" height="80" alt="html" >
<img src="https://github.com/un0211/ro1ling/assets/24778465/fe977869-fc3f-4dff-ab81-93c0744b6705" width="80" height="80" alt="css" >
<img src="https://github.com/un0211/ro1ling/assets/24778465/8c1d57dd-74ef-4375-a546-0a04ca2d50d6" width="80" height="80" alt="js" >

HTML, JavaScript, SCSS + CSS Module, React

### 백엔드

주어진 API 사용

### 협업

GitHub, Discord, Notion

### 기타

Git, npm, Netlify, Figma

## 개발 기간 및 작업 관리

### 개발 기간 (2024.04.30 ~ 2024.05.15)

// TODO - 서하님: 원하시면 이미지 추가

- 사전 작업: 2024.04.24 ~ 2024.04.30  
  ㄴ 기술 스택 선정, 역할 배분, 규칙 정리(팀 규칙, 코드 컨벤션, 커밋 컨벤션 등)
- 페이지 구현: 2024.05.01 ~ 2024.05.10
- 추가 작업: 2024.05.11 ~ 2024.05.15  
  ㄴ 버그 해결, 추가 기능 구현
- 발표준비: 2024.05.14 ~ 2024.05.15

### 작업 관리

- 코어 타임: 오후 2시 ~ 6시를 코어 타임으로 정해 협업이 원활하도록 했습니다.
- 데일리 스크럼: 매일 오후 2시 데일리 스크럼을 진행하여 작업 상황을 공유했습니다.
  - 어제 한 일, 오늘 할 일
  - 작업 과정에서 어려운 점
  - 기존 요구 사항에서 개선할 만한 사항
- PR 리뷰
  - 작업 단위로 PR을 올려 작업을 공유했습니다.
  - 다른 사람의 작업이 팀 규칙을 잘 지켰는지 확인하고 리뷰를 남겼습니다.
  - 한 명 이상의 승인을 받고 PR을 머지했습니다.
- 팀 규칙
  - [코드 컨벤션](wiki/CODE.md)
  - [커밋 컨벤션](wiki/COMMIT.md)
  - [브랜치 전략](wiki/BRANCH.md)

## 프로젝트 구조

```
ro1ling
├──.github
├── node_modules
├── public
├── src
    ├─ apis
    ├─ assets
        ├─ icons
        └─ images
    ├─ components
        ├─ common
        ├─ ...Page
    ├─ constants
    ├─ pages
    ├─ styles
    ├─ utils
    ├─ App.js
    └─ index.js
├── .gitignore
├── README.md
├── jsconfig.json
├── package-lock.json
└── package.json
```

## 페이지별 기능

// TODO - ALL: 각자 기능 적기

### [메세지 삭제] 
<p align="center">
<img src="https://github.com/un0211/ro1ling/assets/135966211/abdffbd2-8ca1-4937-95c8-351efb9a0293">
</p>

- 별도의 로그인 기능이 없어 누구나 삭제할 수 있습니다.
- 삭제하고 싶은 메세지 카드를 선택해 여러 개 삭제할 수 있습니다.
- 삭제할 메세지를 한 개 이상 선택 시 삭제하기 버튼이 활성화됩니다.
- 메세지 삭제 후 해당 롤링페이퍼 페이지로 이동합니다.


### [롤링페이퍼 삭제] 
<p align="center">
<img src="https://github.com/un0211/ro1ling/assets/135966211/8ffa6b9e-e46f-4ad3-8e99-46d1d5675300">
</p>

- 별도의 로그인 기능이 없어 누구나 삭제할 수 있습니다.
- 롤링페이퍼 삭제 후 롤링페이퍼 리스트 페이지로 이동합니다.

### [메세지 상세 보기] 
<p align="center">
<img src="https://github.com/un0211/ro1ling/assets/135966211/8ac46036-f543-4b12-acac-335da37f9648">
</p>

- 메세지 카드를 클릭하면 모달을 통해 메세지를 상세 조회할 수 있습니다.
- 모달 외 영역과, 확인 버튼을 클릭하면 모달창이 닫힙니다. 


### [롤링페이퍼 검색]
<p align="center">
<img src="https://github.com/un0211/ro1ling/assets/135966211/d5845626-dbbc-45d5-a8ea-84cd928cb3f3">
</p>

- 롤링페이퍼 전체보기 페이지에서의 검색 기능입니다.
- 롤링페이퍼 이름에 해당하는 롤링페이퍼가 조회됩니다. 

## 개선 사항

## 개선 사항

// REVIEW - ALL: 페이지별 기능에서 추가기능이라고 명시하는 걸로 충분할까요? 따로 적을까요?

## 트러블 슈팅

// TODO - ALL: 있으면 적기

## 프로젝트 후기

// TODO - ALL: 각자 후기 적기

---

리드미 구성 참고: https://github.com/likelion-project-README/README
