import Link from "next/link";
import styles from "./unAuthenticatedProfile.module.css";

export const UnAuthenticatedProfile = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1>
                    شرمنده ولی شماهنوز وارد نشدی...
                </h1>

                <Link className={styles.link} href={"/"}>
                    بازگشت به خانه
                </Link>
                
                <div className={styles.linksContainer}>

                    <Link href={"/auth/signup"}>
                        <div className={styles.item}>
                            <p className={styles.title}>
                                اگر هنوز ثبت نام نکردی
                            </p>
                                ثبت نام
                        </div>
                    </Link>

                    <Link href={"/auth/signin"}>
                        <div className={styles.item}>
                            <p className={styles.title}>
                                اگر قبلا ثبت نام کردی
                            </p>
                                ورود
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    )
};