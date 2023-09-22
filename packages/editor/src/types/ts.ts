/**
 * A recursive partial used to make a type partial including its nested props types
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
