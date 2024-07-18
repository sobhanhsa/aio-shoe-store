import Image from "next/image"
import styles from "./aboutPage.module.css"


const AboutPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.about}>
                <p className={styles.title}>
                    درباره کفشخونه
                </p>
                <p className={styles.desc}>
                    کفشخونه از سال ۱۳۰۰ تا به این لحظه در حال فعالیت است
                    از سفرنامه ما دیدن کنید!
                </p>
            </div>
            <div className={styles.cardList}>
                <div className={styles.cartItem}>
                    <p className={styles.title}>
                        ۱۳۰۰
                    </p>
                    <p className={styles.desc}>
                        لورم ایپسوم متن ساختگی با 
                        تولید سادگی نامفهوم از صنعت چاپ و با استفاده
                        از طراحان گرافیک است چاپگرها و متون بلکه روزنامه
                        و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز 
                    </p>
                </div>
                <div className={styles.cartItemImage}>
                    <Image
                        className={styles.image}
                        src={"/aboutp.png"}
                        alt=""
                        fill
                    />
                </div>
                <div className={styles.cartItemImage}>
                    <Image
                        className={styles.image}
                        src={"/aboutp1.png"}
                        alt=""
                        fill
                    />
                </div>
                <div className={styles.cartItem}>
                    <p className={styles.title}>
                        ۱۳۵۰
                    </p>
                    <p className={styles.desc}>
                        لورم ایپسوم متن ساختگی با 
                        تولید سادگی نامفهوم از صنعت چاپ و با استفاده
                        از طراحان گرافیک است چاپگرها و متون بلکه روزنامه
                        و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز 
                    </p>
                </div>
                <div className={styles.cartItem}>
                    <p className={styles.title}>
                        ۱۳۹۰
                    </p>
                    <p className={styles.desc}>
                        لورم ایپسوم متن ساختگی با 
                        تولید سادگی نامفهوم از صنعت چاپ و با استفاده
                        از طراحان گرافیک است چاپگرها و متون بلکه روزنامه
                        و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز 
                    </p>
                </div>
                <div className={styles.cartItemImage}>
                    <Image
                        className={styles.image}
                        src={"/aboutp2.png"}
                        alt=""
                        fill
                    />
                </div>
            </div>
        </div>
    )
}

export default AboutPage;