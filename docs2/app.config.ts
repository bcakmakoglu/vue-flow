export default defineAppConfig({
  docus: {
    title: 'Vue Flow',
    description: 'Visualize your ideas with Vue Flow, a highly customizable Vue3 Flowchart library.',
    image: 'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',
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
      logo: true,
      showLinkIcon: true,
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
