import styles from "./color.module.css"

const  Color = ({
    color
}:{
    color:string
}) => {
    return (
        <div className={styles.container} 
            style={{backgroundColor:color}}>
        </div>
    )
};

export default Color;