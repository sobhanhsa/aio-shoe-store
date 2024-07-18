"use client"

import styles from "./productImageSwiper.module.css"

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from "next/image";
import { useState } from "react";

export const ThumbSwiper = ({
    setThumbsSwiper,
    images
}:{
    setThumbsSwiper:Function,
    images:any
}) => {


    const breakpoints =  {
        320: {
            spaceBetween: 5,
            slidesPerView: 5
        },

        1024: {
            spaceBetween: 20,
            slidesPerView: 5
        },
        1920: {
            spaceBetween: 25,
            slidesPerView: 5
        },
    }


    const imagess = [...images,...images]

    return (
        <Swiper

            className={styles.swiperThumb}
            onSwiper={(s) => {
                setThumbsSwiper(s);
            }}
            spaceBetween={25}
            slidesPerView={5}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            breakpoints={breakpoints}
        >
                {imagess?.map((image:any,i:number) => (
                    <SwiperSlide 
                        key={image}
                    >
                        <div className={styles.thumbImageContainer}>
                            <Image
                                className={styles.image}
                                src={image}
                                alt=""
                                fill
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
    )
}

export const ProductImageSwiper = ({
    images
}:{
    images:string[]
}) => {
    const 
        [thumbsSwiper,setThumbsSwiper] = useState<null|SwiperClass>(null);

    const breakpoints = {
        768: {
            spaceBetween: 0,
        },
        1024: {
            spaceBetween: 20,
        },
        1920: {
            spaceBetween: 20,
        },
    }
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
            {/* thumb swiper */}
            <ThumbSwiper setThumbsSwiper={setThumbsSwiper} images={images} />
        </div>
    )
}
