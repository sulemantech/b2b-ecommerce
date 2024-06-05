import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from 'react';
import { useNavigate } from "react-router-dom";




interface UpdateProductProps {}
interface ProductVariant {
  key: string;
  id: number;
  options: string;
  values: string;
  type:string;
  availableQuantity: string;
  variantPrice:number;
  unit: string;
  weight: number;
  optionValues: {
    id: number;
    name: string;
    variantSku: string[];
  }[];

  [key: string]: any;
}
interface FormData {
  selectedOption: string;
  inputValue: string;
  dynamicFields: string[];
}

interface OptionValue {
  id: string;
  name: string;
  variantSku: string[];
}

const UpdateProduct: React.FC<UpdateProductProps> = () => {



  const [submittedData, setSubmittedData] = useState<{ [key: string]: string[]; }>({});
  const [, setUniqueValuesSet] = useState<Set<string>>(new Set());
  const [, setDropdownVisible] = useState<boolean>(true);
  const [tableInputValues, setTableInputValues] = useState< Array<{ [key: string]: string }>>([]);
  const [formData, setFormData] = useState<FormData>({
    selectedOption: '',
    inputValue: '',
    dynamicFields: [],
  });
  const [_, setEditorContent] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const handleEditorChange = (_: any, editor: any) => {
    const content = editor.getData();
    setEditorContent(content);
  };

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
    if (e.target.value.trim() !== '') {
      if (
        formData.dynamicFields.length === 0 ||
        formData.dynamicFields.slice(-1)[0].trim() !== ''
      ) {
        setFormData((prevData) => ({
          ...prevData,
          dynamicFields: [...prevData.dynamicFields, ''],
        }));
      }
    }
  };

  const handleDynamicFieldChange = (index: number, value: string) => {
    const updatedFields = [...formData.dynamicFields];
    if (value.trim() === '') {
      if (updatedFields.length > 1) {
        updatedFields.splice(index, 1);
      }
    } else {
      updatedFields[index] = value;
      if (value.length === 1 && index === updatedFields.length - 1) {
        updatedFields.push('');
      }
    }

    setFormData({
      ...formData,
      dynamicFields: updatedFields,
    });
  };

  const handleSubmit = () => {
    const { selectedOption, inputValue, dynamicFields } = formData;
    const isDuplicateInForm = (dynamicFields || []).includes(inputValue);
    const isDuplicateInSubmittedData = (
      submittedData[selectedOption] || []
    ).includes(inputValue);
    const nonEmptyDynamicFields = dynamicFields.filter(
      (field) => field.trim() !== '',
    );
    if (isDuplicateInForm || isDuplicateInSubmittedData) {
      console.log(`Duplicate value for ${selectedOption}: ${inputValue}`);
    } else {
      setSubmittedData((prevData) => ({
        ...prevData,
        [selectedOption]: [
          ...(prevData[selectedOption] || []),
          inputValue,
          ...nonEmptyDynamicFields,
        ],
      }));
      setUniqueValuesSet(
        (prevValues) =>
          new Set([...prevValues, inputValue, ...nonEmptyDynamicFields]),
      );
      setDropdownVisible(false);
      setTableInputValues([]);
    }
  };

  const handleTableInputChange = (
    outerIndex: number,
    property: string,
    value: string,
  ) => {
    const updatedInputValues = [...tableInputValues];
    updatedInputValues[outerIndex] = { ...updatedInputValues[outerIndex] };
    updatedInputValues[outerIndex][property] = value;
    setTableInputValues(updatedInputValues);
    console.log('Table Input Values:', tableInputValues);
  };









  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [SalePrice, setSalePrice] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [quantity, setQuantity] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [discount, setDiscount] = useState('');
  const [, setNewFlag] = useState('');
  const [rating, setRating] = useState('');
  const [, setSaleCount] = useState('');
  const [tag, setTag] = useState('');
  const [stock, setStock] = useState('');
  const [quantityInStock, setQuantityInStock] = useState('');
  const [sku, setSku] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [supplier_id, setSupplierId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [status, setStatus] = useState('');
  const [productImages, setProductImages] = useState<[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  const handleOptionChange = (
    e: ChangeEvent<HTMLInputElement>,
    variantIndex: number,
    optionIndex: number,
    field: keyof OptionValue,
  ) => {
    const updatedVariants = [...variants];
    (updatedVariants[variantIndex].optionValues[optionIndex][
      field
    ] as string[]) = [e.target.value];
    setVariants(updatedVariants);
  };




  const handleVariantChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    fieldName: string,
  ) => {
    const newValue: string = e.target.value;
    setVariants((prevVariants) => {
      const updatedVariants: ProductVariant[] = [...prevVariants];
      updatedVariants[index][fieldName] = newValue.split(', ');
      return updatedVariants;
    });
  };

  

 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}/api/products/specific/${id}`,
        );
        const product = response.data;
        setName(product.name || '');
        setDescription(product.description || '');
        setSalePrice(product.SalePrice || '');
        setPrice(product.price || '');
        setWeight(product.weight || '');
        setQuantity(product.quantity || '');
        setManufacturer(product.manufacturer || '');
        setDiscount(product.discount || '');
        setNewFlag(product.new || '');
        setRating(product.rating || '');
        setSaleCount(product.saleCount || '');
        setTag(product.tag ? product.tag.join(',') : '');
        setStock(product.stock || '');
        setQuantityInStock(product.quantityInStock || '');
        setSku(product.sku || '');
        setCategoryId(product.category_id || '');
        setSupplierId(product.supplier_id || '');
        setCategoryName(product.categoryName || '');
        setStatus(product.status || '');
        setProductImages(
          (product.productImages && product.productImages[0]?.images) || [],
        );
     
        if (product.productVariants) {
          const variantsData = product.productVariants.map(
            (variant: {
              key: string;
              value: string | null;
              type:number |null;
              availableQuantity: string | null;
              variantPrice:number|null;
              unit: string | null;
              weight: number | null;
              id: number | null;
              optionValues: {
                id: string;
                name: string[];
                variantSku: string[];
              }[];
            }) => ({
              key: variant.key || '',
              availableQuantity: variant.availableQuantity || '',
              variantPrice:variant.variantPrice || '',
              unit: variant.unit || '',
              values: Array.isArray(variant.value) ? variant.value : (variant.value ? JSON.parse(variant.value) : []),
              type:variant.type || '',
              id: variant.id || '',
              weight: variant.weight || '',
              optionValues: variant.optionValues.map((optionValue) => ({
                id: optionValue.id,
                name: Array.isArray(optionValue.name) ? optionValue.name[0] : optionValue.name,
                variantSku: optionValue.variantSku,
              })),
            
            }),
          );
          setVariants(variantsData);
          console.log('variant', variantsData);
        }
        
        
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
  
    fetchProduct();
  }, [id]);

  
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}/api/products/${id}`,
        {
          products: {
            name,
            description,
            price,
            SalePrice,
            quantity,
            manufacturer,
            discount,
            new: true,
            rating,
            saleCount: 20,
            tag: tag.split(',').map((t) => t.trim()),
            stock,
            quantityInStock,
            sku,
            category_id,
            supplier_id,
            status,
            categoryName,
          },
          variants: variants,
        },
        );
        console.log(response.data);
        navigate('/products');
      
      
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

