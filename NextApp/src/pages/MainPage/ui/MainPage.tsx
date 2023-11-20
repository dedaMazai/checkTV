import { HorizontalCarousel } from "@/entities/HorizontalCarousel";
import { useEffect, useState } from "react";
import Image from "next/image";
import { HStack, VStack } from "@/shared/ui/Stack";
import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import useUser from "@/entities/User/user";
import { SwrProvider } from "@/app/providers/SwrProvider/SwrProvider";
import Link from "next/link";
import { Column, Table } from "@/shared/ui/Table/Table";
import { ROUTES } from "@/shared/const/routes";

import cls from "./MainPage.module.scss";

export var MainPage = function (props: any) {
  var { t } = useTranslation();
  var router = useRouter();
  var { user, mutate, error } = useUser();

  var [timer, setTimer] = useState(0);
  var [result, setResult] = useState("");

  var renderImage = function (row: any) {
    return (
      <HStack max justify="center">
        <img src={row.image} alt={row.image} className={cls.img} width={150} height={120} />
      </HStack>
    );
  };

  var Columns: Column[] = [
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

  var add = function () {
    setTimer(function (prev) {
      return ++prev;
    });
  };
  useEffect(function () {
    var timerId = setInterval(add, 1000);

    // var Http = new XMLHttpRequest();
    // var url = "https://fakerapi.it/api/v1/books?_quantity=2";
    // Http.open("GET", url);
    // Http.send();

    // Http.onreadystatechange = function(e) {
    //   setResult(JSON.stringify(Http.responseText));
    // };

    return function () {
      clearInterval(timerId);
    };
  }, []);

  return (
    <SwrProvider>
      <VStack gap="16" max align="center">
        {/* <iframe src="http://localhost:3001/" height="1500px" width="1500px"/> */}
        {JSON.stringify(props.user)}
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
          {"new2:" + timer}
        </HStack>
        <HStack gap="8">
          <video controls src="/video/example.mp4" style={{ width: "400px", height: "250px" }} />
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Sup_UlTK1-A?si=KNVPt_UorvdbJhy-"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </HStack>
        <HStack gap="16">
          <LangSwitcher />
          <ThemeSwitcher />
        </HStack>
        <Table columns={Columns} rows={props.user} noData={t("No data")} zebra />
        <HorizontalCarousel />
      </VStack>
    </SwrProvider>
  );
};
