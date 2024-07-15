import { SizeType } from "@/utils/db/size/model";
import styles from "./sizeSelect.module.css";

const SizeSelect  = ({
    selectedSize,
    sizes,
    setSelectedSize
}:{
    selectedSize:SizeType,
    sizes:SizeType[],
    setSelectedSize:(s:SizeType)=>void
}) => {
    return (
        <div className={styles.container}>
            <p>سایز:
                <span style={{
                    color:"#826F66"
                }}>{selectedSize.title}</span>
            </p>
            <div className={styles.sizes}>
                {
                    sizes.map((s) => {
                        return (
                            <div 
                                key={s._id}
                                className={`${styles.size}
                                    ${
                                        selectedSize._id === s._id
                                        &&
                                        styles.sizeSelected
                                    }
                                `}
                                onClick={() => setSelectedSize(s)}
                            >
                                {s.value}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default SizeSelect;