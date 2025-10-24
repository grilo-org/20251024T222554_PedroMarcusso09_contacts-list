export interface Contact {
  id: string;
  fullName: string;
  email: string;
  telephone: string;
  clientId: string;
}

export interface ContactsContextType {
  loading: boolean;
  contactsList: Contact[];
  createContacts: (formData: CreateContactFormData) => Promise<void>;
  deleteContacts: (currentContactId: string) => Promise<void>;
  editContacts: (
    contactId: string,
    updatedContactData: UpdateContactFormData,
  ) => Promise<void>;
}

export interface CreateContactFormData {
  fullName: string;
  email: string;
  telephone: string;
}

export interface EditContactFormProps {
  contact: Contact;
  onSave: (contact: Contact) => void;
  onCancel: () => void;
}

export interface UpdateContactFormData {
  fullName?: string;
  email?: string;
  telephone?: string;
}

export interface IContact {
  id: string;
  fullName: string;
  email: string;
  telephone: string;
  clientId: string;
}
