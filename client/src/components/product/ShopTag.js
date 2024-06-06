import PropTypes from "prop-types";

import { setActiveSort } from "../../helpers/product";

const ShopTag = ({ tags, getSortParams,tagFilterSortParams }) => {

 
  
  return (
    <div className="sidebar-widget mt-2">
      <h4 className="pro-sidebar-title px-3">Tag </h4>
      <div className="sidebar-widget-tag px-3 col">
        {tags ? (
          <ul className="">
            {tags.map((tag, key) => {
              //  tag = tag.replace(/^{|\}$/g, '');
              tag = tag.replace(/(^["{]+)|(["}]+$)/g, '');
              return (
                <li key={key} className="mb-0 mx-0">
                  <button
                    onClick={e => {
                      tagFilterSortParams("tag", tag)
                      setActiveSort(e);
                    }}
                  >
                    {tag}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          "No tags found"
        )}
      </div>
    </div>
  );
};

ShopTag.propTypes = {
  getSortParams: PropTypes.func,
  tags: PropTypes.array,
  tagFilterSortParams: PropTypes.func,

};

export default ShopTag;
