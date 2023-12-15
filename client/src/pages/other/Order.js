import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Order = () => {
  const [userOrders, setUserOrders] = useState([]);
  const storedToken = useSelector((state) => state.auth.token);

 

  const getUserOrders = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });
      debugger

      if (!response.ok) {
        // Handle error
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const userOrdersData = await response.json();
      setUserOrders(userOrdersData);
      console.log("orderrrrrrrrrrrrrrrr",userOrdersData);
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []); // Empty dependency array ensures t

  return (
    <>
      <div>
        <h2>User Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User Name</th>
              <th>Contact Number</th>
              {/* Add other header columns as needed */}
            </tr>
          </thead>
          <tbody>
            {userOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  {order.registerationModel.firstname}
                  {order.registerationModel.lastname}
                </td>
                <td>{order.registerationModel.contactNumber}</td>
                {/* Add other data columns as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Order;
