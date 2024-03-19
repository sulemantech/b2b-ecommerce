import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchUserOrders } from '../../API';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
          <div className="item-empty-area text-center">
          <div className="item-empty-area__icon mt-50 mb-30">
           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-basket-off" width="92" height="92" viewBox="0 0 24 24" stroke-width="1" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M17 10l-2 -6" />
  <path d="M7 10l.75 -2.252m1.001 -3.002l.249 -.746" />
  <path d="M12 8h7a2 2 0 0 1 1.977 2.304c-.442 2.516 -.756 4.438 -.977 5.696m-1.01 3.003a2.997 2.997 0 0 1 -2.234 .997h-9.512a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304h2.999" />
  <path d="M12 12a2 2 0 1 0 2 2" />
  <path d="M3 3l18 18" />
</svg>
        </div>
        <div className="item-empty-area__text mb-30">
          No Order Found<br></br>
          <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                      Order Now
                      </Link>
        </div>
        </div>
          )}
      </LayoutOne>
    </>
  );
};

export default Order;
