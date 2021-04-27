/* eslint-disable import/prefer-default-export */
export const NyxxColors = {
  ERROR: 'DB2B39',
  WARN: 'F0C808',
  INFO: '3A86FF',
  SUCCESS: '03DD5E',
  DEFAULT: '2FAAE2',
};

export const Version = '0.0.1';

export const NyxxEmojis = {
  LOADING: '<a:NyxxLoading:833541697404796928>',
};

export const NyxxStatuses: {
  type: 'WATCHING' | 'LISTENING' | 'PLAYING' | 'COMPETING';
  text: string;
}[] = [
  {
    type: 'WATCHING',
    text: 'for n!help',
  },
  {
    type: 'LISTENING',
    text: 'nothing :(',
  },
  {
    type: 'PLAYING',
    text: 'https://domain.tld',
  },
];

export const ApplicationCommandOptionType = {
  string: 3,
  number: 4,
  commandAlias: 3,
  user: 6,
  channel: 7,
  role: 8,
}