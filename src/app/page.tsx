import ProductCard from "@/components/product-card/ProductCard";
import styles from "./page.module.css";
import { ShoeType } from "@/utils/db/shoe/model";
import { createShoes, findShoes } from "@/utils/db/product/data";
import Featured from "@/components/featured/Featured";
import SaleAd from "@/components/saleAd/SaleAd";
import AboutUs from "@/components/aboutUs/AboutUs";
import LatestProducts from "@/components/latestProducts/LatestProducts";
import CategorySwiper from "@/components/categorySwiper/CategorySwiper";

export default async function Home() {
  const shoes = await findShoes();
  return (
    <div className={styles.container}>
      {/* featured */}
      <Featured />
      <div className={styles.categoryContainer}>
        <CategorySwiper categories={["مردانه","زنانه"]} />
      </div>
      <SaleAd />
      <div className={styles.topSaleContainer}>
        <p className={styles.title}>پر فروش ترین ها</p>    
        <div className={styles.products}>
          {
            shoes.map((shoe:ShoeType) => {
              return (
                <ProductCard
                  id={shoe._id.toString()}
                  name={shoe.name}
                  brand={shoe.brand}
                  colors={shoe.colors}
                  image={shoe.images[0].image}
                  sizes={shoe.sizes}
                  prices={shoe.prices.map(p => p.price)}
                  tumbDesc={shoe.thumbDesc.substring(0,55)}
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
