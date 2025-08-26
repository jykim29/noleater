import * as z from 'zod';

const passwordRegExp = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,20}$/
);

export const LoginFormDataSchema = z.object({
  email: z.email('invalid_email_pattern'),
  password: z.string(),
});
export const RegisterFormDataSchema = z
  .object({
    email: z.email('invalid_email_pattern'),
    password: z.string().regex(passwordRegExp, 'incorrect_password_pattern'),
    passwordConfirm: z.string(),
    agreement: z
      .boolean()
      .refine((val) => val === true, { error: 'not_checked_agreement' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    error: 'not_match_password',
  });
