# Changelog

All notable changes to this project will be documented in this file.

## [0.4.39] - 2022-09-12

[ff51560](ff5156042781468d564da8f1822aa33e040f8f29)...[f7c18df](f7c18df48a2339e75c32510c34bdc8f900009e8f)

### Bug Fixes

- Skip applying node extent on mount ([018d711](018d711fc6364b060d52cf08bb074dc07e53f185))

### Features

- Save frame data of node ([c222bb9](c222bb9de55255e399fed0100137f1a0cf02f1ef))
- Updated smoothstep edge routing ([c113d3b](c113d3bd153e88e1cbb29b3732d9402ce835d6cc))

### Miscellaneous Tasks

- Update CHANGELOG.md ([0bf2243](0bf2243d97f2607b8f952b88993d181d9ce75903))
- Bump version ([3f4e071](3f4e071bbfd4263d512ed1e7d01117f58eebc191))
- Update demo ([59bd009](59bd0090cda3298b99a2a3b5276a63f6ce1f9831))
- Bump version ([f7c18df](f7c18df48a2339e75c32510c34bdc8f900009e8f))

## [0.4.38] - 2022-08-30

[3e398d4](3e398d451a6ab43b9347b7f7e4954e76dc8c5060)...[ff51560](ff5156042781468d564da8f1822aa33e040f8f29)

### Bug Fixes

- Watch translate extent separately ([a204f86](a204f861b7c22ead75ca66830769ffff29976164))
- Cast watchable props to ref ([9440d4f](9440d4fe856379531e288c68074d5b52abf3c692))
- Apply global node extent when changed ([e8a6dc3](e8a6dc37af76a10cfdf059a188cffd1a09c9622f))
- Add missing `updateNodeInternals` event ([487c287](487c287090ed48597a9c375345a1a3bb8ba75803))
- Apply initial node extent ([058fb5a](058fb5ae10400af72fdea9d2f501dcaf2b58b173))

### Documentation

- Update yarn install guide ([d7c7ae1](d7c7ae152c4a68c9b0564c8b39ffe527372ae77f))
- Update node guide ([18a31d2](18a31d21a3ed2db8bcf2db6c4d6da0366d532de2))

### Features

- Add snappable ([dd62165](dd621654430e3adbde322252857033c021ecad9f))
- Hide edge while updating ([bd4eb7c](bd4eb7cc546177ed61b53ab9a8a029bf1ff2d6f1))

### Miscellaneous Tasks

- Update CHANGELOG.md ([feb1dd6](feb1dd6a363249161970a3fc1e9b074acbf88d1a))
- Upgrade deps ([b48234e](b48234ec91898aeff452b4b22a334efe23edd22c))
- Cleanup unused vars and remove setState usage ([a110cdc](a110cdcd03b03e058862ab2ee70d7f911c01e1fa))
- Re-apply node extent only if flow is ready ([955f683](955f683d8b4c1d5286e4af50f742efbedad170c6))
- Pass vueflow id to scope on each call ([2beb48d](2beb48d4a54e7665af11a31a7d3893cbe3ee4e04))
- Bump version ([ff51560](ff5156042781468d564da8f1822aa33e040f8f29))

### Refactor

- Set fixed styles on resize rotate node ([5f5dd49](5f5dd49ed6a8037c3e839b5e08309d075478f28d))
- Allow ref to be passed to useKeyPress ([be2bcf5](be2bcf5a87a0eed43c900626c785e8afe324b412))

## [0.4.37] - 2022-08-09

[f1a1321](f1a1321117169d79345201499917ede855b4d68e)...[3e398d4](3e398d451a6ab43b9347b7f7e4954e76dc8c5060)

### Bug Fixes

- Pass node as prop to wrapper ([6221663](62216634480906a3fd949f36b38be0c9a04e7167))

### Miscellaneous Tasks

- Update CHANGELOG.md ([3255f95](3255f95df943ce45d1c63e2ce796e8aa4949de7a))
- Bump version ([3e398d4](3e398d451a6ab43b9347b7f7e4954e76dc8c5060))

## [0.4.36] - 2022-08-08

[16b6f42](16b6f429a11d538b579d9fe5616ee61f1774df55)...[f1a1321](f1a1321117169d79345201499917ede855b4d68e)

### Bug Fixes

- Use flush timing `post` in NodeWrapper.vue ([80fd818](80fd8183593923ece480c8ae9bc72ecd4b3eec43))

### Miscellaneous Tasks

- Update CHANGELOG.md ([4683b4a](4683b4af16e7a8e5a2b0088beff363950efc0a27))
- Add `.pnpm-store` to `.gitignore` file ([a9dc02d](a9dc02df8d41056526a40dbb324cda1803e70669))
- Bump version ([f1a1321](f1a1321117169d79345201499917ede855b4d68e))

## [0.4.35] - 2022-08-03

[f473dac](f473dacffe97e8724166c16dc234d94d4720d294)...[16b6f42](16b6f429a11d538b579d9fe5616ee61f1774df55)

### Documentation

- Update intro links ([3638e59](3638e598e4afe7d9e74ebe4adf383847c29162f7))

### Features

- Block keypress on inputs and `.nokey` elements ([250965d](250965d18f86d8930bdece7d4d954b662bdc3ecb))

### Miscellaneous Tasks

- Update CHANGELOG.md ([a986a6b](a986a6b2c6b26980e4a41421920cdb915cd34bd1))
- Bump version ([16b6f42](16b6f429a11d538b579d9fe5616ee61f1774df55))

### Refactor

- Move watch flush timing to pre ([8b6afd3](8b6afd3d0769cf928b345ec5fe8be8b45cd6dfa9))

## [0.4.34] - 2022-08-01

[dc0ec7a](dc0ec7a27dcf7f1c6d60765e6af2f56074fb281c)...[f473dac](f473dacffe97e8724166c16dc234d94d4720d294)

### Bug Fixes

- Force update clause in updateDimensions ([0d10adc](0d10adcbdb70620ca2c3e7d07e1552b747276fae))
- Cleanup default change handlers on watch scope dispose ([9031b46](9031b46b57a73514e03f8b3ad70ca5bc4cd2852e))

### Documentation

- Use vitepress ([e6bef4a](e6bef4a9f19b28f87277766b08fe3d7b5362412a))
- Update md files ([f17bd16](f17bd16665323c8cd8b8b0b0e2085d2ea3857faf))
- Update layout file ([586bf5d](586bf5d41d66804bfcd9384f69049721722410d5))
- Add social links ([c947d88](c947d887c8b9280057274b81a9e1b7319970317b))
- Update intro ([4f036e7](4f036e7672a014c4bbdec8abf68ceaeeac2c4c1b))
- Update homepage and styles ([bc87e47](bc87e4718f537998cd8a4838f0e0c3408505742f))
- Set repl view height ([c38787f](c38787f60bec448863d1fbac2fd650c59eb24c54))
- Add typedocs to vitepress docs ([74c329c](74c329c143a70b910efd8a2b2d8cbf1b9c5a97c7))
- Use page layout for example pages ([21702da](21702daf1eab30d7d67260ffa56c92a47cec3c6e))
- Replace vuepress docs dir with vitepress docs dir ([f2b1691](f2b169145c720333dd823c430b703efc9e8855a2))
- Fix dead links ([af78b52](af78b52233f50403a0c720abd39529b6bbd560b6))
- Replace vuepress specific components ([f386ea4](f386ea454c23eead3c995f96d9087217d2ba2db4))
- Remove test script ([c4f9492](c4f9492a4f77ca242fb33eef1c1287eb87c24ab3))
- Set prevent scrolling to false ([3f336a1](3f336a12af340f5e5e5978e2cc12a0f9c0744825))
- Update links and headlines ([d077d41](d077d41d71c961713d97a3f9fafeac38698780a6))

### Miscellaneous Tasks

- Update CHANGELOG.md ([a095052](a095052c8444866970efc7233791445ad8c0a0e2))
- Update pnpm-lock.yaml ([10c34bb](10c34bb9fe09b2b65221944592f5cbfbcac2b6cd))
- Remove unused code ([a5d5da5](a5d5da54cc715677aa4d523d68170d14f1439b07))
- Bump version ([f473dac](f473dacffe97e8724166c16dc234d94d4720d294))

### Refactor

- Accept KeyFilter instead of KeyCode ([bd36253](bd36253cd0577210561e3751c4b68ed226a3714a))
- Recreate scope on mount ([d468fb7](d468fb7f1d3618b8b0d104f31d8c0a6002c860ae))
- Re-bind hooks on mount and use hooks ref ([8b02d7d](8b02d7d3b383a8f5ac82efde5b8d2c7f311a5e9a))
- Reset store on unmount and skip re-creating hooks on re-mount ([90b3bd0](90b3bd0bc3907bbc0e19ff53dd12ababe5429c35))

## [0.4.33] - 2022-07-30

[9aa5172](9aa517285b26d6ad9e34caad1dcbc3a27569b19b)...[dc0ec7a](dc0ec7a27dcf7f1c6d60765e6af2f56074fb281c)

### Bug Fixes

- Fix methods (onMouseEnter, onMouseMove, onMouseLeave) not being able to emit event ([4e93b2b](4e93b2b2426bf3950929b2e0853c505c1a878d12))
- Dimensions not properly set on mount ([899d3af](899d3af4ad149d628024076a62ff097e7c631acd))
- Pan on scroll blocks any zoom handling ([228b9d1](228b9d17535125f422b006308b140800283422ee))

### Miscellaneous Tasks

- Update CHANGELOG.md ([91fbad4](91fbad44392340e7b2560dd90843c2c87f55f7c9))
- Bump version ([dc0ec7a](dc0ec7a27dcf7f1c6d60765e6af2f56074fb281c))

## [0.4.32] - 2022-07-28

[4766510](4766510a13a0cac775c472ec25b2098f276d4308)...[9aa5172](9aa517285b26d6ad9e34caad1dcbc3a27569b19b)

### Bug Fixes

- Prevent initial dimensions being emitted twice ([1db74cf](1db74cf8b6567ec3021f241e1023d1748a04e9a7))

### Miscellaneous Tasks

- Update CHANGELOG.md ([5ca61d2](5ca61d2fb0643067d74a15dc291478bac528c8d3))
- Quasar example vue flow version ([5c68803](5c688030f5a2d940c6d47a91602e016c16b573dd))
- Update pnpm-lock.yaml ([6a56251](6a5625173c6238ff4a7fbf073a73a797101d5184))
- Bump version ([9aa5172](9aa517285b26d6ad9e34caad1dcbc3a27569b19b))

## [0.4.31] - 2022-07-27

[600922a](600922afd921c3c357edfcc27149f451d3aa0e4a)...[4766510](4766510a13a0cac775c472ec25b2098f276d4308)

### Bug Fixes

- Prevent falsy values from stopping prop watcher ([93a9a99](93a9a99a85cbeff57f1e9124d0dbc1fec318462d))
- Remove generic from node getter ([b0fc5ad](b0fc5ada9284980a0bf3fe34ec2734d0e3cfa66a))
- Only run scope dispose on parent caller ([d62c330](d62c3304e3f0a8111d899c0f2381a43bd4fa3c94))
- Create new effect scope when pane ready is called ([54eef97](54eef97bde2e3685c18cb6eb42e242e7ca187ef3))

### Features

- Expose flow store and element ref ([97d89bf](97d89bf4c797f9c128c07128bfff89e298dce888))
- Set vueflow & viewport elements in store ([376f91e](376f91e2645b7bf997860515ef726e8993fdaeca))
- Add `findNode` & `findEdge` actions ([f2321f2](f2321f26264230d65259a12633de26480284ac28))
- Add viewpane mouseevents ([8ea2130](8ea21303bd061384fc6ae308911922b2959360cf))
- Bind pane mouse events ([953155d](953155dea381fdab57cc4146775ce988f124780b))
- Add `$destroy` action ([73bf4db](73bf4db82997d7be08fa2c8408b519c8c1e54a59))

### Miscellaneous Tasks

- Update CHANGELOG.md ([47164f0](47164f01b8c10b9a4d5f68423ab6f5000c5ea7d5))
- Upgrade dependencies ([ce77bc5](ce77bc5d64c72e2b0e521775f9ac05f239bb336a))
- Unfreeze lockfile ([27fa623](27fa6235430977cd055d8bd67dd8316886b22aa0))
- Symlink deps in tsconfig ([4e7f4b5](4e7f4b5cf8518cc237ca3d159a1ec718fd8de95c))
- Update auto-imports.d.ts ([12108d0](12108d092cec59fdeddc29946ed153ea659e6c0e))
- Remove unused prop in store ([cff5e05](cff5e05ac9114beea856cdb6de11934a8cd49191))
- Update vueuse ([3d22b87](3d22b879a3195ba70be84c851db4dcd19dc4113c))
- Update pnpm-lock.yaml ([49d51cc](49d51ccf10b5bf26d06c3c86dd08f4d0e3659249))
- Initial `$destroy` fn ([20fead9](20fead93c4978b2f20321e832d6132cdfa936b8b))
- Bump version ([4766510](4766510a13a0cac775c472ec25b2098f276d4308))

