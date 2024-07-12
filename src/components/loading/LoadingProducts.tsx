import styles from "./loadingProducts.module.css"

export const LoadingProducts = () => {
    return (
        <div className={styles.container}>
            <span className={styles.loader}></span>
        </div>
    )
}