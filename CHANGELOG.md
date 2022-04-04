# Changelog

All notable changes to this project will be documented in this file.

## [unreleased]

### Documentation

- Remove usage link from sidebar ([19eb154](19eb15461904960536c9bf505a5577f353eabc89))

### Features

- Add cliff.toml for git-cliff ([6064bfd](6064bfd1bdd378662dd13e0cf79245e3b20b3914))
- Add changelog.yml for changelog generation ([3580aa9](3580aa9ad56a51f4d31c0ff4ad41db03ae84e7d4))

## [0.4.0-34] - 2022-04-04

[4be3954](4be39548cfc943190337a2a6ae49d1a8b643594b)...[bc85bad](bc85bade89d293f9867562769a631ac11059925e)

### Features

- Add guide index page ([5779e10](5779e105224402809e1098aa1903d53d9e8a4944))
- Add getting started page ([a4b2aa3](a4b2aa3aaef64c4d776c6cb60bfb357e37903bae))
- Add theming ([bc08e28](bc08e284164c438c78151c103480e05dc91da5e4))
- Add css vars for overwriting node colors ([b86012b](b86012bd442fceb1d0b1cd144013a27fb4b441bd))
- Add node pages ([691bcc4](691bcc4d7806d5e0c6db91a927b6d1db14cf9b78))
- Allow pre-defined dimensions of a node ([c480172](c480172e8d91272cd88744c3d1cef01fc7ae0610))
- Add state page ([0eb5fcf](0eb5fcf3258e9bfcfa4b3a456bd063246dfe62fd))
- Add blobity to home ([0d05352](0d053527946408a9b971e9ea6c7235adcc3f3198))

### Miscellaneous Tasks

- Update algolia config ([8e880dd](8e880dd5486a23b835d14dc541c1bd5dc240ce10))
- Remove max-w from examples page ([5ccb0ae](5ccb0ae389d1d6be85683c567cafa7a1535b06d4))
- Uniform basic example ([ad4289a](ad4289a7b3df06ca185bb9db9e511f51926bb941))
- Update sidebar conf ([6336501](6336501e76668f26a809677d94315a315c8a4277))
- Update styles ([bdea46c](bdea46c2b9a9246b3a83c3dc51dfcc3360e9a3a2))
- Remove lighter var ([6cf9565](6cf9565b82e198c2537a0127ec0f011445433658))
- Replace a-tags with router-links ([9596d27](9596d272bab012313218f7ec780a13b9996a11a6))
- Remove unused var ([92dd0b3](92dd0b3cfbd1b7fe969686b39de5749b5b5de405))

### Update

- Add css vars to theming page ([a8fd776](a8fd776de21100f6857cba92f29f3cafb93f9556))

## [0.4.0-33] - 2022-04-03

[a39272c](a39272c1fee1b79b1864a9d29263f023b4ec633d)...[4be3954](4be39548cfc943190337a2a6ae49d1a8b643594b)

### Bug Fixes

- Check for scope before providing store ([5273dcf](5273dcf80e7c67e8c319aa37bf76c72abc0ba5a5))

### Miscellaneous Tasks

- Update meta img ([f8668a0](f8668a072a10f9e1e659fcc5b55aa5123ee2c8fa))
- Banner size & gap ([1997c6b](1997c6b5705ea100765f393e58db55b6aeb956ba))

## [0.4.0-32] - 2022-04-01

[99bf978](99bf978d0689c5529e5980c78d95983db4f5f93c)...[a39272c](a39272c1fee1b79b1864a9d29263f023b4ec633d)

### Features

- Return new edge from updateEdge utility ([30873fb](30873fb2ca1a498f76fd749767fd1335a780c2db))
- Responsive pos of elements ([d4f2c17](d4f2c176aef3e9b03f05c8b0aed6e1f995d96e58))
- Disable pan on mobile ([a096a31](a096a31233906daafdc49485eb503393b1712552))

### Miscellaneous Tasks

- Preprocess css ([07c0103](07c01039ae8655fc6903aae0a981c4cfbc5bc979))
- Add docs build script to root package.json ([7fd2dca](7fd2dcad22f8851bed62b58e9b6e8dd5bc26a3ab))
- Add description to config ([aa2b4df](aa2b4df913a7c594a053c3b14c05231affb87f2b))
- Place components.d.ts in .vitepress dir ([08bf457](08bf457e7386e1cad87820938fbeec8614ffeea7))
- Add element data typing ([d43e0bd](d43e0bdab995ac90c3ec892953c5315ef54ae0d3))
- Remove some unnecessary generics ([ed34aec](ed34aece18d6b52943cbce3e2e0be663eac946a5))
- Type fix ([b6d5b63](b6d5b63aeebd6d97c2bb34603849d08588b7eb07))

## [0.4.0-31] - 2022-04-01

[70044a2](70044a29ee205521c6bd44fa0f75f7d916728ae2)...[99bf978](99bf978d0689c5529e5980c78d95983db4f5f93c)

### Bug Fixes

- Immediate execution of watchers ([ded9856](ded9856f515fed2f6b79aa1b0f803de8de6a0bf3))

### Features

- Layout styles ([68c2faa](68c2faa5bedc62ae56ea11d3df405b557fd323df))

## [0.4.0-30] - 2022-03-31

[6531be1](6531be1294bbc73df8725c158a7d93261fd2f546)...[70044a2](70044a29ee205521c6bd44fa0f75f7d916728ae2)

### Bug Fixes

- Computed getter type ([f3db0f3](f3db0f34241c15b4dff14b90e1af785b3e1e85a6))
- Dont inherit attrs on smoothstep/stepedges ([373bb0a](373bb0aee0d0fb8262d225664e05443b678a70fd))
- Initial state tests ([d334f17](d334f17f049ca7daf7b8c76cc574281555a50e24))
- Remove vue from dev-deps ([d701b9a](d701b9a3c01cd1df78942ac4b3660c5397d1a66d))

### Features

- Add additional demo ([db841a6](db841a6f57067483b69bd3d5d654777671c1faa0))
- Replace vitepress with vuepress ([7c3c555](7c3c5557e3645fa9e0e7fe5417c09744c1e31a83))
- Add docsearch plugin ([b979721](b979721cb15951e78141105468cdc0324cc8ade8))
- Add auto import plugin ([c5ff817](c5ff8172caf3d9a7980def0e0e92702a4934c131))
- Add page footer ([b619642](b6196424cc16e26143eb69ce6bc7a2abf96f70bc))

### Update

- Footer ([ca12a15](ca12a15d2baaa278d13f5d7ba02e2f61d59ea90c))
- Mobile styles ([9cebd39](9cebd392b14cc9e1158f2e86067082de43cce280))
- Dark mode colors for home ([ecac7c9](ecac7c98da6acf5aec8e588c680c4f04f6c86e91))

## [0.4.0-29] - 2022-03-31

[c394f2d](c394f2d8dccd36c820579835c207f2b2c6ccb199)...[6531be1](6531be1294bbc73df8725c158a7d93261fd2f546)

### Bug Fixes

- Use  global nodeExtent if node.extent is undefined ([1b50373](1b50373c00d560ef1005aab607b3efe04e228f40))
- Compute type in wrapper ([24858df](24858dffdf634e815fdb8ede3147ff16f2f9affc))
- No transform of id to ref ([bac2bd6](bac2bd659aa1feb17872a001ef53028dcca7e7cc))
- Injection missing ([262b902](262b902ca714655e60ead5e48574feee198188a0))

### Features

- RGB demo coloring ([899bed8](899bed8a5bb1808a2a4d0efdc3a32ca7e312bb85))
- Add windicss scrollbar plugin ([2a92960](2a92960cc786cabee2ff22c4420aab8ffcdb5359))
- Nested demo ([2f84361](2f84361a495aae3601c9a1e2967f5a6138ef15c0))

### Miscellaneous Tasks

- Remove default data value from default nodes ([ee480fa](ee480fa0a35285f7a7e71771e8223fa3b96e9f57))
- Remove v-bind ([10aaadc](10aaadc10c4d389ebba4b317ef1fd6019c4c6755))

### Update

- RGB demo ([8b87156](8b87156a42d7e5a3a98e1560ff05a4acee44a14f))
- Import order ([d108867](d108867dd85ee5ffd02be1c2ffe9596c6075bd41))
- Split features into separate files ([c8201ca](c8201ca61c5dafab81b1e6a6f55ded952927942d))
- Remove logs ([6263b69](6263b69b2d938008be55f95a9eeaab8b1831ebe0))
- Remove unnecessary type exports ([f08cabb](f08cabb2b2ffb4927cae89890e5d246354113cc3))
- Generic types ([8706f3b](8706f3bf8e26d01ab7ab5a7b931f55d431ed0e40))
- Fitview on breakpoint change ([329e0b7](329e0b70a889fce7fb7929c8c32ecf22defa7fbd))
- Add button edge example ([9d32e48](9d32e482e2470fbae5b66e2169d802e75c923e15))

## [0.4.0-28] - 2022-03-30

[407418b](407418b8ad4f0667b8cf5a962ba876bb5459c5e3)...[c394f2d](c394f2d8dccd36c820579835c207f2b2c6ccb199)

### Miscellaneous Tasks

- Add useStyle to wrappers ([92a28b0](92a28b06af953e0700441687b0ad8a186c941408))
- Remove unused export ([8e06ae4](8e06ae4cd08abb08fffe0aba74f99cf1cb0f70e2))

### Update

- Color transitions ([75934af](75934affdf0cae1783b1ee63799ad566a2caade7))

## [0.4.0-27] - 2022-03-30

[9fe50d2](9fe50d2e9fd07cf2ae12ebd250e6d5e01728ae28)...[407418b](407418b8ad4f0667b8cf5a962ba876bb5459c5e3)

### Bug Fixes

- Getter type ([35b756f](35b756f237c64b2357c76c171ac11b24d7e08cb2))

### Features

- Allow class or styles to be bound with function ([66484f5](66484f564daecd83d5d97058b107cdf7b5d4419d))
- Add data script ([fa2b094](fa2b094eb921cc84b56f191076b31e2eece218f3))

### Miscellaneous Tasks

- Update yarn.lock ([6b36a12](6b36a12c65ee08c40b2171122b54b08d32768635))

### Regression

- Enable pointer events on zoom pane ([07a6367](07a6367e744e40a1c65ebb9df05da17326f9dcc1))

### Update

- Short circuit connection line slot ([e1e68f7](e1e68f74108f3314929806d8f0c213554fbbebdc))
- Update stress example syntax ([6c594a7](6c594a78dd4e56f531761befadd7a07406430475))
- Set zindex to 0 on initial parse ([b3f618e](b3f618eb3342fe39a3b85e5225ffbeea4052c620))

## [0.4.0-26] - 2022-03-30

[df23216](df2321600969a8635753e19cd0b4f5584094ac5c)...[9fe50d2](9fe50d2e9fd07cf2ae12ebd250e6d5e01728ae28)

### Bug Fixes

- Use node.extent before trying global nodeExtent ([8aa1acb](8aa1acb321d12ddb3aaca26ecd9473548d8c21ee))
- Short circuit passing slots to renderer ([d68daa2](d68daa20c4944ce0ca8788897a6738cee77b6e35))
- Force focus into node selection ([45cc53a](45cc53a31cd554d2835c45466aa4e92525f100b6))

### Features

- Add icons ([f2dbfea](f2dbfea3932897afa0b734c9384a2f29b876e511))

### Update

- Disable pointer events on zoom pane when zoom key is active ([c2803f2](c2803f2671c00d6acf6dd854efe2483345c68e1c))

## [0.4.0-25] - 2022-03-30

[3935e35](3935e35b9b20ebca9f38f564d37acef2169d693c)...[df23216](df2321600969a8635753e19cd0b4f5584094ac5c)

### Bug Fixes

- Check if type exists before using as index ([ca36a86](ca36a866b89d2db9cfd274379b298eb93e14a591))

## [0.4.0-24] - 2022-03-30

[4d3f04e](4d3f04e3822e5ab8b2b4a6dbf0651586a5fbdeac)...[3935e35](3935e35b9b20ebca9f38f564d37acef2169d693c)

### Bug Fixes

- Check if type exists before using as index ([7ffebba](7ffebbaa65d584cdaab6ea064eb6beb12b0bd3c4))

### Features

- Debounce scaling to avoid lag spikes ([2928612](2928612f6fccd20398ac72276d7515d963ccd494))

### Regression

- Add slots to vue flow container to indicate possible slot names ([9d052de](9d052de1133197131b9547b489ce377e7ab185c3))
- Removing nodes/edges breaks renderer ([0628444](06284449a0b4ffb57bd7cd3b0d3d281ce630a0c6))

### Update

- V-if on existing edges before looping wrapper ([e647cf6](e647cf6c27fe8bb89725c517d642b134cdb59338))
- Support fragments as node slots ([1ed3456](1ed34565fc10fac1605bf33f3dbb3bff45c5b3a9))
- Support fragments as edge slots ([e920ebc](e920ebc6db3cdfd0805cbdbd92785eae5d450485))
- Support fragments as connection line slot ([7873877](7873877b2d92611f708272c1b8a50368833adb84))
- Add windicss ([5995f95](5995f950f1f447ac81f4c919ed41687d27cf187c))

## [0.4.0-23] - 2022-03-30

[8463650](84636503aa84dce3bacf9bfe8c99b0cc07a3fdb5)...[4d3f04e](4d3f04e3822e5ab8b2b4a6dbf0651586a5fbdeac)

### Features

- Pass node slots as injections to wrapper ([49121f3](49121f3bac548a4648972e1e2e162fe3b5d6b79f))
- Use slot injection for custom connection lines ([1652113](165211382142ffd654a84f456e8c9d4fbe17cfd9))
- Use slot injection for custom edges ([d1b8c23](d1b8c23a75a1025e10678cb4b54963f080e654f9))
- Export apply changes utilities for options api ([7b5326c](7b5326cf27e15ce122b5053634f2e1c2fb651fbf))
- Add vitepress for docs & docs workspace ([9f8b09e](9f8b09e65a3916515f5bf1e65b87d115bc57aee3))

