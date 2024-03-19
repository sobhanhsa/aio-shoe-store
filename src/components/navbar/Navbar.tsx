import styles from "./navbar.module.css"

const  Navbar = () => {
    return (
        <div className={styles.container}>
            <div className="cart">W</div>   
            <div className={styles.logo}>کفشینو</div>
        </div>
    )
};

export default Navbar;