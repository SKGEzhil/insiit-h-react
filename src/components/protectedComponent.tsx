import {useAuth} from "../context/authContext.tsx";

/**
 * `ProtectedComponent` is a React component that renders children based on the user's permissions.
 * - If the user is **not authenticated**, the children will not be rendered.
 * - If the user is **authenticated** and has the required permissions, roles, or is the author of the post, the children
 * will be rendered.
 *
 * @memberOf Components
 * @param {Object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the component.
 * @param {string[]} [props.permissions] - The permissions required to render the children.
 * @param {string} [props.authorId] - The author ID required to render the children.
 * @param {string[]} [props.roles] - The roles required to render the children.
 *
 * @returns {JSX.Element} The rendered component.
 */

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