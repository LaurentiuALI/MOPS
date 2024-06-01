import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FaFileUpload } from "react-icons/fa";

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);

  const handleProductNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
    }

    console.log("🚀 ~ handlePhotoChange ~ photo:", photo);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can submit the form data (productName, price, photo) to your backend
    // For example, you can use axios to make a POST request
    // After successful submission, you can navigate to another page
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="h-screen flex justify-center items-center bg-brand-light p-2">
      <div className="w-full h-[95vh] max-w-md bg-white p-12 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-brand-main">Add Product</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center space-y-4"
        >
          <div>
            <div className="flex items-center bg-gray-200 justify-center p-4 rounded text-brand-main">
              <label
                htmlFor="photo"
                className="flex items-center cursor-pointer content-center"
              >
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <FaFileUpload className="h-52 w-52" />
              </label>
            </div>
          </div>
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={productName}
              onChange={handleProductNameChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-brand-main"
              required
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={handlePriceChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-brand-main"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-brand-main text-white py-2 px-4 rounded hover:bg-opacity-80 focus:outline-none focus:ring focus:border-brand-main"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
