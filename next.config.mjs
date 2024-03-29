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
}};

export default nextConfig;
