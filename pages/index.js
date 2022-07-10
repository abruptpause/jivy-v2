import Head from "next/head"
import { SliceZone } from "@prismicio/react"
import * as prismicH from "@prismicio/helpers"

import { createClient } from "../prismicio"
import { components } from "../slices/"
import { Layout } from "../components/Layout"

const Index = ({ page }) => (
    <>
      <Head>
        <title>{prismicH.asText(page.data.title)}</title>
      </Head>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  )

export default Index

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData })

  const page = await client.getByUID("page", "home", { lang: locale })

  return {
    props: {
      page
    }
  }
}
