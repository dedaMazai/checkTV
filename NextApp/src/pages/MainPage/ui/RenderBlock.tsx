/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import Clock from "react-clock";
import { Component, useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Table } from "@/shared/ui/Table/Table";
import { ElementNames, ElementProperties } from "../model/types/constructorPageSchema";
import { Typography } from "@/shared/ui/Text";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./MainPage.module.scss";

const RenderVideo = ({ element, resizable }: { element: ElementProperties; resizable?: boolean }) => {
  return (
    <video
      controls
      src={element.properties.value}
      style={{
        width: resizable ? "inherit" : element.width,
        height: resizable ? "inherit" : element.height,
      }}
    />
  );
};

const RenderText = ({ element, resizable }: { element: ElementProperties; resizable?: boolean }) => {
  return (
    <div
      style={{
        width: resizable ? "inherit" : element.width,
        height: resizable ? "inherit" : element.height,
        background: element.properties.background,
      }}
    >
      <Typography
        size={element.properties.size}
        style={{
          marginBottom: 0,
          color: element.properties.color,
        }}
        title={element.properties?.value || "Текст"}
      />
    </div>
  );
};

const RenderImg = ({ element, resizable }: { element: ElementProperties; resizable?: boolean }) => {
  return (
    <img
      src={element.properties.value}
      alt={element.name}
      style={{
        width: resizable ? "inherit" : element.width,
        height: resizable ? "inherit" : element.height,
      }}
    />
  );
};

class RenderWidgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(),
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        value: new Date(),
      });
    }, 1000);
  }

  render() {
    const val = this.state.value;
    return (
      <div>{`${new Date(this.state.value)}`}</div>
    );
  }
}

const renderImage = (col: any, row: any) => {
  return <img src={row[col.key].value} alt={row[col.key].value} className={cls.imgBlock} />;
};

const RenderTable = ({
  element,
  resizable,
  onChangeCell,
}: {
  element: ElementProperties;
  resizable?: boolean;
  onChangeCell?: (col: string, row?: string) => void;
}) => {
  const rows = element.properties.rows?.map((row) => {
    const rowRes = { ...row };
    Object.keys(row).forEach((key) => {
      if (rowRes[key]?.isImg) {
        rowRes[key] = {
          ...rowRes[key],
          render: renderImage,
        };
      }
    });
    return rowRes;
  });

  return (
    <div
      style={{
        width: resizable ? "inherit" : element.width,
        height: resizable ? "inherit" : element.height,
        background: element.properties.background,
        overflow: "hidden",
      }}
    >
      <Table columns={element.properties.columns} rows={rows} noData="No data" />
    </div>
  );
};

interface RenderBlockProps {
  element: ElementProperties;
  className?: string;
  timeZone: string;
  resizable?: boolean;
  style?: React.CSSProperties;
}

const RenderBlock = (props: RenderBlockProps) => {
  const { className, element, resizable, timeZone, style } = props;

  const ComponentsMap: Record<ElementNames, React.ReactNode> = {
    ElementImg: <RenderImg resizable={resizable} element={element} />,
    ElementTable: <RenderTable resizable={resizable} element={element} />,
    ElementVideo: <RenderVideo resizable={resizable} element={element} />,
    ElementText: <RenderText resizable={resizable} element={element} />,
    ElementClock: <RenderWidgets />,
  };

  return (
    <div className={classNames(cls.RenderBlock, [className])} style={style}>
      {ComponentsMap[element.name]}
    </div>
  );
};

export default RenderBlock;
