import React from "react";
import FETableHeader from "src/components/fe-components/table/FETableHeader1";
import FETableRow2 from "src/components/fe-components/table/FETableRow2";

export interface IFESeminarTimeInformation {
  date: string;
  time: string;
  offlinePlace: string;
  onlinePlace: string;
}

const FESeminarTimeInformation: React.FC<IFESeminarTimeInformation> = ({
  date,
  time,
  offlinePlace,
  onlinePlace,
}) => {
  return (
    <FETableHeader title={"Informasi Waktu Seminar"}>
      <FETableRow2
        subject="Hari/Tanggal"
        value={date}
        withBottomBorder={true}
      />
      <FETableRow2 subject="Waktu" value={time} withBottomBorder={true} />
      <FETableRow2
        subject="Tempat (Luring)"
        value={offlinePlace}
        withBottomBorder={true}
      />
      <FETableRow2
        subject="Tempat (Daring)"
        value={
          <a href={onlinePlace} target="_blank">
            {onlinePlace}
          </a>
        }
        withBottomBorder={false}
      />
    </FETableHeader>
  );
};
export default FESeminarTimeInformation;
