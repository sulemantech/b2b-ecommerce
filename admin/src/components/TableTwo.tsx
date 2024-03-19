
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';



const TableTwo: React.FC  = () => {
  const Token=Cookies.get('token');
  // console.log(import.meta.env)
  const [products,setProducts]=useState<Products[]>([]);
  interface Products {
    id: number;
    productId: number;
    name: string;
    price: number;
    categoryName: string;
    discount: number;
    manufacturer:string;
    productImages: Array<{ date: string; images: string[] }>;
    // productImages?: { date: string; images: string[] }[] | undefined;
  }

  
const fetchAllProducts = () => {
  const API_Urlfetch = `${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}/api/products/clients/all`;

  

  fetch(API_Urlfetch ,{
  headers: {
    Authorization: `Bearer ${Token}`,
  },
})
    .then(response => {
      if (!response.ok) {
        console.log("Network error");
      }
      return response.json();
    })
    .then(data => {
      setProducts(data);
    })
    .catch(error => {
      console.error('Error fetching all products:', error.message);
    });
};



useEffect(() => {
  fetchAllProducts();
}, []);




  return (
    <>
    <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {Token ? (
      <>
         <p className='text-center font-semibold text-2xl py-5 uppercase'>products</p>
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium text-black">Product Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium text-black">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-black">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-black">Discount</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-black">Manufacturer</p>
        </div>
         <div className="col-span-1 flex items-center">
          <p className="font-medium text-black">Action</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-black">New</p>
        </div>
      </div>
      
      {products.map((product) => (
        <div  key={product.id}
        className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5"  id={`${product.id}`}>
    <div className="col-span-2 flex items-center">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-12.5 w-15 rounded-md">
        {/* <img src={process.env.RESOURCE_SERVER_HOST + product.productImages[0]?.images[0]} alt="" /> */}
        <img src={`${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}${product?.productImages[0]?.images[0]}`} />

           {/* console.log("pppppppppppppppppp",)   */}
        </div>
        <p className="text-sm text-black dark:text-white">
          {product.name}
          {/* {product.id} */}
        </p>
      </div>
    </div>
    <div className="col-span-2 hidden items-center sm:flex">
      <p className="text-sm text-black dark:text-white">{product.categoryName}</p>
    </div>
    <div className="col-span-1 flex items-center">
      <p className="text-sm text-black dark:text-white">{product.price}</p>
    </div>
    <div className="col-span-1 flex items-center">
      <p className="text-sm text-black dark:text-white">{product.discount}</p>
    </div>
    <div className="col-span-1 flex items-center">
      <p className="text-sm text-black dark:text-white">{product.manufacturer}</p>
    </div>
    <div className="col-span-1 flex items-center">
      <div>
        <Link to={`/UpdateProducts/${product.id}`} className="bg-blue hover:bg-blue-700 font-bold py-2 px-4 rounded-full">
        Edit
      </Link>

      </div>
    </div>
    <div className="col-span-1 flex items-center">
      <Link to={`/product`} className="bg-blue hover:bg-blue-700 font-bold py-2 px-4 rounded-full">
        AddNew
      </Link>
    </div>
  </div>
))}
</>
      ):(
        <h1 className='text-center my-54 font-semibold'>
          No products Found
        </h1>
      )}
</div>
{/* {console.log("process.env.RESOURCE_SERVER_HOST ", )} */}

  </>
  );
};

export default TableTwo;
