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

export type Logininfo={
  email: string;
  password: string
};

export type Userinfo={
  name: string;
  email: string;
  password: string;
};
