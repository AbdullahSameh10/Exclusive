import { createContext } from "react";
import type { PaymentMethod } from "./UserContext";

export type UserTypes = {
  uid: string;
  name: string;
  email: string;
  avatar: string;
  provider: string;
  phoneNumber?: string | null;
  preferredPayment?: PaymentMethod | null;
};

type AuthContextType = {
  user: UserTypes | null;
  setUser?: React.Dispatch<React.SetStateAction<UserTypes | null>>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: undefined,
  loading: true,
});

export default AuthContext;