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
        const p = `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`
        console.log(p.length,"chars")
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
            ],
            desc:p
        },
        ]);
        return [shoes]
    } catch (err : any&Error) {
        console.log(err.message);
        throw err
    }
}