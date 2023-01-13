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
import { Link } from "react-router-dom";
import { AddFilled, SearchFilled } from "src/assets/Icons/Fluent";
import { TextInput } from "src/components/Input";
import { ILFPHeaderButton } from "../LFPHeader.component";

type TableRowCellKey = string;
interface IFETableComponentProps {
  tableTitle: string;
  tableHeadings: IFETableHeadingProps[];
  tableRows: IFETableRowColumnProps[];
  noDataMsg: string;
  dataPerPageAmt: number;
  isLoading: boolean;
  actions?: IFETableAction[];
  onSearch?: (value: string) => void;
  activePage: number;
  onPageChange?: (page: number) => void;
  actionOrientation?: "vertical" | "horizontal";
  actionColumnWidth?: string;
  actionColumnRounded?: false;
  onProgressData?: number;
  tableHeaderAction?: Array<ILFPHeaderButton>;
  withSearch?: boolean;
}

export interface IFETableHeadingProps {
  label: string;
  sortable: boolean;
  cellKey: TableRowCellKey;
  width?: string;
  textAlign: "left" | "right" | "center";
}

export type IFETableRowColumnProps = {
  [x in TableRowCellKey]:
    | {
        label: string | number;
        element?: JSX.Element;
      }
    | number
    | string;
};

export interface IActiveSort {
  column: string;
  order: "ASC" | "DESC";
}

export type IActionButtonBgColor =
  | "primary"
  | "primaryGradient"
  | "errorGradient"
  | "white";

export interface IFETableAction {
  label: string;
  icon?: JSX.Element;
  type?: "button" | "element";
  backgroundColor: IActionButtonBgColor;
  onClick: (row: any) => void;
  padding?: string | number;
  width?: string | number;
  eachButtonRounded?: boolean;
  display?: (row: any) => boolean;
  element?: (row: any) => JSX.Element;
}

// Add action color here
const aciontBtnClsNames: { [x in IActionButtonBgColor]: string } = {
  primary: "",
  primaryGradient: "!bg-primary !bg-opacity-20 !text-primary-900",
  errorGradient: "!bg-error-900 !bg-opacity-20 text-error-900",

  white: "!bg-white",
};

