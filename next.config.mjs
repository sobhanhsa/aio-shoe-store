/** @type {import('next').NextConfig} */
const nextConfig = {images:{
    remotePatterns:[
        {
            protocol:"https",
            hostname:"dkstatics-public.digikala.com"
        },
        {
            protocol:"https",
            hostname:"swiperjs.com"
        }
    ]
},
    env:{
        productsPerPage:"9"
    }
};

export default nextConfig;
