import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          `${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}/api/user/getAll`,
        );
        setUsers(response.data);
        console.log('All user', response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getAllUsers();
  }, []);

  return (
    <>
      <div className=" border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark rounded-xl">
          <p className='text-center font-semibold text-2xl py-5 uppercase'>Users</p>
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center">
            <p className="font-medium text-black">FirstName</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium text-black">lastName</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium text-black">Email</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium text-black">ContactNumber</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium text-black">businessName</p>
          </div>
        </div>

        {users.map((index) => (
          <div
            key={index.id}
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5"
            id={`${index.id}`}
          >
            <div className="col-span-2 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-sm text-black dark:text-white">
                  {index.firstname}
                </p>
              </div>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {index.lastname}
              </p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {index.email}
              </p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {index.contactNumber}
              </p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {index.businessName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default User;
