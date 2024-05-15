import { FC, useState } from 'react';

interface Products {
  id: number;
  productId: number;
  name: string;
  price: number;
  categoryName: string;
  discount: number;
  manufacturer: string;
  SalePrice: number;
  DealStatus: boolean;
  SaleStatus: boolean;
  productImages: Array<{ date: string; images: string[] }>;
}

interface BulkUpdateProps {
  selectedProducts: Products[];
}

const BulkUpdate: FC<BulkUpdateProps> = ({ selectedProducts }) => {
  const [editedProducts, setEditedProducts] = useState<Products[]>(selectedProducts);

  const handleNameChange = (id: number, newName: string) => {
    setEditedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, name: newName } : product
      )
    );
  };
  const handleSaleStatusChange = (id: number, value: boolean) => {
    setEditedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, SaleStatus: value } : product
      )
    );
  };

  const handleDealStatusChange = (id: number, value: boolean) => {
    setEditedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, DealStatus: value } : product
      )
    );
  };



  // Add similar handle functions for other fields

  return (
    <>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <p className='text-center font-semibold text-2xl py-5 uppercase'>Product Status Update</p>
        <div className="grid text-xs sm:text-sm grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium text-black text-center">Product Name</p>
          </div>
          <div className="col-span-1 hidden items-center justify-center sm:flex">
            <p className="font-medium text-black text-center">SalePrice</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium text-black text-center">Price</p>
          </div>
          <div className="col-span-1 hidden items-center justify-center sm:flex">
            <p className="font-medium text-black text-center">SaleStatus</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium text-black text-center hidden sm:block">DealStatus</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium text-black text-center hidden sm:block">categoryName</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium text-black text-center hidden sm:block">manufacturer</p>
          </div>
        </div>

        {editedProducts?.map((product) => (
          <div key={product.id} className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5" id={`${product.id}`}>
            <div className="col-span-1 flex items-center justify-center text-center">
              <input
                type="text"
                value={product.name}
                onChange={(e) => handleNameChange(product.id, e.target.value)}
                className="text-xs sm:text-sm text-black dark:text-white"
              />
            </div>
            <div className="col-span-1 flex items-center justify-center text-center">
              <p className="text-xs sm:text-sm text-black dark:text-white">{product.SalePrice}</p>
            </div>
            <div className="col-span-1 flex items-center justify-center text-center">
              <p className="text-xs sm:text-sm text-black dark:text-white">{product.price}</p>
            </div>
            <div className="col-span-1 flex items-center justify-center text-center">
            <input
             type="checkbox"
                checked={product.SaleStatus}
                onChange={(e) => handleSaleStatusChange(product.id, e.target.checked)}
                className="text-xs sm:text-sm text-black dark:text-white"
              />
              
            </div>
            <div className="col-span-1 flex items-center justify-center text-center">
            <input
                  type="checkbox"
                  checked={product.DealStatus}
                  onChange={(e) => handleDealStatusChange(product.id, e.target.checked)}
                />
            </div>
            <div className="col-span-1 flex items-center justify-center text-center">
            <p className="text-xs sm:text-sm text-black dark:text-white">{product.categoryName}</p>


              </div>
              <div className="col-span-1 flex items-center justify-center text-center">
            <p className="text-xs sm:text-sm text-black dark:text-white">{product.manufacturer}</p>


              </div>

          </div>
        ))}
      </div>
    </>
  );
};

export default BulkUpdate;
