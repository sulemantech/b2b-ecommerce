import axios from 'axios';
import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from 'react-router-dom';

// interface ProductVariant {
//   key: string;
//   values: string[];
//   type: string;
//   weight: number;
//   unit: string;
//   availableQuantity: number;
//   variantPrice: number;
//   variantSku: string;
//   optionValues: {
//     id: string;
//     name: string;
//     variantSku: string[];
//   };
// }

const FormElements = () => {
  const [productId, setProductId] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [key, setkey] = useState('Size');
  const [optionValues, setOptionValues] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [varian, setVariants] = useState<Array<{ key: string, optionValues: Array<{ id: string; name: string; variantSku: string[] }> }>>([]);




  const handleEditorReady = (editor: any) => {
    console.log('Editor is ready to use!', editor);
  };
  const handleEditorChange = (_: any, editor: any) => {
    const content = editor.getData();
    setEditorContent(content);
  };

  const handlekeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setkey(e.target.value);
  };
  const handleOptionValuesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionValues(e.target.value);
  };

  const handleAddVariant = () => {
    if (optionValues.trim() !== '') {
      const newVariant = {
        key,
        optionValues: [
          {
            id: '1',
            name: optionValues,

            variantSku: [`ABC1239-${optionValues.toLowerCase()}`],
          },
        ],
      };
      setVariants([...varian, newVariant]);
      setShowTable(true);
      setOptionValues('');
    }
  };


  const [value, setvalues] = useState({
    name: '',
    description: '',
    price: '',
    // quantity:20,
    // manufacturer:"china",
    // dateAdded:"",
    // discount:10,
    weight: '',
    // new:"true",
    rating: 5,
    // saleCount:100,
    tag: [] as string[],
    // stock:200,
    quantityInStock: '',
    sku: '',
    category_id: '',
    supplier_id: '',
    categoryName: '',
    productId: '',
    // variant: [] as Array<{ key: string; optionValues: string[] }>,
    status: '',
  });

  console.log(varian);

  // const handleFormSubmit = async () => {

  //   try {
  //     const variantsWithoutEmptyValues: Variant[] = variants.filter(variant => variant.optionValues.length > 0);
  //     const updatedValue = { ...value, description: editorContent, variants: variantsWithoutEmptyValues };
  //     const { variants, ...products } = updatedValue;
  //     const requestData = {
  //       products: { ...products },
  //       variants: [...variants],
  //     };
  //     console.log('Request Data:', variants);

  //     const response = await axios.post('http://localhost:5001/api/products/', requestData);

  //     console.log('Product created:', response.data);
  //   } catch (error) {
  //     console.error('Error creating product:', error);
  //   }
  // };
  const handleFormSubmit = async () => {
    try {
      // Assuming Variant is the type/interface of your variant objects
      const va = varian.filter((variant) => variant.optionValues.length > 0);
      console.log('Request Data:', varian);
      const { variantsss, ...products } = {
        ...value,
        description: editorContent,
        variantsss: va,
      };

      // Create requestData object
      const requestData = {
        products: { ...products },
        variants: [...variantsss],
      };

      console.log('Request Data:', requestData);

      // Assuming you have axios imported
      const response = await axios.post(
        'http://localhost:5001/api/products/',
        requestData,
      );

      console.log('Product created:', response.data);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleSubmit = async () => {
    handleFormSubmit();
    if (!productId) {
      console.error('Product ID is required.');
      return;
    }

    const formData = new FormData();
    formData.append('productId', productId);

    if (imageFile) {
      formData.append('images', imageFile);
    } else {
      console.error('Image file is required.');
      return;
    }
    formData.append('variants', JSON.stringify(varian));

    try {
      const response = await fetch('http://localhost:5001/productImages', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Image posted successfully:', result);
    } catch (error) {
      console.error('Error posting image:', error);
    }
  };

  const handleProductIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(e.target.value);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0] as File);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-[2fr,1fr]">
        <div className="flex flex-col gap-9">
          <div className="rounded-xl border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
            <label className="ml-5 font-bold">Title</label>
            <div className="ml-5">
              <input
                type="text"
                placeholder="name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1
                    px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                   dark:bg-form-input dark:focus:border-primary"
                onChange={(e) => setvalues({ ...value, name: e.target.value })}
                value={value.name}
              />
            </div>
            <br />
            <div className="ml-5 font-bold">
              <label htmlFor="">Desccription</label>
              <CKEditor
                editor={ClassicEditor}
                config={
                  {
                    /* Your CKEditor config options here */
                  }
                }
                onReady={handleEditorReady}
                onChange={handleEditorChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-9 ">
            <div className="rounded-xl border-stroke  bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-10">
              <div>
                <input
                  type="text"
                  placeholder="ProductId"
                  value={productId}
                  onChange={handleProductIdChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1
                  px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                 dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <br />
              <br />
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <input
                      type="file"
                      onChange={handleImageFileChange}
                      className="w-30 cursor-pointer rounded-lg border-[1.5px] border-stroke
                   bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse
                   file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke
                    file:bg-whiter file:py-1 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10
                    focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter
                     dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark
                     dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-9 ">
            <div className="rounded-xl border-stroke  bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5.5 p-6.5">
                <div>
                  <label className="font-bold" htmlFor="">
                    Price
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="RS 0.00"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
                    px-5 font-medium outline-none transition focus:border-primary active:border-primary
                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark
                   dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) =>
                      setvalues({ ...value, price: e.target.value })
                    }
                    value={value.price}
                  />
                </div>
                <div>
                  <label className="font-bold" htmlFor="">
                    Compare-at price
                  </label>
                  <br />

                  <input
                    type="text"
                    placeholder=" Rs 0.00"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
                   px-5 font-medium outline-none transition focus:border-primary active:border-primary
                  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                   dark:focus:border-primary"
                    //      onChange={(e)=>setvalues({...value, categoryName: e.target.value})}
                    //      value={value. categoryName}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5.5 p-6.5">
                <div>
                  <label className="font-bold" htmlFor="">
                    Cost per item
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="RS 0.00"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
                    px-5 font-medium outline-none transition focus:border-primary active:border-primary
                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark
                   dark:bg-form-input dark:focus:border-primary"
                    //  onChange={(e)=>setvalues({...value,name: e.target.value})}
                    //  value={value.name}
                  />
                </div>
                <div>
                  <label className="font-bold" htmlFor="">
                    Profit
                  </label>
                  <br />

                  <input
                    type="text"
                    placeholder="--"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent 
                   px-5 font-medium outline-none transition focus:border-primary active:border-primary
                  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                   dark:focus:border-primary"
                    //      onChange={(e)=>setvalues({...value, categoryName: e.target.value})}
                    //      value={value. categoryName}
                  />
                </div>
                <div>
                  <label className="font-bold" htmlFor="">
                    Margin
                  </label>
                  <input
                    type="text"
                    placeholder="--"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
                   px-5 font-medium outline-none transition focus:border-primary active:border-primary
                  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                   dark:focus:border-primary"
                    //      onChange={(e)=>setvalues({...value, categoryName: e.target.value})}
                    //      value={value. categoryName}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-9 ">
            <div className="rounded-xl border-stroke  bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
              <div className="ml-5">
                <h1 className="font-bold">Inventory</h1>
                <br />
                <div className="flex">
                  <input type="checkbox" className="w-4" />
                  <p className="ml-2 font-bold">Track quantity</p>
                </div>
                <br />

                <h2 className="font-bold">Quantity</h2>
                <hr />
                <br />

                <div className="flex justify-between">
                  <div>
                    <h1 className="text-lg">Shop location</h1>
                  </div>

                  <div>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-30 rounded-lg border-[1.5px] border-stroke bg-transparent 
                   px-5 font-medium outline-none transition focus:border-primary active:border-primary
                  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                   dark:focus:border-primary"
                    />
                  </div>
                </div>
                <br />

                <div className="flex">
                  <input type="checkbox" className="w-4" />
                  <h3 className="ml-2">Continue selling when out of stock</h3>
                </div>
                <p className=" ml-4">
                  This won't affect Staff will see a warning, but can complete
                  sales when available inventory reaches zero and below.
                </p>
                <br />
                <div className="flex">
                  <input type="checkbox" className="w-4" />
                  <h3 className="ml-2">This product has a SKU or barcode</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-9 ">
            <div className="rounded-xl border-stroke  bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
              <div className="ml-5">
                <h1 className="font-bold">Shipping</h1>
                <br />
                <div className="flex">
                  <input type="checkbox" className="w-4" />
                  <h3 className="ml-2">This is a physical product</h3>
                </div>
                <br />
                <label htmlFor="" className="font-bold">
                  Weight
                </label>
                <div>
                  <input
                    value={value.weight}
                    onChange={(e) =>
                      setvalues({ ...value, weight: e.target.value })
                    }
                    type="number"
                    placeholder="0.0"
                    className="w-30 rounded-lg border-[1.5px] border-stroke bg-transparent 
              px-5 font-medium outline-none transition focus:border-primary active:border-primary
             disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
              dark:focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-9">
            <div className="rounded-xl border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
              
              {/* <div className="ml-5">
                <h1 className="font-bold">Variants</h1>
                <br />
                <div className="ml-5">
                  <label htmlFor="">Option name</label>
                  <div className="p-5">
                    <select
                      value={key}
                      onChange={handlekeyChange}
                      className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-1 mr-4
                px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                dark:focus:border-primary"
                    >
                      <option value="type">type</option>
                      <option value="Size">Size</option>
                      <option value="Color">Color</option>
                      <option value="weight">weight</option>
                      <option value="unit">unit</option>
                      <option value="variantPrice">variantPrice</option>
                      <option value="availableQuantity">
                        availableQuantity
                      </option>
                    </select>
                  </div>
                  <br />
                  <label htmlFor="" className="font-bold">
                    Option values
                  </label>
                  <div>
                    <input
                      value={optionValues}
                      onChange={handleOptionValuesChange}
                      className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-1 mr-4
                px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                dark:focus:border-primary"
                    />
                  </div>
                </div>
              </div> */}
              <div className="ml-5">
      <h1 className="font-bold">Variants</h1>
      <br />
      <div className="ml-5">
        <label htmlFor="">Option name</label>
        <div className="p-5">
          <select
            value={key}
            onChange={handlekeyChange}
            className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-1 mr-4
                px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                dark:focus:border-primary"
          >
            <option value="type">type</option>
            <option value="Size">Size</option>
            <option value="Color">Color</option>
            <option value="weight">weight</option>
            <option value="unit">unit</option>
            <option value="variantPrice">variantPrice</option>
            <option value="availableQuantity">availableQuantity</option>
          </select>
        </div>
        <br />
        <label htmlFor="" className="font-bold">
          Option values
        </label>
        <div>
          <input
            value={optionValues}
            onChange={handleOptionValuesChange}
            className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-1 mr-4
                px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                dark:focus:border-primary"
          />
        </div>

        {/* Add new fields */}
        <div>
          <label htmlFor="" className="font-bold">
            New Unit Field
          </label>
          <input
            // Add appropriate state and onChange handler
            className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-1 mr-4
                px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                dark:focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="" className="font-bold">
            Weight
          </label>
          <input
            // Add appropriate state and onChange handler
            className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-1 mr-4
                px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                dark:focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="" className="font-bold">
            Available Quantity
          </label>
          <input
            // Add appropriate state and onChange handler
            className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-1 mr-4
                px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                dark:focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="" className="font-bold">
            Variant Price
          </label>
          <input
            // Add appropriate state and onChange handler
            className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-1 mr-4
                px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                dark:focus:border-primary"
          />
        </div>
      </div>
    </div>
              <div>
                <button
                  onClick={handleAddVariant}
                  className="bg-primary text-white px-4 py-2 rounded-md mt-4"
                >
                  Add Variant
                </button>
              </div>
            </div>

            {showTable && (
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5">
                  <table className="border-collapse border border-stroke mt-3 m-auto">
                    <thead>
                      <tr>
                        <th className="border font-bold border-stroke p-2">
                          Key
                        </th>
                        <th className="border font-bold border-stroke p-2">
                          Values
                        </th>
                        <th className="border font-bold border-stroke p-2">
                          Action
                        </th>
                        <th className="border font-bold border-stroke p-2">
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {varian?.map((variant, index) => (
                        <tr key={index}>
                          <td className="border font-bold border-stroke p-2">
                            {variant.key}
                          </td>
                          <td className="border font-bold border-stroke p-2">
  {typeof variant.optionValues[0] === 'object' && 'name' in variant.optionValues[0] ? (
    variant.optionValues[0].name
  ) : (
    '\u00a0' // Non-breaking space if the condition is not met
  )}
</td>

                       

                          <td className="border font-bold border-stroke p-2">
                            <Link to={'#'}>Edite</Link>
                          </td>
                          <td className="border font-bold border-stroke p-2">
                            <Link to={'#'}>Remove</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>




        </div>

        {/* //////////////////////////////////////second column/////////////////////////////////////////////////////////////////////////////////////////// */}
        <div className="flex flex-col gap-9 ">
          <div className="rounded-xl border-stroke bg-white text-black shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="p-5">
              <select
                onChange={(e) =>
                  setvalues({ ...value, status: e.target.value })
                }
                value={value.status}
                className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-1
             px-5 font-medium outline-none transition focus:border-primary active:border-primary 
            disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
            dark:focus:border-primary"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-9 ">
            <div className="rounded-xl border-stroke  bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className=" ml-5 mt-3">
                <h1 className="font-semibold">Publishing</h1>
                <ul className="list-disc">
                  <li>Online Store</li>
                  <li>Point of Sale</li>
                  <p>
                    Point of Sale has not been set up. Finish the remaining
                    steps to start selling in person.
                  </p>
                  <a
                    href="#"
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    Learn more
                  </a>
                  <br />
                  <h2 className="font-semibold">Market</h2>
                  <li>Incomplete International and Pakistan</li>
                </ul>
                <br />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-9 ">
            <div className="rounded-xl border-stroke  bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-2">
              <div className="ml-5">
                <h1 className="font-semibold">Product organization</h1>
                <br />
                <label className="font-bold" htmlFor="">
                  product Category
                </label>

                <input
                  type="text"
                  placeholder="CategoryName"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1
                    px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                   dark:bg-form-input dark:focus:border-primary"
                  onChange={(e) =>
                    setvalues({ ...value, categoryName: e.target.value })
                  }
                  value={value.categoryName}
                />
                <label htmlFor="">category_id</label>
                <input
                  type="text"
                  placeholder="category_id"
                  className="w-full rounded-lg border-[1.5px] border-stroke
                  bg-transparent py-3 px-5 font-medium outline-none transition
                   focus:border-primary active:border-primary disabled:cursor-default
                   disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  onChange={(e) =>
                    setvalues({ ...value, category_id: e.target.value })
                  }
                  value={value.category_id}
                />

                <br />
                <label htmlFor="">productId</label>
                <input
                  type="text"
                  placeholder="category_id"
                  className="w-full rounded-lg border-[1.5px] border-stroke
                  bg-transparent py-3 px-5 font-medium outline-none transition
                   focus:border-primary active:border-primary disabled:cursor-default
                   disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  onChange={(e) =>
                    setvalues({ ...value, productId: e.target.value })
                  }
                  value={value.productId}
                />
                <br />
                <label className="font-bold" htmlFor="">
                  quantityInStock
                </label>

                <input
                  type="text"
                  placeholder="quantityInStock"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1
                    px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                   dark:bg-form-input dark:focus:border-primary"
                  onChange={(e) =>
                    setvalues({ ...value, quantityInStock: e.target.value })
                  }
                  value={value.quantityInStock}
                />
                <br />
                <br />
                <label className="font-bold" htmlFor="">
                  Vendor
                </label>

                <input
                  type="text"
                  placeholder="Supplier_id"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1
                    px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                   dark:bg-form-input dark:focus:border-primary"
                  onChange={(e) =>
                    setvalues({ ...value, supplier_id: e.target.value })
                  }
                  value={value.supplier_id}
                />
                <br />
                <br />
                <label className="font-bold" htmlFor="">
                  SKU
                </label>

                <input
                  type="text"
                  placeholder="Sku"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1
                    px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                   dark:bg-form-input dark:focus:border-primary"
                  onChange={(e) => setvalues({ ...value, sku: e.target.value })}
                  value={value.sku}
                />
                <br />
                <br />
                <label className="font-bold" htmlFor="">
                  Tags
                </label>

                <input
                  type="text"
                  placeholder="Tags"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1
                    px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                   dark:bg-form-input dark:focus:border-primary"
                  onChange={(e) =>
                    setvalues({ ...value, tag: [e.target.value] })
                  }
                  value={value.tag.join(',')}
                />
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div
          style={{ border: '20px', padding: '10px' }}
          className="flex justify-end"
        >
          <button
            className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center
              font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={handleSubmit}
          >
            Submite
          </button>
        </div>
      </div>
    </>
  );
};
export default FormElements;