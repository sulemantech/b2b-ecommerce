import PropTypes from "prop-types";
import { setActiveSort } from "../../helpers/product";
import { useState } from "react";
import { useEffect } from "react";
import { propTypes } from "react-hooks-paginator";



const ShopCategories = ({categories ,getSortParams,selectedCategories }) => {
  const [checked, setChecked] = useState(true);


 
  

  
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
          
            <li>
              <div className="sidebar-widget-list-left">
                  <button
                    
                    id="allCategoriesButton"
                    className="active"
                    onClick={(e) => {
                      const categoryIds = Array.isArray(categories.Categories.map((category) => category.id));
                      getSortParams("category", categoryIds);
                      // setActiveSort(e);
                    }}
                  >
                    <span className={`checkmark `} /> All Categories
                  </button>
                </div>

            </li>
            {categories?.Categories?.map((category, key) => {
              return (
                <li key={key+1}>
                  <div className="sidebar-widget-list-left" id={key+1}>
                      
                      <button
                      id="IndCategorie"
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
  getSortParams: PropTypes.func,
};

export default ShopCategories;