### Refactor

- Import `Emits` type ([9a8459c](9a8459c8ebb2df12fc57e0271f89dc69f2fc286d))

### Revert

- Explicitly bind emits ([31f0dba](31f0dbafa7a2feafce74416d09caa19e4b0cadc0))
- Use state viewport zoom to calculate handlebounds ([98ff311](98ff31154c703b10fe7e5b0c7b7941aa8e9502b7))

## [0.4.30] - 2022-07-22

[7596c4d](7596c4d325cc126518464553482c04cb0b8e60f9)...[600922a](600922afd921c3c357edfcc27149f451d3aa0e4a)

### Bug Fixes

- Use correct edge event types ([d96e944](d96e944a49eabb3997cbcd40e2c34ee087cfa7c9))

### Miscellaneous Tasks

- Update CHANGELOG.md ([3537e6b](3537e6b0223ffb819df95c1d238bbf3cd8c4e0e3))
- Update pnpm-lock.yaml ([78f176c](78f176cf468f35fec65123302c6f7d41f036b1a1))
- Upgrade dependencies ([c16cd46](c16cd464b3b223a394689b9425be9f5eb8923e62))
- Bump version ([600922a](600922afd921c3c357edfcc27149f451d3aa0e4a))

## [0.4.29] - 2022-07-18

[b696eb0](b696eb04f9538a8a5bf25490fd0cc3e0ef9bf50d)...[7596c4d](7596c4d325cc126518464553482c04cb0b8e60f9)

### Bug Fixes

- Check parent dimensions before extending ([7d66094](7d66094b06a94b6894fc6cb98d136175a23cca34))
- Remove child nodes when parent gets removed ([9bca73d](9bca73d76251d89918dc2a69d47c60aeae6e3233))

### Miscellaneous Tasks

- Update CHANGELOG.md ([480a487](480a48744da3a0c26f6e0763fb3e7612a10dd649))
- Bump version ([7596c4d](7596c4d325cc126518464553482c04cb0b8e60f9))

## [0.4.28] - 2022-07-16

[32e7ee9](32e7ee99b28ab5099ea146772ef17e7f6520208a)...[b696eb0](b696eb04f9538a8a5bf25490fd0cc3e0ef9bf50d)

### Bug Fixes

- `getIncomers` always returning itself ([1abd18d](1abd18dc1204eb5932f2fbf75eb384a78b2ef387))
- Auto-connector always triggered even when not set ([95afba3](95afba3e17ed83d1a9dd19da01759191993d9e72))
- Correctly calculate handle pos by using viewport zoom ([b7428e9](b7428e95128ce8112049fc0b41bfe44c00244742))
- Pass auto-connector result as new edge params ([4b83ae0](4b83ae032508a025142eec5e137b55b5bfe32deb))

### Documentation

- Add seo plugins ([b11feaf](b11feaf2ce4eee4d3560ea66260e893c07e9deb4))
- Update pinia example to use latest version of vue flow ([1f035fb](1f035fbc5e4de9761a0155384b7fa6877145b4f1))

### Miscellaneous Tasks

- Update CHANGELOG.md ([1d9e7ec](1d9e7ec07dccf22867075d525f4752b4bd43733e))
- Add `.eslintignore` file ([5a89d0e](5a89d0e947ef6ff6005b8c8096c482e22592174b))
- Update `tsconfig.json` ([d6df271](d6df271c2d045c6397fb9a40a76ace3257038f49))
- Update meta title & description ([9c171c0](9c171c0ff865d05b7f6570a7ce99e5208e52c23e))
- Fix typing ([c0c72f1](c0c72f1f6d2726582fd4047258bce8902b6c6bed))
- Bump version ([b696eb0](b696eb04f9538a8a5bf25490fd0cc3e0ef9bf50d))

### Refactor

- Don't interrupt while zoom/pan is active ([45163f3](45163f31c95d66e14d08525f7c24de1a0672f1f0))

## [0.4.27] - 2022-06-26

[9fdac11](9fdac11fd062453f567fd7755775fc614600ca15)...[32e7ee9](32e7ee99b28ab5099ea146772ef17e7f6520208a)

### Documentation

- Documentation for `updateNodeInternals` event listener ([f8be3cb](f8be3cb8438e145adb7a21406af85b56bdd09754))
- Documentation for new `connectionLineOptions` prop ([b2834b9](b2834b95c882cd8bd2eca7a48a4308a5589f6ba3))

### Features

- Allow node internals to be updated by event ([2a8f4a1](2a8f4a16f59c68ccaa10f5c24b3ac3e9b0b32c73))
- Add `connectionLineOptions` prop ([1578d40](1578d404eee5b25fb2d14a391ae0242c767f8eab))

### Miscellaneous Tasks

- Update CHANGELOG.md ([1f11365](1f11365e34c674dd930f84664d88bc352e548533))
- Move icons into floating container ([3ea7355](3ea735558f8cd536ae6708b21ad4de4e4669e975))
- Move icons into header but in container ([a24fc52](a24fc5241ee1703bd0d6b0a536eb8ecd440900ae))
- Update deps ([2678112](26781124d652e9d822fe8e3d532e2bf6882dbc9c))
- Correct tooltip position ([48dc16c](48dc16cf73f8bd6ebd6feeef61db9d4323e55ad0))
- Set transition mode ([e022978](e02297875d5edcf7f2e699fabe273edf551adb6e))
- Fix typo ([0c5473a](0c5473ae14bdfbf425d4336b762bfc548a02c4a8))
- Check if node ref exists before updating dimensions ([ae5d5b4](ae5d5b4637446d1413f909d6d13b8df95c55dd2c))
- Bump version ([32e7ee9](32e7ee99b28ab5099ea146772ef17e7f6520208a))

## [0.4.26] - 2022-06-24

[16ec3cc](16ec3cc71796cc96d0d6b402aa6c0e43f8d9f5e0)...[9fdac11](9fdac11fd062453f567fd7755775fc614600ca15)

### Documentation

- Move examples into `nodes` and `edges` dir ([7534ad9](7534ad9304653acf03365963e21e826d31ddde0a))
- Add animated background to intro ([f1a0568](f1a05684496925db4e8386e9855457c6d4d4be7e))

### Features

- Add `pattern-container` slot to Background ([89daa82](89daa827f38ef6a516c8c9cbe1fb18c633739121))

### Miscellaneous Tasks

- Update CHANGELOG.md ([0d5f9a5](0d5f9a5f0a9fed891694b8126ad87e48d4766a80))
- Color github logo white ([8d975c6](8d975c6aadc924d748da2e4a9b21bc8a09cf529b))
- Randomize animation durations ([2932a8c](2932a8cb385c34f1fb250f7378b3614ee5856cdc))
- Have animations be at least 5 seconds long ([74f367c](74f367c6c79fd0c328563d3b5d47603ef675c5bf))
- Color github logo black when light mode ([6e2ae48](6e2ae482b5d5efd1e0e03a770ea7b25be568248a))
- Enable animated background on intro node click ([07e7484](07e74844200fdbaf36f3e44572ea750783f15944))
- Allow intro nodes to be dragged and use bezier edges ([d265a62](d265a62c83618336da1a6636b3034b2f11d409c6))
- Change blobity mode ([491f2dc](491f2dc07ac0b9fbd0d433e0db3545e08915754d))
- Elevate edges on select in intro ([fd1cc00](fd1cc00c970cef8caf2c3ce54141dd44d20e2bee))
- Bump version ([9fdac11](9fdac11fd062453f567fd7755775fc614600ca15))

### Refactor

- Trigger viewport size update on window resize ([3cb3ada](3cb3ada78304efc6ae6749cce7f181dfccea85c6))

## [0.4.25] - 2022-06-24

[f4201fd](f4201fd94fa1f5ffcc72c696a20703d310bee4c7)...[16ec3cc](16ec3cc71796cc96d0d6b402aa6c0e43f8d9f5e0)

### Bug Fixes

- Use `v-if` on slots instead of lock icons ([a183c7d](a183c7dcedd4056dbcd92bdadf1d69fd5f713133))

### Documentation

- Add github, discord and react flow icons to header ([097b859](097b859e26a211d8c5606da16874d7427980d09b))
- Use edge style function to style edges on node select ([c27c895](c27c895f8806b91737d1ecc746d1a290f3f69053))

### Miscellaneous Tasks

- Push from changelog workflow to master branch ([7d9a7b6](7d9a7b6dbe02b81b798a923bbb84e5e5a8f2fa7b))
- Update CHANGELOG.md ([6a71a5f](6a71a5fdbdadc00f53b88cffc1a53adcd2693293))
- Let windicss scan theme dir ([a0541cb](a0541cb5df00294282f19f73494b8cc10bf87bae))
- Update `auto-imports.d.ts` ([d37b67c](d37b67c9dc99b786e280a0ec6b0ed6c7e91afdf4))
- Remove `d3` and move `types/d3` to deps-dev ([eeed10c](eeed10c8592c350dc69f953bad6f7f76b6df39cc))
- Bump version ([16ec3cc](16ec3cc71796cc96d0d6b402aa6c0e43f8d9f5e0))

## [0.4.24] - 2022-06-23

[c866df6](c866df6d0615f0e92701fb8eb544744f8aeeeb8c)...[f4201fd](f4201fd94fa1f5ffcc72c696a20703d310bee4c7)

### Bug Fixes

- Apply node extent ([77c43aa](77c43aa2071ad6fad9031c09858cd1fd1057c0d9))
- Use correct zindex on selection ([4e431a1](4e431a17b6be01f80fe4bf4ccbdd6ceab75eb181))
- Remove `sourcePosition` & `targetPosition` from initial edge options ([acc27a7](acc27a78672d9269de511e1a2856820b4032821d))

### Documentation

- Move button style to index.css ([119bcab](119bcabaf8153cf295eccbb3b5b442e56075ae92))
- Rename button class to docs-button ([04907fc](04907fcc16199af664f63da5d11c40cdf461cbfd))
- Add minimap node docs to sidebar ([597cfad](597cfad39b5332e869d97cd3676fa5c07b0130c3))
- Update `minimap-node.md` ([1dcfb2d](1dcfb2dfcead78623b0d36b5634eb316e9b57849))
- Add typedoc links and fix edge docs ([9a72a5a](9a72a5a0c1cf597a228eaa13bee70bd93bcc86db))
- Add sidebar links for actions, getters and events ([d0d9a34](d0d9a3459b6bf0de7222f8d806ab1a4654dd46e4))
- Add deprecation notice for `useZoomPanHelper` ([17d3f8d](17d3f8df6f37f7f4be313402b391f9eeb1937345))
- Add notice about `FlowInstance` removal ([92fc866](92fc8662657e3892d5118d3c3ba7bc6a704e5aa7))
- Add docs for new connection line class ([5a031e3](5a031e3fe2d2dab94d30d78ad33d8e4fdbab666f))
- Update documentation on custom node props ([439aa49](439aa49c2363b1a7de436f6a2d075d289750d83c))
- Documentation for new node `events` property ([7d47904](7d47904a810dcdf8cf3faf582e4799b00594d048))
- Fix links for docsearch ([345cf9b](345cf9bc3887153ab7deb02a44607fc032386a8c))
- Update nested example ([6c06eee](6c06eeee7498c17e8d6591c736bac33b2fc858f2))
- Documentation for new `elevateEdgesOnSelect` option ([6dfeebf](6dfeebf7af3b87bd9d2d05469a72751b7c44f030))
- Documentation for new edge `events` property ([905a6fb](905a6fbaa0f5f53d4eac5aa2d6bc1354a37cd4e3))

### Features

- Move connection lines to separate container ([2a9cdd6](2a9cdd6855a6ae992258981c59b25e4c806ec1f1))
- Add contextual node events ([b363e94](b363e9457ee6e2c3407793c7f17371f82b149806))
- Add `useNodeHooks` composable ([394f9a0](394f9a01b38de3d5dfdf9dfdbf160783c3502a71))
- Update node event types ([b5998ee](b5998ee301be42cc1dff0201ec497a5892f2aa33))
- Add contextual edge events ([730f49e](730f49e8792df3b228ebe41a5cac09b39fa24dbf))

### Miscellaneous Tasks

