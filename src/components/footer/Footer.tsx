import Link from "next/link";
import Logo from "../logo/Logo";
import styles from "./footer.module.css"

export const  Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.textContainer}>
                    <Logo/>
                    <div className={styles.desc}>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
                    </div>
                    <Link href={"/shop"}>
                        <button className={styles.button}>
                            ورود به فروشگاه
                        </button>
                    </Link>
                </div>
                <div className={styles.termsContainer}>
                    <p>
                    تمام حقوق برای کفشخونه محفوظ است©
                    </p>
                </div>

            </div>
        </div>
    )
};

export default Footer;