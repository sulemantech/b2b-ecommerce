import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import ProductWrapper from '../components/ProductWrapper';
import BulkUpdate from './BulkUpdate';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { LuArchive } from 'react-icons/lu';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoMdArrowRoundBack } from 'react-icons/io';
import debounce from 'lodash/debounce';

const TableTwo: React.FC = () => {
  const Token = Cookies.get('token');
  const [products, setProducts] = useState<Products[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [, setLoading] = useState<boolean>(false);
  const [, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const [showHeight, setShowHeight] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Products[]>([]);

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
    quantityInStock: string;
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

  const toggleProductSelection = (productId: number) => {
    if (selectedProducts.some((product) => product.id === productId)) {
      setSelectedProducts(
        selectedProducts.filter((product) => product.id !== productId),
      );
    } else {
      const selectedProduct =
        products.find((product) => product.id === productId) ||
        results.find((product) => product.id === productId);
      if (selectedProduct) {
        setSelectedProducts([...selectedProducts, selectedProduct]);
      }
    }
  };

  useEffect(() => {
    setShowHeight(selectedProducts.length > 0);
  }, [selectedProducts]);

  useEffect(() => {
    console.log('Selected Products:', selectedProducts);
  }, [selectedProducts]);

  const toggleClick = () => {
    setShowBulk(true);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') return;

    const debouncedFetchData = debounce(async (term) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}/api/product/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `query { search(query: "${term}") { 
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
          },
        );

        const data = await response.json();
        console.log(data.data.search);
        setResults(data.data.search);
        console.log('Search results:', data);
      } catch (error) {
        console.error('Error during search:', error);
        setError('An error occurred during the search. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms debounce delay

    debouncedFetchData(searchTerm);

    // Cleanup function to cancel debounce on unmount or change
    return () => {
      debouncedFetchData.cancel();
    };
  }, [searchTerm]);

  // console.log('products', products);
  return (
    <>
      {showBulk ? (
        <div>
          <button
            className="flex px-1 mb-3 ml-1.5 pr-2 rounded-md text-black-2 font-semibold text-sm shadow-lg shadow-[#ebebeb] hover:bg-white py-1 transition duration-300 ease-in-out"
            onClick={() => setShowBulk(false)}
          >
            <IoMdArrowRoundBack className="flex items-center justify-center mr-1 h-5 w-5" />{' '}
            Back
          </button>
          <BulkUpdate selectedProducts={selectedProducts} />
        </div>
      ) : (
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {Token ? (
            <>
              <ProductWrapper
                Value="Final product"
                searchValue={searchTerm}
                setSearchValue={setSearchTerm}
              >
                <div
                  className={`sticky top-14 items-center justify-center bg-white px-6 text-black-2 text-sm font-semibold h-12 ${showHeight ? 'block' : 'hidden border-none'}`}
                >
                  <div className="flex">
                    {/* <div>
                      
                    </div> */}
                    <button className="flex flex-row items-center space-x-4 mt-2 px-4 py-1 justify-center active:shadow-inner hover:bg-[rgba(241,241,241,0.45)] rounded-l-md border-2 border-r-0 border-[rgb(241,241,241)]">
                      <input className="mr-0" type="checkbox" name="" id="" />
                      <p className="flex flex-row text-center w-[90px]">
                        {'Selected' + ' '}({selectedProducts.length})
                      </p>
                    </button>
                    <div className="mt-2 flex items-center justify-center">
                      <button
                        onClick={toggleClick}
                        className="w-[80px] px-2 py-1 active:shadow-inner hover:bg-[rgba(241,241,241,0.45)] border-2 border-[rgb(241,241,241)]"
                      >
                        Bulk Edit
                      </button>
                    </div>
                    <div
                      className="mt-2 flex items-center justify-center relative"
                      ref={dropdownRef}
                    >
                      <button
                        title="More actions"
                        onClick={toggleDropdown}
                        className="relative w-[135px] px-0 py-1 active:shadow-inner hover:{toggleDropdown} focus:bg-[rgba(241,241,241,0.45)] hover:bg-[rgba(241,241,241,0.45)] rounded-r-md border-2 border-l-0 border-[rgb(241,241,241)]"
                      >
                        More actions
                        <IoMdArrowDropdown
                          className={`ml-4 absolute top-2 right-1.5 transition-transfrom duration-500 ${dropdownOpen ? 'rotate-[0deg]' : 'rotate-[180deg]'}`}
                        />
                      </button>
                      <div
                        className={`absolute w-[186.5px] top-6 right-0 mt-2 d border border-[#ebebeb] bg-white rounded-xl shadow-xl shadow-[#ebebeb] overflow-hidden transition-height duration-500 ${dropdownOpen ? 'h-[345px] ' : 'h-0 border-none'}`}
                      >
                        <ul
                          className={`py-2 text-black text-xs font-semibol transition-transfrom delay-200 duration-500 ${dropdownOpen ? 'text-opacity-1 ' : 'text-opacity-0'}`}
                        >
                          <li className="flex items-center px-2 mx-1.5 py-2 hover:bg-[#ebebeb] cursor-pointer rounded-md">
                            <LuArchive className="h-4 w-4 my-0 mr-1" /> Archive
                            products
                          </li>
                          <li
                            className={`flex items-center px-2 mx-1.5 py-2 hover:bg-[#ebebeb] cursor-pointer rounded-md text-meta-1 transition-transfrom delay-200 duration-500 ${dropdownOpen ? 'text-opacity-1 ' : 'text-opacity-0'}`}
                          >
                            <MdOutlineDeleteOutline className="h-4 w-4 my-0 mr-1" />{' '}
                            Delete products
                          </li>
                          <hr className="text-[#ebebeb]" />
                          <li className="px-2 mx-1.5 py-2 hover:bg-[#ebebeb] cursor-pointer rounded-md">
                            Include in sales channels
                          </li>
                          <li className="px-2 mx-1.5 py-2 hover:bg-[#ebebeb] cursor-pointer rounded-md">
                            Exclude from sales channels
                          </li>
                          <hr className="text-[#ebebeb]" />
                          <li className="px-2 mx-1.5 py-2 hover:bg-[#ebebeb] cursor-pointer rounded-md">
                            Include in markets
                          </li>
                          <li className="px-2 mx-1.5 py-2 hover:bg-[#ebebeb] cursor-pointer rounded-md">
                            Exclude from markets
                          </li>
                          <hr className="text-[#ebebeb]" />
                          <li className="px-2 mx-1.5 py-2 hover:bg-[#ebebeb] cursor-pointer rounded-md">
                            Add tags
                          </li>
                          <li className="px-2 mx-1.5 py-2 hover:bg-[#ebebeb] cursor-pointer rounded-md">
                            Remove tags
                          </li>
                          <hr className="text-[#ebebeb]" />
                          <li className="px-2 mx-1.5 py-2 hover:bg-[#ebebeb] cursor-pointer rounded-md">
                            Add to collection(s)
                          </li>
                          <li className="px-2 mx-1.5 py-2 hover:bg-[#ebebeb] cursor-pointer rounded-md">
                            Remove from collection(s)
                          </li>
                        </ul>
                      </div>
                      {/* {dropdownOpen && (
                      )} */}
                    </div>
                  </div>
                </div>
                <div className="grid bg-[#f7f7f7] text-xs sm:text-sm grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
                  <div className="col-span-1 flex items-center justify-around">
                    <p className="flex flex-col font-medium text-[#616161] text-center">
                      <input
                        className="mr-2 sm:mr-0"
                        type="checkbox"
                        name=""
                        id=""
                      />
                    </p>
                    <p className="w-20 font-medium text-[#616161] text-center">
                      Produc
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
                {(results.length > 0 && searchTerm.length > 0
                  ? results
                  : products
                ).map((product) => (
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
                        <div className="w-full aspect-w-1 aspect-h-1 rounded-md overflow-hidden">
                          <img
                            src={`${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}${product?.productImages[0]?.images[0]}`}
                            alt="Product Image"
                            className="object-cover w-full h-full"
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
                        {product.quantityInStock}
                      </p>
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      <Link
                        to={`/UpdateProducts/${product.id}`}
                        className="p-1 px-3 text-black text-sm font-semibold bg-white rounded-lg shadow-sm shadow-[#3a3737] hover:shadow-none hover:border hover:border-[#ebebeb] hover:bg-[rgba(241,241,241,0.45)]"
                      >
                        Edit
                      </Link>
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      <p className="text-xs sm:text-sm text-meta-3">
                        {product.DealStatus ? 'Yes' : 'No'}
                      </p>
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
