import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../../store/slices/ShopSearch-Action'; 
import ShopGridStandard from '../../pages/shop/ShopGridStandard';
import { clearSearchState } from '../../store/slices/ShopSearch-Slice'; 

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
    dispatch(searchProducts(searchTerm));
    console.log("searchProduct",searchTerm);
  };

  useEffect(() => {
    return () => {
      dispatch(clearSearchState());
    };
  }, [dispatch]);

  return (
    <div>
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
      </div>
      {hasSearched && <ShopGridStandard searchResults={searchResults} />}
    </div>
  );
};

export default ShopSearch;
