export interface IClient {
  id: string;
  fullName: string;
  email: string;
  telephone: string;
}

export interface IClientLoginData {
  email: string;
  password: string;
}

export interface IClientLoginResponse {
  token: string;
  client: IClient;
}

export interface IClientRegisterData {
  fullName: string;
  email: string;
  telephone: string;
  password: string;
}

export interface IClientContextType {
  loading: boolean;
  client: IClient | null;
  clientRegister: (formData: IClientRegisterData) => Promise<void>;
  clientLogin: (formData: IClientLoginData) => Promise<void>;
  clientLogout: () => void;
}
