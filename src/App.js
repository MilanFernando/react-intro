import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import User from './User';
import Home from './Home';
import Product from './Product';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<User/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/Product" element={<Product/>}/>
      </Routes>
    </BrowserRouter>
  )
}


export default App;
