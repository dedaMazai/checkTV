// import { protectedPage } from "@/features/auth";
import { ForbiddenPage } from "@/pages/ForbiddenPage";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ru", ["common"])),
  },
});

export default ForbiddenPage;
