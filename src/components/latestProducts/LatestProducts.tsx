import { PopulatedProductType } from "@/utils/db/product/model";
import styles from "./latestProducts.module.css"
import ProductCard from "@/components/product-card/ProductCard";

const LatestProducts  = async({
    products
}:{
    products:PopulatedProductType[]
}) => {



    return (
        <div className={styles.container} >
            <p className={styles.title}>
                تازه رسیدگان را نیز ببینید
            </p>
            <div className={styles.products}>
                {
                products.map((product) => {
                    return (
                        <ProductCard
                        id={product._id}
                        name={product.name}
                        brand={product.brand}
                        colors={product.colors}
                        image={product.images[0].image}
                        sizes={product.sizes}
                        prices={product.prices}
                        tumbDesc={product.description.shortDesc.substring(0,55)}
                        />
                    )
                })
                }
            </div>
        </div>
    )
};

export default LatestProducts;