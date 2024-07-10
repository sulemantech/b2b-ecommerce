import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
}

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Product 1', sku: 'SKU001', quantity: 10 },
    { id: 2, name: 'Product 2', sku: 'SKU002', quantity: 20 },
    { id: 3, name: 'Product 3', sku: 'SKU003', quantity: 15 },
  ]);

  return (
    <div>
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4">
          <p className="pl-10 text-start font-semibold text-black-2 text-xl py-3">Inventory</p>

          <div className="">
      
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">SKU</th>
            <th className="px-4 py-2">Available Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.sku}</td>
              <td className="px-4 py-2">{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
          </div>
      </div>

    </div>
  );
};

export default Inventory;
