import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'
import i18nextConfig from "../next-i18next.config";

export default function Document(props: DocumentProps) {

  return (
    <Html lang={i18nextConfig.i18n.defaultLocale}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
