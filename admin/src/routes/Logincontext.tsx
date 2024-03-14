import React, { createContext, useContext, useState ,useEffect,useMemo } from 'react';
import Cookies from 'js-cookie';


interface LoginContextType {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }
  return context;
};

export const LoginProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const isLogin1 = Cookies.get('token');
  const [isLogin, setIsLogin] = useState<boolean>(!!isLogin1);

  useEffect(() => {
    setIsLogin(!!isLogin1);
  }, [isLogin1]);

  const contextValue = useMemo(() => ({ isLogin, setIsLogin }), [isLogin, setIsLogin]);

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};

