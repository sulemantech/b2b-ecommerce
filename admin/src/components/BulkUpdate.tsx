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
  Variants?: any[]; // Add productVariants property
}


interface BulkUpdateProps {
  selectedProducts: Products[];
}

const BulkUpdate: FC<BulkUpdateProps> = ({ selectedProducts }) => {
  const [editedProducts, setEditedProducts] =
    useState<Products[]>(selectedProducts);
  // console.log("selllllllllllllllllllllllllllllllllll",editedProducts);

  const handleFieldChange = (id: number, field: string, value: any) => {
    setEditedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, [field]: value } : product,
      ),
    );
  };

  const updateBulkProducts = async () => {
    try {
      // Extract products and variants from editedProducts
      const products = editedProducts.map(product => ({
        ...product,
        // Remove variant-specific fields from products
        productVariants: undefined,
      }));
  
      const variants = editedProducts
        // Filter out products with variants
        .filter(product => product.Variants && product.Variants.length > 0)
        // Extract variants from products
        .map(product => ({
          id: product.id,
          productVariants: product.Variants,
        }));
  
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}/api/bulk/products/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: products,
          variants: variants,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update products');
      }
  
      const data = await response.json();
      console.log(data); // Handle success response from the backend
    } catch (error) {
      console.error('Error updating products:', error);
      // Handle error from the backend
    }
  };
  
  return (
    <>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <p className="text-center font-semibold text-2xl py-5 uppercase">
          Product Status Update
        </p>
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
            <p className="font-medium text-black text-center hidden sm:block">
              DealStatus
            </p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium text-black text-center hidden sm:block">
              categoryName
            </p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium text-black text-center hidden sm:block">
              manufacturer
            </p>
          </div>
        </div>

        {editedProducts?.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
            id={`${product.id}`}
          >
            {/* Input fields */}
            <div className="col-span-1 flex items-center justify-center text-center">
              <input
                type="text"
                value={product.name}
                onChange={(e) =>
                  handleFieldChange(product.id, 'name', e.target.value)
                }
                className="text-xs sm:text-sm text-center outline-none text-black dark:text-white"
              />
            </div>
            <div className="col-span-1 flex items-center justify-center text-center">
              <input
                type="number"
                value={product.SalePrice}
                onChange={(e) =>
                  handleFieldChange(
                    product.id,
                    'SalePrice',
                    e.target.valueAsNumber,
                  )
                }
                className="text-xs outline-none text-center sm:text-sm text-black dark:text-white"
              />
            </div>
            <div className="col-span-1 flex items-center justify-center text-center">
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  handleFieldChange(product.id, 'price', e.target.valueAsNumber)
                }
                className="text-xs text-center outline-none sm:text-sm text-black dark:text-white"
              />
            </div>
            <div className="col-span-1 flex items-center justify-center text-center">
              <input
                type="checkbox"
                checked={product.SaleStatus}
                onChange={(e) =>
                  handleFieldChange(product.id, 'SaleStatus', e.target.checked)
                }
                className="text-xs sm:text-sm text-black dark:text-white"
              />
            </div>
            <div className="col-span-1 flex items-center justify-center text-center">
              <input
                type="checkbox"
                checked={product.DealStatus}
                onChange={(e) =>
                  handleFieldChange(product.id, 'DealStatus', e.target.checked)
                }
                className="text-xs sm:text-sm text-black dark:text-white"
              />
            </div>
            <div className="col-span-1 flex items-center justify-center text-center">
              <input
                type="text"
                value={product.categoryName}
                onChange={(e) =>
                  handleFieldChange(product.id, 'categoryName', e.target.value)
                }
                className="text-xs text-center outline-none sm:text-sm text-black dark:text-white"
              />
            </div>
            <div className="col-span-1 flex items-center justify-center text-center">
              <input
                type="text"
                value={product.manufacturer}
                onChange={(e) =>
                  handleFieldChange(product.id, 'manufacturer', e.target.value)
                }
                className="text-xs outline-none text-center sm:text-sm text-black dark:text-white"
              />
            </div>
            <button onClick={updateBulkProducts}>save</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default BulkUpdate;
