type TypeOfResult =
  | 'undefined'
  | 'null'
  | 'boolean'
  | 'number'
  | 'bigint'
  | 'string'
  | 'symbol'
  | 'function'
  | 'array'
  | 'object'
  | 'date'
  | 'regexp'
  | 'map'
  | 'set'
  | 'weakmap'
  | 'weakset'
  | 'error'
  | 'promise'
  | 'arraybuffer'
  | 'dataview'
  | 'int8array'
  | 'uint8array'
  | 'uint8clampedarray'
  | 'int16array'
  | 'uint16array'
  | 'int32array'
  | 'uint32array'
  | 'float32array'
  | 'float64array';

type TypeOf = (target: unknown) => TypeOfResult;

const typeOf: TypeOf = (target) => {
  return Object.prototype.toString
    .call(target)
    .slice(8, -1)
    .toLowerCase() as TypeOfResult;
};

export default typeOf;
