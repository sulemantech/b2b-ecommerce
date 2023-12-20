import React, { useState } from 'react';

const ShopSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/product/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `query { search(query: "${searchTerm}") { id name description price, sku, images } }`,
        }),
      });

      const data = await response.json();
      // Update your component state or Redux store with the search results.
      console.log(data);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" onSubmit={(e) => handleSubmit(e)}>
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
    </div>
  );
};

export default ShopSearch;


