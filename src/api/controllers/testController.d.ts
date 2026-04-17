import { Request, Response } from 'express';
import { UserRepositoryInterface } from '../../domain/interfaces/UserRepositoryInterface';
export declare class TestController {
    private userRepository;
    constructor(userRepository: UserRepositoryInterface);
    getUsersEmails(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=testController.d.ts.map