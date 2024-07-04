export class UserModel {
    id: string;
    name: string;
    email: string;
    role: string;
    photoUrl: string;
    // token: string;
    constructor(id: string, name: string, email: string, role: string, photoUrl: string, ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.photoUrl = photoUrl;
        // this.token = token;
    }
}