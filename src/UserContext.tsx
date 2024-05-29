// UserContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserContextType {
  email: string | null;
  setEmail: (email: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadUserEmail = async () => {
      const storedEmail = await AsyncStorage.getItem("@user_email");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    };
    loadUserEmail();
  }, []);

  const saveUserEmail = async (email: string) => {
    setEmail(email);
    await AsyncStorage.setItem("@user_email", email);
  };

  return (
    <UserContext.Provider value={{ email, setEmail: saveUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
