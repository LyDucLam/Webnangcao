import React from "react";
import { useCart } from "../context/CartContext";

const MOCK_PRODUCTS = [
    {id:1, name:'iPhone 15 Pro Max', price:12890000, desc:'Chip A17 Pro mạnh mẽ, camera 48MP zoom 5x.', img:'https://shorturl.at/4Jzvl'},
    {id:2, name:'MacBook Air M3', price:42999000, desc:'Thiết kế siêu mỏng nhẹ, hiệu năng đỉnh cao từ chip M3.', img:'https://shorturl.at/FUpT6'},
    {id:3, name:'AirPods Pro Gen 2', price:6590000, desc:'Chống ồn chủ động thông minh, âm thanh không gian sống động.', img:'https://shorturl.at/egmbo'},
];

const ProductList = ({setPage, setSelectedProductId}) => {
    const {addToCart} = useCart();
    const handleViewDetail = (id) => {
        setSelectedProductId(id);
        setPage('detail');
    };
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Danh sách sản phẩm</h2>
            <div style={styles.grid}>
                {MOCK_PRODUCTS.map((product) => (
                    <div key={product.id} style={styles.card}>
                        <img src={product.img} alt={product.name} style={styles.image}/>
                        <h3 style={styles.prodName}>{product.name}</h3>
                        <p style={styles.price}>{product.price.toLocaleString('vi-VN')}</p>
                        <div style={styles.btnGroup}>
                            <button style={styles.detailBtn} onClick={() => handleViewDetail(product.id)}>
                                Xem chi tiết
                            </button>
                            <button style={styles.addBtn} onClick={() => addToCart(product)}>
                                Thêm vào giỏ
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container:{padding:'30px'},
    title:{textAlign:'center', marginBottom:'30px', color:'#333'},
    grid:{display:'flex', flexWrap:'wrap', gap:'20px', justifyContent:'center'},
    card:{border:'1px solid #ddd', borderRadius:'8px', padding:'15px', width:'280px', boxShadow:'0 4px 6px rgba(0,0,0,0.05)', backgroundColor:'#fff', textAlign:'center'},
    image:{width:'100%', height:'180px', objectFit:'cover', borderRadius:'6px'},
    prodName:{fontSize:'18px', margin:'15px 0 5px 0'},
    price:{color:'#e74c3c', fontWeight:'bold', fontSize:'16px', marginBottom:'15px'},
    btnGroup:{display:'flex', gap:'10px', justifyContent:'center'},
    detailBtn:{padding:'8px 12px', backgroundColor:'#2ecc71', border:'none', color:'#fff', borderRadius:'4px', cursor:'pointer', fontWeight:'bold'}
};

export default ProductList;
export {MOCK_PRODUCTS};