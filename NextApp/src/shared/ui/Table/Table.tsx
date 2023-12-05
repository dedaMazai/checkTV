/* eslint-disable no-use-before-define */
import { ReactNode } from "react";
import { Skeleton } from "../Skeleton";
import { HStack, VStack } from "../Stack";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Typography } from "../Text";

import cls from "./Table.module.scss";

export interface Column {
  key: string;
  name: string;
  isImg?: boolean;
  // render?: (value: any) => ReactNode;
  renderHeader?: (name: string) => string;
  width?: string | number;
}

export interface Cell {
  value: string | number;
  isImg: boolean;
  render?: (value: Row) => ReactNode;
}

export interface Row extends Record<string, string | number | boolean | any | Cell> {
  internal_id?: number | string;
}

interface TableProps {
  className?: string;
  columns?: Column[];
  rows?: Row[];
  isLoading?: boolean;
  zebra?: boolean;
  noData?: string;
  onChangeCell?: (col: string, row?: string) => void;
}

export const Table = (props: TableProps) => {
  const { className, columns, rows, isLoading, noData, zebra, onChangeCell } = props;

  if (isLoading) {
    return (
      <div className={cls.skeleton}>
        <Skeleton />
      </div>
    );
  }

  return (
    <VStack className={classNames("", {}, [className])}>
      <table className={classNames(cls.table)}>
        <tbody>
          {!!rows?.length &&
            rows.map((row, rowIndex) => (
              <tr
                key={`${rowIndex}${row.internal_id}`}
                className={classNames(cls.row, {
                  [cls.notEvenRow]: rowIndex % 2 !== 0 && zebra,
                  [cls.evenRow]: rowIndex % 2 === 0 && zebra,
                  [cls.zebra]: zebra,
                  [cls.rowLast]: rowIndex + 1 === rows.length,
                })}
              >
                {columns?.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    data-title={col.renderHeader ? col.renderHeader(col.name) : col.name}
                    style={{
                      width: "100%",
                      minWidth: col.width ? col.width : "",
                    }}
                    className={classNames(cls.cell, {
                      [cls.widthStart]: !col.width,
                      [cls.isLast]: colIndex + 1 === columns.length,
                    })}
                    data-row={rowIndex}
                    data-col={col.key}
                  >
                    <div className={cls.dynamicCell} data-row={rowIndex} data-col={col.key}>
                      {row[col.key]?.render ? row[col.key].render(col, row) : row[col.key]?.value}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {!rows?.length && (
        <HStack className={cls.empty} max justify="center">
          {noData && <Typography text={noData} />}
        </HStack>
      )}
    </VStack>
  );
};
