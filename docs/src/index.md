---
home: true
heroText: null
tagline: null
footer: MIT Licensed | Copyright © 2021-present Burak Cakmakoglu
---

<Home />

<Suspense>
  <Banner />
</Suspense>

<Features />

<XyzTransition :appear-visible="true" xyz="fade down ease-out-back">
  <Acknowledgement />
</XyzTransition>
