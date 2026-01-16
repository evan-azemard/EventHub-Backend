export interface EventNotificationStrategy {
  notify(eventTitle: string, recipientEmail: string): Promise<void>;
}

export class EmailNotificationStrategy implements EventNotificationStrategy {
  async notify(eventTitle: string, recipientEmail: string): Promise<void> {
    console.log(`Sending email to ${recipientEmail} about event: ${eventTitle}`);
  }
}

export class SMSNotificationStrategy implements EventNotificationStrategy {
  async notify(eventTitle: string, recipientEmail: string): Promise<void> {
    console.log(`Sending SMS to ${recipientEmail} about event: ${eventTitle}`);
  }
}

export class PushNotificationStrategy implements EventNotificationStrategy {
  async notify(eventTitle: string, recipientEmail: string): Promise<void> {
    console.log(`Sending push notification to ${recipientEmail} about event: ${eventTitle}`);
  }
}
