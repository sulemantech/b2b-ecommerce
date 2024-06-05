import  { useState } from 'react';
import { TfiImport } from "react-icons/tfi";
import SheetJSApp from './ExcelFile';

const MyModal = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className=" items-center justify-center flex
         rounded-md border py-1.5 gap-2 text-xs sm:text-lg sm:lg px-4 text-center font-medium text-black hover:bg-opacity-90 "
   
      >
        <TfiImport/>
        &nbsp;Import
      </button>

      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={closeModal}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div className="inline-block border border-[#c4c4c4] align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-2 pt-4  rounded-t-lg">
                <div className="flex">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-8 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-8">
                    {/* Heroicon name: outline/check */}
                    <svg
                      className="h-4 w-4 sm:w-6 sm:h-6 text-green-600"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex w-full text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                  
                    </h3>
                    <div className="w-full text-sm">
                   <SheetJSApp/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 pb-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-black shadow-sm hover:bg-[#ebebeb] focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Close
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyModal;