import PropTypes from "prop-types";
import { setActiveSort } from "../../helpers/product";



const ShopCategories = ({categories ,getSortParams,selectedCategories }) => {
//   const dispatch=useDispatch();
//   const categories=useSelector((state)=>state.categories);
//   useEffect(()=>{
// dispatch(fetchCategory(dispatch))
//   },[])
console.log("selecteddddddddddddddddddddddCategories shop categories",selectedCategories);
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
          
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("category", "1,2,3" );
                    setActiveSort(e);
                  }}
                >
                      <span className={`checkmark ${selectedCategories.length === 0 ? 'selected' : ''}`} /> All Categories
{                      console.log("ssselectedkkkkkkkkkkkkkkkkk",selectedCategories)
}                </button>
              </div>
            </li>
            {categories?.Categories?.map((category, key) => {
              return (
                <li key={key+1}>
                  <div className="sidebar-widget-list-left" id={key+1}>
                      {/* {console.log("nameee category shop categories",key+1, " categoyr id:"+category.category_id)}  */}
                   
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
