export interface IListReferencesDTO {
  id: string;
  name: string;
  updatedAt: Date | string;
}

export interface IReferenceDetailDTO {
  id: string;
  name: string;
  updatedAt: Date | string;
  attachment: string[];
  description: string;
}
