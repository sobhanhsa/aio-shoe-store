import Image from "next/image";
import styles from "./categoryCard.module.css"
import Link from "next/link";

const  CategoryCard = ({
    image,
    category
}:{
    image:string,
    category:string
}) => {
    return (
        <Link href={"/shop?cat="+category}>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <Image className={styles.image} 
                        src={image} alt="" fill/>
                </div>
                {category}
            </div>
        </Link>
    )
};

export default CategoryCard;