

// const ShopSearch = () => {
//   return (
//     <div className="sidebar-widget">
//       <h4 className="pro-sidebar-title">Search </h4>
//       <div className="pro-sidebar-search mb-50 mt-25">
//         <form className="pro-sidebar-search-form" action="#">
//           <input type="text" placeholder="Search here..." />
//           <button>
//             <i className="pe-7s-search" />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ShopSearch;

import React, { useState } from 'react';

const ShopSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const hasSearched = useSelector((state) => state.search.hasSearched);
  const searchResults = useSelector((state) => state.search.searchResults);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      // Implement your API call for product search based on name.
      const response = await fetch(`http://localhost:5001/api/products/?search=${searchTerm}`);
      const data = await response.json();
      // Update your component state or Redux store with the search results.
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button type="submit">
            <i className="pe-7s-search" />
          </button>
          
        </form>
      </div>
      {hasSearched && <ShopGridStandard searchResults={searchResults} />}
    </div>
  );
};

export default ShopSearch;

