import styles from "./sortSelect.module.css"

const  SortSelect = () => {
    return (
        <div className={styles.container}>
            <p className={styles.title}>
                مرتب سازی بر اساس   
            </p>
            <select className={styles.select} 
                name="sort" id="sort">
                <option value="name">نام</option>
            </select>   
        </div>
    )
};

export default SortSelect;