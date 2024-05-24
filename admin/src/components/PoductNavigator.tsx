import { NavLink, Link } from 'react-router-dom';
// import { CiImport } from "react-icons/ci";
import MyModal from './Modal';
// import Breadcrumb from './Breadcrumb';

const ProductNavigate = () => {
  return (
    <>
    {/* <Breadcrumb pageName="New Product" /> */}
    <div></div>
      <h1 className="font-bold text-black-2 text-xl ">Products</h1>
      <br />
      <div className="rounded-xl border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5.5 p-3">
          <div>
            <NavLink
              to={'/'}
              className={
                'group relative flex items-center gap-2.5 border-r   text-black duration-300 ease-in-out'
              }
              //             className={({isActive})=>
              //             'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-black duration-300 ease-in-out hover:bg-bodydark1  ' +
              //             (isActive && 'bg-gray')
              // }
            >
              <p className=" hover:bg-bodydark1 rounded px-2">
                Product by sell-through rate <br />0 % -
              </p>
            </NavLink>
          </div>

          <div>
            <NavLink
              to={'/'}
              className={
                'group relative flex items-center gap-2.5 border-r   text-black duration-300 ease-in-out  '
              }
              //             className={({isActive})=>
              //             'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-black duration-300 ease-in-out hover:bg-bodydark1  ' +
              //             (isActive && 'bg-gray')
              // }
            >
              <p className=" hover:bg-bodydark1 rounded px-2">
                Products by days of inventory remaining There was no data found
                for this date range
              </p>
            </NavLink>
          </div>
          <div>
            <NavLink
              to={'/'}
              className={
                'group relative flex items-center gap-2.5 border-r text-black duration-300 ease-in-out  '
              }
              //             className={({isActive})=>
              //             'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-black duration-300 ease-in-out hover:bg-bodydark1  ' +
              //             (isActive && 'bg-gray')
              // }
            >
              <p className=" hover:bg-bodydark1 rounded px-2">
                ABC product analysis There was no data found for this date range
              </p>
            </NavLink>
          </div>
        </div>
      </div>

      <div className="rounded-xl border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-5 h-95">
        <div className="flex p-5">
          <div className='my-auto'>
            <h1
              className="my-auto w-10 rounded-xl text-center"
              style={{ backgroundColor: 'lightgray' }}
            >
              All
            </h1>
          </div>
          <div>
            <h1 className="text-xl ml-2">+</h1>
          </div>
        </div>
        <hr style={{ color: 'gray' }} />
    
        <div className=" my-20 mx-10">
          <h1 className="font-bold text-black-2 text-xl ">Add your products</h1>
          <p>
            Start by stocking your store with products your customers will love
          </p>

          <div className="my-5 flex">
            <Link
              to="/new/product"
              className="inline-flex items-center justify-center rounded-md text-xs sm:text-lg sm:lg bg-black-2 py-1.5 px-4 sm:px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              + Add product
            </Link>
            <div className="ml-5">
                <MyModal/>
          
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductNavigate;
