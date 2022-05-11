# Pages

## 역할

- View + Controller 느낌?
- service 계층의 역할을 해줄 리듀서를 호출하여 비즈니스 로직을 처리 하고 화면에 반영

## 구조

- pages/{기능 or 화면}
  - router와 매칭 가능하게 폴더를 구분하여 page component 구현
  - 메인 컴포넌트의 파일명과 컴포넌트이름은 PageNamePage로 한다.
  - Pages/{PageName}/index.ts 파일에 라우터에서 호출할 컴포넌트들을 export 한다.
