import { ReactNode, createContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import {
  Contact,
  ContactsContextType,
  CreateContactFormData,
  UpdateContactFormData,
} from './@types';

export const ContactsContext = createContext<ContactsContextType>(
  {} as ContactsContextType,
);

export const ContactsProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [contactsList, setContactsList] = useState<Contact[]>([]);

  useEffect(() => {
    const loadContactsData = async () => {
      try {
        const token = localStorage.getItem('@TOKEN');
        const clientId = localStorage.getItem('@CLIENTID');
        const { data } = await api.get(`/contacts/${clientId}/contacts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContactsList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadContactsData();
  }, []);

  const createContacts = async (formData: CreateContactFormData) => {
    try {
      const token = localStorage.getItem('@TOKEN');
      const clientId = localStorage.getItem('@CLIENTID');

      if (!clientId) {
        console.error('Client ID não encontrado');
        return;
      }

      const dataWithClientId = { ...formData, clientId };

      const response = await api.post('/contacts', dataWithClientId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContactsList(contactsList => [...contactsList, response.data]);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContacts = async (currentContactId: string) => {
    try {
      const token = localStorage.getItem('@TOKEN');
      await api.delete(`/contacts/${currentContactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContactsList(contactsList =>
        contactsList.filter(
          currentContact => currentContact.id !== currentContactId,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const editContacts = async (
    contactId: string,
    updatedContactData: UpdateContactFormData,
  ) => {
    try {
      const token = localStorage.getItem('@TOKEN');

      const response = await api.patch(
        `/contacts/${contactId}`,
        updatedContactData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setContactsList(currentContactsList =>
        currentContactsList.map(contact =>
          contact.id === contactId ? { ...contact, ...response.data } : contact,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContactsContext.Provider
      value={{
        loading,
        contactsList,
        createContacts,
        deleteContacts,
        editContacts,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
