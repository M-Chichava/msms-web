import {AppDispatch, RootState} from "../../redux/reducers";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const API_URL = "https://localhost:5001/api";

export const SECRET_BUFFER = "SDY%>PD1a_S3AS5sad*dsd/8SDEWF&8c";

export const IV_SECRET = Buffer.alloc(16);

//export const API_URL = "api";

export function encryptWithBuffer(data) {
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(SECRET_BUFFER), IV_SECRET);

    let encrypted = cipher.update(data, "utf-8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
}

export function decryptWithBuffer(encryptedData) {

    try {
        const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(SECRET_BUFFER), IV_SECRET);

        let decrypted = decipher.update(encryptedData, "hex", "utf-8");
        decrypted += decipher.final("utf-8");

        return decrypted;
    }
    catch (e) {
       //
    }
}



import * as crypto from "crypto";
export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector