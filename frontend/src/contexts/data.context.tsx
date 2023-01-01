/**
 * Please add all data provider here
 */

import LaboratoryDataProvider from "./laboratory-data.context";
import LecturersDataProvider from "./lecturer-data.context";

interface IDataProviderProps {}

const DataProvider: React.FC<any> = ({ children }) => {
  return (
    <>
      <LecturersDataProvider>
        <LaboratoryDataProvider>{children}</LaboratoryDataProvider>
      </LecturersDataProvider>
    </>
  );
};
export default DataProvider;
