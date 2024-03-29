import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";

const Stars  = ({count,activeStars}
    :{count:number,activeStars:number}) => {
    return (
        <div style={{display:"flex"}}>
            {
                (Array.from(Array(activeStars).keys())).map(a => (
                    <AiFillStar key={a} size={12} color="#C69B7B" />
                ))
            }
            {
                (Array.from(Array(count - activeStars).keys()))
                .map(a => (
                    <AiOutlineStar key={a} size={12} color="#C69B7B" />
                ))
            }
        </div>
    )
};

export default Stars;