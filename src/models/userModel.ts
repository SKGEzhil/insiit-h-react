/**
 * User model
 * @property {string} id - User id
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {string} role - User role
 * @property {string} photoUrl - User photo url
 * @property {string[]} permissions - User permissions
 */

export class UserModel {
    id: string;
    name: string;
    email: string;
    role: string;
    photoUrl: string;
    permissions: string[];
    // token: string;
    constructor(id: string, name: string, email: string, role: string, photoUrl: string, permissions: string[]) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.photoUrl = photoUrl;
        this.permissions = permissions;
        // this.token = token;
    }
}