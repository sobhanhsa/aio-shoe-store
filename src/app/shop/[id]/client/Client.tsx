"use client"

import Details from "@/components/details/Details";
import ColorSelect from "@/components/productSinglePage/colorSelect/ColorSelect";
import SizeSelect from "@/components/productSinglePage/sizeSelect/SizeSelect";

import styles from "../singleShoe.module.css"
import { ProductType } from "@/utils/db/product/model";
import Stars from "@/components/stars/Stars";
import { commaEmbedder } from "@/utils/priceConventor/priceConventor";
import { useEffect, useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { CartItemType } from "@/utils/db/cartItem/model";

import {Types} from "mongoose";
import { toast } from "react-toastify";
import { useAddToCart } from "@/hooks/useAddToCart";


const SingleShoeClient  = ({shoe:stringedShoe}:{shoe:string}) => {
    const product : ProductType = JSON.parse(stringedShoe);
    const prices = (product.prices.map(p => p))
        .toSorted((a,b) => a - b);
    const [currentPrice,setCurrentPrice] = useState(prices[0]);
    const [selectedColor,setSelectedColor] = useState(
        product.colors[0].color.name
    );
    const [selectedSize,setSelectedSize] = useState(product.sizes[0].size);
    const [currentQuantity,setCurrentQuantity] = useState(1);

    const [colors,setColors] = useState(product.colors);

    useEffect(() => {
        const price = product.prices.find(
            p => {
                return(
                    p.sizes.find(s => s.size === selectedSize)
                )
            }
        );
        price && setColors(product.colors.filter(color=>{
            return price.colors.find(priceC => priceC.colorName === color.color.name)
        }) as any)
    },[selectedSize])

    useEffect(() => {
        setSelectedColor(prevC => {
            return colors.find(c => c.color.name === prevC) ? prevC : colors[0].color.name
        })
    },[colors])

    useEffect(() => {
        const price = product.prices.find(
            p => {
                // console.log(p);
                return(
                    p.colors.find(c => c.colorName === selectedColor) 
                    && 
                    p.sizes.find(s => s.size === selectedSize)
                )
        }
        );
        // console.log(price)
        price?.price && setCurrentPrice(price.price);
    },[selectedSize,selectedColor])

    return (
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
                colors={colors}
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
                        spec:{
                            productId:shoe._id,
                            colorName:selectedColor,
                            size:selectedSize
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
    )
};

export default SingleShoeClient;