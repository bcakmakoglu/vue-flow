export const presets = {
  sumi: '#1C1C1C',
  gofun: '#FFFFFB',
  byakuroku: '#A8D8B9',
  mizu: '#81C7D4',
  asagi: '#33A6B8',
  ukon: '#EFBB24',
  mushikuri: '#D9CD90',
  hiwa: '#BEC23F',
  ichigo: '#B5495B',
  kurenai: '#CB1B45',
  syojyohi: '#E83015',
  konjyo: '#113285',
  fuji: '#8B81C3',
  ayame: '#6F3381',
  torinoko: '#DAC9A6',
  kurotsurubami: '#0B1013',
  ohni: '#F05E1C',
  kokikuchinashi: '#FB9966',
  beniukon: '#E98B2A',
  sakura: '#FEDFE1',
  toki: '#EEA9A9',
}

export const colors = Object.keys(presets).map((color) => {
  return {
    name: color,
    value: presets[color],
  }
})
