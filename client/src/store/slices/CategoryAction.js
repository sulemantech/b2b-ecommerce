// categoriesAction.js

import { fetchCategories } from "../../API";
import { setCategory } from "./category-Slice";

export const fetchCategory = () => async (dispatch) => {
  try {
    const Allcategory = await fetchCategories();
    dispatch(setCategory(Allcategory));
    console.log("allcategorie123", Allcategory);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
