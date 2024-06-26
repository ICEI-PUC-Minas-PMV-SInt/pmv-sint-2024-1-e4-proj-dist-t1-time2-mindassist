export type RouteParam<T extends string> = {
  [key in T]: string[]
}
