export const objectEquals = <T extends object>(obj1: T, obj2: T) => {
  for (const key in obj1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}