import { useState } from "react";
let products=[]

export default function Products(props) {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    const updatedCartItems = [...cartItems, product];
    setCartItems(updatedCartItems);
    localStorage.setItem('CartItems', JSON.stringify(updatedCartItems));
  };

  if (props.Title === "Items Related to your Search") products = props.SearchedItems;
  else if (props.Title === "Frequently Purchased Together")products = props.RecommendedItems;
  else{
    const storedCartItems = localStorage.getItem('CartItems');
    products = storedCartItems ? JSON.parse(storedCartItems) : [];
  }
  return (
    <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      {products.length!==0 && <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '10px' }}>{props.Title}</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products && products.map((product) => (
              <a key={product.product_uid} href="/" className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.product_img_url}
                    alt="img"
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.product_title}</h3>
                <button
                  onClick={() => handleAddToCart(product)} // Call the handleAddToCart function
                  className={`bottom-4 left-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition`}
                >{props.Btitle}
                </button>

              </a>
            ))}

          </div>
        </div>
      </div>
      }
      {
        !products.length && props.Title === "Items Related to your Search" && <h2 className="mt-8" style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '10px' }}>Your Searched Items will display Here</h2>
      }
      {
        !products.length && props.Title === "Cart" && <h2 className="mt-8" style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '10px' }}>Cart is Empty</h2>
      }
    </div>

  )
}
