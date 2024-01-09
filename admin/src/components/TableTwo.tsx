
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import UpdateProducts from './UpdateProducts';

const TableTwo: React.FC  = () => {
  const [products,setProducts]=useState<Product[]>([]);


  interface Product {
    id: number;
    productId:number;
    name: string;
    price: number;
    categoryName:string;
    discount:number;
    productImages?: { date: string; images: string[] }[];
  }


  useEffect(()=>{

  fetch(`http://localhost:5001/api/products/all`)
  .then(response=>{
    if(!response.ok){
    console.log("network error");
    
    }
    return response.json();
  })
  .then(data => {
    setProducts(data);
    // console.log("productxxxxxxxxxxxxxxxxxxxxxxxxxx",data);
    
  })
  .catch(error => {
    console.error('Error fetching all products:', error.message);
  });

  },[]);




  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top Products
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">discount</p>
        </div>
         <div className="col-span-1 flex items-center">
          <p className="font-medium">Edit</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">AddNew</p>
        </div>
      </div>
      {products.map((product,index)=>(
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5"
      key={index} id={`${product.productId}`}>
        <div className="col-span-3 flex items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* <div className="h-12.5 w-15 rounded-md">
              <img src={product?.productImages[0]?.images} alt="Product" />
            </div> */}
            <p className="text-sm text-black dark:text-white">
              {product.name}
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
        <Link to="/UpdateProducts" className="bg-blue hover:bg-blue-700 font-bold py-2 px-4 rounded-full">
         Edit
      </Link>
        </div>
        <div className="col-span-1 flex items-center">
        <Link to="/" className="bg-blue hover:bg-blue-700 font-bold py-2 px-4 rounded-full">
        Add New
      </Link>
        </div>
       
       {/* <div>
          <UpdateProducts product={product}/>
        </div> */}
      </div>
      
      ))}


     
          


    </div>
  );
};

export default TableTwo;
