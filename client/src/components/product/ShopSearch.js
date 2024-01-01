import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../../store/slices/ShopSearch-Action';
import ShopGridStandard from '../../pages/shop/ShopGridStandard';
import { clearSearchState } from '../../store/slices/ShopSearch-Slice';

const ShopSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
 

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() !== '') {
        dispatch(searchProducts(searchTerm));
      }
      else{
        dispatch(clearSearchState());
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  

  useEffect(() => {
    const handleBeforeUnload = () => {
      dispatch(clearSearchState());
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
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
            <button type='submit'>
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopSearch;

