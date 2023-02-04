interface Role {
  aksesId: number;
  aksesNama: string;
}

interface Badge {
  userId: number;
  badgeId: number;
  badge: { name: string };
}

export interface TokenPayload {
  username: string;
  email: string;
  name: string;
  status: number;
  groupAccess: Role;
  description: string;
  departmentID: number;
  vocationID: number;
  labID: number;
  badges: Badge[];
}
