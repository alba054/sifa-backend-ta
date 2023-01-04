import {
  Table,
  Group,
  Stack,
  Button,
  Title,
  MediaQuery,
  Pagination,
  Text,
  Loader,
} from "@mantine/core";
import React from "react";
import { SearchFilled } from "src/assets/Icons/Fluent";
import { TextInput } from "src/components/Input";

type TableRowCellKey = string;
interface IFETableComponentProps {
  tableTitle: string;
  tableHeadings: IFETableHeadingProps[];
  tableRows: IFETableRowColumnProps[];
  dataAmt: number;
  dataPerPageAmt: number;
  isLoading: boolean;
  actions?: IFETableAction[];
  onSearch?: (value: string) => void;
  activePage: number;
  onPageChange?: (page: number) => void;
}

export interface IFETableHeadingProps {
  label: string;
  sortable: boolean;
  cellKey: TableRowCellKey;
  textAlign: "left" | "right" | "center";
}

export type IFETableRowColumnProps = {
  [x in TableRowCellKey]: {
    label: string | number;
    element?: JSX.Element;
  };
};

export interface IActiveSort {
  column: string;
  order: "ASC" | "DESC";
}

export type IActionButtonBgColor =
  | "primary"
  | "primaryGradient"
  | "errorGradient";

export interface IFETableAction {
  label: string;
  icon?: JSX.Element;
  backgroundColor: IActionButtonBgColor;
  onClick: (row: any) => void;
}

// Add action color here
const aciontBtnClsNames: { [x in IActionButtonBgColor]: string } = {
  primary: "",
  primaryGradient: "!bg-primary !bg-opacity-20 !text-primary-900",
  errorGradient: "!bg-error-900 !bg-opacity-20 text-error-900",
};

const FETableComponent: React.FC<IFETableComponentProps> = ({
  tableTitle,
  tableHeadings,
  tableRows,
  actions,
  isLoading,
  onSearch,
  dataAmt,
  dataPerPageAmt,
  activePage,
  onPageChange,
}) => {
  const headKeys = tableHeadings.map((th) => ({
    key: th.cellKey,
    textAlign: th.textAlign,
  }));

  const pageAmt = Math.round(dataAmt / dataPerPageAmt);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    onSearch && onSearch(e.target.value);
  }

  function handlePageChange(e: number) {
    onPageChange && onPageChange(e);
  }

  const paginationComp = (
    <>
      <Text color={"secondary-text"} size={16}>
        Halaman {activePage} dari {pageAmt}
      </Text>
      <Pagination
        onChange={handlePageChange}
        color={"primary"}
        page={activePage}
        total={pageAmt}
        withEdges
      />
    </>
  );

  return (
    <div className={`h-fit`}>
      <div className="bg-gradient-to-r mt-10 from-primary-500 to-error-500 w-full h-4 rounded-t-full"></div>
      <div className="grow basis-0 block overflow-x-auto whitespace-nowrap border-2 border-t-0 rounded-b-md border-[#dfdfdf] overflow-y-auto">
        <Group p={"lg"} position="apart">
          {!!tableTitle && <Title order={3}>{tableTitle}</Title>}
          <TextInput
            icon={<SearchFilled color="#dfdfdf" />}
            onChange={handleSearchChange}
          />
        </Group>
        <Table className={`w-full`} verticalSpacing={"md"}>
          {isLoading ? (
            <Group position="center" className={`h-60`}>
              <Loader />
            </Group>
          ) : (
            <>
              <thead className="border-t border-[#dfdfdf] relative">
                <tr>
                  {tableHeadings.map((head, index) => {
                    return (
                      <th
                        style={{
                          textAlign: head.textAlign,
                          position: "sticky",
                          top: 0,
                          zIndex: 1,
                          background: "white",
                          cursor: head.sortable ? "pointer" : "default",
                        }}
                        key={index}
                      >
                        <Group
                          spacing={"sm"}
                          align={"center"}
                          noWrap
                          position={head.textAlign}
                        >
                          {head.label}
                        </Group>
                      </th>
                    );
                  })}
                  {!!actions?.length && (
                    <th
                      style={{
                        textAlign: "center",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        background: "white",
                        cursor: "default",
                      }}
                    >
                      <Group
                        spacing={"sm"}
                        align={"center"}
                        noWrap
                        position={"center"}
                      >
                        Actions
                      </Group>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {tableRows
                  .slice(
                    (activePage - 1) * dataPerPageAmt,
                    (activePage - 1) * dataPerPageAmt + dataPerPageAmt
                  )
                  .map((row: IFETableRowColumnProps, idx: number) => {
                    return (
                      <tr key={idx + "row-"}>
                        {headKeys.map((th) => {
                          const col = row[th.key];
                          return (
                            <td
                              key={row[th.key].label + "td-key"}
                              className={`text-primary-text-500 text-${th.textAlign}`}
                            >
                              {col.element || col.label}
                            </td>
                          );
                        })}
                        {!!actions?.length && (
                          <td className="text-center">
                            <Stack align={"center"} spacing={5}>
                              {actions.map((action) => {
                                return (
                                  <Button
                                    key={action.label + "row-action"}
                                    onClick={() => action.onClick(row)}
                                    size="xs"
                                    className={`${
                                      aciontBtnClsNames[action.backgroundColor]
                                    }`}
                                    styles={{
                                      root: {
                                        padding: 10,
                                        width: "70%",
                                      },
                                    }}
                                  >
                                    <Group align={"center"} spacing={0}>
                                      {action.icon}
                                      {action.label}
                                    </Group>
                                  </Button>
                                );
                              })}
                            </Stack>
                          </td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </>
          )}
        </Table>
      </div>

      <footer className="mt-5">
        <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
          <Group position="apart">{paginationComp}</Group>
        </MediaQuery>
        <MediaQuery largerThan={"md"} styles={{ display: "none" }}>
          <Stack align={"center"}>{paginationComp}</Stack>
        </MediaQuery>
      </footer>
    </div>
  );
};
export default FETableComponent;