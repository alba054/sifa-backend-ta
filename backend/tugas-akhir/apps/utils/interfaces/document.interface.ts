export interface IFreeLabDoc {
  studentName: string;
  studentNIM: string;
  faculty: string;
  headLabName: string;
  headLabNIP: string;
  letterDate: string;
  letterNumber: string;
}

export interface ISupervisorSKDoc {
  studentName: string;
  studentNIM: string;
  deanName: string;
  deanNIP: string;
  letterDate: string;
  letterNumber: string;
  department: string;
  mainMentor: string;
  sideMentor: string;
  major: string;
}

export interface IExaminerSKDoc {
  studentName: string;
  studentNIM: string;
  deanName: string;
  deanNIP: string;
  letterDate: string;
  letterNumber: string;
  department: string;
  chaiman: string;
  secretary: string;
  major: string;
  member: string[];
}

export interface ISeminarApprovalDoc {
  studentName: string;
  studentNIM: string;
  letterDate: string;
  seminarDate: string;
  seminarStartTime: string;
  seminarEndTime: string;
  proposalTitle: string;
  seminarPlace: string;
  firstExaminer: string;
  secondExaminer: string;
  thirdExaminer: string;
  forthExaminer: string;
}

export interface ISeminarLetterEventDoc {
  studentName: string;
  studentNIM: string;
  letterDate: string;
  seminarDate: string;
  seminarStartTime: string;
  seminarEndTime: string;
  proposalTitle: string;
  seminarPlace: string;
  firstExaminer: string;
  secondExaminer: string;
  thirdExaminer: string;
  forthExaminer: string;
  mainMentor: string;
  sideMentor: string;
  deanName: string;
  deanNIP: string;
  major: string;
  firstExaminerScore: number;
  secondExaminerScore: number;
  thirdExaminerScore: number;
  forthExaminerScore: number;
}

export interface ISeminarInvitationDoc {
  studentName: string;
  studentNIM: string;
  letterDate: string;
  seminarDate: string;
  seminarStartTime: string;
  seminarEndTime: string;
  proposalTitle: string;
  seminarPlace: string;
  firstExaminer: string;
  secondExaminer: string;
  mainMentor: string;
  sideMentor: string;
  deanName: string;
  deanNIP: string;
  major: string;
  seminarCoordinatorName: string;
  seminarCoordinatorNIP: string;
  mainMentorNIP: string;
  sideMentorNIP: string;
  firstExaminerNIP: string;
  secondExaminerNIP: string;
  letterNumber: string;
  department: string;
  coordinatorSeminarNote: string;
}

export interface ISeminarScoreDoc {
  department: string;
  letterDate: string;
  studentNIM: string;
  studentName: string;
  proposalTitle: string;
  score: number;
  season: string;
}