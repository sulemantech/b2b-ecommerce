import React, { useState, useRef, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import "./styl.css";



interface SearchproductProps {
  Header: string;
  searchValue:string;
  setSearchValue:any;
  
}

const Searchproduct: React.FC<SearchproductProps> = ({ Header , searchValue , setSearchValue  }) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  // const [searchTerm, setSearchTerm] = useState<string>('');
  // const [results, setResults] = useState<any[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   if (searchValue.trim() === '') return;

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}/api/product/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         query: `query { search(query: "${searchValue}") { 
  //                   id
  //                   name
  //                   description
  //                   price
  //                   sku
  //                   productImages {
  //                     date
  //                     images
  //                   }
  //                 }}`,
  //       }),
  //     });

  //     const data = await response.json();
  //     if (data && data.search) {
  //       setResults(data.search);
  //     } else {
  //       setResults([]);
  //     }
  //     console.log('Search results:', data);
  //   } catch (error) {
  //     console.error('Error during search:', error);
  //     setError('An error occurred during the search. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <div className="flex gap-0.5 mx-3 pl-1 mt-1 border-none">
        <div className="p-2 grow my-auto overflow-hidden">
          <div className={`flex my-auto pl-5 ${showSearch ? "hidden" : "block"}`}>
            <h2 className="text-black-2 font-semibold text-xl">{Header}</h2>
          </div>
          <div className={`flex transition-height font-semibold ${showSearch ? "block" : "hidden"}`}>
            <IoSearch className="absolute fill-[#8a8a8a] mt-2 ml-3.5 h-4 w-4"/>
            <form   className="grow">
              <input
                id="inputField"
                type="text"
                placeholder="Search product..."
                value={searchValue}
                onChange={handleSearch}
                className="inputField grow w-full h-8 pl-9 my-auto p-2 pb-2 text-xs sm:text-base overflow-auto hover:bg-[#ebebeb75] bg-[#ebebeb45] focus:outline-[#3977f2] placeholder-[#616161] text-black rounded-md"
              />
            </form>
          </div>
        </div>

        <div className="flex gap-2 p-2 shrink-0">
          <div className={`flex gap-2 text-black-2 text-[10px] sm:text-sm ${showSearch ? "block" : "hidden"}`}>
            <button className="flex-none my-1 px-2 transition-all duration-300 font-semibold hover:bg-[#3977f2] bg-[#3977f275] text-white borde rounded-md shadow-sm shadow-gray-300" disabled={showDropdown}>
              Search
            </button>
            <button onClick={() => setShowSearch(false)} className="my-1 px-2 active:bg-[#ebebeb] hover:bg-[#f1f1f1] borde rounded-md hover:shadow-sm shadow-gray-300 font-semibold">
              Cancel
            </button>
          </div>
          <div className={`flex ${showSearch ? "hidden" : "block"}`}>
            <button onClick={toggleSearch} className="active:shadow-inner hover:bg-[rgba(241,241,241,0.45)] border-b-gray-400 rounded-md shadow-sm shadow-black">
              <label htmlFor="inputField" className="flex m-1 cursor-pointer">
                <IoSearch className="fill-black-2 h-4 w-4" />
                <IoFilterOutline className="text-black-2 h-4 w-4" />
              </label>
            </button>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="flex p-1 active:shadow-inner hover:bg-[rgba(241,241,241,0.45)] border-b-gray-400 rounded-md shadow-sm shadow-black">
              <BiSortAlt2 className="fill-black-2 h-5 w-5" />
            </button>
            {/* Dropdown menu */}
            {showDropdown && (
              <div className="absolute z-10 p-2.5 -right-4 mt-3.5 w-40 text-black text-xs font-semibold border border-[#ebebeb] bg-white rounded-xl shadow-xl shadow-[#ebebeb]">
                {/* Dropdown content */}
                Sort by
                <ul className="text-sm font-semibold">
                  <li className="px-2 py-1 hover:bg-[#ebebeb] cursor-pointer rounded-md">Collection Title</li>
                  <li className="px-2 py-1 hover:bg-[#ebebeb] cursor-pointer rounded-md mb-1">Updated</li>
                  <hr className="text-[#ebebeb]" />
                  <li>
                    <button className="flex items-center justify-start pl-1 mt-2 mx-auto w-32 active:bg-[rgba(241,241,241,0.45)] active:shadow-inner hover:bg-[#f1f1f1] hover:border border-[#ebebeb] rounded-md text-xs font-semibold">
                      <IoIosArrowRoundUp className="h-5 w-5" />Oldest first
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center justify-start pl-1 mt-2 mx-auto w-32 active:bg-[rgba(241,241,241,0.45)] active:shadow-inner hover:bg-[#f1f1f1] hover:border border-[#ebebeb] rounded-md text-xs font-semibold">
                      <IoIosArrowRoundDown className="h-5 w-5" />Newest first
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Display search results */}
    
    </>
  );
}

export default Searchproduct;






{/* <div className="p-4">
{loading && <p>Loading...</p>}
{error && <p className="text-red-500">{error}</p>}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {Array.isArray(results) && results.map(result => (
    <div key={result.id} className="p-4 border rounded-md">
      <h3 className="text-lg font-semibold">{result.name}</h3>
      <p>{result.description}</p>
      <p>Price: ${result.price}</p>
      {/* Render other product details as needed */}
    // </div>
  // ))}
// </div>
// </div> 