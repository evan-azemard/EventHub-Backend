export class EmailNotificationStrategy {
    async notify(eventTitle, recipientEmail) {
        console.log(`Sending email to ${recipientEmail} about event: ${eventTitle}`);
    }
}
export class SMSNotificationStrategy {
    async notify(eventTitle, recipientEmail) {
        console.log(`Sending SMS to ${recipientEmail} about event: ${eventTitle}`);
    }
}
export class PushNotificationStrategy {
    async notify(eventTitle, recipientEmail) {
        console.log(`Sending push notification to ${recipientEmail} about event: ${eventTitle}`);
    }
}
//# sourceMappingURL=NotificationStrategy.js.map