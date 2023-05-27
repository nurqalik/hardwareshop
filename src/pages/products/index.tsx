import AddProduct from "@/components/AddProduct";
import EditProduct from "@/components/EditProduct";
import { RouterOutputs, api } from "@/utils/api";
import Link from "next/link";

type Product = RouterOutputs["product"]["getAll"][0];

const ProductPage = ({}: {
  product: Product;
  onUpdate: () => void
}) => {
  const {data: products, refetch: refetchProducts} = api.product.getAll.useQuery()

  const createProduct = api.product.create.useMutation({
    onSuccess: () => {
      void refetchProducts()
    }
  })
  const deleteProduct = api.product.delete.useMutation({
    onSuccess: () => {
      void refetchProducts()
    }
  })
  const updateProduct = api.product.edit.useMutation({
    onSuccess: () => {
      void refetchProducts()
    }
  })

  return (
    <div className="px-10 py-10">
      <Link className="link link-hover" href="/">Back</Link>
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th>Edit Data</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => {
            {
              /* row 1 */
            }
            return (
              <tr key={product.id}>
                <th>{index + 1}</th>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <div className="flex flex-row-reverse space-x-4 space-x-reverse">
                  <button className="btn-error btn-xs btn" onClick={() => void deleteProduct.mutate({id: product.id})}>
                    Delete
                  </button>
                  <EditProduct onUpdate={({name, price}) => void updateProduct.mutate({id: product.id, name, price})}/>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <AddProduct
        onSave={({ name, price }) =>
          void createProduct.mutate({
            name,
            price,
          })
        }
      />
    </div>
  );
};

export default ProductPage;
