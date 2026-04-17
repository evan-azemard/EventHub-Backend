export interface EventNotificationStrategy {
    notify(eventTitle: string, recipientEmail: string): Promise<void>;
}
export declare class EmailNotificationStrategy implements EventNotificationStrategy {
    notify(eventTitle: string, recipientEmail: string): Promise<void>;
}
export declare class SMSNotificationStrategy implements EventNotificationStrategy {
    notify(eventTitle: string, recipientEmail: string): Promise<void>;
}
export declare class PushNotificationStrategy implements EventNotificationStrategy {
    notify(eventTitle: string, recipientEmail: string): Promise<void>;
}
//# sourceMappingURL=NotificationStrategy.d.ts.map