export const filterKorean = (value: string): string | boolean => {
  const regExp = /^[^a-zA-Z]*$/;
  if (value) {
    if (value.match(regExp)) {
      return value;
    }
    return false;
  }

  return true;
};

export const limit = (value: string, limit: number, end = '...'): string => {
  let limitedStr = value;

  if (value) {
    if (!limit) {
      return value;
    }

    if (value.length > limit) {
      limitedStr = value.substring(0, limit) + end;
    }
  }

  return limitedStr;
};
