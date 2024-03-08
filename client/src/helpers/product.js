import React from "react";

export const getProducts = (products, category, type, limit) => {


  const finalProducts = category ? products?.filter(product => product.category?.filter(single => single === category)[0] )
    : products;

  if (type && type === "new") {
    const newProducts = finalProducts.filter(single => single.new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === "bestSeller") {
    return finalProducts
      .sort((a, b) => {
        return b.saleCount - a.saleCount;
      })
      .slice(0, limit ? limit : finalProducts.length);
  }
  if (type && type === "saleItems") {
    const saleItems = finalProducts.filter(
    
      single => single.discount && single.discount > 0
    );
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return finalProducts.slice(0, limit ? limit : finalProducts.length);
};

// get product discount price
export const getDiscountPrice = (price, discount) => {
  return discount && discount > 0 ? price - price * (discount / 100) : null;
};

// get product cart quantity
export const getProductCartQuantity = (cartItems, product, color, size) => {
  let productInCart = cartItems.find(
    single =>
      single.id === product.id &&
      (single.selectedProductColor
        ? single.selectedProductColor === color
        : true) &&
      (single.selectedProductSize ? single.selectedProductSize === size : true)
  );
  if (cartItems.length >= 1 && productInCart) {
    if (product.variation) {
      return cartItems.find(
        single =>
          single.id === product.id &&
          single.selectedProductColor === color &&
          single.selectedProductSize === size
      ).quantity;
    } else {
      return cartItems.find(single => product.id === single.id).quantity;
    }
  } else {
    return 0;
  }
};

export const cartItemStock = (item, color, size) => {
  if (item.stock) {
    return item.stock;
  } else {
    return item.variation
      .filter(single => single.color === color)[0]
      .size.filter(single => single.name === size)[0].stock;
  }
};

//get products based on category
export const getSortedProducts = (products, sortType, sortValue) => {
  if (Array.isArray(products) && sortType && sortValue) {
    switch (sortType) {
      case "category":
      case "tag":
        return products; // Return the original products array
      case "color":
        return products.filter(
          product =>
            product.variation &&
            product.variation.some(single => single.color === sortValue)
        );
      case "size":
        return products.filter(
          product =>
            product.variation &&
            product.variation.some(single =>
              single.size.some(size => size.name === sortValue)
            )
        );
      case "filterSort":
        let sortProducts = [...products];
        if (sortValue === "priceHighToLow") {
          return sortProducts.sort((a, b) => b.price - a.price);
        }
        if (sortValue === "priceLowToHigh") {
          return sortProducts.sort((a, b) => a.price - b.price);
        }
        return sortProducts; // Return the original products array for "default" case
      default:
        return products; // Return the original products array if no sortType matches
    }
  }
  return products;
};


// get individual element
const getIndividualItemArray = array => {
  let individualItemArray = array.filter(function(v, i, self) {
    return i === self.indexOf(v);
  });
  return individualItemArray;
};

// get individual categories
export const getIndividualCategories = products => {
  let productCategories = [];
  products &&
    products.map(product => {
      return (
        product.category &&
        product.category.map(single => {
          return productCategories.push(single);
        })
      );
    });
  const individualProductCategories = getIndividualItemArray(productCategories);
  return individualProductCategories;
};

// get individual tags
export const getIndividualTags = products => {
  let productTags = [];
  if (Array.isArray(products)) {
    products.forEach(product => {
      if (Array.isArray(product.tag)) {
        product.tag.forEach(single => {
          productTags.push(single);
        });
      }
    });
  }
  const individualProductTags = getIndividualItemArray(productTags);
  return individualProductTags;
};


// get individual colors
export const getIndividualColors = products => {
  let productColors = [];
  if (Array.isArray(products)) {
    products.map(product => {
      return (
        product.variation &&
        product.variation.map(single => {
          return productColors.push(single.color);
        })
      );
    });
  }
  const individualProductColors = getIndividualItemArray(productColors);
  return individualProductColors;
};


// get individual sizes
export const getProductsIndividualSizes = products => {
  let productSizes = [];
  if (Array.isArray(products)) {
    products.map(product => {
      return (
        product.variation &&
        product.variation.map(single => {
          if (Array.isArray(single.size)) {
            return single.size.map(size => {
              return productSizes.push(size.name);
            });
          }
        })
      );
    });
  }
  const individualProductSizes = getIndividualItemArray(productSizes);
  return individualProductSizes;
};


// get product individual sizes
export const getIndividualSizes = product => {
  let productSizes = [];
  if (Array.isArray(product.variation)) {
    product.variation.forEach(singleVariation => {
      if (Array.isArray(singleVariation.size)) {
        singleVariation.size.forEach(singleSize => {
          productSizes.push(singleSize.name);
        });
      }
    });
  }
  const individualSizes = getIndividualItemArray(productSizes);
  return individualSizes;
};





// //yesterday///
export const setActiveSort = (e, selectedCategories ,updatedCategories) => {
  const isAllCategoriesButton = e.currentTarget.id === "allCategoriesButton";
  // if (isAllCategoriesButton) {
  //   const filterButtons = document.querySelectorAll(
  //     ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
  //   );
  //   filterButtons.forEach((item) => {
  //     if (item.id == "allCategoriesButton") {
  //       // item.classList.remove("active");
        
  //     }
  //   });
  // } else {
  //   const allCategoriesButton = document.getElementById("allCategoriesButton");
  //   allCategoriesButton.classList.remove("active");
  // }
  e.currentTarget.classList.toggle("active");
};



// export const setActiveSort = (e) => {
//   const isAllCategoriesButton = e.currentTarget.id === "allCategoriesButton";
//   const AllCategoriesButton = e.currentTarget.id === "IndCategorie";
//   console.log("IndividualCategories",AllCategoriesButton);

//   const filterButtons = document.querySelectorAll(
//     ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
//   );
//   console.log("frilterBUttons",filterButtons)

//   if (isAllCategoriesButton) {
//     // Toggle active class for "All Categories" button
//     e.currentTarget.classList.toggle("active");

//     // If "All Categories" checkbox is checked, remove active class from individual category checkboxes
//     if (e.currentTarget.classList.contains("active")) {
//       filterButtons.forEach(item => {
//         if (item.id !== "allCategoriesButton") {
//           item.classList.remove("active");
//         }
//       });
//     }
//   } else 
//   if (AllCategoriesButton) {
//     // Toggle active class for individual category checkbox
//     e.currentTarget.classList.toggle("active");

//     // Check if all individual category checkboxes are active
//     const allCategoriesButton = document.getElementById("allCategoriesButton");
//     const filterButtonsArray = Array.from(filterButtons).filter(item => {
//         return item.id.startsWith("categoryButton-") && item.classList.contains("active");
//     });

//     // If filterButtonsArray is not empty, it means all individual category buttons are active
//     if (filterButtonsArray.length =3) {
//         allCategoriesButton.classList.add("active");
//     } else {
//         allCategoriesButton.classList.remove("active");
//     }
// }



// };










//////today
// export const setActiveSort = (e, selectedCategories) => {
//   const isAllCategoriesButton = e.currentTarget.id === "allCategoriesButton";
//   const IsIndCategoriesButton = e.currentTarget.id === "IndCategorie";
//   const filterButtons = document.querySelectorAll(
//         ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
//       );
//       console.log("frilterBUttons",filterButtons)

//   if (isAllCategoriesButton) {
//     const allCategoriesButton = document.getElementById("allCategoriesButton");
//     const isActive = allCategoriesButton.classList.toggle("active");
//     if (isActive) {
//       allCategoriesButton.classList.remove("active");
//     } else {
//       allCategoriesButton.classList.add("active");
//     }
//     if (IsIndCategoriesButton) {
//       const allButtons = document.getElementById("IndCategorie");
//       const allButtonsActive = Array.from(allButtons).every(button => button.classList.contains('active'));
//       if (allButtonsActive) {
//         allCategoriesButton.classList.add("active");
//       }
//     }

//   } else {
//     const allCategoriesButton = document.getElementById("allCategoriesButton");
//     allCategoriesButton.classList.remove("active");
//   }
//   e.currentTarget.classList.toggle("active");
// };




export const setActiveLayout = e => {
  const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
  gridSwitchBtn.forEach(item => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const toggleShopTopFilter = e => {
  const shopTopFilterWrapper = document.querySelector(
    "#product-filter-wrapper"
  );
  shopTopFilterWrapper.classList.toggle("active");
  if (shopTopFilterWrapper.style.height) {
    shopTopFilterWrapper.style.height = null;
  } else {
    shopTopFilterWrapper.style.height =
      shopTopFilterWrapper.scrollHeight + "px";
  }
  e.currentTarget.classList.toggle("active");
};
