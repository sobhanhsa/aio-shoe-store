import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";

const Stars  = ({count,activeStars}
    :{count:number,activeStars:number}) => {
    return (
        <div style={{display:"flex"}}>
            {
                (new Array(activeStars).fill("")).map(a => (
                    <AiFillStar size={12} color="#C69B7B" />
                ))
            }
            {
                (new Array(count - activeStars).fill(""))
                .map(a => (
                    <AiOutlineStar size={12} color="#C69B7B" />
                ))
            }
        </div>
    )
};

export default Stars;