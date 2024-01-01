// import { setSearchResults, setError, setLoading } from '../slices/ShopSearch-Slice';

// import { setSearchResults, setError, setLoading } from '../slices/ShopSearch-Slice'; 

// export const searchProducts = (searchTerm) => async (dispatch) => {
//   try {
//     dispatch(setLoading(true));

//     const response = await fetch(`http://localhost:5001/api/product/`);
//     const data = await response.json();
//     dispatch(setSearchResults(data));
//     console.log("searchhhhhhhhhhhhhhhhhhhhhhhhh",data);
//   } catch (error) {
//     console.error('Error during search:', error);
//     dispatch(setError('An error occurred during the search. Please try again.'));
//   } finally {
//     dispatch(setLoading(false));
//   }
// };
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { setSearchResults, setError, setLoading } from '../slices/ShopSearch-Slice';

export const searchProducts = (searchTerm,e) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await fetch(`http://localhost:5001/api/product/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query { search(query: "${searchTerm}") { 
                  id
                  name
                  description
                  price
                  sku
                  productImages {
                    date
                    images
                  }
                }}`,
      }),
    });

    const data = await response.json();
    dispatch(setSearchResults(data));
    console.log('Search results:', data);
  } catch (error) {
    console.error('Error during search:', error);
    dispatch(setError('An error occurred during the search. Please try again.'));
  } finally {
    dispatch(setLoading(false));
  }
};
