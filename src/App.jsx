import React, {useState} from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";

function App() {
    const [page, setPage] = useState('list');
    const [selectedProductId, setSelectedProductId] = useState(null);
    const renderPage = () => {
        switch(page) {
            case 'list':
                return <ProductList setPage={setPage} setSelectedProductId={setSelectedProductId}/>;
            case 'detail':
                return <ProductDetail productId={selectedProductId} setPage={setPage}/>;
            case 'cart':
                return <CartPage setPage={setPage}/>;
            default:
                return <ProductList setPage={setPage} setSelectedProductId={setSelectedProductId}/>;
        }
    };
    return (
        <CartProvider>
            <div style={{fontFamily:'Arial, sans-serif', backgroundColor:'#f5f7fa', minHeight:'100vh', margin:0}}>
                <Navbar setPage={setPage}/>
                {renderPage()}
            </div>
        </CartProvider>
    );
}

export default App;