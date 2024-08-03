import {Permission} from "./Permission";

export interface User {
    role: {
        permissions: Permission[];
    };
}
