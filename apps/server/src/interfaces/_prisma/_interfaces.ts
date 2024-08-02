export interface UserData{
    id: string;
    firstName: string;
    lastName: string | null;
    email: string;
    profileImageUrl: string;
    createAt: Date;
    updatedAt: Date;
  }