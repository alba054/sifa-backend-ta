import React, { useContext, useRef } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { QF_LECTURE_KEY } from "src/query-functions/const.query-function";
import { qfGetLecturers } from "src/query-functions/lecturer.query-function";

const LecturersDataCtx = React.createContext<UseQueryResult<
  any,
  unknown
> | null>(null);

const LecturersDataProvider: React.FC<any> = ({ children }) => {
  const resp = useQuery(QF_LECTURE_KEY, qfGetLecturers, {
    enabled: false,
  });

  return (
    <LecturersDataCtx.Provider value={resp}>
      {children}
    </LecturersDataCtx.Provider>
  );
};

export const useLecturersData = () => {
  const ctx = useContext(LecturersDataCtx);
  if (!ctx) {
    alert("Please wrap use lecturers data user, with lecturers data provider");
  }

  const isFetched = useRef(false);
  if (!isFetched.current) {
    ctx?.refetch();
    isFetched.current = true;
  }

  return ctx!;
};

export default LecturersDataProvider;
