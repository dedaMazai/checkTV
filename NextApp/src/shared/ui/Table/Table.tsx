/* eslint-disable no-use-before-define */
import { ReactNode, useCallback, useEffect, useRef } from "react";

import cls from "./Table.module.scss";
import { Skeleton } from "../Skeleton";
import { HStack, VStack } from "../Stack";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Typography } from "../Text";

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
  const ref = useRef<HTMLDivElement | null>(null);

  const changeActiveCell = useCallback(
    (e: MouseEvent) => {
      const data = (e.target as HTMLDivElement).dataset;
      const dataParent = (e.target as HTMLDivElement).parentElement?.dataset;
      if (data.col) {
        onChangeCell?.(data.col, data.row);
      } else if (dataParent?.col) {
        onChangeCell?.(dataParent.col, dataParent.row);
      }
    },
    [onChangeCell]
  );

  useEffect(() => {
    const block = ref.current;
    if (!block) {
      return undefined;
    }
    block.addEventListener("dblclick", changeActiveCell);

    return () => {
      block.removeEventListener("dblclick", changeActiveCell);
    };
  }, [changeActiveCell]);

  if (isLoading) {
    return (
      <div className={cls.skeleton}>
        <Skeleton />
      </div>
    );
  }

  return (
    <VStack className={classNames("", {}, [className])}>
      <div className={classNames(cls.table)} ref={ref}>
        {/* <div
                  className={classNames(cls.row, { [cls.zebra]: zebra }, [
                      cls.header,
                  ])}
              >
                  {columns?.map((el, index) => (
                      <div
                          key={index}
                          style={{
                              width: '100%',
                              minWidth: el.width ? el.width : '',
                          }}
                          className={classNames(cls.cell, {
                              [cls.widthStart]: !el.width,
                              [cls.isLast]: (index + 1) === columns.length,
                          })}
                          data-col={index}
                      >
                          {el.renderHeader
                              ? el.renderHeader(el.name)
                              : el.name}
                      </div>
                  ))}
              </div> */}
        {!!rows?.length &&
          rows.map((row, rowIndex) => (
            <div
              key={`${rowIndex}${row.internal_id}`}
              className={classNames(cls.row, {
                [cls.notEvenRow]: rowIndex % 2 !== 0 && zebra,
                [cls.evenRow]: rowIndex % 2 === 0 && zebra,
                [cls.zebra]: zebra,
                [cls.rowLast]: rowIndex + 1 === rows.length,
              })}
            >
              {columns?.map((col, colIndex) => (
                <div
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
                </div>
              ))}
            </div>
          ))}
      </div>
      {!rows?.length && (
        <HStack className={cls.empty} max justify="center">
          {noData && <Typography text={noData} />}
        </HStack>
      )}
    </VStack>
  );
};
