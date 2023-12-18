import React, { useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import { fetchUserOrders } from '../../API';
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useLocation } from 'react-router-dom';



const Order = () => {
  let { pathname } = useLocation();

  const storedToken = useSelector((state) => state.auth.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await fetchUserOrders(storedToken);
        setOrders(ordersData);
      } catch (error) {
      }
    };
    fetchData();
  }, []);
  


  return (
    <>
     <LayoutOne headerTop="visible">
     <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "My Account", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
      <div className="orders-container">
        <h2 style={{textAlign:"center"}}>User Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order Date</th>
              <th>Total Price</th>
              <th>discount</th>
              <th>status</th>
              <th>Shipping Address</th>
              <th>Payment Method</th>
               <th>trackingNumber</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.orderId}>
                {/* <td>{order.orderId}</td> */}
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                {/* <td>{order.userId}</td> */}
                <td>{order.totalPrice}</td>
                <td>{order.discount}</td>
                <td>{order.status}</td>
                {/* <td>{order.user.firstname} {order.user.lastname}</td>
                <td>{order.user.email}</td>
                <td>{order.user.contactNumber}</td>
                <td>{order.zipCode}</td>
                <td>{order.city}</td>
                <td>{order.country}</td> */}
                <td>{order.shippingAddress}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.trackingNumber}</td>
                {/* <td>{order.additionalInfo}</td> */}
                {/* <td>
                  <ul>
                    {order.orderItems.map((item) => (
                      <li key={item.itemId}>{item.name}
                      {item.quantity}</li>

                      
                    ))}
                  </ul>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </LayoutOne>
  </>
    );
  };
export default Order;
