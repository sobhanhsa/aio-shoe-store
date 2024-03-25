import { findShoes } from "@/utils/db/shoe/data";
import styles from "./shopPage.module.css"
import { ShoeType } from "@/utils/db/shoe/model";
import ProductCard from "@/components/product-card/ProductCard";
import Filter from "@/components/filter/Filter";
import SortSelect from "@/components/sortSelect/SortSelect";

const  ShopPage = async() => {
    const shoes = await findShoes();
    shoes.push(...shoes)
    shoes.push(...shoes)

    return (
        <div className={styles.container}>
            <div className={styles.filterWrapper}>
                    <Filter />
            </div>
            <div className={styles.main}>
                <SortSelect/>
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
            <div className={styles.paginationContainer}>

            </div>
        </div>
    )
};

export default ShopPage;