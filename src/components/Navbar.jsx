import React from "react";
import { useCart } from "../context/CartContext";

const Navbar = ({setPage}) => {
    const {totalItems} = useCart();
    return(
        <nav style={styles.navbar}>
            <div style={styles.brand} onClick={() => setPage('list')}>
                E-Shop Pro
            </div>
            <div style={styles.navLinks}>
                <button style={styles.linkBtn} onClick={() => setPage('list')}>Cửa hàng</button>
                <button style={styles.cartBtn} onClick={() => setPage('cart')}>
                    Giỏ hàng
                    {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
                </button>
            </div>
        </nav>
    );
};

const styles = {
    navbar:{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'15px 30px', backgroundColor:'#2c3e50', color:'#fff', boxShadow:'0 2px 5px rgba(0,0,0,0.1)'},
    brand:{fontSize:'20px', fontWeight:'bold', cursor:'pointer'},
    navLinks:{display:'flex', alignItems:'center', gap:'20px'},
    linkBtn:{background:'none', border:'none', color:'#fff', fontSize:'16px', cursor:'pointer'},
    cartBtn:{position:'relative', backgroundColor:'#e67e22', border:'none', color:'#fff', padding:'8px 16px', borderRadius:'4px', fontSize:'16px', cursor:'pointer', fontWeight:'bold'},
    badge:{position:'absolute', top:'-10px', right:'-10px', backgroundColor:'#e74c3c', color:'#fff', borderRadius:'50%', padding:'2px 8px', fontSize:'12px'}
};

export default Navbar;