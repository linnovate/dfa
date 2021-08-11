import { Decoder } from './decoder';
/** See `Decoder.string` */
export declare const string: typeof Decoder.string;
/** See `Decoder.number` */
export declare const number: typeof Decoder.number;
/** See `Decoder.boolean` */
export declare const boolean: typeof Decoder.boolean;
/** See `Decoder.anyJson` */
export declare const anyJson: () => Decoder<any>;
/** See `Decoder.unknownJson` */
export declare const unknownJson: () => Decoder<unknown>;
/** See `Decoder.constant` */
export declare const constant: typeof Decoder.constant;
/** See `Decoder.object` */
export declare const object: typeof Decoder.object;
/** See `Decoder.array` */
export declare const array: typeof Decoder.array;
/** See `Decoder.tuple` */
export declare const tuple: typeof Decoder.tuple;
/** See `Decoder.dict` */
export declare const dict: <A>(decoder: Decoder<A>) => Decoder<Record<string, A>>;
/** See `Decoder.optional` */
export declare const optional: <A>(decoder: Decoder<A>) => Decoder<A | undefined>;
/** See `Decoder.oneOf` */
export declare const oneOf: <A>(...decoders: Decoder<A>[]) => Decoder<A>;
/** See `Decoder.union` */
export declare const union: typeof Decoder.union;
/** See `Decoder.intersection` */
export declare const intersection: typeof Decoder.intersection;
/** See `Decoder.withDefault` */
export declare const withDefault: <A>(defaultValue: A, decoder: Decoder<A>) => Decoder<A>;
/** See `Decoder.valueAt` */
export declare const valueAt: <A>(paths: (string | number)[], decoder: Decoder<A>) => Decoder<A>;
/** See `Decoder.succeed` */
export declare const succeed: <A>(fixedValue: A) => Decoder<A>;
/** See `Decoder.fail` */
export declare const fail: <A>(errorMessage: string) => Decoder<A>;
/** See `Decoder.lazy` */
export declare const lazy: <A>(mkDecoder: () => Decoder<A>) => Decoder<A>;
