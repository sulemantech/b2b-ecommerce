import React, { ReactNode } from 'react';
import Searchproduct from './Header7';

interface ProductWrapperProps {
  children: ReactNode;
  Value: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const ProductWrapper: React.FC<ProductWrapperProps> = ({ children, Value, searchValue, setSearchValue }) => {
  return (
    <div>
      <Searchproduct Header={Value} searchValue={searchValue} setSearchValue={setSearchValue} />
      {children}
    </div>
  );
};

export default ProductWrapper;
