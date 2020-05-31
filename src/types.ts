export enum Actions {
  SNOOZE = 'snooze',
}

interface Attribute<T> {
  Value: T;
}

export interface SNSMessageAttributes {
  receiver: Attribute<'owlet-worker'>;
  action: Attribute<Actions>;
  value: Attribute<string>;
}
