declare type classSet<T> = <K extends keyof T>(key: K, value: T[K]) => void;

declare type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

declare type ExpandRecursive<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursive<O[K]> }
    : never
  : T;
