## FRONT 기능 구현 목록

### 1. settings

- `prettier, eslint`로 code-formatter 설정하기
- `lint-staged, husky`로 lint와 git 연결해 code-formatting 자동화하기

### 2. routes

- next와 유사하게 pages 폴더 내에서 routes을 관리하여 폴더 구분
- 폴더 구조

```
client
 - src
   - pages
     - index.tsx
     - login.tsx
     - signup.tsx
     - todos
       - [id].tsx
       - index.tsx

```

### 3. react-query

- queryClient를 가져오는 utils 함수 작성
- fetcher 함수 구현

### 4. scss

- app style 폴더 갖추기
