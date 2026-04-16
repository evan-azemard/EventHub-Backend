import * as qrcode from "qrcode";
import * as otplib from "otplib";
import { iQrCode } from "../interfaces/qr-code-generrator.interface";

export class QrCodeGenerator implements iQrCode {
    constructor(private readonly appName: string) {}
    
    async generate(username: string, secret: string) {
        const keyUri = otplib.generateURI({
            issuer: this.appName,
            label: username,
            secret: secret,
        });
        const image = await qrcode.toDataURL(keyUri);
        return Promise.resolve({ image, username, secret });
    }
}