/* xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com */
/* Notes:
   - usage: `ReactDOM.render( <SheetJSApp />, document.getElementById('app') );`
   - xlsx.full.min.js is loaded in the head of the HTML page
   - this script should be referenced with type="text/babel"
   - babel.js in-browser transpiler should be loaded before this script
*/
import React, { ChangeEvent } from "react";
import * as XLSX from 'xlsx';









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
    };
    this.handleFile = this.handleFile.bind(this);
    this.exportFile = this.exportFile.bind(this);
    // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa",this.data)
    
  }
  componentDidUpdate(prevProps: SheetJSAppProps, prevState: SheetJSAppState) {
    // Check if the data state has changed
    if (prevState.data !== this.state.data) {
      console.log('Data has been updated:', this.state.data);
    }
  }

  handleFile(file: File) {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e: ProgressEvent<FileReader>) => {
      /* Parse data */
      const bstr = e.target?.result as string;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get the first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      console.log(rABS, wb);
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
    //   this.setState({ data: data, cols: make_cols(refstr) });
    this.setState({ data: data, cols: make_cols(ws["!ref"]!) });

    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }

  exportFile() {
    /* Convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(this.state.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* Generate XLSX file and send to the client */
    XLSX.writeFile(wb, "sheetjs.xlsx");
  }

  render() {
    return (
      <DragDropFile handleFile={this.handleFile}>
        <div className="row">
          <div className="col-xs-12">
            <DataInput handleFile={this.handleFile} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button
              disabled={!this.state.data.length}
              className="btn btn-success"
              onClick={this.exportFile}
            >
              Export
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <OutTable data={this.state.data} cols={this.state.cols} />
         
            
          </div>
          
        </div>
      </DragDropFile>
    );
  }
}

/* -------------------------------------------------------------------------- */

/*
  Simple HTML5 file drag-and-drop wrapper
  usage: <DragDropFile handleFile={handleFile}>...</DragDropFile>
    handleFile(file:File):void;
*/
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

/*
  Simple HTML5 file input wrapper
  usage: <DataInput handleFile={callback} />
    handleFile(file:File):void;
*/
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
      <form className="form-inline">
        <div className="form-group">
          <label htmlFor="file">Spreadsheet</label>
          <input
            type="file"
            className="form-control"
            id="file"
            accept={SheetJSFT}
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}

// ... (previous code)

/*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/
// class OutTable extends React.Component<{ data: any[], cols: any[] }> {
//     render() {
//       return (
//         <div className="table-responsive">
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 {this.props.cols.map(c => (
//                   <th key={c.key}>{c.name}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {this.props.data.map((r, i) => (
//                 <tr key={i}>
//                   {this.props.cols.map(c => (
//                     <td key={c.key}>{r[c.key]}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       );
//     }
//   }

interface RowData {
    id: number;
    name: string;
    // Add other properties as needed
  }
// class OutTable extends React.Component<{ data: any[], cols: any[] }> {
//     handleSave(rowData:RowData) {
//         // Extract the specific data you want to send to the server
//         const postData = {
//           id: rowData.id,
//           name: rowData.name,
//         };
      
      
//         fetch('your-api-endpoint', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(postData),
//         })
//           .then(response => response.json())
//           .then(result => {
//             console.log('Post saved successfully:', result);
//           })
//           .catch(error => {
//             console.error('Error saving post:', error);
//           });
//       }
      
 
//     render() {
        
// //         console.log('Columns:', this.props.cols);
// //   console.log('Data:', this.props.data);
//       return (
//         <div className="table-responsive">
//           <table className="table table-striped" style={{ border: '1px solid black' }}>
//             <thead style={{border:"1px solid black"}}>
//               <tr style={{ border: '1px solid black' }}>
//                 {this.props.cols.map(c => (
//                   <th key={c.key} style={{ border: '1px solid black' }}>
//                     {c.name}
//                     {/* <button
//                       onClick={() => this.handleSave(this.props.data[0][c.key])}
//                     >
//                       Save
//                     </button> */}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody  >
//             {this.props.data.map((r, i) => (
//               <tr key={i} style={{border:"1px solid black"}}>
//                 {this.props.cols.map(c => (
//                   <td key={c.key} style={{ border: '1px solid black' }}>{r[c.key]}</td>
//                 ))}
//                 <td style={{border:"1px solid black"}}>
//                   <button onClick={() => this.handleSave(r)}  style={{backgroundColor:"lightblue",
//                   padding:"px",border:"1px solid black"}}>
//                     Save
//                     </button>
//                 </td>
//               </tr>
//             ))}
//             </tbody>
//           </table>
//         </div>
//       );
//     }
//   }
  // ... (imports and interfaces)

interface SheetJSAppState {
    data: any[];
    cols: any[];
    [key: string]: any; // Allow any additional properties in state
  }
  
  class OutTable extends React.Component<{ data: any[], cols: any[] }, SheetJSAppState> {
    constructor(props: { data: any[]; cols: any[] }) {
      super(props);
      this.state = {
        data: props.data,
        cols: props.cols,
        selectedRows: new Set<number>(),
      };
    }
  
    handleSave = (rowData: any) => {
      
      console.log('Save data:', rowData);
    
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
        <div className="table-responsive">
          <table className="table table-striped" style={{ border: '1px solid black' }}>
            <thead style={{ border: '1px solid black' }}>
              <tr style={{ border: '1px solid black' }}>
                {/* <th>Selected</th> */}
                {this.props.cols.map(c => (
                  <th key={c.key} style={{ border: '1px solid black' }}>
                    {c.name}
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.map((r, i) => (
                <tr key={i} style={{ border: '1px solid black' }}>
                  <td style={{ border: '1px solid black' }}>
                    <input
                      type="checkbox"
                      checked={selectedRows?.has(i)}
                      onChange={() => this.handleCheckboxChange(i)}
                    />
                  </td>
                  {this.props.cols.map(c => (
                    <td key={c.key} style={{ border: '1px solid black' }}>
                      {r[c.key]}
                    </td>
                  ))}
                  <td style={{ border: '1px solid black' }}>
                    <button
                      onClick={() => this.handleSave(r)}
                      style={{ backgroundColor: 'lightblue', padding: 'px', border: '1px solid black' }}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
  
  // ... (rest of the code)
  
  
  /* list of supported file types */
  const SheetJSFT = [
    "xlsx",
    "xlsb",
    "xlsm",
    "xls",
    "xml",
    "csv",
    "txt",
    "ods",
    "fods",
    "uos",
    "sylk",
    "dif",
    "dbf",
    "prn",
    "qpw",
    "123",
    "wb*",
    "wq*",
    "html",
    "htm"
  ]
    .map(function(x) {
      return "." + x;
    })
    .join(",");
  
  /* generate an array of column objects */
  const make_cols = (refstr: string) => {
    let o = [],
      C = XLSX.utils.decode_range(refstr).e.c + 1;
  
    for (var i = 0; i < C; ++i) {
      // Exclude the extra column if it's present at the end
      if (i < 19) {
        o[i] = { name: XLSX.utils.encode_col(i), key: i };
      }
    }
  
    return o;
  };
  
    

  export default SheetJSApp;