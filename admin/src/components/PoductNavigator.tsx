import { NavLink, Link } from 'react-router-dom';
import MyModal from './Modal';
import { useState } from 'react';
// import Breadcrumb from './Breadcrumb';

const ProductNavigate = () => {
  const [hover, setHover] = useState(false);

  return (
    <>
      {/* <Breadcrumb pageName="New Product" /> */}
      <div></div>
      <h1 className="font-bold text-black-2 text-xl ">Products</h1>
      <br />
      <div className="rounded-xl border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3">
          <div className='border-r'>
            <NavLink
              to={'/'}
              className={
                'h-full group relative flex items-center gap-2.5 text-black duration-300 ease-in-out'
              }
            >
              <p className="w-full sm:h-full hover:bg-bodydark1 rounded px-2 mr-2">
                Product by sell-through rate <br />0 % -
              </p>
            </NavLink>
          </div>

          <div className='border-r'>
            <NavLink
              to={'/'}
              className={
                'group relative flex items-center gap-2.5 text-black duration-300 ease-in-out  '
              }
            >
              <p className="w-full h- hover:bg-bodydark1 rounded px-2 mr-2">
                Products by days of inventory remaining There was no data found
                for this date range
              </p>
            </NavLink>
          </div>
          <div className='border-r'>
            <NavLink
              to={'/'}
              className={'h-full group relative flex items-center gap-2.5 text-black duration-300 ease-in-out  '}
            >
              <p className="h-[48px] sm:h-full hover:bg-bodydark1 rounded px-2 mr-2">
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
              className="my-auto w-10 rounded-xl text-center cursor-pointer"
              style={{ backgroundColor: 'lightgray' }}
            >
              All
            </h1>
          </div>
          <div>
            <h1 className="text-xl ml-2 cursor-pointer">+</h1>
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
              style={{
                boxShadow: hover
                  ? 'none'
                  : '1.5px 1.5px 4px 0.1px rgb(27, 27, 27, 10)'
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="inline-flex items-center justify-center rounded-md text-xs sm:text-lg sm:lg bg-black-2 py-1.5 px-4 text-center font-medium text-white transition duration-300 ease-in-out "
            >
              +&nbsp;&nbsp;Add product
            </Link>
            <div className="ml-5">
              <MyModal />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductNavigate;
