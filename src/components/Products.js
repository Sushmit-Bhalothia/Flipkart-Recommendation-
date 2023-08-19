import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let products = [];

export default function Products(props) {
  const URL = process.env.REACT_APP_BASE_URL;
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = async (event, product) => {
    event.preventDefault(); // Prevent page reload

    const userId = localStorage.getItem("id"); // Get user ID from localStorage
    const productUid = product.product_uid; // Get product_uid

    const apiEndpoint = `${URL}api/add-cart-data/`;

    try {
      // Make the API call to add the item to the cart
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          q: productUid,
        }),
      });

      if (response.ok) {
        toast.success("Item added to cart successfully!");
        // Handle the successful response if needed

        // Update the cart items in state and local storage
        const updatedCartItems = [...cartItems, product];
        setCartItems(updatedCartItems);
        localStorage.setItem("CartItems", JSON.stringify(updatedCartItems));
      } else {
        // Handle errors or failed response
        console.error("Error adding item to cart:", response.statusText);
      }
    } catch (error) {
      // Handle error if the API call fails
      console.error("Error adding item to cart:", error);
    }
  };

  const handleRemoveFromCart = (event, productUid) => {
    event.preventDefault();
    console.log(productUid);
    // const updatedCartItems = cartItems.filter(item => item.product_uid !== productUid);
    // setCartItems(updatedCartItems);
    // localStorage.setItem("CartItems", JSON.stringify(updatedCartItems));
  };

  if (props.Title === "Items Related to your Search")
    products = props.SearchedItems;
  else if (props.Title === "You May Also Like")
    products = props.RecommendedItems;
  else {
    const storedCartItems = localStorage.getItem("CartItems");
    products = storedCartItems ? JSON.parse(storedCartItems) : [];
  }
  // products.sort((a, b) => b.users_interested - a.users_interested);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {products?.length !== 0 && (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6  lg:max-w-7xl lg:px-8">
            <h2
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {props.Title}
            </h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products &&
                products.map((product) => (
                  <a key={product.product_uid} href="#" className="group">
                    <div className="flex flex-col gap-2 items-center shadow-md p-3 ">
                      <div
                        style={{ height: "200px" }}
                        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
                      >
                        <img
                          src={product.product_img_url}
                          alt="img"
                          className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <h3 className="mt-4 text-sm text-gray-700 text-center">
                        {product.product_title}
                      </h3>
                      {props.Title === "Cart" ? (
                        <button
                          onClick={(event) =>
                            handleRemoveFromCart(event, product.product_uid)
                          } // Call the handleRemoveFromCart function
                          className={`bottom-4 left-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition`}
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          onClick={(event) => handleAddToCart(event, product)} // Pass event and product to the handler
                          className={`bottom-4 left-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition`}
                        >
                          {props.Btitle}
                        </button>
                      )}
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      )}
      {!products?.length && props.Title === "Items Related to your Search" && (
        <h2
          className="mt-8"
          style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Your Searched Items will display Here
        </h2>
      )}
      {!products?.length && props.Title === "Cart" && (
        <h2
          className="mt-8"
          style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Cart is Empty
        </h2>
      )}
    </div>
  );
}
