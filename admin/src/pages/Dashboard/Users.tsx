import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Breadcrumb from '../../components/Breadcrumb';
import ProductWrapper from '../../components/ProductWrapper'


interface User {
  id: number;
  firstname: string;
  lastname: string;
  contactNumber: number;
  email: string;
  businessName: string;
}

const User: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          `${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}/api/user/getAll`
        );
        setUsers(response.data);
        console.log('All users', response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getAllUsers();
  }, []);

  return (
    <>
      {/* <Breadcrumb pageName="Users" /> */}
      <div className=" border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark rounded-xl">
      <ProductWrapper 
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      Value="Users">
        <div className="grid text-xs sm:text-sm grid-cols-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium text-black">First Name</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium text-black">Last Name</p>
          </div>
          <div className="col-span-1 hidden sm:flex items-center justify-center">
            <p className="font-medium text-black">Email</p>
          </div>
          <div className="col-span-1 flex items-center  justify-center">
            <p className="font-medium text-black text-center">Contact Number</p>
          </div>
          <div className="col-span-1 flex items-center  justify-center">
            <p className="font-medium text-black text-center">Business Name</p>
          </div>
        </div>

        {users.map((index) => (
          <div
            key={index.id}
            className="grid grid-cols-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5"
            id={`${index.id}`}
          >
            <div className="col-span-1 flex items-center justify-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-xs sm:text-sm flex flex-col text-black dark:text-white text-center">
                  {index.firstname}
                </p>
              </div>
            </div>
            <div className="col-span-1 flex items-center sm:flex justify-center">
              <p className="text-xs sm:text-sm flex flex-col text-black dark:text-white text-center">
                {index.lastname}
              </p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex justify-center">
              <p className="text-xs sm:text-sm flex flex-col text-black dark:text-white text-center">
                {index.email}
              </p>
            </div>
            <div className="col-span-1 flex items-center sm:flex justify-center">
              <p className="text-xs sm:text-sm flex flex-col text-black dark:text-white text-center">
                {index.contactNumber}
              </p>
            </div>
            <div className="col-span-1 flex items-center sm:flex justify-center">
              <p className="text-xs sm:text-sm flex flex-col text-black dark:text-white text-center">
                {index.businessName}
              </p>
            </div>
          </div>
        ))}
      </ProductWrapper>
      </div>
    </>
  );
};

export default User;
