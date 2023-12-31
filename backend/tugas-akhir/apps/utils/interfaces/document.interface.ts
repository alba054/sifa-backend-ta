export interface IFreeLabDoc {
  studentName: string;
  studentNIM: string;
  faculty: string;
  headLabName: string;
  headLabNIP: string;
  letterDate: string | Date;
  letterNumber: string;
  labName: string;
  major: string;
  title: string;
  signature?: string;
}

export interface ISupervisorSKDoc {
  studentName: string;
  studentNIM: string;
  deanName: string;
  deanNIP: string;
  letterDate: string | Date;
  letterNumber: string;
  department: string;
  mainMentor: string;
  sideMentor: string;
  major: string;
  signature?: string;
  proposalTitle?: string;
}

export interface IExaminerSKDoc {
  studentName: string;
  studentNIM: string;
  deanName: string;
  deanNIP: string;
  letterDate: string | Date;
  letterNumber: string;
  department: string;
  chaiman: string;
  secretary: string;
  major: string;
  member: string[];
  signature?: string;
  proposalTitle: string;
}

export interface ISeminarApprovalDoc {
  studentName: string;
  studentNIM: string;
  letterDate: string | Date;
  seminarDate: string | Date;
  seminarStartTime: string;
  seminarEndTime: string;
  proposalTitle: string;
  seminarPlace: string;
  firstExaminer: string;
  secondExaminer: string;
  thirdExaminer: string;
  forthExaminer: string;
  major?: string;
}

export interface ISeminarLetterEventDoc {
  studentName: string;
  studentNIM: string;
  letterDate: string | Date;
  seminarDate: string | Date;
  seminarStartTime: string;
  seminarEndTime: string;
  proposalTitle: string;
  seminarPlace: string;
  firstExaminer: string;
  secondExaminer: string;
  thirdExaminer: string;
  forthExaminer: string;
  firstExaminerSignature?: string;
  secondExaminerSignature?: string;
  thirdExaminerSignature?: string;
  forthExaminerSignature?: string;
  seminarCoordinatorSignature?: string;
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
  letterDate: string | Date;
  seminarDate: string | Date;
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
  link?: string;
  moderator?: string;
}

export interface ISeminarScoreDoc {
  department: string;
  letterDate: string | Date;
  studentNIM: string;
  studentName: string;
  proposalTitle: string;
  score: number;
  season: string;
  firstExaminerSignature?: string;
  secondExaminerSignature?: string;
  thirdExaminerSignature?: string;
  forthExaminerSignature?: string;
  seminarCoordinatorSignature?: string;
}

export interface IExamProposalDoc {
  name: string;
  nim: string;
  department: string;
  faculty: string;
  checkList: boolean[];
  firstViceDean: string;
  firstViceDeanNIP: string;
  letterDate: string | Date;
  signature?: string;
}

export interface IVerificationSKDoc {
  viceaDeanName: string;
  viceDeanNip: string;
  name: string;
  nim: string;
  major: string;
  educationLevel: "s1" | "s2" | "s3" | "profesi" | "spesialis";
  sksPassed: number;
  isNameCorrect: boolean;
  isNimCorrect: boolean;
  isMajorCorrect: boolean;
  letterDate: string | Date;
  signature: string;
}
