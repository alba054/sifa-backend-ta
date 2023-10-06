import { DAY } from "..";

export interface IPostClass {
  readonly name: string;
  readonly subjectId: string;
  readonly day: DAY;
  readonly time: number;
  readonly endTime: number;
}

export interface IPutClass {
  readonly name?: string;
  readonly subjectId?: string;
  readonly day?: DAY;
  readonly time?: number;
  readonly endTime?: number;
}

export interface IPutUserClass {
  readonly userIds: string[];
}
