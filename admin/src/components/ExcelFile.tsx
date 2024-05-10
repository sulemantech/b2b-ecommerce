import React, { ChangeEvent } from 'react';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';

interface Products {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity?: number;
  manufacturer: string;
  dateAdded?: Date;
  discount: number;
  new: boolean;
  rating: number;
  saleCount: number;
  tag: string[];
  stock: number;
  status: string;
  quantityInStock: number;
  sku: string;
  category_id: number;
  supplier_id: number;
  categoryName: string;
  productImages: Array<{ date: string; images: string[] }>;
  // productImages?: { date: string; images: string[] }[] | undefined;
}


interface SheetJSAppProps {}

interface SheetJSAppState {
  data: any[]; // Change this to the specific type of your data
  cols: any[]; // Change this to the specific type of your cols
}

class SheetJSApp extends React.Component<SheetJSAppProps, SheetJSAppState> {
  constructor(props: SheetJSAppProps) {
    super(props);
    this.state = {
      data: [],
      cols: [],
      products: [],
    };

    this.handleFile = this.handleFile.bind(this);
    this.exportFile = this.exportFile.bind(this);
    // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa",this.data)
  }
  componentDidMount() {
    const fetchPendingProducts = () => {
      fetch(
        `${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}/api/products/all?page=1&pageSize=500&status=pending`,
      )
        .then((response) => {
          if (!response.ok) {
            console.log('Network error');
          }
          return response.json();
        })
        .then((data) => {
          const pendingProducts = data.filter(
            (product: Products) => product.status === 'pending',
          );
          this.setState({ products: pendingProducts });
          // console.log('Pending products:', pendingProducts);
        })
        .catch((error) => {
          console.error('Error fetching pending products:', error.message);
        });
    };

    fetchPendingProducts();
  }

  componentDidUpdate(prevState: SheetJSAppState) {
    // Check if the data state has changed
    if (prevState.data !== this.state.data) {
      // console.log('Data has been updated:', this.state.data);
    }
  }
  handleFile(file: File) {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const bstr = e.target?.result as string;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.postBulkData(data);
      // console.log('dataaaaaaaaaaaaaaaaaa', data);
      this.setState({ data: data, cols: make_cols(ws['!ref']!) });
    };

    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }

  // Add this method to your class
  postBulkData(data: any[]) {
    fetch('http://localhost:5001/api/products/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        data.map((rowData) => ({
          name: rowData[0],
          description: rowData[1],
          price: rowData[2],
          quantity: rowData[3],
          manufacture: rowData[4],
          discount: rowData[5],
          new: rowData[6],
          rating: rowData[7],
          saleCount: rowData[8],
          tag: Array.isArray(rowData[9]) ? rowData[9] : [],
          stock: rowData[10],
          qunatityInStock: rowData[11],
          sku: rowData[12],
          category_id: rowData[13],
          supplier_id: rowData[14],
          category_name: rowData[15],
          status: rowData[16],
        })),
      ),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error sending bulk data');
        }
      })
      .then((result) => {
        console.log('Bulk data sent successfully:', result);

        // Handle success as needed
      })
      .catch((error) => {
        console.error('Error sending bulk data:', error);
      });
  }

  exportFile() {
    /* Convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(this.state.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
    /* Generate XLSX file and send to the client */
    XLSX.writeFile(wb, 'sheetjs.xlsx');
  }

  render() {
    return (
      <DragDropFile handleFile={this.handleFile}>
        <div className="row">
          <div className="col-xs-12">
            <DataInput handleFile={this.handleFile} />
          </div>
        </div>
        {/* <div className="row">
          <br />

          <div className="col-xs-12">
            <button
              disabled={!this.state.data.length}
              className="inline-flex items-center justify-center w-1 h-2  rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              onClick={this.exportFile}
            >
              Export
            </button>
          </div>
        </div> */}
        <br />
        <br />
        {this.state.products.length > 0 ? (
          <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5">
            <div className="col-span-6 flex items-center">
              <p className="font-medium text-black">Product Name</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium text-black">Category</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium text-black">Price</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium text-black">Discount</p>
            </div>

            <div className="col-span-1 flex items-center">
              <p className="font-medium text-black">Manufacturer</p>
            </div>

            <div className="col-span-1 flex items-center">
              <p className="font-medium text-black">Status</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium text-black">Edit</p>
            </div>
          </div>
        ) : null}
        {this.state.products.map((product: Products) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5"
            id={`${product.id}`}
          >
            <div className="col-span-1 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* <div className="h-12.5 w-15 rounded-md">
                  <img src={product.productImages[0]?.images[0]} alt="" />
                </div> */}
                <p className="text-sm text-black dark:text-white">
                  {product.name}
                  {/* {product.id} */}
                </p>
              </div>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {product.categoryName}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {product.price}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {product.discount}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {product.manufacturer}
              </p>
            </div>

            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {product.status}
              </p>
            </div>

            <div className="col-span-1 flex items-center">
              <div>
                <Link
                  to={`/UpdateProducts/${product.id}`}
                  className="bg-blue hover:bg-blue-700 font-bold py-2 px-4 rounded-full"
                >
                  edit
                </Link>
              </div>
            </div>
            {/* <div className="col-span-1 flex items-center">
      <Link to={`/forms/form-elements/`} className="bg-blue hover:bg-blue-700 font-bold py-2 px-4 rounded-full">
        delete
      </Link>
    </div> */}
          </div>
        ))}
        <OutTable data={this.state.data} cols={this.state.cols} />
      </DragDropFile>
    );
  }
}

