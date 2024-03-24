import { findShoes } from "@/utils/db/shoe/data";
import styles from "./latestProducts.module.css"
import ProductCard from "@/components/product-card/ProductCard";
import { ShoeType } from "@/utils/db/shoe/model";

const LatestProducts  = async() => {

    //find latest shoes
    let shoes = await findShoes();
    shoes.push(...shoes)
    shoes.push(...shoes)

    return (
        <div className={styles.container} >
            <p className={styles.title}>
                تازه رسیدگان را نیز ببینید
            </p>
            <div className={styles.products}>
                {
                shoes.map((shoe:ShoeType) => {
                    return (
                        <ProductCard
                        id={shoe._id}
                        name={shoe.name}
                        brand={shoe.brand}
                        colors={shoe.colors}
                        image={shoe.images[0].image}
                        sizes={shoe.sizes}
                        prices={shoe.prices}
                        tumbDesc={shoe.desc.substring(0,55)}
                        />
                    )
                })
                }
            </div>
        </div>
    )
};

export default LatestProducts;