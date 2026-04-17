export class TestController {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUsersEmails(req, res) {
        try {
            const users = await this.userRepository.findAll();
            const emails = users.map(user => user.email);
            return res.status(200).json({
                success: true,
                data: emails
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching user emails',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }
}
//# sourceMappingURL=testController.js.map