### Miscellaneous Tasks

- Add vite plugins to examples ([b51851e](b51851ebb5babcf0e81ea38e87f3d5e4249e2680))
- Shorten provide ([d8c7494](d8c7494db4c7a38a2c6d5a855778c568c3068de4))
- Update tsconfig.json ([bae303d](bae303d54bf0585f3762fea6b4f39a23e73ad0b5))
- Add tsconfig.node.json ([069b896](069b896ef221c38b46df76db40b9ea36053e294b))

### Update

- Parse style.css with postcss instead of including it with vite ([a64b98a](a64b98a2753ffec6f39fff2eae972e5709d8b3cf))

## [0.4.0-22] - 2022-03-29

[0eca8e8](0eca8e85dffd4922d216d9054527aa307f7b2b2a)...[8463650](84636503aa84dce3bacf9bfe8c99b0cc07a3fdb5)

### Bug Fixes

- Store & usevueflow types ([f0c3506](f0c3506c63877d6345472679c0041b348dc1f386))

### Features

- Add path alias for local dev ([220a3c4](220a3c455c3adfca57d2bc2555ccdb0abd2da481))

### Miscellaneous Tasks

- Remove README.md after publish ([2c4759d](2c4759d3a0cc7fd98b9062dbbe00e5e3782266e8))
- Lint ts def files after build ([cd9141b](cd9141b99d94b091c16961de8dfc5d4049602574))
- Update package.json files ([5a3caa1](5a3caa1043174bd6927a67341a9cd6f3ce62fb1c))

### Update

- Move examples into src dir ([e3436f8](e3436f8ecf05237ed7103ad7ff20d7dcd849753c))

## [0.4.0-21] - 2022-03-29

[a137afe](a137afea68d4394732ba1d2f9064e3552d458d53)...[0eca8e8](0eca8e85dffd4922d216d9054527aa307f7b2b2a)

### Miscellaneous Tasks

- Copy README for pkg release ([1a240a4](1a240a430c43d08ebdf0d2b221e425f6de503e37))

## [0.4.0-19] - 2022-03-29

[04bfa4b](04bfa4bb6d34032f871a7777ffb99e39cc0bf899)...[8edf535](8edf5351a793b2f285c4e4041f92bfd47dd3e129)

### Miscellaneous Tasks

- Update package.json files ([59931f0](59931f09c5e6ca03adae0175d9c2034e5cddee5a))

## [0.4.0-18] - 2022-03-29

[ee06364](ee06364ca8612e36ff4685880dff6b17fa43050c)...[04bfa4b](04bfa4bb6d34032f871a7777ffb99e39cc0bf899)

### Features

- Implement workspaces ([f8e2008](f8e200848e0d7ea5147bba4dcd4d4db929985394))
- Add publish script ([eeb5c71](eeb5c710eae5e9864a131df59c7879aa79a21e99))

### Miscellaneous Tasks

- Update README.md ([8cf4622](8cf4622b412aca0c1f75722d9e235725b70bbed0))

### Update

- Rename typedocs out dir to typedocs ([119b26d](119b26d0374d5687c8ad09e529e4febc528262cd))

## [0.4.0-17] - 2022-03-29

[a66fc1f](a66fc1f37e45e1ab213314404b8985da03997c12)...[ee06364](ee06364ca8612e36ff4685880dff6b17fa43050c)

### Bug Fixes

- Set default prop as undefined for connectOnClick ([60aefad](60aefad85516f8975fe0b49d453433dd242e0d5e))

### Miscellaneous Tasks

- Remove setting elementBelow style onClick ([906b9e0](906b9e06999c638ecebea3ad8dceafdf635c25dd))
- Update auto-imports.d.ts ([c660be2](c660be22646489fc5ed882b331f9e46b180a0b78))

## [0.4.0-16] - 2022-03-29

[e9b97d5](e9b97d5879cd7c2845150694732f0400e56298a7)...[a66fc1f](a66fc1f37e45e1ab213314404b8985da03997c12)

### Bug Fixes

- Prevent onClick from creating edges inside same node ([c1105ff](c1105ff7bfff042a092f281a38c7ee7c467371e8))

### Regression

- Use computed to get current node/edge ([fc45029](fc4502915b336df7b23ef7981d77d636ed331dbc))

## [0.4.0-15] - 2022-03-29

[f2062b7](f2062b743cea6a584cb3b2ecd6f529def3332c80)...[e9b97d5](e9b97d5879cd7c2845150694732f0400e56298a7)

### Bug Fixes

- Try to resolve component before falling back to default ([d5cea2d](d5cea2d7dfac94c62ca973072179ba2309369c17))

## [0.4.0-14] - 2022-03-28

[c9a739c](c9a739c85c7e93703f06a898a7f293b3e9ff9451)...[f2062b7](f2062b743cea6a584cb3b2ecd6f529def3332c80)

### Bug Fixes

- Check if window exists before binding event listener for keypress ([a4d46a7](a4d46a76cd52098c0f499855fd6425f1a5c92ea9))
- Change modelValue/node-/edge-prop when elements are added to state ([87ea2b4](87ea2b4484a3d1ed23329ebbc09d0032c2e57586))
- Use empty string instead of null when source-/target-handle is not present ([67df80b](67df80b83bdc3be39f50ae0e897b3b8b48835f41))
- Check if scope exists before accessing id ([4383684](438368460de75e4b74f7b08e31f5ce5a8add2664))

### Miscellaneous Tasks

- Move watcher and computed to bottom ([d5bb57f](d5bb57fa6971c98184b0a5c579ec810bd6e87ebd))

### Update

- Try fetching instance when out of scope ([777e8bd](777e8bddc792a127bc98527ba3088523b2b17968))
- Rename update to updates (to fit arr type) ([c1dcf22](c1dcf223f4999d552af5d5e3d4f230fcfe1d0c78))

## [0.4.0-13] - 2022-03-26

[4ca63e3](4ca63e3673a8ac238ee88ffe998a6e0e9c715c81)...[c9a739c](c9a739c85c7e93703f06a898a7f293b3e9ff9451)

### Features

- Add ResizableNode to Basic example ([ff265e9](ff265e90763d5597f3aef3aa57d76c106a4e745d))

### Miscellaneous Tasks

- Add comments ([2a716f0](2a716f00c15d30a3aa45ce0666f05b701a84d4d5))
- Fix lint issues ([d5a0f64](d5a0f64f95813446826d0f6262810367bd9ccce2))

### Refactor

- Remove background variant none ([6a6d077](6a6d077110db3530bb8efaf21cb2818bf42477e7))

### Regression

- Add slot to connection line ([cfa1ea4](cfa1ea46735634819120442887699590f4ff1fb2))
- Calculate handle bounds regardless of update ([8037884](8037884976eab8d9ebd56bbac251041f7e287fac))

## [0.4.0-12] - 2022-03-25

[db35cd3](db35cd3a9c90fe51b96404468a0d1f86d1911ee1)...[4ca63e3](4ca63e3673a8ac238ee88ffe998a6e0e9c715c81)

### Bug Fixes

- Check for scope before trying injection ([c78b072](c78b07283f19f745d5c1d99d4e32b77b26405f24))
- Cleanup of state ([6a9c475](6a9c4759ad681237084019fc5785d44214cb04fc))

### Miscellaneous Tasks

- Remove unused var ([f8eeb87](f8eeb87177e38b99c422701018bc97de1c927596))
- Add comments to flow props ([50293bc](50293bc17a30a29a7a22443c6f28d237eb6cf8cc))

### Refactor

- Change children API to parentNode API ([b03d761](b03d761291f245d70c9e89c7ac5570a88d76a708))

## [0.4.0-11] - 2022-03-25

[ed3d9fc](ed3d9fc8e83508b74cae5200323e17cb505204df)...[db35cd3](db35cd3a9c90fe51b96404468a0d1f86d1911ee1)

### Bug Fixes

- Edges not selected on user selection ([5b10224](5b10224170d764b34a6a046f576ee41d2b6d6d98))
- Add no pan class name to nodes selection ([f0ec6cc](f0ec6cca8e303d049d370415507d93b886edecb6))

### Features

- Add dimensions to nodeprops ([3b344e5](3b344e57eca6531eb8cda9f24fae1541b1de3692))

### Miscellaneous Tasks

- Remove unused var ([c7d4d37](c7d4d37bcdb5cef899680aa9b2bd914eb45ddbdf))

### Refactor

- Rename selectionActive to userSelectionActive ([25123e1](25123e1902569109511e788a7622ee579aa8626a))

### Update

- Move mounted hooks up ([7cc0232](7cc0232b5d2eb545d8c6f8121de3ddd2cdc7bd1f))

## [0.4.0-10] - 2022-03-25

[94efd63](94efd639c62200777bd3c6a0e22dd837aab40c13)...[ed3d9fc](ed3d9fc8e83508b74cae5200323e17cb505204df)

### Bug Fixes

- Missing source/target node props on smoothstep edges ([4317101](43171011c43f7354cf4401d13698f7afe1c6f17b))
- Prevent scroll when zoom on scroll is false ([b5f9497](b5f94976c04e589adfaf86cc7012485cf7f51e75))

## [0.4.0-9] - 2022-03-25

[f3b3062](f3b306297032412e9bc1b46571aada7dd26dc9cb)...[94efd63](94efd639c62200777bd3c6a0e22dd837aab40c13)

### Bug Fixes

- Pass all required props to node components ([b0a45ea](b0a45eac1a3f343da04534fa9efb46994d65d252))
- Pass parentNode id instead of parentNode to components ([64127c7](64127c7ae431a016769704770dc6f588a5dfc4a3))
- Expand nodes correctly when prop enabled ([0b43e45](0b43e458d4549ec9e53cdce5323af7c352791806))
- Setting store state after init ([f8fa76c](f8fa76ce55ec926107bd44f05dd96dfd64e8e058))
- Connection line style prop ([e55cbc8](e55cbc8c580bccb79291b75ae120f780ac4ebd46))
- Destructure useHandle ([4ef0363](4ef03639320511919958a4048c11f9d8cf096983))
- Source/targetHandle type ([6fdaf7c](6fdaf7c5a3aa96808f8e0f15821a220f7b646c7f))
- Default prop value for zoomActivationKeyCode ([fc5d23b](fc5d23b53e4aed3bc25172913e49f4c4fcba7250))
- Use correct functions for center/path in simple bezier edge ([c5fff3a](c5fff3ae31f430828bfe67a08339f98af0a46f01))
- Use correct vars for center in straight edge ([8ef7c9e](8ef7c9e5bf5a62ab44939d1a9e9b02b8168246fa))
- Check if prop label exists before using dynamic component ([b0af70b](b0af70bf77401cecbc04056d046e1ec280332039))

### Features

- Enable passing components as node/edge-types ([6a2c1b0](6a2c1b00d738a2fde0bf11d09cb3a2c3c2d4210d))
- Enable using a parentNode / parentNodeId to add child nodes ([9a8caf4](9a8caf444ca6396288caee3138d05582f79f3698))
- Add updateNodeDimensions actions ([f1b52d9](f1b52d947792aa01723c48c32ec9dac3d493ff3f))
- Add onClick handler ([c97578a](c97578a820d42aafd44d9c6809a086d76ca9d735))
- Add & export bezierCenter function ([6ced48e](6ced48e14b917c23123634665613894012b61395))
- Add base edge ([13cd501](13cd5019599963b44925f6c0dac936654d98e4e6))
- Add default edge options ([10feee7](10feee79a12666f3285ddc9e741fb1c62463ccc8))
- Add noPanClassName, noWheelClassName & noDragClassName ([ce81cea](ce81cea1c04a83e7553d765062b5db7a48f61d60))
- Add d3zoom event to hooks ([cf9c3ef](cf9c3ef01e9bb2290ac8efcf5d0864385b7b364e))
- Add SimpleBezierEdge ([8b1ccad](8b1ccade4da9d69fbd7af7fd725bcd2ef4a5c095))

### Miscellaneous Tasks

- Fix lint issues ([97bfa2a](97bfa2a85b7ffe2599ef7315c1494a9f78796d27))
- Remove logs ([3e5667f](3e5667fbb6214682e00bf090887fb04882d097d3))

### Refactor

- Shorten default state setter function ([3539937](3539937752f241d780d18219c76632bcb4244c4d))
- Shorten watcher ([5cc0da2](5cc0da29c09140316ade884224333a4c00d7f3eb))
- Shorten setState ([0352acb](0352acb8dad4b2b73458930f2e7ecaef4082d786))
- Use null instead of undefined for optional state properties ([f3d6168](f3d616834bcc541360ca8804364de9691ef7ae6e))
- Reduce node props ([0b321b4](0b321b4bad74f716ea4102385fa2675233d28c55))
- Remove node and edges export ([09ade19](09ade1915d0a7d938e0c9525c86e9b69abf9a13f))
- Remove scaling from edge text ([631b6aa](631b6aa35204ce5a0bea6cc58429f465a146f8e3))
- Rename paneMovable to panOnDrag ([4a0df4a](4a0df4a28a33f557564bb5698a0f37398168c805))
- Make zoomActivationKeyCode non-optional again ([23b9b45](23b9b45740431a2c96456c9614a29c2b5e0cc4d0))
- Make zoomActivationKeyCode non-optional again ([bca4b56](bca4b56c941972bb727f536b2e267e260a35e9b5))

### Update

- Set vueFlow var to null on scope dispose ([c9b19ef](c9b19ef641f74b8e50e250eb6a9f3b8b35ea74a1))
- Remove typecast ([1649369](1649369fe5912aac26959cc114e69396e9a44bc5))
- Add edge text to exports ([2aad21d](2aad21dc3f5dc45d262e7764134a94cfdf5e6c39))

## [0.4.0-8] - 2022-03-23

[11da181](11da181d0f01c8521e2fca2c5f66bc86dd3ef5de)...[f3b3062](f3b306297032412e9bc1b46571aada7dd26dc9cb)

