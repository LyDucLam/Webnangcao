import React from "react";
import { useCart } from "../context/CartContext";

const CartPage = ({setPage}) => {
    const {cart, removeFromCart, totalAmount} = useCart();
    return (
        <div style={styles.container}>
            <h2>Giỏ Hàng Của Bạn</h2>
            {cart.lengh === 0 ? (
                <div style={{textAlign:'center', marginTop:'4px'}}>
                    <p>Giỏ hàng của bạn đang trống</p>
                    <button style={styles.shopBtn} onClick={() => setPage('list')}>Tiếp tục mua sắm</button>
                </div>
            ) : (
                <div>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.thRow}>
                                <th>Sản phẩm</th>
                                <th>Giá</th>
                                <th>Số Lượng</th>
                                <th>Tổng số</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id} style={styles.trRow}>
                                    <td style={styles.productTd}>
                                        <img src={item.img} alt={item.name} style={styles.thumb}/>
                                        <span>{item.name}</span>
                                    </td>
                                    <td>{item.price.toLocaleString('vi-VN')}đ</td>
                                    <td>{item.quantity}</td>
                                    <td>{(item.price * item.quantity).toLocaleString('vi-VN')}đ</td>
                                    <td>
                                        <button style={styles.delBtn} onClick={() => removeFromCart(item.id)}>Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={styles.summary}>
                        <h3>Tổng thanh toán: <span style={{color:'#e74c3c'}}>{totalAmount.toLocaleString('vi-VN')}đ</span></h3>
                        <button style={styles.checkoutBtn} onClick={() => alert('Đặt hàng thành công!')}>
                            Tiến hành thanh toán
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container:{padding:'30px', maxWidth:'1000px', margin:'0 auto'},
    shopBtn:{padding:'10px 20px', backgroundColor:'#3498db', color:'#fff', border:'none', borderRadius:'4px', cursor:'pointer', marginTop:'15px'},
    table:{width:'100%', borderCollapse:'collapse', marginTop:'20px'},
    thRow:{backgroundColor:'#f2f2f2', textAlign:'left', borderBottom:'2px solid #ddd'},
    trRow:{borderBottom:'1px solid #eee'},
    productTd:{display:'flex', alignItems:'center', gap:'15px', padding:'10px 0'},
    thumb:{width:'50px', height:'50px', objectFit:'cover', borderRadius:'4px'},
    delBtn:{backgroundColor:'#e74c3c', color:'#fff', border:'none', padding:'5px 10px', borderRadius:'4px', cursor:'pointer'},
    summary:{marginTop:'30px', textAlign:'right', padding:'20px', backgroundColor:'#f9f9f9', borderRadius:'8px'},
    checkoutBtn:{padding:'12px 25px', backgroundColor:'#2ecc71', color:'#fff', border:'none', borderRadius:'4px', fontSize:'16px', cursor:'pointer', fontWeight:'bold', marginTop:'10px'}
};

export default CartPage;