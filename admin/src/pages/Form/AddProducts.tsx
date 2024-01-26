// import Breadcrumb from '../../components/Breadcrumb';
import { useState } from 'react';
import axios from 'axios';
import TextArea from '../../components/TextArea';






//   return (
//     <>
//       <Breadcrumb pageName="Products" />

//       <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
//         <div className="flex flex-col gap-9">
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//               <h3 className="font-medium text-black dark:text-white">
//                 Product Details
//               </h3>
//             </div> */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-5.5 p-6.5">
//               <div>

//                 <input
//                   type="text"
//                   placeholder="name"
//                   className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
//                    py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary
//                    disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark
//                    dark:bg-form-input dark:focus:border-primary"
//                    onChange={(e)=>setvalues({...value,name: e.target.value})}
//                    value={value.name}
//                 />
//               </div>
//               <div>

//                <input
//                  type="text"
//                  placeholder=" categoryName"
//                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
//                   py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary
//                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
//                    dark:focus:border-primary"
//                    onChange={(e)=>setvalues({...value, categoryName: e.target.value})}
//                    value={value. categoryName}
//                />
//              </div>

//               <div>

//                <input
//                  type="text"
//                  placeholder="price"
//                  className="w-full rounded-lg border-[1.5px] border-stroke
//                  bg-transparent py-3 px-5 font-medium outline-none transition
//                  focus:border-primary active:border-primary disabled:cursor-default
//                  disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                  onChange={(e)=>setvalues({...value,price: e.target.value})}
//                   value={value.price}
//                />
//              </div>

//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-5.5 p-6.5">

//               <div>

//                 <input
//                   type="text"
//                   placeholder="quantity"
//                   className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
//                   py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary
//                    disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
//                    dark:focus:border-primary"
//                    onChange={(e)=>setvalues({...value,quantity: e.target.value})}
//                    value={value.quantity}
//                 />
//               </div>
//               <div>

//                 <input
//                   type="text"
//                   placeholder="manufacturer"
//                   className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
//                    py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary
//                    disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
//                     dark:focus:border-primary"
//                     onChange={(e)=>setvalues({...value,manufacturer: e.target.value})}
//                    value={value.manufacturer}
//                 />
//               </div>

//               <div>

//                 <input
//                   type="text"
//                   placeholder="discount"
//                   className="w-full rounded-lg border-[1.5px] border-stroke
//                    bg-transparent py-3 px-5 font-medium outline-none transition
//                    focus:border-primary active:border-primary disabled:cursor-default
//                     disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                     onChange={(e)=>setvalues({...value,discount: e.target.value})}
//                    value={value.discount}
//                 />
//               </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-5.5 p-6.5">
//               <div>

//                 <input
//                   type="text"
//                   placeholder="new"
//                   className="w-full rounded-lg border-[1.5px] border-stroke
//                    bg-transparent py-3 px-5 font-medium outline-none transition
//                    focus:border-primary active:border-primary disabled:cursor-default
//                     disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                     onChange={(e)=>setvalues({...value,new: e.target.value})}
//                    value={value.new}
//                 />
//               </div>
//               <div>

//                 <input
//                   type="text"
//                   placeholder="rating"
//                   className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
//                    py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary
//                     disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
//                      dark:focus:border-primary"
//                      onChange={(e)=>setvalues({...value,rating: e.target.value})}
//                    value={value.rating}
//                 />
//               </div>
//               <div>

//               <input
//                 type="text"
//                 placeholder="saleCount"
//                 className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
//                 py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary
//                  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
//                   dark:focus:border-primary"
//                   onChange={(e)=>setvalues({...value,saleCount: e.target.value})}
//                  value={value.saleCount}
//               />
//             </div>

//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-5.5 p-6.5">

//               <div>

//                 <input
//                   type="text"
//                   placeholder="tag"
//                   className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
//                   py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary
//                    disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                    onChange={(e) => setvalues({ ...value, tag: [e.target.value] })}
//                    value={value.tag.join(',')}
//                 />
//               </div>
//               <div>

//               <input
//                 type="text"
//                 placeholder="stock"
//                 className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
//                 py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary
//                  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
//                   dark:focus:border-primary"
//                   onChange={(e)=>setvalues({...value,stock: e.target.value})}
//                  value={value.stock}
//               />
//             </div>
//             <div>

//               <input
//                 type="text"
//                 placeholder="quantityInStock"
//                 className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
//                  py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary
//                  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                  onChange={(e)=>setvalues({...value,quantityInStock: e.target.value})}
//                 value={value.quantityInStock}
//               />
//             </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-5.5 p-6.5">
//               <div>

//                <input
//                  type="text"
//                  placeholder="sku"
//                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
//                   py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary
//                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
//                    dark:focus:border-primary"
//                    onChange={(e)=>setvalues({...value,sku: e.target.value})}
//                    value={value.sku}
//                />
//              </div>
//              <div>

//                <input
//                  type="text"
//                  placeholder="category_id"
//                  className="w-full rounded-lg border-[1.5px] border-stroke
//                   bg-transparent py-3 px-5 font-medium outline-none transition
//                    focus:border-primary active:border-primary disabled:cursor-default
//                    disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                    onChange={(e)=>setvalues({...value,category_id: e.target.value})}
//                    value={value.category_id}
//                />
//              </div>
//              <div>

