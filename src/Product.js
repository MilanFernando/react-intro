import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Product() {
    const [product, setProduct] = useState(null);
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
        setPrice(parseFloat(event.target.value));
    }

    function handleQuentity(event) {
        setQuantity(parseInt(event.target.value));
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
    const [edit, setedit] = useState(false);
    const [productId, setProductId] = useState(null);

    function getProducts() {
        axios.get("http://localhost:8080/product")
            .then(function (response) {
                setProduct(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function updateProduct(event) {
        event.preventDefault();
        const data = {
            name: name,
            price: price,
            qty: qty,
            categoryId: categoryId
        }
        axios.put("http://localhost:8080/product/" + productId, data)
            .then(function (response) {
                getProducts();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div>
            <h1>Products</h1>
            {product && product.map((product) => {
                return (
                    <div key={product.id}>
                        <h2><u>{product.productName}</u></h2>
                        <p>Category:{product.category?.name}</p>
                        <p>Price:{product.price}</p>
                        <p>Qty:{product.qty}</p>
                        <button type="button" onClick={() => {
                            setedit(true);
                            setProductId(product.id);
                            setName(product.productName);
                            setPrice(product.price);
                            setQuantity(product.qty);
                            setCategoryId(product.category?.id);
                        }}>edit</button>
                    </div>
                )
            })}
            <Link to="/">Home</Link>
            {!edit &&

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
                                return (<option key={category.id} value={category.id} selected={categoryId === category.id}>{category.name}</option>)
                            }
                            )}
                        </select>
                    </div>
                    <br />

                    <button type="submit" onClick={createProduct}>Create Product</button>

                </form>}

            {edit &&
                <form onSubmit={updateProduct}>
                    <div>
                        <label>Name</label>
                        <input type="text" onChange={handleName} value={name} required />
                    </div>
                    <div>
                        <label>Price</label>
                        <input type="text" onChange={handlePrice} value={price} required />
                    </div>
                    <div>
                        <label>Quentity</label>
                        <input type="text" onChange={handleQuentity} value={qty} required />
                    </div>
                    <div>
                        <label>Category</label>
                        <select onChange={handleCategory} required>
                            <option value="">Select a Category</option>

                            {category && category.map((category) => {// Map the category data
                                return (<option key={category.id} value={category.id} selected={category.id === categoryId}>{category.name}</option>)
                            }
                            )}
                        </select>
                    </div>
                    <br />

                    <button type="submit" onClick={updateProduct}>Update Product</button>

                </form>}
        </div>
    )
}
export default Product;