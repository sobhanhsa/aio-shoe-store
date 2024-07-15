import { findProductById } from "@/utils/db/product/data";
import styles from "./singleShoe.module.css"
import { ProductType } from "@/utils/db/product/model";
import { ProductImageSwiper } from "@/components/productImageSwiper/ProductImageSwiper";
import SimilarItems from "@/components/similarItems/SimilarItems";
import SingleProductClient from "./_client/Client";
import { redirect } from "next/navigation";

const fetcher = async(
    url=process.env.NEXT_PUBLIC_API_URL+"/products/product/",
    id:string
) => {  
    
    const finalUrl = `${url}${id}?populate=y`;

    const res = await fetch(finalUrl,{
        cache:"no-store"
    });
    
    return res.json();

}

const  SingleProductPage = async({params}:{
    params:{
        id:string
    }
}) => {

    const product : ProductType = (await fetcher(undefined,params.id))?.product;        

    if (!product) {
        redirect("/404");
    }

    return (
        <div className={styles.container}>
            <div className={styles.product}>
                <div className={styles.swiperContainer}>
                    <ProductImageSwiper 
                        images={product.images?.map(i => i.image)}
                    />
                </div>
                <SingleProductClient product={JSON.stringify(product)}/>
                {/* <div className={styles.infoContainer}>
                    <div className={styles.status}>
                        <p className={styles.title}>
                            {shoe.name}
                        </p>
                        <div className={styles.reviewCount}>
                            <Stars count={5} activeStars={4}/>
                            <p>نظرn</p>
                        </div>
                        <p className={styles.stock}>
                            موجودی:
                            <span>موجود درانبار</span>
                        </p>
                        <p className={styles.price}>
                            {commaEmbedder(currentPrice)}
                        </p>
                    </div>
                    <ColorSelect
                        colors={shoe.colors}
                        selectedColor={selectedColor}
                    />
                    <SizeSelect
                        sizes={shoe.sizes}
                        selectedSize={selectedSize}
                    />
                    <div className={styles.actions}>
                        <div className={styles.quantity}>
                            <button>
                                <AiOutlineMinus size={20} />
                            </button>
                            {currentQuantity}
                            <button>
                                <MdOutlineAdd size={20}/>
                            </button>
                        </div>
                        <div className={styles.addCart}>
                            افزودن به سبد خرید  
                        </div>
                        <div className={styles.buyNow}>
                            همین حالا بخرید 
                        </div>
                        <div className={styles.addFav}>
                            <FaRegHeart size={17} />
                        </div>
                    </div>
                    <Details 
                        desc={shoe.desc}
                        dimenstions={{
                            x:50,
                            y:60,
                            z:10
                        }}
                        reviews={null}
                    />
                </div> */}
            </div>
            <div className={styles.similarItems}>
                <SimilarItems/>
            </div>
        </div>
    )
};

export default SingleProductPage;