import ProductCard from "@/components/product-card/ProductCard";
import styles from "./page.module.css";
import { ShoeType } from "@/utils/db/shoe/model";
import { createShoes, findShoes } from "@/utils/db/shoe/data";
import Featured from "@/components/featured/Featured";
import CategoryCard from "@/components/categoryCard/CategoryCard";
import SaleAd from "@/components/saleAd/SaleAd";

export default async function Home() {
  // await createShoes();
  const shoes = await findShoes();
  console.log(shoes)
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
      </div>
    </div>
  );
}
