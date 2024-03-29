import { findShoe } from "@/utils/db/shoe/data";
import styles from "./singleShoe.module.css"
import { ShoeType } from "@/utils/db/shoe/model";
import Image from "next/image";
import { ProductImageSwiper } from "@/components/productImageSwiper/ProductImageSwiper";
import Stars from "@/components/stars/Stars";
import { AiOutlineMinus } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import Details from "@/components/details/Details";
import SimilarItems from "@/components/similarItems/SimilarItems";
import ColorSelect from "@/components/productSinglePage/colorSelect/ColorSelect";
import SizeSelect from "@/components/productSinglePage/sizeSelect/SizeSelect";
import { commaEmbedder } from "@/utils/priceConventor/priceConventor";
import { useState } from "react";

const  SingleShoePage = async({params}:{
    params:{
        id:string
    }
}) => {
    const shoe : ShoeType = await findShoe(params.id);
    const selectedColor = "ابی";
    const selectedSize = 42;
    const currentQuantity = 1;
    const currentPrice = 500000
    return (
        <div className={styles.container}>
            <div className={styles.product}>
                <div className={styles.swiperContainer}>
                    <ProductImageSwiper 
                        images={shoe.images.map(i => i.image)}/>
                </div>
                <div className={styles.infoContainer}>
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
                </div>
            </div>
            <div className={styles.similarItems}>
                <SimilarItems/>
            </div>
        </div>
    )
};

export default SingleShoePage;