### Bug Fixes

- Use rect only if bgColor is present ([ea93d55](ea93d553b8e12f1059cda60a98dd5faaa80c4b62))
- Edges not connecting when mixed with top/btm & left/right ([f7c939e](f7c939e683ccc10a6948edca80708af117655d74))

### Features

- Use a storage class to map flow instances ([65d079d](65d079db2029ae76266fb90e0bd9c7724a02a26b))

### Miscellaneous Tasks

- Remove log ([8dcbb97](8dcbb9704aeea05e856b83c0438aca702447abe0))
- Merge shims into single file ([c43b94c](c43b94c93231e43ab80bb55c77061b850338ac0d))

### Update

- Use bgColor on extra rect ([d9c67be](d9c67bef606e98f21e79db25cf0ee06a3410458f))
- Return vueFlow even if scope doesnt exist ([3f5c7ea](3f5c7ea1860542f41a53315c33eb9664e095071c))

## [0.4.0-7] - 2022-03-16

[93e3d8b](93e3d8b84f51e61c29a1889078c8f35ee73fff62)...[11da181](11da181d0f01c8521e2fca2c5f66bc86dd3ef5de)

### Refactor

- Move paneReady event to transformation pane mounted hook ([0592929](05929299d3608d570d64af2a91709f6681bd268a))

### Update

- Remove useWindow export ([dcd2ec4](dcd2ec471eb2755e72792241c1d05f8dd972b992))

## [0.4.0-6] - 2022-03-14

[79bac64](79bac64cc934a56b933b504529dd8a8a2b8e5292)...[93e3d8b](93e3d8b84f51e61c29a1889078c8f35ee73fff62)

### Update

- Remove exports field ([6729588](672958850459a2a4ed342ffd762d1b70813046d4))

## [0.4.0-5] - 2022-03-14

[f3b1c5e](f3b1c5e79aa4c24bd65d4baee23012077b6eab57)...[79bac64](79bac64cc934a56b933b504529dd8a8a2b8e5292)

### Miscellaneous Tasks

- Update auto-imports.d.ts ([c70c816](c70c816f4be263be71c0aa6fdd338442c6d348e0))

### Update

- Fix export order ([ac9f380](ac9f380d155ff706cdb8dbab8671b742cf3dc749))

## [0.4.0-4] - 2022-03-14

[e4e5e67](e4e5e67687b19f1b80a715093bb05249984326d6)...[f3b1c5e](f3b1c5e79aa4c24bd65d4baee23012077b6eab57)

### Bug Fixes

- Prevent zoom when zoomOnScroll is disabled ([afaa038](afaa038584c43483d624f651997f7f1c947f7abf))

### Features

- Allow zoomOnScroll & panOnScroll to be used without an activation key ([d948f5e](d948f5eef4e24300463a5e9615f791ca2217b01b))
- Allow background height/width to be set ([2fa7e22](2fa7e22b5f3afb2929c557d0f0bef86eef9b0a4c))
- Add typedoc ([25e5b92](25e5b92843673606687d40cc16002794c1c575b1))
- Use postcss to parse default theme into a simple css file ([3b8c49e](3b8c49e654aedb644c58acbfd1b12e9a4e390574))
- Add comments to types ([c21ac7d](c21ac7dca49c204038736b2e615e29b67d5240a8))

### Update

- Use Shift for panOnScroll on Windows OS ([9317f78](9317f786b33978930d6c672b16a52c5c1e646d3a))

## [0.4.0-3] - 2022-03-08

[0c5e4a4](0c5e4a47aaa065dc6bac7c65b6192771993fa4e5)...[e4e5e67](e4e5e67687b19f1b80a715093bb05249984326d6)

### Bug Fixes

- Markers not displayed ([1def3a9](1def3a9fb3bc3adee7096bc19cc1039ae40a999a))
- Fix typo in paneMovable prop ([6746d6b](6746d6bb466ea78b3a2c2da7ff4283c7a9c25248))
- Edge text not aligning to center ([4f42fd0](4f42fd0e6ba44d05ea79df063d97c3fa174d0ec1))
- Edge text height not centered ([b7c1954](b7c19547f2bc5d856bb73eb7858be303f02f501e))
- UpdateEdge action not fully updating an edge ([46a63c2](46a63c29aab62d7cf653575ea8e64c4ec8a64e19))
- FitViewOnInit not passed to zoomPane ([fd951e8](fd951e8bb870a37ce9915c56ad5eba7c50c6c5d7))

### Features

- Add nodeElement as Prop to Nodes ([2bb3ecb](2bb3ecbe73a09990e3669124ca365d3791fcade8))
- Add names (node-types as name) to minimap node slots ([743b0bd](743b0bd0041cf86485414fe3e85f72f3b90b221f))
- Allow markers to have unique id ([994b403](994b40308918477681286079074243ff45a77aeb))

### Refactor

- Add default theme to style.css ([36ac64f](36ac64f05484446c1cc475e0ae468c50e23e05b3))

### Update

- Unidirectional example ([158f81d](158f81d5e59317bcad5697991bb04bcd3b79c817))
- Deprecate modelValue prop ([ac6f62f](ac6f62f0a39161358297465a89052dbe402c7d31))
- Remove copy plugin ([300886c](300886c8b16eb1d64e0b49651f132812dda6f1ac))
- Remove scope dispose from useHandle ([cd2b898](cd2b89828dab19226bd04d8a614579b2038cb5c3))
- Filter edges of hidden nodes ([c31deb8](c31deb897dc0c82e645d881926f207b31069bdfb))
- Deprecare setElements action ([40bb91f](40bb91f6089bf753aaa1b3e8da2ba42367aaf741))

## [0.4.0-2] - 2022-02-22

[776000c](776000ccf14a17169caf2c541fed651010548407)...[0c5e4a4](0c5e4a47aaa065dc6bac7c65b6192771993fa4e5)

### Refactor

- Remove link from deps ([6e5c58f](6e5c58fcaeb78426e0bb6bf189950da37d907655))

## [0.4.0-1] - 2022-02-21

[082bc51](082bc515994c2828e3562d824e15f96d3c785998)...[776000c](776000ccf14a17169caf2c541fed651010548407)

### Bug Fixes

- Typings for UseVueFlow ([2731d0b](2731d0bf5e7c70f8a96d563e807c81010495869e))
- Typings for UseVueFlow ([8260eab](8260eabc589f5009d8180d43eaf2d393fbd10672))
- Clear all empty values before passing as props ([1756160](17561604b6ca9c25bc345e3247c00ec1459d1834))

### Features

- Add OptionsAPI example ([78c5868](78c58688a2747b830768bd21ce2619b91a866c7e))
- Try to dispose states on unmount ([c5b39d4](c5b39d4588c273af2afef9c96a2a03e083d5f940))

### Miscellaneous Tasks

- Fix examples ([f44784b](f44784b1d01fbd82f834ae671bceb80e58e614f7))
- Update deps ([ae3cb8f](ae3cb8f80c1df7f89da2de87ca40ada59d9dabf7))
- Tsconfig dev ([bd36dee](bd36dee54c4f71aa43b7cf6e39f2310f66b89060))
- Update yarn.lock ([3518e1d](3518e1dab2f65e7302371b79bf0ca0076ab46368))
- Couple minor fixes ([b7abb31](b7abb31c24c60b4e397f33826e9ca987715ecf52))
- Fix tsconfig ([fe31112](fe31112c5aa10d99327fb35f6f36b3e53313ef82))
- Update yarn.lock ([a9b1b1a](a9b1b1ad6de5a4f523d83f5f9b2c7fa55cd57e8a))

### Refactor

- Remove useElementsState utility ([ca85d80](ca85d8002e70a731bd348526b9a37f41b2ea892f))
- Use dist pkg for examples ([54e8301](54e8301ddb3aacffe682ba2176cada02ff3effb0))

### Update

- Set store instance before emitting pane-ready event ([1699749](16997494abb048edc361386644098df1f238dfcb))
- Use prop for fitViewOnInit ([a3b2348](a3b2348ea7b26c53c4284cb67dd90fb26f9fe5a3))
- Add missing property to store ([d835e45](d835e4546cdd5a4a41fb83fc78097913f3830cd1))
- Add tsconfig.build.json ([b51c26f](b51c26f6bb9bef862f031121f441e429d544fdba))

## [0.4.0-0] - 2021-12-20

[4663bb2](4663bb228d4c4cb6c68fbac506255901eb8dbdc6)...[082bc51](082bc515994c2828e3562d824e15f96d3c785998)

### Bug Fixes

- Edges not properly calculating position ([2350d83](2350d83718ac4a1d1613959a8a632366e9756d7f))
- Correct usage of store in testing ([44f8eb1](44f8eb1fe766df1ceb1d511fb9f7e22da1e650ca))
- Connection line not showing up when no edges are defined ([9abd768](9abd768bce45e036d3eb180419dedda9274570f9))
- Move replace & copy plugin ([9dea4bc](9dea4bcd61841b50796813f728850c4475e03e95))
- Marker types & flowstate id removed from state ([0eb162f](0eb162f6224c8894bef33d71555e40b671bea72c))
- Duplicate prop binding ([db726d1](db726d14a8ea365a9617320a44b5b3e8beb02867))
- Correct tests ([d2961de](d2961dec9f26149aa4a594231c502b3f592d28d4))
- Improper style encapsulation ([6dcf5d8](6dcf5d843444ab97b7db121ff00c7b5c630ace67))
- Correct test for testing custom node/edge types ([97f4c0e](97f4c0e847b2874cb9f3ac60a5a3734a4a211cc4))
- Replace useStore with useVueFlow ([f6007d0](f6007d026c003ce59d45ce5437cf17666a977168))
- Add props to smoothstep edge explicitly ([ca33de0](ca33de0556b57591fda157cc3efa3de6e08bbc37))
- Replace store id with flow id ([600e386](600e3866c4e15730ea25aca84463e1f16ef96adb))
- Import path of initial state helper ([304e8f5](304e8f542302f18379df8b43a9d5e28769829dec))
- Re-set elements if elements are empty and modelValue contains els ([535f7e6](535f7e60f213d66e05d43f08f6202bbb63f426c3))
- Check if state initialized ([bb91ab7](bb91ab711bb7a9a7bd393d61eda1d13bd972502c))
- Properly set store ([63bf3b3](63bf3b3a26f2fd7141d9f5de5ba6899d8010f33a))
- Shims overwriting component internal instance type ([25b64fe](25b64fe3a7aa69fb6b38d9ad72355463debfb435))
- Selection changes overwriting itself ([425fc50](425fc500b076dc31d71bff422a0387b850a09f56))
- Handles emitting connect and update simulteanously ([983c86c](983c86c938f92a94db61797b383b8e028215b2be))
- Correctly calculate xyzpos from parent ([0e82420](0e8242014261187560ca1d1b61bbf371ac82c5a5))
- Watch parent nodes deeply to trigger xyz-pos calculation ([fbe62b9](fbe62b9ab96aa4d654f674af9981ce30c79cf182))

### Features

- Add store id as class to handles ([9c1f044](9c1f04426eaf6b76b5e128762946ed28b3dfd998))
- Export getNodesInside utility ([106342c](106342cacf7042de334d7776f2875fce04d1606a))
- Extend Element generics to DataNode and DataEdge ([368b0de](368b0de1b6e20ccd9e454725fc8e52ec6677cb49))
- Add grouping example ([ecd38b2](ecd38b232b184a02082f5da75abde02334ace1c2))
- Nested boundaries ([3f0b0db](3f0b0dbd705800b3f571e102deeed6cc1a87f26a))
- Flatten child map of nodes ([0450ba2](0450ba2eae24b9f8b0c834525328c8d44f0084ad))
- Add addSelectedNodes, addSelectedEdges, updateNodePosition actions ([2d611b8](2d611b8bbeef2d8a5ef4d664bf1aea0309c92489))
- Add transformation pane ([2210c59](2210c59bf8394539308191bb2990f001c776cec7))
- Group edges by z-index level ([3dae06c](3dae06c936addbd365d14632ae5b4b5b6b8c549d))
- Calculate xyz pos if nested ([eead00a](eead00a255781a34d7433926ba116859ac8e7dba))
- Add new zoom pan helper functions + transition for all helpers ([7cb6192](7cb6192591a0710222c9169f6998b06dd2ae2b6b))
- Remove node/edge-types prop ([774cb2e](774cb2e644c376f04f8b1ccf7eac39e2f28414c8))
- Add handlebounds type ([46a76b7](46a76b783e1eae25b9299625fbd93daa8e56f123))
- Add event listener to vueflow object ([d875cfe](d875cfede373a85476c83171bf2ce0f2f5ec1ddc))
- Add apply changes handlers ([81c8145](81c8145f3a86ffeade1072b78f23d5110c766d15))
- Add useNode/useEdge-state helpers ([c80ab8f](c80ab8fe508a0135b1a8ee8224dee82ffec7836f))
- Add setNodes and OnNodesChange / setEdges OnEdgesChange utils to useNode/Edge-state ([65b2e0d](65b2e0d14886ce06c7bd16af6dad79121982d1ff))
- Add utilities to useState functions ([518d12d](518d12d38102224475ae59e255eb7621fe056e6f))
- Use vModel for elements, nodes and edges ([be725c6](be725c6d2d9c756857db0c3d1e609ffbb651e232))
- Add store as refs to useVueFlow ([91009e1](91009e1dca90f8022e2cf9d3a9dbf67228bbbf4b))
- Add source-target-pos to graph-edge ([1b206c9](1b206c942c3456194e8bd4f3db158f903e92025e))
- Export applychanges utilities separately ([994dd99](994dd9929c89efde261c2d7c01a9a21f97355242))
- Add option to disable default change handlers globally ([e2e094b](e2e094b987da2c35000a50b2126eae3edacf9981))
- Add selectable option to edges ([e91188d](e91188de5c14f690cb239e51fd55b2fa120cb673))
- Add state as refs, getters and actions to vueFlow object for easier access ([7736915](7736915720281c48cfbe4861a16e5b1b7d5a4e48))
- Narrow options type for useNodesState/useEdgesState/useElementsState ([a9e7eb3](a9e7eb31ea2147f225e5fff09126e8d3a5e738f4))

