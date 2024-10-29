import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Product() {
    const [Product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);


    useEffect(() => {// Function to get the data from the server with load the web page
        axios.get("http://Localhost:8080/product")
            .then(function (response) {
                setProduct(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get("http://localhost:8080/category")
            .then(function (response) {
                setCategory(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQuantity] = useState("");
    const [categoryId, setCategoryId] = useState(null);

    function handleName(event) {
        setName(event.target.value);
    }

    function handleCategory(event) {
        setCategoryId(event.target.value);
    }

    function handlePrice(event) {
        setPrice(event.target.value);
    }

    function handleQuentity(event) {
        setQuantity(event.target.value);
    }

    function createProduct(event) {
        event.preventDefault();
        const data = {
            name: name,
            price: price,
            qty: qty,
            categoryId: categoryId
        };
        axios
            .post("http://localhost:8080/product", data)
            .then(function (response) {

                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div>
            <h1>Products</h1>
            {Product && Product.map((Product) => {
                return (
                    <div key={Product.id}>
                        <h2>{Product.productName}</h2>
                        <p>Category:{Product.category.name}</p>
                        <p>Price:{Product.price}</p>
                        <p>Qty:{Product.qty}</p>
                    </div>
                )
            })}
            <Link to="/">Home</Link>

            <form onSubmit={createProduct}>
                <div>
                    <label>Name</label>
                    <input type="text" onChange={handleName} required />
                </div>
                <div>
                    <label>Price</label>
                    <input type="text" onChange={handlePrice} required />
                </div>
                <div>
                    <label>Quentity</label>
                    <input type="text" onChange={handleQuentity} required />
                </div>
                <div>
                    <label>Category</label>
                    <select onChange={handleCategory} required>
                        <option value="">Select a Category</option>
                        {category && category.map((category) => {// Map the category data
                            return(<option key={category.id} value={category.id}>{category.name}</option>)}
                            )}
                    </select>
                </div>
                <br />
                
                <button type="submit" onClick={createProduct}>Create Product</button>
            </form>
        </div>
    )
}
export default Product;