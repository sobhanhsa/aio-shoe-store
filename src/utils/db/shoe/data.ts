import { connectToDB } from "../utils";
import { ShoeModel } from "./model"

export const findShoes = async () => {
    try {
        await connectToDB();
        const shoes = await ShoeModel.find({});
        return shoes
    } catch (err : any&Error) {
        console.log(err.message);
        throw err
    }
};

export const findShoe = async (id:string) => {
    try {
        await connectToDB();
        const shoe = await ShoeModel.findById({
            _id:id
        });
        return shoe
    } catch (err:any&Error) {
        console.log(err.message)
        throw err
    }
}


export const createShoes = async () => {
    try {
        await connectToDB();
        await ShoeModel.deleteMany({});
        const shoes = await ShoeModel.create([{
            category:"man",
            brand:"پوما",
            name:`
                van2-sor
                کفش روزمره مردانه مدل 
            `,
            images:[
                    {
                    color:"red",
                    image:"https://dkstatics-public.digikala.com/digikala-products/03065c4e5f63ab8b23e73d735ddc4369c0560abf_1691074420.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
                }
            ],
            colors:[
                {
                    color:"red",
                    price:500000
                }
            ],
            sizes:[{
                size:42,
                price:500000
            }],
            prices:[
                500000
            ]
        },
        ]);
        return [shoes]
    } catch (err : any&Error) {
        console.log(err.message);
        throw err
    }
}