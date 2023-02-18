export type ProjectItem = {
  id: string
  title: string
  description: string
  url: string
  stack: {
    name: string
    id: string
  }[]
  hp: boolean
}

export type ProjectRawResponse = {
  id: string
  properties: {
    Title: {
      title: {
        text: {
          content: string
        }
      }[]
    }
    Description: {
      rich_text: {
        plain_text: string
      }[]
    }
    Stack: {
      multi_select: {
        name: string
        id: string
      }[]
    }

    URL: {
      url: string
    }
    HP: {
      checkbox: boolean
    }
  }
}

export type ExperienceRawResponse = {
  id: string
  properties: {
    Title: {
      title: {
        text: {
          content: string
        }
      }[]
    }
    Description: {
      rich_text: {
        plain_text: string
      }[]
    }
    Stack: {
      multi_select: {
        name: string
        id: string
      }[]
    }
    Company: {
      rich_text: {
        plain_text: string
      }[]
    }
    Period: {
      rich_text: {
        plain_text: string
      }[]
    }
  }
}

export type ExperienceItem = {
  id: string
  title: string
  description: string
  stack: {
    name: string
    id: string
  }[]
  company: string
  period: string
}

export type Pages = 'home' | 'sideprojects' | 'work'

export type ConfigDictType = {
  [key: string]: {
    database_id: string
    formater: Function
  }
}