- Remove repository ref from changelog workflow ([b4d123c](b4d123cab54d579019e58c528d31847076a9a46d))
- Allow manual workflow dispatch ([2e1150c](2e1150c32fa39773b000477c90c7c9612c3a777b))
- Add name to changelog workflow ([e154b60](e154b60a6a38b0c8e22b17be6e4510ce8b3ec1bc))
- Use fetch-depth 0 ([14a1843](14a1843d9b3d4d58474bb1ee78fa7152c4064c57))
- Update CHANGELOG.md ([9b373ce](9b373ce49c9124537239efe00fcf32393fa634e1))
- Update `vite-config.ts` ([d75feb6](d75feb6c61e09859bbedd2857ebb644318c4623a))
- Deprecate `useZoomPanHelper` ([f5b02c3](f5b02c3278f3cd8fe3230ab145ed23ae73c93d6c))
- Add generic for custom events on node associated types ([38d8565](38d8565702f25d9d9012ec46f4c0219675ba9f33))
- Remove `computedPosition` from `NodeProps` ([a84dc91](a84dc911d2687ac57468f618eefc59c8a5d1ed89))
- Remove `nodeElement` from `NodeProps` type ([e395cc7](e395cc7aad5c08b8c9b60b36c3c8bd387354e339))
- Use scope for node watchers ([eb28934](eb28934ceeb30270b5acd484fe7f3befb8b5a371))
- Simplify `elevateEdgesOnSelect` logic ([d036769](d036769d5863602bb72a498ffe318c1d932a9e30))
- Correct name of `useNodeHooks` ([fb51f8d](fb51f8d8bdaaa3bc6c89a80138eec53a662235a1))
- Update package deps ([580de08](580de082fbd9eca97e831c4c6e1da4d7a64a24a9))
- Bump version ([f4201fd](f4201fd94fa1f5ffcc72c696a20703d310bee4c7))

### Performance

- Too many loops in grouping watcher ([f25f6bf](f25f6bf9a14372ce8ddd04d2fce34fceb340d2d1))

### Refactor

- Apply node specific `snapGrid` on drag ([c5e4264](c5e4264dda7b92c65b1b23c5376c3bc30c14e46e))
- Use `content-box` for resize observer ([78e15b2](78e15b23f348983fa36d5c5bbff024e55700744c))
- Edges z-index 0 by default ([c0920bf](c0920bfb4d4520d475f3e5e01e3b9e211c888467))
- Remove unnecessary generics ([be68a27](be68a27b33a6929f5f5a826365b8c8d617dd1c4d))

## [0.4.23] - 2022-06-16

[893b35b](893b35b519573276a19b3b2e45f19ed79361c84b)...[c866df6](c866df6d0615f0e92701fb8eb544744f8aeeeb8c)

### Documentation

- Improve teleport example with transitions ([2de1215](2de121509efe22e2be48f8e433161d3e96f9f423))
- Add multiple transition animations to teleport example ([597f799](597f799fa442e228e21910ee40cbc5970671be71))
- Set `inheritAttrs` to false on teleportable nodes ([77e481b](77e481bddb757f895214c4a61870f655b7cb04f0))
- Use `updateNodeInternals` in teleport example ([47bc652](47bc652c468deaa994f2a3a407a86b434f59c509))
- Fix docs links ([2526d76](2526d76a2ef62be0834d4f972fdf6c2c5989a406))
- Add documentation on `autoConnect` option ([5a563e4](5a563e45b6024ef09bc815e25c5339cf83b6c709))

### Features

- Add `autoConnect` option ([e047be6](e047be6854da3c4ed97fb7e270e85fd3b8bc3628))

### Miscellaneous Tasks

- Add workflow to generate changelog on `v*`-tags push ([87ad709](87ad709e5eccfda91f95bf73ce8b563518cf1f30))
- Move update position into own function ([c2303f4](c2303f4c2fb0af22dfd6a1a1ec2e9ed5b78950ab))
- Rename postrelease script to changelog ([4a2345b](4a2345b533ea6ec6dd095ecbe83ec320e88dadfa))
- Bump version ([c866df6](c866df6d0615f0e92701fb8eb544744f8aeeeb8c))

### Refactor

- Move `position: absolute` to required handle styles ([8e911de](8e911deaa77fd48fcae0e31fbfcda70167f27bc8))
- Remove ctrl key from drag filter condition ([1aa9230](1aa9230fe4a3cf8f849de4ca6dfc7194d6882069))
- Add `updateNodeInternals` action ([648350c](648350cdedadd4afa4ec58b339a7e67b2a3df539))
- Remove computed position as prop from custom nodes ([4b824b5](4b824b527ff66f26d953df30ecc6e9ba28d02293))

### Examples

- Fix import path ([942a122](942a122fcb4d2dbabdafb70a925499bfeef96a9e))

## [0.4.22] - 2022-06-15

[59b6424](59b64242d5de5b710f6e6557d5256db9b1021be7)...[893b35b](893b35b519573276a19b3b2e45f19ed79361c84b)

### Documentation

- Use mutation observer to check dark mode class ([669f9a0](669f9a075c168bd096490500073c5666276c71f3))
- Integrate TypeDocs into vuepress output ([be5df65](be5df65cc2aec5e5bcdfdda1ad7a1947fe57a5d8))
- Skip readme when generating typedocs ([fc98108](fc981081ae319bb4b86fc765a6d32054209c3758))
- Generate own document for all reflections ([12c27e9](12c27e9d785addadbc349cdabf6598086969f0e6))
- Generate typedocs sidebar dynamically from subdirectories ([d3e6f63](d3e6f638223e254e01f177d5137cfee83f8eb187))
- Disable sources ([281b0fc](281b0fccc875cf0be662a8b43accc4d5db2352d9))
- Set repl store on mounted ([2bd81fe](2bd81fe173d6a6b043371a1647c8d1ee00bd3ebc))
- Fit view on features flows on wrapper resize ([1400011](14000111f9eed56a05b29afa8f6c78babe6fc4df))
- Add slot documentation for Controls ([3162b79](3162b79f549cb4b59b4e44d1eec45aeada9872cc))
- Add documentation for `ControlButton` ([33cd638](33cd638fd943379347c0c0b3360c7c32cdd0d2c9))
- Replace old typedoc links ([e469708](e469708b57ad9296392b97b4b5596d10f079c4d1))
- Add documentation for `MiniMapNode` ([3587478](3587478e5f8aceaf2a1059321823f49fc8b50e9b))
- Replace old typedoc links ([53a85bf](53a85bf49b618ddcaaed3d452e192b4ef31b07b7))
- Add documentation for Vue Flow slots ([0726a98](0726a981700043faf593c208e66fb5b0d16c2c84))

### Features

- Export `MiniMapNode` component ([06420ac](06420ac6cdd62ea8fbdd3d9b25cd4a9df353e272))

### Miscellaneous Tasks

- Update pnpm-lock.yaml ([e4202b0](e4202b01c9be21cf916490c22674156178d8e372))
- Run typedocs before vuepress ([ecf454e](ecf454e7b25b12a6248b5135e7f4fdd995f445ab))
- Add typedoc script to docs dev ([bd51614](bd51614fb7c0a8b6c5a8fed61098ce3ba73b32e1))
- Bump version ([893b35b](893b35b519573276a19b3b2e45f19ed79361c84b))

### Refactor

- Hide/show slots in `Controls.vue` ([32086e0](32086e0760f692135b2f8d8eff950708de12a71a))

## [0.4.21] - 2022-06-10

[fd6c34c](fd6c34ce6c25817d4a1e5f6d6adac6eb756c3c18)...[59b6424](59b64242d5de5b710f6e6557d5256db9b1021be7)

### Miscellaneous Tasks

- Bump version ([7fe511f](7fe511fefdc9aab49ac77da8b5182372f5d86234))
- Bump version ([59b6424](59b64242d5de5b710f6e6557d5256db9b1021be7))

## [0.4.20] - 2022-06-10

[7597c0c](7597c0c542370f7a9236f294091761511f55b6a6)...[fd6c34c](fd6c34ce6c25817d4a1e5f6d6adac6eb756c3c18)

### Documentation

- Update `Basic.vue` class and style functions ([2e1b2db](2e1b2db26b4f285b1e0c64efd3fe7332763ef6c3))
- Remove unnecessary div ([9a4c4d6](9a4c4d6c02efa132e32eaf36e6e583ef7f477f99))
- Use mutation observer to check dark mode class ([8fd5505](8fd5505eecb0636d9164d776d0f2c78bf53a4162))

### Miscellaneous Tasks

- Bump version ([9d94dfd](9d94dfd7b7f2e72cdb037eac81dd3ede9df666ef))
- Remove `NodeProps` generic from node label type ([7de3509](7de3509bd22078f2f21f9715d12852ad78e6ddf3))
- Commit version bump on postpublish ([62c45d3](62c45d39824517bb0acf132f01c893173f3daad6))
- Commit all files on postpublish ([fd6c34c](fd6c34ce6c25817d4a1e5f6d6adac6eb756c3c18))

### Refactor

- Remove `BaseElement` type ([37fd017](37fd017e37ab1e1fe9a77ea12cce453ae7042e34))

## [0.4.19] - 2022-06-10

[c755208](c755208ebecff3865c530c8aed08197ed8d27c6a)...[7597c0c](7597c0c542370f7a9236f294091761511f55b6a6)

### Bug Fixes

- Bind edge mouse events to correct names ([7fe5171](7fe5171f632c587366d6c4e3d1c64921575a1985))

### Documentation

- Update typedoc to use src/index.ts as entry ([c289e7e](c289e7e3ccd2f743ca8da29384c39982b78386ac))
- Add typedoc.json file ([f94f72d](f94f72d31e0978e6d43e2aa8dd3fc38930e9881c))
- Update deps ([650606e](650606ec7684ab7706bbf6c56655f7621e99713a))
- Update intro lightmode styles ([3668caa](3668caa3a1938a1e44dde336bf4bb1119ada49b6))

### Features

- Explicitly define events in `VueFlow` component ([9ae97f4](9ae97f418669f07651c43f9886aeffdd97a61819))
- Export `BaseEdgeProps` ([ac93894](ac9389480d7df912fbc7afda1a6d32c9c2a59f32))

### Miscellaneous Tasks

- Bump version ([2efe25c](2efe25c989e0a259f6a4487b94c481976f10d7f3))
- Update dependencies ([3dd3c37](3dd3c37fc25e36dafce67be5e7b3cd690c2dca32))
- Update lock file ([77b441b](77b441b1c6803c5543eb7a50315e193e168fb310))
- Use type import for emit definition ([fdc6f40](fdc6f40c3c9f89a3548e3f75c89702ef54888916))
- Update README.md links ([699e252](699e25293556267b5311883cf4201f98f2368924))
- Move `BaseEdgeProps` to types ([e54f7b5](e54f7b56d01f4cfacef0c101cfcc269ab48f8706))

### Revert

- Set emits explicitly ([fb8356e](fb8356e15a3b9cf6309df1611337369e1e7463c1))
- Filter old edge on update ([7597c0c](7597c0c542370f7a9236f294091761511f55b6a6))

## [0.4.18] - 2022-06-07

[0649c0a](0649c0a23608c475d95fb22b06fd75483f25b7b6)...[c755208](c755208ebecff3865c530c8aed08197ed8d27c6a)

### Bug Fixes

- Triggers recursively when store changes ([a86eded](a86eded7931f4d66816c88025b9e32f0ce3b3c82))
- Set viewpane functions on Transform mount ([8a570be](8a570bea8baba8de0d25d8f035190f1d6d6aa833))
- Pass edge markers to wrapper ([c755208](c755208ebecff3865c530c8aed08197ed8d27c6a))

### Documentation

- Fix code block styles ([aae071f](aae071f7811a4e2eb69f0571413cfbfb1da0af56))
- Update examples ([3a225a6](3a225a68712bd64147be34ae60ac3a713ee99ea9))
- Update examples ([a0e610a](a0e610aeddb5cbf6d86882b729cb6f7fb77cd839))
- Update docs ([eb8fa5d](eb8fa5d5d82f02f894a0e0da058cbc4cedb13091))
- Use debounce for fitviews ([ac41c00](ac41c0093ee24bca3a01ef3467ebcf9b99fe2c3b))
- Remove unused ref ([096a004](096a0047d3bdd2837c16e8f32084acb3d27771fb))

### Features

- Add `removeNodes` and `removeEdges` utilities to store ([7276a39](7276a3925193943641a0bcb5f4eedaa9d000a55c))
- Allow connected edges to be removed with `removeNodes` ([f434ab0](f434ab0f791a90abe0a6d363397f5e0f74724188))
- Add effect scope to `useDrag` utility ([382a3b6](382a3b67fce3f37f5eefe9ca23762032448b1444))
- Defer viewport functions until pane is ready ([7dd79f6](7dd79f62563d609ba022b1e78ff6f30a24dfe0a1))