### Miscellaneous Tasks

- Update draggable to ^0.4.1 ([fe3f6e6](fe3f6e6e19b4b08a4a1e9ad3032d43390068c762))
- Remove unused imports ([3e42948](3e42948cac4f68b72d08a15c0ca40f8e952c2632))
- Update vite-plugin-vue-type-imports to ^0.1.3 ([cc7cedf](cc7cedfda07fb7524b8dd1a1a266f1b9c608e686))
- Remove unused imports ([b9a417a](b9a417a6296f09b6ad7005b68705b65243d8a5fa))

### Refactor

- Remove get and invoke imports ([c522806](c5228065b4a9d9e549888207d8daa902e31600b2))
- Use vite-plugin-import-types ([74c3037](74c30376a5885ceceb6e820fb7053b95d42c36a3))
- Change xPos yPos props to position ([4ef58e9](4ef58e9e9951c7266a59c9194d87093ec07d5b36))
- Remove Node/TranslateExtent ([da54bc3](da54bc33167739616d19ce4114e36bf952d5cf65))
- Change node and edge types to extend element ([fe0eeae](fe0eeaeae998a703750109e7e43985b3cbc96d0e))
- Remove ElementId type ([f00f34d](f00f34d84b68a974e110506b88745dcad6d135b5))
- Remove internal __vf field ([f28e10b](f28e10b05a28bc289503a78b46b985ee4b333875))
- Remove elements and replace with nodes and edges ([b803414](b80341467b7f53c24b59ab101110b7066d6dfa46))
- Use plugin to import prop interface ([5359e3a](5359e3a26a93a0a458981358eb921c5b4b205923))
- Remove draggable options, boolean only ([419b123](419b123fee6001d0c1c71a08eb7fd8968f096032))
- Use plugin to import prop interface ([076ff4c](076ff4ce547ccd1bd6ba3e0b4a1015b6516721c6))
- Remove index from keys ([76ae73c](76ae73c2d27751ec0407503f8ea3a967e174023b))
- Use stored node data when re-parsing elements ([6bdea72](6bdea72b20f61252df52ce7b690e924afea47a30))
- Properly nest components ([c96f62f](c96f62f62280f8a934537ca3fa179c744f7a2199))
- Set stored elements from nodes and edges ([4353104](43531043e9618db8b01e02d40bcb2ac1181cff9f))
- Move store utils to state ([6903dcb](6903dcb1392ae3288b8093a3835692c27f3970f9))
- Remove arrowhead and replace with markertype ([056bcd5](056bcd5dd97723cf2bbbc144039f2f926cd582ad))
- Use selection change hook ([d367f3a](d367f3a2aae44d002333bfa79e3da7390ea9d40d))
- Replace selectedElements with selectedNodes and selectedEdges ([14fc678](14fc678c310db17b8fe8bfdacfe947f6f050cbe4))
- Remove renderer and move logic to zoom pane ([943479e](943479e2c78e4a76824f98693c2c132fb6c4f47d))
- Move user selection rect drawing into component ([7a8aed4](7a8aed4ec4384828f5e25e5358734bd4a24d5b47))
- Use markerEnd and markerStart ([a7bacb7](a7bacb754af3a00054348c1628873c149edd44a7))
- Use computedPosition when checking inner bounds ([b365e94](b365e947e12e9b62daed817d65965422f7ba0d82))
- Add selectednodesbbox back to state ([4065354](4065354c109a30947dfc9801e498113297c6ea1f))
- Use watcher to calc xyzpos ([60fcbc2](60fcbc2d06996212e2171a7b0b58b3d0a2ee228e))
- Remove useStore.ts and move logic to store.ts ([a80d475](a80d475216af2236b167377371c5988b0fb3e640))
- Add getters for selected nodes/edges ([ca2eca4](ca2eca4265363e100499d453caa44a291564bcc1))
- When adding elements as selected disable emit ([02911b4](02911b417769eb2ef1a36e41e95ce47a2f834afa))
- Replace useStore with useVueFlow ([a604dd8](a604dd8ab1d72ab50865349e3118c5d19c9dab1c))
- Move hooks to store dir ([c1da504](c1da504fa967be0f2aebd10023f881c24d2dd424))
- Replace store injection with VueFlow injection ([17a1b08](17a1b08ee0f60ffaca0cd7d1f47f02d17cace55c))
- Add slots to node/edge labels ([d9e0675](d9e067538560acd8773b805c7f93c841ee21939f))
- Use plugin to import prop types ([fe4798e](fe4798ea5b4f0132251f4d5a8ab4213b5808cbbf))
- Apply default change handlers by default ([9f95749](9f957492fe2eb632983c7e083d329b9e21b4ebbd))
- Rename isReady to paneReady ([758f4f2](758f4f23ff5434847188f3e87ffbcfa127eca60c))
- Use watcher to change every prop as a single item ([f8a23c5](f8a23c59ecda444435eef11c4ccb8d05df949816))
- Export useNodesState and useEdgesState separately from useVueFlow ([39501d0](39501d0bb0550ce1f05d13b33979a77bd3e4f8ee))
- Remove separate apply changes function and add them to useNodesState useEdgesState ([423f6aa](423f6aa78d3b330d7f2187dceaf867e6f2364f85))
- Disable connecting handles inside the same node ([8118325](8118325d4e276f41ad66d285c7190f0700e0bc7a))
- Lowercase event names (OnPaneLoad -> onPaneLoad) ([b12863f](b12863f297301b7b35e110e87dc2f3d80fa77c3b))
- Add options to useElementsState ([4c7cf39](4c7cf39e7b08018ae3465c112f9b3d19b6b1dfae))
- Remove setting elements without parsing in state ([5457106](5457106905ac691eefe713593d2b00c144a41d7c))
- Watch models ([ee6bf32](ee6bf3252e242b13912f6ca7d76fa2da0b70836a))
- Make nodes/edges for useStates helpers optional ([35165c3](35165c3a98f263c15fcd67a0e44573576d30f964))
- Replace getMarkerEnd utility with getMarkerId ([8fbfca1](8fbfca1e7ac5fe13dcb989ab54d9cfeea2f157ea))
- Make opts for useElementsState optional ([c283769](c28376950df92961b9bb1d64754c46e9582f5b23))
- Set elements when initializing store ([2910731](2910731c3be1286db90bbc8d7ec424bda9117e49))
- Remove defaults for props ([dcbe986](dcbe9865e931eae4734ed7e3ed02ca81ec840b8c))

### Update

- Use MouseTouchEvent type for drag events ([8cf2279](8cf22797f5490a63f103c2f1d48cd7d4475394eb))
- Add getElements helper ([c82ca4e](c82ca4e2251a58328eca1d11937068093df21cf1))
- Add source/target nodes on edge parsing ([e2d60be](e2d60bedfdac2895872ef6d5c7758c091bcece5b))
- Remove omit elements from flowoptions type ([9e06d6e](9e06d6e9b5b48afdde563958f0e9387a718953a7))
- Add new stylings for container and transformation pane ([232fd30](232fd30f1dec3b94ccad88d52fdaab8659e21023))
- Filter edges by visibility ([1060370](106037056ea684c28d3b8784ea3d0fcf1ea344cf))
- Add utils to state ([63301cc](63301cc0000eb41bdb6217d0c86d1d94c9aed1b2))
- Remove slots ([c8d701d](c8d701d3b41428808d33120d79c73e1001d5766b))
- Remove transform from NodeRenderer ([503264a](503264ae51321abe69014fcf7890a716d9623253))
- Implement new marker props ([2b34b12](2b34b124b0a87ec656dc94f6612f952703976ce1))
- Clean up edgewrapper props ([c9ff178](c9ff178d3804cee42a43c45b49868bc20e1801fa))
- Add container class to background ([d54c981](d54c981aad089765ebdc8a403466752a5f74c172))
- Adapt examples ([d730869](d730869443d1dc6a97f3668580979678738b2c58))
- Use node 14 ([d1809a5](d1809a58ee4214752548f4ee0da258e850965404))
- Add new zoom pan helper functions to instance ([55b8434](55b843482b90a6c95e33656137180339e0f959ab))
- Add slot for zoom-pane ([cd41090](cd410905755fea0dbb754c797a42fd8d9d55060d))
- Defer update pos to nexttick ([97c0254](97c025478df3f4ff7306ec1f92dd133a9213351f))
- Remove LoadingIndicator.vue ([aaf216a](aaf216a31e726c137999aa8ab82f573092b9d5d7))
- Use computedPosition in GroupNode.vue ([a983858](a983858acf0265ab3f6d0e63da25386b6e4397b7))
- Correct examples ([5139b07](5139b0786b410bd226d7ecd1b6af1a7c865faa3e))
- Fix examples ([69dc45c](69dc45c3be6e3fd92c1ae51430ba8640e3ad0a34))
- Add draggable,selectable and connectable as props to nodes ([947baef](947baefa029bcd521901f930292e21d8157c4ebf))
- Use node/edge component type to define defaults ([212c911](212c91107fd54a355f66fb3791cb0b994111055e))
- Watch source/target pos to update position so edges get properly re-rendered ([8f6ce13](8f6ce132266e8857f2dee6fbfd1947f2848704f9))
- Remove computed properties in nodes selection ([a62a891](a62a8912432e01268cb0b78460e6312a35011703))
- Rename FlowActions/FlowGetters etc. to Actions, Getters ([e64f6b7](e64f6b7bc6edd6260af0a259761f57d29a86ed2d))
- Add key to NodesSelection.vue ([f0f68ff](f0f68ff63f46f998e74d3393d3e4b63abf9e3b11))
- Use draggablecore for nodes selection ([a76e2ca](a76e2cacf4e17fe23d5bb4079706f6ce39727cda))
- Correct examples ([445718d](445718d6f4d6f4de77d403fd8df3e9d19be2d29c))
- V-if on node/edgerenderer ([7367345](7367345d8dcb2a0b118227a3d68c8192075439f9))
- Correctly overwrite nodes on re-parsing ([d2ac41e](d2ac41e4f703076374a5453e900381d11aa5369a))
- Remove v-if on edge-renderer ([df17da7](df17da71fa67b4ce0465071b364be2bfa02deb49))
- Use computed getters to group edges by z-level ([f2fe93f](f2fe93f1db8b69cc11eb03475104ae011171a333))
- Correct examples ([124338b](124338b8d438e22bb825f39681cbcec06d5ed392))

## [0.3.1] - 2021-12-04

[527a70c](527a70c0402d491cfe92f4a47cc04e41beb0a8dc)...[4663bb2](4663bb228d4c4cb6c68fbac506255901eb8dbdc6)

### Update

- Use tryOnMounted ([601b65a](601b65a75f37959067cc9dbd07f9b532bce97802))
- Use es file for default export ([8151c28](8151c28495f4a052593d2b4834b996f485457dd4))

## [0.3.0] - 2021-12-04

[f0ca05f](f0ca05f0c4503cf40116b9c8c5f961e9651d3825)...[527a70c](527a70c0402d491cfe92f4a47cc04e41beb0a8dc)

### Bug Fixes

- NodeExtent not set on position update ([27e3979](27e39796a071ba2103ba62f34a56a984a887d547))
- TranslateExtent not set correctly ([043ba21](043ba21a94c40c4f6f82a99bcb61471160c263c7))
- Zoom related state to update when flow is ready ([229bbb7](229bbb7a3c38af364144553e35a9912d958749e1))
- Correct injection and remove id from refs ([3b44810](3b448100d6e42622ab844da721e694a3ac490fe4))

### Features

- Add option to zoom to specific node ids and transitionDuration for smooth transitions on fitView ([43b68c1](43b68c1699d02ab748e64e87a7db31c2b2772676))
- Add cypress for testing ([796c604](796c60431f4b7144074684d2b2994bcc09d83821))
- Add container.spec.ts ([b838977](b838977687136711f89d9dd07b295b36c6ca8999))

### Miscellaneous Tasks

- Move comment in vite.config.ts ([19a5575](19a55759df92858538029bec079c0cf91945ce58))

### Refactor

- Remove pinia ([58a8f9d](58a8f9d4df7acdd26e069f4f1448ec11c0be0ef7))
- Remove transition and loading.transition property ([b1f541b](b1f541b63d7527118f3d4ef6afe7ef055ce1b023))
- Rename param of setState ([f8cf71c](f8cf71cfb8cf92f3f3ced1774b6fe5f5912ed607))

### Update

- Add updatable as prop to edges ([b88f210](b88f2105fb0e11c2cf299b318fa45bbfb3b6f0f1))
- Add elementsProcessed event hook ([4740a2c](4740a2c8fe68bb9efcdfced0da6d8569a0c81576))
- Exclude cypress dir from build ([a664252](a66425294ccebb2d120b190a536b779e9e84d6b3))
- Try to get active pinia before using new one ([58f5c25](58f5c2568ce38f2ef30aec7bb63bd414dd58554a))
- Add cjs to build ([70b44db](70b44dbc03f50977cff946fc02330c0e527ddabc))
- Rename FlowStore to Store and ReactiveFlowStore to FlowStore ([3c9840c](3c9840cc50e50a00ba51460bea3b33c16c41fa51))
- Remove pinia from tests ([55e738f](55e738f6bfc9cf06c04ee7922262a25942c3e41c))
- Remove microdiff ([55122ed](55122ed1877ebe0a672f3749cbabbec5cc5e9fbb))
- Remove pinia ([0816bf0](0816bf0c7569c1f774ddcd0b82033fc519c578a9))
- Only inject if in  current instance ([bf9ce37](bf9ce37b64e025ecccd8ff7627fcb3602e2ab32a))
- Add test mode ([9abc222](9abc222c1422a9de2bf1fedb5833a310e634f6a7))
- Remove Loading type from components.ts ([eab715b](eab715b13a96a75f977794cef46063e12ff9638c))
- Add more flow tests ([aa72527](aa72527ad28f950438f4459450b13fba5f86007e))
- Static id for store state ([0fcf8bb](0fcf8bbeaa34af8ddf33c0c3ac9266c6e0344f37))
- Disable loading component if prop not passed ([491c83d](491c83dcc89007a88526c6a99b66abbfd529b203))
- Overload flowoptions typings with non-nullables in flowstate ([1a3b683](1a3b68373ec0b893db5255d6985e1e69f67a0d5c))
- Remove node zoom from basic example ([f5caf94](f5caf94cfac78585a8537d8d9cae175ad1452ff7))

