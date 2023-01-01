import React, { useContext, useRef } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { QF_LABORATORY_KEY } from "src/query-functions/const.query-function";
import { qfGetLaboratories } from "src/query-functions/laboratory.query-function";

const LaboratoryDataCtx = React.createContext<UseQueryResult<
  any,
  unknown
> | null>(null);

const LaboratoryDataProvider: React.FC<any> = ({ children }) => {
  const resp = useQuery(QF_LABORATORY_KEY, qfGetLaboratories, {
    enabled: false,
  });

  return (
    <LaboratoryDataCtx.Provider value={resp}>
      {children}
    </LaboratoryDataCtx.Provider>
  );
};

export const useLaboratoryData = () => {
  const ctx = useContext(LaboratoryDataCtx);
  if (!ctx) {
    alert(
      "Please wrap use laboratory data user, with laboratory data provider"
    );
  }

  const isFetched = useRef(false);
  if (!isFetched.current) {
    ctx?.refetch();
    isFetched.current = true;
  }

  return ctx!;
};

export default LaboratoryDataProvider;
