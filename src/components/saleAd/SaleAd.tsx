import Link from "next/link";
import styles from "./saleAd.module.css"
import Image from "next/image";

const  SaleAd = () => {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <p className={styles.title}>
                بیش از 40% تخفیف نوروزی 
                </p>
                <p className={styles.desc}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده
                </p>
                <p className={styles.link}>
                    <Link href={"/shop"}>
                        همین حالا خرید کنید       
                    </Link>
                </p>
            </div>
            <div className={styles.imageContainer}>
                <Image className={styles.image} 
                    src={"/haftsin.jpg"} alt="" fill/>
            </div>
        </div>

    )
};

export default SaleAd;