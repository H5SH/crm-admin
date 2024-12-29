import { DocumentData, DocumentSnapshot } from "firebase/firestore";


export interface UserModal extends DocumentData{
    role?: "resturant_admin"
}