"use client"

import Details from "@/components/details/Details";
import ColorSelect from "@/components/productSinglePage/colorSelect/ColorSelect";
import SizeSelect from "@/components/productSinglePage/sizeSelect/SizeSelect";

import styles from "../singleShoe.module.css"
import { ShoeType } from "@/utils/db/shoe/model";
import Stars from "@/components/stars/Stars";
import { commaEmbedder } from "@/utils/priceConventor/priceConventor";
import { useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

const Test  = ({shoe:stringedShoe}:{shoe:string}) => {
    console.log(stringedShoe);
    const shoe : ShoeType = JSON.parse(stringedShoe);
    const prices = (shoe.prices.map(p => p.price))
        .toSorted((a,b) => a - b);
    const [currentPrice,setCurrentPrice] = useState(prices[0]);
    const [selectedColor,setSelectedColor] = useState(shoe.colors[0].color.name);
    const [selectedSize,setSelectedSize] = useState(shoe.sizes[0].size);
    const [currentQuantity,setCurrentQuantity] = useState(1);
    return (
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
    )
};

export default Test;