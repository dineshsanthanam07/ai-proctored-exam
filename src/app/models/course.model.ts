export interface Course {
  id?: number;
  courseId: string;
  name: string;
  facultyId: number;
  facultyName?: string;
  createdAt?: Date;
}
export interface Faculty {
  id: number;
  name: string;
  department: string;
  designation: string;
}
