import Image from "next/image";
import deskStyles from "./desktop/featured.module.css"
import mobileStyles from "./mobile/featured.module.css"
import styles from "./featured.module.css"

const Desktop = () => {
    return (
        <div className={deskStyles.container}>
            <Image
                className={deskStyles.image}
                src={"/featured.jpg"}
                alt=""
                fill
            />
            <div className={deskStyles.card} >
                <div className={deskStyles.content}>
                    <div>
                        LOGO
                    </div>
                    <div className={deskStyles.textContainer}>
                        <p  className={deskStyles.subTitle}>
                        ساخته شده از چرم گاو برزیلی  
                        </p>
                        <p className={deskStyles.title}>
                        کفش ملی
                        </p>
                    </div>
                    <button className={deskStyles.button}>
                        همین حالا سفارش دهید
                    </button>
                </div>
            </div>
        </div>
    )
};

const Mobile = () => {
    return (
        <div className={mobileStyles.container}>
            <div className={mobileStyles.imageContainer}>
                <Image
                    className={mobileStyles.image}
                    src={"/featured.jpg"}
                    alt=""
                    fill
                />
            </div>
            <div className={mobileStyles.card} >
                <div className={mobileStyles.content}>
                    <div>
                        LOGO
                    </div>
                    <div className={mobileStyles.textContainer}>
                        <p  className={mobileStyles.subTitle}>
                        ساخته شده از چرم گاو برزیلی  
                        </p>
                        <p className={mobileStyles.title}>
                        کفش ملی
                        </p>
                    </div>
                    <button className={mobileStyles.button}>
                        همین حالا سفارش دهید
                    </button>
                </div>
            </div>
        </div>
    )
};

const  Featured = () => {
    return (
        <>
            <div className={styles.desc}>
                <Desktop/>
            </div>
            <div className={styles.mobile}>
                <Mobile/>
            </div>
        </>
    )
};



export default Featured;