## [0.2.2] - 2021-11-26

[166d837](166d83725ba41b50cfda8ace25546ab50833581f)...[f0ca05f](f0ca05f0c4503cf40116b9c8c5f961e9651d3825)

### Refactor

- Make edge updating optional ([4630f3e](4630f3efc142fe8cf5d41113689036a6d62b15ef))

### Update

- Watch node height too for updating dimensions ([98b6fdb](98b6fdb71743a1e20afd4befea2b7f4dd0bea574))
- Use setElements for addElements with force set false ([512df8e](512df8e42b022d29196ddb5d022d5f6fd6832bba))

## [0.2.1] - 2021-11-25

[50fc0f2](50fc0f2fd8a27c0c8422f4a6c15dcfadecb40140)...[166d837](166d83725ba41b50cfda8ace25546ab50833581f)

### Bug Fixes

- Import paths in components ([c3f8809](c3f88093621c8e9320bfa0dc6d3e7f44d90cc099))
- SetState syntax error ([01f5456](01f545640773f4367fb29a754621e91687f4cf7b))

### Refactor

- Async process elements ([4408ca1](4408ca1eb7e32fb805c55ac14f185925a775f96c))
- Deferr initial loading to Renderer.vue component ([5b00049](5b00049a65d59c034c734fc05dc8dc70b79fbcb5))

### Update

- Watch nodes width for dimension update ([0b27640](0b2764028f91533a630cbb9b5fbbf5693f5668c6))
- Zoom-pane style ([e73a55a](e73a55af624b6dc6d6ac260d011959611dc1dd03))

## [0.2.0] - 2021-11-25

[7829b6a](7829b6a1a8ce4cb5f9cea141b8c4c177a1db9e8e)...[50fc0f2](50fc0f2fd8a27c0c8422f4a6c15dcfadecb40140)

### Bug Fixes

- Hooks to return a graph-node type ([db70409](db70409337298246a11ee01adc3fdbc7d22e22c4))
- Missing element click event ([5011bf0](5011bf035ee4e0577d6e416c8e4093ce31acfb63))
- Pass correct store values to node wrapper ([f5dcd51](f5dcd5108ce108a3150d56d48bc4efec39b0ed6a))
- Interaction example firing events wrong ([f455939](f4559398f69080f546960d1eb70db4305bf30550))
- Add watcher that observes elements length for re-parsing ([e065df5](e065df5afcf786da99819ca456738f06d1686cc7))
- Check diff before re-parsing elements ([b140b84](b140b84ccdb1243fb1a17e6cd415cc31f0ff6f05))
- Wrong type added to button-edge ([409a268](409a268ddd2d5975bbfd16bec3790842a2140eae))
- Edge-text typing ([7916b20](7916b20a99451ee73fb291947230327062ff1bc0))
- Check if state option is typeof undefined before setting (not just false-ish) ([5ceee98](5ceee98e9b12bc6703b814f2ebb24ce02cf3798e))
- Parsing overwriting __vf fields or not writing them at all ([fd83a6d](fd83a6d36523c0d129f499883b0b104a97fdac8f))
- Props not being watched on time ([bb0b904](bb0b9049eaf1aef273d99872c701527824c6a5f0))

### Features

- Add offset to fitview-params ([073b25e](073b25ec606d0aca14572bebc0251d14301e2584))
- Add DefaultEdgeTypes-type ([1eac951](1eac951055c7a493e768ff16b25cafe7d1c81af5))
- Allow nodes to have their own snapGrid option ([71a10b2](71a10b2536cb5cb60340027a007e08697a2310ee))
- Allow nodes to pass all draggable options ([da4fd4f](da4fd4f7ced68e0b8d308be863e45a71f912a771))
- Make addEdge and removeElement mutate the array passed in ([74cc61a](74cc61ad8d70c8044ecc1265df642b4e9cbdc912))
- Add option to pass a valid target pos / valid source pos func to nodes ([9e94196](9e941966a4ae639e0d4729e2bf0eb6edeb3f6601))

### Refactor

- Remove __vf.position ([84bad86](84bad861ea05377eec4c2bcab7a5b3da25ccab71))
- Use v-model to reactively change node props ([8f65918](8f659187605ce269f8048416e9c5581223c0525f))
- Remove vf prop ([729ae4c](729ae4c902874439f2cca617a1ad8d6bb64cf3d9))
- Remove updateNodePosDiff from node selection ([ac2e2d5](ac2e2d5f0ac0e753e2a15243f51bec3e45440474))
- Remove node-pos actions ([fa63dee](fa63dee37a54b1966476996a2e32a25319bfb68f))
- Remove nodes/edges field ([725dc8a](725dc8acb722d7d52541290c61c0737611d917d9))
- Remove worker and store option ([708fa1f](708fa1f970c307c373d53634fb248d2e22715422))
- Remove SourceTargetNode-type ([8b0ddc9](8b0ddc9be91fd1aabbac53b0d5bd0424647a282b))
- Move parseElements to graph utils ([5ffeb92](5ffeb928ae5f8c75baa5151c0db5aee0aa091437))
- Move init function to store as setState ([1ce41cc](1ce41ccd40e74a9e2bf9d1eb60916886e928e505))
- Check if state variables have to be re-set ([96d54c5](96d54c59dc2872e651ed5d8f7fee8e93c21afacf))

### Update

- Use getNodes in minimap instead of directly accessing nodes state val ([04b64de](04b64de1de80e0d2bb38eb1e6b14a30d12e448d4))
- Pass source node to ConnectionLine as prop ([89849f4](89849f4eacd60614af7dddf50fb029dd1e30b61a))
- Import path in node wrapper ([e6a54d4](e6a54d482ad2647b326d2ace012833eef3d00030))
- Use getNodes in zoom pan helper ([23bceea](23bceea2551a7edc795dab86d17984bcc2ae62ea))
- Remove watchEffect from UpdateNodeExample.vue ([729d3d5](729d3d5ca2fe412dfb8cd99cd1babf954327bc29))
- Types in SelectionPane.vue ([cf2ded4](cf2ded4fc88a6ffc09948a0f59bf2f4ac4ba5dc7))
- Add edge as param to edgeupdateend event ([929a6e6](929a6e637b2e885ba3c9b6076215d58f2cb5d5ea))
- Remove promise from addelements ([9c7c236](9c7c2368a06d5f86ed2e08445cb671d978be0b4e))
- Typing of edges ([7b4dde4](7b4dde4411e55fc460ba728027ac38865c7cc3c1))
- Set modelValue after initialization of elements ([95fc013](95fc013613c4da6ae9f00f65a9c1083bbdcfeb3a))
- Remove promise from setState ([233e915](233e9153760a63b756b5a9497dafe1081feaee32))
- Remove worker prop ([3855e9f](3855e9fe3fa8b0cba706f5929e66c75599e4038b))
- Add __vf to node props ([f2e38ca](f2e38ca7ac20b15e3e8549fa3b3d612230c953e9))
- Remove store, worker props ([bd140f1](bd140f154902399244d0630ab62a9e7908107eac))
- Mutate elements arr on updateEdge ([6c3bce8](6c3bce88a78ea6335d79b726e93a2cb6bf524c17))

## [0.1.7] - 2021-11-23

[d57b94d](d57b94d0bffab2bc0922a1fd8ecd9cf0e8b4f498)...[7829b6a](7829b6a1a8ce4cb5f9cea141b8c4c177a1db9e8e)

### Bug Fixes

- Edges not reacting to hidden nodes ([d22e210](d22e21041df8acb91fecaea1571929031fa2005b))

### Features

- Add GraphEdge type ([cddf875](cddf875b6d76d8e9d3f4439402566c9372bcb50f))

### Update

- When zoom is deactivated we disbale scrolling ([ca46d6a](ca46d6a77156a9b34cfe9ec4f61fa6049f58f0d2))
- Export flowprops and custom connection line props type ([091f3f8](091f3f82c208fba5c1bfc58607c6c15808a64ef8))

## [0.1.6] - 2021-11-23

[65250c2](65250c224bbb0903f575ae2d65060fa12f985b32)...[d57b94d](d57b94d0bffab2bc0922a1fd8ecd9cf0e8b4f498)

### Bug Fixes

- PreventScrolling missing in props definition ([c286b3b](c286b3b7ff6fe03ea690e708aea363b4018a23c5))

## [0.1.5] - 2021-11-23

[8ec494d](8ec494da1eb4cbb3827265a119c24e4e3cbf6327)...[65250c2](65250c224bbb0903f575ae2d65060fa12f985b32)

### Bug Fixes

- Missing props on Draggable ([54d5780](54d5780febe8dc6ed16107757d70582b8fe9e950))
- Node selection not working if selectable === undefined ([dbe82a7](dbe82a718aa5e7813f10406b91dd0e91cf0c3461))

### Miscellaneous Tasks

- Update revue-draggable to 0.3.9 ([3f758c5](3f758c529c8438375db98281371b5f840ae54385))

### Update

- Remove fallback operator ([8d08f67](8d08f67ee64423ff9e8280e7b0e8ea35fb22bb98))
- Add scale prop to draggable ([c0f7e5c](c0f7e5c9e982c227082a980be82327c13bea7246))

## [0.1.4] - 2021-11-23

[3453127](345312728c315d69bdc051974e1c476774a42f9f)...[8ec494d](8ec494da1eb4cbb3827265a119c24e4e3cbf6327)

### Features

- Extend connection line props for more advanced usage ([67634fd](67634fd72e2b4811cfa355835ed822f79eb74ab1))

## [0.1.3] - 2021-11-23

[1f77b77](1f77b77fe73a186cf6c90b08b50e9e5e5833d5ec)...[3453127](345312728c315d69bdc051974e1c476774a42f9f)

### Bug Fixes

- Remove deep flag from elements and store-elements watcher ([9ec1c4d](9ec1c4dc2b489b2480169831b1ce546ef98a6c64))
- Dont select nodes when selectable=false closes ([17f7e4b](17f7e4b0e73656f683e63d76b9c8ee08f92a86c1))

### Features

- Use quadratic bezier curve for top-left and bottom-right edges ([0e80383](0e803839d65ea11b6ee64a60278de09c7bf223bc))
- Add preventScrolling option ([46ecec5](46ecec53667252356b5df9a3def17504bd8213ca))

## [0.1.2] - 2021-11-23

[94dcb0c](94dcb0c03dfd0bfa3a3b35a726db48cea259715a)...[1f77b77](1f77b77fe73a186cf6c90b08b50e9e5e5833d5ec)

### Bug Fixes

- Connection line position incorrectly calculated ([d87388f](d87388fbe60be18563c85fe303ae3f2d4bc49fe5))

## [0.1.1] - 2021-11-22

[a03f658](a03f6587941f1eaae429a492fb0298cddd5fd182)...[94dcb0c](94dcb0c03dfd0bfa3a3b35a726db48cea259715a)

### Bug Fixes

- Prop typings ([fec38a1](fec38a129a059717e633042756af8f51cbbf8723))
- Edge text type ([0dd5ed7](0dd5ed7836a465697840c29434e769eb31d4a777))

### Refactor

- Pass props to edge/nodewrapper separately ([c35673c](c35673c622351c07dc99d3a5b87036bce9a15c6e))
- Change prop types for EdgeWrapper ([f86033c](f86033c1e8cf3b37b8c16ab6d9612a4b2761c9ea))
- Change prop types for NodeWrapper ([c7dca2c](c7dca2cbd0da9f8d41c77ba0b3383b5c3ce589af))
- Remove node/edge-renderer slots ([0b57ee1](0b57ee167e2c994e7d5a1785afd98cb3cb85d729))

### Update

- Pass down values as props instead of relying on store ([6059b02](6059b02e4486416c3fd0ddf1d9eeb9220eb4f55c))
- Remove renderer exports ([ebd0f9e](ebd0f9e738ab30bab819a3ed9703dff59ff5eda7))
- Pass store state as props to edge-renderer and edge ([2b065b4](2b065b4e564eab2bcc06c9cd2ad6d4233e6ce66c))
- Use controlledComputed for edges/nodes ([049b701](049b70158035a2f448141b3673ed271c9c2866f9))
- Remove useStore from handle ([5c3a1fb](5c3a1fba1394eaf94ae2ed8642726a16fafb0631))
- Pass selected elements as prop to nodesselection ([1ea6e4f](1ea6e4f8da601bdb4bba9d53b60ec2346d2ec54b))
- Define emittable events for EdgeWrapper ([4932c64](4932c64d52375aa9ae6d32ffe40fda7630cdf7cc))
- Remove null types and use undefined ([b9bb3cf](b9bb3cfb1a64f7b8ff2059c4d50573c96e8af327))

## [0.1.0] - 2021-11-21

[d1e59ef](d1e59ef322be6732f830ac4c98fecb1c6dcf119f)...[a03f658](a03f6587941f1eaae429a492fb0298cddd5fd182)

### Bug Fixes

- Zoom values being initialized before zoom is ready ([71ba905](71ba9053480db8f49558412740d7dca70dd69f22))
- Add missing click and doubleclick events to nodes/edges ([c48a0a9](c48a0a9e2afef119193272cadd03613f0fab8470))
- Minimap prop type missing ([a67e6c4](a67e6c4430da799e5a97947c51db055a868d8e69))
- Skip dimensions check when ssr ([3e4433c](3e4433c175dc4db86675c2a177ecdd1679bf4fba))

### Features

