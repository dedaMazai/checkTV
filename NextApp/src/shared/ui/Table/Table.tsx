import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Skeleton } from "../Skeleton/Skeleton";
import { HStack, VStack } from "../Stack";
import { Typography } from "../Text";

import cls from "./Table.module.scss";

export interface Column {
  key: string;
  name: string;
  render?: (value: any) => ReactNode;
  renderHeader?: (name: string) => string;
  width?: string | number;
}

interface Row extends Record<string, string | number | boolean | any> {
  internal_id?: number | string;
}

interface TableProps {
  className?: string;
  columns?: Column[];
  rows?: Row[];
  isLoading?: boolean;
  zebra?: boolean;
  noData?: string;
}

export const Table = (props: TableProps) => {
  const { className, columns, rows, isLoading, noData, zebra } = props;

  if (isLoading) {
    return (
      <div className={cls.skeleton}>
        <Skeleton width="100%" border="8px" height="50px" />
      </div>
    );
  }

  return (
    <VStack className={classNames("", {}, [className])}>
      <div className={classNames(cls.table)}>
        <div className={classNames(cls.row, { [cls.zebra]: zebra }, [cls.header])}>
          {columns?.map((el, index) => (
            <div
              key={index}
              style={{ width: el.width ? el.width : "" }}
              className={classNames(cls.cell, {
                [cls.widthStart]: !el.width,
                [cls.isLast]: ++index === columns.length,
              })}
            >
              {el.renderHeader ? el.renderHeader(el.name) : el.name}
            </div>
          ))}
        </div>
        {!!rows?.length &&
          rows.map((row, index) => (
            <div
              key={`${index}${row.internal_id}`}
              className={classNames(cls.row, {
                [cls.notEvenRow]: index % 2 !== 0 && zebra,
                [cls.evenRow]: index % 2 === 0 && zebra,
                [cls.zebra]: zebra,
              })}
            >
              {columns?.map((el, index) => (
                <div
                  key={index}
                  data-title={el.renderHeader ? el.renderHeader(el.name) : el.name}
                  style={{ width: el.width ? el.width : "" }}
                  className={classNames(cls.cell, {
                    [cls.widthStart]: !el.width,
                    [cls.isLast]: ++index === columns.length,
                  })}
                >
                  <div className={cls.dynamicCell}>{el.render ? el.render(row) : row[el.key]}</div>
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
