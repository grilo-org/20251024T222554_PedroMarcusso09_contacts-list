import { ClientContext } from '../../providers/ClientContext/ClientContext';
import { useContext, useState } from 'react';
import { CreateContactsForm } from '../../components/CreateContactsForm';
import { ContactsContext } from '../../providers/ContactsContext/ContactsContext';
import EditContactForm from '../../components/EditContactForm';
import Button from '../../components/Button';
import {
  MainContainer,
  Header,
  ContactsList,
  ContactItem,
  ContactInfo,
} from './styles';
import { IContact } from '../../providers/ContactsContext/@types';
import { generateClientPDF } from '../../Reports/Clients/clients';

export const DashboardPage = () => {
  const { client, clientLogout } = useContext(ClientContext);
  const { contactsList, deleteContacts, editContacts } =
    useContext(ContactsContext);
  const [isEditing, setIsEditing] = useState(false);
  const [currentContact, setCurrentContact] = useState<IContact | null>(null);

  const startEdit = (contact: IContact) => {
    setCurrentContact(contact);
    setIsEditing(true);
  };

  const saveEdit = (updatedContact: IContact) => {
    if (currentContact) {
      editContacts(currentContact.id, updatedContact);
      setIsEditing(false);
    }
  };

  const handleGeneratePDF = () => {
    if (client) {
      generateClientPDF(client, contactsList);
    } else {
      alert('Não foi possível gerar o PDF. Cliente não encontrado.');
    }
  };

  return (
    <MainContainer>
      <Header>
        <Button onClick={() => clientLogout()}>Sair</Button>
        <h1>{client?.fullName}</h1>
      </Header>

      <CreateContactsForm />
      <Button onClick={handleGeneratePDF}>Gerar PDF</Button>

      {isEditing && currentContact && (
        <EditContactForm
          contact={currentContact}
          onSave={saveEdit}
          onCancel={() => setIsEditing(false)}
        />
      )}

      <ContactsList>
        {contactsList &&
          contactsList.map(contact => (
            <ContactItem key={contact.id}>
              <ContactInfo>
                <h3>{contact.fullName}</h3>
                <p>{contact.email}</p>
                <p>{contact.telephone}</p>
              </ContactInfo>
              <div>
                <Button onClick={() => startEdit(contact)}>Editar</Button>
                <Button onClick={() => deleteContacts(contact.id)}>
                  Excluir
                </Button>
              </div>
            </ContactItem>
          ))}
      </ContactsList>
    </MainContainer>
  );
};