- Offload parsing elements to worker ([d335944](d335944e564876741bc0b7b7b621196b619494b1))
- Add loading indicator slot and prop ([4e8ff62](4e8ff6201ad95a303df9417af51ac23df5c7de7b))
- Add dedicated default loading component ([668fed1](668fed1dc4b65b008df605417d74141dfab61a0d))
- Make worker optional ([e648e1a](e648e1a1796c644fe16b8488b349816d55df6e79))
- Add node and edge renderer slots ([da29a61](da29a613f0caec30d59b82f19680cafb5431e044))
- Add draghandle prop to node ([a55e33f](a55e33f91fa41448ba79feb10c9dff6880ab1d42))

### Refactor

- Remove elements prop, change EdgeTypes/NodeTypes prop to string[] ([39b21fa](39b21faa5b53e11d3aedf5721d8fc620b414f6f4))
- Rename internal data field to __vf ([0e9f8c5](0e9f8c5fc2d35edf2566bbadf4053908cdefe0d2))
- Change ConnectionLineComponentProps to ConnectionLineProps ([b102070](b10207021f9c3f72b30fa03ee136b687133c5679))

### Update

- Some comments ([0a1c2d4](0a1c2d4ede45f3b2181625527481aa386d5e5d7b))
- Correct __vf typing ([e4ead73](e4ead738c9fa252ce278d5273a055b2258c98b47))
- UseAttrs on edges to use style ([ba24f3c](ba24f3ca6243f857c34dc4ba1de89adb86dce4aa))
- Graphnode and node typing ([062aee4](062aee45b230114d6be9ee57c8c6746d6432d019))
- Move component related types to component-type file ([d24de0c](d24de0c0c2876c79f5c0f107899908002eb9f264))
- Add names to components ([fd71e1e](fd71e1e16e075d082c8e29f05a3884ee6a7c7325))
- Add hmr to statestore ([502be52](502be525729c03303adef76629db0cf77a3edc96))
- Add name to flow component ([f64ae24](f64ae24ee25e402d53bc9399bf698c198199448c))

## [0.0.34] - 2021-11-20

[f5f16b6](f5f16b6c43b250eb218544a5b8b18b600fdfc546)...[d1e59ef](d1e59ef322be6732f830ac4c98fecb1c6dcf119f)

### Bug Fixes

- Load hook timing ([68b7d99](68b7d99a9c348bf51aeba9605ab7fc3560cd4e4c))

### Update

- Dont render nodes, edges if dimensions dont return a truthy value ([2b87d53](2b87d53c10e354ce978efad33acb6f043fabcb17))
- Make types for nodes and edges a computed prop ([1b6ea1e](1b6ea1e1b5ac4155a93a7e16de32dbbfc152a098))

## [0.0.33] - 2021-11-20

[a4e3bf5](a4e3bf52c7b0c400bc6b29c1e0e9ae4edc8a89a5)...[f5f16b6](f5f16b6c43b250eb218544a5b8b18b600fdfc546)

### Bug Fixes

- Suspension not working properly ([d25fa57](d25fa579e463e2a2c3fd452d5d0c148e169cbca9))

## [0.0.32] - 2021-11-20

[c40e496](c40e4962e387ba268994da0b55f91f1220aa4639)...[a4e3bf5](a4e3bf52c7b0c400bc6b29c1e0e9ae4edc8a89a5)

### Bug Fixes

- OnLoad being triggered when elements aren't ready ([990126b](990126b2b9d8304d0386ae64529054ff374f9097))

## [0.0.31] - 2021-11-19

[52351c3](52351c38a5faa34eb7ba4d8ff7a64667cb2e2b90)...[c40e496](c40e4962e387ba268994da0b55f91f1220aa4639)

### Bug Fixes

- Flow not properly pre-loading state ([6a1571e](6a1571e6e30a0efffb89113626b9c701c13bfe43))

## [0.0.30] - 2021-11-19

[08b9afb](08b9afb502f88ed4d358571c904ff3a53b577f5c)...[52351c3](52351c38a5faa34eb7ba4d8ff7a64667cb2e2b90)

### Features

- Add NodeTypes and EdgeTypes ([37388dd](37388ddf471cee3bd7c11ab2ce0df2fe5f5a9321))
- Merge store with props ([6a68292](6a68292f7c4fc4e83f3689473f77c9a0e29cad98))

### Update

- A couple more perfomance related updates ([f92c546](f92c5462bf358174c5867b5885f27b1e739eab84))
- Rgb flow styles ([ee95fbe](ee95fbe34aca3fe7c13cb09540a8466eaaa7d46a))
- Move watcher to onMounted hook ([8c4747a](8c4747a8a9529b49d8b870c156f4a087426fa941))
- Remove hooks context ([921d93c](921d93c73e4a1de210559ea6f8bdc73c4587d3ba))

## [0.0.29] - 2021-11-19

[9c0e293](9c0e293d82bec37586213f0bb5032a63355ca323)...[08b9afb](08b9afb502f88ed4d358571c904ff3a53b577f5c)

### Update

- Add default null value to injections ([3f139df](3f139dffee7c0e50624949cd91eda53b520ce01e))

## [0.0.28] - 2021-11-19

[5e399a6](5e399a6cc15119daa1c94013bf55bdd91e72785d)...[9c0e293](9c0e293d82bec37586213f0bb5032a63355ca323)

### Bug Fixes

- Storage not properly preloading ([b91d65f](b91d65fd3ac16a6e09bf2cf99e0ef6af1d67fa54))

### Features

- V-model for elements ([e93da64](e93da64c70c83b94c692e44b4d2887f59c780355))
- Add instance to store ([054e71a](054e71a6093013e2e261c81861317fd9e1c72691))

### Update

- Merge props with state objects ([48da1ec](48da1eccba8ed6d1e89fd3c9b3c595afbb716dcf))
- Use vmodel for custom node ([f99dca1](f99dca1c11b98555a1c8c253ff95ad5c1bd37e24))

## [0.0.27] - 2021-11-19

[95550b3](95550b3c1f0994ea1b01061cf872f150139a5f34)...[5e399a6](5e399a6cc15119daa1c94013bf55bdd91e72785d)

### Bug Fixes

- V-model implemented again ([f534572](f534572cef3e6759313e16d56e4d47958e30e94a))

## [0.0.26] - 2021-11-19

[de93473](de934732c1aff9349db2fae626cf0d2a2bc3eade)...[95550b3](95550b3c1f0994ea1b01061cf872f150139a5f34)

### Bug Fixes

- Props and composable not merging together properly ([70b077a](70b077a1f59891cccf796d2b53db9055ea351f41))

### Features

- Export default edge and node types object ([8605909](8605909f5d56127ae608ed655806ff467cbc7682))

### Update

- Add return type to useVueFlow default export ([c8d3ff6](c8d3ff6a29993f0823cd0974c0ad68bcbf8affaf))

## [0.0.25] - 2021-11-18

[0cca54e](0cca54e7e2d50ca6fdeda1072e876908f104067e)...[de93473](de934732c1aff9349db2fae626cf0d2a2bc3eade)

### Features

- Add hooks to store ([99dbd4b](99dbd4b2cc03c33912e138d826afd326be81b012))

### Update

- Remove useHooks usage ([470ab37](470ab3782afde2a040fbcd8415a59a0194071037))

## [0.0.24] - 2021-11-18

[e98be05](e98be05d417864e157c5fd79087e2247166d1597)...[0cca54e](0cca54e7e2d50ca6fdeda1072e876908f104067e)

### Features

- Add useVueFlow composable ([a493168](a493168daf88e7488e668a9b5fedfdeaee37d4ab))

### Update

- Mini map to accept node slot instead of "nodes" slot ([3e24a35](3e24a3585a33e1497927381c042bc0fcb369303f))

## [0.0.23] - 2021-11-18

[b2d124e](b2d124ef7ac15a4cce911ce77f8e9a4082341803)...[e98be05](e98be05d417864e157c5fd79087e2247166d1597)

### Bug Fixes

- Default value for label ([6bcd708](6bcd708234b70cb921b1ef1d58fbf1285b2fc5f5))

### Features

- Bind props to slots ([0be492b](0be492b7c60c89c0a5131929e885456510977e13))
- Add zoom-pane slot ([54dfd84](54dfd8498b04d4c06ee9dd6a799454f1b7d3f152))
- Add suspensions to node, noderenderer and around zoom-pane ([14980e3](14980e38b71b6b37657562ee38bdffbbc6b14a60))

### Miscellaneous Tasks

- Update deps ([156287b](156287b9d26ab075ca92c00de8d518737e1673b8))

### Update

- Clamp transform values ([60327c4](60327c4ca05e92157d06812b7b6f8e8decd52792))
- Remove watcher and use until ([90a2a65](90a2a6544d8762061ac19ec4a68c06c61dabcdb0))

## [0.0.22] - 2021-11-18

[6353f15](6353f156b9c1d9d6c850a8997cea60c15ca00cf1)...[b2d124e](b2d124ef7ac15a4cce911ce77f8e9a4082341803)

### Bug Fixes

- Event propagation from zoom ([b918eb6](b918eb6b89d079f0eb1c0be038c93414599786cb))

## [0.0.21] - 2021-11-18

[f22a3ba](f22a3baa900c1ea6ff95618f58b9b6b641a164cb)...[6353f15](6353f156b9c1d9d6c850a8997cea60c15ca00cf1)

### Features

- Add slots to edges and nodes ([8b82c4f](8b82c4fb33c2edb75c249c4c4148200e68a7dc0f))

## [0.0.20] - 2021-11-18

[0373436](03734364a01f475f16846dfd63642d8d7713d0d5)...[f22a3ba](f22a3baa900c1ea6ff95618f58b9b6b641a164cb)

### Bug Fixes

- Move slots outside of zoom pane ([812a7da](812a7da2febf424c59d4b86ec8265d70177dd5b6))

### Miscellaneous Tasks

- Update revue-draggable to v0.3.4 ([1deb417](1deb41766b3dcd647b09197207348cce31330da0))

### Update

- Quickstart example in README.md ([091ed3e](091ed3eeb41127e1364756e21758e969f439cdab))

## [0.0.19] - 2021-11-17

[e9b3265](e9b3265c351a8ce4cf970f84d722b3ed9f215d3a)...[0373436](03734364a01f475f16846dfd63642d8d7713d0d5)

### Revert

- Inject necessary styles directly to bundle ([872ad1d](872ad1d05b457342651cc974c1228bff8d5306fd))

### Update

- Invoke until func in zoom pane ([43ce523](43ce52347c69ff7fb2cad98b3510cdc175b5098e))

## [0.0.18] - 2021-11-17

[7b9ca28](7b9ca28505dc62e8612997545ca38c396ae0052c)...[e9b3265](e9b3265c351a8ce4cf970f84d722b3ed9f215d3a)

### Features

- Add suspension to zoom pane ([954722a](954722aac26bc685831d94c90324a6043b51c66c))

### Update

- README.md ([68e44ad](68e44adea6589b9b2280c521a32a0ae96d1cb3df))

## [0.0.17] - 2021-11-17

[c7f735d](c7f735d9335d9d3ec3928bb287585266d727a10c)...[7b9ca28](7b9ca28505dc62e8612997545ca38c396ae0052c)

### Features

- Inject necessary styles directly to bundle ([074d284](074d284a8e9d82c71013d230861e02979ea541cb))

### Update

- Change docs url ([688c095](688c0954e4b45c4a0e8cb6ac30d3eb15c86dc576))

## [0.0.16] - 2021-11-17

[a21238f](a21238f9aa3e55605e6ba6fd86dae32387a1d320)...[c7f735d](c7f735d9335d9d3ec3928bb287585266d727a10c)

### Update

- Create vue.d.ts files ([10215b4](10215b4631cbb767f7c0eded0d461496a4009d95))

## [0.0.15] - 2021-11-16

[e05e546](e05e5466713400a6cab18c6ac509ed567fd2899d)...[a21238f](a21238f9aa3e55605e6ba6fd86dae32387a1d320)

### Bug Fixes

- Properly check if node is connectable/draggable/connectable ([677c9a8](677c9a8b5e8a480e80cea02bd825f3aaad6a0b70))

### Update

- README.md ([6b4cb9e](6b4cb9e9372d50939b3b2921255c1fcad1b8aea7))
- Hide edges with v-show instead of v-if ([23ad66d](23ad66dd7597d888d573225764122902b42ffb77))

## [0.0.14] - 2021-11-16

[3b4e164](3b4e1645117a5abb075f56f7b5c2bbd1de6c6dfb)...[e05e546](e05e5466713400a6cab18c6ac509ed567fd2899d)

### Bug Fixes

- Node dimensions not updating properly ([694dc7e](694dc7e69191dd64878c881824594db7bb246bcb))

## [0.0.13] - 2021-11-16

[0bde39f](0bde39fa40f3c07ad6134ca076474ee1d0126065)...[3b4e164](3b4e1645117a5abb075f56f7b5c2bbd1de6c6dfb)

### Bug Fixes

- Remove force-update from node ([808c6b1](808c6b17e017ef5319bc348f207359ee56a04092))
- Pass props to store state ([9b604e7](9b604e7628b639bcfd586d1a3bc9fdb97a2a5210))

### Update

- Count store id gradually up instead of "randomizing" one ([93730a7](93730a7b98749f021083be6b9d72dde26123eda9))

## [0.0.12] - 2021-11-16

[2d730cf](2d730cf3fef1a2dfffa9b7f4d8e8e80274d12821)...[0bde39f](0bde39fa40f3c07ad6134ca076474ee1d0126065)

### Update

- Export default nodes and edges ([e1e656c](e1e656ccf27ce2e217738f2b0ec38ed63d058283))

## [0.0.11] - 2021-11-16

[fc19dde](fc19ddec46da1424e40244c83c3f63668875ae73)...[2d730cf](2d730cf3fef1a2dfffa9b7f4d8e8e80274d12821)

### Bug Fixes

- Remove sourceX/Y, targetX/Y attributes from edge type ([6c2bdcd](6c2bdcdae64d446f3adb8a051473395eced98500))

