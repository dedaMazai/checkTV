// import { protectedPage } from "@/features/auth";
import { MainPage } from "@/pages/MainPage";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// export const getStaticProps: GetStaticProps = async ({ locale }) => ({
//   props: {
//     ...(await serverSideTranslations(locale ?? "ru", ["common"])),
//   },
// });

export async function getServerSideProps(context: any) {
  const userAgent = context.req.headers['user-agent'] || '';

  const response = await fetch('https://fakerapi.it/api/v1/books?_quantity=2', {
    method: 'GET',
  })

  const res = await response.json();

  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? "ru", ["common"])),
      user: res.data,
    },
  };
}

export default MainPage;
