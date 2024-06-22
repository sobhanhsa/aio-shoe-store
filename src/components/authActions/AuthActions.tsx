import { useLogOut } from "@/hooks/logOut";
import styles from "./authActions.module.css"
import { CiEdit, CiLogout } from "react-icons/ci";

export const AuthActions = () => {
    return (
        <div className={styles.actionBar}>
                    
                    {/* logout */}
                    <span className={styles.actionItem} onClick={() => {
                        useLogOut();
                    }}>
                        <CiLogout size={25} />
                        خروج از حساب کاربری
                    </span>
                    
                    {/* edit profile */}
                    <span className={styles.actionItem}>
                        <CiEdit size={25}/>
                        تغییر پروفایل
                    </span>
        </div>
    )
}