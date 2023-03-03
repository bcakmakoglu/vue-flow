import { meta } from './meta'

export default defineAppConfig({
  docus: {
    title: meta.title,
    description: meta.description,
    image: meta.img,
    url: meta.url,
    socials: {
      twitter: 'bcakmakoglu',
      github: 'bcakmakoglu/vue-flow',
    },
    github: {
      branch: 'master',
      repo: 'bcakmakoglu/vue-flow',
      owner: 'bcakmakoglu',
      edit: true,
    },
    aside: {
      level: 0,
      exclude: [],
    },
    header: {
      title: 'Vue Flow',
      logo: false,
      showLinkIcon: false,
      exclude: [],
    },
    footer: {
      credits: {
        text: 'Copyright © 2021-present Burak Cakmakoglu',
        href: 'https://github.com/bcakmakoglu/vue-flow/blob/master/LICENSE',
        icon: '',
      },
      iconLinks: [
        {
          href: 'https://discord.gg/F4v6qE4Fuq',
          icon: 'ic:baseline-discord',
        },
      ],
    },
  },
})
