
import { setSearchResults, setError, setLoading } from '../slices/ShopSearch-Slice'; 

export const searchProducts = (searchTerm) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await fetch(`http://localhost:5001/api/products/?search=${searchTerm}`);
    const data = await response.json();
    dispatch(setSearchResults(data));
    console.log("searchhhhhhhhhhhhhhhhhhhhhhhhh",data);
  } catch (error) {
    console.error('Error during search:', error);
    dispatch(setError('An error occurred during the search. Please try again.'));
  } finally {
    dispatch(setLoading(false));
  }
};
