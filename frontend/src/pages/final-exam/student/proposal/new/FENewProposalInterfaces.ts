import * as yup from "yup";
import { TOffer, TProposalIdeaOrigin } from "./FENewProposalApplicationForm";

export interface IFENewProposalFormValues {
  firstOffer: TOffer;
  secondOffer: TOffer;
  academicRecord: File;
  krs: File;
}

const feOfferSchema = yup.object({
  title: yup.string().required("Tolong input judul usulan"),
  firstLaboratory: yup.string().required("Pilih laboratorium pertama"),
  secondLaboratory: yup.string(),
  proposalIdeaOrigin: yup.string().required("Pilih asal judul usulan"),
  lecturer: yup.string().when("proposalIdeaOrigin", {
    is: "LECTURER" as TProposalIdeaOrigin,
    then: yup.string().required("Pilih dosen yang mengusulkan judul"),
  }),
});

export const feNewProposalFormSchema = yup.object({
  firstOffer: feOfferSchema,
  secondOffer: feOfferSchema,
  academicRecord: yup.object({
    name: yup.string().required("Tolong input transkrip nilai"),
  }),
  krs: yup.object({
    name: yup.string().required("Tolong input krs"),
  }),
});
