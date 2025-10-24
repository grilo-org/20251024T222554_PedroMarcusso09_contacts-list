import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ClientContext } from '../../providers/ClientContext/ClientContext';
import { StyledInput } from '../../components/Input/styles';
import { Container, Content } from './styles';
import { StyledButton } from '../../components/Button/styles';
import { Link } from 'react-router-dom';
import { Title } from '../../styles/Typography';
import { IClientLoginData } from '../../providers/ClientContext/@types';

export const HomePage = () => {
  const { register, handleSubmit } = useForm<IClientLoginData>();
  const { clientLogin } = useContext(ClientContext);
  const [errorMessage, setErrorMessage] = useState('');

  const submit = async (formData: IClientLoginData) => {
    setErrorMessage('');
    try {
      await clientLogin(formData);
    } catch (e) {
      const error = e as Error;
      setErrorMessage(error.message);
    }
  };

  return (
    <Container>
      <Title>Login</Title>

      <Content>
        <form onSubmit={handleSubmit(submit)}>
          <StyledInput
            type="text"
            placeholder="Digite Seu E-mail"
            {...register('email')}
          />
          <StyledInput
            type="password"
            placeholder="Digite sua senha"
            {...register('password')}
          />
          {errorMessage && (
            <div
              style={{ color: 'red', marginBottom: '10px', marginLeft: '9px' }}
            >
              {errorMessage}
            </div>
          )}

          <StyledButton type="submit"> Entrar</StyledButton>

          <p style={{ textAlign: 'center', marginTop: '7px' }}>
            Ainda não possui uma conta?
          </p>

          <StyledButton as={Link} to="/register">
            Cadastrar-se
          </StyledButton>
        </form>
      </Content>
    </Container>
  );
};
