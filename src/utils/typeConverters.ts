import { typesToConvert } from '../types';

const converters = {
  string: (value: any) => String(value),
  number: (value: any) => Number(value),
  boolean: (value: any) => Boolean(value),
  array: (value: any) => String(value).split(','),
};

const convertValueType = (value: any, type: typesToConvert): any => {
  return converters[type](value);
};

export default convertValueType;
