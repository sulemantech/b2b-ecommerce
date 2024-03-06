import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchUserOrders } from '../../API';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import { useLocation } from 'react-router-dom';

const Order = () => {
  let { pathname } = useLocation();

  const storedToken = useSelector((state) => state.auth.token);
  const [orders, setOrders] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await fetchUserOrders(storedToken);
        setOrders(ordersData);
        
        console.log("oredre",ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchData();
  }, [storedToken]);





  useEffect(() => {
    const lowercasedInput = searchInput.toLowerCase();
    const filtered = orders.filter((order) => {
      const orderId = order.orderId && typeof order.orderId === 'string' ? order.orderId.toLowerCase() : '';
      const trackingNumber = typeof order.trackingNumber === 'number' ? order.trackingNumber.toString() : '';
      const shippingAddress = order.shippingAddress && typeof order.shippingAddress === 'string' ? order.shippingAddress.toLowerCase() : '';
      return (
        orderId.includes(lowercasedInput) ||
        trackingNumber.includes(lowercasedInput) ||
        shippingAddress.includes(lowercasedInput)
      );
    });

    const updatedFilteredOrders = searchInput.trim() === '' ? orders : filtered;
    setFilteredOrders(updatedFilteredOrders);
  }, [searchInput, orders]);

 

  return (
    <>
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: 'Home', path: process.env.PUBLIC_URL + '/' },
            { label: 'My Account', path: process.env.PUBLIC_URL + pathname },
          ]}
        />
            {orders.length>1 ? (
        <div className="orders-container">
          <h2 style={{ textAlign: 'center' }}>User Orders</h2>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search by order ID or shipping address"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              
            />
            {/* <button onClick={handleSearch}>Search</button> */}
          </div>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order Date</th>
                <th>Total Price</th>
                <th>Discount</th>
                <th>Status</th>
                <th>Shipping Address</th>
                <th>Payment Method</th>
                <th>Tracking Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.discount}</td>
                  <td>{order.status}</td>
                  <td>{order.shippingAddress}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.trackingNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        ):(
          <div className='mt-30 mb-30'>
        <h1 className='text-center font-italic-bold '>
          No Order Found
        </h1>
        </div>
          )}
      </LayoutOne>
    </>
  );
};

export default Order;