### Miscellaneous Tasks

- Bump version ([425e558](425e558e96e757d6d65505b1c6ca5fd096d71533))
- Fix missing imports ([9929278](9929278ff0d6f942544bdfdfa41e211936250253))
- Remove unnecessary imports ([c81362d](c81362da60af373b8009644908ba98a9814ca78a))
- Set dimensions after mount ([e8923c8](e8923c8aaed836110085daa8e14d66dc198da3e6))
- Wait for paneReady to set zoompan ([5b55d6b](5b55d6b0af273418889bba3adc9eadbbbd93a80b))
- Trigger fitViewOnInit after paneReady ([90af73d](90af73dcd3b735286adfb0917032d36f88ce4955))

### Refactor

- Remove `instance` property and merge into `useVueFlow` ([58783fd](58783fd4a17f031092b383f99e6490d1264fbabb))
- Remove `FlowInstance` type ([5277506](5277506936f25bbbf6371f24cb5f6be74c656fc4))
- Set resize observer before mount ([87f97ef](87f97efd42c560350d7e92d960b03c9bee44c000))

## [0.4.17] - 2022-06-03

[f624c1a](f624c1a2c89fed09bc09f30a92d972560a0bdb04)...[0649c0a](0649c0a23608c475d95fb22b06fd75483f25b7b6)

### Bug Fixes

- Performance issue with `getNode` ([0102ebc](0102ebcd33441282561bc17e02732012fcec2be4))

### Documentation

- Lint ([f685a9d](f685a9d8cf5b859fe718452edb490cc60851be1a))
- Remove vuepress code stylings ([0649c0a](0649c0a23608c475d95fb22b06fd75483f25b7b6))

### Miscellaneous Tasks

- Bump version ([f272bd6](f272bd60d7622712ec070628822d45d34f75473b))

## [0.4.16] - 2022-06-03

[a260f04](a260f04d792ad679e52d99ce6c0c78418efefda7)...[f624c1a](f624c1a2c89fed09bc09f30a92d972560a0bdb04)

### Bug Fixes

- `getNode` not returning proper node element ([0b21708](0b21708b582bedd14bf3ffe3c394766811b2a4c2))

### Documentation

- Update vuepress version ([99499dd](99499dd18cb7888d4e9f428fbc34425a42d05f54))
- Use vueflow version from composable instead of pkg ([d22773d](d22773dad9e272bda4bfdc81de1f343604c4f38f))
- Fix version link ([c6bda81](c6bda81c5ead8e47784ba8d152fb09676c710a63))

### Miscellaneous Tasks

- Bump version ([2858214](2858214e62bfda34c917fe28331bc56a11fd7d4e))
- Remove np ([4810483](4810483fe64a7085cec06ac04bf9e9a3eced4c49))
- Remove np ([d675891](d6758918e69f8a4bc88c0dabbffd0a5ac87f72df))
- Update lock file ([2d47cfa](2d47cfac74cc692973bfd0521ba5ba334a9d5e40))
- Bump version ([fe77de1](fe77de1a0e7e1bcf980f9350b0aa5ea9f30a342d))
- Update git links ([3672b86](3672b86df300cb2858da91f97bee28f8591e1810))
- Replace `Math.pow` with `**` ([2bd15c1](2bd15c1710b69f86289f27f278bbd3097757668b))
- Use computed pos z for zIndex ([586e8bf](586e8bfe419f0b2b1c504bcbc1fa40d5f16ba749))
- Add `.quasar` to gitignore ([f626c28](f626c28b3bb3bc822532761277583b5814fe5607))
- Add empty test script ([22f87a8](22f87a833405c1c0b3a1fb93f1e35c9e81e007c8))
- Use `https` for registry link ([f624c1a](f624c1a2c89fed09bc09f30a92d972560a0bdb04))

### Refactor

- Replace yarn with pnpm as package manager ([c07069d](c07069dcd03f8b530139bb8e400da23499ea6a9e))

### Testing

- Update import path for utils ([0373dae](0373dae236141c4919cb6414a6cbaa2d2f63f864))

### Examples

- Move current examples into `examples/vite` ([8dd7c79](8dd7c797001fe519510f888d29a4fb1e51033648))
- Add quasar example ([330d6d7](330d6d7eac478159ece58705a57f3a0d4be0bbb8))
- Add nuxt3 example ([f21d317](f21d317fe8dcde10e80d67049f19f9fdec86047e))

## [0.4.15] - 2022-06-01

[eef7c49](eef7c49e23f5ed8b1bdf97590af4c829bc767bd8)...[a260f04](a260f04d792ad679e52d99ce6c0c78418efefda7)

### Bug Fixes

- Set `applyDefault` regardless of true/false ([42ea2de](42ea2de513cf74fe0bb11592fc7c2b9d66240bc0))
- Unregister apply handlers when `applyDefault` is false ([30efd62](30efd620822294722b7c7432d86ef86dbcf6b49e))
- Use computed pos to calculate relative node pos ([29439f0](29439f005b338ef12188d42f97a5eafd8c0630a0))
- Apply rotation correctly ([4f506b6](4f506b6e562b83a2dabf9ec3ec7c1e3b89825d6d))

### Documentation

- Change stroke color of intro example node ([95104fd](95104fdca2ca7f036a8fab0258be553f3b3eb157))
- Remove onPaneReady handler from `Intro.vue` ([3828378](3828378355fe09321ec99a8b7a4f3b02f25b133c))
- Add margin top to h1 elements ([700156f](700156f16fab033943bea984addb65d0e07a3de3))

### Features

- Show moveable when dragging ([4866e26](4866e26cd621fce9c57e079ec08944841460b972))

### Miscellaneous Tasks

- Update vue-flow ([ab77231](ab772317977ac7a51a301bcff5f98c1cd48df6b3))

## [0.4.14] - 2022-05-29

[30db19b](30db19bb50680d38d878e8f13ee42408d09dd33b)...[eef7c49](eef7c49e23f5ed8b1bdf97590af4c829bc767bd8)

### Bug Fixes

- Filter by nodrag class name ([d8bae03](d8bae03b8f3febf0003cfd1349b9b62c33617528))
- Remove unnecessary filter from `updateEdge` util ([ab09a9b](ab09a9b7867031d612f969d7737fde457f52f7e0))

### Documentation

- Use new vuepress plugin api ([713ef07](713ef078209f627bac40e42c8729d59e2488dd92))

### Miscellaneous Tasks

- Update README.md ([015e34b](015e34baf820c00d194305acf47c5625a3fa3d21))
- Fix readme discord link ([7afbd87](7afbd870f4eb8f8851f5640f311957092de41496))
- Update typescript to `4.7.2` and vue-tsc to `0.35.0` ([f32dd24](f32dd24400b0abed4f261e2f93a8805ba3bdfa6d))

## [0.4.13] - 2022-05-27

[f6d2509](f6d250956e304beceb8ff4b0558dd8c3c7bab437)...[30db19b](30db19bb50680d38d878e8f13ee42408d09dd33b)

### Bug Fixes

- Default edge options not applied on new edges ([b846a3f](b846a3f76304102e1d78fbf46fa69b617dddb7df))
- Destruct bounding box ([567b55b](567b55b8e4d881bf084db97e60dec8b44bae3771))
- Jumping when drag is out of sync with last pos ([de60d92](de60d924ff19154f02069b5981f852f30536a2c5))
- Check if connection exists ([975d551](975d5519a4c9bfc8586d6187a99fac96fc295225))
- Unselect nodes on click when multi selection active ([ddac5b0](ddac5b0e58cb67f08bf10f4190a9012428c7bb00))
- Unselect nodes on drag start ([660c0bc](660c0bceab937c89e4444ce80b0f9006276afdfa))
- Update xyz on select ([b63d3da](b63d3da0c03f66f82d0d22c80b4a4467751b6f27))
- Check if node position was manually changed since last drag ([128c1a4](128c1a4a845cf81103f71a922feee32474358fe5))
- Extent not applied ([7479534](7479534647f66b634405d1b6f28940d6f9906895))
- Set dragging to false after drag ([957918e](957918e7c75fc6893f60b6a7dd9fc5f0771b46d2))
- Properly expand parent ([048775d](048775df2930301760d752af1edb6b1b23be224c))
- Missing source / target node ([a3f3077](a3f307708b8e01c4b1ebff1109a6f05550deac64))
- Use correct bbox for edge text ([008929a](008929a939237252a2678a91ab4777233f6d3122))

### Documentation

- Update examples ([8e3f1a3](8e3f1a394d86dc69b1988f561cf7a72757dd414b))
- Add horizontal layout example ([488b632](488b632e2e88d7e5edeeeac175f34385ca42d406))
- Update stress example ([4e9ad11](4e9ad11fc5b9660922b6fa54f68792688e0cde85))
- Update stress example ([a6e6f31](a6e6f31e9c5d5a421d02aaab65b98209320bf492))
- Add teleport example ([d9e7c7a](d9e7c7a0b089841f645e019ad85d758066110eab))
- Add teleportable example ([5d94a98](5d94a988c7fa10b2217b9cebb4c13f7bc0296121))
- Remove unused edges from nested example ([643f752](643f75273da0d600a0218128eb2226feddd7f792))
- Pin repl version to 1.1.2 ([1b8d9cf](1b8d9cfa413c56ae2f1d7b82976e2a1964a40131))

### Features

- Add connected edges to node mouse events ([5b307b5](5b307b548a71f8b3fab25fc45f746f034700ec57))
- Add width and height options to minimap ([0cd6eaf](0cd6eaff359793a02c1b783bd8f84c2351e54f32))
- Add mouse over events for minimap nodes ([7c360bb](7c360bb5c177036b68a6a7a7c6e3eab1353e2f89))
- Add mouseover events for minimap nodes ([d519eba](d519eba4303e1169fd7c743ad7cc0b20506a4c22))
- Add teleport option to nodes ([0d35f1c](0d35f1c7e3c24407241fab6f24cc66c0fcaf2c95))
- Only allow teleport on graph nodes ([e38cb4e](e38cb4e0c2fabe67af60f4d82bf48453afc9a2f0))
- Implement `useDrag` in `NodesSelection.vue` ([674a657](674a65788e85c0f0c38e4dd3aea434173391ebda))

### Miscellaneous Tasks

- Filter on drag ([1e506dc](1e506dc15130bb9d3b47cba76b517537816aaee7))
- Fix prop types in edge wrapper ([dd86e04](dd86e04a034e54b4d450ef157c137a2770e5e5e8))
- Lint ([bae5d1e](bae5d1e26d0ed1d6ab6f85c5c35b7c77e49776a3))
- Move store utils to separate file ([78d8190](78d8190f585fa35215b6e7451049fa73f91da1c9))
- Lint ([fe6114c](fe6114c738c58880378777995fe3d44116f8fd7f))
- Remove passing getters to `getSelectionChanges` ([9816269](98162699ae9abe83fd8c9992d0d1743ee4c54a67))
- Add missing selected prop ([e3c7424](e3c7424aa78cdf295aea3948d28e19cbd7ba9ba6))
- Remove old edge wrapper component ([8af7425](8af74259ec103117e034afa4443046bd0900aab1))
- Update yarn lock ([fd7fe86](fd7fe8620426204bded33fac2ed4f2950a19f3a6))

### Refactor