//****DEleteVariants*****

async function deleteVariant(variantId: number) {
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}/api/products/variants/${variantId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message || 'Failed to delete variant.');
    }

    console.log('Variant deleted successfully.');
    const newVariants = variants.filter(variant => variant.id !== variantId);
    setVariants(newVariants);
  } catch (error) {
    console.error('Error:', error);
  }
}


  // ****DEleteImage***********
  const handleDeleteImage = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST}/productImages/${id}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Image deleted successfully:', result);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <>
    {/* <Breadcrumb pageName="Product Update" /> */}
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-[2fr,1fr]">
        <div className="flex flex-col gap-9">
          <div className="rounded-xl border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
            <label className="ml-5 font-bold">Title</label>
            <div className="ml-5">
              <input
                type="text"
                placeholder="name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1
              px-5 font-medium outline-none transition focus:border-primary active:border-primary 
             disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
             dark:bg-form-input dark:focus:border-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <br />
            <div className="ml-5 font-bold">
              <label htmlFor="">Description</label>
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={handleEditorChange}
              />
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Image
                    </th>
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Name
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Remove
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      AddNew
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="h-12.5 w-15 rounded-md">
                          {productImages.map((imageUrl, index) => (
                            <img
                              key={index}
                              src={import.meta.env.VITE_REACT_APP_RESOURCE_SERVER_HOST + imageUrl}
                              alt={`Product Image ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-sm text-black dark:text-white">
                        {name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <button
                        className="hover:text-primary"
                        onClick={handleDeleteImage}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                            fill=""
                          />
                          <path
                            d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                            fill=""
                          />
                          <path
                            d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                            fill=""
                          />
                          <path
                            d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                            fill=""
                          />
                        </svg>
                      </button>
                    </td>
                    <td>
                      <Link
                        to={`/forms/form-elements/`}
                        className="bg-blue hover:bg-blue-700 font-bold py-2 px-4 rounded-full"
                      >
                        AddNew
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-9 ">
            <div className="rounded-xl border-stroke  bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5.5 p-6.5">
                <div>
                  <label className="font-bold" htmlFor="">
                    Price
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="RS 0.00"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
              px-5 font-medium outline-none transition focus:border-primary active:border-primary
             disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark
             dark:bg-form-input dark:focus:border-primary"
                    value={SalePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-bold" htmlFor="">
                    Compare-at price
                  </label>
                  <br />

                  <input
                    type="text"
                    placeholder=" Rs 0.00"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
             px-5 font-medium outline-none transition focus:border-primary active:border-primary
            disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
             dark:focus:border-primary"
             value={price}
             onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5.5 p-6.5">
                <div>
                  <label className="font-bold" htmlFor="">
                    Cost per item
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="RS 0.00"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
              px-5 font-medium outline-none transition focus:border-primary active:border-primary
             disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark
             dark:bg-form-input dark:focus:border-primary"
                    //  onChange={(e)=>setvalues({...value,name: e.target.value})}
                    //  value={value.name}
                  />
                </div>
                <div>
                  <label className="font-bold" htmlFor="">
                    Profit
                  </label>
                  <br />

                  <input
                    type="text"
                    placeholder="--"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent 
             px-5 font-medium outline-none transition focus:border-primary active:border-primary
            disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
             dark:focus:border-primary"
                    //      onChange={(e)=>setvalues({...value, categoryName: e.target.value})}
                    //      value={value. categoryName}
                  />
                </div>
                <div>
                  <label className="font-bold" htmlFor="">
                    Margin
                  </label>
                  <input
                    type="text"
                    placeholder="--"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent
             px-5 font-medium outline-none transition focus:border-primary active:border-primary
            disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
             dark:focus:border-primary"
                    //      onChange={(e)=>setvalues({...value, categoryName: e.target.value})}
                    //      value={value. categoryName}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-9 ">
            <div className="rounded-xl border-stroke  bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
              <div className="ml-5">
                <h1 className="font-bold">Inventory</h1>
                <br />
                <div className="flex">
                  <input type="checkbox" className="w-4" />
                  <p className="ml-2 font-bold">Track quantity</p>
                </div>
                <br />

                <h2 className="font-bold">Quantity</h2>
                <hr />
                <br />

                <div className="flex justify-between">
                  <div>
                    <h1 className="text-lg">Shop location</h1>
                  </div>

                  <div>
                    <input
                      value={quantity}
                      type="number"
                      placeholder="0"
                      className="w-30 rounded-lg border-[1.5px] border-stroke bg-transparent 
             px-5 font-medium outline-none transition focus:border-primary active:border-primary
            disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
             dark:focus:border-primary"
                    />
                  </div>
                </div>
                <br />

                <br />
                <div className="flex">
                  <input type="checkbox" className="w-4" />
                  <h3 className="ml-2">This product has a SKU or barcode</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-9 ">
            <div className="rounded-xl border-stroke  bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
              <div className="ml-5">
                <h1 className="font-bold">Shipping</h1>
                <br />
                <div className="flex">
                  <input type="checkbox" className="w-4" />
                  <h3 className="ml-2">This is a physical product</h3>
                </div>
                <br />
                <label htmlFor="" className="font-bold">
                  Weight
                </label>
                <div>
                  <input
                    type="number"
                    placeholder="0.0"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-30 rounded-lg border-[1.5px] border-stroke bg-transparent 
        px-5 font-medium outline-none transition focus:border-primary active:border-primary
       disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
        dark:focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="rounded-xl border-stroke  bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
              <h1 className="font-bold">Variants</h1>
              <hr />
              <div className="mt-5 border-bodydark border-opacity-20 border-4 p-5">
                <h1>Option name</h1>
                <select
                  style={{ background: 'lightgray' }}
                  id="dropdown"
                  value={formData.selectedOption}
                  onChange={handleDropdownChange}
                  className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-1 mr-4
        px-5  bg-black font-medium outline-none transition focus:border-primary active:border-primary 
        disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
        dark:focus:border-primary"
                >
                  <option value="color">select-</option>
                  <option value="color">Color</option>
                  <option value="size">Size</option>
                  {/* Add more options as needed */}
                </select>
                <br />
                <br />

                {formData.selectedOption === 'color' ||
                formData.selectedOption === 'size' ? (
                  <div>
                    <h1 className="font-bold">Option Value</h1>
                    <input
                      style={{ background: 'lightgray' }}
                      type="text"
                      className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-1 mr-4
            px-3 font-medium outline-none transition focus:border-primary active:border-primary 
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
                    <input
                      style={{ background: 'lightgray' }}
                      type="text"
                      placeholder="Add another value"
                      className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-1 mr-4
            px-5 font-medium outline-none transition focus:border-primary active:border-primary 
            disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
            dark:focus:border-primary"
                      value={field}
                      onChange={(e) =>
                        handleDynamicFieldChange(index, e.target.value)
                      }
                    />
                  </div>
                ))}
                <br />
                <br />

                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md
        bg-black p-1  text-center font-medium text-white hover:bg-opacity-90 "
                  onClick={handleSubmit}
                >
                  Add New
                </button>
                <br />
                <br />
              </div>

              <div className="Parent ">
                <div className="table mt-5">
                  {Object.keys(submittedData).length > 0 && (
                    <div>
                      <table>
                        <thead>
                          <tr>
                            <th className="border font-bold border-stroke p-2">
                              Value
                            </th>
                            <th className="border font-bold border-stroke p-2">
                              Type
                            </th>
                            <th className="border font-bold border-stroke p-2">
                              Weight
                            </th>
                            <th className="border font-bold border-stroke p-2">
                              Unit
                            </th>
                            <th className="border font-bold border-stroke p-2">
                              AvailableQuantity
                            </th>

                            <th className="border font-bold border-stroke p-2">
                              VarientPrice
                            </th>
                            <th className="border font-bold border-stroke p-2">
                              VariantSku
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(submittedData).map(
                            ([_, values], index) =>
                              values.map((value, innerIndex) => (
                                <tr key={`${index}-${innerIndex}`}>
                                  <td className="border font-bold border-stroke p-2">
                                    {value}
                                  </td>
                                  <td className="border font-bold border-stroke p-2">
                                    <input
                                      type="text"
                                      placeholder="type"
                                      className="w-full min-w-30 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                                      type="number"
                                      placeholder="0.0"
                                      className="w-full min-w-20 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                      onChange={(e) =>
                                        handleTableInputChange(
                                          innerIndex,
                                          'weight',
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </td>
                                  <td className="border font-bold border-stroke p-2">
                                    <input
                                      type="text"
                                      placeholder="Kg"
                                      className="w-full min-w-20 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                      onChange={(e) =>
                                        handleTableInputChange(
                                          innerIndex,
                                          'unit',
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </td>
                                  <td className="border font-bold border-stroke p-2">
                                    <input
                                      type="number"
                                      placeholder="0.0"
                                      className="w-full min-w-20 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                      onChange={(e) =>
                                        handleTableInputChange(
                                          innerIndex,
                                          'availableQuantity',
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </td>
                                  <td className="border font-bold border-stroke p-2">
                                    <input
                                      type="number"
                                      placeholder="0.0"
                                      className="w-full min-w-20 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                      onChange={(e) =>
                                        handleTableInputChange(
                                          innerIndex,
                                          'variantPrice',
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </td>
                                  <td className="border font-bold border-stroke p-2">
                                    <input
                                      type="text"
                                      placeholder="sku"
                                      className="w-full min-w-20 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                      onChange={(e) =>
                                        handleTableInputChange(
                                          innerIndex,
                                          'variantSku',
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </td>
                                </tr>
                              )),
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="rounded-xl border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">


            <table className='gap-10'>
      <thead>
    <tr>
      <th className="border font-bold border-stroke p-2">Key</th>
      <th className="border font-bold border-stroke p-2">Values</th>
      <th className="border font-bold border-stroke p-2">Type</th>
      <th className="border font-bold border-stroke p-2">Weight</th>
      <th className="border font-bold border-stroke p-2">Unit</th>
      <th className="border font-bold border-stroke p-2">AvailableQuantity</th>
      <th className="border font-bold border-stroke p-2">VariantPrice</th>
      <th className="border font-bold border-stroke p-2">VariantSku</th>
      <th className="border font-bold border-stroke p-2">Action</th>
    </tr>
  </thead>
  <tbody className=''>
  {variants.map((variant, index) =>
  Array.isArray(variant.values) && variant.values.map((value, valueIndex) => (
    <tr key={`${index}-${valueIndex}`}>
      <td className="border font-bold border-stroke p-2">
        <div className='my-4'>
      <input
          type="text"
          value={variant.key}
          // onChange={(e) => handleVariantChange(e, index, 'values')}
          className="w-30 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 
          font-medium outline-none transition focus:border-primary active:border-primary
           disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
            dark:focus:border-primary"
          
        />
        </div>
      </td>
      <td className="border font-bold border-stroke p-2">
        <div className='my-4'>
        <input
  type="text"
  value={value}
  onChange={(e) => handleVariantChange(e, index, 'values')}
  className="w-30 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 
  font-medium outline-none transition focus:border-primary active:border-primary
  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark
  dark:bg-form-input dark:focus:border-primary"
/>
        </div>
      </td >
      <td className="border font-bold border-stroke p-2">
        <input
          type="text"
          value={variant.type}
          onChange={(e) => handleVariantChange(e, index, 'type')}
          className="w-20 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 
          font-medium outline-none transition focus:border-primary active:border-primary
           disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
            dark:focus:border-primary"
          
        />
      </td>
      <td className="border font-bold border-stroke p-2">
        <input
          type="text"
          value={variant.weight}
          onChange={(e) => handleVariantChange(e, index, 'weight')}
          className="w-20 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 
          font-medium outline-none transition focus:border-primary active:border-primary
           disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
            dark:focus:border-primary"
        />
      </td>
      <td className="border font-bold border-stroke p-2">
        <input
          type="text"
          value={variant.unit}
          onChange={(e) => handleVariantChange(e, index, 'unit')}
          className="w-20 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 
          font-medium outline-none transition focus:border-primary active:border-primary
           disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
            dark:focus:border-primary"
        />
      </td>
      <td className="border font-bold border-stroke p-2">
        <input
          type="text"
          value={variant.availableQuantity}
          onChange={(e) => handleVariantChange(e, index, 'availableQuantity')}
          className="w-20 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 
          font-medium outline-none transition focus:border-primary active:border-primary
           disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
            dark:focus:border-primary"
        />
      </td>
      <td className="border font-bold border-stroke p-2">
        <input
          type="text"
          value={variant.variantPrice}
          onChange={(e) => handleVariantChange(e, index, 'variantPrice')}
          className="w-20 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 
          font-medium outline-none transition focus:border-primary active:border-primary
           disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
            dark:focus:border-primary"
        />
      </td>
      <td className="border font-bold border-stroke p-2">
        <input
          type="text"
          value={variant.optionValues[0].variantSku}
          onChange={(e) => handleVariantChange(e, index, 'variantSku')}
          className="w-20 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 
          font-medium outline-none transition focus:border-primary active:border-primary
           disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
            dark:focus:border-primary"
        />
      </td>
      <td className="border font-bold border-stroke p-2">
        <button
          className='font-extrabold'
          onClick={() => deleteVariant(variant.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))
)}

  </tbody>
</table>


            </div>
          </div>
        </div>

        {/* //////////////////////////////////////second column/////////////////////////////////////////////////////////////////////////////////////////// */}
        <div className="flex flex-col gap-4 ">
          <div className="rounded-xl border-stroke bg-white text-black shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="p-5">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-80 rounded-lg border-[1.5px] border-stroke bg-transparent py-1
       px-5 font-medium outline-none transition focus:border-primary active:border-primary 
      disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input
      dark:focus:border-primary"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-9 ">
            <div className="rounded-xl border-stroke  bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className=" ml-5 mt-3">
                <h1 className="font-semibold">Publishing</h1>
                <ul className="list-disc mx-4">
                  <li>Online Store</li>
                  <li>Point of Sale</li>
                  <p>
                    Point of Sale has not been set up. Finish the remaining
                    steps to start selling in person.
                  </p>
                  <a
                    href="#"
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    Learn more
                  </a>
                  <br />
                  <h2 className="font-semibold">Market</h2>
                  <li>Incomplete International and Pakistan</li>
                </ul>
                <br />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-9 ">
            <div className="rounded-xl border-stroke  bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-2">
              <div className="ml-5">
                <h1 className="font-semibold">Product organization</h1>
                <br />
                <label className="font-bold" htmlFor="">
                  product Category
                </label>

                <input
                  type="text"
                  placeholder="CategoryName"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1
              px-5 font-medium outline-none transition focus:border-primary active:border-primary 
             disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
             dark:bg-form-input dark:focus:border-primary"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />

                <br />
                <br />
                <label className="font-bold" htmlFor="">
                  QuantityInStock
                </label>

                <input
                  type="text"
                  placeholder="quantityInStock"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1
              px-5 font-medium outline-none transition focus:border-primary active:border-primary 
             disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
             dark:bg-form-input dark:focus:border-primary"
                  value={quantityInStock}
                  onChange={(e) => setQuantityInStock(e.target.value)}
                />
                <br />
                <br />
                <label className="font-bold" htmlFor="">
                  Vendor
                </label>

                <input
                  type="text"
                  placeholder="Supplier_id"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1
              px-5 font-medium outline-none transition focus:border-primary active:border-primary 
             disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
             dark:bg-form-input dark:focus:border-primary"
                  value={supplier_id}
                  onChange={(e) => setSupplierId(e.target.value)}
                />
                <br />
                <br />
                <label className="font-bold" htmlFor="">
                  SKU
                </label>

                <input
                  type="text"
                  placeholder="Sku"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1
              px-5 font-medium outline-none transition focus:border-primary active:border-primary 
             disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
             dark:bg-form-input dark:focus:border-primary"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                />
                <br />
                <br />
                <label className="font-bold" htmlFor="">
                  Tags
                </label>

                <input
                  type="text"
                  placeholder="Tags"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1
              px-5 font-medium outline-none transition focus:border-primary active:border-primary 
             disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark 
             dark:bg-form-input dark:focus:border-primary"
                  value={tag.split(',').map((t) => t.trim())}
                  onChange={(e) => setTag(e.target.value)}
                />
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div
          style={{ border: '20px', padding: '10px' }}
          className="flex"
        >
          <button
            className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center
        font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={handleUpdate}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
export default UpdateProduct;
