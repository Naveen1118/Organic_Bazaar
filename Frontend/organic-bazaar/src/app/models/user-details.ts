import { Subscription } from "./subscription";

export class UserDetails {
    id!: number;
    username!: string;
    password!: string;
    email!: string;
    mobileNo!: string;
    dateOfBirth!: string; // Consider using Date type if you parse it
    subscription!: Subscription;
    createdDate!: string; // Consider using Date type if you parse it
}