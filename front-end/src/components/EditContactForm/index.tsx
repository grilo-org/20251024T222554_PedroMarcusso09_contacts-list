import { useState } from 'react';
import { ModalOverlay, ModalContainer } from './styles';
import Button from '../Button';
import { StyledInput } from '../../components/Input/styles';
import { Content } from '../../pages/HomePage/styles';
import {
  Contact,
  EditContactFormProps,
} from '../../providers/ContactsContext/@types';

const EditContactForm: React.FC<EditContactFormProps> = ({
  contact,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Contact>({ ...contact });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <Content>
          <form onSubmit={handleSubmit}>
            <StyledInput
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <StyledInput
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <StyledInput
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
            />
            <Button type="submit">Salvar</Button>
            <Button onClick={onCancel}>Cancelar</Button>
          </form>
        </Content>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default EditContactForm;
