import * as qrcode from "qrcode";
import * as otplib from "otplib";
export class QrCodeGenerator {
    appName;
    constructor(appName) {
        this.appName = appName;
    }
    async generate(username, secret) {
        const keyUri = otplib.generateURI({
            issuer: this.appName,
            label: username,
            secret: secret,
        });
        const image = await qrcode.toDataURL(keyUri);
        return Promise.resolve({ image, username, secret });
    }
}
//# sourceMappingURL=qr-code-generator.js.map