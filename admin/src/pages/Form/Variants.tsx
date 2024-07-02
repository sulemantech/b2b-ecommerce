import React, { useState, ChangeEvent } from 'react';
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import { BiImageAdd } from 'react-icons/bi';
import { IoMdArrowDropdown } from 'react-icons/io';

interface Input {
  id: number;
  value: string;
}

interface DropdownProps {
  selectedOption: string;
  errormessage: string;
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleInputChange: (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  inputs: Input[];
  handleDoneClick: () => void;
  // setObjsizee: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  // setObjcolorr: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
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
  const [istval, setIstval] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [objsize, setObjsize] = useState<Record<string, string[]>>({});
  const [objcolor, setObjcolor] = useState<Record<string, string[]>>({});
  const [mappingDoneSize, setMappingDoneSize] = useState<boolean>(false);
  const [showdd, setShowdd] = useState<boolean>(false);
  const [editsize, setEditsize] = useState<boolean>(false);
  const [editcolor, setEditcolor] = useState<boolean>(false);
  const [showtable, setShowtable] = useState<boolean>(false);
  const [mappingDoneColor, setMappingDoneColor] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [expandedSizes, setExpandedSizes] = useState<Record<string, boolean>>(
    {},
  );

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setErrorMessage('');
    const selectedValue = event.target.value;

    if (
      selectedValue === 'size' &&
      objsize[selectedValue] &&
      objsize[selectedValue].length > 0
    ) {
      setErrorMessage('Size option already selected');
      console.log('Size option already selected');

      return;
    }

    if (
      selectedValue === 'color' &&
      objcolor[selectedValue] &&
      objcolor[selectedValue].length > 0
    ) {
      setErrorMessage('Color option already selected');
      return;
    }

    if (istval === '') {
      setIstval(selectedValue);
    }

    setSelectedOption(selectedValue);
    setInputs([{ id: 0, value: '' }]);

    if (selectedValue === 'size') {
      setEditsize(false);
      setObjsize({ [selectedValue]: [] });
    } else if (selectedValue === 'color') {
      setEditcolor(false);
      setObjcolor({ [selectedValue]: [] });
    }
    console.log('select option', selectedValue);
  };

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const newInputs = inputs.map((input, i) =>
      i === index ? { ...input, value: event.target.value } : input,
    );

    setInputs(newInputs);

    if (selectedOption === 'size') {
      setObjsize((prevObj) => ({
        ...prevObj,
        [selectedOption]: newInputs.map((input) => input.value),
      }));
    } else if (selectedOption === 'color') {
      setObjcolor((prevObj) => ({
        ...prevObj,
        [selectedOption]: newInputs.map((input) => input.value),
      }));
    }

