import { createContext, useState, useEffect, FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import {
  IClient,
  IClientContextType,
  IClientLoginData,
  IClientRegisterData,
  IClientLoginResponse,
} from './@types';
import axios from 'axios';

export const ClientContext = createContext<IClientContextType>(
  {} as IClientContextType,
);

export const ClientProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<IClient | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('@TOKEN');
    const clientId = localStorage.getItem('@CLIENTID');

    const loadClient = async () => {
      setLoading(true);
      if (token && clientId) {
        try {
          const { data } = await api.get<IClient>(`/clients/${clientId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setClient(data);
          navigate(window.location.pathname);
        } catch (error) {
          console.error('Erro ao carregar informações do cliente:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadClient();
  }, [navigate]);

  const clientRegister = async (formData: IClientRegisterData) => {
    try {
      await api.post('/clients', formData);
      navigate('/');
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        throw new Error('E-mail já cadastrado.');
      }
      console.error('Erro no cadastro:', error);
      throw new Error('Erro desconhecido. Tente novamente.');
    }
  };

  const clientLogin = async (formData: IClientLoginData) => {
    setLoading(true);
    try {
      const { data } = await api.post<IClientLoginResponse>('/login', formData);
      localStorage.setItem('@TOKEN', data.token);
      localStorage.setItem('@CLIENTID', data.client.id);
      setClient(data.client);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro no login:', error);

      localStorage.removeItem('@TOKEN');
      localStorage.removeItem('@CLIENTID');

      let errorMessage = 'Falha no login';
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.status;
        const responseMessage = error.response.data.message;

        if (statusCode === 401) {
          errorMessage = responseMessage || 'Email ou senha incorretos';
        } else if (statusCode === 404) {
          errorMessage = 'Cadastro não existe';
        }
      }

      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clientLogout = () => {
    localStorage.removeItem('@TOKEN');
    localStorage.removeItem('@CLIENTID');
    setClient(null);
    navigate('/');
  };

  return (
    <ClientContext.Provider
      value={{ client, clientRegister, clientLogin, clientLogout, loading }}
    >
      {children}
    </ClientContext.Provider>
  );
};
