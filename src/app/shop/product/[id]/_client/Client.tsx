"use client"

import Details from "@/components/details/Details";
import ColorSelect from "@/components/productSinglePage/colorSelect/ColorSelect";
import SizeSelect from "@/components/productSinglePage/sizeSelect/SizeSelect";

import styles from "../singleShoe.module.css"
import { PopulatedProductType, ProductType } from "@/utils/db/product/model";
import Stars from "@/components/stars/Stars";
import { commaEmbedder } from "@/utils/priceConventor/priceConventor";
import { useEffect, useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { CartItemType } from "@/utils/db/cartItem/model";

import { useAddToCart } from "@/hooks/useAddToCart";
import { SizeType } from "@/utils/db/size/model";
import { ColorType } from "@/utils/db/color/model";
import { ProductImageSwiper } from "@/components/productImageSwiper/ProductImageSwiper";
import SimilarItems from "@/components/similarItems/SimilarItems";


const SingleProductClient = ({product:stringedProduct}:{product:string})=>{
    // populated product !
    const product : PopulatedProductType = JSON.parse(stringedProduct);

    const [selectedSize,setSelectedSize] = useState<SizeType>(
        product.sizes[0]
    );

    const [selectedColor,setSelectedColor] = useState<ColorType>(
        product.colors[0]
    );

    const [currentQuantity,setCurrentQuantity] = useState(1);

    
    const currentPrice = product.prices[0];
    

    return (
        <div className={styles.container}>
            <div className={styles.product}>
                <div className={styles.swiperContainer}>
                    <ProductImageSwiper 
                        images={product.images?.map(i => i.image)}
                    />
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.status}>
                        <p className={styles.title}>
                            {product.name}
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
                        colors={product.colors}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                    />
                    <SizeSelect
                        sizes={product.sizes}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                    />

                    <div className={styles.actions}>
                        <div className={styles.quantity}>
                            <button onClick={() => {setCurrentQuantity((p) => {
                                return p === 1 ? 1 : p - 1
                            })}}>
                                <AiOutlineMinus size={20} />
                            </button>
                            {currentQuantity}
                            <button onClick={() => setCurrentQuantity(p => p + 1)}>
                                <MdOutlineAdd size={20}/>
                            </button>
                        </div>

                        <div className={styles.addCart} 
                            onClick={useAddToCart.bind({
                                quantity:currentQuantity,
                                product:product._id,
                                spec:{
                                    color:selectedColor._id,
                                    size:selectedSize._id
                                }
                            })}>
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
                        desc={product.description.longDesc}
                        dimenstions={product.dimensions}
                        reviews={null}
                    />
                    
                </div>
            </div>
            <SimilarItems/>
        </div>
    )
}

// const SingleProductClient  = ({product:stringedProduct}:{product:string}) => {

//     // populated product !
//     const product : PopulatedProductType = JSON.parse(stringedProduct);

//     const [selectedSize,setSelectedSize] = useState<SizeType>(
//         product.sizes[0]
//     );

//     const [selectedColor,setSelectedColor] = useState<ColorType>(
//         product.colors[0]
//     );

//     const [currentQuantity,setCurrentQuantity] = useState(1);

    
//     const currentPrice = product.prices[0];

//     return (
        
//     )
// };

export default SingleProductClient;