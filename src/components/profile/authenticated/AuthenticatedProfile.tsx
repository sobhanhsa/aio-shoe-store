"use client"

import Link from "next/link";
import styles from "./authenticatedProfile.module.css";
import Image from "next/image";
import { UserType } from "@/utils/db/user/model";
import { CiEdit, CiLogout } from "react-icons/ci";
import { useLogOut } from "@/hooks/useLogOut";
import { AuthActions } from "@/components/authActions/AuthActions";

export const AuthenticatedProfile = ({user}:{user:UserType}) => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {/* user profile image */}
                <div className={styles.imageContainer}>
                    <Image 
                        className={styles.image} 
                        src={"/user.png"}
                        fill
                        alt="user profile image"
                    />
                </div>
                {/* name */}
                <p className={styles.name}>
                    {user.name}
                </p>
                {/* username */}
                <p className={styles.username}>
                    {user.username}
                </p>
                {/* auth action bar */}
                <AuthActions />
                {/* seprator */}
                <br />
                
            </div>
        </div>
    )
};