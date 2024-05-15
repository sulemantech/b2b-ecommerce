import React, { ReactNode } from 'react';
import Searchproduct from './header7';

interface ProductWrapperProps {
  children: ReactNode;
  Value: string;
}

const ProductWrapper: React.FC<ProductWrapperProps> = ({ children , Value }) => {
  return (
    <div>
      <Searchproduct Header={Value}/>
      {children}
    </div>
  );
};

export default ProductWrapper;

