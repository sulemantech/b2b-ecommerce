import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import ProductWrapper from '../components/ProductWrapper';
import { ImBin } from "react-icons/im";
import BulkUpdate from './BulkUpdate';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { LuArchive } from 'react-icons/lu';
import { IoMdArrowDropdown } from 'react-icons/io';

const TableTwo: React.FC = () => {
  const Token = Cookies.get('token');
  const [products, setProducts] = useState<Products[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // console.log("resultssss",results)

  interface Products {
    id: number;
    productId: number;
    name: string;
    price: number;
    quantity: string;
    description: string;
    categoryName: string;
    discount: number;
    manufacturer: string;
    SalePrice: number;
    DealStatus: boolean;
    Approved: boolean;
    SaleStatus: boolean;
    productImages: Array<{ date: string; images: string[] }>;
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
  const [showBulk, setShowBulk] = useState(false);

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

  const [showBulk, setShowBulk] = useState(false);

  const toggleClick = () => {
    setShowBulk(true);
  };

  useEffect(() => {
    if (searchTerm.trim() === '') return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}/api/product/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `query { search(query: "${searchTerm}") { 
                      id
                      name
                      description
                      price
                      sku
                      productImages {
                        date
                        images
                      }
                    }}`,
          }),
        });

        const data = await response.json();
        console.log(data.data.search)
        
          setResults(data.data.search);
        
        console.log('Search results:', data);
      } catch (error) {
        console.error('Error during search:', error);
        setError('An error occurred during the search. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  // const displayProducts = searchTerm ? results : products;
console.log("products",products);
  return (
    <>
      {showBulk ? (
        <div>
          <button onClick={toggle}>back</button>
          <BulkUpdate selectedProducts={selectedProducts} />
        </div>
      ) : (
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {Token ? (
            <>
              <ProductWrapper Value="Final product" searchValue={searchTerm} setSearchValue={setSearchTerm}>
                {selectedProducts.length ? (
                  <div className="transition-height duration-300 flex items-center justify-between text-black-2 font-semibold text-xs h-10 border border-t-stroke border-white overflow-hidden">
                    <p className="flex items-center ml-10 text-center text-[#616161]">
                      <input className="mr-2" type="checkbox" name="" id="" />
                      Selected
                    </p>
                    <div className='flex items-center space-x-2 p-4'>
                      <button
                        onClick={toggleClick}
                        className="p-1.5 active:shadow-inner hover:bg-[rgba(241,241,241,0.45)] rounded-md shadow-sm shadow-[#00000079]"
                      >
                        Bulk Update
                      </button>
                      <button title='Delete Selection' className="p-1.5 active:shadow-inner hover:bg-[rgba(241,241,241,0.45)] rounded-md shadow-sm shadow-[#00000079]">
                        <ImBin className="fill-meta-1 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : null}
                <div className="grid bg-[#f7f7f7] text-xs sm:text-sm grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
                  <div className="col-span-1 flex items-center justify-around">
                    <p className="font-medium text-[#616161] text-center">
                      <input className="mr-2 sm:mr-0" type="checkbox" name="" id="" />
                      <input
                        className="mr-2 sm:mr-0"
                        type="checkbox"
                        name=""
                        id=""
                      />
                    </p>
                    <p className="w-20 font-medium text-[#616161] text-center">
                      Product
                    </p>
                  </div>
                  <div className="col-span-1 hidden items-center justify-center sm:flex">
                    <p className="font-medium text-[#616161] text-center">
                      Category
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <p className="font-medium text-[#616161] text-center">
                      Price
                    </p>
                  </div>
                  <div className="col-span-1 hidden items-center justify-center sm:flex">
                    <p className="font-medium text-[#616161] text-center">
                      Discount
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <p className="font-medium text-[#616161] text-center">
                      Manufacturer
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <p className="font-medium text-[#616161] text-center">
                      Action
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <p className="font-medium text-[#616161] text-center">
                      New
                    </p>
                  </div>
                </div>
              </ProductWrapper>
              {(results.length > 0 && searchTerm.length > 0 ? results : products).map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
                  id={`${product.id}`}
                >
                  <div className="col-span-1 flex items-center justify-around text-center">
                    <input
                      className="mr-2 sm:mr-0"
                      type="checkbox"
                      checked={selectedProducts.includes(product)}
                      onChange={() => toggleProductSelection(product.id)}
                    />
                    <div className="w-20 flex flex-col gap-2 sm:flex-col sm:items-center">
                      <div className="h-10 w-10 sm:w-15 sm:h-15 rounded-md flex mx-auto justify-center items-center overflow-hidden">
                        <img
                          src={`${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}${product?.productImages[0]?.images[0]}`}
                        />
                      </div>
                      <p className="text-xs sm:text-sm text-black dark:text-white">
                        {product.name}
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
                  <div className="col-span-1 flex items-center justify-center">
                    <Link to={`/products/${product.id}`} className="text-xs sm:text-sm text-meta-3">
                      Edit
                    </Link>
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <p className="text-xs sm:text-sm text-meta-3">{product.DealStatus ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              ))}
                {/* below this open slow */}
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
                    id={`${product.id}`}
                  >
                    <div className="col-span-1 flex items-center justify-around text-center">
                      <input
                        className="mr-2 sm:mr-0"
                        type="checkbox"
                        checked={selectedProducts.includes(product)}
                        onChange={() => toggleProductSelection(product.id)}
                      />
                      <div className="w-20 flex flex-col gap-2 sm:flex-col sm:items-center">
                        <div className="h-10 w-10 sm:w-15 sm:h-15 rounded-md flex mx-auto justify-center items-center overflow-hidden">
                          <img
                            src={`${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}${product?.productImages[0]?.images[0]}`}
                          />
                        </div>
                        <p className="text-xs sm:text-sm text-black dark:text-white">
                          {product.name}
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
              </ProductWrapper>
            </>
          ) : (
            <p>Please log in to view the products.</p>
          )}
        </div>
      )}
    </>
  );
};

export default TableTwo;

