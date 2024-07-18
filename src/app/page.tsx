import styles from "./page.module.css";
import SaleAd from "@/components/saleAd/SaleAd";
import AboutUs from "@/components/aboutUs/AboutUs";
import LatestProducts from "@/components/latestProducts/LatestProducts";
import CategorySwiper from "@/components/categorySwiper/CategorySwiper";
import { PopulatedProductType, ProductType } from "@/utils/db/product/model";
import { TopSales } from "@/components/topSales/TopSales";
import Featured from "@/components/featured/Featured";

const fetcher = async(
  url=process.env.NEXT_PUBLIC_API_URL+"/products/product/all"
) => {
  const res = await fetch(url+"?populate=y&perPage=4",{
    cache:"no-store"
  });
  return res.json();
}

export default async function Home() {

  const {products}:{products:PopulatedProductType[]} = await fetcher();
  
  return (
    <div className={styles.container}>
      {/* featured */}
      <Featured />
      
      <div className={styles.wrapper}>
        <SaleAd />
        <TopSales products={products} />
        <AboutUs />
        {/* <LatestProducts products={products} /> */}
      </div>
    </div>
  );
}
