import Head from "next/head"
import * as prismicH from "@prismicio/helpers"

import { createClient } from "../prismicio"

const Index = ({ page }) => (
  <>
    <Head>
      <title>{prismicH.asText(page.data.title)}</title>
    </Head>
    <pre>
      {JSON.stringify(page, 0, 2)}
    </pre>
  </>
)

export default Index

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData })

  const page = await client.getByUID("home", "home", { lang: locale })

  return {
    props: {
      page
    }
  }
}
