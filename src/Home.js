import { Link } from "react-router-dom";
function Home(){
    return(
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>this is the home page</p>
            <Link to ="/user">User</Link>
            <Link to ="/product">Product</Link>
        </div>
    )
}
export default Home;