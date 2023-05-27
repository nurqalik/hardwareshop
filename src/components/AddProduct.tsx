import { useState } from "react";

const AddProduct = ({
  onSave,
}: {
  onSave: (product: { name: string; price: string }) => void;
}) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, price });
    setName("");
    setPrice("");
    setModal(false);
  };

  const handleChange = () => {
    setModal(!modal);
  };

  return (
    <div>
      <div className="flex justify-end">
        <button className="btn gap-2" onClick={handleChange}>
          Add
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Add New Product</h3>
          <form>
            <div className="form-control">
              <label className="label font-bold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-bordered input w-full"
                placeholder="Product Name"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input-bordered input w-full"
                placeholder="Product Price"
              />
            </div>
            <div className="modal-action">
              <button
                className="btn-outline btn-accent btn"
                type="submit"
                onClick={handleSubmit}
              >
                Add Product
              </button>
              <button
                className="btn-outline btn-error btn"
                type="button"
                onClick={handleChange}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
