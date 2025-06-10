import type { PageQueryResult } from '~/sanity/sanity.entity';

type PageComponentsArray = NonNullable<
  NonNullable<PageQueryResult>['components']
>;
type PageComponents = PageComponentsArray extends Array<infer T> ? T : never;
type PageComponentTypes = PageComponents['_type'];

export type PickPageComponent<T extends PageComponentTypes> = Extract<PageComponents, { _type: T }>;
