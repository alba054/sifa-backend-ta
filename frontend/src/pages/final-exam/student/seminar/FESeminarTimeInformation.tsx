import React from "react";
import FETableHeader from "src/components/fe-components/FETableHeader";
import useArray from "src/hooks/fe-hooks/useArray";
import FESeminarTableRow from "./FESeminarTableRow";

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
      <FESeminarTableRow
        subject="Hari/Tanggal"
        value={date}
        withBottomBorder={true}
      />
      <FESeminarTableRow subject="Waktu" value={time} withBottomBorder={true} />
      <FESeminarTableRow
        subject="Tempat (Luring)"
        value={offlinePlace}
        withBottomBorder={true}
      />
      <FESeminarTableRow
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
