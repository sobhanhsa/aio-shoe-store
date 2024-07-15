import { ColorType } from "@/utils/db/color/model";
import styles from "./colorSelect.module.css";

const ColorSelect  = ({
    selectedColor,
    colors,
    setSelectedColor
}:{
    selectedColor : ColorType,
    colors: ColorType[],
    setSelectedColor : (c:ColorType)=>void
}) => {
    return (
        <div className={styles.container}>
            <p>رنگ:
                <span className={styles.title} style={{
                    color:`${selectedColor.value}`
                }}>{selectedColor.title}</span>
            </p>
            <div className={styles.colors}>
                {
                    colors?.map((c) => {
                        return (
                            <div 
                                key={c._id}
                                className={
                                    `
                                        ${styles.color} 
                                        ${c.title === selectedColor.title 
                                            ? styles.colorSelected
                                            : ""
                                        }
                                    `
                                }
                                style={{backgroundColor:c.value||"transparent"}}
                                onClick={() => setSelectedColor(c)}
                            ></div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default ColorSelect;