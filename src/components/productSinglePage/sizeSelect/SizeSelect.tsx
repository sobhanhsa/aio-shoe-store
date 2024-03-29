import styles from "./sizeSelect.module.css";

const SizeSelect  = ({
    selectedSize,
    sizes
}:{
    selectedSize:number,
    sizes:{size:number}[]
}) => {
    return (
        <div className={styles.container}>
            <p>سایز:
                <span style={{
                    color:"#826F66"
                }}>{selectedSize}</span>
            </p>
            <div className={styles.sizes}>
                {
                    sizes.map((s) => {
                        return (
                            <div 
                                key={s.size}
                                className={`${styles.size}
                                    ${selectedSize === s.size && styles.sizeSelected}
                                `}
                            >
                                {s.size}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default SizeSelect;