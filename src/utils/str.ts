export const filterKorean = (value: string) => {
  const regExp = /^[ㄱ-ㅎ가-힣ㅏ-ㅣ|]*$/;
  if (value) {
    if (value.match(regExp)) {
      return value;
    }
    return false;
  }

  return true;
};
