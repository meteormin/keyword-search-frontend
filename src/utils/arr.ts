export const merge = <T>(arr1: T[], arr2: T[], unique = false): T[] => {
  if (unique) {
    return [...new Set([...arr1, ...arr2])] as T[];
  }

  return arr1.concat(arr2);
};

export const remove = <T>(arr: T[], item: T): T[] => {
  return arr.filter((i) => {
    return i != item;
  });
};

export const shuffle = <T>(arr: T[]): T[] => {
  return arr.sort(() => Math.random() - 0.5);
};
