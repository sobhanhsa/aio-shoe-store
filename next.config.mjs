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
        postsPerPage:"9"
    }
};

export default nextConfig;
