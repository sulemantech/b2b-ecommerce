import { useState, useEffect } from 'react';
import ProductWrapper from '../../components/ProductWrapper';
import '../../components/styl.css';
import { ImNotification } from "react-icons/im";

const Inventory = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]); // Adjust type as needed
  const [products, setProducts] = useState<any[]>([]); // State to store fetched products
  const [editedProducts, setEditedProducts] = useState<Map<string, any>>(new Map()); // Track edited products
  const [showButtons, setShowButtons] = useState<boolean>(false); // Track if changes are made

  // Fetch products from API
  const fetchAllProducts = () => {
    const API_Urlfetch = `${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}/api/products/clients/all`;
    const token = import.meta.env.VITE_REACT_APP_API_TOKEN; // Ensure this is the correct environment variable for your token
    fetch(API_Urlfetch, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setEditedProducts(new Map()); // Reset edited products on fetch
        setShowButtons(false); // Hide buttons when products are fetched
      })
      .catch((error) => {
        console.error('Error fetching all products:', error.message);
      });
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId],
    );
  };

  const handleInputChange = (productId: string, field: string, value: string) => {
    setEditedProducts((prev) => {
      const updated = new Map(prev);
      if (!updated.has(productId)) {
        updated.set(productId, { ...products.find(p => p.id === productId) });
      }
      const product = updated.get(productId);
      if (product) {
        product[field] = value;
        updated.set(productId, product);
        setShowButtons(true); // Show buttons when changes are made
      }
      return updated;
    });
  };

  const saveChanges = () => {
    const API_UrlUpdate = `${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}/api/products/update`;
    const token = import.meta.env.VITE_REACT_APP_API_TOKEN;

    const updates = Array.from(editedProducts.values()).map((product: any) => ({
      id: product.id,
      available: product.available,
      onHand: product.onHand,
    }));

    fetch(API_UrlUpdate, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ updates }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Network response was not ok: ${text}`);
          });
        }
        return response.json();
      })
      .then(() => {
        fetchAllProducts(); // Refresh product data
        setShowButtons(false);
      })
      .catch((error) => {
        console.error('Error updating products:', error.message);
      });
  };

  const discardChanges = () => {
    fetchAllProducts(); // Re-fetch products to discard changes
    setShowButtons(false); // Hide buttons after discarding
  };

  return (
    <div>
      {/* Buttons positioned at the bottom */}
      <div className={`flex justify-center border-t border-stroke ${showButtons ? 'block' : 'hidden'}`}>
        <div className='flex justify-between items-center w-[50%] bg-[#ebebeb] px-1 my-1 rounded-lg border border-stroke'>
          <div className='flex items-center space-x-1 px-1'>
          <ImNotification  className='text-black'/>
            <p className='text-custom text-black px-1 py-0.5 my-0.5'>
              Unsaved changes
            </p>
          </div>

        <div>
          
        <button
          onClick={discardChanges}
          className='bg-[#404040] text-custom text-white px-2 my-0.5 rounded-md shadow-meta-4 shadow-sm hover:shadow-none'
        >
          Discard
        </button>
        <button
          onClick={saveChanges}
          className='bg-white text-custom text-black px-2 my-0.5 rounded-md ml-2 shadow-meta-4 shadow-sm hover:shadow-none'
        >
          Save
        </button>
        </div>
        </div>
      </div>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

        <ProductWrapper
          Value="Inventory"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        >
          <table className="w-full border-collapse table-auto text-black">
            <thead className="bg-[#f7f7f7] text-xs sm:text-sm border-t border-stroke dark:border-strokedark">
              <tr>
                <th className="px-2 py-2 w-[1%]">
                  <input type="checkbox" className="ml-4" />
                </th>
                <th className="px-2 py-2 w-[1%]"></th>
                <th className="px-2 py-2 text-start w-[25%]">Product</th>
                <th className="px-2 py-2 w-[10%] text-start">SKU</th>
                <th className="px-4 py-2 w-[10%] text-right">Unavailable</th>
                <th className="px-4 py-2 w-[10%] text-right">Committed</th>
                <th className="px-2 py-2 w-[15%] lg:w-[10.5%] text-start">
                  Available
                </th>
                <th className="px-2 py-2 w-[15%] lg:w-[10.5%] text-start">
                  On Hand
                </th>
                <th className="px-2 py-2 w-[2%]"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const quantityInStock = parseInt(product.quantityInStock) || 0;
                const unavailable = parseInt(product.unavailable) || 0;
                const committed = parseInt(product.committed) || 0;
                const available = quantityInStock;
                const onHand = unavailable + committed + available;

                return (
                  <tr
                    key={product.id}
                    className="text-center border-t border-stroke"
                  >
                    <td className="px-2 py-2">
                      <input
                        type="checkbox"
                        className="ml-4"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleProductSelection(product.id)}
                      />
                    </td>
                    <td className="px-2 py-2">
                      <div className="h-10 w-10 relative">
                        <img
                          src={`${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}${product?.productImages[0]?.images[0]}`}
                          alt="Product Image"
                          className="object-cover w-full h-full rounded-md"
                        />
                      </div>
                    </td>
                    <td className="px-2 py-2 text-start">
                      <div>
                        <p className="font-semibold text-sm">{product.name}</p>
                        <div className="inline-flex rounded-full bg-[#ebebeb] px-2">
                          <p className="text-xs font-medium py-0.5">
                            {'Color'} <span> / {'Size'}</span>
                            {/* {product.color} <span> / {product.size}</span> */}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2 text-start text-custom">{'sku'}</td>
                    {/* <td className="px-2 py-2 text-start">{product.sku}</td> */}
                    <td className="px-4 py-2 text-right text-custom">{unavailable}</td>
                    <td className="px-4 py-2 text-right text-custom">{committed}</td>
                    <td className="px-2 py-2 text-custom">
                      <input
                        defaultValue={available.toString()}
                        className="w-full rounded-lg py-0.5 pl-2 placeholder:text-black border border-[#8a8a8a] placeholder-xs"
                        type="text"
                        onChange={(e) => handleInputChange(product.id, 'available', e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="px-2 py-2 text-custom">
                      <input
                        defaultValue={onHand.toString()}
                        className="w-full rounded-lg py-0.5 pl-2 placeholder:text-black border border-[#8a8a8a] placeholder-xs"
                        type="text"
                        onChange={(e) => handleInputChange(product.id, 'onHand', e.target.value)}
                        onClick={(e) => e.stopPropagation()} 
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ProductWrapper>
      </div>
    </div>
  );
};

export default Inventory;
