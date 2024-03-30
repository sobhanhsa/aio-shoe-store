"use client"

import Details from "@/components/details/Details";
import ColorSelect from "@/components/productSinglePage/colorSelect/ColorSelect";
import SizeSelect from "@/components/productSinglePage/sizeSelect/SizeSelect";

import styles from "../singleShoe.module.css"
import { ShoeType } from "@/utils/db/shoe/model";
import Stars from "@/components/stars/Stars";
import { commaEmbedder } from "@/utils/priceConventor/priceConventor";
import { useEffect, useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { CartItemType } from "@/utils/db/cartItem/model";

import {Types} from "mongoose";
import { toast } from "react-toastify";

const addToCart = async(cartItem:CartItemType) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"cart",{
        method:"POST",
        body:JSON.stringify({
            ...cartItem
        })
    });
    return res
}   
const SingleShoeClient  = ({shoe:stringedShoe}:{shoe:string}) => {
    const shoe : ShoeType = JSON.parse(stringedShoe);
    const prices = (shoe.prices.map(p => p.price))
        .toSorted((a,b) => a - b);
    const [currentPrice,setCurrentPrice] = useState(prices[0]);
    const [selectedColor,setSelectedColor] = useState(shoe.colors[0].color.name);
    const [selectedSize,setSelectedSize] = useState(shoe.sizes[0].size);
    const [currentQuantity,setCurrentQuantity] = useState(1);

    const [colors,setColors] = useState(shoe.colors);

    const handleAddCart = () => {
        
        const userId = "66080c8426f9e94d1651ae23"

        const res = addToCart({
            spec:{
                productId:new Types.ObjectId(shoe._id) as any,
                colorName:selectedColor,
                size:selectedSize,
                userId:new Types.ObjectId(userId) as any,
            },
            quantity:currentQuantity,
        } as any);

        const toastRes = new Promise((resolve,reject) => {
            res.then(
                r => !r.ok 
                ? reject("duplicated cart item") 
                : resolve("success")
            )
        })

        toast.promise(toastRes,{
            pending:"در حال افزودن محصول به سبد خرید",
            success:"با موفقیت افزوده شد",
            error:"این محصول قبلا افزوده شده است"
        })

    }

    useEffect(() => {
        const price = shoe.prices.find(
            p => {
                return(
                    p.sizes.find(s => s.size === selectedSize)
                )
            }
        );
        price && setColors(shoe.colors.filter(color=>{
            return price.colors.find(priceC => priceC.colorName === color.color.name)
        }) as any)
    },[selectedSize])

    useEffect(() => {
        setSelectedColor(prevC => {
            return colors.find(c => c.color.name === prevC) ? prevC : colors[0].color.name
        })
    },[colors])

    useEffect(() => {
        const price = shoe.prices.find(
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
                colors={colors}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                />
            <SizeSelect
                sizes={shoe.sizes}
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
                    onClick={handleAddCart}>
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
                dimenstions={shoe.dimenstions}
                reviews={null}
            />
        </div>
    )
};

export default SingleShoeClient;