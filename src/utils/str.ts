import { forSearchFormat } from './common/dateFormat';

export const filterKorean = (value: string): string | boolean => {
  const regExpEng = /^[^a-zA-Z]*$/;
  const regExpSp = /[\{\}\[\]\/?;:|\)*~`!^\-_+<>@\#$%&\\\=\(]/gi;

  let check = false;
  if (value) {
    if (value.match(regExpEng)) {
      check = true;
    }

    if (regExpSp.test(value)) {
      check = false;
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

export const limitArray = (
  arr: string[],
  limit: number,
  end = '...',
): string => {
  const reArr = arr.filter((str, i) => {
    return i < limit;
  });

  return reArr.join(', ') + end;
};

export const makePath = (source: string, target: string): string => {
  const path = source + '/' + target;
  return path.replace('//', '/');
};

export const isString = (value: any) => {
  return typeof value === 'string' || value instanceof String;
};

export const searchFormat = forSearchFormat;
