import React from "react";
import FETableHeader from "src/components/fe-components/table/FETableHeader1";
import FETableRow2 from "src/components/fe-components/table/FETableRow2";
import { dateToRange, extractDate } from "src/utils/functions/date.function";

export interface IFESeminarTimeInformation {
  seminarDate: Date;
  seminarTimeStart: Date;
  seminarTimeEnd: Date;
  offlinePlace: string;
  seminarNote: string;
}

const FESeminarTimeInformation: React.FC<IFESeminarTimeInformation> = ({
  seminarDate, seminarTimeEnd, seminarTimeStart,
  offlinePlace,
  seminarNote,
}) => {
  return (
    <FETableHeader title={"Informasi Waktu Seminar"}>
      <FETableRow2
        subject="Hari/Tanggal"
        value={extractDate(seminarDate)}
        withBottomBorder={true}
      />
      <FETableRow2 subject="Waktu" value={dateToRange(seminarTimeStart, seminarTimeEnd, "WITA")} withBottomBorder={true} />
      <FETableRow2
        subject="Tempat (Luring)"
        value={offlinePlace}
        withBottomBorder={true}
      />
      <FETableRow2
        subject="Tempat (Daring)"
        value={
          seminarNote
        }
        withBottomBorder={false}
      />
    </FETableHeader>
  );
};
export default FESeminarTimeInformation;
