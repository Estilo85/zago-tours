import { google } from 'googleapis';

export class CalendarService {
  private calendar = google.calendar('v3');
  private auth;

  constructor() {
    this.auth = new google.auth.JWT();
    //   process.env.GOOGLE_CLIENT_EMAIL,
    //   null,
    //   process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    //   ['https://www.googleapis.com/auth/calendar']
  }

  async createEvent(details: {
    summary: string;
    description: string;
    startTime: Date;
    endTime: Date;
    attendees: string[];
  }) {
    const response = await this.calendar.events.insert({
      auth: this.auth,
      calendarId: process.env.GOOGLE_CALENDAR_ID, // Your company calendar
      conferenceDataVersion: 1,
      requestBody: {
        summary: details.summary,
        description: details.description,
        start: { dateTime: details.startTime.toISOString() },
        end: { dateTime: details.endTime.toISOString() },
        attendees: details.attendees.map((email) => ({ email })),
        conferenceData: {
          createRequest: {
            requestId: `req-${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      },
    });

    return {
      id: response.data.id,
      meetingLink: response.data.hangoutLink,
    };
  }
}
