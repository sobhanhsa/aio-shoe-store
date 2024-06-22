import styles from "./accountMenu.module.css";

import { useAuthContext } from "@/context/authContext";
import Link from "next/link";
import { PiUserCircleThin } from "react-icons/pi";

export const AccountMenu = () => {


    return (
        <>
            <Link href={"/profile"}>
                <PiUserCircleThin 
                    size={20} 
                />
            </Link>
        </>
    )
};