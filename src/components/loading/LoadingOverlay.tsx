import styles from "./loadingOverlay.module.css"

export const LoadingOverlay = () => {
    return (
        <div className={styles.container}>
            <span className={styles.loader}></span>
        </div>
    )
}