//                <input
//                  type="text"
//                  placeholder="supplier_id"
//                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
//                   py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary
//                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
//                    dark:focus:border-primary"
//                    onChange={(e)=>setvalues({...value,supplier_id: e.target.value})}
//                    value={value.supplier_id}
//                />
//              </div>
//              </div>

//              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5.5 p-6.5">
//              <div>
//                 <input
//                   type="text"
//                   placeholder="description"
//                   className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
//                    py-3 px-5 font-medium outline-none transition focus:border-primary
//                     active:border-primary disabled:cursor-default disabled:bg-whiter
//                     dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                     onChange={(e)=>setvalues({...value,description: e.target.value})}
//                    value={value.description}
//                 />
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Text area"
//                   className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
//                    py-3 px-5 font-medium outline-none transition focus:border-primary
//                     active:border-primary disabled:cursor-default disabled:bg-whiter
//                     dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                   //   onChange={(e)=>setvalues({...value,description: e.target.value})}
//                   //  value={value.description}
//                 />
//               </div>
//              </div>

//              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5.5 p-6.5">
//             
//             </div>

//           </div>
//         </div>

//         <div className="flex flex-col gap-9">
//           {/* <!-- File Upload --> */}
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//               <h3 className="font-medium text-black dark:text-white">
//                 File upload
//               </h3>
//             </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5.5 p-6.5">

//               <div>

//                 <input
//                   type="file"
//                   onChange={handleImageFileChange}
//                   className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke
//                    bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse
//                    file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke
//                     file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10
//                     focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter
//                      dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark
//                      dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
//                 />
//                 </div>
//                    <div>
//                 <input
//                   type="text"
//                   placeholder='ProductId'
//                   value={productId}
//                   onChange={handleProductIdChange}
//                   className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
//                 />
//               </div>
//               </div>
//           </div>
//           <div className="flex flex-col gap-10">
//         {/* Render the SheetJSApp component here */}
//       </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default FormElements;

const FormElements = () => {
    const [productId, setProductId] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);


  const [optionName, setOptionName] = useState('Size');
  const [optionValues, setOptionValues] = useState('');
  const [variants, setVariants] = useState<Array<{ optionName: string; optionValues: string[] }>>([]);
  const [showTable, setShowTable] = useState(false);

  const handleOptionNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOptionName(e.target.value);
  };

  const handleOptionValuesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionValues(e.target.value);
  };

  const handleAddVariant = () => {
    if (optionValues.trim() !== '') {
      const newVariant = {
        optionName,
        optionValues: optionValues.split(',').map((value) => value.trim()),
      };
      setVariants([...variants, newVariant]);
      setShowTable(true);
      setOptionValues('');
    }
  };


  const [value,setvalues]=useState({
    name:"",
    description:"",
    price:"",
    quantity:"",
    manufacturer:"",
    // dateAdded:"",
    discount:"",
    weight:"",
    new:"",
    rating:"",
    saleCount:"",
    tag:[]as string[],
    stock:"",
    quantityInStock:"",
    sku:"",
    category_id:"",
    supplier_id:"",
    categoryName:"",
    productId:"",
    status:""

  });
  const handleFormSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/products/', value);
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
                 onChange={(e)=>setvalues({...value,name: e.target.value})}
                 value={value.name}
              />
            </div>
            <br />
            <div className="ml-5 font-bold">
              <label htmlFor="">Desccription</label>
              <TextArea />
            </div>
          </div>
          <div className="flex flex-col gap-9 ">
            <div className="rounded-xl border-stroke  bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-10">
            <div>
                             <input
                  type="text"
                  placeholder='ProductId'
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
                    {/* <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg> */}
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
                     onChange={(e)=>setvalues({...value,price: e.target.value})}
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
                  This won't affect{' '}
                  Staff will see a warning, but can complete sales when
                  available inventory reaches zero and below.
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
      {/* Your existing form code here */}
      <div className="rounded-xl border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
        <div className="ml-5">
          <h1 className="font-bold">Variants</h1>
          <br />
          <div className="ml-5">
            <label htmlFor="">Option name</label>
            <div className="p-5">
              <select
                value={optionName}
                onChange={handleOptionNameChange}
                className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-1 mr-4
                px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                dark:focus:border-primary"
              >
                <option value="Size">Size</option>
                <option value="Color">Color</option>
                <option value="Material">Material</option>
                <option value="style">style</option>
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
                <th className="border font-bold border-stroke p-2">Key</th>
                <th className="border font-bold border-stroke p-2">Values</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((variant, index) => (
                <tr key={index}>
                  <td className="border font-bold border-stroke p-2">{variant.optionName}</td>
                  <td className="border font-bold border-stroke p-2">{variant.optionValues.join(', ')}</td>
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
                onChange={(e)=>setvalues({...value,status: e.target.value})}
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
                   onChange={(e)=>setvalues({...value,categoryName: e.target.value})}
                   value={value.categoryName}
                />

                <br />
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
                   onChange={(e)=>setvalues({...value,quantityInStock: e.target.value})}
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
                   onChange={(e)=>setvalues({...value,supplier_id: e.target.value})}
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
                   onChange={(e)=>setvalues({...value,sku: e.target.value})}
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
                   onChange={(e) => setvalues({ ...value, tag: [e.target.value] })}
                   value={value.tag.join(',')}
                />
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
        <div style={{border:"20px",padding:"10px"}} className='flex justify-end'>
               <button
              className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center
              font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"

              onClick={handleSubmit}
              >Submite</button>

             </div>
      </div>
    </>
  );
};
export default FormElements;
