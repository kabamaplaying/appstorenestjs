import { RolType } from "src/modules/rol/roletype.enum";

export interface IJwtPayload {
    id: number;
    username: string;
    email: string;
    roles: RolType[];
    iat?: Date;
}