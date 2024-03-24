import Image from "next/image";
import styles from "./aboutUs.module.css"
import Link from "next/link";

const TextComponent = ({
    title,
    desc,
    href
}:{
    title:string,
    desc:string,
    href:string
}) => {
    return (
        <div className={styles.textContainer}>
            <div className={styles.content}>
                <p className={styles.title}>
                    {title}
                </p>
                <p className={styles.desc}>
                    {desc}
                </p>
                <div className={styles.link}>
                    <Link href={href}>
                        بیشتر بدانید
                    </Link>
                </div>    
            </div>
        </div>
    )
};
const  AboutUs = () => {
    return (
        <div className={styles.container}>
            <TextComponent title="زاده شده در ایران 1403" 
            desc="Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam neque ultrices."
            href="/about"
            />
            <div className={styles.imageContainer}>
                <Image className={styles.image} 
                src={"/about1.png"} alt="" fill />
            </div>
            <div className={styles.imageContainer}>
                <Image className={styles.image}
                src={"/about2.png"} alt="" fill />  
            </div>
            <TextComponent title="داستان ما"
            desc="Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit "
            href="/about"
            />
        </div>
    )
};


export default AboutUs;