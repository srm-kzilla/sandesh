export type Campaign = {
  title: string; // Title of the campaign
  createdOn: string; // Date and time of creation
  createdBy: string; // Username of the creator
  mailingList: string; // Name of the mailing list associated with this campaign
  startFrom: string; // Date and time when the campaign starts
  scheduled: boolean; // True if campaign is scheduled.
  subject: string;
  senderMail: string;
  endAt: string; //Date and time when campaign ends
  fileName: string; //Name of the Template stored in templates folder
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

export type Decipher = {
  iv: string;
  content: string;
};

export type KeyWithDecipher = {
  user: string;
  key: Decipher;
  isEnabled: boolean;
};

export type MailingList = {
  name: string; // Name to Uniquely Identify the MailingList
  description: string; //Defines the purpose to define the mailing List
  emails: Array<string>; // Array of Mails to be put in Mailing List
  createdOn: string;
};

export type UserPayload = {
  email: string;
  name: string;
  iet: number;
};
