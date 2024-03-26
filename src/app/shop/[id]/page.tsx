import { findShoe } from "@/utils/db/shoe/data";
import styles from "./singleShoe.module.css"
import { ShoeType } from "@/utils/db/shoe/model";
import Image from "next/image";

const  SingleShoe = async({params}:{
    params:{
        id:string
    }
}) => {
    const shoe : ShoeType = await findShoe(params.id);
    return (
        <div className={styles.container}>
            
        </div>
    )
};

export default SingleShoe;