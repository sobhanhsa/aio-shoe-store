import styles from "./featured.module.css"

const  Featured = () => {
    return (
        <div className={styles.container}
            style={
                {
                    backgroundImage: `url("featured.jpg")`,
                    backgroundSize: "cover",
                }
            }
        >
            <div className={styles.card} >
                <div className={styles.content}>
                    <div>
                        LOGO
                    </div>
                    <div className={styles.textContainer}>
                        <p  className={styles.subTitle}>
                        ساخته شده از چرم گاو برزیلی  
                        </p>
                        <p className={styles.title}>
                        کفش ملی
                        </p>
                    </div>
                    <button className={styles.button}>
                        همین حالا سفارش دهید
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Featured;