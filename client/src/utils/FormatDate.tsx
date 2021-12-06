export function toBackend(date: Date, time: string, start_date: string) {
  const minute = time?.split(':')[1];
  const hour = time?.split(':')[0];

  const day_of_month = parseInt(start_date!.split('-')[2]);
  const month = parseInt(start_date!.split('-')[1]);
  const day_of_week = date.getDay();
  return { minute, hour, day_of_month, month, day_of_week };
}

export function toFrontend(cron: string, type: 'input' | 'display') {
  const elements = cron.split(' ');
  const minute = elements[0];
  const hour = elements[1];
  let day_of_month = elements[2];
  let month: any = elements[3];
  // const day_of_week = elements[4];

  month = parseInt(month) < 10 ? '0' + month : month;
  day_of_month = parseInt(day_of_month) < 10 ? '0' + day_of_month : day_of_month;

  let date = month + '-' + day_of_month;
  let time = hour + ':' + minute;

  if (type === 'display') {
    date = day_of_month + '/' + month + ' ';
  } else {
    const year = new Date().getMonth() > month - 1 ? new Date().getFullYear() + 1 : new Date().getFullYear();

    date = year + '-' + date;
  }

  return { date, time };
}
