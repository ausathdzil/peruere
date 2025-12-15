import {
  createLoader,
  createSearchParamsCache,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs/server';

import { articleStatus } from '@/db/schema';

export const searchParamsParser = {
  status: parseAsStringLiteral(articleStatus.enumValues)
    .withDefault('published')
    .withOptions({ shallow: false }),
  q: parseAsString.withDefault('').withOptions({ shallow: false }),
};

export const loadSearchParams = createLoader(searchParamsParser);

export const searchParamsCache = createSearchParamsCache(searchParamsParser);