const FETableComponent: React.FC<IFETableComponentProps> = ({
  tableTitle,
  tableHeadings,
  tableRows,
  actions,
  noDataMsg,
  isLoading,
  onSearch,
  dataPerPageAmt,
  activePage,
  onPageChange,
  actionOrientation = "horizontal",
  actionColumnWidth = "fit-content",
  actionColumnRounded = true,
  onProgressData = 0,
  tableHeaderAction,
  withSearch = true,
}) => {
  const headKeys = tableHeadings.map((th) => ({
    key: th.cellKey,
    textAlign: th.textAlign,
  }));

  const pageAmt = Math.round(tableRows.length / dataPerPageAmt + 0.4);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    onSearch && onSearch(e.target.value);
  }

  function handlePageChange(e: number) {
    onPageChange && onPageChange(e);
  }

  const addIcon = <AddFilled className={`mr-1 mb-[1px]`} size={14} />;

  const paginationComp = (
    <>
      <Text color={"secondary-text"} size={16}>
        Halaman {activePage >= pageAmt ? pageAmt : activePage} dari {pageAmt}
      </Text>
      <Pagination
        onChange={handlePageChange}
        color={"primary"}
        page={activePage >= pageAmt ? pageAmt : activePage}
        total={pageAmt}
        disabled={pageAmt == 0}
        withEdges
      />
    </>
  );

  const isEmpty = !tableRows.length;

  return (
    <div className={`h-fit`}>
      <div className="bg-gradient-to-r mt-4 from-primary-500 to-error-500 w-full h-4 rounded-t-full"></div>
      <div className="grow basis-0 block overflow-x-auto whitespace-nowrap border-2 border-t-0 rounded-b-md border-[#dfdfdf] overflow-y-auto">
        <Group p={"lg"} position="apart">
          <Group className="gap-2">
            {!!tableTitle && <Title order={3}>{tableTitle}</Title>}
            {onProgressData > 0 ? (
              <div className="w-[22px] h-[22px] pt-[2px] text-center rounded-full bg-error-500 text-white text-sm relative -top-1">
                {onProgressData > 9 ? "9+" : onProgressData}
              </div>
            ) : null}
          </Group>
          <Group>
            {tableHeaderAction?.map((button, e: number) => {
              return (
                <div>
                  {button.type == "modal" ? (
                    <Button
                      key={e}
                      variant="outline"
                      color="primary-text"
                      className={`border-[1px] border-[#CACCCE] font-bold disabled`}
                      disabled={button.disabled}
                      onClick={button.onClick}
                      leftIcon={button.icon ?? addIcon}
                      styles={{
                        leftIcon: {
                          marginRight: "2px !important",
                        },
                      }}
                    >
                      {button.label}
                    </Button>
                  ) : (
                    <Button
                      key={e}
                      variant="outline"
                      color="primary-text"
                      className="border-[1px] border-[#CACCCE] font-bold"
                      disabled={button.disabled}
                      component={Link}
                      leftIcon={button.icon ?? addIcon}
                      to={button.href ?? "#"}
                      styles={{
                        leftIcon: {
                          marginRight: "2px !important",
                        },
                      }}
                    >
                      {button.label}
                    </Button>
                  )}
                </div>
              );
            })}
            {withSearch ? (
              <TextInput
                icon={<SearchFilled color="#dfdfdf" />}
                onChange={handleSearchChange}
              />
            ) : null}
          </Group>
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
                          width: head.width,
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
                          <Text className="text-primary-text-500 text-md font-semibold">
                            {head.label}
                          </Text>
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
                        width: actionColumnWidth || "fit-content",
                      }}
                    >
                      <Group
                        spacing={"sm"}
                        align={"center"}
                        noWrap
                        position={"center"}
                      >
                        <Text className="text-primary-text-500 text-md font-semibold">
                          Aksi
                        </Text>
                      </Group>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {isEmpty ? (
                  <tr className={`h-40`}>
                    <td colSpan={tableHeadings.length + 1}>
                      <Text weight={"bold"} size="lg" align="center">
                        {noDataMsg}
                      </Text>
                    </td>
                  </tr>
                ) : (
                  tableRows
                    .slice(
                      (activePage - 1) * dataPerPageAmt,
                      (activePage - 1) * dataPerPageAmt + dataPerPageAmt
                    )
                    .map((row: IFETableRowColumnProps, idx: number) => {
                      return (
                        <tr key={idx + "row-"}>
                          {headKeys.map((th) => {
                            const col = row[th.key];

                            if (
                              typeof col === "string" ||
                              typeof col === "number"
                            ) {
                              return (
                                <td
                                  key={th.key}
                                  className="border-b border-gray-200"
                                >
                                  <Text className="text-md">{col}</Text>
                                </td>
                              );
                            }

                            return (
                              <td
                                key={col.label + "td-key"}
                                className={`text-primary-text-500  text-${th.textAlign}`}
                              >
                                {col.element != null ? (
                                  col.element
                                ) : (
                                  <Text className="text-md">{col.label}</Text>
                                )}
                              </td>
                            );
                          })}
                          {!!actions?.length && (
                            <td className="text-center">
                              <div
                                className={`flex justify-center items-center gap-1 ${
                                  actionOrientation === "vertical"
                                    ? "flex-col"
                                    : "flex-row"
                                } overflow-hidden ${
                                  actionColumnRounded == true
                                    ? "rounded-full"
                                    : ""
                                } `}
                              >
                                {/* <Stack align={"center"} spacing={5}> */}
                                {actions.map((action) => {
                                  return (
                                    <>
                                      {action.type == "element" ? (
                                        <>{action.element!(row)}</>
                                      ) : (
                                        <Button
                                          hidden={
                                            action.display == null
                                              ? false
                                              : action.display(row)
                                          }
                                          key={action.label + "row-action"}
                                          onClick={() => action.onClick(row)}
                                          size="xs"
                                          className={`${
                                            aciontBtnClsNames[
                                              action.backgroundColor
                                            ]
                                          } py-2 ${
                                            action.eachButtonRounded
                                              ? "rounded-md"
                                              : "rounded-none"
                                          }`}
                                          styles={{
                                            root: {
                                              padding: action.padding || 10,
                                              width: action.width || "70%",
                                            },
                                          }}
                                        >
                                          <Group align={"center"} spacing={0}>
                                            {action.icon}
                                            {action.label}
                                          </Group>
                                        </Button>
                                      )}
                                    </>
                                  );
                                })}
                                {/* </Stack> */}
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })
                )}
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
