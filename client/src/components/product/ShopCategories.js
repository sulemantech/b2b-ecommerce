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
      // console.log("response", response.data); // Log the full response to see its structure
      setSubcategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="sidebar-widget position-relative">
      {subcategories.length > 0 && show ? (
        <div
        className="container-fluid position-absolute top-0 start-100 rounded bg-gray border" style={{ width: '160px',zIndex: 5 }}
          onMouseLeave={() => setShow(false)} // Hide subcategories when mouse leaves
        >
          <ul style={{ padding: "10px" }}>
            {subcategories.map((category, index) => (
              <li key={index}>
                <ul>
                  {category.subcategories.map((subcategory, subIndex) => (
                    <li key={subIndex}>
                      <button
                        onMouseOver={(e) => {
                          getSortParams("category", subcategory.id, true);
                          setActiveSort(e);
                        }}
                        className="border-0 mb-1 bg-gray p-10"
                      >
                        <p
                          className="d-flex "
                          onMouseOver={(e) => {
                            e.currentTarget.classList.add(
                              // "bg-white",
                              "text-purple"
                            );
                            // e.currentTarget.querySelector("img").style.display =
                            //   "inline";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.classList.remove(
                              // "bg-white",
                              "text-purple"
                            );
                            // e.currentTarget.querySelector("img").style.display =
                            //   "none";
                          }}
                        >
                          {subcategory.name}

                          <span className="bg-transparent">
                            <img
                              src="icons8-right-arrow-50.png"
                              style={{
                                display: "none",
                                width: "40%",
                                background: "white",
                              }}
                            />
                          </span>
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <h4 className="pro-sidebar-title px-3">Categories </h4>
      <div className="sidebar-widget-list mt-2 px-2">
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
                      className=""
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
                      />
                      <p
                        className="d-flex"
                        onMouseOver={(e) => {
                          e.currentTarget.classList.add(
                            // "bg-white",
                            "text-purple"
                          );
                          // e.currentTarget.querySelector("img").style.display =
                          //   "inline";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.classList.remove(
                            // "bg-white",
                            "text-purple"
                          );
                          // e.currentTarget.querySelector("img").style.display =
                          //   "none"; // Hide the arrow image
                        }}
                      >
                        {category.name}
                        <span className="bg-transparent">
                          <img
                            src="icons8-right-arrow-50.png"
                            style={{
                              display: "none",
                              width: "70%",
                              background: "white",
                            }}
                          />
                        </span>
                      </p>
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
