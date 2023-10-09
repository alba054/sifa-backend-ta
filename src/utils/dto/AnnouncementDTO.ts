export interface IListAnnouncementsDTO {
  id: string;
  name: string;
  updatedAt: Date | string;
  authorName: string;
}

export interface IAnnouncementDetailDTO {
  id: string;
  name: string;
  updatedAt: Date | string;
  attachment: string[];
  authorName: string;
  description: string;
}
