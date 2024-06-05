import React, { useState, ChangeEvent } from "react";

interface Input {
  id: number;
  value: string;
}

interface DropdownProps {
  selectedOption: string;
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleInputChange: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
  inputs: Input[];
  handleDoneClick: () => void;
}

interface Dropdown {
  setObjsizee: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  setObjcolorr: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
}

interface OptionListProps {
  title: string;
  data: Record<string, string[]>;
}

const Dropdown: React.FC<Dropdown> = ({ setObjsizee, setObjcolorr }) => {
  const [inputs, setInputs] = useState<Input[]>([]);
  const [istval, setIstval] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [objsize, setObjsize] = useState<Record<string, string[]>>({});
  const [objcolor, setObjcolor] = useState<Record<string, string[]>>({});
  const [mappingDoneSize, setMappingDoneSize] = useState<boolean>(false);
  const [showdd, setShowdd] = useState<boolean>(false);
  const [editsize, setEditsize] = useState<boolean>(false);
  const [editcolor, setEditcolor] = useState<boolean>(false);
  const [showtable, setShowtable] = useState<boolean>(false);
  const [mappingDoneColor, setMappingDoneColor] = useState<boolean>(false);
  const [expandedSizes, setExpandedSizes] = useState<Record<string, boolean>>({});

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (istval === "") {
      setIstval(selectedValue);
    }
    setSelectedOption(selectedValue);
    setInputs([{ id: 0, value: "" }]);
    if (selectedValue === "size") {
      setEditsize(false);
      setObjsize((prev) => ({ ...prev, [selectedValue]: [] }));
    } else if (selectedValue === "color") {
      setEditcolor(false);
      setObjcolor((prev) => ({ ...prev, [selectedValue]: [] }));
    }
  };

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newInputs = inputs.map((input, i) =>
      i === index ? { ...input, value: event.target.value } : input
    );

    setInputs(newInputs);

    if (selectedOption === "size") {
      setObjsize((prevObj) => ({
        ...prevObj,
        [selectedOption]: [
          ...(prevObj[selectedOption] || []),
          event.target.value
        ]
      }));
    } else if (selectedOption === "color") {
      setObjcolor((prevObj) => ({
        ...prevObj,
        [selectedOption]: [
          ...(prevObj[selectedOption] || []),
          event.target.value
        ]
      }));
    }

    if (index === inputs.length - 1 && inputs.length === index + 1) {
      addInput();
    }
  };

  const addInput = () => {
    setInputs((prevInputs) => [
      ...prevInputs,
      { id: prevInputs.length, value: "" },
    ]);
  };

  const handleBtnClick = (sizeIndex: string) => {
    setExpandedSizes((prevExpandedSizes) => ({
      ...prevExpandedSizes,
      [sizeIndex]: !prevExpandedSizes[sizeIndex],
    }));
  };

  const handleDoneClick = () => {
    setObjcolorr(objcolor)
    setObjsizee(objsize)
    setInputs([]);
    setSelectedOption("");
    setShowtable(true);
    setShowdd(false);

    if (Object.keys(objsize).length > 0) {
      setEditsize(true);
    }
    if (Object.keys(objcolor).length > 0) {
      setEditcolor(true);
    }

    setMappingDoneSize(true);
    setMappingDoneColor(true);
  };

  const addNewVariant = () => {
    setShowdd(true);
  };

  return (
    <>
      <div className="font-mono w-[60vw] m-auto border bg-[#ffffffd8] shadow-md rounded-lg mt-10 ">
        <span className=" p-2">Variants</span>
        {editsize && <OptionList title="Size" data={objsize} />}
        {editcolor && <OptionList title="Colors" data={objcolor} />}

        <div className="font-mono m-auto bg-[#fffff] flex items-center justify-center flex-col mt-3 ">
          {showdd ? (
            <div className="w-full mx-6 bg-white p-6 rounded shadow-md flex flex-col space-y-4">
              <DropdownSelect
                selectedOption={selectedOption}
                handleSelectChange={handleSelectChange}
                handleInputChange={handleInputChange}
                inputs={inputs}
                handleDoneClick={handleDoneClick}
              />
            </div>
          ) : (
            <p
              onClick={addNewVariant}
              className="text-blue-600 p-2 underline font-medium text-[14px] cursor-pointer w-full text-left"
            >
              + Add new variants Size/Colors
            </p>
          )}

          {showtable && (
            <>
              <div className="w-full p-2">
                <div className="flex items-center w-fit space-x-4">
                  <span className="text-gray-700 font-medium">Group BY</span>
                  <select
                    value={istval}
                    onChange={(e) => {
                      setIstval(e.target.value);
                      console.log(istval);
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-primary transition duration-300 ease-in-out"
                  >
                    <option disabled value="">
                      Select value
                    </option>
                    <option value="size">Size</option>
                    <option value="color">Color</option>
                  </select>
                </div>
              </div>
              <table className="overflow-hidden rounded-md w-full">
                <thead className="border-[1.8px] bg-gray-100 border-[#ebebeb] m-4">
                  <tr className="rounded-t-md">
                    <th className="w-[5%]">
                      <input type="checkbox" />
                    </th>
                    <th className="w-[65%] text-start text-sm font-bold p-2">
                      Variant
                    </th>
                    <th className="w-[400px] text-start text-sm font-bold p-2">
                      Price
                    </th>
                    <th className="w-[200px] text-start text-sm font-bold p-2">
                      Available
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {mappingDoneSize &&
                    Object.entries(istval === "size" ? objsize : objcolor).map(
                      ([optionKey, optionValues]) =>
                        optionValues
                          .filter((optionValue) => optionValue !== "")
                          .map((optionValue, optionIndex) => (
                            <React.Fragment key={`${optionKey}-${optionIndex}`}>
                              <tr
                                onClick={() =>
                                  handleBtnClick(`${optionKey}-${optionIndex}`)
                                }
                                className="border-[1.8px] border-[#ebebeb] cursor-pointer hover:bg-slate-200"
                              >
                                <td className="w-[5%]">
                                  <input type="checkbox" />
                                </td>
                                <td className="text-start text-sm font-medium p-2">
                                  <input type="image" src="" alt="" />
                                  {optionValue}
                                </td>
                                <td className="px-5 py-2 shadow-sm text-center">
                                  <input
                                    placeholder="Rs. 0.00"
                                    className="border rounded-xl py-1 pl-4 placeholder:text-black placeholder:opacity-70 border-black"
                                    type="text"
                                  />
                                </td>
                                <td className="px-5 py-2 shadow-sm text-center">
                                  <input
                                    placeholder="0"
                                    className="border rounded-xl py-1 pl-4 placeholder:text-black placeholder:opacity-70 border-black"
                                    type="text"
                                  />
                                </td>
                              </tr>
                              {expandedSizes[`${optionKey}-${optionIndex}`] &&
                                Object.entries(
                                  istval === "size" ? objcolor : objsize
                                ).map(
                                  ([
                                    secondaryOptionKey,
                                    secondaryOptionValues,
                                  ]) =>
                                    secondaryOptionValues
                                      .filter(
                                        (secondaryOptionValue) =>
                                          secondaryOptionValue !== ""
                                      )
                                      .map(
                                        (
                                          secondaryOptionValue,
                                          secondaryOptionIndex
                                        ) => (
                                          <tr
                                            key={`${secondaryOptionKey}-${secondaryOptionIndex}`}
                                            className="border-[1.8px] border-[#ebebeb] cursor-pointer hover:bg-slate-200"
                                          >
                                            <td className="w-[5%]">
                                              <input type="checkbox" />
                                            </td>
                                            <td className="text-start text-sm font-medium p-2">
                                              <input
                                                type="image"
                                                src=""
                                                alt=""
                                              />
                                              {`${optionValue}-${secondaryOptionValue}`}
                                            </td>
                                            <td className="px-5 py-2 shadow-sm text-center">
                                              <input
                                                placeholder="Rs. 0.00"
                                                className="border rounded-xl py-1 pl-4 placeholder:text-black placeholder:opacity-70 border-black"
                                                type="text"
                                              />
                                            </td>
                                            <td className="px-5 py-2 shadow-sm text-center">
                                              <input
                                                placeholder="0"
                                                className="border rounded-xl py-1 pl-4 placeholder:text-black placeholder:opacity-70 border-black"
                                                type="text"
                                              />
                                            </td>
                                          </tr>
                                        )
                                      )
                                )}
                            </React.Fragment>
                          ))
                    )}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const DropdownSelect: React.FC<DropdownProps> = ({
  selectedOption,
  handleSelectChange,
  handleInputChange,
  inputs,
  handleDoneClick,
}) => {
  return (
    <>
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-primary transition duration-300 ease-in-out"
      >
        <option disabled value="">
          Select option
        </option>
        <option value="size">Size</option>
        <option value="color">Color</option>
      </select>
      {inputs.map((input, index) => (
        <input
          key={input.id}
          type="text"
          value={input.value}
          onChange={(event) => handleInputChange(index, event)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-primary transition duration-300 ease-in-out"
        />
      ))}
      <button
        onClick={handleDoneClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Done
      </button>
    </>
  );
};

const OptionList: React.FC<OptionListProps> = ({ title, data }) => {
  return (
    <div className="w-full mx-6 bg-white p-6 rounded shadow-md flex flex-col space-y-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <ul>
        {Object.entries(data).map(([optionKey, optionValues]) =>
          optionValues.map(
            (optionValue, optionIndex) =>
              optionValue && (
                <li key={`${optionKey}-${optionIndex}`}>
                  {`${optionKey}: ${optionValue}`}
                </li>
              )
          )
        )}
      </ul>
    </div>
  );
};

export default Dropdown;
