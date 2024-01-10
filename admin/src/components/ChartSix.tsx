import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';

interface Order {
  orderId: number;
  userId: number;
  address: string;
  orderDate: string;
  totalPrice: string;
  status: string;
  discount: number;
  paymentMethod: string;
  trackingNumber: number;
  name: string;
  email: string;
  contactNumber: number;
  zipCode: number;
  additionalInfo: string;
  city: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
}

interface OrderItem {
  orderId: number;
  price: number;
  discount: number;
  totalPrice: number;
  productId: number;
  quantity: number;
}

const ChartSix: React.FC = () => {
  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/order');
        setData(response.data);
        console.log(response);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      // { Header: 'Order ID', accessor: 'orderId' },
      { Header: 'User ID', accessor: 'userId' },
      { Header: 'Address', accessor: 'address' },
      { Header: 'Total Price', accessor: 'totalPrice' },
      { Header: 'Status', accessor: 'status' },
      { Header: 'Discount', accessor: 'discount' },
      { Header: 'Payment Method', accessor: 'paymentMethod' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Contact Number', accessor: 'contactNumber' },
      { Header: 'City', accessor: 'city' },
      { Header: 'Order Date', accessor: 'orderDate' },
    ],
    []
  );

  const orderItemsColumns = React.useMemo(
    () => [
      { Header: 'Product ID', accessor: 'productId' },
      { Header: 'Price', accessor: 'price' },
      { Header: 'Discount', accessor: 'discount' },
      { Header: 'Total Price', accessor: 'totalPrice' },
      { Header: 'Quantity', accessor: 'quantity' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data });

  return (
    <div>
      <h2>Order Details Table</h2>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setGlobalFilter(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px',marginRight:'20px' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{  borderBottom: '1px solid #ddd' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={{ borderBottom: '1px solid #ddd' }}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} style={{ padding: '10px' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Display Order Items */}
      {/* {rows.length > 0 && (
        <div>
          <h3>Order Items</h3>
          <table style={{ width: '70%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                {orderItemsColumns.map((column) => (
                  <th key={column.Header} style={{ padding: '5px', borderBottom: '1px solid #ddd' }}>
                    {column.Header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
                {console.log("stateeeeeeeeeee",state)
                }
              {state.selectedFlatRows.length > 0 &&
                state.selectedFlatRows[0].original.orderItems.map((item: OrderItem) => (
                  <tr key={item.productId} style={{ borderBottom: '1px solid #ddd' }}>
                    {orderItemsColumns.map((column) => (
                      <td key={column.Header} style={{ padding: '10px' }}>
                        {item[column.accessor]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )} */}
    </div>
  );
};

export default ChartSix;
