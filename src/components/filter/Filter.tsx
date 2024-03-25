import ColorSelect from "@/components/colorSelect/ColorSelect";
import FilterSelect from "@/components/filterSelect/FilterSelect";
import styles from "./filter.module.css"

const  Filter = () => {
    return (
        <div className={styles.container}>
            <p className={styles.quantity}>
                نشان دادن n ایتم
            </p>
            <hr className={styles.line} />
            <FilterSelect 
                name="cat"
                title="دسته بندی" 
                items={[
                    {
                        title:"مردانه",
                        value:"مردانه"
                    },{
                        title:"زنانه",
                        value:"زنانه"
                    }
                ]}
            />
            <hr className={styles.line} />
            <FilterSelect
                name="range"
                title="بازه قیمت" 
                items={[
                    {title:"0 - 150,000",value:"0-150000"},
                    {title:"150,000 - 300,000",value:"150000-300000"},
                    {title:"600,000 - 900,000",value:"600000-900000"},
                    {title:"900,000 - 1,200,000",value:"900000-120000"},
                    {title:"1,200,000 - 1,800,000",value:"1200000-1800000"},
                    {title:"1,800,000 - به بالا",value:"1800000-inf"},
                ]}
            />
            <hr className={styles.line} />
            <ColorSelect title="رنگ" 
                colors={[
                    "FFFFFF",
                    "C69B7B",
                ]}
            />
            <hr className={styles.line} />
            <FilterSelect 
                name="material"
                title="جنس" 
                items={[
                    {title:"چرم",value:"چرم"},
                    {title:"کتونی",value:"کتونی"}
                ]}
            />
        </div>
    )
};

export default Filter;