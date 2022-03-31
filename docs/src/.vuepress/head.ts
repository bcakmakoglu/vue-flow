const meta = {
  title: '🌊 Vue Flow - A Vue3 Flowchart library',
  description: 'Visualize your ideas with Vue Flow, a highly customizable Vue3 Flowchart library.',
  img: 'https://images.prismic.io/bcakmakoglu/7cca6d1f-2d05-4ed6-a0a9-af9df54943ac_vue-flow.png',
  url: 'https://vueflow.dev/',
}

export default [
  [
    'meta',
    {
      name: 'description',
      content: meta.description,
    },
  ],
  ['meta', { hid: 'og:title', name: 'og:title', content: meta.title }],
  [
    'meta',
    {
      hid: 'og:description',
      property: 'og:description',
      content: meta.description,
    },
  ],
  [
    'meta',
    {
      hid: 'og:image',
      property: 'og:image',
      content: `http://${meta.img}`,
    },
  ],
  [
    'meta',
    {
      hid: 'og:image:secure_url',
      property: 'og:image:secure_url',
      content: `https://${meta.img}`,
    },
  ],
  [
    'meta',
    {
      hid: 'og:image:type',
      property: 'og:image:type',
      content: 'image/png',
    },
  ],
  [
    'meta',
    {
      hid: 'og:image:width',
      property: 'og:image:width',
      content: '2428',
    },
  ],
  [
    'meta',
    {
      hid: 'og:image:height',
      property: 'og:image:height',
      content: '1280',
    },
  ],
  ['meta', { hid: 'og:url', property: 'og:url', content: meta.url }],
  [
    'meta',
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
  ],
  [
    'meta',
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: meta.url,
    },
  ],
  [
    'meta',
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: meta.title,
    },
  ],
  [
    'meta',
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: meta.description,
    },
  ],
  [
    'meta',
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: meta.img,
    },
  ],
  [
    'link',
    {
      hid: 'canonical',
      rel: 'canonical',
      href: meta.url,
    },
  ],
  [
    'link',
    {
      hid: 'image_src',
      rel: 'image_src',
      href: meta.img,
    },
  ],
]
