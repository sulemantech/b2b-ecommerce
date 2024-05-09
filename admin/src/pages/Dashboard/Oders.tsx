
import { useEffect, useState} from 'react';
import Cookies from 'js-cookie';

interface Order {
  id: number;
  orderDate:Date;
  totalPrice:number;
  status:string;
  discount:string;
  paymentMethod:string;
  trackingNumber:string;

}



const TableTwo: React.FC  = () => {
  const token = Cookies.get('token');
  const [orders, setOrders] = useState<Order[]>([])

  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}/api/order/byrole`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        // Sort orders in descending order based on orderDate
        const sortedOrders = data.sort((a: Order, b: Order) => {
          return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
        });
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);
 
  
  
  return (
    <>
    <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <p className='text-center font-semibold text-2xl py-5 uppercase'>orders</p>

      <div className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-black">Order Date</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium text-black">Total Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-black">Discount</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-black">Status</p>
        </div>
       
         <div className="col-span-1 flex items-center">
          <p className="font-medium text-black">Payment Method</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-black">Tracking Number</p>
        </div>
      </div>
      
      {orders.map((index) => (
        <div  key={index.id}
        className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark text-sm sm:grid-cols-6 md:px-6 2xl:px-7.5"  id={`${index.id}`}>
    <div className="col-span-1 flex items-center">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-12.5 w-15 rounded-md">
        {new Date(index.orderDate).toLocaleString()}
     
        </div>
        <p className="text-sm text-black dark:text-white">
          {/* {index.orderDate} */}
        </p>
      </div>
    </div>
    <div className="col-span-1 hidden items-center sm:flex">
      <p className="text-sm text-black dark:text-white">{index.totalPrice}</p>
    </div>
    <div className="col-span-1 flex items-center">
      <p className="text-sm text-black dark:text-white">{index.discount}</p>
    </div>
    <div className="col-span-1 flex items-center">
      <p className="text-sm text-black dark:text-white">{index.status}</p>
    </div>
    <div className="col-span-1 flex items-center">
      <p className="text-sm text-black dark:text-white">{index.paymentMethod}</p>
    </div>
    <div className="col-span-1 flex items-center">
      <p className="text-sm text-black dark:text-white">{index.trackingNumber}</p>
    </div>
    <div className="col-span-1 flex items-center">
    </div>
  </div>
))}
</div>
{/* {console.log("process.env.RESOURCE_SERVER_HOST ", )} */}

  </>
  );
};

export default TableTwo;
