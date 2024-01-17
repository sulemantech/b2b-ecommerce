import { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';
import { useParams,useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



interface UpdateProductProps {
 
  
  
}

const UpdateProduct: React.FC<UpdateProductProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [discount, setDiscount] = useState('');
  const [newFlag, setNewFlag] = useState('');
  const [rating, setRating] = useState('');
  const [saleCount, setSaleCount] = useState('');
  const [tag, setTag] = useState('');
  const [stock, setStock] = useState('');
  const [quantityInStock, setQuantityInStock] = useState('');
  const [sku, setSku] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [supplier_id, setSupplierId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [status, setStatus] = useState('');
  const [productImages, setProductImages] = useState<[]>([]);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/products/specific/${id}`);
        const product = response.data;

        setName(product.name || '');
        setDescription(product.description || '');
        setPrice(product.price || '');
        setQuantity(product.quantity || '');
        setManufacturer(product.manufacturer || '');
        setDiscount(product.discount || '');
        setNewFlag(product.new || '');
        setRating(product.rating || '');
        setSaleCount(product.saleCount || '');
        setTag(product.tag ? product.tag.join(',') : '');
        setStock(product.stock || '');
        setQuantityInStock(product.quantityInStock || '');
        setSku(product.sku || '');
        setCategoryId(product.category_id || '');
        setSupplierId(product.supplier_id || '');
        setCategoryName(product.categoryName || '');
        setStatus(product.status || '');
        setProductImages(product.productImages[0]?.images || []);

      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);


  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5001/api/products/${id}`, {
        name,
        description,
        price,
        quantity,
        manufacturer,
        discount,
        new: newFlag,
        rating,
        saleCount,
        tag: tag.split(',').map((t) => t.trim()),
        stock,
        quantityInStock,
        sku,
        category_id,
        supplier_id,
        status,
        categoryName,
      });


      console.log('Product updated:', response.data);
      // window.location.reload()
       navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  



// ****DEleteImage***********
const handleDeleteImage = async () => {
  try {
    const response = await fetch(`http://localhost:5001/productImages/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Image deleted successfully:', result);

  } catch (error) {
    console.error('Error deleting image:', error);
    // Handle error cases
  }
};

  
    




   
return (
  <>
    <Breadcrumb pageName="update" />

    <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
      <div className="flex flex-col gap-9">
        {/* <!-- Input Fields --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Product Details
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5.5 p-6.5">
            <div>
             
              <input
                type="text"
                placeholder="name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
                 py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
                 dark:bg-form-input dark:focus:border-primary"
                 value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                
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
           
                 value={price}
                 onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5.5 p-6.5">
            <div>
             
              <input
                type="text"
                placeholder="quantity"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent 
                py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary
                 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input 
                 dark:focus:border-primary"
              
                 value={quantity}
                 onChange={(e) => setPrice(e.target.value)}
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
                  value={manufacturer}
                 onChange={(e) => setManufacturer(e.target.value)}
                
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
                
                 value={discount}
              
                 onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5.5 p-6.5">
            <div>
              
              <input
                type="text"
                placeholder="new"
                className="w-full rounded-lg border-[1.5px] border-stroke
                 bg-transparent py-3 px-5 font-medium outline-none transition 
                 focus:border-primary active:border-primary disabled:cursor-default
                  disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                 value={newFlag}
                 onChange={(e) => setNewFlag(e.target.value)}
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
                 value={rating}
                 onChange={(e) => setRating(e.target.value)}
                 
                 
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
                  
                 value={saleCount}
                 onChange={(e) => setSaleCount(e.target.value)}

              />
            </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5.5 p-6.5">
            <div>
             
              <input
                type="text"
                placeholder="tag"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent 
                py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary
                 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              
                 value={tag.split(',').map((t) => t.trim())}
                 onChange={(e) => setTag(e.target.value)}
                 
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
                  
                 value={stock}
                 onChange={(e) => setStock(e.target.value)}

                 
              />
            </div>
            <div>
             
              <input
                type="text"
                placeholder="quantityInStock"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
                 py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              
                value={quantityInStock}
                onChange={(e) => setQuantityInStock(e.target.value)}

              />
            </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5.5 p-6.5">
            <div>
             
             <input
               type="text"
               placeholder="sku"
               className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
                py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                 dark:focus:border-primary"
                
                 value={sku}
                 onChange={(e) => setSku(e.target.value)}

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
                 
                 value={category_id}
                 onChange={(e) => setCategoryId(e.target.value)}

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
            
                 value={supplier_id }
                 onChange={(e) => setSupplierId(e.target.value)}
                 
             />
           </div>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-5.5 p-6.5">
           <div>
             
             <input
               type="text"
               placeholder=" categoryName"
               className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
                py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                 dark:focus:border-primary"
                 value={categoryName}
                 onChange={(e) => setCategoryName(e.target.value)}
                 
             />
           </div>
           <div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
            py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary 
            disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
            dark:focus:border-primary"
        >
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div>
      <input
               type="text"
               placeholder=" Text Area"
               className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
                py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                 dark:focus:border-primary"
                //  value={categoryName}
                //  onChange={(e) => setCategoryName(e.target.value)}
                 
             />

      </div>
      </div>
           <div>
            <button
            className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 
            text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            
            onClick={handleUpdate}
            >Submite</button>

           </div>
          
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Image
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Remove
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                AddNew
              </th>
            </tr>
          </thead>
          <tbody>
         <tr>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              {/* {productImages.map((imageUrl, index) => (
                  <img key={index} src={imageUrl} alt={`Product Image ${index + 1}`} />
                ))} */}
                 <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-12.5 w-15 rounded-md">
        {productImages.map((imageUrl, index) => (
                  <img key={index} src={imageUrl} alt={`Product Image ${index + 1}`} />
                ))}
        
        </div>
      
      </div>
              </td>
              <td>
              <p className="text-sm text-black dark:text-white">
          {name}
        </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <button className="hover:text-primary"
              onClick={handleDeleteImage}
                >
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                        fill=""
                      />
                      <path
                        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                        fill=""
                      />
                      <path
                        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                        fill=""
                      />
                      <path
                        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                        fill=""
                      />
                    </svg>
                  </button>
              </td>
              <td>
              <Link to={`/forms/form-elements/`} className="bg-blue hover:bg-blue-700 font-bold py-2 px-4 rounded-full">
        AddNew
      </Link>
                  </td>
             
            </tr>
          </tbody>
        </table>

      </div>
    </div>
      </div>
  </>
);
};

export default UpdateProduct;
