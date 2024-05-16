import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import BulkUpdate from './BulkUpdate';

const TableTwo: React.FC = () => {
  const Token = Cookies.get('token');
  // console.log(import.meta.env)
  const [products, setProducts] = useState<Products[]>([]);
  

  interface Products {
    id: number;
    productId: number;
    name: string;
    price: number;
    categoryName: string;
    discount: number;
    manufacturer: string;
    SalePrice:number;
    DealStatus:boolean;
    SaleStatus:boolean;
    productImages: Array<{ date: string; images: string[] }>;
    // productImages?: { date: string; images: string[] }[] | undefined;
  }

  const fetchAllProducts = () => {
    const API_Urlfetch = `${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}/api/products/clients/all`;
    fetch(API_Urlfetch, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log('Network error');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching all products:', error.message);
      });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const [selectedProducts, setSelectedProducts] = useState<Products[]>([]);

  const toggleProductSelection = (productId: number) => {
    if (selectedProducts.some((product) => product.id === productId)) {
      setSelectedProducts(
        selectedProducts.filter((product) => product.id !== productId),
      );
    } else {
      const selectedProduct = products.find(
        (product) => product.id === productId,
      );
      if (selectedProduct) {
        setSelectedProducts([...selectedProducts, selectedProduct]);
      }
    }
  };

  useEffect(() => {
    console.log('Selected Products:', selectedProducts);
  }, []);
  const [showBulk,setShowBulk]=useState(false);
  const toggleClick=()=>{
    setShowBulk(true);
  }

  return (
    <>
   {showBulk ?(

    <BulkUpdate selectedProducts={selectedProducts}/>
   ):(
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {Token ? (
          <>
            <p className="text-center font-semibold text-2xl py-5 uppercase">
              products
            </p>
            <div className="grid text-xs sm:text-sm grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
              <div className="col-span-1 flex items-center justify-center">
                <p className="font-medium text-black text-center">
                  <input className="mr-4" type="checkbox" name="" id="" />
                </p>
                <p className="font-medium text-black text-center">
                  Product Name
                </p>
              </div>
              <div className="col-span-1 hidden items-center justify-center sm:flex">
                <p className="font-medium text-black text-center">Category</p>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <p className="font-medium text-black text-center">Price</p>
              </div>
              <div className="col-span-1 hidden items-center justify-center sm:flex">
                <p className="font-medium text-black text-center">Discount</p>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <p className="font-medi9um text-black text-center hidden sm:block">
                  Manufacturer
                </p>
                <p className="font-medium text-black text-center sm:hidden">
                  Mfr.
                </p>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <p className="font-medium text-black text-center">Action</p>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <p className="font-medium text-black text-center">New</p>
              </div>
            </div>

            {products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
                id={`${product.id}`}
              >
                {/* <div className="col-span-1 hidden items-center justify-center sm:flex">
                 
                </div> */}
                <div className="col-span-1 flex items-center justify-center text-center">
                  <input
                    className="ml-5"
                    type="checkbox"
                    checked={selectedProducts.includes(product)}
                    onChange={() => toggleProductSelection(product.id)}
                  />
                  <div className="flex flex-col gap-2 sm:flex-col sm:items-center">
                    <div className="h-15 w-15 rounded-md flex mx-auto justify-center items-center overflow-hidden">
                      {/* <img src={process.env.RESOURCE_SERVER_HOST + product.productImages[0]?.images[0]} alt="" /> */}

                      <img
                        src={`${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}${product?.productImages[0]?.images[0]}`}
                      />

                      {/* console.log("pppppppppppppppppp",)   */}
                    </div>
                    <p className="text-xs sm:text-sm text-black dark:text-white">
                      {product.name}
                      {/* {product.id} */}
                    </p>
                  </div>
                </div>
                <div className="col-span-1 hidden items-center justify-center sm:flex">
                  <p className="text-xs sm:text-sm text-black dark:text-white text-center">
                    {product.categoryName}
                  </p>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <p className="text-xs sm:text-sm text-black dark:text-white text-center">
                    {product.price}
                  </p>
                </div>
                <div className="col-span-1 hidden items-center justify-center sm:flex">
                  <p className="text-xs sm:text-sm text-black dark:text-white text-center">
                    {product.discount}
                  </p>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <p className="text-xs sm:text-sm text-black dark:text-white text-center">
                    {product.manufacturer}
                  </p>
                </div>
                <div className="text-xs sm:text-sm col-span-1 flex items-center justify-center">
                  <div>
                    <Link
                      to={`/UpdateProducts/${product.id}`}
                      className="bg-blue hover:bg-blue-700 font-bold py-2 px-4 rounded-full"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
                <div className="text-xs sm:text-sm col-span-1 flex items-center justify-center">
                  <Link
                    to={`/product`}
                    className="bg-blue hover:bg-blue-700 font-bold py-2 px-4 rounded-full"
                  >
                    AddNew
                  </Link>
                </div>
              </div>
            ))}
          </>
        ) : (
          <h1 className="text-center my-54 font-semibold">No products Found</h1>
        )}
        <div>
          <button
          onClick={toggleClick}

          
            className="bg-blue hover:bg-blue-700 font-bold py-2 px-4 rounded-full"
          >
            BulkUpdate
          </button>
        </div>
      </div>
   )}
      {/* {console.log("process.env.RESOURCE_SERVER_HOST ", )} */}
    </>
  );
};

export default TableTwo;
