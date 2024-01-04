import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

interface Category {
  name: string;
  products: { name: string }[]; 
}

const ChartFive = () => {
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/categories/all');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', (error as Error).message);

      }
      
    };

    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Categories and Products Chart</h2>

      {data.length > 0 ? (
        <ReactApexChart
          type="bar"
          height={"400px"} 
          width={'500px'} 
          options={{
            chart: {
              toolbar: {
                show: false, 
              },
            },
            xaxis: {
              categories: data.map((category) => category.name),
            },
          }}
          series={[{ name: 'Products', data: data.map((category) => category.products.length) }]}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ChartFive;
