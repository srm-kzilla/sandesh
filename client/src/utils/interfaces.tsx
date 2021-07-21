export interface CampaignInput {
  title: string;
  mailingList: string;
  startTime: string;
  start_time?: string;
  start_date?: string;
  scheduled: boolean;
  subject: string;
  senderMail: string;

  fileName?: string;
}
