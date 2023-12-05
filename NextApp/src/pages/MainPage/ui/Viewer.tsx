import { classNames } from "@/shared/lib/classNames/classNames";
import RenderBlock from "./RenderBlock";

import cls from "./MainPage.module.scss";
import "react-clock/dist/Clock.css";

const MOCK = {
  elements: [
    {
      name: "ElementImg" as const,
      x: 71,
      y: 61,
      width: 200,
      height: 200,
      properties: {
        value: "https://pibig.info/uploads/posts/2021-06/1622524326_55-pibig_info-p-landshaft-belarusi-priroda-krasivo-foto-60.jpg",
      },
      id: "14a74fb6776b2",
      zIndex: 7,
    },
    {
      name: "ElementTable" as const,
      x: 347,
      y: 75,
      width: 200,
      height: 200,
      properties: {
        rows: [
          {
            "0": {
              value: "Текст1",
            },
            "1": {
              value: "Текст",
            },
            "2": {
              value: "Текст",
            },
            id: 1,
          },
          {
            "0": {
              value: "Текст2",
            },
            "1": {
              value: "Текст",
            },
            "2": {
              value: "Текст",
            },
            id: 2,
          },
          {
            "0": {
              value: "Текст3",
            },
            "1": {
              value: "Текст",
            },
            "2": {
              value: "Текст",
            },
            id: 3,
          },
          {
            "0": {
              value: "11",
            },
            "1": {
              value: "",
            },
            "2": {
              value: "",
            },
            "3": {
              value: "",
            },
          },
          {
            "0": {
              value: "22",
            },
            "1": {
              value: "",
            },
            "2": {
              value: "",
            },
            "3": {
              value: "",
            },
          },
          {
            "0": {
              value: "33",
            },
            "1": {
              value: "",
            },
          },
        ],
        columns: [
          {
            key: "0",
            name: "Header",
          },
          {
            key: "1",
            name: "Header",
          },
        ],
      },
      id: "38c78c1f73cca",
      zIndex: 4,
    },
    {
      name: "ElementVideo" as const,
      x: 621,
      y: 92,
      width: 200,
      height: 200,
      properties: {
        value: "",
      },
      id: "2c0a9200d48f2",
      zIndex: 6,
    },
    {
      name: "ElementText" as const,
      x: 123,
      y: 382,
      width: 189,
      height: 68,
      properties: {
        color: "#45914c",
        background: "#cea7a7",
        value: "Текст 222",
        size: 1 as const,
      },
      id: "a9343b7bf25e1",
      zIndex: 9,
    },
    {
      name: "ElementText" as const,
      x: 360,
      y: 386,
      width: 78,
      height: 50,
      properties: {
        color: "#18c027",
        background: "#705656",
        value: "Текст 1111",
        size: 5 as const,
      },
      id: "5962b7b8b8b8e",
      zIndex: 11,
    },
    {
      id: "86526eec09342",
      name: "ElementClock" as const,
      x: 674,
      y: 365,
      width: 200,
      height: 200,
      properties: {},
      zIndex: 13,
    },
  ],
  screenResolution: "1024x768",
  timeZone: "UTC",
  background: "#d3d3d3",
};

export const Viewer = (props: any) => {
  const screenResolution = MOCK.screenResolution;
  const elements = MOCK.elements;
  const background = MOCK.background;
  const timeZone = MOCK.timeZone;

  return (
    <div className={cls.ScreenBlockWrapper}>
      <div
        style={{
          width: `${screenResolution.split("x")[0]}px`,
          height: `${screenResolution.split("x")[1]}px`,
          background,
        }}
        className={classNames(cls.ScreenBlock)}
      >
        {elements.map((element, index) => {
          return (
            <div
              key={index}
              className={cls.RenderBlockViewer}
              style={{
                top: element.y,
                left: element.x,
              }}
            >
              <RenderBlock
                element={element}
                timeZone={timeZone}
                style={{
                  top: element.y,
                  left: element.x,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
