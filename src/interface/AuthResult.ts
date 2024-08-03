import {User} from "./User";

export interface AuthResult {
    status: boolean;
    data: {
        user: User;
        token: string;
    };
}