class DragDropFile extends React.Component<{
  handleFile: (file: File) => void;
  children?: React.ReactNode; // Add this line to define the children prop
}> {
  constructor(props: { handleFile: (file: File) => void }) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  suppress(evt: React.DragEvent<HTMLDivElement>) {
    evt.stopPropagation();
    evt.preventDefault();
  }

  onDrop(evt: React.DragEvent<HTMLDivElement>) {
    evt.stopPropagation();
    evt.preventDefault();
    const files = evt.dataTransfer.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }

  render() {
    return (
      <div
        onDrop={this.onDrop}
        onDragEnter={this.suppress}
        onDragOver={this.suppress}
      >
        {this.props.children}
      </div>
    );
  }
}

class DataInput extends React.Component<{ handleFile: (file: File) => void }> {
  constructor(props: { handleFile: (file: File) => void }) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }

 

  render() {
    return (
      <form className="form-inline flex justify-end">
        <div className="form-group ">
          {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Spreadsheet
          </label> */}
          <input
            type="file"
            accept={SheetJSFT}
            onChange={this.handleChange}
            className="w-1/3cursor-pointer rounded-lg border-[1.5px] border-stroke
                   bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse 
                   file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke
                    file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 
                    focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter
                     dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark 
                     dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
          />
        </div>
          <div className=' ml-4'>
            <button
              // disabled={!this.state.data.length}
              className="inline-flex items-center justify-center w-1 h-2  rounded-md bg-primary py-6 text-center
               font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              // onClick={this.exportFile}
            >
              Export
            </button>
          </div>
      </form>
    );
  }
}


interface SheetJSAppState {
  data: any[];
  cols: any[];
  [key: string]: any;
}

class OutTable extends React.Component<
  { data: any[]; cols: any[] },
  SheetJSAppState
> {
  handleSave(rowData: any[]) {
    const postData = {
      name: rowData[0],
      description: rowData[1],
      price: rowData[2],
      quantity: rowData[3],
      country: rowData[4],
      weight: rowData[5],
      available: rowData[6],
      minQuantity: rowData[7],
      maxQuantity: rowData[8],
      tag: Array.isArray(rowData[9]) ? rowData[9] : [],
      width: rowData[10],
      height: rowData[11],
      sku: rowData[12],
      category_id: rowData[13],
      supplier_id: rowData[14],
      category_name: rowData[15],
      status: rowData[16],
    };


    fetch('http://localhost:5001/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Post saved successfully:', result);
        console.log('Save data:', rowData);
      })
      .catch((error) => {
        console.error('Error saving post:', error);
      });
  }

  constructor(props: { data: any[]; cols: any[] }) {
    super(props);
    this.state = {
      data: props.data,
      cols: props.cols,
      selectedRows: new Set<number>(),
    };
  }
  /////////////////////////////////////////////////HandleMultiple/////////////////////////////////////////////////////////////////////////////
  handleMultiple = () => {
    const { selectedRows } = this.state;

    // Filter the selected rows
    const selectedProducts = this.props.data.filter((_, i) =>
      selectedRows?.has(i),
    );

    // Check if any products are selected
    if (selectedProducts.length === 0) {
      console.log('No products selected.');
      return;
    }

    // Create an array of products with only the required properties
    const postData = selectedProducts.map((product) => ({
      name: product[0],
      description: product[1],
      price: product[2],
      quantity: product[3],
      manufacturer: product[4],
      discount: product[5],
      new: product[6],
      rating: product[7],
      saleCount: product[8],
      // tag: product[9],
      stock: product[10],
      quantityInStock: product[11],
      sku: product[12],
      category_id: product[13],
      supplier_id: product[14],
      categoryName: product[15],
      status: product[16],
    }));

    // Send bulk request to the backend API
    fetch('http://localhost:5001/api/products/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error saving products');
        }
      })
      .then((result) => {
        console.log('Products saved successfully:', result);
        // Handle success as needed
      })
      .catch((error) => {
        console.error('Error saving products:', error);
      });
  };

  handleCheckboxChange = (rowIndex: number) => {
    const { selectedRows } = this.state;
    if (selectedRows?.has(rowIndex)) {
      selectedRows.delete(rowIndex);
    } else {
      selectedRows?.add(rowIndex);
    }
    this.setState({ selectedRows });
  };

  render() {
    const { selectedRows } = this.state;
   

    return (
      <div>
        <div>
          <button
            onClick={this.handleMultiple}
            className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            SelectedProducts
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 "></thead>
            <tbody>
              {this.props.data.map((r, i) => (
                <tr key={i} className="border-b border-gray p-2 ">
                  <td className="">
                    <input
                      type="checkbox"
                      checked={selectedRows?.has(i)}
                      onChange={() => this.handleCheckboxChange(i)}
                    />
                  </td>
                  {this.props.cols.map((c) => (
                    <td key={c.key} className=" p-2">
                      {r[c.key]}
                    </td>
                  ))}
                  <td className="p-2">
                    <button
                      onClick={() => this.handleSave(r)}
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold  py-2 px-4 border"
                    >
                      Save
                    </button>
                    {/* <Link to={`/UpdateProducts/${}`} className="bg-blue hover:bg-blue-700 font-bold py-2 px-4 rounded-full">
        Edit
      </Link> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const SheetJSFT = [
  'xlsx',
  'xlsb',
  'xlsm',
  'xls',
  'xml',
  'csv',
  'txt',
  'ods',
  'fods',
  'uos',
  'sylk',
  'dif',
  'dbf',
  'prn',
  'qpw',
  '123',
  'wb*',
  'wq*',
  'html',
  'htm',
]
  .map(function (x) {
    return '.' + x;
  })
  .join(',');

/* generate an array of column objects */
const make_cols = (refstr: string) => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;

  for (var i = 0; i < C; ++i) {
    if (i < 21) {
      o[i] = { name: XLSX.utils.encode_col(i), key: i };
    }
  }

  return o;
};

export default SheetJSApp;
