import { HorizontalCarousel } from "@/entities/HorizontalCarousel";
import { useEffect, useRef, useState } from "react";
import Clock from "react-clock";
import Image from "next/image";
import { HStack, VStack } from "@/shared/ui/Stack";
import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { useTranslation } from "next-i18next";
import { ROUTES } from "@/shared/const/routes";
import useUser from "@/entities/User/user";
import { SwrProvider } from "@/app/providers/SwrProvider/SwrProvider";
import Link from "next/link";
import { Column, Table } from "@/shared/ui/Table/Table";

import cls from "./MainPage.module.scss";
import 'react-clock/dist/Clock.css';

export const MainPage = (props: any) => {
  const { t } = useTranslation();

  const [timer, setTimer] = useState(0);

  const add = function () {
    setTimer(function (prev) {
      return ++prev;
    });
  };

  useEffect(function () {
    const timerId = setInterval(add, 1000);

    return function () {
      clearInterval(timerId);
    };
  }, []);

  const renderImage = function (row: any) {
    return (
      <HStack max justify="center">
        <img src={row.image} alt={row.image} className={cls.img} width={150} height={120} />
      </HStack>
    );
  };

  const Columns: Column[] = [
    {
      key: "title",
      name: "Title",
      width: "120px",
    },
    {
      key: "author",
      name: "Author",
      width: "220px",
    },
    {
      key: "genre",
      name: "Genre",
      width: "150px",
    },
    {
      key: "image",
      name: "Image",
      width: "125px",
      render: renderImage,
    },
    {
      key: "published",
      name: "Published",
      width: "150px",
    },
  ];

  return (
    <SwrProvider>
      <VStack gap="16" max align="center">
        {/* <iframe src="http://localhost:3001/" height="1500px" width="1500px"/> */}
        {JSON.stringify(props.user)}
        <Clock value={new Date()} />
        <HStack gap="8">
          <Card variant="greyOne" border="round" className={cls.imgCard}>
            <Image src="/images/test.jpg" alt="Landscape picture" className={cls.img} width={200} height={120} />
          </Card>
          <Link href={ROUTES.FORBIDDEN}>
            <Button variant="clearGrey">{t("Redirect")}</Button>
          </Link>
          <Button
            variant="clearGrey"
            onClick={function () {
              window.open("https://www.google.com/", "_blank");
            }}
          >
            {t("Redirect GOOGLE")}
          </Button>
          {"new:" + timer}
        </HStack>
        <HStack gap="8">
          <video controls src="/video/example.mp4" style={{ width: "400px", height: "250px" }} />
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Sup_UlTK1-A?si=KNVPt_UorvdbJhy-"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </HStack>
        <HStack gap="16">
          <LangSwitcher />
          <ThemeSwitcher />
        </HStack>
        <Table columns={Columns} rows={props.user} noData={t("No data")} />
        <HorizontalCarousel />
      </VStack>
    </SwrProvider>
  );
};
