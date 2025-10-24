import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { ClientContext } from '../../providers/ClientContext/ClientContext';
import { ContactsContext } from '../../providers/ContactsContext/ContactsContext';
import Button from '../Button';
import { FormContainer } from './styles';
import { StyledInput } from '../../components/Input/styles';
import { CreateContactFormData } from '../../providers/ContactsContext/@types';

export const CreateContactsForm = () => {
  const { register, handleSubmit } = useForm<CreateContactFormData>();
  const { client } = useContext(ClientContext);
  const { createContacts } = useContext(ContactsContext);

  const submit = (formData: CreateContactFormData) => {
    if (client) {
      const data = { ...formData, clientId: client.id };
      createContacts(data);
    } else {
      console.error('Client is null');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(submit)}>
      <StyledInput placeholder="Nome" {...register('fullName')} />
      <StyledInput placeholder="Email" {...register('email')} />
      <StyledInput placeholder="Telefone" {...register('telephone')} />
      <Button type="submit">Criar Contato</Button>
    </FormContainer>
  );
};
