"use client"

import styles from "./productImageSwiper.module.css"

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from "next/image";
import { useState } from "react";

export const ProductImageSwiper = ({
    images
}:{
    images:string[]
}) => {
    const 
        [thumbsSwiper,setThumbsSwiper] = useState<null|SwiperClass>(null);
    return (
        <div className={styles.container}>
            {/* main swiper */}
            <Swiper
                className={styles.swiper}
                slidesPerView={1}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                >
                {
                    images?.map(image => (
                        <SwiperSlide 
                        key={image}>
                            <div className={styles.imageContainer}>
                                <Image
                                    className={styles.image}
                                    src={image}
                                    alt=""
                                    fill
                                    // width={555}
                                    // height={700}
                                />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {/* tumb swiper */}
            <Swiper
                className={styles.swiperTumb}
                onSwiper={(s) => {
                    setThumbsSwiper(s);
                }}
                spaceBetween={25}
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
            >
                {images?.map(image => (
                    <SwiperSlide 
                        key={image}
                    >
                        <Image
                            className={styles.image}
                            src={image}
                            alt=""
                            width={100}
                            height={100}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
