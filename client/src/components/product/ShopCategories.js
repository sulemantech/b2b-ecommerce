import PropTypes from "prop-types";
import { setActiveSort } from "../../helpers/product";
import { useState } from "react";
import { useEffect } from "react";



const ShopCategories = ({categories ,getSortParams,selectedCategories }) => {
  const [checked, setChecked] = useState(true);
  const [categoryList, setCategoryList] = useState([]);


  useEffect(() => {
    fetch('http://localhost:5001/api/categories/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCategoryList(data);
        
      })
      .catch((error) => {
        console.error('Fetch Error:', error);
      });
  }, []);
  
  console.log("categoryList",categoryList.map((ee)=>{
    console.log("idd",ee.id);
  }));
  
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
          
            <li>
              {/* <div className="sidebar-widget-list-left">
                <button
                 defaultChecked={checked}
                  onClick={e => {
                    getSortParams("category", "1,2,3" ); //////get/all/
                    setActiveSort(e);
                  }}
          
                >
                      <span className={`checkmark ${selectedCategories.length === 0 ? 'selected' : ''}`} /> All Categories
                </button>
              </div> */}
              <div className="sidebar-widget-list-left">
                  <button
                    defaultChecked={checked}
                    onClick={(e) => {
                      const categoryIds = categoryList.map((category) => category.id).join(',');
                      getSortParams("category", categoryIds);
                      setActiveSort(e);
                    }}
                  >
                    <span className={`checkmark ${selectedCategories.length === 0 ? 'selected' : ''}`} /> All Categories
                  </button>
                </div>

            </li>
            {categories?.Categories?.map((category, key) => {
              return (
                <li key={key+1}>
                  <div className="sidebar-widget-list-left" id={key+1}>
                      
                   
                      <button
                   
                      onClick={e => {
                        getSortParams("category", category.id);
                        
                        setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className={`checkmark ${selectedCategories.includes(category.id) ? 'selected' : ''}`} /> {category.name}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func
};

export default ShopCategories;
