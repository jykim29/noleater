import * as z from 'zod';

type ValidateWithZod = (
  schema: z.ZodObject,
  data: z.infer<typeof schema>
) =>
  | { success: true; error: null }
  | { success: false; error: { path: string; message: string } };

const validateWithZod: ValidateWithZod = (schema, data) => {
  const { success, error } = schema.safeParse(data);
  if (success) return { success: true, error: null };
  const issue = error.issues[0];
  return {
    success: false,
    error: { path: issue.path[0] as string, message: issue.message },
  };
};

export default validateWithZod;
