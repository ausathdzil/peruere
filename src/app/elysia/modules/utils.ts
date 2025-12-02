/** biome-ignore-all lint/suspicious/noAssignInExpressions: https://elysiajs.com/integrations/better-auth.html#openapi */
/** biome-ignore-all lint/suspicious/noExplicitAny: https://elysiajs.com/integrations/better-auth.html#openapi */
import { type Static, type TSchema, t } from 'elysia';

import { auth } from '@/lib/auth';

// This wrapper restores the "pass object, get reference" behavior
export const Ref = <T extends TSchema>(schema: T) => {
  if (!schema.$id) {
    throw new Error('Schema passed to Ref must have an $id');
  }

  // Use t.Unsafe to trick TypeScript into treating the reference
  // as the original type for inference purposes
  return t.Unsafe<Static<T>>(t.Ref(schema.$id));
};

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>;
const getSchema = async () => (_schema ??= auth.api.generateOpenAPISchema());

export const BetterAuthOpenAPI = {
  getPaths: (prefix = '/elysia/auth/api') =>
    getSchema().then(({ paths }) => {
      const reference: typeof paths = Object.create(null);

      for (const path of Object.keys(paths)) {
        const key = prefix + path;
        reference[key] = paths[path];

        for (const method of Object.keys(paths[path])) {
          const operation = (reference[key] as any)[method];

          operation.tags = ['Better Auth'];
        }
      }

      return reference;
    }) as Promise<any>,
  components: getSchema().then(({ components }) => components) as Promise<any>,
} as const;