## [0.0.10] - 2021-11-16

[525a188](525a1880b646fedb1bf3db030653a73108b76a6e)...[fc19dde](fc19ddec46da1424e40244c83c3f63668875ae73)

### Update

- Merge EdgeProps into Edge type ([413c7ac](413c7ac6888319f25a7a31f164446aeb99d10ccb))

## [0.0.9] - 2021-11-16

[a092185](a0921859ce613a7b9669d68d7556481c07708e9d)...[525a188](525a1880b646fedb1bf3db030653a73108b76a6e)

### Bug Fixes

- Disable inherting attrs on nodes/edges to avoid warnings ([a58d952](a58d952e9fca3ee54717d1a4b6f6c647dc469b7b))

### Update

- README.md ([63f710e](63f710e42225ae1076b34bd76e09ab111128cbb4))

## [0.0.8] - 2021-11-16

[e560cdd](e560cdd257a99d909d6e69ef48431e42e3f153a6)...[a092185](a0921859ce613a7b9669d68d7556481c07708e9d)

### Bug Fixes

- Missing script lang in README.md ([b077241](b077241625aed47eb04c25f4955047c29dce2c70))
- Cancel keypress for input dom nodes ([4fb55ab](4fb55aba6805c56a759a91468705e31f33cdd1ba))

## [0.0.7] - 2021-11-16

[b8c8142](b8c8142dc4e4c2a9b46162b9ccb7f39f9f64ed9f)...[e560cdd](e560cdd257a99d909d6e69ef48431e42e3f153a6)

### Bug Fixes

- Todo in useHandle ([490983b](490983bebe1dfc7d55e7c8ed0d9f7f4008d74371))
- Type in usehooks ([476a5aa](476a5aa09bb04dd9eed5126c67d0a1f47db0bcc5))

### Update

- Remove update node internals composable ([7c66cf5](7c66cf5d9b08865712cf6cee1de3ea2fe9fdba7f))
- Remove js files after declaration generation ([8414ee1](8414ee1ac1c5cfbc12adcf99688b2ebb15dacbb0))

## [0.0.6] - 2021-11-16

[d9e3104](d9e310403cfe95a39696f8d8f332f018a305f77c)...[b8c8142](b8c8142dc4e4c2a9b46162b9ccb7f39f9f64ed9f)

### Features

- Extend options to pass custom nodes / edges ([d1dab4c](d1dab4cda8b2cee06d8b80545b0196c2514b5b87))

## [0.0.5] - 2021-11-16

[814212e](814212e369be12deb3c52aa02a0151d097f4d592)...[d9e3104](d9e310403cfe95a39696f8d8f332f018a305f77c)

### Update

- README.md ([7c72507](7c72507234cd9dcb2a62aff341c8bdc69318fb86))
- Transform d.ts file paths to resolve correctly ([65b73d3](65b73d3f7b401843da9038579db8f688f04c97b1))

## [0.0.4] - 2021-11-15

[eeb6047](eeb604715fb677d352bcc613011b7881c8c9131e)...[814212e](814212e369be12deb3c52aa02a0151d097f4d592)

### Update

- Remove umd build ([30d667b](30d667bf83d21bc0da911e84734ab6b6f702af40))

## [0.0.3] - 2021-11-15

[9dc8c09](9dc8c09ebec9270e377b102d67dcfd72de9f3d8b)...[eeb6047](eeb604715fb677d352bcc613011b7881c8c9131e)

### Update

- Switch to umd build ([b5e56f8](b5e56f85bda01fa568b3b2d09e5d886883696b39))

## [0.0.2] - 2021-11-15

[4d7712f](4d7712fdb2b6c91c0c78cdf10c877cd1fc5c1143)...[9dc8c09](9dc8c09ebec9270e377b102d67dcfd72de9f3d8b)

### Bug Fixes

- Proper events for listeners ([482a1aa](482a1aa4af92233860807a7ae3f1ca53afadc8ef))
- Warnings when NaN values are passed to svg transformations ([9c3eeef](9c3eeef5eb09eb680b16b086b37e453171bca55b))
- Wrong watch source in nodes ([d6ee5f8](d6ee5f886873a0c3a84636ff3c295a17e537e774))

### Refactor

- Perfomance optimisations through less dependency tracking ([3705a39](3705a39fa80ebf36c5968d2c60816e20b62cd863))

### Update

- Hide edge if source/target pos are NaN-ish ([dec2774](dec2774145a1d449491c9f59772b7fd26b7e0e45))
- Remove docs dir ([98d7053](98d70539510576e2207bb06af91287a972122a93))
- Rename Flow container to VueFlow ([ffdadda](ffdadda0510a7ce3bc11065ba0cb2311c1350b5c))
- README.md ([0a55693](0a55693fb1e165b161163979a673cefcdb12243f))

## [0.0.1] - 2021-11-06

[087eb52](087eb52f1f2b0e6f5e04ded80db0677a5e6b660f)...[4d7712f](4d7712fdb2b6c91c0c78cdf10c877cd1fc5c1143)

### Bug Fixes

