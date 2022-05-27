export interface ValidateData {
  get status(): boolean;

  get messages(): Messages;
}

export interface Message {
  key: string;
  message: string;
}

export interface Messages {
  items: Message[];

  toString(): string;
}

export class Validator implements ValidateData {
  protected _status: boolean;
  protected _messages: Messages;

  constructor(status: boolean, messages: Message[]) {
    this._status = status;
    this._messages = {
      items: messages,
      toString: () => {
        const msgArr = messages.map((value) => {
          return `${value.key}: ${value.message}`;
        });
        return msgArr.join('\n\n');
      },
    };
  }

  get status(): boolean {
    return this._status;
  }

  get messages(): Messages {
    return this._messages;
  }
}
