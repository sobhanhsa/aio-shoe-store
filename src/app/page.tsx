import ProductCard from "@/components/product-card/ProductCard";
import styles from "./page.module.css";
import { ShoeType } from "@/utils/db/shoe/model";
import { createShoes, findShoes } from "@/utils/db/shoe/data";
import Featured from "@/components/featured/Featured";
import CategoryCard from "@/components/categoryCard/CategoryCard";
import SaleAd from "@/components/saleAd/SaleAd";
import AboutUs from "@/components/aboutUs/AboutUs";
import LatestProducts from "@/components/latestProducts/LatestProducts";

export default async function Home() {
  // await createShoes();
  const shoes = await findShoes();
  return (
    <div className={styles.container}>
      {/* featured */}
      <Featured />
      <div className={styles.categoryContainer}>
        <CategoryCard category="مردانه" image="/mancategory.png" />
        <CategoryCard category="زنانه"  image="/womancategory.png" />
      </div>
      <SaleAd />
      <div className={styles.topSaleContainer}>
        <p className={styles.title}>پر فروش ترین ها</p>    
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
      <AboutUs />
      <LatestProducts />
    </div>
  );
}
