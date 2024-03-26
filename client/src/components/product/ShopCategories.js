import PropTypes from "prop-types";
import { setActiveSort } from "../../helpers/product";
import { useState, useEffect } from "react";
import axios from "axios";
import { APIHost } from "../../API";
// import { useEffect } from "react";
import { propTypes } from "react-hooks-paginator";

const ShopCategories = ({ categories, getSortParams, selectedCategories }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [show, setShow] = useState(null);

  const fetchCategories = async (id) => {
    try {
      const response = await axios.get(
        `${APIHost}/api/categories/subCategories/all/${id}`
      );
      console.log("response", response.data); // Log the full response to see its structure
      setSubcategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="sidebar-widget">
      {subcategories.length > 0 && show ? (
        <div
          className="position-absolute top-50 rounded h-50 bg-gray border"
          style={{ marginLeft: "24%", zIndex: 5 }}
          onMouseLeave={() => setShow(false)} // Hide subcategories when mouse leaves
        >
          <ul style={{ padding: "20px" }}>
            {subcategories.map((category, index) => (
              <li key={index}>
                <ul>
                  {category.subcategories.map((subcategory, subIndex) => (
                    <li key={subIndex}>
                      <button
                        onClick={(e) => {
                          // Handle button click if needed
                        }}
                        className="border-0 bg-gray mb-10 hover:text-meta-1"
                      >
                        {subcategory.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : subcategories.length === 0 && show ? (
        <div
          className="position-absolute top-50 rounded h-50 bg-gray border"
          style={{ marginLeft: "24%", zIndex: 5 }}
          onMouseLeave={() => setShow(false)}
        >
         <p className="mt-100"> No subcategories found</p>
        </div>
      ) : null}

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
                    const categoryIds = categories.Categories.map(
                      (category) => category.id
                    );
                    getSortParams("category", categoryIds);
                  }}
                >
                  <span className={`checkmark `} /> All Categories
                </button>
              </div>
            </li>
            {categories?.Categories?.map((category, key) => {
              return (
                <li key={key + 1}>
                  <div
                    className="sidebar-widget-list-left"
                    id={key + 1}
                    onMouseEnter={() => {
                      fetchCategories(category.id);
                      setShow(true); // Show subcategories when mouse enters
                    }}
                  >
                    <button
                      id="IndCategorie"
                      onClick={(e) => {
                        getSortParams("category", category.id);
                        setActiveSort(e);
                      }}
                    >
                      <span
                        className={`checkmark ${
                          selectedCategories.includes(category.id)
                            ? "selected"
                            : ""
                        }`}
                      />{" "}
                      {category.name}
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
