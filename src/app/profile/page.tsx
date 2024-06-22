"use client"

import { AuthenticatedProfile } from "@/components/profile/authenticated/AuthenticatedProfile";
import { UnAuthenticatedProfile } from "@/components/profile/unAuthenticated/UnAuthenticatedProfile";
import { useAuthContext } from "@/context/authContext";

const ProfilePage = () => {

    const auth = useAuthContext();

    // authenticated || un...

    return (
        <div>
            {
                auth?.status && auth.user ? (
                    // user is authenticated
                    <AuthenticatedProfile user={auth.user} />
                ) : (
                    // user is not authenticated
                    <UnAuthenticatedProfile />
                )
            }
        </div>
    )
};

export default ProfilePage;