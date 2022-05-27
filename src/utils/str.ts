export const filterKorean = (value: string): string | boolean => {
  const regExpEng = /^[^a-zA-Z]*$/;
  const regExpSp = /[\{\}\[\]\/?;:|\)*~`!^\-_+<>@\#$%&\\\=\(]/gi;
  console.log(value);
  let check = false;
  if (value) {
    if (value.match(regExpEng)) {
      check = true;
    }

    if (regExpSp.test(value)) {
      check = false;
      console.log('??');
    }

    return check;
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

export const makePath = (source: string, target: string): string => {
  const path = source + '/' + target;
  return path.replace('//', '/');
};
