import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerFormSchema } from './registerFormSchema';
import { ErrorMessage, StyledInput } from '../../components/Input/styles';
import { ClientContext } from '../../providers/ClientContext/ClientContext';
import Button from '../Button';
import { Content } from '../../pages/HomePage/styles';
import { useContext } from 'react';
import { IClientRegisterData } from '../../providers/ClientContext/@types';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IClientRegisterData>({
    resolver: zodResolver(registerFormSchema),
  });

  const { clientRegister } = useContext(ClientContext);

  const submit = async (formData: IClientRegisterData) => {
    try {
      await clientRegister(formData);
      alert('Cadastro realizado com sucesso!');
    } catch (error: any) {
      if (error.message === 'E-mail já cadastrado.') {
        setError('email', { type: 'server', message: error.message });
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <Content>
      <form onSubmit={handleSubmit(submit)}>
        <StyledInput
          type="text"
          placeholder="Seu nome"
          {...register('fullName')}
        />
        {errors.fullName && (
          <ErrorMessage>{errors.fullName.message}</ErrorMessage>
        )}

        <StyledInput
          type="text"
          placeholder="Seu telefone"
          {...register('telephone')}
        />

        <StyledInput
          type="email"
          placeholder="Seu e-mail"
          {...register('email')}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <StyledInput
          type="password"
          placeholder="Crie uma senha"
          {...register('password')}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}

        <Button type="submit">Cadastrar</Button>
      </form>
    </Content>
  );
};