- Change edge-text prop type to extend svgattributes ([0d17d00](0d17d006442949bab670096c9dfff4174fd77146))
- Use reactivity transform in edge-texts ([0a2a467](0a2a467e563b29194141bc85cff1af1c54f1f35a))
- Add node/edge add changes ([1ddeffe](1ddeffe1afc491054d5ed3e9dc9eacaf138a0246))
- Move pull request template to up a directory ([ce7569d](ce7569da5f3f81e6782c1bb12afe7ee45ab0ffa9))
- Use d3-drag ([95e36d0](95e36d0c2c1a65ae76a38a6540e20d8e3b2f4867))
- Remove dragging from graph nodes ([86ba26f](86ba26fe9a86ebdbed7ca29c8959eb964e6ea2cc))
- Remove node and parent node props from wrapper ([80878a2](80878a228c2478bb4b2d8bc143386c60a362e826))
- Remove selectedNodesBbox from store ([f9671b1](f9671b1ec4c58d32e2b46e8fa2dd244b1ccf4a47))
- Remove get type call for names ([4cb4d9c](4cb4d9c0f41314f86a86da39fa0eaef19bb65eea))
- Mark nodes edges as shallow reactive ([3312739](33127395b67c05d47c478109919cca000e913590))
- Reduce nodewrapper re-render ([a65d856](a65d85687d8c09044c8e829d3f7e0bce8c149ddd))
- Make edge wrapper functional component ([ce13007](ce13007dbf04fd69d839688af1a5a911f036ebaa))
- Move classes to `Wrapper.ts` ([d5a19cd](d5a19cd1d89ffccd73572f8d6a2fa678d7ea8443))
- Remove v-model ([c059b59](c059b5929a9fd8f50e763601c26d30b45128f107))
- Add remove selected elements actions ([ec7901e](ec7901ef340c0fc5f2604e5c2eba4c173cf47f38))
- Simplify event defs ([9cdad4d](9cdad4d9fcaab3e5e7f56d28fc5a9e8001e1b1b6))
- Use absolute positions instead of deltas ([cec8f4d](cec8f4d77e6ef8645ae2427061c2908e21952e59))
- Remove reactive options ([e2f3da8](e2f3da8e1bf6a03f042a3bb115adcd55c27fd81b))
- Watch dimensions for xyzpos ([e483da2](e483da24432ca92ab2fc3b261c4438e69fa12c89))
- Remove v-html  from template tag ([d4ce7b8](d4ce7b835cbe410e08398c6d033b5ecd7bbe2881))

### Examples

- Fix import path ([ee78e92](ee78e925e041877cc02faf0e2655c02270f236a8))

### Update

- Add drag filter type ([9510f3d](9510f3dd5422fe2b8b30f9585c805acc9d2694de))

## [0.4.12] - 2022-05-26

[e714fe6](e714fe66dd7fe9387f97ea1ff0a7a43e4e76922d)...[f6d2509](f6d250956e304beceb8ff4b0558dd8c3c7bab437)

### Bug Fixes

- Pass markers to correct attributes ([6494b65](6494b65b3e7e0eb84d96b22520ba8892a5a72d2a))

### Documentation

