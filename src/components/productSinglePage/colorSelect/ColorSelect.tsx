import styles from "./colorSelect.module.css";

const ColorSelect  = ({
    selectedColor,
    colors,
    setSelectedColor
}:{
    selectedColor : string,
    colors: Array<{color:{color:string,name:string}}>,
    setSelectedColor : (c:string)=>void
}) => {
    return (
        <div className={styles.container}>
            <p>رنگ:
                <span style={{
                    color:"#826F66"
                }}>{selectedColor}</span>
            </p>
            <div className={styles.colors}>
                {
                    colors.map((c) => {
                        return (
                            <div 
                                key={c.color.color}
                                className={`${styles.color} 
                                    ${c.color.name === selectedColor ? styles.colorSelected : ""}`
                                }
                                style={{backgroundColor:c.color.color}}
                                onClick={() => setSelectedColor(c.color.name)}
                            ></div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default ColorSelect;