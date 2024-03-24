"use client"

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import styles from "./categorySwiper.module.css"
import Image from 'next/image';
import Link from 'next/link';

const CategorySwiper  = ({
    categories
}:{
    categories:string[]
}) => {

    return (
        <div className={styles.container}>
            <Swiper
                className={styles.swiper}
                slidesPerView={categories.length > 4 ? 4 : 2}
                spaceBetween={30}
            >
                <SwiperSlide>
                    <Link href={"/shop?cat="+"مردانه"}>
                        <div className={styles.slide}>
                            <Image 
                                className={styles.image} 
                                src={"/mancategory.png"}
                                alt=""
                                width={255}
                                height={255}
                            />
                            مردانه
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href={"/shop?cat"+"زنانه"}>
                        <div className={styles.slide}>
                            <Image 
                                className={styles.image} 
                                src={"/womancategory.png"}
                                alt=""
                                width={255}
                                height={255}
                            />
                            زنانه
                        </div>
                    </Link>
                </SwiperSlide>
            </Swiper>
        </div>
    )
};

export default CategorySwiper;