- Replace codesandbox embed with repl (#122) ([98a8931](98a893108c2fe1875b9457468658aa735f3ae141))

## [0.4.11] - 2022-05-22

[9627f23](9627f236c7bbc99ae1ef2e417f4be73c72ae5743)...[e714fe6](e714fe66dd7fe9387f97ea1ff0a7a43e4e76922d)

### Bug Fixes

- Regexp for replacing transform values ([f0e2bc0](f0e2bc02d582c6bb41ac664b2c99c697b39f9a2b))

### Features

- Add pathfinding edge pkg to packages dir ([4ee7eb9](4ee7eb909a4c9a1c15bbf5d8571e5cb4e4897113))
- Add resize-rotate-node pkg ([66312b5](66312b5d4b2cc19ecea379a4b34c03212e8fee69))
- Add moveable to ResizeRotateNode.vue ([b120c22](b120c22174347a65c661ee72bb634aa8b3cfd6e7))
- Add onResize handler ([37bc17f](37bc17f6c0aeb3bf88e018948383f94e1145af84))
- Implement onResize & onRotate handlers ([b4c12fb](b4c12fb028c911e78561e98b45eb6bdc3749726d))
- Hide moveable on pane interaction ([8246e6e](8246e6e8d370a5e9440c0b70a2fd2068903539b8))
- Add devcontainer files ([e4c296a](e4c296ad4658eae7ec637d8fb881fba8774ba761))
- Export `ControlButton.vue` ([0702fb8](0702fb80f4db44beb9d68670e99a3028aaacbb0f))
- Add `top` slot to `Controls.vue` ([045a768](045a768ab13449fb511fe9a4f90835f1d4e5af0f))
- Add and export props type ([0a285d6](0a285d63c70fe1bcdd0fd9477326e305ed51cfbd))

### Miscellaneous Tasks

- Lint files ([a90bbb9](a90bbb9b5e4a51fdda5b084875a37a6e2f52618b))
- Update tsconfig, remove license ([cbb94ba](cbb94ba7c8aad1348e065c44e39cab7019d62375))
- Update pathfinding edge pkg ([36b3729](36b3729a2b4daa3dc1d49062340f570696ff4081))
- Add dependency to types pipeline ([3b0e301](3b0e301bf15ecbf4e84e775c6d29e58566514849))
- Move vue-flow to dev-deps ([70a148d](70a148d082aceec4a73438e18ead6717626fe1ab))
- Add release script ([796aeaa](796aeaa139fb6dcbc8ecd33d0203c7af2ad3cdef))
- Cleanup deps ([0e00a41](0e00a41d44414cd60846a2d25c9cd42c5114943e))
- Update vue-flow pkg alias path ([233f5cd](233f5cd0789bd3d6902ad31562da0c8bdf0b693c))
- Move env.d.ts to root ([bc0bd3a](bc0bd3a812e72477690e9d39caa2993b01c94c89))
- Add vue-types to deps dev ([efad878](efad878cd45ad38910ae711d01b601e4e8a764ea))
- Update examples ([827469e](827469ec405936d259a1eb0edc6787ae50146dc1))
- Update README.md ([728d27c](728d27c6892da8cb366b9b8ec5f798d4ffbdf919))
- Update README.md ([e847e2c](e847e2cb3fdc35dbe994622694fb043804e74149))
- Cleanup unused refs ([6879c44](6879c44a12899ef71b61897dcbe35abe06248894))
- Update README.md ([e2d66a4](e2d66a4233a657b5534462c0429440acb104e20a))
- Move gif to root ([b263c10](b263c1089d065264328fdf51d8f7ffcd6b7901d6))
- Use correct dbl click casing ([18cf579](18cf57937c8a91d10f18c0b97585623f59692335))

### Refactor

- Move vue-flow into separate pkg directory ([b9dbb97](b9dbb973748d1adc40480d0ed871d9f1aff022fe))
- CamelCase custom events in `Controls.vue` ([263b6df](263b6dff9f423f1f3bb3353cf5e865101d15dbda))

## [0.4.10] - 2022-05-14

[bcaf346](bcaf346926c6b82905fdf142ab5d6f54584e7d24)...[9627f23](9627f236c7bbc99ae1ef2e417f4be73c72ae5743)

### Bug Fixes

- Check if connection exists for new connection ([d36402e](d36402e537f0bd593782169ac2f842358c0ed7b6))

### Examples

- Update node example color ([1d2322e](1d2322eb46a802bb3a296915f070d3a7a696ab49))

## [0.4.9] - 2022-05-11

[233d585](233d585a92ac68b6b55202926a0893aa8acac9e7)...[bcaf346](bcaf346926c6b82905fdf142ab5d6f54584e7d24)

### Bug Fixes

- Use scaleBy instead of scaleTo for zoom ([fa23617](fa23617ff12c14a6a2f8614632cc775082642516))
- Dispose effects on unmount ([ad07b5b](ad07b5b6ead909f686e248c29e8b5c147d8dd96c))
- Watcher not re-binding when initialized with empty arr ([f69118e](f69118e2651c7d2f552569b168180586019009db))
- Add draggable watchers ([4eb7754](4eb775477fdcfdc1e0c7594caf3dd3b56e5ef036))
- Use label content as inner html ([14ef119](14ef119a953da1f4f9c96ba121e4d2a9e9e5f450))
- Missing mouseevent on minimap node click ([c6840a3](c6840a31ad333898a63a609eef98dd4530b0af54))
- Cancel edge update if connection exists ([9cc7806](9cc7806972d2c0f738027f7ecbca913c8418b7d2))
- Ensure scope dispose is run ([c4f9b2c](c4f9b2c780b074b2febaf426f1754bd61dcf681c))
- Wrong elements removed when index can't be found ([b68dc4c](b68dc4c0327a586018c763abfa57020b7c6bc841))
- Fit view not respecting options nodes ([5fb0280](5fb0280e5bb7886ea01b22398e08cb3fe267b76a))
- Add edges not respecting default edge options ([e2e3a65](e2e3a650c18d930695747e757d7d9aefb823d92a))

### Features

- Add emits property to store ([f5d2453](f5d245322b74c5a861c524c9e5041e2d925735d6))
- Add pattern slot to background ([152801e](152801edacf1d48a665e446351f8a13c474c6d23))
- Export storage class ([412c0e5](412c0e500fe84744978a4d4aaad14cb917f9e232))
- Export base edge ([be2a372](be2a37246a3a1bb5743363d699a2f3be25e9ab48))

### Miscellaneous Tasks

- Flush watcher on post hook ([4e3f454](4e3f4541a18733f65ef949c7d2d1b1b99bb19843))
- Remove control events type ([b06ef3f](b06ef3f9abac1044030dd9b3b84cd3f822a60a13))
- Performance optimizations ([b6d8b57](b6d8b57859adba781f8a391e515560a911a743f9))
- Remove casting node/edge to null on unmount ([0519bd0](0519bd0f2586efc35f2aefe7aa33124ec7efc7d3))
- Remove log ([4c86e3e](4c86e3e2bbea879390b39408726a229a0dfabd17))
- Remove unused attrs ([2157020](21570209d87d232fa8295d7ea42412d1b971e9cd))
- Disable inheriting attrs ([cd85eb1](cd85eb1842e4f5b6578e4d5eaeb5d07963640b95))
- Shorten exports ([7e80033](7e80033080ac8792846383d194c25657df0fe67b))
- Cb event type ([73beef8](73beef8079ac0208dd953215a8f8b8ade7da35ed))
- Reorganize nodewrapper ([869d88c](869d88cdcf612743c571987f3183535ed0833320))
- Reorganize edgewrapper ([3bc972a](3bc972a1d134b3652737be553d7d424087046a18))
- Update tsconfig ([5ce711e](5ce711e6d9018b3dc903942aa7c0ffb60915851b))
- Correct watcher ([6d1fb96](6d1fb963b3adfd78acfc4202b8a337a25abe840d))
- Update auto imports ([19bc4fd](19bc4fda240b16c2dbc7179f93ec1d49df5c817c))
- Update README.md ([aaccbb4](aaccbb4b3e4c2f60f96a373a285b531d2dccc860))
- Move changelog update to postrelease ([18f0d2f](18f0d2f1ce42a7aec0752852780831c5613bae7d))
- Update eslint, prettier & antfu/eslint-config ([447d24c](447d24c5a8d1a86b28a2bc1b32080446acc858b7))
- Lint files ([22845c2](22845c210da8a48dc489fcee31bd482479639e5f))
- Update eslint config ([ca552dc](ca552dc8aef2b37ea5fc7601ef4b6a347588b92a))
- Explicitly export defaults from vue files ([69ed530](69ed530198fb84044b1985f4b7e6daf639c2611c))
- Update pkg and root deps ([c396b4f](c396b4fc3cc1263504f1ccf7e492c5dc0d6487ae))
- Remove "private" interfaces from components ([75a94e7](75a94e7b2274e19f07932c44c3204a30275cf846))
- Update vite ([75390a7](75390a75e79b5600110582f36aff1445f9cdf1ff))
- Update typedoc & unplugin-auto-import ([36de50e](36de50ede916b3f9b4a9f87bbaa2725ba7aff397))

### Refactor

- Accept maybe refs as options for usevueflow ([04fcd08](04fcd082d1ef856407648b2e9c35b653705a4ecd))
- Directly bind instance functions ([7ff48b8](7ff48b8dfa2d7fbf561674acc5af9ef0037fbdf2))
- Controlled computed in minimap ([6c2c7c4](6c2c7c4fd4c8518c6c1b1ad2fc94f135a70dbf63))
- Change base edge to functional component ([f1bbed1](f1bbed1751f2d41ce742b343ca99e06612eafae2))
- Remove base edge from default edge types ([7f54d3a](7f54d3a38e6809214ad107e6691456bf7e5038cf))
- Change defaults to functional components ([8d33014](8d33014291aa5c15bd7f72e7dcd6797eb51301ee))
- Change minimap nodes to functional components ([f5174eb](f5174ebe10dd91008820c05e7e67dc7d6d6f3c2f))
- Use reactivity transform and remove store property ([e722f49](e722f49e6e5e4bb74d858aa2e3b02f18c554c126))
- Destructure props with reactivity transform ([dc1d71d](dc1d71d0bd1324ca9b2adfa6143e2fbb007718eb))
- Re-set nodes arr on addNodes ([cf7a8ec](cf7a8ec6d9cc9869ed97753373f245fff7376e54))
- Pass type component as prop ([b6848e3](b6848e37c88ab722f9de06da050572cca510d6c6))
- Defer grouping to next tick ([e2fd3b4](e2fd3b44efb64f5329687ca06eab9396b965002e))
- Minimize position change loops ([0becad7](0becad73ad7ceea67cc445cf72c9ef86bec23a9e))
- Remove scoped slot props from handles ([1b97109](1b97109b94d81d466513ef42ac8297ff996b6e25))
- Update edge type to include default edge types ([1fab031](1fab0317d5630e73a514223f200653407835a702))
- Use watchEffect for keypress ([8e91e4a](8e91e4a8e5385d2a97bc6f94d0f6fb69792aea01))

### Testing

- Update tests to work with removed store property ([2918b68](2918b689fed4b64c5d618071401d3ab705c0b7fc))

### Examples

- Add initial class to basic ([bb30db7](bb30db7c08708672e7981736c505a1f27ea3a688))

### Regression

- Reassign keys ([4e73c5b](4e73c5b2fb48d85173e4c51e11dc9fb647b10279))

### Update

- Add explicit action types ([0b23112](0b231124623b2eca03e16ea9bfa8acff8855fef5))

## [0.4.7] - 2022-04-21

[8f4d1b3](8f4d1b3beb63a86822e846aa7773672baab8dc50)...[233d585](233d585a92ac68b6b55202926a0893aa8acac9e7)

### Bug Fixes

- Selection not working twice in a row ([ec0f3ef](ec0f3ef0e428cceafc63da9523128f34aeb46d48))
- Import paths ([1e23893](1e23893e585a13780d7f95ec1255031da5df3643))
- Replace watchDebounced with debouncedWatch ([2d7e2a7](2d7e2a710fafae6f15cc3d0513782a66dcc99a4e))
- Await until d3zoom is rdy ([8c22271](8c2227132f59c01fffcc210a0afbb3631629fd56))
- Cast styles to css properties ([b206ff1](b206ff160fa2e384d037c36a639d72de0e2314c2))
- Use correct handleId ([8627fef](8627fef5af2520b4046289765b00e5f25f456fcc))
- Parenthesis in handleId computed ([38b7e07](38b7e0757d515c1d1707d775c34abcda15fd8c02))
- Trigger computedPosition watcher when selected changes ([3064e28](3064e287e75efab62eaf8657173ca4cc54345f77))
- Remove v-if ([3838ffc](3838ffc2fbc47e92509448aeff640a8188dded00))
- Return empty arrays if pane isn't ready yet ([ea69dc5](ea69dc58ee3f84f0e58ce5fb2004c328a5c337f7))
- Emit paneReady when dimensions are ready ([e14cf12](e14cf124ff26ee4f48e89976efd471a1add12c06))
- Await dimensions before using zoompan utils ([c0c67c6](c0c67c6ee6371ef31513c8ca400914cbe8b92ec4))
- Remove waiting for node dimensions in transformation pane ([ca2a72c](ca2a72c3a8b2afd98e74a005f22560e8f4026b13))
- Node/edge label type ([440ad3c](440ad3c68100cfe842897d984bdf41c0249419f7))
- Lint scripts ([3937d56](3937d564a894971adacda07ced6fc6902b7fb17e))
- Remove 'Floo' from EdgeText.vue ([1e1ee65](1e1ee65de771256334f3932e94e7f87f32c84bf7))
- Recalculate handle bounds on position change ([79ede4c](79ede4cf845bcc81d4754c0542702dd7b872aae4))
- Clamp zoom pan helper transformations ([86c72ab](86c72ab08a0c1deca0a1eb940f363537b98689b1))
- Enforce extent on viewport transforms ([f35167c](f35167ca720cbd9c1b33843ed9db9bb0e4161e68))
- Remove orphaned edges ([ee38f4a](ee38f4af9be69220c72d72d2d2e5078dff6ea7e6))
- Reactive key bindings for delete, select etc. ([5951beb](5951beb85a458082a4132970f5aa3f26d8452f38))
- Base-edge throwing attrs warnings for curvature ([8b3acda](8b3acda42e91c8822bd42c400e7652513ad77508))
- Duplicate setState on vue flow mount ([12e42e6](12e42e687111f54e8a3f47d5ec72400afe9d92cd))

### Documentation

- Add pwa plugin & update manifest ([f63e157](f63e1571ae682737af7fffbaafee9146384942df))
- Add floating edges example ([eb81b9d](eb81b9d1574cd21ab0743f39061c551137a7c029))
- Document changed classnames ([e5dbbe6](e5dbbe6b41072b2adda4c31e4a22e8b96f1956c1))
- Disable blobity for mobile ([f06b224](f06b224aa94f078e2d364072ca1b980b89e69421))
- Rename section to Selection Options ([cb99000](cb99000c9770ab84f7e726edcaf9fd0de9a15fe1))
- Update docsDir in themeConfig ([ff4f110](ff4f110f5d96b005997b7ada087f7b98196c83d2))
- Add logo to header ([4fbb16f](4fbb16f6add2c3f9e427be21e4ccedc4bf035356))
- Remove next tick cb in Home.vue ([969dd87](969dd87e7173c6dba206966dffaceb123236b199))
- Update node positions ([07ee6ed](07ee6eddf701b8a998f5f293383f6d0a5e510b69))
- Fix node pos on resize ([c4ddeeb](c4ddeebe91d367281cfbed9593f49e032e830e85))
- Fix missing handles in new connection ([8508423](85084231966353d5b2518d1fe3ad62969bddab2d))
- Add icon resolver ([dc5ca5d](dc5ca5d1d622b025c572a2feda04b06b44236fe8))
- Center intro text ([b704bc6](b704bc6e1187a67ee1eaac55266cc276af29f1db))
- Fitview mixing edges up on resize ([0184cdd](0184cdd2a9f27cbcb5a529608a6f29974d623aba))
- Update examples wordings ([d35eb96](d35eb96c1f1d95e2ba04a27fdaff96374b176f3e))
- Update guide wordings ([b94c0ab](b94c0ab607b8869cc8793cf2cf5c865d11de7f9e))
- Update README.md ([3925e24](3925e24aa18755068605ead346ea45080a6569fe))
- Add acknowledgement node to intro ([9b11d8f](9b11d8f4f2ced70c550f30010354451270cea69f))

### Features

- Promisify updateNodePosition ([bf2c77f](bf2c77fb59bba3991e073a7eaf9038e14f8cd1e1))
- Assign default handle id and allow for actual loose connections ([158be8a](158be8a515b32d9967076c350cda2a457cde290f))
- Add PositionFunc as node position type ([1e9cbc0](1e9cbc064320bc09662661843b7e819cd7a5d5bd))
- Add floating edges example ([7aa1773](7aa1773e0246d76335553f67dede8dac584f9c48))
- Allow add and set actions to have a setter input ([aae37a5](aae37a541651c9337e549fe9ee54597e77764de1))
- Add name to BaseEdge.vue ([2cc387f](2cc387fb2f66a856dd476d8b215d360854bad6e3))
- Allow node/edge template per element ([88f8087](88f808711a52ce3a9fc03097d4d03a54efc445f5))
- Add turbo to root deps-dev ([2a836d7](2a836d705ddaaf2f5bdac88817660a08c0e02d49))
- Use frozen-lockfile in build-and-test.yml ([b2d5196](b2d51969445760cfdde750100530dcaadc504d5e))
- Add turbo pipelines for types and themes ([ca5033b](ca5033b27267966cad6e6b150b9db9bae7e1eaac))
- Test pipeline ([08204fd](08204fdcbbcdfd4db6a39aa6c98a3f08c5889481))
- Add dependency to dev pipeline ([82fd35c](82fd35c315cb58b7a0cd8128105f9614581c05ce))
- Add dependency to dev pipeline ([c40d17c](c40d17c7d627a9a02ef3154cac088cc8df9d92f5))
- Add turbo repo cache to workflow ([1628cf4](1628cf4e645d1969fadc8b318491d2ff3649ae0d))
- MiniMapNode slot ([567ce96](567ce96640ee82ca2146b579999b714dd539fd11))
- Add mini map node events ([e178a3c](e178a3ce44e32b8fb1803bc9d211301ca0ad7541))
- Extend minimap node type ([2eacdc9](2eacdc9830d36d830df4cc0d9c1f9a1550c3cf54))
- Extend ValidConnectionFunc ([2d43806](2d438065235a324ebfcf9dc61e301107ad7f30ce))
- Add issue and pr templates ([7cb7eb2](7cb7eb2dfda946696b1dab0042a9af3e01133208))
- Add source/target nodes to graph edges ([a19474c](a19474c3416959ba4e56543176310d9b2a58a5bd))

### Miscellaneous Tasks

- Update package dependencies ([3be164b](3be164b20e4db6eeb66780dcb19f9a7dffbc0eaf))
- Add prefix to console messages ([06b0c14](06b0c143b5ab2926acb2c145b8eeb57b5921aad5))
- Disable no-use-before-define rule ([676c984](676c984e07fb5e87ee9e8b673f363f5d3540c623))
- Run yarn upgrade ([a0bd8b9](a0bd8b9afdd847ac7146ac2893fbbc7887308761))
- Update deps ([59870a3](59870a3a55830ff8932d0961a3f66ba134e8baab))
- Update vue to 3.2.25 ([c617494](c617494bb8dc5f341a880451d64055dcdce59bc0))
- Import sort ([c6b8aa8](c6b8aa88eaad4ddd1b23e6a5433cdb454601ce4a))
- Move ts-patch and typescript-transform-paths to package dev-deps ([c52b870](c52b870a3d6e3e59bb53bbcb41f2c8ca007d005a))
- Remove log ([553355d](553355dd861a58f647ab4f308862e7df617b3ebf))
- Remove unused eslint-rules & lint files ([f011ea6](f011ea61b11189d6ead8be8065230fa2f531b316))
- Remove export ([367c7fd](367c7fdf4017cc4197e1a8e3be91b605dd9b4057))
- Update author field ([3142388](31423889d2c0bc340add322502d01110c24f3726))
- Move typedoc to package ([e558ad5](e558ad5bc54de2e0b881f169d0c8daf694500637))
- Change destination dir for docs output ([de75e25](de75e257a5fca746e287c974584b98ac2ec10047))
- Add typedoc pipeline output ([38103a2](38103a25e014cf034f527bfb630f34d9db0cac11))
- Remove lint pipeline dependency ([4ebfb2a](4ebfb2ada5557763964e94efdfcadb8aa6732b85))
- Remove .vscode dir ([914db33](914db337cf0256979110b60336542933c131bef4))
- Update release script ([8e83d6a](8e83d6a2afdc28ececc54fd93ca0e8e4360c5f70))
- Update LICENSE ([ae4cefe](ae4cefefbc155410c2d21561e0edb0159c19494c))
- Remove comment ([e17fb80](e17fb8094b2ed14466585807ef3bbaedd788b75e))
- Type fix in examples ([efe68d7](efe68d7b547d67c1c7fe4029e1a2ad1c818c2ed9))
- Bump versions ([0dba691](0dba6913a8dbd21ee5dcc6be7ded1869ebb91de2))
- Update issue templates ([71fbc2b](71fbc2b8a4d50f79a1653738b61b76f3d981a21e))
- Update vue flow version in docs/tests/examples ([99d0627](99d062728acb93949361acc98ced630360ee0844))
- Remove duplicate keys on nodes/edges ([0a21f3c](0a21f3c06893edc03ff35bbf21d29930187acabe))

### Refactor

- Remove width/height attribute ([fdde631](fdde631f7029ff97fbd40570f9f2ae0abb6ada23))
- Remove DraggableCore component and use composable ([4f026e8](4f026e841aade40eedff26f73a0984c936a43ece))
- Remove dimensions option, replace with width and height ([8f2d94a](8f2d94ae556d5851bcc39442828c4a24a86ddd52))
- Replace DraggableCore with composable ([342d030](342d0305a6941e97a6b80349d7dadb5fb77a1642))
- Remove paneReady state value ([60feb5d](60feb5d6614f9a568a2c3deddee0a4add66ee8ef))
- Use computed properties for class and styles ([2048423](2048423ab01b7d21531938211b823df4b42624cc))
- Use computed properties for class and styles ([5f6a805](5f6a805baacbcf575cfc87319e58d25debbfccf5))
- Remove position func ([c964fb6](c964fb6b7d82d26e94eba42469cc0ae4c4d29ba0))
- Add nodeElements prop again ([6b76b8b](6b76b8be069d7e41e74bff5043696c7e3bd1847a))
- Change label-type to string | VNode | Object ([8e3fef5](8e3fef504cc0fe802ded4c0b2edac8ed4060bacd))
- Change zoom pane into viewport ([3d67d29](3d67d29347d51305ffe93c02db25db5753b40a33))
- Transformation-pane class renamed to `transformationpane` ([30d66a6](30d66a6e29b895a209815c1602451ddc7be9adb0))
- Change transform to viewport ([fcdbc21](fcdbc21d341b06ac35a240d2f384aa31133e8c7e))
- Remove memoization of group edges fn ([c1b6fc0](c1b6fc01d5ee21141298e74b1050c08071fbf147))
- Remove generics from types except nodes, edges, elements ([e3270d5](e3270d5f94935e7286f3ca2cd4e969584b09ff69))

### Testing

- Fix test checking for wrong element type ([e877643](e877643354e9304b029983b1423dd1497e3fadfd))

### Regression

- Edge update also triggering new connection ([9a5b546](9a5b5465b69b1a343d8332d4d49533f206c887f7))

### Update

- Use proper handle bounds ([bc88e18](bc88e18f22eae4c641e3ab8a7a214016cbf911e7))
- Allow void return for styles/class func ([106d287](106d2879ce282eecce6ecb086f8232f33c3e2b15))
- NodeProps comments ([817f69c](817f69ccb550e09057daca302a535ebdff85890d))
- Connection target and source as non-nullable strings ([8fbb1cf](8fbb1cf505ada13fcf6a598fb5f73ee3ee955624))
- Default nodrag/nowheel/nopan class as type ([365a8a8](365a8a80fa912db580b725cc931dd87ba05f126d))
- Typeguard input type ([636598b](636598ba1a360f74129f766ef99bd1437b166dc6))

## [0.4.1] - 2022-04-05

[1c429fc](1c429fc637f788fb7c2afb227ac4323bf81c1527)...[8f4d1b3](8f4d1b3beb63a86822e846aa7773672baab8dc50)

### Documentation

- Update vue flow version ([cc76a76](cc76a764158fd25ffbbef7c5597c44788a25bc4a))
- Remove data script and fetch data in Banner.vue ([bec26f3](bec26f3363b8db25da50ad887dc0cd34abb35e8c))

### Features

- Add name to TransformationPane.vue ([fdf2a6e](fdf2a6e0ffb3eeee5b9c3ff4674992f6408c67d8))

### Miscellaneous Tasks

- Update lock file ([cb14acd](cb14acd99a2660ac6422e13d93c207ea92d494a5))
- Move custom size check up above watcher ([908657c](908657c7ce48e5031d037e2dd03ea4ab0f27e9bf))

### Refactor

- ElementData as any type ([92a0817](92a0817c4820e3c3487d29eba1f4dc46866b1842))

## [0.4.0] - 2022-04-04

[f3b3062](f3b306297032412e9bc1b46571aada7dd26dc9cb)...[1c429fc](1c429fc637f788fb7c2afb227ac4323bf81c1527)

### Bug Fixes

- Pass all required props to node components ([c818a58](c818a5863c21c95a3c3b3b767194e24c33381f90))
- Pass parentNode id instead of parentNode to components ([266678d](266678d6a8fe9bc453e141d77707fa559cd83d97))
- Expand nodes correctly when prop enabled ([4644af5](4644af5736a5b928fe538439cd5c0bb26adcff19))
- Setting store state after init ([188156d](188156dd0bbadce65fb8fad125544b2f9a9007d7))
- Connection line style prop ([66a166d](66a166dea991e0a9f8fcd00e27bd3844b2e839f7))
- Destructure useHandle ([cd6b03d](cd6b03d4aea28ff013d66f275fc77c605656912b))
- Source/targetHandle type ([e9f4b5f](e9f4b5f0222e8ebc7c66fbf58d5a7fa0762c6476))
- Default prop value for zoomActivationKeyCode ([2b2aad8](2b2aad8cdc5dd6bb83c809af5ac654d040665d33))
- Use correct functions for center/path in simple bezier edge ([3acb43d](3acb43d0001795851f95a22461610b0901db1e2e))
- Use correct vars for center in straight edge ([6674350](66743501af762b175147d427fe8670153299e2f4))
- Check if prop label exists before using dynamic component ([f30288d](f30288da78b6ab174a768815d01d80cc918694e3))
- Missing source/target node props on smoothstep edges ([de534e9](de534e9a5f9d84d52dcc783268321333e6df6ee9))
- Prevent scroll when zoom on scroll is false ([70a349f](70a349f7e1949e8c4c2f191fc93db9004317b196))
- Edges not selected on user selection ([271d793](271d7933274ba3f4cc6fd711ebf352a4deeb74b2))
- Add no pan class name to nodes selection ([43692aa](43692aa8ef66a397fb30b4961abf0fa2dcb9689a))
- Check for scope before trying injection ([0d0ac9d](0d0ac9d2e6c93e30c54dff1a036618e883230ea1))
- Cleanup of state ([fddebb9](fddebb93938da2c034868df0b00a44d765d24e07))
- Check if window exists before binding event listener for keypress ([fa6c7b7](fa6c7b736c8d6e0c9d30b89169e6466081c0f86e))
- Change modelValue/node-/edge-prop when elements are added to state ([cb3e123](cb3e1232b2cefe4f6a1b25dad871d78245f39f99))
- Use empty string instead of null when source-/target-handle is not present ([9b94014](9b940142a74b9777b0717a4f1f39a1ee3b06c21a))
- Check if scope exists before accessing id ([e136c28](e136c28f0e631c227c7b9e0740c93bd0e98d9668))
- Try to resolve component before falling back to default ([0d6bc39](0d6bc39e4920a3e54031cca6cc47b82df49d886d))
- Prevent onClick from creating edges inside same node ([2027731](202773144f677be0183ba5b45a8f29ed2ee195df))
- Set default prop as undefined for connectOnClick ([9a87543](9a875430ec01de994e1492b94318e7c871ecf7eb))
- Store & usevueflow types ([95bc46e](95bc46e61659df1a679ac832beeced6373128b35))
- Check if type exists before using as index ([bf3506d](bf3506d50f20e37363c9bbda0afece17ef1145e8))
- Check if type exists before using as index ([c12e07b](c12e07bcda25620fb2f0df8a5d90f26a4ab5ed1c))
- Use node.extent before trying global nodeExtent ([d1e8c0f](d1e8c0f16ee8d0893475c1f9f43fcb496a098129))
- Short circuit passing slots to renderer ([74bc231](74bc231844f2abfed8eeb91eeee71ef25128fb1b))
- Force focus into node selection ([ddeb70a](ddeb70a08f2c3998e292fec7dc79a5b935783c87))
- Getter type ([73a9016](73a9016aff86717a5d307b0e6a0309c5e7692ec7))
- Use  global nodeExtent if node.extent is undefined ([8e6e85a](8e6e85a007c8cc4daff475cf1e60721339f12fcd))
- Compute type in wrapper ([546dd4b](546dd4baaf65d298410741019393cf4fc4b89ea9))
- No transform of id to ref ([71e21e5](71e21e50d9569a592b5fdb43a170cfd59a9e7dba))
- Injection missing ([ca74d7b](ca74d7b470406e82e6fdcf1baf4bb047a933d726))
- Computed getter type ([981511c](981511c76f9a6a61cff35b3b936d7dd8e9abc853))
- Dont inherit attrs on smoothstep/stepedges ([c68b1bf](c68b1bf424c84bc0798db5f53e05fe2df61b8a1d))
- Initial state tests ([a686d62](a686d62528060fbd0723dbffe034ad191695c597))
- Remove vue from dev-deps ([9b08271](9b08271696a1ad0856bbe2b649ffae8f4434d968))
- Immediate execution of watchers ([041f22d](041f22dd58ff4582fb458364d86a2a0b5254052f))
- Check for scope before providing store ([3d66775](3d66775678a7fc3ef84867d4dd5ce2f4b7c49c9b))
- Remove duplicate source/targetHandle prop ([453f155](453f155954b5f51f300dfb02ea29d64f71f10bf7))

### Documentation

- Remove usage link from sidebar ([5af3d16](5af3d16dc1ee680b83be97baa0c356e66e361309))
- Move node docs into single page ([efa7583](efa75839f93a53e0260ddc6891a2b0cf8490a2a5))
- Move blobity to mounted hook ([be24731](be24731aa1344e2ad7f2baac8a07309a2809399d))
- Remove serve script ([f912d4f](f912d4f5e8193a4f2f757428c63c5bcabbc4f412))
- Add config page ([601bb9a](601bb9a9b7e55e960982980d360c6864ad789478))
- Add offset to blobity highlights ([d9d0701](d9d0701f28c2dc35a302c18a8e3f3f4cce951280))
- Change divider color of banner to white ([114a110](114a1109924ec299885ee7ed28a8d5a79436bdac))
- Add edge page ([891eca4](891eca4a23c2507b79e283dd3f9fde32c7fdfaf5))
- Add utils pages ([75e1da1](75e1da14d75c0054d292f97c85dbb5bd6a1845ac))
- Add composables page ([0291f77](0291f771fb58795f3db290e6bfb5de30cf9a2945))
- Add additional component pages ([b2375bd](b2375bd81a3cdcd3502d3b029eb368aa00f410fe))
- Add favicons ([6d7b5da](6d7b5daadd42d2aa41229c711dadffd78e65defa))
- Add examples ([1ad66be](1ad66be474f8f4256401fa2947aeb300f7085698))

### Features

- Enable passing components as node/edge-types ([6a2c1b0](6a2c1b00d738a2fde0bf11d09cb3a2c3c2d4210d))
- Enable using a parentNode / parentNodeId to add child nodes ([9a8caf4](9a8caf444ca6396288caee3138d05582f79f3698))
- Add updateNodeDimensions actions ([0093df4](0093df43a9396f1e1464e6e5a970e911eb8fc964))
- Add onClick handler ([b42c1b0](b42c1b02deca673c7d0b76ef6211e146f0fc69dd))
- Add & export bezierCenter function ([18758fa](18758facbd8272fa25a51005a721a2f7d75c31c5))
- Add base edge ([aba67a4](aba67a485261f919b2a1739c84b4bcf9d899e7be))
- Add default edge options ([9a8bf69](9a8bf69848fde063dd4a40dd7eb4ae8802b62343))
- Add noPanClassName, noWheelClassName & noDragClassName ([c544a02](c544a02344e5444a5d0f986ae3f202bb5cbb1e9a))
- Add d3zoom event to hooks ([a5e853c](a5e853cdc34c82bbb9408060910a303ed18e2527))
- Add SimpleBezierEdge ([56f7e3b](56f7e3b0c2251674a6340d17aa0757712209ca0e))
- Add dimensions to nodeprops ([7747456](7747456771584190be568461cb24a9c07c5d2f04))
- Add ResizableNode to Basic example ([88a8ecb](88a8ecbdeb1875c5cef5774844b2588c3d24db00))
- Implement workspaces ([cd817b7](cd817b7f531e1985022aca34a02e97c2197cecdc))
- Add publish script ([57f8428](57f8428a35c29ee772c28190df9ea52076649825))
- Add path alias for local dev ([8362d7f](8362d7fd7acc4d30906db177d9cf195ba1254b82))
- Pass node slots as injections to wrapper ([4cbdf0c](4cbdf0ccc1b5ad075c2fb7298ae86445eb4f00cd))
- Use slot injection for custom connection lines ([3079170](307917011ae74ddd7090f7e328bac729352b9558))
- Use slot injection for custom edges ([3f15983](3f15983f3efab984c0c2819d5aee765804255329))
- Export apply changes utilities for options api ([d95a833](d95a83349bf5dcc9f01b5bcd57ca6d979275d853))
- Add vitepress for docs & docs workspace ([e71b9d5](e71b9d5e4851e78443fa3cdbe5bfb6912f425f3d))
- Debounce scaling to avoid lag spikes ([e97d9a1](e97d9a1dc976cecd47e50d519f6461d3bafdbe12))
- Add icons ([9230f32](9230f3279e0fb1908cbc367939de4cea4e707645))
- Allow class or styles to be bound with function ([a50101b](a50101bfd3c1dd77391d0c9d7977e6e0ebc4216e))
- Add data script ([4d668f8](4d668f8b6d13ee8da88a00cc458f8abe7a3d522a))
- RGB demo coloring ([4e8b03d](4e8b03d05915bb33c1850fab7f00f7491766777f))
- Add windicss scrollbar plugin ([631a764](631a76415222c56301347e74150494e84c3f446f))
- Nested demo ([31cb99b](31cb99b7c87bd1b681f2b4e790409a9853e6f200))
- Add additional demo ([e27ab86](e27ab862496b6164b02554b5d9d973e61e3eef68))
- Replace vitepress with vuepress ([3bbe92a](3bbe92a4ea0886f2a9ae4a2c10e35188126769a2))
- Add docsearch plugin ([4cc3199](4cc319981fc850fc8171371adac042336cdeb691))
- Add auto import plugin ([0d2c165](0d2c1658029b5824392dad11f29067473df228e2))
- Add page footer ([39683ca](39683ca3acb3b24416a253cfcf56c9e7c08b718e))
- Layout styles ([c05c737](c05c737776e2498effdeb880e1940dd43767bc71))
- Return new edge from updateEdge utility ([d02ade0](d02ade03e9a6b37e3d44dcaf3022486e72a9f6d5))
- Responsive pos of elements ([3c48913](3c48913090a4e9e6c9dee55e2df356c6d2bbc0af))
- Disable pan on mobile ([59ac645](59ac64564a61796a7ec0a8a0418f173847c49fb7))
- Add guide index page ([3bc0e87](3bc0e878a2a8a29793fcc7aa2d172d21f5dbf84b))
- Add getting started page ([13fea5e](13fea5e0a9be1adb063f2c038d06d20308bba137))
- Add theming ([e91af56](e91af5665342535e1a541fdd2a345f57cad665b6))
- Add css vars for overwriting node colors ([d179838](d179838f643bec9ee9ba10b47a96d67b18445b84))
- Add node pages ([47e3336](47e3336c01747521df4ec35bbb9728a71abdb042))
- Allow pre-defined dimensions of a node ([094c4ff](094c4ff9ae4f7a3e7ddc82976619e601ad3187d3))
- Add state page ([91416c9](91416c9898145e570bdf99e621c432059f02f488))
- Add blobity to home ([9aa42ed](9aa42ed8f8fc2a2dc7f350a6f9292a992392a7d3))
- Add cliff.toml for git-cliff ([3c838b9](3c838b9ddbe718f0742c441c334607883da05937))
- Add changelog.yml for changelog generation ([f52f626](f52f626b0e0cfc9a24bf6999640ae7940a757c5b))
- Add changelog.md ([9adf6d1](9adf6d1b09c85c9daca86d4ba646ed11c11c2597))
- Add prerelease script to generate fresh changelog ([035cf69](035cf69240332d24a0bbfe9277f67d6476cb9327))

### Miscellaneous Tasks

- Fix lint issues ([38b910b](38b910ba3bf959fe092f5bc825486b15a876ab95))
- Remove logs ([afdf0b1](afdf0b1d99a3bbc04389585e2b01620a2b6f211e))
- Remove unused var ([3738288](37382881af2c941082d2065eb9ebf16bb7e3ff15))
- Remove unused var ([095afc6](095afc63abe15c98abc578da6490e735840dd33f))
- Add comments to flow props ([8b213df](8b213dfee870080def6cd4972d21ef2d4265c2df))
- Add comments ([7623ad4](7623ad47159337d700345f58431a74b4338644c1))
- Fix lint issues ([ae28679](ae2867976c1d0388138a11f8c312ea86e5d20fdf))
- Move watcher and computed to bottom ([b46445e](b46445e204a45629ed0493ce5c9c52c2c1b4567b))
- Remove setting elementBelow style onClick ([25d769d](25d769d55361cf3ec33b03e4301e1b8b09ba8683))
- Update auto-imports.d.ts ([6d9f198](6d9f19873745dec29c3c345d80c9907d21308e51))
- Update README.md ([1fe8fd3](1fe8fd334b8ecd905ce966a673438cedef12a79d))
- Update package.json files ([1762861](1762861ab04051519a000f9de251e38ef66e59f0))
- Copy README for pkg release ([85fc6fc](85fc6fcf0f51eeab3d51528150616576231d7c5c))
- Remove README.md after publish ([7aea432](7aea432ff7251fd87a1f961a385ab839f921e507))
- Lint ts def files after build ([9539d7f](9539d7f263e607efc6bbde0b011898b72dcdfea8))
- Update package.json files ([b6216a8](b6216a849b971ea1b5f5ff714de97514e1d10f35))
- Add vite plugins to examples ([b47197f](b47197f498a0c3727a72d697669f3840d28ed829))
- Shorten provide ([4b0ac0a](4b0ac0a9b87442694f65f9c55ef5aa475d71edbc))
- Update tsconfig.json ([bf3ca8b](bf3ca8bfda63bf979d304567452740b83aaa1952))
- Add tsconfig.node.json ([194d16e](194d16e34304793df06666447922654fe2a15772))
- Update yarn.lock ([7e47da4](7e47da4de935b0e974ce9bffe5a86e4479155709))
- Add useStyle to wrappers ([444bf0a](444bf0a879a981fff35eda8497cb496075969317))
- Remove unused export ([be8d4af](be8d4afa86cbb0e2ba3d3aa981dce42a87a4a23d))
- Remove default data value from default nodes ([55588c3](55588c3988fd8eb4875e14eb423211f4ac3b9416))
- Remove v-bind ([af23f73](af23f733c025a36196a9836bf24f79e7578623a5))
- Preprocess css ([6276022](6276022eea9fba38d541e3c73be2cad85c596301))
- Add docs build script to root package.json ([5e0128c](5e0128c5f14ddb3554af6ff1e7182e103b70b55d))
- Add description to config ([d1a9abb](d1a9abbf6f9595f47831c80842c15fe99c18905f))
- Place components.d.ts in .vitepress dir ([73ce6f2](73ce6f207b9f8b4825441b69f1b7696e72cf8b35))
- Add element data typing ([4d901ae](4d901ae4e8a77d44e8ce759b0e4dce6a2f494619))
- Remove some unnecessary generics ([7d50948](7d509487c3641e69f061297031735d5c0fc6353e))
- Type fix ([9c902b0](9c902b00fbda58b086cc6f5abc24d616d91823ce))
- Update meta img ([2a7c58f](2a7c58f22aa4a9aca36b7569b7deaf027e4bf4c2))
- Banner size & gap ([c560a31](c560a312b8409f08ac2ae27342f4f0cb3bb0cc5a))
- Update algolia config ([ae18d23](ae18d231b04fb3038c2466fcafb11b3d39daac66))
- Remove max-w from examples page ([95a34a2](95a34a2ba6df5afc1f27935805b1a1d83b5e2b37))
- Uniform basic example ([ffd3b67](ffd3b672f14947449b42c8852aebe897a616ee58))
- Update sidebar conf ([88bb146](88bb146f1f97231406149ec1b5e2f041257701fa))
- Update styles ([fbff892](fbff89258c3180858df022e139b3069cbb93021b))
- Remove lighter var ([5b98f3c](5b98f3ccd890f2e7ce49b1251f9403dd14bd7338))
- Replace a-tags with router-links ([09e636c](09e636c278817bb480045d4097ee136e1fe051dd))
- Remove unused var ([7aa1f43](7aa1f4368e3c1c5dfae3d042d85e132978d5ef68))
- Update changelog.yml ([01deaeb](01deaeb3ede56823213061e58c29a8f904f15183))
- Disable auto run of changelog.yml ([94dd8c8](94dd8c8dd57084a47935d05085ce24bb3d1bf26a))

### Refactor

- Shorten default state setter function ([3539937](3539937752f241d780d18219c76632bcb4244c4d))
- Shorten watcher ([5cc0da2](5cc0da29c09140316ade884224333a4c00d7f3eb))
- Shorten setState ([7d4a5fd](7d4a5fdead38cb480121524775c6cd8762e2b7bb))
- Use null instead of undefined for optional state properties ([7280465](728046505caf60ce626883c3c96de41367ae38e7))
- Reduce node props ([35f3d89](35f3d892400de105a4ccb700ec6b623642a95f58))
- Remove node and edges export ([c75f00a](c75f00a7442aeb7ef1fec0aa5f27ba3896913fa8))
- Remove scaling from edge text ([e5f6b45](e5f6b4593ca198eb73df9a7f62c100e8fa846aa1))
- Rename paneMovable to panOnDrag ([0bb54d6](0bb54d6d36b18cf072bd7b569c12104843446457))
- Make zoomActivationKeyCode non-optional again ([4af0ee0](4af0ee02c186c8b42b3b5649bc58ca64923debc5))
- Make zoomActivationKeyCode non-optional again ([7d91aa2](7d91aa28c211f5a3fb11ec9cedb79f67f731b2ea))
- Rename selectionActive to userSelectionActive ([da2e95a](da2e95a517f8997d13ba19f571f7f5ccc3cbab8f))
- Change children API to parentNode API ([0a079af](0a079afcee20cb13d9756a97810e143b1f6ac0da))
- Remove background variant none ([aaba123](aaba123bbc029257d9d3f58fb13ea67e99142f56))

### Regression

- Add slot to connection line ([9a47c15](9a47c15662bdc5053a72d3ab73dbbd1a2954f2d9))
- Calculate handle bounds regardless of update ([0e48b77](0e48b77e148d33fb40a146edab31748e540abd24))
- Use computed to get current node/edge ([a5a918a](a5a918a39b4f053ad2f83e40901a58d5f211809e))
- Add slots to vue flow container to indicate possible slot names ([37fc1fc](37fc1fc040dddded58c327d899ad6d16338d7289))
- Removing nodes/edges breaks renderer ([528cac5](528cac5d339761c4558cafc102c762e2330e7ad2))
- Enable pointer events on zoom pane ([85f563a](85f563ac520c96461b0e5c633840c916898fb1b7))

### Update

- Set vueFlow var to null on scope dispose ([833cf5e](833cf5e489c7bb2dad125ccbe5fdbb044f61f89d))
- Remove typecast ([af5b048](af5b048391f8b04bb80e2cb531b62be420c3eddf))
- Add edge text to exports ([2b4dbba](2b4dbba737eabd745148652066b0fccd33451ab3))
- Move mounted hooks up ([024a434](024a4349181b85670189994e968ac557d4fd1ed0))
- Try fetching instance when out of scope ([544a62e](544a62ecc48bcc3708bcf8a32453066d85785fde))
- Rename update to updates (to fit arr type) ([c955d19](c955d19263c079d0e4c1df100e226204dc3a66da))
- Rename typedocs out dir to typedocs ([cc96739](cc96739c3807a86b67ca03b3948cc4322e11c9f8))
- Move examples into src dir ([c1594b0](c1594b00717cf2d0f16d9c00f3729f5f9861aa57))
- Parse style.css with postcss instead of including it with vite ([8f3a2b9](8f3a2b9d5469a8cead0b41310f708b92f59e660c))
- V-if on existing edges before looping wrapper ([9dd71c2](9dd71c25281a44a83e12430892e93506a2fec2df))
- Support fragments as node slots ([1347304](13473046670a5947ef450e2b17cf2a37c6350eaf))
- Support fragments as edge slots ([70646c5](70646c5f951173cbe104e0b2c7d533a18e151fd1))
- Support fragments as connection line slot ([0bfca93](0bfca93a7b1e883d2e2e63d6cbae7ebb79d065e2))
- Add windicss ([36e3299](36e32996810b9438ce47603cd58a8236c92ffcc7))
- Disable pointer events on zoom pane when zoom key is active ([fb1c828](fb1c828deab9786279cf1681e470fb258ac3f9a0))
- Short circuit connection line slot ([83ea905](83ea90555eb52ac3127ddc01c50cfa5a92c7420b))
- Update stress example syntax ([94e5bda](94e5bda77e901e38c27f79dbd6ac68c6450eb98b))
- Set zindex to 0 on initial parse ([9344365](9344365aff3469f8cf6af21193a3a49b549ef063))
- Color transitions ([611aee5](611aee5269ce84d287257f0e84ac4489ddba7bdf))
- RGB demo ([39c8f60](39c8f608181c8b142d981af0cfe97e3374d65652))
- Import order ([d913df6](d913df6187936dfb14fd33954bebb307b440d27d))
- Split features into separate files ([6cb13f1](6cb13f1646c921b230b5c72db7415eaf5d28339f))
- Remove logs ([349ecf8](349ecf82544a2f17e556eb885f55def3aee228a2))
- Remove unnecessary type exports ([ade61ca](ade61ca2e1bff269ad530e2162abd747b28c1073))
- Generic types ([186b96f](186b96f87d44ddd4fbf63f650988e25d4399948b))
- Fitview on breakpoint change ([6fd1ebc](6fd1ebc3c1eb72bde91c103d6f1fecfc61a7b401))
- Add button edge example ([d6b41af](d6b41afefda1b0280b9b702a74d5ea1deaeb7334))
- Footer ([39df62f](39df62f1333220f86528adcca19ef6863a3d9db8))
- Mobile styles ([13aae6a](13aae6aa3f1d0cfa824b7d9d72154596206c5e38))
- Dark mode colors for home ([6c7fde0](6c7fde01c9aa3e0842a7924184952a99f0430f35))
- Add css vars to theming page ([14ffbaf](14ffbaf1d0db7feb4238069466ee17038449885a))

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
