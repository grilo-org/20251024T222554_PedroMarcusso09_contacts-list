import { z } from 'zod';

export const registerFormSchema = z.object({
  fullName: z.string().nonempty('O nome completo é obrigatório.'),
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Digite um e-mail válido.'),
  telephone: z.string().nonempty('O telefone é obrigatório.'),
  password: z
    .string()
    .nonempty('A senha é obrigatória.')
    .min(8, 'A senha precisa conter pelo menos 8 caracteres.')
    .regex(/(?=.*?[A-Z])/, 'É necessário pelo menos uma letra maiúscula.')
    .regex(/(?=.*?[a-z])/, 'É necessário pelo menos um caracter minúsculo.')
    .regex(/(?=.*?[0-9])/, 'É necesario pelo menos um número.'),
});
