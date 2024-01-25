import React, { useState } from 'react';

const YourComponent = () => {
  const [optionName, setOptionName] = useState('Size');
  const [optionValues, setOptionValues] = useState('');
  const [variants, setVariants] = useState<Array<{ optionName: string; optionValues: string[] }>>([]);
  const [showTable, setShowTable] = useState(false);

  const handleOptionNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOptionName(e.target.value);
  };

  const handleOptionValuesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionValues(e.target.value);
  };

  const handleAddVariant = () => {
    if (optionValues.trim() !== '') {
      const newVariant = {
        optionName,
        optionValues: optionValues.split(',').map((value) => value.trim()),
      };
      setVariants([...variants, newVariant]);
      setShowTable(true);
      setOptionValues('');
    }
  };

  return (
    <div className="flex flex-col gap-9">
      {/* Your existing form code here */}
      <div className="rounded-xl border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
        <div className="ml-5">
          <h1 className="font-bold">Variants</h1>
          <br />
          <div className="ml-5">
            <label htmlFor="">Option name</label>
            <div className="p-5">
              <select
                value={optionName}
                onChange={handleOptionNameChange}
                className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-1 mr-4
                px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                dark:focus:border-primary"
              >
                <option value="Size">Size</option>
                <option value="Color">Color</option>
                <option value="Material">Material</option>
                <option value="style">style</option>
              </select>
            </div>
            <br />
            <label htmlFor="" className="font-bold">
              Option values
            </label>
            <div>
              <input
                value={optionValues}
                onChange={handleOptionValuesChange}
                className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-1 mr-4
                px-5 font-medium outline-none transition focus:border-primary active:border-primary 
                disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
                dark:focus:border-primary"
              />
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={handleAddVariant}
            className="bg-primary text-white px-4 py-2 rounded-md mt-4"
          >
            Add Variant
          </button>
        </div>
      </div>

      {showTable && (
        <div className="mt-8">
          <h1 className="font-bold">Variants Table</h1>
          <table className="border-collapse border border-stroke mt-3">
            <thead>
              <tr>
                <th className="border border-stroke p-2">Option Name</th>
                <th className="border border-stroke p-2">Option Values</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((variant, index) => (
                <tr key={index}>
                  <td className="border border-stroke p-2">{variant.optionName}</td>
                  <td className="border border-stroke p-2">{variant.optionValues.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default YourComponent;
