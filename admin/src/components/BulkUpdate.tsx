import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  Approved:boolean;
  productImages: Array<{ date: string; images: string[] }>;
  Variants?: any[]; // Add productVariants property
}

interface BulkUpdateProps {
  selectedProducts: Products[];
}

const BulkUpdate: FC<BulkUpdateProps> = ({ selectedProducts }) => {
  const navigate = useNavigate();
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

  const [hover, setHover] = useState(false);

  const updateBulkProducts = async () => {
    try {
      // Extract products and variants from editedProducts
      const products = editedProducts.map((product) => ({
        ...product,
        // Remove variant-specific fields from products
        productVariants: undefined,
      }));

      const variants = editedProducts
        // Filter out products with variants
        .filter((product) => product.Variants && product.Variants.length > 0)
        // Extract variants from products
        .map((product) => ({
          id: product.id,
          productVariants: product.Variants,
        }));

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}/api/bulk/products/update`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            products: products,
            variants: variants,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update products');
      }
      const data = await response.json();
      console.log(data);
      navigate('/'); // Handle success response from the backend
    } catch (error) {
      console.error('Error updating products:', error);
      // Handle error from the backend
    }
  };

  return (
    <>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <p className="pl-10 text-start font-semibold text-black-2 text-xl py-3">
        Editing Products
        </p>
        <div className="grid text-xs sm:text-sm grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium text-black text-center">Product</p>
          </div>
          <div className="col-span-1 hidden items-center justify-center sm:flex">
            <p className="font-medium text-black text-center">Sale Price</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium text-black text-center">Price</p>
          </div>
          <div className="col-span-1 hidden items-center justify-center sm:flex">
            <p className="font-medium text-black text-center">Sale Status</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium text-black text-center hidden sm:block">
              Deal Status
            </p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium text-black text-center hidden sm:block">
              Approved
            </p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium text-black text-center hidden sm:block">
              Mfr.
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
              <select
                className={`outline-none ${product.SaleStatus ? 'bg-[#8af5a8] rounded text-black' : 'bg-[#D6EDFF] rounded text-black'}`}
                value={product.SaleStatus ? 'active' : 'inactive'}
                onChange={(e) =>
                  handleFieldChange(
                    product.id,
                    'SaleStatus',
                    e.target.value == 'active',
                  )
                }
              >
                <option
                  
                  value="active"
                >
                  Active
                </option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-span-1 flex items-center justify-center text-center">
              <select
                className={`outline-none ${product.DealStatus ? 'bg-[#6CBF84] rounded text-black' : 'bg-[#D6EDFF] rounded text-black'}`}
                value={product.DealStatus ? 'active' : 'inactive'}
                onChange={(e) =>
                  handleFieldChange(
                    product.id,
                    'DealStatus',
                    e.target.value === 'active',
                  )
                }
              >
                <option  className="custom-option" value="active">Active</option>
                <option  className="custom-option" value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-span-1 flex items-center justify-center text-center">
              <select
                className={`outline-none ${product.Approved ? 'bg-[#6CBF84] rounded text-black' : 'bg-[#D6EDFF] rounded text-black'}`}
                value={product.Approved ? 'active' : 'inactive'}
                onChange={(e) =>
                  handleFieldChange(
                    product.id,
                    'Approved',
                    e.target.value == 'active',
                  )
                }
              >
                <option
                  
                  value="active"
                >
                  Active
                </option>
                <option value="inactive">Inactive</option>
              </select>
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
          </div>
        ))}
        <button 
        style={{
        boxShadow: hover
          ? 'none'
          : '1.5px 1.5px 4px 0.1px rgb(27, 27, 27, 10)'
      }}
        className='absolute text-white text-center font-semibold text-sm border-meta-1 outline-none border-none bg-black-2 px-4 py-1 top-17 right-8 rounded-md transition duration-300 ease-in-out'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={updateBulkProducts}>Save</button>
      </div>
    </>
  );
};

export default BulkUpdate;
