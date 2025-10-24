import { RegisterForm } from '../../components/RegisterForm';
import { Title } from '../../styles/Typography';
import { PageContainer } from './styles';

export const RegisterPage = () => {
  return (
    <PageContainer>
      <Title>Crie sua conta</Title>
      <RegisterForm />
    </PageContainer>
  );
};
