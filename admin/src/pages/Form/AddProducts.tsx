import Breadcrumb from '../../components/Breadcrumb';
import { useState } from 'react';
import axios from 'axios';


const FormElements = () => {
  const [productId, setProductId] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [value,setvalues]=useState({
    name:"",
    description:"",
    price:"",
    quantity:"",
    manufacturer:"",
    // dateAdded:"", 
    discount:"", 
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
    productId:""

  });
  

 
  const handleFormSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:5001/api/products/', value);
    console.log('Product created:', response.data);

  
  } catch (error) {
    console.error('Error creating product:', error);
  }

  
 
};

console.log("values before submission", value);




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
      <Breadcrumb pageName="Products" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Product Details
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
            
              <div>
               
                <input
                  type="text"
                  placeholder="name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
                   py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                   dark:bg-form-input dark:focus:border-primary"
                   onChange={(e)=>setvalues({...value,name: e.target.value})}
                   value={value.name}
                />
              </div>
              <div>
               
                <input
                  type="text"
                  placeholder="description"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
                   py-3 px-5 font-medium outline-none transition focus:border-primary
                    active:border-primary disabled:cursor-default disabled:bg-whiter 
                    dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e)=>setvalues({...value,description: e.target.value})}
                   value={value.description}
                />
              </div>
              <div>
               
                <input
                  type="text"
                  placeholder="price"
                  className="w-full rounded-lg border-[1.5px] border-stroke 
                  bg-transparent py-3 px-5 font-medium outline-none transition 
                  focus:border-primary active:border-primary disabled:cursor-default 
                  disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  onChange={(e)=>setvalues({...value,price: e.target.value})}
                   value={value.price}
                />
              </div>
              <div>
               
                <input
                  type="text"
                  placeholder="quantity"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent 
                  py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary
                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input 
                   dark:focus:border-primary"
                   onChange={(e)=>setvalues({...value,quantity: e.target.value})}
                   value={value.quantity}
                />
              </div>
              <div>
              
                <input
                  type="text"
                  placeholder="manufacturer"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
                   py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                    dark:focus:border-primary"
                    onChange={(e)=>setvalues({...value,manufacturer: e.target.value})}
                   value={value.manufacturer}
                />
              </div>
             
              <div>
               
                <input
                  type="text"
                  placeholder="discount"
                  className="w-full rounded-lg border-[1.5px] border-stroke
                   bg-transparent py-3 px-5 font-medium outline-none transition 
                   focus:border-primary active:border-primary disabled:cursor-default
                    disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e)=>setvalues({...value,discount: e.target.value})}
                   value={value.discount}
                />
              </div>
              <div>
                
                <input
                  type="text"
                  placeholder="new"
                  className="w-full rounded-lg border-[1.5px] border-stroke
                   bg-transparent py-3 px-5 font-medium outline-none transition 
                   focus:border-primary active:border-primary disabled:cursor-default
                    disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e)=>setvalues({...value,new: e.target.value})}
                   value={value.new}
                />
              </div>
              <div>
             
                <input
                  type="text"
                  placeholder="rating"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
                   py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary
                    disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                     dark:focus:border-primary"
                     onChange={(e)=>setvalues({...value,rating: e.target.value})}
                   value={value.rating}
                />
              </div>
              <div>
              
                <input
                  type="text"
                  placeholder="saleCount"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent 
                  py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary
                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                    dark:focus:border-primary"
                    onChange={(e)=>setvalues({...value,saleCount: e.target.value})}
                   value={value.saleCount}
                />
              </div>
              <div>
               
                <input
                  type="text"
                  placeholder="tag"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent 
                  py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary
                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                   onChange={(e) => setvalues({ ...value, tag: [e.target.value] })}
                   value={value.tag.join(',')}
                />
              </div>
              <div>
              
                <input
                  type="text"
                  placeholder="stock"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent 
                  py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary
                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                    dark:focus:border-primary"
                    onChange={(e)=>setvalues({...value,stock: e.target.value})}
                   value={value.stock}
                />
              </div>
              <div>
               
                <input
                  type="text"
                  placeholder="quantityInStock"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
                   py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                   disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                   onChange={(e)=>setvalues({...value,quantityInStock: e.target.value})}
                  value={value.quantityInStock}
                />
              </div>
              <div>
               
               <input
                 type="text"
                 placeholder="sku"
                 className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
                  py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                   dark:focus:border-primary"
                   onChange={(e)=>setvalues({...value,sku: e.target.value})}
                   value={value.sku}
               />
             </div>
             <div>
               
               <input
                 type="text"
                 placeholder="category_id"
                 className="w-full rounded-lg border-[1.5px] border-stroke
                  bg-transparent py-3 px-5 font-medium outline-none transition
                   focus:border-primary active:border-primary disabled:cursor-default 
                   disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                   onChange={(e)=>setvalues({...value,category_id: e.target.value})}
                   value={value.category_id}
               />
             </div>
             <div>
               
               <input
                 type="text"
                 placeholder="supplier_id"
                 className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
                  py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                   dark:focus:border-primary"
                   onChange={(e)=>setvalues({...value,supplier_id: e.target.value})}
                   value={value.supplier_id}
               />
             </div>
             <div>
               
               <input
                 type="text"
                 placeholder=" categoryName"
                 className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
                  py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                   dark:focus:border-primary"
                   onChange={(e)=>setvalues({...value, categoryName: e.target.value})}
                   value={value. categoryName}
               />
             </div>
             <div style={{border:"20px",padding:"10px"}}>
              <button style={{border:"20px",padding:"10px", background:"#ADD8E6"}}
              // onClick={handleFormSubmit}
              onClick={handleSubmit}
              >Submite</button>

             </div>

             
             
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- File Upload --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                File upload
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Attach file
                </label>
                <input
                  type="file"
                  onChange={handleImageFileChange}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke
                   bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse 
                   file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke
                    file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 
                    focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter
                     dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark 
                     dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder='ProductId'
                  value={productId}
                  onChange={handleProductIdChange}
                  className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                />
              </div>
            </div>
          </div>
  

    
        </div>
      </div>
    </>
  );
};

export default FormElements;
