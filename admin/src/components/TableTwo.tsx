import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import ProductWrapper from '../components/ProductWrapper';
import BulkUpdate from './BulkUpdate';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { LuArchive } from 'react-icons/lu';
import { IoMdArrowDropdown } from 'react-icons/io';

const TableTwo: React.FC = () => {
  const Token = Cookies.get('token');
  const [showHeight, setShowHeight] = useState(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  

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
    if (selectedProducts.length > 0) {
      setShowHeight(true);
    } else {
      setShowHeight(false);
    }
  }, [selectedProducts]);


  const toggleClick = () => {
    setShowBulk(true);
  };

  const toggle = () => {
    setShowBulk(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  
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
              <ProductWrapper Value="Final product">
                <div
                  className={`sticky top-14 items-center justify-center bg-white transition duration-300 text-black-2 font-semibold h-12 ${showHeight ? 'block' : 'hidden border-none'}`}
                >
                  <div className="grid text-xs md:text-xs grid-cols-3 sm:grid-cols-10 px-4 md:px-[18px] 2xl:px-7.5 mt-2">
                    <div className="col-span-1 mt-2 flex items-center justify-around w-full pr-1 active:shadow-inner hover:bg-[rgba(241,241,241,0.45)] rounded-l-md border-2 border-r-0 border-[rgb(241,241,241)]">
                      <input className="mr-0" type="checkbox" name="" id="" />
                      <p className="text-center text-[#616161] w-[80px]">
                        {'Selected '}
                        ({selectedProducts.length}) 
                      </p>
                    </div>
                    <div className="col-span-1 mt-2 flex items-center justify-center">
                      <button
                        onClick={toggleClick}
                        className="w-full p-1 active:shadow-inner hover:bg-[rgba(241,241,241,0.45)] rounded-l-sm border-2 border-[#ebebeb]"
                      >
                        Bulk Edit
                      </button>
                    </div>
                    <div
                      className="col-span-1 mt-2 flex items-center justify-center relative"
                      ref={dropdownRef}
                    >
                      <button
                        title="More actions"
                        onClick={toggleDropdown}
                        className="relative w-full p-1 active:shadow-inner hover:{toggleDropdown} focus:bg-[rgba(241,241,241,0.45)] hover:bg-[rgba(241,241,241,0.45)] rounded-r-md border-2 border-l-0 border-[rgb(241,241,241)]"
                      >
                        More actions
                        <IoMdArrowDropdown
                          className={`ml-4 absolute top-2 right-2 transition-transfrom duration-500 ${dropdownOpen ? 'rotate-[0deg]' : 'rotate-[180deg]'}`}
                        />
                      </button>
                      <div
                        className={`absolute w-[186.5px] top-6 right-0 mt-2 d border border-[#ebebeb] bg-white rounded-xl shadow-xl shadow-[#ebebeb] overflow-hidden transition-height duration-500 ${dropdownOpen ? 'h-[345px] ' : 'h-0 border-none'}`}
                      >
                        <ul
                          className={`py-2 text-black text-xs font-semibol transition-transfrom delay-200 duration-500 ${dropdownOpen ? 'text-opacity-1 ' : 'text-opacity-0'}`}
                        >
                          <li className="flex items-center px-2 mx-1.5 py-2 hover:bg-[#ebebeb] cursor-pointer rounded-md">
                            <LuArchive className="h-4 w-4 my-0 mr-1" /> {' '}
                            Archive products
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
                    <p className="font-medium text-[#616161] text-center">
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
            <h1 className="text-center my-54 font-semibold">
              No products Found
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default TableTwo;
