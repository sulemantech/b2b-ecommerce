import React, { useState } from 'react';
import ProductWrapper from '../../components/ProductWrapper';
import { BiImageAdd } from 'react-icons/bi';
import '../../components/styl.css';

const Inventory = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <ProductWrapper
          Value="Inventory"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        >
          <table className="w-full border-collapse table-auto text-black">
            <thead className="bg-[#f7f7f7] text-xs sm:text-sm border-t border-stroke dark:border-strokedark">
              <tr>
                <th className="px-2 py-2 w-[1%]">
                  <input type="checkbox" className="ml-4" />
                </th>
                <th className="px-2 py-2 w-[1%]"></th>
                <th className="px-2 py-2 text-start w-[25%]">Product</th>
                <th className="px-2 py-2 w-[10%] text-start">SKU</th>
                <th className="px-4 py-2 w-[10%] text-right">
                  <p className="">Unavailable</p>
                </th>
                <th className="px-4 py-2 w-[10%] text-right">Committed</th>
                <th className="px-2 py-2 w-[15%] lg:w-[10.5%] text-start">Available</th>
                <th className="px-2 py-2 w-[15%] lg:w-[10.5%] text-start">On Hand</th>
                <th className="px-2 py-2 w-[2%]"></th>

              </tr>
            </thead>
            <tbody>
              
              <tr className="text-center border-t border-stroke">
                <td className="px-2 py-2">
                  <input type="checkbox" className="ml-4" />
                </td>
                <td className="px-2 py-2">
                  <div className="h-10 w-10">
                    <span
                      className="relative w-10 h-10 bg-white flex items-center justify-center border border-dashed rounded-md z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <BiImageAdd className="w-5 h-5 mt-0.5 ml-[2px]" />
                      <input
                        className="absolute w-10 h-10 opacity-0"
                        type="file"
                        src=""
                        alt=""
                      />
                    </span>
                  </div>
                </td>
                <td className="px-2 py-2 text-start">
                  <div>
                    <p className="font-semibold text-sm">Product 1</p>
                    <div className="inline-flex rounded-full bg-[#ebebeb] px-2">
                      <p className="text-xs font-medium py-0.5">Red <span> / 1660ti</span></p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2 text-start">SKU 1</td>
                <td className="px-4 py-2 text-right">10</td>
                <td className="px-4 py-2 text-right">5</td>
                <td className="px-2 py-2">
                <input
                                    placeholder="10,000"
                                    className="w-full rounded-lg py-0.5 pl-2 placeholder:text-black border border-[#8a8a8a] placeholder-xs"
                                    type="text"
                                    onClick={(e) => e.stopPropagation()}
                                    
                                  />
                </td>
                <td className="px-2 py-2">
                <input
                                    placeholder="10,000"
                                    className="w-full rounded-lg py-0.5 pl-2 placeholder:text-black border border-[#8a8a8a] placeholder-xs"
                                    type="text"
                                    onClick={(e) => e.stopPropagation()}
                                    
                                  />
                </td>
              </tr>
              <tr className="text-center border-t border-stroke">
                <td className="px-2 py-2">
                  <input type="checkbox" className="ml-4" />
                </td>
                <td className="px-2 py-2">
                  <div className="h-10 w-10">
                    <span
                      className="relative w-10 h-10 bg-white flex items-center justify-center border border-dashed rounded-md z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <BiImageAdd className="w-5 h-5 mt-0.5 ml-[2px]" />
                      <input
                        className="absolute w-10 h-10 opacity-0"
                        type="file"
                        src=""
                        alt=""
                      />
                    </span>
                  </div>
                </td>
                <td className="px-2 py-2 text-start">
                  <div>
                    <p className="font-semibold text-sm">Product 1</p>
                    <div className="inline-flex rounded-full bg-[#ebebeb] px-2">
                      <p className="text-xs font-medium py-0.5">Red <span> / 1660ti</span></p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2 text-start">SKU 1</td>
                <td className="px-4 py-2 text-right">10</td>
                <td className="px-4 py-2 text-right">5</td>
                <td className="px-2 py-2">
                <input
                                    placeholder="10,000"
                                    className="w-full rounded-lg py-0.5 pl-2 placeholder:text-black border border-[#8a8a8a] placeholder-xs"
                                    type="text"
                                    onClick={(e) => e.stopPropagation()}
                                    
                                  />
                </td>
                <td className="px-2 py-2">
                <input
                                    placeholder="10,000"
                                    className="w-full rounded-lg py-0.5 pl-2 placeholder:text-black border border-[#8a8a8a] placeholder-xs"
                                    type="text"
                                    onClick={(e) => e.stopPropagation()}
                                    
                                  />
                </td>
              </tr>
              <tr className="text-center border-t border-stroke">
                <td className="px-2 py-2">
                  <input type="checkbox" className="ml-4" />
                </td>
                <td className="px-2 py-2">
                  <div className="h-10 w-10">
                    <span
                      className="relative w-10 h-10 bg-white flex items-center justify-center border border-dashed rounded-md z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <BiImageAdd className="w-5 h-5 mt-0.5 ml-[2px]" />
                      <input
                        className="absolute w-10 h-10 opacity-0"
                        type="file"
                        src=""
                        alt=""
                      />
                    </span>
                  </div>
                </td>
                <td className="px-2 py-2 text-start">
                  <div>
                    <p className="font-semibold text-sm">Product 1</p>
                    <div className="inline-flex rounded-full bg-[#ebebeb] px-2">
                      <p className="text-xs font-medium py-0.5">Red <span> / 1660ti</span></p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2 text-start">SKU 1</td>
                <td className="px-4 py-2 text-right">10</td>
                <td className="px-4 py-2 text-right">5</td>
                <td className="px-2 py-2">
                <input
                                    placeholder="10,000"
                                    className="w-full rounded-lg py-0.5 pl-2 placeholder:text-black border border-[#8a8a8a] placeholder-xs"
                                    type="text"
                                    onClick={(e) => e.stopPropagation()}
                                    
                                  />
                </td>
                <td className="px-2 py-2">
                <input
                                    placeholder="10,000"
                                    className="w-full rounded-lg py-0.5 pl-2 placeholder:text-black border border-[#8a8a8a] placeholder-xs"
                                    type="text"
                                    onClick={(e) => e.stopPropagation()}
                                    
                                  />
                </td>
              </tr>
              <tr className="text-center border-t border-stroke">
                <td className="px-2 py-2">
                  <input type="checkbox" className="ml-4" />
                </td>
                <td className="px-2 py-2">
                  <div className="h-10 w-10">
                    <span
                      className="relative w-10 h-10 bg-white flex items-center justify-center border border-dashed rounded-md z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <BiImageAdd className="w-5 h-5 mt-0.5 ml-[2px]" />
                      <input
                        className="absolute w-10 h-10 opacity-0"
                        type="file"
                        src=""
                        alt=""
                      />
                    </span>
                  </div>
                </td>
                <td className="px-2 py-2 text-start">
                  <div>
                    <p className="font-semibold text-sm">Product 1</p>
                    <div className="inline-flex rounded-full bg-[#ebebeb] px-2">
                      <p className="text-xs font-medium py-0.5">Red <span> / 1660ti</span></p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2 text-start">SKU 1</td>
                <td className="px-4 py-2 text-right">10</td>
                <td className="px-4 py-2 text-right">5</td>
                <td className="px-2 py-2">
                <input
                                    placeholder="10,000"
                                    className="w-full rounded-lg py-0.5 pl-2 placeholder:text-black border border-[#8a8a8a] placeholder-xs"
                                    type="text"
                                    onClick={(e) => e.stopPropagation()}
                                    
                                  />
                </td>
                <td className="px-2 py-2">
                <input
                                    placeholder="10,000"
                                    className="w-full rounded-lg py-0.5 pl-2 placeholder:text-black border border-[#8a8a8a] placeholder-xs"
                                    type="text"
                                    onClick={(e) => e.stopPropagation()}
                                    
                                  />
                </td>
              </tr>
              <tr className="text-center border-t border-stroke">
                <td className="px-2 py-2">
                  <input type="checkbox" className="ml-4" />
                </td>
                <td className="px-2 py-2">
                  <div className="h-10 w-10">
                    <span
                      className="relative w-10 h-10 bg-white flex items-center justify-center border border-dashed rounded-md z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <BiImageAdd className="w-5 h-5 mt-0.5 ml-[2px]" />
                      <input
                        className="absolute w-10 h-10 opacity-0"
                        type="file"
                        src=""
                        alt=""
                      />
                    </span>
                  </div>
                </td>
                <td className="px-2 py-2 text-start">
                  <div>
                    <p className="font-semibold text-sm">Product 1</p>
                    <div className="inline-flex rounded-full bg-[#ebebeb] px-2">
                      <p className="text-xs font-medium py-0.5">Red <span> / 1660ti</span></p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2 text-start">SKU 1</td>
                <td className="px-4 py-2 text-right">10</td>
                <td className="px-4 py-2 text-right">5</td>
                <td className="px-2 py-2">
                <input
                                    placeholder="10,000"
                                    className="w-full rounded-lg py-0.5 pl-2 placeholder:text-black border border-[#8a8a8a] placeholder-xs"
                                    type="text"
                                    onClick={(e) => e.stopPropagation()}
                                    
                                  />
                </td>
                <td className="px-2 py-2">
                <input
                                    placeholder="10,000"
                                    className="w-full rounded-lg py-0.5 pl-2 placeholder:text-black border border-[#8a8a8a] placeholder-xs"
                                    type="text"
                                    onClick={(e) => e.stopPropagation()}
                                    
                                  />
                </td>
              </tr>
              <tr className="text-center border-t border-stroke">
                <td className="px-2 py-2">
                  <input type="checkbox" className="ml-4" />
                </td>
                <td className="px-2 py-2">
                  <div className="h-10 w-10">
                    <span
                      className="relative w-10 h-10 bg-white flex items-center justify-center border border-dashed rounded-md z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <BiImageAdd className="w-5 h-5 mt-0.5 ml-[2px]" />
                      <input
                        className="absolute w-10 h-10 opacity-0"
                        type="file"
                        src=""
                        alt=""
                      />
                    </span>
                  </div>
                </td>
                <td className="px-2 py-2 text-start">
                  <div>
                    <p className="font-semibold text-sm">Product 1</p>
                    <div className="inline-flex rounded-full bg-[#ebebeb] px-2">
                      <p className="text-xs font-medium py-0.5">Red <span> / 1660ti</span></p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2 text-start">SKU 1</td>
                <td className="px-4 py-2 text-right">10</td>
                <td className="px-4 py-2 text-right">5</td>
                <td className="px-2 py-2">
                <input
                                    placeholder="10,000"
                                    className="w-full rounded-lg py-0.5 pl-2 placeholder:text-black border border-[#8a8a8a] placeholder-xs"
                                    type="text"
                                    onClick={(e) => e.stopPropagation()}
                                    
                                  />
                </td>
                <td className="px-2 py-2">
                <input
                                    placeholder="10,000"
                                    className="w-full rounded-lg py-0.5 pl-2 placeholder:text-black border border-[#8a8a8a] placeholder-xs"
                                    type="text"
                                    onClick={(e) => e.stopPropagation()}
                                    
                                  />
                </td>
              </tr>
              <tr className="text-center border-t border-stroke">
                <td className="px-2 py-2">
                  <input type="checkbox" className="ml-4" />
                </td>
                <td className="px-2 py-2">
                  <div className="h-10 w-10">
                    <span
                      className="relative w-10 h-10 bg-white flex items-center justify-center border border-dashed rounded-md z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <BiImageAdd className="w-5 h-5 mt-0.5 ml-[2px]" />
                      <input
                        className="absolute w-10 h-10 opacity-0"
                        type="file"
                        src=""
                        alt=""
                      />
                    </span>
                  </div>
                </td>
                <td className="px-2 py-2 text-start">
                  <div>
                    <p className="font-semibold text-sm">Product 1</p>
                    <div className="inline-flex rounded-full bg-[#ebebeb] px-2">
                      <p className="text-xs font-medium py-0.5">Red <span> / 1660ti</span></p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2 text-start">SKU 1</td>
                <td className="px-4 py-2 text-right">10</td>
                <td className="px-4 py-2 text-right">5</td>
                <td className="px-2 py-2">
                <input
                                    placeholder="10,000"
                                    className="w-full rounded-lg py-0.5 pl-2 placeholder:text-black border border-[#8a8a8a] placeholder-xs"
                                    type="text"
                                    onClick={(e) => e.stopPropagation()}
                                    
                                  />
                </td>
                <td className="px-2 py-2">
                <input
                                    placeholder="10,000"
                                    className="w-full rounded-lg py-0.5 pl-2 placeholder:text-black border border-[#8a8a8a] placeholder-xs"
                                    type="text"
                                    onClick={(e) => e.stopPropagation()}
                                    
                                  />
                </td>
              </tr>
             

              {/* Add more rows as needed */}
            </tbody>
          </table>
        </ProductWrapper>
      </div>
    </div>
  );
};

export default Inventory;
