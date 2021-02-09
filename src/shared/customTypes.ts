import { type } from 'os';

export type Campaign = {
  title: string; // Title of the campaign
  createdOn: string; // Date and time of creation
  createdBy: string; // Username of the creator
  mailingList: string; // Name of the mailing list associated with this campaign
  startFrom: string; // Date and time when the campaign starts
  endAt: string; // Date and time when the campaign ends
  isolatedEmails?: string[]; // Array of emails to send mail to (if the emails are not present in the mailing list)
};

export type CustomMail = {
  subject: string; // Subject of the email
  body: string; // Body of the email
  fromAddress: string; // The address of the sender
  toAddress: string; // The address of the receiver
};

export type UserDomain = 'Technical' | 'Sponsorship' | 'Editorial' | 'Events' | 'Core';
export type UserDesigation =
  | 'Executive Board'
  | 'CTO'
  | 'CFO'
  | 'Editor-in-chief'
  | 'Lead'
  | 'Associate Lead'
  | 'Member';

export type User = {
  name: string; // Full name of the user
  domain: UserDomain; // Domain of the user
  designation: UserDesigation; // Designation of the user
  email: string; // Email of the user
  password: string; // Hashed password
};
