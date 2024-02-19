import PropTypes from "prop-types";
import { setActiveSort } from "../../helpers/product";
import { useState } from "react";
import { useEffect } from "react";



const ShopCategories = ({categories ,getSortParams,selectedCategories }) => {
  const [checked, setChecked] = useState(true);

  // useEffect(()=>{
  //   const allCategoriesButton = document.getElementById('allCategoriesButton');
  //   if (allCategoriesButton) {
  //     allCategoriesButton.click();
  //   }
    
  // },[]);
  

  
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
          
            <li>
              <div className="sidebar-widget-list-left">
                  <button
                    defaultChecked={checked}
                    id="allCategoriesButton"
                    onClick={(e) => {
                      const categoryIds = categories.Categories.map((category) => category.id).join(',');
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
