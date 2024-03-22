import Link from "next/link";
import styles from "./navbar.module.css"
import { FaShoppingCart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { PiUserCircleThin } from "react-icons/pi";


const  Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
            LOGO
            </div>
            <div className={styles.links}>
                <Link href={"/"}>
                    صفحه اصلی
                </Link>
                <Link href={"/shop"}>
                    فروشگاه
                </Link>
                <Link href={"/about"}>
                    درباره ما
                </Link>
                <Link href={"/contact"}>
                    ارتباط با ما
                </Link>
            </div>
            <div className={styles.icons}>
                <CiSearch size={20} />
                <PiUserCircleThin size={20} />
                <CiHeart size={20} />
                <CiShoppingCart size={20} />
            </div>
        </div>
    )
};

export default Navbar;