import { iQrCode } from "../interfaces/qr-code-generrator.interface";
export declare class QrCodeGenerator implements iQrCode {
    private readonly appName;
    constructor(appName: string);
    generate(username: string, secret: string): Promise<{
        image: string;
        username: string;
        secret: string;
    }>;
}
//# sourceMappingURL=qr-code-generator.d.ts.map