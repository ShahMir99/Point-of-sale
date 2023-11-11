"use client";

const ProductArray = ({ data }) => {

  return (
    <div>
      {data
        .map((item) => (
          <div key={item.id} className="flex flex-row gap-2">
            <h1>{item.quantity} </h1>
            <h1>{item.items}</h1>
          </div>
        ))}
    </div>
  );
};

export default ProductArray;
