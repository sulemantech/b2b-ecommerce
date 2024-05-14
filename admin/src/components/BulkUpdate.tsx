import { FC, useState, useEffect } from 'react';

interface Product {
  id: number;
  productId: number;
  name: string;
  price: number;
  categoryName: string;
  discount: number;
  manufacturer: string;
  productImages: Array<{ date: string; images: string[] }>;
}

interface BulkUpdateProps {
  selectedProducts: Product[];
}

const BulkUpdate: FC<BulkUpdateProps> = ({ selectedProducts }) => {
  const [productsToUpdate, setProductsToUpdate] = useState<Product[]>([]);
  debugger

  useEffect(() => {
    // When selectedProducts prop changes, update productsToUpdate state
    setProductsToUpdate(selectedProducts);
    console.log("lgggggggggggggggggggg",selectedProducts);
  }, [selectedProducts]);

  const handleProductUpdate = (productId: number) => {
    // Find the product in productsToUpdate array and update its details
    const updatedProducts = productsToUpdate.map(product => {
      if (product.id === productId) {
        // Modify the product details here as needed
        // For example, update the price
        product.price += 10; // Increase price by 10 (example)
      }
      return product;
    });

    // Update the state with the modified products
    setProductsToUpdate(updatedProducts);
  };

  return (
   <div></div>
  );
};

export default BulkUpdate;
