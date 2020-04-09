const isArray = (item: any) => {
  return item instanceof Object && item instanceof Array;
};

const isObject = (item: any) => {
  return item instanceof Object && !(item instanceof Array);
};

const getValueType = (item: any) => (isArray(item) ? 'array' : typeof item);

export { isObject, getValueType };
