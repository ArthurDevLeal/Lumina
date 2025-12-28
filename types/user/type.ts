export interface UpdateUserProps {
  name?: string;
  email?: string;
  password?: string;
  avatarUrl?: string;
}

export interface UpdateUserPropsReturn {
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    balance: number;
    saving: number;
    avatarUrl: string;
  };
}
