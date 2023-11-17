import { HorizontalCarousel } from "@/entities/HorizontalCarousel";
import Image from "next/image";
import { HStack, VStack } from "@/shared/ui/Stack";
import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ROUTES } from "@/shared/const/routes";
import useUser from "@/entities/User/user";
import { SwrProvider } from "@/app/providers/SwrProvider/SwrProvider";
import Link from "next/link";
import { Column, Table } from "@/shared/ui/Table/Table";

import cls from "./MainPage.module.scss";
import { useEffect, useState } from "react";
import { redirectToWebsite } from "@/shared/lib/redirectToWebsite/redirectToWebsite";

const Columns: Column[] = [
  {
    key: "internal_id",
    name: "ID",
    width: "120px",
  },
  {
    key: "address",
    name: "address",
    width: "220px",
  },
  {
    key: "amount",
    name: "amount",
    width: "150px",
  },
  {
    key: "balance_before",
    name: "balance_before",
    width: "125px",
  },
  {
    key: "balance_after",
    name: "balance_after",
    width: "150px",
  },
];

const DATA = [
  {
    internal_id: "string",
    address: "string",
    amount: 42,
    balance_after: 42,
    balance_before: 42,
  },
  {
    internal_id: "stri123ng",
    address: "stri321ng",
    amount: 432,
    balance_after: 423,
    balance_before: 432,
  },
  {
    internal_id: "str51ing",
    address: "strin56g",
    amount: 426,
    balance_after: 426,
    balance_before: 426,
  },
];
export const MainPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, mutate, error } = useUser();

  const [timer, setTimer] = useState(0);
  const [result, setResult] = useState("");

  useEffect(() => {
    const timerId = setInterval(() => setTimer((prev) => ++prev), 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  // const Http = new XMLHttpRequest();
  // const url = "https://fakerapi.it/api/v1/books?_quantity=2";
  // Http.open("GET", url);
  // Http.send();

  // Http.onreadystatechange = (e) => {
  //   setResult(JSON.stringify(Http.responseText));
  //   console.log(Http.responseText); // => получим массив данных в формате JSON
  // };

  return (
    <SwrProvider>
      <VStack gap="16" max align="center">
        {result}
        <HStack gap="8">
          <Card variant="greyOne" border="round" className={cls.imgCard}>
            <Image src="/images/test.jpg" alt="Landscape picture" className={cls.img} width={200} height={120} />
          </Card>
          <Link href={ROUTES.FORBIDDEN}>
            <Button variant="clearGrey">
              {t("Redirect")}
            </Button>
          </Link>
          <Button variant="clearGrey" onClick={() => window.open('https://www.google.com/','_blank')}>
            {t("Redirect GOOGLE")}
          </Button>
          {timer}
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
        <Table columns={Columns} rows={DATA} noData={t("No data")} zebra />
        <HorizontalCarousel />
      </VStack>
    </SwrProvider>
  );
};