    if (index === inputs.length - 1 && inputs.length === index + 1) {
      addInput();
    }
  };

  const addInput = () => {
    setInputs((prevInputs) => [
      ...prevInputs,
      { id: prevInputs.length, value: '' },
    ]);
  };

  const handleBtnClick = (sizeIndex: string) => {
    setExpandedSizes((prevExpandedSizes) => ({
      ...prevExpandedSizes,
      [sizeIndex]: !prevExpandedSizes[sizeIndex],
    }));
  };

  const handleDoneClick = () => {
    setObjcolorr(objcolor);
    setObjsizee(objsize);
    setInputs([]);
    setSelectedOption('');
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
      <div className="font-mono w-full bg-[#ffffffd8] rounded-lg shadow-md overflow-hidden">
        <div className="px-4">
          <div className="font-semibold p-2">Variants</div>

          <div className="font-mono w-full bg-[#ffffffd8] border border-[#c4c4c4] rounded-lg mb-4">
            <div className="">
              {editsize && <OptionList title="Sizes" data={objsize} />}
              {/* <hr className="text-[#c4c4c4]" /> */}
              {editcolor && <OptionList title="Colors" data={objcolor} />}
            </div>

            {showdd ? (
              <div className="w-full bg-white p-6 rounded-lg flex flex-col space-y-4">
                <DropdownSelect
                  selectedOption={selectedOption}
                  handleSelectChange={handleSelectChange}
                  handleInputChange={handleInputChange}
                  inputs={inputs}
                  handleDoneClick={handleDoneClick}
                  errormessage={errorMessage}
                />
              </div>
            ) : (
              <div
                onClick={addNewVariant}
                className="flex cursor-pointer  items-center w-full h-14 text-start text-sm font-semibold border-none border-[#c4c4c4] border-t-0 rounded-b-md p-2 pl-8"
              >
               <p className='hover:text-black border-none duration-1000 transition-all'> + Add new variants like size or color</p>
              </div>
            )}
          </div>
        </div>
        {showtable && (
          <>
            <div className="w-full p-2">
              <div className="flex items-center w-fit space-x-4">
                <span className="ml-4 text-gray-700 text-xs font-medium">
                  Group BY
                </span>

                <select
                  value={istval}
                  onChange={(e) => {
                    setIstval(e.target.value);
                    console.log(istval);
                  }}
                  className="border text-xs border-gray-300 rounded-lg p-1 text-gray-700 focus:outline-none focus:shadow-inner transition duration-300 ease-in-out"
                >
                  {/* <option disabled value="">
                      Select value
                    </option> */}
                  <option className="text-xs px-4 font-semibold" value="color">
                    Color
                  </option>
                  <option className="text-xs px-4 font-semibold" value="size">
                    Size
                  </option>
                </select>
              </div>
            </div>
            <table className="w-[100%]">
              <thead className="border-t bg-[#e7e7e7] border-[#c4c4c4] m-4">
                <tr className="rounded-t-md">
                  <th className="w-[5%] p-2">
                    <input type="checkbox" />
                  </th>
                  <th className="w-[45%] text-start text-sm font-bold p-2">
                    Variant
                  </th>
                  <th className="w-[20%] text-start text-sm font-bold p-2">
                    Price
                  </th>
                  <th className="w-[10%] text-start text-sm font-bold p-2 ">
                    Available
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {mappingDoneSize &&
                  Object.entries(istval === 'size' ? objsize : objcolor).map(
                    ([optionKey, optionValues]) =>
                      optionValues
                        .filter((optionValue) => optionValue !== '')
                        .map((optionValue, optionIndex) => {
                          const totalSize = Object.values(
                            istval === 'size' ? objcolor : objsize,
                          ).flat().length;

                          return (
                            <React.Fragment key={`${optionKey}-${optionIndex}`}>
                              <tr
                                className="border-t border-[#c4c4c4] cursor-pointer hover:bg-[#f7f7f7] relative"
                                onClick={() =>
                                  handleBtnClick(`${optionKey}-${optionIndex}`)
                                }
                              >
                                <td className="">
                                  <input className="w-full" type="checkbox" />
                                </td>
                                <td className="text-start text-sm font-medium py-3 relative">
                                  <div className="flex items-center gap-1">
                                    <span
                                      className="relative w-10 h-10 bg-white flex items-center justify-center border border-dashed rounded-md z-20"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <BiImageAdd className="w-5 h-5 mt-0.5 ml-[2px]" />
                                      <input
                                        className="absolute w-10 h-10 opacity-0"
                                        type="file"
                                        src=""
                                        alt=""
                                      />
                                    </span>
                                    <div>
                                      {optionValue}
                                      {totalSize > 0 && (
                                        <p className="relative text-xs">
                                          {totalSize - 1} Variants
                                          <IoMdArrowDropdown
                                            className={`w-4 h-4 ml-4 absolute top-[1px] right-[-16px] transition-transform duration-500 ${expandedSizes[`${optionKey}-${optionIndex}`] ? 'rotate-[180deg]' : 'rotate-[0deg]'}`}
                                          />
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="relative px-2 py-2 text-center text-sm text-black">
                                  <input
                                    placeholder="0.00"
                                    className="border w-full rounded-xl py-1.5 pl-8 placeholder:text-black placeholder:opacity-70 border-[#8a8a8a]"
                                    type="text"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <p className="absolute top-5.5 left-4.5">
                                    Rs
                                  </p>
                                </td>
                                <td className="px-2 py-2 text-center">
                                  <input
                                    placeholder="0"
                                    className="border w-full rounded-xl py-1 pl-2 placeholder:text-black placeholder:opacity-70 border-[#8a8a8a]"
                                    type="text"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </td>
                              </tr>
                              {expandedSizes[`${optionKey}-${optionIndex}`] &&
                                Object.entries(
                                  istval === 'size' ? objcolor : objsize,
                                ).map(
                                  ([
                                    secondaryOptionKey,
                                    secondaryOptionValues,
                                  ]) =>
                                    secondaryOptionValues
                                      .filter(
                                        (secondaryOptionValue) =>
                                          secondaryOptionValue !== '',
                                      )
                                      .map(
                                        (
                                          secondaryOptionValue,
                                          secondaryOptionIndex,
                                        ) => (
                                          <tr
                                            key={`${secondaryOptionKey}-${secondaryOptionIndex}`}
                                            className="border-[1.8px] border-[#e7e7e7] border-l-0 border-r-0 hover:bg-[#f7f7f7]"
                                          >
                                            <td className="">
                                              <input
                                                className="w-full ml-4"
                                                type="checkbox"
                                              />
                                            </td>
                                            <td className="text-start text-sm font-medium py-3">
                                              <div className="ml-5 flex items-center gap-1">
                                                <span className="w-10 h-10 bg-white flex items-center justify-center border border-dashed rounded-md">
                                                  <BiImageAdd className="w-5 h-5 mt-0.5 ml-[2px]" />
                                                  <img src="" alt="" />
                                                </span>
                                                <input
                                                  type="image"
                                                  src=""
                                                  alt=""
                                                />
                                                {secondaryOptionValue}
                                              </div>
                                            </td>
                                            <td className="relative px-2 py-2 shadow-sm text-center text-sm text-black">
                                              <input
                                                placeholder="0.00"
                                                className="border w-full rounded-xl py-1.5 pl-8 placeholder:text-black placeholder:opacity-70 border-[#8a8a8a]"
                                                type="text"
                                              />
                                              <p className="absolute top-5.5 left-4.5">
                                                Rs
                                              </p>
                                            </td>
                                            <td className="px-2 py-2 shadow-sm text-center">
                                              <input
                                                placeholder="0"
                                                className="border w-full rounded-xl py-1 pl-2 placeholder:text-black placeholder:opacity-70 border-[#8a8a8a]"
                                                type="text"
                                              />
                                            </td>
                                          </tr>
                                        ),
                                      ),
                                )}
                            </React.Fragment>
                          );
                        }),
                  )}
              </tbody>
            </table>
          </>
        )}
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
  errormessage,
}) => (
  <div className="w-full flex flex-col">
    <div className="">
      <div className="flex">
        <div className="items-center mt-1 w-10 h-6"></div>
        <p className="text-sm font-semibold">Option name</p>
      </div>
      <div className="flex">
        <div className="items-center mt-2 w-10 h-6">
          <PiDotsSixVerticalBold className="w-6 h-5 cursor-pointer" />
        </div>
        <select
          value={selectedOption}
          onChange={handleSelectChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-primary transition duration-300 ease-in-out"
        >
          <option disabled value="">
            Select Variants
          </option>
          <option value="size">Size</option>
          <option value="color">Color</option>
        </select>
      </div>
    </div>

    <div className="w-full">
      <p className="text-sm ml-10 font-semibold text-meta-1">{errormessage}</p>
      <div className="flex mt-2">
        <div className="items-center mt-1 w-10 h-6"></div>
        {inputs.length > 0 && (
          <p className="text-sm font-semibold">Option Value</p>
        )}
      </div>
    </div>
    {inputs.map((input, index) => (
      <div className="flex mb-3">
        <div className="items-center mt-2 w-10 h-6">
          <PiDotsSixVerticalBold className="w-6 h-5 cursor-pointer" />
        </div>
        <input
          key={index}
          type="text"
          value={input.value}
          onChange={(event) => handleInputChange(index, event)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-primary transition duration-300 ease-in-out"
        />
      </div>
    ))}
    <div className="flex items-center justify-between grow gap-1 rounded-md py-1 px-1 pl-10">
      <button className="border border-body text-xs text-[#991b1b] font-semibold rounded-md py-[4.8px] px-2.5">
        Delete
      </button>
      <button
        onClick={handleDoneClick}
        className="border text-xs text-white bg-black shadow-inner shadow-[#ffffff80] font-semibold rounded-md py-1.5 px-2.5 transition duration-300 ease-in-out"
      >
        Done
      </button>
    </div>
  </div>
);

interface OptionListProps {
  title: string;
  data: Record<string, string[]>;
}

const OptionList: React.FC<OptionListProps> = ({ title, data }) => (
  <div className="flex items-center justify-center p-5 border-b border-[#c4c4c4]">
    <PiDotsSixVerticalBold className="w-6" />
    <div className="bg-white rounded-tr-lg w-full">
      <div className="flex items-center justify-between gap-2">
        <div className="w-4 h-6"></div>
        <h3 className="grow text-lg font-semibold mb-2">{title}</h3>
        <button className="border text-xs font-semibold rounded-md p-1 px-3">
          Edit
        </button>
      </div>
      <ul>
        {Object.entries(data).map(([key, values]) => {
          // Filter out empty values
          const filteredValues = values.filter((value) => value !== '');

          return (
            <li key={key}>
              <strong className="bg-[#ebebeb]"></strong>
              <div className="flex items-center justify-between gap-2">
                <div className="w-4 h-6"></div>
                <div className="grow flex space-x-2">
                  {filteredValues.length > 0
                    ? filteredValues.map((value, index) => (
                        <div
                          className="text-xs font-semibold text-[#64748bcf] px-2 rounded-lg bg-[#ebebeb]"
                          key={index}
                        >
                          {value}
                        </div>
                      ))
                    : filteredValues.join(', ')}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);

export default Dropdown;