import {Client} from '@notionhq/client'

import {
  ConfigDictType,
  ExperienceItem,
  ExperienceRawResponse,
  ProjectItem,
  ProjectRawResponse,
} from '@/types'

export const sectionsId = {
  sideprojects: '49f2603970634c0eb12bfcdbd33d5521',
  work: '53e1179d08aa4308881e44a46fcff59d',
}

function formatProjectResponse(item: ProjectRawResponse): ProjectItem[] {
  const title = item.properties.Title.title[0].text.content
  const description = item.properties.Description.rich_text[0].plain_text
  const stack = item.properties.Stack.multi_select
  const hp = item.properties.HP.checkbox
  const url = item.properties.URL.url
  const id = item.id
  return {
    id,
    title,
    description,
    url,
    stack,
    hp,
  }
}

function formatExperienceResponse(
  item: ExperienceRawResponse
): ExperienceItem[] {
  const title = item.properties.Title.title[0].text.content
  const description = item.properties.Description.rich_text[0].plain_text
  const period = item.properties.Period.rich_text[0].plain_text
  const stack = item.properties.Stack.multi_select
  const company = item.properties.Company.rich_text[0].plain_text
  const id = item.id
  return {
    id,
    title,
    description,
    stack,
    company,
    period,
  }
}

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_TOKEN,
})

export const getDatabase = async (config: {hp?: boolean; context: string}) => {
  const {hp = false, context = 'sideprojects'} = config

  const configDict: ConfigDictType = {
    sideprojects: {
      database_id: sectionsId.sideprojects,
      formater: formatProjectResponse,
    },
    work: {
      database_id: sectionsId.work,
      formater: formatExperienceResponse,
    },
  }
  const response = await notion.databases.query({
    database_id: configDict[context].database_id,
    // ...(hp
    //   ? {
    //       filter: {
    //         property: 'HP',
    //         checkbox: {
    //           equals: true,
    //         },
    //       },
    //     }
    //   : {}),
  })
  const result = response.results.map((item) =>
    configDict[context].formater(item)
  )
  return result
}

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({page_id: pageId})
  return formatProjectResponse(response)
}

// export const getBlocks = async (blockId: string) => {
//   const blocks = [];
//   let block;
//   while (true) {
//     const { results, next_block } = await notion.blocks.children.list({
//       start_block: block,
//       block_id: blockId,
//     });
//     blocks.push(...results);
//     if (!next_block) {
//       break;
//     }
//     block = next_block;
//   }
//   return blocks;
// }
