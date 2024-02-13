import React, { useState } from 'react';

interface FormData {
  selectedOption: string;
  inputValue: string;
  dynamicFields: string[];
}

const DropdownFields: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    selectedOption: '',
    inputValue: '',
    dynamicFields: [],
  });

  const [submittedData, setSubmittedData] = useState<{ [key: string]: string[] }>({});
  const [uniqueValuesSet, setUniqueValuesSet] = useState<Set<string>>(new Set());


  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      selectedOption: e.target.value,
      inputValue: '',
      dynamicFields: [],
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      inputValue: e.target.value,
    }));
  
    // Check if the input value is not empty
    if (e.target.value.trim() !== '') {
      // Add a new dynamic field if the last dynamic field is not empty or if there are no dynamic fields
      if (formData.dynamicFields.length === 0 || formData.dynamicFields.slice(-1)[0].trim() !== '') {
        setFormData((prevData) => ({
          ...prevData,
          dynamicFields: [...prevData.dynamicFields, ''],
        }));
      }
    }
  };
  
  

  const handleDynamicFieldChange = (index: number, value: string) => {
    const updatedFields = [...formData.dynamicFields];
  
    // Check if the value is empty
    if (value.trim() === '') {
      // Remove the field if it's not the last one
      if (updatedFields.length > 1) {
        updatedFields.splice(index, 1);
      }
    } else {
      updatedFields[index] = value;
  
      // Add a new dynamic field if the last field is not empty
      if (value.length === 1 && index === updatedFields.length - 1) {
        updatedFields.push('');
      }
    }
  
    setFormData({
      ...formData,
      dynamicFields: updatedFields,
    });
  };

  // const handleSubmit = () => {
  //   const { selectedOption, inputValue, dynamicFields } = formData;
  
  //   // Check if the value already exists for the selected option in the form
  //   const isDuplicateInForm = (dynamicFields || []).includes(inputValue);
  
  //   if (isDuplicateInForm) {
  //     console.log(`Duplicate value for ${selectedOption}: ${inputValue}`);
  //   } else {
  //     setSubmittedData((prevData) => ({
  //       ...prevData,
  //       [selectedOption]: [...(prevData[selectedOption] || []), inputValue, ...dynamicFields],
  //     }));
  //   }
  // };
  const handleSubmit = () => {
    const { selectedOption, inputValue, dynamicFields } = formData;
  
    // Check if the value already exists for the selected option in the form
    const isDuplicateInForm = (dynamicFields || []).includes(inputValue);
  
    // Check if the value already exists for the selected option in the submitted data
    const isDuplicateInSubmittedData = (
      submittedData[selectedOption] || []
    ).includes(inputValue);
  
    if (isDuplicateInForm || isDuplicateInSubmittedData) {
      console.log(`Duplicate value for ${selectedOption}: ${inputValue}`);
    } else {
      setSubmittedData((prevData) => ({
        ...prevData,
        [selectedOption]: [...(prevData[selectedOption] || []), inputValue, ...dynamicFields],
      }));
  
      // Add the value to the Set to keep track of unique values
      setUniqueValuesSet((prevValues) => new Set([...prevValues, inputValue, ...dynamicFields]));
    }
  };
  
  
  
  
  

  return (
    <div>
      <label htmlFor="dropdown">Select Option:</label>
      <select id="dropdown"
       value={formData.selectedOption}
        onChange={handleDropdownChange}
        className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-1 mr-4
        px-5 font-medium outline-none transition focus:border-primary active:border-primary 
        disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
        dark:focus:border-primary"
        >
        <option value="">Select...</option>
        <option value="color">Color</option>
        <option value="size">Size</option>
        {/* Add more options as needed */}
      </select>

      {formData.selectedOption === 'color' || formData.selectedOption === 'size' ? (
        <div>
          <label htmlFor="valueInput">Enter Value:</label>
          <input
            type="text"
            className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-1 mr-4
            px-5 font-medium outline-none transition focus:border-primary active:border-primary 
            disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
            dark:focus:border-primary"
            id="valueInput"
            name="value"
            value={formData.inputValue}
            onChange={handleInputChange}
          />
        </div>
      ) : null}

      {formData.dynamicFields.map((field, index) => (
        <div key={index}>
          <label>Dynamic Field {index + 1}:</label>
          <input
            type="text"
            className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-1 mr-4
            px-5 font-medium outline-none transition focus:border-primary active:border-primary 
            disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
            dark:focus:border-primary"
            value={field}
            onChange={(e) => handleDynamicFieldChange(index, e.target.value)}
          />
        </div>
      ))}

      <button type="button" onClick={handleSubmit}>
        Submit
      </button>

      {Object.keys(submittedData).length > 0 && (
        <div>
         
          <table>
            <thead>
              <tr>
                <th>key</th>
                <th>values</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(submittedData).map(([option, values], index) => (
                <tr key={index}>
                  <td>{option}</td>
                  <td>{values.join(', ')}</td>
                  <td><link rel="stylesheet" href="" />Edite</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DropdownFields;











// import React, { useState } from 'react';

// interface FormData {
//   selectedOption: string;
//   inputValue: string;
//   dynamicFields: string[];
// }

// const DropdownFields: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     selectedOption: '',
//     inputValue: '',
//     dynamicFields: [],
//   });

//   const [submittedData, setSubmittedData] = useState<FormData[]>([]);

//   const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       selectedOption: e.target.value,
//     });
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       inputValue: e.target.value,
//     });

//     if (e.target.value.length === 1) {
//       setFormData((prevData) => ({
//         ...prevData,
//         dynamicFields: [...prevData.dynamicFields, ''],
//       }));
//     }
//   };

  
// const handleDynamicFieldChange = (index: number, value: string) => {
//   const updatedFields = [...formData.dynamicFields];
//   updatedFields[index] = value;

//   // Add a new empty field only if the value is not empty
//   if (value.length === 1) {
//     updatedFields.push('');
//   }

//   setFormData({
//     ...formData,
//     dynamicFields: updatedFields,
//   });

// };
//   const handleSubmit = () => {
//     setSubmittedData((prevData) => [...prevData, { ...formData }]);
//     // You can also reset the form values here if needed
//   };

//   return (
//     <div>
//       <label htmlFor="dropdown">Select Option:</label>
//       <select id="dropdown" value={formData.selectedOption} onChange={handleDropdownChange}>
//         <option value="">Select...</option>
//         <option value="color">Color</option>
//         <option value="size">Size</option>
//         {/* Add more options as needed */}
//       </select>

//       {formData.selectedOption === 'color' || formData.selectedOption === 'size' ? (
//         <div>
//           <label htmlFor="valueInput">Enter Value:</label>
//           <input
//             type="text"
//             id="valueInput"
//             name="value"
//             value={formData.inputValue}
//             onChange={handleInputChange}
//           />
//         </div>
//       ) : null}

//       {formData.dynamicFields.map((field, index) => (
//         <div key={index}>
//           <label>Dynamic Field {index + 1}:</label>
//           <input
//             type="text"
//             value={field}
//             onChange={(e) => handleDynamicFieldChange(index, e.target.value)}
//           />
//         </div>
//       ))}

//       <button type="button" onClick={handleSubmit}>
//         Submit
//       </button>

//       {submittedData.length > 0 && (
//         <div>
//           <h2>Submitted Data:</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Option</th>
//                 <th>Input Value</th>
//                 <th>Dynamic Fields</th>
//               </tr>
//             </thead>
//             <tbody>
//               {submittedData.map((data, index) => (
//                 <tr key={index}>
//                   <td>{data.selectedOption}</td>
//                   <td>{data.inputValue}</td>
//                   <td>{data.dynamicFields.join(', ')}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropdownFields;




























// import React, { useState } from 'react';

// const DropdownFields: React.FC = () => {
//   const [selectedOption, setSelectedOption] = useState<string>('');
//   const [inputValue, setInputValue] = useState<string>('');
//   const [dynamicFields, setDynamicFields] = useState<string[]>([]);

//   const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedOption(e.target.value);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);

//     // Add an empty field when the user starts typing in the input or dynamic fields
//     if (e.target.value.length === 1) {
//       setDynamicFields((prevFields) => [...prevFields, '']);
//     }
//   };

//   return (
//     <div>
//       <label htmlFor="dropdown">Select Option:</label>
//       <select id="dropdown" value={selectedOption} onChange={handleDropdownChange}>
//         <option value="">Select...</option>
//         <option value="color">Color</option>
//         <option value="size">Size</option>
//         {/* Add more options as needed */}
//       </select>

//       {selectedOption === 'color' || selectedOption === 'size' ? (
//         <div>
//           <label htmlFor="valueInput">Enter Value:</label>
//           <input
//             type="text"
//             id="valueInput"
//             name="value"
//             value={inputValue}
//             onChange={handleInputChange}
//           />
//         </div>
//       ) : null}

//       {dynamicFields.map((field, index) => (
//         <div key={index}>
//           <label>Dynamic Field {index + 1}:</label>
//           <input
//             type="text"
//             value={field}
//             onChange={(e) => {
//               const updatedFields = [...dynamicFields];
//               updatedFields[index] = e.target.value;

//               // Add an empty field when the user starts typing in the dynamic field
//               if (e.target.value.length === 1) {
//                 updatedFields.push('');
//               }

//               setDynamicFields(updatedFields);
//             }}
//           />
//         </div>
//       ))}

//       <button type="submit">Submit</button>
//     </div>
//   );
// };

// export default DropdownFields;











// // import Breadcrumb from '../../components/Breadcrumb';
// // import TableFour from '../../components/TableFour';



// // const Users = () => {
// //   return (
// //     <>
// //       <Breadcrumb pageName="Tables" />

// //       <div className="flex flex-col gap-10">
// //          <TableFour/>

         
         

// //       </div>
// //     </>
// //   );
// // };

// // export default Users;
// import React, { useState, ChangeEvent } from "react";

// const App: React.FC = () => {
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);
//   const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
//   const [customColor, setCustomColor] = useState<string>("");

//   const handleSizeChange = (size: string) => {
//     setSelectedSize(size);
//     setSelectedColor(null);
//     setSelectedMaterial(null);
//   };
//   console.log("selectedSize",selectedSize,selectedColor,selectedMaterial,customColor);

//   const handleColorChange = (color: string) => {
//     setSelectedColor(color);
//     setSelectedMaterial(null);
//   };

//   const handleMaterialChange = (material: string) => {
//     setSelectedMaterial(material);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
//       {/* Size Dropdown */}
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Size:
//         </label>
//         <select
//           className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
//           onChange={(e: ChangeEvent<HTMLSelectElement>) =>
//             handleSizeChange(e.target.value)
//           }
//         >
//           <option value="large">Large</option>
//           <option value="medium">Medium</option>
//           <option value="small">Small</option>
//         </select>
//         {selectedSize && (
//           <div className="mt-2 text-gray-600 text-sm">
//             Selected Size: {selectedSize}
//           </div>
//         )}
//       </div>

//       {/* Color Dropdown */}
//       {selectedSize && (
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Color:
//           </label>
//           <select
//             className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
//             onChange={(e: ChangeEvent<HTMLSelectElement>) =>
//               handleColorChange(e.target.value)
//             }
//           >
//             <option value="black">Black</option>
//             <option value="red">Red</option>
//             <option value="blue">Blue</option>
//           </select>
//           <input
//             type="text"
//             placeholder="Custom Color"
//             value={customColor}
//             onChange={(e: ChangeEvent<HTMLInputElement>) =>
//               setCustomColor(e.target.value)
//             }
//             className="mt-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
//           />
//           <button
//             onClick={() => handleColorChange(customColor)}
//             className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
//           >
//             Apply Custom Color
//           </button>
//           {selectedColor && (
//             <div className="mt-2 text-gray-600 text-sm">
//               Selected Color: {selectedColor}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Material Dropdown */}
//       {selectedSize && selectedColor && (
//         <div>
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Material:
//           </label>
//           <select
//             className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
//             onChange={(e: ChangeEvent<HTMLSelectElement>) =>
//               handleMaterialChange(e.target.value)
//             }
//           >
//             <option value="clothes">Clothes</option>
//             <option value="shoes">Shoes</option>
//             <option value="jackets">Jackets</option>
//           </select>
//           {selectedMaterial && (
//             <div className="mt-2 text-gray-600 text-sm">
//               Selected Material: {selectedMaterial}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

























{/* <tbody>
{Object.entries(submittedData).map(
  ([option, values], index) =>
    values.map((value, innerIndex) => (
      <tr key={`${index}-${innerIndex}`}>
        <td className="border font-bold border-stroke p-2">
          {value}
        </td>
        <td className="border font-bold border-stroke p-2">
          <input
            type="text"
            placeholder="type"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
px-5 font-medium outline-none transition focus:border-primary active:border-primary
disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark
dark:bg-form-input dark:focus:border-primary"
            onChange={(e) =>
              handleTableInputChange(
                innerIndex,
                'type',
                e.target.value,
              )
            }
          />
        </td>
        <td className="border font-bold border-stroke p-2">
          <input
            type="text"
            placeholder="type"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
px-5 font-medium outline-none transition focus:border-primary active:border-primary
disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark
dark:bg-form-input dark:focus:border-primary"
            onChange={(e) =>
              handleTableInputChange(
                innerIndex,
                'type',
                e.target.value,
              )
            }
          />
        </td>
        <td className="border font-bold border-stroke p-2">
          <input
            type="text"
            placeholder="0.00"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
px-5 font-medium outline-none transition focus:border-primary active:border-primary
disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark
dark:bg-form-input dark:focus:border-primary"
            onChange={(e) =>
              handleTableInputChange(
                innerIndex,
                'type',
                e.target.value,
              )
            }
          />
        </td>
        <td className="border font-bold border-stroke p-2">
          <input
            type="text"
            placeholder="Kg"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
px-5 font-medium outline-none transition focus:border-primary active:border-primary
disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark
dark:bg-form-input dark:focus:border-primary"
            onChange={(e) =>
              handleTableInputChange(
                innerIndex,
                'type',
                e.target.value,
              )
            }
          />
        </td>
        <td className="border font-bold border-stroke p-2">
          <input
            type="text"
            placeholder="RS 0.00"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
px-5 font-medium outline-none transition focus:border-primary active:border-primary
disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark
dark:bg-form-input dark:focus:border-primary"
            onChange={(e) =>
              handleTableInputChange(
                innerIndex,
                'type',
                e.target.value,
              )
            }
          />
        </td>
        <td className="border font-bold border-stroke p-2">
          <input
            type="text"
            placeholder="Sku"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
px-5 font-medium outline-none transition focus:border-primary active:border-primary
disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark
dark:bg-form-input dark:focus:border-primary"
            onChange={(e) =>
              handleTableInputChange(
                innerIndex,
                'type',
                e.target.value,
              )
            }
          />
        </td>
       
      </tr>
    )),
)}
</tbody> */}