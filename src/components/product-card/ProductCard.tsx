import Color from "../color/Color"
import styles from "./productCard.module.css"

interface ProductCardParams {
    title:      string
    subTitle:   string
    image:      string
    prices:      string[]
    colors:     string[]
};

const  ProductCard = (params:ProductCardParams) => {
    const lowestPrice = Math.min(...params.prices
        .map(p => Number(p)));
    const highestPrice = Math.max(...params.prices
        .map(p => Number(p)));
    
    console.log(lowestPrice);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.imageContainer}></div>
                <div className={styles.colors}>
                    {
                        params.colors.map(color => 
                            (
                                <Color color={color} />
                            )
                        )
                    }
                </div>
                <div className={styles.textContainer}>
                    <div className={styles.brand}>
                        {params.title}fsdf111
                    </div>
                    <div className={styles.name}>
                        {params.subTitle}
                    </div>
                    <div className={styles.price}>
                        {lowestPrice}-{highestPrice}
                    </div>
                </div>
            </div>
            <button className={styles.addButton}>
                بزن به سبد
            </button>
        </div>
    )
};

export default ProductCard;