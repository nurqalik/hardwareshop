import { useState } from "react";

const EditProduct = ({
  onUpdate,
}: {
  onUpdate: (product: { name: string; price: string }) => void;
}) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ name, price });
    setName("");
    setPrice("");
    setModal(false);
  };

  const handleChange = () => {
    setModal(!modal);
  };

  return (
    <div>
        <button className="btn-primary btn-xs btn" onClick={handleChange}>Edit</button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Edit Product</h3>
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
                Save
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

export default EditProduct;