- Node selection rect not properly rendering on key press and mousemove ([61ab006](61ab006e94c5e1fcec8a591ec05e0de727128c44))
- Node selection rect not dragging correctly ([dfd9e96](dfd9e963565b4a276d078562d59fb7497472cc9c))
- Typos in README.md ([51b120b](51b120bd764025009982fd0f99a405135674ea22))
- Remove DraggableEvent type from utils file (doesn't exist anymore) ([e77797a](e77797acc74cf38334465617a94a4cba033d9c11))
- No use of fragments for nodes as it results in warning from vue and we got enough of those as is ([7c7c31b](7c7c31b46f2e67f77210c0dd33718081e1c3d301))
- Inject store instance components ([b4fcab4](b4fcab40047aa205d7d5ee70feeabebc899cc4bd))
- Types ([1a7f3da](1a7f3da0b6b55d6c3fa1057bb07ff8bb26e47f89))
- Scale being incorrect when passed to draggable causing weirdly fast drags ([86ead92](86ead92839b1c41ce47817735c6baed3f1a9c7b2))
- Custom nodes not getting styled properly ([83216f8](83216f8ece0ad0d16114e001a1601d1156fed041))
- Typecast edges and nodes ([3b5857f](3b5857febbc6a2b4fdea0033a2d8fef64d575410))
- Copy preloadedstate object for pinia to avoid using an existing state when re-creating store ([6347cf9](6347cf97cb7f2502e7c4e489d344823c7628151d))
- Return render function ([e2162c9](e2162c95a89db01510b8f9334d1c6b1bcd9cacc6))
- Edges not updating text ([16e93af](16e93af184fcc3c295eb6b5abeca7e14efa415a5))
- Default position for handle on output node ([05c111e](05c111e5dff6d91c8b9fd64e9d42d7b927044bcb))
- Custom node positions ([e7513b8](e7513b898c04ae80343475236942b6493f030e71))
- Custom edges not displayed correctly ([9e397e6](9e397e68174432bc1409ad9ab216912d73d24da8))
- Marker arrowheads not displayed ([adb5ec5](adb5ec544dcafd10438324437f3e934019fca40d))
- Add intrinsicattributes to shims ([545eb0e](545eb0ede7d2b7bfdeef0500c0e5cf72d7e86bfb))
- Rollup bundling css in d.ts file ([9e76d07](9e76d0763642995c5e77cfd25664904770a272b1))
- Version ([af87f08](af87f08c6f80ddde589ee840cf20cb59643c80db))
- Shims-tsx.d.ts having duplicate string identifier? whatever that error meant... ([3cd0693](3cd0693b93c9caae0c556822d65d8665120b4a82))
- Header showing an empty option ([15f968c](15f968c6078f72cf606b6f234d142b1d74d60d77))
- Connection line not working properly (regression) ([9d8b49e](9d8b49eeb1823a5e3dec4262c1f6aadf4adbe3a9))
- Add measurment (px) to EdgeText width and height ([3f6d499](3f6d49914fb48df27db5e7898b859219cf976110))
- Edge updating too much ([ece1fec](ece1fecbf887f75942cfa4b6e697524811187b9b))
- Return transform from useZoom ([9b2f4b7](9b2f4b74061a152a8e414d6d25dfdf0f8fa524ed))
- Minimap ([6b4e7ab](6b4e7ab3ceefeb16c4f43c5560e66d975a61a8a1))
- Zoom pan helper ([c3fb3cd](c3fb3cd10a25575eee2db813fb683ba880cee7fe))
- Correct event listeners in examples ([fede792](fede792a37d4b329eb22e4489f664c875e9fe517))
- Too many re-render on edges and nodes ([17f2517](17f2517ab4cdfc4399ab0d5ca574b8fc890bba4a))
- Clamp transform values ([b3d276b](b3d276bfb85e5c8dee641ef02e32fcda8083d6f0))
- Edge anchor ([7ecbcba](7ecbcba7eb250c713682516c9450b4a356aac142))
- Edges and edge anchors not re-calculating correctly ([61dc9de](61dc9dea3318d71e06e90879e01cd23c65615040))
- Nodes as fragments ([64a4b8c](64a4b8c41805185fcef683fa5f33b0968651b002))
- Label type in edges ([ff7ee5c](ff7ee5c7fe08b9e94cf9f3104ff21c0132bed370))
- Store actions blocking main thread ([5f500bc](5f500bca184f02b5ca973346fda28352f441a5bf))
- Nodeposdiff not updating correctly on node selection ([c062601](c06260187430c5de3648c5a888f94552003eb36e))
- Zoom pan helper not being initialized timely ([ca2901b](ca2901bc01ab96b04df9f88429bf646c16a72338))
- Valid connection func in handle ([e11fddf](e11fddf70ad8e6a9b6536b7a9d680b93ea6b1a3c))
- Node type change not triggering recalculation of node dimensions ([cd02dd0](cd02dd0444421346bf844b477876e326f488cf52))
- Node not updating handlebounds when handle pos changes ([26b3901](26b3901bd5fcde8c168a7bef1e189736f93765d4))
- Edge updates not triggering properly ([3ee3843](3ee3843af613ef235c216cc1d40097399010f1c7))
- Missing bgcolor in background ([ee07aff](ee07affa89b879ac93cb5535369dd78218d94f9c))
- Missing node id in node components/slots ([cb96b1a](cb96b1ab009c748149672a5e68551e4a41f0a848))
- Typings ([6ec8258](6ec8258f33c37f6816f2e8f44827496bdc1f21b1))
- Dedupe and add alias for vue ([3931a59](3931a59524e6422a7c795e258739648957bf27eb))
- Zoom pane not scaling ([a8f7cc2](a8f7cc2389d76e67f7b29cc4a270563d3dc43f4e))
- Custom node example not fitting view ([5437d48](5437d48325979f359f3bb52cc8bb35618a72c237))
- Draggable not updating on nodes ([ea7db92](ea7db92b6e99876efd56e265ed9795f099e07749))

### Features

- Add custom edge example ([2188c5d](2188c5d3d300599602fb197d56d1fe2069af2e1d))
- Add edge with button example ([74a2a3d](74a2a3d8c3548423fec900acc97108fe05e895dd))
- Add edge types example (stress tests) ([384c052](384c05240f969ad6af407161cb401305f26cef0f))
- Add empty canvas example ([489e12a](489e12a8a74a7b3c91f4d7f4663e9fbe14fc28c7))
- Add hidden example ([e4a0940](e4a094017d09360bdd88ac389270b81ca36c2ae4))
- Add interaction demo ([23c5d24](23c5d2415c7c8ace462db0a4529f9f70aeb1c8f4))
- Add cb to useKeyPress ([5ed1094](5ed1094dfe92ffe7d904d7e3fbb537abe4716474))
- Script setup style ([9307c90](9307c9066a955ae7cc7041f44a8112bcf0314e58))
- Script setup style ([f8728f0](f8728f0d6e8b764a61ec7aeee4e12343ed3c1080))
- Scope edge and node slots by name ([8c54dae](8c54daedc00d651e2cdd14c7b02340a9910fa04d))
- Add useStore and useHooks composables that provide default store/hooks ([b2b1fe8](b2b1fe822f19ad537796a4ccac0ca0a6986beb9e))
- Use v-html for node labels ([636eeff](636eeff9fe752c79cf987ff70bb3ca7e5bf151be))
- Add node/edge types id ([0a45e09](0a45e09c325128146d2d9ccd100b61f9a468cffc))
- Initial commit for docs in nuxt 3 ([64df75d](64df75d405805e6dd8a39459806773b70f704589))
- Add path alias for src ([aaf5f60](aaf5f608f5ec74e69c324cec5a3fb016840e6ce9))
- Copy default theme css file separately to dist ([066155b](066155b9f74586c9e28f31d9941ea2bf8631c574))
- Add docs index page ([9f329c8](9f329c88022c6d78f34a1633d782004744d96c57))

### Miscellaneous Tasks

- Remove some logs ([8cfbc89](8cfbc89d23588c381b93c343cc51f86f8a016685))
- Update revue-draggable to latest version ([7eb7cb1](7eb7cb1dc37c4ba59e50f56f38f774a3ad6fc422))
- Add vueuse/core to deps ([ef9647c](ef9647ceb4fa460bf7373aa8d47d666474438f31))
- Remove rollup-plugin-vue ([e5d8338](e5d8338b3299b38c1bf5650eb2c7230d9585cd94))
- Update vueuse to 6.0.0 ([908e741](908e7413991c444936cf17501b9d930c80280bdc))
- Update eslint rules ([77eac0c](77eac0c12a11eb791d037931a9b5428c14db6ff3))
- Use pnpm instead of yarn ([769378a](769378a2ea829cc5c042a3a3e6b5cdd6e9449b11))
- Remove unused deps ([6cfe5f6](6cfe5f6d4348266ab4700a6c3873bc5bf6975842))
- Update draggable ([e9392b1](e9392b13c5cb9f1eae81ef66781f5101a49902ed))
- Downgrade draggale to 0.2.5 due to transformation issue with current version ([9532615](9532615cfd913700cb04ca55d05281b2dbdec56a))

### Refactor

- Remove passing props to reactive obj instead use props directly again (sort of breaks reactivity in some cases...) ([528f8f4](528f8f4420c93d467a6b01ed55c45c7b834ed69c))
- Refactor some jsx files to vue files ([ffd41fb](ffd41fb679aed72c2465506ae2b3a8ad38fdb610))
- Resize handler and zoom pan helper to watch until refs are resolved ([a6f7678](a6f7678c0f2930c82b7d9eb57ff1359c8226f674))
- Back to jsx 🥇 ([1d542ab](1d542aba65763afad22e1e7ed28254ba8eb74e79))
- Split types into separate files ([3557284](3557284a404df9fa66c5fb61f25621e5191a52f6))
- Update usekeypress functions ([fec2ef4](fec2ef40da36dbb9b15a9dd910d7a8ee05c600de))

### Update

- Remove wrapEdge and wrapNode files ([25c92ec](25c92ecd8437cf0272ab6fb970bdc5825d4bb5d5))
- Edge label bg true by default ([6b9c608](6b9c6083815a3fc113922d03246d4728735a9490))
- Redirect to basic example as default ([6912993](6912993ebd67323bb7f7e786be62657d61b29659))
- Button edge example to remove edge on click ([156b312](156b3123366b86ff4b14bf8850850c344a211dbb))
- Rollup config ([2653c70](2653c70334e239ad40bb0364cc00e8f2c9da998d))
- Remove effect watcher from zoom pane ([8d8a4a3](8d8a4a3d1e16dbb5a6f391d6c8e3bb23e4f74baf))
- Add effect scope to useZoomPanHelper.ts ([b8ce50a](b8ce50ae3e770dcf400df7d44759a8837c839eec))
- Add key to node ([22a1dc6](22a1dc6716202c552a337f6ba7ceec9a4e53673a))
- Add measurment (px) to nodes width and font size ([e0bc7e2](e0bc7e2c9695d5bb0877bbe3bd9b0c175961e95e))
- Color prop optional in MarkerDefinitions ([d6a8ed6](d6a8ed6be504aefa97200caf10bcd1173057b707))
- Pass selection key code to zoom pane ([347f1ed](347f1edc3240916c27de73ff9931fddad55b1427))
- Fix node perfomance ([f6f7564](f6f75648948929955f1b6011931b863e83f0e5cf))
- Refactor remaining files to script setup style ([560bdc2](560bdc203be8876b00f18fbb4d56a512c2b8fc89))
- Refactor additional-components ([1ff3a8d](1ff3a8dc9c1926d59858b16ebc5eee603d355d7e))
- Add unplugin-components ([a5ae6a4](a5ae6a4e4850b10871813f2c661c9c75b51ae939))
- Fix examples ([29c6df1](29c6df17551658333667825db0efba026869308e))
- Add slots to Background.vue, Controls.vue and MiniMap.vue ([1853c21](1853c21353946386ccf08e658c5d115c84182049))
- Add injection keys ([a895853](a895853b6449c8c0076710942d2645170ca4a2b6))
- Disable vue-tsc for now ([9373533](9373533e0eeb46abc20f0b0b858a5c7116e3396e))
- Remove render tracking hooks ([cfc8f77](cfc8f7782fbe627a7c23ba6b11bee23e8e323697))
- Add slots to CustomConnectionLine.vue, Edge.vue, Node.vue ([9d9a90e](9d9a90e9a71d9d79a5e5b37251f73718a8328a45))
- Change name to vue flow ([2bfecf7](2bfecf7148418bccf39509b0348ec105d2642eaf))
- Replace vue version when rolling bundle ([31c896e](31c896edb5c420bcf811e0da14453d17e6daee39))
- Types ([77d2e01](77d2e01fc0dea8795c8eeec6c13ef8eca21489ca))
- Remove babel (no jsx used anymore) ([5d3845b](5d3845b91cf49b7bebc4edaae037017ddef22eab))
- Background properties ([24316e1](24316e13869cf1dbacbc77098e50fcb538178b22))
- Add validConnectFunc as prop to handle ([0e79718](0e797187205de728c8a4f611c2490dec3f0aa4fc))
- Remove nodes selection props ([6d197d7](6d197d7f2a2effbdd1a96fb220bd7a5e9ddf85f4))
- Add layouting example ([712cf3e](712cf3ef660eabe11b4e072c52db7236c0e2269e))
- Add multi flows example ([0a9c1b0](0a9c1b07172ce254119e0fe25efe65f4e40d9b9d))
- Remove "hack" from layouting example ([a9f1876](a9f187697ad2d9c8340ae7d431e04bf0256a8804))
- Fix names ([20e9d1d](20e9d1d39669bf1cc6ceb08428fe8254b549b6d8))
- Add Provider example ([eb9714b](eb9714b89837fc0b26e262775bc870eb99a057d8))
- Add Save & Restore example ([3f863ef](3f863ef71c1c9d00eb59990127a3c5c6b49ea962))
- Disable no-console rule ([89efc0b](89efc0b7e40ef2ef56dfebfb66b720d413f71773))
- Add stress example ([5611f79](5611f79ea8d065bcde91d2c141a9a0792311f9b6))
- Add switch example ([c23bbfa](c23bbfaa4a8d048d9702fb71160988d1afcc67c6))
- Add Unidirectional and updatable edge example ([0cc7ef4](0cc7ef48052c57973b45ca936011a925993b1674))
- Add update node example ([cd32f14](cd32f14a5a5093e755af05d026250bad9391561f))
- Flow instance provides update node internals func ([babcbd0](babcbd0e1ff68cf57d7c44390cf62e0aa33811c6))
- Add validation and zoom pan helper example ([8779a58](8779a58babffdf945142779012423247a3365678))
- Remove rollup and use vite to build lib ([6177963](61779638acd7c9bea6a2e92e7123eab49332a952))
- Add all examples ([e99dfc3](e99dfc3dd28d59a4413d7f7ee4989cde271334eb))
- Use yarn instead of pnpm ([c21ad94](c21ad948c8bdef142d64dda9d90a19c4ce7713d1))
- Disable ssr ([67876cd](67876cdd1b6f913b55c248bd65e9e5d236d93d9a))
- Fix view height ([ae0772b](ae0772b6d4e89c24ae75d35ae16d08994e2fd8d6))
- Remove `examples-app` dir ([27c72e0](27c72e0022dcac3a54c53e4c904eaf1888d346f8))
- Styling of sidebar and header ([412a84a](412a84a898ec9cb6921e90a464095ffb4d670ca0))
- README.md ([1b0602d](1b0602dcce420a3e0dc6ad5ae7e36e731b836b7d))

## [0.0.37] - 2021-07-15

[041fe11](041fe114ef3218132775b4360978df94e31170c4)...[087eb52](087eb52f1f2b0e6f5e04ded80db0677a5e6b660f)

### Bug Fixes

- Create store instance for every revue flow instance ([ec45cd7](ec45cd74e972bd106f4794f5629b9fe2d549049e))
- User selection ([2f93c91](2f93c917e0b2f929a7bc8dfe0e0c959256abfb22))

### Features

- Add revue-draggable ([f5580b6](f5580b6d96cc98a0ba461b1ce17342f163afc3e1))
- Add drag n drop example ([9b78c0f](9b78c0f5d229e3e8f7875cfb145a53a41459abe0))

### Refactor

- Use injected store so we can use a distinct instance not a global one ([6c9d88b](6c9d88b09ddcce9930ff08a430b554e36c00e4c7))

### Update

- README.md ([2afc7af](2afc7af8716ab9aa3647cfe508aacc4cb2361416))
- Renaming stuff from react flow to revue flow ([d491c01](d491c0196c7b2ac98ed845f95302414261016bec))
- README.md ([3f126f0](3f126f085ec85d356ca06da9fff89cf36560ebe7))
- Base page to basic (no overview currently) ([8f727a4](8f727a4d93025d131b55cff35824dfdd63dd3150))
- Use store injection in UserSelection component ([c7fda83](c7fda830a6383d2cefa9c7fb8d496617fd665154))

## [0.0.36] - 2021-07-10

[4d52af0](4d52af09fa37f7eb691846f94b63255c2e03afe2)...[041fe11](041fe114ef3218132775b4360978df94e31170c4)

### Features

- Create examples directory and add some examples ([e4f57c7](e4f57c79e851adf4b06e2c5abbb0c9ffdd38afa9))

## [0.0.35] - 2021-07-10

### Bug Fixes

- Try to deploy as package... ([99548a0](99548a0dba01e3890d0852f5ce8249592568b3df))
- Entry ([07721e9](07721e9b75e1daf1d75ece276ea6b94773768941))
- Add vue-demi to external deps in vite.config.ts ([f1ee5b6](f1ee5b61a205c9f046c3582c205c3075f217c44d))
- Add vue-demi to external deps in vite.config.ts ([b9b2615](b9b261578616b61ea838163fff849e7015a1bcf4))
- Some prop type issues ([303444f](303444f74d0bca293040a65dc5132d46cb89c9a5))
- Proptype ([6a6c5c9](6a6c5c9ee1310c15fd086ad1ce59a145682c119c))
- Some bundle stuff ([f685c7a](f685c7a20a081e18c1ba0b7b89852cfc26ec0e76))

### Features

- Transform react-flow to vue-jsx ([52e1188](52e1188d043f1453b67725a46735916214351590))
- Make edges work ([b2c250e](b2c250ef38e8188b132d043c4897a405622bb759))
- Add postcss config and deps ([8f34d9d](8f34d9d4862999135d23788324b556c0c0af2308))
- Show connection lines when holding down on handle ([ea98c2a](ea98c2afa1740456cafe10ff6f373bc9f27ab295))
- Update graph on new elements pushed ([1253403](125340341db5084c887453c9d12dcfaa2bed08a1))
- Implement MiniMap, Background and Controls components ([4319e2a](4319e2ac4987734ab99d3e337e69149b624cf285))
- Add np ([5c15967](5c159671ea00dfca58f581923d88e16c9f388db2))
- Add siroc config ([3094cc2](3094cc211d3c6b055e8e6fd21f1eba0283e6acb2))
- Plugin config ([753f707](753f7070c7917d46094a80715a22924cefa06b38))

### Bugfix

- Controls not having correct zoom helper functions ([3a8dde7](3a8dde7cbde5224cfb5fd869c0453b547f3d8d8d))
- Background not scaling ([cf20f78](cf20f784d43ca35466b0f3ad9c439a7914b312aa))
- Types file ([bf95b23](bf95b23a7fdc471b987a343566c8bca05084bcc0))
- Utils file ([c977946](c9779467a306f038031043564cf6bcd61e179e87))
- Utils file ([e400b48](e400b48e9c6dda7fd1c75fb397919c66b3c09299))
- Pinia instance not created internally and thus missing from app if not explicitly included ([c8150a2](c8150a252f5331b713374bcc2cfd3672a2e992e0))

### Update

- Gitignore ([e543bd5](e543bd500588212e26c5efdbfd0e5636eb40a8d6))
- Revue-flow index.tsx ([b6d9265](b6d92653174ff92ef22cdb054bc12996a8f879d9))
- Remove siroc and use rollup directly ([179b5c5](179b5c5d4df8627ed5ce41909ca7001c4bae066e))
- Add lint script to package.json ([65332cf](65332cfde36a1d9c3044317d1e4bd680b0613869))
- Rollup.config.js ([b43623c](b43623ce672a5a429c09fca0faa5e563f95cde7e))
- README.md ([0603a12](0603a12ee0603b73d1b46badd60644aad0351e25))
- Deps ([0c449c9](0c449c9274bbf5de3d6b76f45a30b8ae8107fa1b))
- Remove vue-demi ([59b6af3](59b6af384cc76a1b6c59ad51d977d90ab4ac4847))
- Main ([d934782](d934782cb8c85cb305657e615b7e52f8bf4d3115))
- Use vue-demi again to add compatability to vue2 ([92caccf](92caccfd6e4caa69c740005b974663fbe8f9abbf))
- More changes to bundle config... ([a364c78](a364c78c7cb7afcc7eccbfe6e027f6c78cc6984b))
- More changes to bundle config... ([082d460](082d460e12715543545c3f71a23a923e4dc9760f))
- More changes to bundle config... ([6f39ae6](6f39ae6de862f3d97b0d26c378197e1c00b7f424))
- More changes to bundle config... ([95cbf10](95cbf10dd079dc4aaee898230dfc774351be2ed6))
- Deps ([61adf3b](61adf3b47d85b7e3e737e5d454961869a582394d))
- Rollup.config.js ([ed64e46](ed64e466e72c569bf4ff2f16a5c6f8ebdf66b046))
- Even more bundle stuff ([7d78ac6](7d78ac61fcbf5710d19a2b4f4483e8daafafaab9))
- More bundle stuff ([4d2dfa1](4d2dfa14df99d1fdc5c41fc6e6d6e27d63c9983e))
- More bundle stuff ([e2deded](e2deded187b4b292fac79c3ef315073e203d0844))
- More bundle stuff ([adc22c6](adc22c6212733c4470e2c71d14ca0367662031be))
- More bundle stuff ([f2f263d](f2f263d8336e1cbeb0a2cb5bb1e1d239289346b5))
- More bundle stuff ([e9db1cd](e9db1cd641064256e16b6ca3cc1d2f2651f8edff))
- No vue-2 compatability (doesn't work with current build) ([150438d](150438d08fd12129c6df398eb022fe5660011489))
- No vue-2 compatability (doesn't work with current build) ([d50d745](d50d74598b3bf5ac80200e9e0bc382d4852f77e0))
- README.md ([fde7ca6](fde7ca665318cac9a1051b2974d4433e4566cea7))
- README.md ([4661b68](4661b685adad568bfd0241c80e1f8a2629f75c45))
- Renaming stuff from react to "revue" ([881655d](881655d4831ca36ae49852d4e75dd28cd7013419))

<!-- generated by git-cliff -->
