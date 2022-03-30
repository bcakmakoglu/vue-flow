const fs = require('fs')
const path = require('path')
const { $fetch } = require('ohmyfetch')

const run = async () => {
  const githubData = await $fetch('https://api.github.com/repos/bcakmakoglu/vue-flow?page=$i&per_page=100')
  const npmData = await $fetch('https://api.npmjs.org/downloads/point/last-month/@braks/vue-flow')
  fs.writeFileSync(path.resolve(__dirname, './.data.json'), JSON.stringify({ ...githubData, ...npmData }))
}

run().then(() => console.log('done'))
