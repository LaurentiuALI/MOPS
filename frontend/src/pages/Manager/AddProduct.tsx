import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaFileUpload } from "react-icons/fa";
import axios from "axios";

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const managerId = params.managerId;

  const handleProductNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleIngredientsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value) {
      const ingredientsArray = value
        .split(",")
        .map((ingredient) => ingredient.trim());
      setIngredients(ingredientsArray);
    } else {
      setIngredients([]);
    }
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", productName);
    formData.append("Price", price);
    ingredients.forEach((ingredient, index) =>
      formData.append(`Ingredients[${index}]`, ingredient)
    );
    formData.append("Description", description);
    if (photo) {
      formData.append("Image", photo);
    }

    try {
      await axios.post(`${import.meta.env.VITE_URL}coffees/add`, formData)
      // .then(data=>console.log(data.data.message)); // for debugging purposes
      await axios.post(`${import.meta.env.VITE_URL}coffeeShops/addItemToMenu`, {
        ManagerId: managerId,
        Coffee: { Name: productName, Price: price, Quantity: 1 },
      });
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      navigate(-1); // Navigate back to the previous page
      console.error("Error adding product:", error);
    }
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
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Coffee"
                    className="h-52 w-52 object-cover rounded-lg"
                  />
                ) : (
                  <FaFileUpload className="h-52 w-52" />
                )}
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
          <div>
            <label
              htmlFor="ingredients"
              className="block text-sm font-medium text-gray-700"
            >
              Ingredients (comma-separated)
            </label>
            <input
              type="text"
              id="ingredients"
              name="ingredients"
              value={ingredients.join(", ")}
              onChange={handleIngredientsChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-brand-main"
              placeholder="e.g., Milk, Sugar, Coffee"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-brand-main"
              rows={4}
              placeholder="Enter product description"
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
