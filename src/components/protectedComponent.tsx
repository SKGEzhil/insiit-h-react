import {useAuth} from "../context/authContext.tsx";

function ProtectedComponent(props: {
    children: React.ReactNode,
    permissions?: string[],
    authorId?: string,
    roles?: string[]
}) {

    const {profile} = useAuth();

    return (
        <>
            {
                // If the user is logged in.. and user is either an admin or user has the required permissions or user has one of the required roles or user is the author of the post
                profile && (profile.role === "admin" ||
                    (props.permissions && props.permissions.some((permission) => profile?.permissions.includes(permission))) ||
                    (props.roles && props.roles.some((role) => profile?.role.includes(role))) ||
                    (props.authorId && profile?.id === props.authorId)) ? props.children : null
            }
        </>
    )

}

export default ProtectedComponent;