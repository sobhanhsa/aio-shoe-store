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

const  SingleShoe = async({params}:{
    params:{
        id:string
    }
}) => {
    const shoe : ShoeType = await findShoe(params.id);
    const selectedColor = "ابی";
    const currentQuantity = 1;
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
                    </div>
                    <div className={styles.colorsContainer}>
                        <p>رنگ:
                            <span style={{
                                color:"#826F66"
                            }}>{selectedColor}</span>
                        </p>
                        <div className={styles.colors}>
                            {
                                shoe.colors.map((c) => {
                                    return (
                                        <div 
                                            key={c.color.color}
                                            className={styles.color}
                                            style={{backgroundColor:c.color.color}}
                                        ></div>
                                    )
                                })
                            }
                        </div>
                    </div>
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
                        desc={""}
                        dimenstions={""}
                        reviews={null}
                    />
                </div>
            </div>
            <div className={styles.similarItems}>

            </div>
        </div>
    )
};

export default SingleShoe;