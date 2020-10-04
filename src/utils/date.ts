export type FormattedDate = {
  datetime: string;
  isNew: boolean;
};

export const formatDate = (d: Date, now: Date): FormattedDate => {
  const dtf = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  });

  const [
    { value: year },
    ,
    { value: month },
    ,
    { value: day },
    ,
    { value: hour },
    ,
    { value: minute },
    ,
  ] = dtf.formatToParts(d);

  const past = (d.getTime() - now.getTime()) / 1000;
  const isNew = past <= 24 * 60 * 60 * 7; // 一週間以内をnewとみなす
  return {
    datetime: `${year}/${month}/${day} ${hour}:${minute}`,
    isNew: isNew,
  };
};
