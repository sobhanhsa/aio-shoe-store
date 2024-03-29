import styles from "./colorSelect.module.css";

const ColorSelect  = ({
    selectedColor,
    colors
}:{
    selectedColor : string,
    colors: Array<{color:{color:string,name:string}}>
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
                                className={styles.color}
                                style={{backgroundColor:c.color.color}}
                            ></div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default ColorSelect;