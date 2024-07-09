import { ColorType } from "@/utils/db/color/model";
import styles from "./colorSelect.module.css";

const ColorSelect  = ({
    selectedColor,
    colors,
    setSelectedColor
}:{
    selectedColor : string,
    colors: Array<ColorType>,
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
                                key={c._id}
                                className={`${styles.color} 
                                    ${c.title === selectedColor 
                                        ? styles.colorSelected
                                        : ""
                                    }`
                                }
                                style={{backgroundColor:c?.value}}
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