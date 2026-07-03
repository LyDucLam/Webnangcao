import React from "react";
import { useCart } from "../context/CartContext";
import { MOCK_PRODUCTS } from "./ProductList";

const ProductDetail = ({productId, setPage}) => {
    const {addToCart} = useCart();
    const product = MOCK_PRODUCTS.find((p) => p.id === productId);
    if (!product) {
        return <div style={{padding:'30px', textAlign:'center'}}>Không tìm thấy sản phẩm!</div>;
    }
    return(
        <div style={styles.container}>
            <button style={styles.backBtn} onClick={() => setPage('list')}>Quay lại danh sách</button>
            <div style={styles.detailWrapper}>
                <div style={{flex:1}}>
                    <img src={product.img} alt={product.name} style={styles.image}/>
                </div>
                <div style={{flex:1, padding:'20px'}}>
                    <h2 style={styles.name}>{product.name}</h2>
                    <h3 style={styles.price}>{product.price.toLocaleString('vi-VN')}</h3>
                    <p style={styles.descTitle}>Mô tả chi tiết:</p>
                    <p style={styles.desc}>{product.desc}</p>
                    <button style={styles.addBtn} onClick={() => addToCart(product)}>
                        Thêm vào hàng giỏ hàng ngay
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container:{padding:'30px', maxWidth:'900px', margin:'0 auto'},
    backBtn:{padding:'8px 15px', background:'#ecf0f1', border:'none', borderRadius:'4px', cursor:'pointer', marginBottom:'20px'},
    detailWrapper:{display:'flex', gap:'4px', backgroundColor:'#fff', padding:'20px', borderRadius:'8px', boxShadow:'0 4px 10px rgba(0,0,0,0.1)'},
    image:{width:'100%', maxHeight:'400px', objectFit:'cover', borderRadius:'6px'},
    name:{fontSize:'28px', marginBottom:'10px'},
    price:{color:'#e74c3c', fontSize:'24px', fontWeight:'bold', marginBottom:'20px'},
    descTitle:{fontWeight:'bold', margin:'10px 0'},
    desc:{color:'#666', lineHeight:'1.6', marginBottom:'25px'},
    addBtn:{padding:'12px 25px', backgroundColor:'#e67e22', color:'#fff', border:'none', borderRadius:'50px', fontSize:'16px', cursor:'pointer', fontWeight:'bold'}
};

export default ProductDetail;