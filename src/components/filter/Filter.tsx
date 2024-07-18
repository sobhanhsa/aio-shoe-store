import { DescktopFilter } from "./desktop/DesktopFilter"
import { MobileFilter } from "./mobile/MobileFilter";


const Filter = (
    {
        productsFetcher,
        count
    }:{
        productsFetcher:Function,
        count:number
    }
) => {
    return (
        <>
            <DescktopFilter productsFetcher={productsFetcher} count={count} />
            <MobileFilter productsFetcher={productsFetcher} count={count} />
        </>
    )
}

export default Filter;