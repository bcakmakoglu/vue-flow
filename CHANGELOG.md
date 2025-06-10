# Changelog

All notable changes to this project will be documented in this file.

## [1.45.0] - 2025-06-10

[a16d851](a16d851894e2c4d7053e34cefd9aa3dc7522ad95)...[45225bf](45225bf973bccca97183da9f8105dcc6a3b0bf89)

### Documentation

- Add vitepress plugin llms (#1865) ([eec568c](eec568cbb77c863857af5508b287d4b1db34493c))

### Features

- Add dom attributes option for nodes (#1861) ([4c1b064](4c1b06423052923d759ecdb331f57cb0f59d18de))
- Add dom attributes option for nodes and edges (#1869) ([8fa7010](8fa70107a008de4bd9ff62763e5a242ce2a60277))

## [1.44.0] - 2025-05-19

[7ecca61](7ecca6141f7dd817b00517cee4e549fb5c783c45)...[a16d851](a16d851894e2c4d7053e34cefd9aa3dc7522ad95)

### Features

- Add ease option to viewport transform functions  (#1848) ([00bc28b](00bc28bf1b675d856f3613c6a30802d7ea9628ba))
- Add interpolate option to viewport transforming functions  (#1851) ([505fbfe](505fbfef7488d8fe98a3f2b459135794b8110633))

### Refactor

- Use shallowRef where possible (#1847) ([b792d7f](b792d7f536ec224c51aaf822cdb96baf158fb0c2))

## [1.43.2] - 2025-05-15

[96e07ee](96e07eeb9db83defd04369522e6cb2171285948e)...[7ecca61](7ecca6141f7dd817b00517cee4e549fb5c783c45)

### Bug Fixes

- Allow multiselect when input is focused (#1842) ([666e4ea](666e4eababac0b5c99e269eaa217f9f93d6d77e0))
- Use whole handle for snapping area (#1843) ([735c81c](735c81c63f4eab13b5660211c9696078e754c03b))

## [1.43.1] - 2025-04-24

[78e29f2](78e29f225950c956f936c76ffb2dc29013ddc915)...[96e07ee](96e07eeb9db83defd04369522e6cb2171285948e)

### Bug Fixes

- Add missing vue-flow__container class to marker defs (#1833) ([ae9c6a0](ae9c6a0fe2e40d62c2d663d5b68772dda8c62403))

### Ci

- Use turbo remote cache ([00e2146](00e21465547aafe64fe06da83ccccab62b07107f))

## [1.43.0] - 2025-04-23

[c24ba07](c24ba071f16f95e7149e876624b790cbc9341071)...[78e29f2](78e29f225950c956f936c76ffb2dc29013ddc915)

### Bug Fixes

- Add aria hidden to markers (#1817) ([cb588c8](cb588c8aa9dc0d9962e8be62f7e08b5b24cb836a))
- Subtract container bounds when getting pointer position (#1829) ([265f928](265f928f13c95a4944acd1f4c387941cea99c5bb))
- Fall back to changedTouches for touchend events (#1830) ([cc65f12](cc65f12af9e2fe550270acde75a759be6cc37550))

### Documentation

- Correct template syntax (#1797) ([8f5f573](8f5f57381501c0c0e1f0dd6e5248cc7eed2e13da))

### Miscellaneous Tasks

- Cleanup getHandleBounds  (#1828) ([7d9ffe3](7d9ffe3f356d9300041e7f15cf3fc9bd63d13eb9))

### Refactor

- Allow passing null/undefined to use node connection args (#1820) ([7a09afa](7a09afa12acab084d849c7134fcbbb1367ff456d))

## [1.42.5] - 2025-03-29

[f49e509](f49e50996f4d9e294b45b0125e45231acc45b3be)...[c24ba07](c24ba071f16f95e7149e876624b790cbc9341071)

### Bug Fixes

- Add button to elements to ignore in useKeyPress (#1807) ([967569a](967569aa6d75945fd5375fbaee6a4c2507af29f4))
- Filter hidden nodes from bounds (#1808) ([da6dc8b](da6dc8bdf9004fb8394c75a5fd24cc3f46ebcbd5))

## [1.42.4] - 2025-03-17

[e9168d3](e9168d30841ec0cdb15c4034a3fe89f26657b5dc)...[f49e509](f49e50996f4d9e294b45b0125e45231acc45b3be)

### Bug Fixes

- Use null as fallback id for edge source handle (#1794) ([c9fd24d](c9fd24dc827358db2cdebff95c1b18dcd155f979))
- Reset drag items on drag end (#1798) ([b85b0ec](b85b0ec66fce9500f74795f5eef6aa40ce1beac1))
- Remove edge lookup update when updating connection lookup ([05e4df2](05e4df2cb62a12cdcbe866a0007b622941d4af92))

## [1.42.3] - 2025-03-13

[d3b0eb9](d3b0eb91357fa1630f75e359f48cc9a60c83845f)...[e9168d3](e9168d30841ec0cdb15c4034a3fe89f26657b5dc)

### Bug Fixes

- Unwrap ref when checking if connection in progress (#1789) ([410a59d](410a59df5b355df17a4a66726ab6dd1a8ef0246c))

## [1.42.2] - 2025-03-09

[d7f5506](d7f5506882b4438ee04f8f08217547f38379366e)...[d3b0eb9](d3b0eb91357fa1630f75e359f48cc9a60c83845f)

### Bug Fixes

- Bind attrs to minimap node (#1754) ([acdd1ad](acdd1ad8b0ef8b5cfa501f3e0425712b37e89c65))
- Prevent pane click event when connection is in progress  (#1776) ([49b2780](49b27807401ef1f54a37c8b5d16df4517dcba6df))
- Avoid removing handle bounds on handle unmount (#1781) ([dd9c92f](dd9c92ff81af28cb2474da4f56825d43daa8a930))
- Set default value for isVisible to undefined (#1785) ([2ba98ef](2ba98efef018325a0086e82065dd44279ff1e25c))

### Miscellaneous Tasks

- Cleanup ([67b652e](67b652e159b7866eb2edb75d1324614ff7ca5702))

## [1.42.1] - 2025-01-16

[5a5b2c1](5a5b2c15d76ac6173e616b947e227f6974bfe444)...[d7f5506](d7f5506882b4438ee04f8f08217547f38379366e)

### Bug Fixes

- Correct connection keys (#1749) ([424f6cf](424f6cf63c5c9a295ca9a3a901a96838846d0701))

### Miscellaneous Tasks

- Simplify animated layout example (#1747) ([e94611a](e94611a3b0e43517af8ef3ffa4ee30e3c22068d6))

## [1.42.0] - 2025-01-12

[549d5ce](549d5cee7f6a8be784924175e6ab280b9334dd67)...[5a5b2c1](5a5b2c15d76ac6173e616b947e227f6974bfe444)

### Bug Fixes

- Hide minimap node if graph node is hidden (#1739) ([0a0d8af](0a0d8af16c2c813ce028898ee07b1d52c75ca612))

### Features

- Add `useNodeConnections` composable (#1728) ([268ed0e](268ed0e84ee3d77aab6862ad3003da6e8356c879))

### Miscellaneous Tasks

- Update license ([dbd9330](dbd9330d91b8c7f687eac1dc3f80454528b2a4a3))
- Add new sandbox links to docs ([46f3892](46f389269617f7f89872e114c3a0bac18d8a5c76))
- Update issue template ([b9c9cd9](b9c9cd9e1c22f6bb01f90931cddb61d606051f97))
- Open links in new tab ([a8f7e36](a8f7e36d9e5f5c32031614acf6791f682b9be531))
- Cleanup card styles ([1c5caff](1c5caffaad54fd95afbb665c712fd5b7965eff8a))

### Refactor

- Allow setting handleId in useNodeConnections (#1732) ([3d1b85f](3d1b85fce23da9662d33f4f197933b8c65e393d6))
- Use connection lookup to check for selected elements (#1737) ([6f3ed67](6f3ed6746303be317c5722ba9d93cf86f6f87912))
- Inherit attrs on edge path el in `BaseEdge` (#1742) ([44b9232](44b9232b196259db4dc69be930ff9437355c6dc0))
- Rename useNodeConnections params (#1743) ([f78c348](f78c348947b8fbcd4ea857f12f24dc2ece21dfc4))

## [1.41.7] - 2025-01-04

[265e03d](265e03d9f47b8030caaa4db6877af7fc63e33348)...[549d5ce](549d5cee7f6a8be784924175e6ab280b9334dd67)

### Bug Fixes

- Add missing import ([f438acb](f438acbc9f54b9f94839af6348e3919a3b770d05))
- Use center position of handle as snapping point for connection lines (#1625) ([b33da47](b33da47a3a02577b8981a544b9252174ce2bc4ec))

### Documentation

- Add edge markers example ([fe239b5](fe239b5d8fc07dae429a59a0484b6d232a18286b))
- Add docs section about v-modelling nodes and edges ([2231ee4](2231ee462604c950f3e7aba1999ec9a1e7b835b7))

### Miscellaneous Tasks

- Add ([041fd87](041fd871a12fb146faca62719ebce688865757d7))

## [1.41.6] - 2024-12-07

[d22a239](d22a2394d49318b01c1a384d73970db018caec5d)...[265e03d](265e03d9f47b8030caaa4db6877af7fc63e33348)

### Bug Fixes

- Prevent scrolling when using arrow keys to move nodes (#1698) ([04d1355](04d13551e373d7c4cce7b743a1a6e57f0e4be9e4))
- Prevent scrolling when using arrow keys to move node selection (#1702) ([600d1a6](600d1a63fd3231e533781d2d4b1ee65999c4d439))
- Update source/target node of updated edge (#1705) ([7a022c8](7a022c89c621a54c5d174647d8953b5163e7a939))
- Allow control key as pan activation key code (#1707) ([f4f2494](f4f2494fd13baebe3df73e9e49c4dd7e71e566dc))

### Documentation

- Add loopback edge example (#1708) ([4d09783](4d0978343f457278fbd82e79cdf99bf645ff75da))

## [1.41.5] - 2024-11-13

[6bb195d](6bb195da0ce074f5d581f2d7a1a41779736ee124)...[d22a239](d22a2394d49318b01c1a384d73970db018caec5d)

### Bug Fixes

- Check if dragEnd event is UseDrag or MouseTouch event (#1680) ([5a028cf](5a028cf2d401e5fa6aa5a13fa3e5be51b9f9f5da))
- Set default offset to `0` (#1692) ([129d543](129d543c4ed13396edec387ebeaa62a0217a932b))
- Allow using + as a key in key combinations (#1693) ([2e2fa9a](2e2fa9a93c149ace318dc65e1cf683ba7fb20522))
- Release key combination presses (#1696) ([4b8139d](4b8139da66753ad68bfe1bca345cd211433a7e53))
- Escape node labels (#1695) ([f7a2664](f7a266415a162213e363d0397135950a00c2d76a))

### Documentation

- Add custom components to getting-started example (#1677) ([f3075bc](f3075bc246d9fc5e26940ba010e305b9f8e617f4))
- Add simple layout example (#1678) ([61f4b0d](61f4b0d447fde0eff6324cb7d1f5ae00f9f397bd))

## [1.41.4] - 2024-11-01

[367f894](367f8947f2cf8adc8135c38d665f967f742a739b)...[6bb195d](6bb195da0ce074f5d581f2d7a1a41779736ee124)

### Bug Fixes

- If selection key code is true prevent pan on drag on left mouse btn (#1670) ([1e3acb1](1e3acb197994df60f3ac76f54dd9b8b9794a1aa5))

## [1.41.3] - 2024-11-01

[becb928](becb928c395cc5a7c2b4a883b10a26c8f9dc860f)...[367f894](367f8947f2cf8adc8135c38d665f967f742a739b)

### Bug Fixes

- Typo in SnappableConnectionLine.vue (#1638) ([a90010b](a90010b5c47cd1c5236611c8c420189ec3d480dd))
- Allow pan on drag for non left-btn when selectionKeyCode is `true` (#1662) ([fe552fc](fe552fc5c5843a67e38da0054598f9451ef76d95))
- Use all handle bounds in loose connection mode (#1665) ([cfc2332](cfc233237048c20b89c3aae294314788a0b8a1e0))
- Start patterns at 0,0 (#1666) ([900850d](900850d3ae0dd8957745a6e8b265dda7337f8487))
- Set `isPressed` to `true` on `blur` and `contextmenu` events if permant keypress is enabled (#1667) ([72e0e2e](72e0e2e97eff0c1b96b7fa32a5eca30f70dc4630))
- Allow pan on drag for other mouse btns if left is disabled ([ecd21ce](ecd21ceebb605760294ecd4c668915ff96fc77a6))

### Miscellaneous Tasks

- Update deps (#1633) ([de6f042](de6f042826f0149153a06517dc8b00169d0d1f2d))

## [1.41.2] - 2024-09-16

[524d812](524d8129451edc7c40db5366ecd8113ad7dd99bd)...[becb928](becb928c395cc5a7c2b4a883b10a26c8f9dc860f)

### Bug Fixes

- Allow pointer events if mouse evt listeners exist (#1618) ([6338a9d](6338a9db067fcb7a8f6077a90450066812466875))
- Calculate distance to trigger drag-click (#1624) ([6cc3042](6cc30429b54715650ccd7851287cd0f142daba44))

### Miscellaneous Tasks

- Correct prop name ([a1bfef8](a1bfef80162dbe9101c7eb8945ba816afd0e4d03))

## [1.41.1] - 2024-09-06

[c555dfd](c555dfd987b32f312c4003d3b53f094fa5bf71b9)...[524d812](524d8129451edc7c40db5366ecd8113ad7dd99bd)

### Bug Fixes

- Prevent overwriting size in node styles object (#1608) ([f4bde90](f4bde903028d07105b65d3aa8b95b88562349755))
- Prevent drag click when multi selection is active (#1609) ([43ed0a8](43ed0a831801d507697ff8831ecee6cb44036ba4))

## [1.41.0] - 2024-08-30

[b3e457a](b3e457a35a33892915b4cb9d27c268770bef048b)...[c555dfd](c555dfd987b32f312c4003d3b53f094fa5bf71b9)

### Bug Fixes

- Don't set user selection flags on pointer down (#1600) ([eb12bdc](eb12bdc56ff107241fb88e1bd12eb49df93c9bd7))

### Documentation

- Add info on setting up vue project ([f4bffeb](f4bffebcb13dd894375a9ef340289ccb8005a9e4))
- Add info on listening to events ([a7a9fd5](a7a9fd5d0aadec995147b69fce098972c0650cdf))

### Features

- Add getHandleConnections action (#1595) ([9c003d4](9c003d4353a4bbfe7d9a4d8ac7f8ed3e708c3c29))

### Miscellaneous Tasks

- Cleanup ([57e868d](57e868ddd8249460f7e2bb507e333ec294e93bca))
- Remove old migration guide ([f24230a](f24230a01007fc08ff2b083aaa759718ed6272cf))
- Update deps (#1598) ([564d593](564d5931a5045c8f7dd039ee157bdbf2cf28acda))
- Update `useHandle` docs ([940b08e](940b08e080cd987fb226ee017a88603ec47c815c))

## [1.40.1] - 2024-08-20

[538b03e](538b03ef6b94d252410cca563428eb8288eba711)...[b3e457a](b3e457a35a33892915b4cb9d27c268770bef048b)

### Bug Fixes

- Inline event names (#1591) ([47281fd](47281fd66868da5ec389dff2990df7e77526c41a))

## [1.40.0] - 2024-08-19

[809a9a4](809a9a4e16ba4b8cae4159c259ec6a9da0f42954)...[538b03e](538b03ef6b94d252410cca563428eb8288eba711)

### Bug Fixes

- Correct controlled flow docs and replace `applyChanges` with `applyDefault` (#1574) ([876c198](876c19868f6b21f600c33b16192a5d2c1fb9256f))
- Simplify event emit definitions to avoid hitting complexity limit of TS (#1585) ([ebc604d](ebc604d9803d53b8eb78ae68b727aa7b216ad6b3))
- Only display grab cursor when panOnDrag is on left mouse button (#1586) ([e90f4cc](e90f4cca57415ad068eec777fa1bbe2f8b70bd75))

### Documentation

- Update layouting example (#1576) ([2976b11](2976b1102528a88f7b367d9c660130f2b9d078b9))

### Refactor

- Remove null as return type of data in `useNodesData` (#1575) ([1d772af](1d772af4a4c6424af570672372025617bebbc686))

## [1.39.3] - 2024-08-06

[faeed3d](faeed3d6be9fe29c30a71ae09dbd056cc9445ad2)...[809a9a4](809a9a4e16ba4b8cae4159c259ec6a9da0f42954)

### Bug Fixes

- Push into changes arr instead of using index (#1569) ([afa8861](afa88610edcf573d339c13f06d20c1a94d4572b1))

## [1.39.2] - 2024-08-05

[90a289e](90a289ebbd29812657a64f9268ef23ce851d8462)...[faeed3d](faeed3d6be9fe29c30a71ae09dbd056cc9445ad2)

### Bug Fixes

- Only capture pointer if valid selection has started (#1565) ([a8d837b](a8d837bf93fb201b1805a2a8be79ed1084f7aad1))

## [1.39.1] - 2024-07-27

[d9a133b](d9a133bd0169be8c4d5fb4ea5807d83b24df291e)...[90a289e](90a289ebbd29812657a64f9268ef23ce851d8462)

### Bug Fixes

- Check if injected state matches options and scope id (#1562) ([fff558f](fff558fbc313d422716d8e5c9ec7255360cbb102))

### Miscellaneous Tasks

- Enable sitemaps (#1554) ([6d9535a](6d9535a1a938382aafb9ad94db7a1bb9e2e51aba))

## [1.39.0] - 2024-07-15

[f2ecf29](f2ecf29cf8fe0f308768e5db6e28020ea3decd82)...[d9a133b](d9a133bd0169be8c4d5fb4ea5807d83b24df291e)

### Bug Fixes

- Dispatch click if drag move was attempted (#1534) ([8539731](8539731a8acba83a5b39b41e1745d75bd5e25ae1))
- Handle pointer capture for selection on drag (#1543) ([f329831](f32983116d89e0ba12e3ae0cf22ac675c9ae0ade))
- Prevent calling selectionEnd on selection click (#1545) ([763f107](763f107aade5ac4a3ba3256589746d8ab2fef266))

### Features

- Add autoPanSpeed prop (#1535) ([d4ccb11](d4ccb11a4ccdf772604451793a29fcada07fb39d))
- Add paneClickDistance (#1542) ([180109c](180109c0ca6bc5609c2e557d7c297bda5eb39ed1))

## [1.38.5] - 2024-07-09

[0814d42](0814d423bc80e84e6045b51684b42464ac0f2ad3)...[f2ecf29](f2ecf29cf8fe0f308768e5db6e28020ea3decd82)

### Bug Fixes

- Ignore minor drag movements when marking aborted drag ([dab5ab4](dab5ab4bbfcced0993eb6cf989daa8c613cca645))

### Miscellaneous Tasks

- Add ([f63e0ef](f63e0efd0abe5cdb2c19ddac8b44c9a56ac38125))

## [1.38.4] - 2024-07-08

[d368263](d3682639049897fecc72c50a60ca9d8d23cdb28e)...[0814d42](0814d423bc80e84e6045b51684b42464ac0f2ad3)

### Bug Fixes

- Emit node click if drag was aborted (#1525) ([9d14595](9d14595f1d318064f41603de704b970a0129bcf2))

### Miscellaneous Tasks

- Cleanup deprecation notices (#1527) ([0a0dfe9](0a0dfe96f1826e11ea105bd857e21cb5ca84213f))

## [1.38.3] - 2024-07-08

[50b32ef](50b32efc7d40b2a6817d4472f297cb276ec2a01a)...[d368263](d3682639049897fecc72c50a60ca9d8d23cdb28e)

### Bug Fixes

- Remove backdrop filter ([45c5961](45c59612f3d301bf20b9d9658d0c0af521706a23))
- Emit node click event when drag was ended with no movement (#1522) ([4548021](4548021b7492b1b99985d961373a87c841e9e79a))

## [1.38.2] - 2024-07-01

[d3b706e](d3b706ea982be641396d3b625bbb8dc9270f3f3d)...[50b32ef](50b32efc7d40b2a6817d4472f297cb276ec2a01a)

### Bug Fixes

- Avoid re-snapping to same handle (#1514) ([9154687](915468741067f5f832644ad7436843b43b15c411))
- Use post flush to re-observe nodes after toggling visibility (#1517) ([d8ddc4d](d8ddc4de6e2c66939c35d5725fc7c18c2ff4bd99))

### Miscellaneous Tasks

- Upgrade turbo to latest (#1472) ([8f53488](8f53488995719ee19a61af84fd8fc27dfe784199))

## [1.38.1] - 2024-07-01

[d0728ac](d0728ac7b0653a8077d3e111820c514cd2ce8bfb)...[d3b706e](d3b706ea982be641396d3b625bbb8dc9270f3f3d)

### Bug Fixes

- Correct calculation of nodes inside selection (#1509) ([c8b5522](c8b55223b940684021eb9b87896ea73013a676ff))

## [1.38.0] - 2024-07-01

[e2dec5c](e2dec5c8661b0e64799b3e95ff373561f49b19ba)...[d0728ac](d0728ac7b0653a8077d3e111820c514cd2ce8bfb)

### Bug Fixes

- Remove v-memo from edge renderer (#1506) ([a52ac6e](a52ac6e90e998d9d6931f79461ad873c94b4932a))
- Correct pane pointer evt handlers (#1505) ([e57f22c](e57f22c185bf95f6c2c3a7cb5fc2d84eca4340f5))

### Documentation

- Add section on changes ([3ca9aca](3ca9aca72b6070c9512c28aba76b5375577ff4cd))
- Add info on handle limit ([ea59a71](ea59a7176ecbe276a8209465b7fc7cfb60cf342d))
- Add info on connection mode ([182a6d9](182a6d9263e3853630a448463e34cc54f08ea4b0))

### Features

- Make `useKeyPress` public and export it ([e435485](e435485b77ac3d3c5eac78f7d40c23716fdcbc2e))
- Allow string array or object as class to node/edge objects (#1502) ([410765b](410765b87b24ddab6ff28825f48532ff78188631))

### Miscellaneous Tasks

- Cleanup ([e94e0e8](e94e0e879cf51f2899fff73bbdee72a33a827a27))
- Add info on v-model ([04524d2](04524d27fd8b48145dc48093938771cc38285e95))
- Add ([e1e5282](e1e52821910e324e102c3a5c9f68937fbd4f9b66))
- Cleanup handle utils (#1497) ([8454dca](8454dca6d446813ee1e10980801e6cf6f38c3522))
- Cleanup pane (#1507) ([266f874](266f8744ad3e7bbaca599f99294b08d2da313c9b))

### Refactor

- Replace `until` watcher with `onMounted` in handle cmp (#1488) ([cf32d59](cf32d590746d7ee163c311d8ac7f2f8914812846))
- Allow passing target to `useKeyPress` ([ea75f8a](ea75f8aac0cbc2cfe962c460f435a834a8c8a5b7))
- Use pointer evts in pane and prevent cancel of selection ([4effbb0](4effbb00086b29750cffdbb0bd2abceb688804e8))
- Calculate correct handle pos in handle lookup (#1494) ([09e2221](09e222124c8c84584d623f9589d66be542891025))
- Remove useWindow (#1504) ([545bb4e](545bb4edf5f2f5fd12fe180f7fb3ab5f013a4334))
- Use correct end handle position in connection line (#1508) ([3489fae](3489fae8fec2109d05b0ac14e245964e60a082a8))

## [1.37.1] - 2024-06-18

[fdc656a](fdc656af9d2b555fb6aa420dfee301d8c5767bfd)...[e2dec5c](e2dec5c8661b0e64799b3e95ff373561f49b19ba)

### Bug Fixes

- Correct id access in useVueFlow (#1483) ([e2ce205](e2ce2053e41694e1f62b7d82b9bd0c2924c90926))

### Refactor

- Upgrade node to 20 ([14ae927](14ae927a6477f8026767028a1b5c76990556cd02))
- Remove qodana scan workflow file ([aab43d5](aab43d52475d98f8f3238880df57f3e625a49e15))

## [1.37.0] - 2024-06-18

[09a44b0](09a44b0424d089d8a6e93adfeed1f1e03b708c8d)...[fdc656a](fdc656af9d2b555fb6aa420dfee301d8c5767bfd)

### Documentation

- Add handles section to guide ([c30222e](c30222eec355d8a599f6ed5e85803063ec1512a9))
- Update handle docs ([532d522](532d52232d854f5efdb960f8034d72fe5864f0d4))
- Update edge utils docs ([070d78d](070d78ded43b73152daa66fd0444a80fbb6c82ab))
- Update prerequisites ([96ec3e7](96ec3e744ca47cfd32ce6a88216297237dd0389f))
- Update getting-started page ([1bacc92](1bacc926ed4e2d790763156de302bfc6ad2d53b7))
- Update theming page ([d51203c](d51203c4653fb525bd55d46274cfaac7a9d03499))
- Update nodes / edges pages ([76fe779](76fe779f346a3fd9f2e725c0897f2bedd4a87d58))
- Update controlled flow page ([c7049e3](c7049e3216d86f3d62b0787c6a95a668ccef16ce))
- Update config page ([20d18ee](20d18eeed206211c97dad99df86cecc22f88fa2c))
- Update state page ([7f2917a](7f2917a752b330cc48dfdba124fb558bf9f96e14))
- Update troubleshooting page ([865fe72](865fe722db8941b10eb9fecfeb2b4e1536f716e0))

### Features

- Add EdgePathParams type to edge utils (#1479) ([9b4e3b2](9b4e3b26568c3833d7a8866bdcbb251d37f43ea8))

### Miscellaneous Tasks

- Add state injection section to `useVueFlow` docs ([fe55415](fe55415b2da39bc7540c9c99b0605694c5c8bb24))
- Update README ([202d767](202d76777d08e964e088f6f7433a9a3156914ef0))
- Fix typo and update title ([ff05551](ff055517cd30567ffb824a782e3468dcb2a140d4))
- Cleanup v-model usages ([889797e](889797e684a5963a0f7e50d98fb39ce0f7b9b1d1))
- Update validation example ([55a76cd](55a76cd9ad02a273c22386b30a7183752cb70bf5))

### Refactor

- Use empty arr when updating all internals (#1476) ([cff55c8](cff55c8ebf8005446a0aa0c9d8c50a6c5240db4c))
- Add overloads to useVueFlow (#1481) ([4fe1a7b](4fe1a7b5414644e2ce8c524348b3522bde6db4ec))

## [1.36.0] - 2024-06-12

[dd6aff2](dd6aff24cbe5bd2e1e5ce36350e1b5261c0d42af)...[09a44b0](09a44b0424d089d8a6e93adfeed1f1e03b708c8d)

### Bug Fixes

- Add width/height to icons ([6ee3170](6ee31708ab642c3ab6c8eb1a530c147579c874c1))
- Hide graph until initial fitview is done (#1459) ([ed2e574](ed2e5744fd5264600c0f6d2c1d42612f27c6f456))
- Event type ([19df6ca](19df6ca57a55dad5c01229be822baf83faf67b2f))

### Documentation

- Prettify example css files ([51986d7](51986d7c6c767dd7a31df8b97eca04b590c81839))

### Examples

- Update pinia example (#1458) ([6503b3e](6503b3e9ed0cf125de3564f7d5ea1208489fed48))
- Add screenshot example (#1456) ([f74be96](f74be96b2d54003b5fff1901cbf609b0bd5ad456))
- Add math example (#1461) ([a8ba973](a8ba97331f49e5fbd3f9e5c8b656ff87e2712823))
- Add confirm delete example (#1466) ([257c7aa](257c7aa7041cb5a4a69f3a210dcb86b3259e6c85))

### Features

- Add updateEdgeData action (#1452) ([49dc8ae](49dc8ae2a1b8a2621c8cb8025e4c04d61808bb58))
- Add useEdgesData composable (#1462) ([a9ccd61](a9ccd61eecfabb942ae18fc66e6bfb4e691a9781))

### Miscellaneous Tasks

- Cleanup math example ([67da354](67da35491711c1433c31dfbbe1b3df6a7e5731b4))
- Correct header styles ([ba43421](ba4342167492865e5c45bc7cb2a484bc8d7c2a2f))
- Update repl vue version ([50a3b0e](50a3b0eab5694b6e7eb4dd755df6f99364577f7d))
- Update save and restore example ([5e953bd](5e953bdb44cd60e91a19293644af8b1e32d94e64))
- Update math examples styles ([ee8d30d](ee8d30d1cf2504c316c0ef6de586e6307a520097))
- Update interaction example styles ([01e1b32](01e1b32104e2a93655c00971284d36627dd5d92f))
- Update visibility example styles ([78f2635](78f2635c5ee1d3160deaa196eb60cfdda009c24e))
- Update vitepress to latest (#1468) ([5dc8711](5dc8711a6bf2535ec3bf3069d7a0eed2674e5463))
- Update example styles (#1469) ([d71de0a](d71de0a92d8c16c780d869a66de0a80dacb73c63))
- Update deps-dev (#1473) ([a647472](a647472db4fba463dc1bd345dee7937fd3607a3d))
- Cleanup unused event arg (#1475) ([850f54a](850f54aebd745fe445e4de2d932595112d5fa249))

### Refactor

- Reduce node bounds calculation (#1453) ([cd5103e](cd5103e5259dfe733578ed47da81864297752588))
- Use for loop ([9a7e4ac](9a7e4ac9529e8308dcfb90c3271a9adb8bd475c0))
- Remove initialized from graph-nodes (#1457) ([0c5dfdd](0c5dfddc47b3931a000c860f21cf540cf9ac254a))
- Remove node intersections arg from drag events (#1460) ([0825101](0825101ebe8ef7e6fed8edcacf1f384e2d12128f))
- Remove connectedEdges from node mouse events (#1464) ([798faf1](798faf1be4dae3ea29a39bd03799b795ff189386))
- Deprecate `useVueFlow` options arg (#1465) ([70b39cc](70b39cc78e0fd6c561aaf86c41970a56511184e2))
- Replace arr reduce methods (#1467) ([d658c1d](d658c1d357b05e69bd5e8c0410f58492837c1dd2))
- Cleanup connection line component (#1470) ([d429394](d429394f42334493522c7f45740d988d52d5d2e5))

## [1.35.0] - 2024-06-06

[c91b30f](c91b30fc1eb725848daf68b1e309efc52c683abe)...[dd6aff2](dd6aff24cbe5bd2e1e5ce36350e1b5261c0d42af)

### Bug Fixes

- Disable zoom on mobile when zoomToPinch is false (#1449) ([1b5e14a](1b5e14a5b831ad949df8ff59faf6af092cfd7185))
- Disable drag when using multi-touch (#1448) ([8bc1c99](8bc1c9925272c4ed2b5a8679a4e1c35a348f24c0))
- Use computed edge ref ([faf67c2](faf67c2b55d7aa4bb243e238897ba7c3944505c5))

### Documentation

- Cleanup examples ([a220161](a220161876d6c8ac96207b22f5d045c739d17b0d))

### Features

- Add edge id to handle connections ([1bb7a19](1bb7a19e1ba2354f96519694b6e91304b853e461))

### Miscellaneous Tasks

- Add ([0d971d8](0d971d89b6c722e406e4e238d85ccf874b0110d8))
- Add todos for parentId ([5703647](5703647290ab954baaed3a6db81a9ba673f0cdb7))
- Add ([688f886](688f886f9b9e020aa7e1ab775a82e3bf0f495c95))
- Update ([329be6b](329be6b60cca371c52e515e52083df610eab82d7))
- Add ([e5508bc](e5508bc8eb5c2fb633ad8469ea09d947b9baca61))
- Add ([0c1bd1b](0c1bd1b204e9da679ad3e3fdf4217d8e4cc9b248))
- Cleanup ([25bb585](25bb5852204df82f95d13bc0f4d87a90be126af8))
- Add missing container class name ([40f2421](40f2421dc9bd6e89b608c5e4a308e70ec77e6fc1))

### Refactor

- Use `vue-flow__marker` on marker defs el ([5d3f87f](5d3f87fd5681701d14c2a21f6bec40b3e4ae22da))
- Remove auto-generated handle ids ([c822f9c](c822f9c632c1251f8b9e976b65d4a32c64b8cb9d))
- Check if starting handle exists ([660831c](660831cc377798b26ce6d3fb977ea721b30eec4e))
- Use all nodes in node renderer ([ea45545](ea45545835d9880ff25eae2687ac28580d2798c4))
- Render null if node is hidden ([3498399](3498399ef763330fd4ff6e9e668a13b752e81fac))
- Render null if edge is hidden ([5e9db1c](5e9db1c87fbfef3fd52c372f9162a37dbc94e8ac))
- Remove hidden check from `getNodes` & `getEdges` ([cc0b8b6](cc0b8b69a32692c7ba71578d0bdc59793be7a20b))
- Use node/edge id as only dependency for nodes/edges list (#1447) ([876b71d](876b71dc19ebf0be16e7dcc5627c3bbc68aefbb5))
- Use node lookup map internally (#1450) ([a592fbd](a592fbd78a231717b24e314708d630d5f16ff0bc))

### Testing

- Update handle ids in tests ([82d9991](82d99915d3914a5736864fcf1ae041f620e9fc3d))

## [1.34.1] - 2024-05-31

[2443752](2443752e82d0c26130358102ed54fc146a067b4c)...[c91b30f](c91b30fc1eb725848daf68b1e309efc52c683abe)

### Bug Fixes

- Use separate prevConnections map ([cd36279](cd362799e4adde84db08a11e3b25a885687f6a0b))

### Features

- Add `maskBorderRadius` prop ([bbd44bb](bbd44bbb10e26996ce1cc6da0bd3e696d156772c))

### Miscellaneous Tasks

- Add ([ac5e69b](ac5e69b2c88b642655793aee319e98878960d23b))
- Cleanup ([1a87312](1a873124348ee2de5263a6009f4a9c1fe8ad9d7f))
- Add ([860570e](860570e1dbd7374ac98a5438eadc82cd3f452e3d))
- Add ([dc3ef70](dc3ef700f28d22b7facf1b4dfac5f7d89eb74c52))

### Refactor

- Replace array fns ([02f3ca2](02f3ca2ba03161844c0c43babe121eef5ccf1007))
- Replace array map ([5c2f150](5c2f15061ebb3d6bc3943328abb3b0451d6baa39))

## [1.34.0] - 2024-05-28

[20d2d6c](20d2d6c0f7d5542229b1109a72203b62e77fa839)...[2443752](2443752e82d0c26130358102ed54fc146a067b4c)

### Bug Fixes

- Allow `PanelPositionType` as position value ([c59803e](c59803e6cc5112411d29291fbdcc5f5c2ab7df90))
- Allow `PanelPositionType` as position value ([1c4e208](1c4e2086275c4aaeae14e02b9edd109c9d421d29))

### Features

- Add missing styles warning ([8a8c8f5](8a8c8f50bf74cfb44b41e8e3115562e0e5a5c251))
- Export `PanelPositionType` ([6bf4107](6bf41079edace17d1c8140415ae9823faa247204))

### Miscellaneous Tasks

- Add ([2e2c389](2e2c3896539f0986e1fe1ef649967d44ce922c9e))
- Add ([f698b2d](f698b2dbcc69e80f130969a5e37d97f80ee340a6))

## [1.33.8] - 2024-05-15

[e857398](e85739803b364f026391df4e395aec37f8199d3e)...[20d2d6c](20d2d6c0f7d5542229b1109a72203b62e77fa839)

### Bug Fixes

- Set specific pnpm version ([7267baa](7267baa31c25c4d4a0ac247af85a597a740027b5))
- Prevent auto pan if set to false ([96b78ce](96b78ce19dfc9b478104bad6bf71549d955afeee))

### Miscellaneous Tasks

- Add ([da32e16](da32e165bdba1a44249787e505ff59efb5e03f71))

## [1.33.7] - 2024-05-12

[4cdf5f2](4cdf5f2affef1a8070d0224da408eb6c6e562eda)...[e857398](e85739803b364f026391df4e395aec37f8199d3e)

### Bug Fixes

- Allow wheel to bubble if not used by vf ([7f51fae](7f51faee45a4ce815ea02fcc08878a149d5b7815))

### Miscellaneous Tasks

- Cleanup reactivity transform ([8d3887f](8d3887f615b9523349ba43b17f7db27d3f27989c))
- Replace `dagre` with `dagrejs/dagre` ([f1bd5b5](f1bd5b5eeffe74806b0432096a34ddc592563ae0))
- Update pnpm version to 9 ([1206308](120630869322ec079c192c715f8666e4a28d3e24))
- Update pnpm version to 9 ([cefd802](cefd80244000bfac182a4e46b2ffd1c0c8cdebcc))
- Update turbo to latest ([f059ba2](f059ba2ce813ec3285ca118efe009952258becd9))
- Update node to 20 ([880fc15](880fc15017d126bc3fb1af41bc686e7e3c46c85a))
- Update package manager field ([6e64229](6e64229b078b7058348c3563d0c785d946944fa1))
- Correct dagre import path ([adfc01d](adfc01d1f35ea8138b021eee2b2701f10857ed1b))
- Add ([afdf1a4](afdf1a4ec693b141ab47fac1ae9945f7a5718a5d))

## [1.33.6] - 2024-04-29

[09009ce](09009ce1e611d1ff089277f51a951143ca600e95)...[4cdf5f2](4cdf5f2affef1a8070d0224da408eb6c6e562eda)

### Bug Fixes

- Set ltr for vue flow wrapper ([590afc8](590afc87f4c562dcda7533976eca77c1513f61fc))
- Allow pinch-zoom if preventScrolling is disabled ([ffb649e](ffb649ecbd91b22e9d36e11bea677ec8ea0f96c3))
- Pass path options to edges ([464dc58](464dc582dc865e447fc8b7afe4dfe16ffd5300db))
- Add options to useKeyPress ([b0f1bf0](b0f1bf0b851b1972db57557776908b8a075a4efb))
- Prevent delete action if inside input field ([84969ab](84969ab45168c7f0807d11a3882324b38e6b1a1c))

### Documentation

- Replace `source.id` with `source` (#1369) ([11229e4](11229e4dc417c3f22ec2e291ada6f728793d2075))

### Miscellaneous Tasks

- Update README example ([1f1792b](1f1792bd096af123dca45cab56843fc83d37c176))
- Add ([4f0f62a](4f0f62acf4b6c99f646e183e208781a3f28cdd92))
- Add ([bc94cde](bc94cde934c7daae6e3ac07d0d9ba36a6b6c5da9))
- Add ([f3c1ac7](f3c1ac7ddc57c663064927b4091140ed24b0a28f))
- Add ([40e4478](40e4478be9de5b3513f7033314f16b5fffe0759a))

## [1.33.5] - 2024-03-24

[e776844](e7768443ba675c258b92527af36798583823d783)...[09009ce](09009ce1e611d1ff089277f51a951143ca600e95)

### Bug Fixes

- Store vf instance on vue app for ssr ([3170022](31700221f26cdb2e3d191f366c07ab200e828f85))

### Documentation

- Fix custom-node example for safari ([b2d37e5](b2d37e5a8c596c1200eec456f2ebf75b1ffa6fdb))

### Miscellaneous Tasks

- Add ([7939ca8](7939ca84b3ba5b043d58dc8019f9da9415d7a359))
- Cleanup ([31c0f82](31c0f82efedba49aea65e6612780cd530fd9c910))

### Refactor

- Remove reactivity transform ([f858d13](f858d139091a17cc2102abe3e40d0df930e0f1e4))
- Move storage to separate file ([0a9e950](0a9e95007754c3ac0b511811b7be8c95882fd26c))

## [1.33.4] - 2024-03-06

[e2bae63](e2bae63fdd8db36ac7779638144bd423472d5c6d)...[e776844](e7768443ba675c258b92527af36798583823d783)

### Miscellaneous Tasks

- Cleanup ([5df365c](5df365cd63e1c4d80b70ea092cda98282eac650e))
- Add ([28cb081](28cb081a4ea51b2952de97ab34d6b4d22cd9b555))

### Reverts

- Revert extending events from separate interfaces ([e06d2e6](e06d2e6a239235ff27ff907a1efb5a6d3a0a11f3))

## [1.33.3] - 2024-03-06

[8a99069](8a99069621711bf05cebce717a6ab8d71f349755)...[e2bae63](e2bae63fdd8db36ac7779638144bd423472d5c6d)

### Bug Fixes

- Use separate interfaces for node/edge events ([4e50efe](4e50efe8ee626d270f501dc59c561b91296b9065))

### Miscellaneous Tasks

- Add ([c339058](c339058dcd3d6d1b6d6952aeb88d011dee106288))
- Export interfaces ([75eb364](75eb36412785a31431cd88f6e9f4d99aab6e3815))

## [1.33.2] - 2024-02-28

[41e0c0b](41e0c0b4ccefbb606fbb218c29f9530eaa3c5a52)...[8a99069](8a99069621711bf05cebce717a6ab8d71f349755)

### Bug Fixes

- Remove `ref` prop from `BaseEdge` ([ba90a48](ba90a48553c82f8ad5d2f9f0c1fd37fd11e46d30))
- Use nullish check to fallback to default center ([a8c09a9](a8c09a90dafb8e699ac466a2b26e2a40f8c61d2c))
- Check if dimensions exist in `useNodesInitialized` ([3ed91a0](3ed91a0055793e5bab7ae86da01e0159e1e0af71))

### Miscellaneous Tasks

- Add pre and post publish scripts ([d5587f1](d5587f196a6c046a6eedb0cbd4a89a2fcf00386b))
- Update custom node example ([0f51e2c](0f51e2ce24ff1a9be8500925f4fd330d6a62b6cb))
- Cleanup dnd example ([01e3df0](01e3df04a973e79cd0cb594283aa84999e6198ed))
- Add ([c0e2b96](c0e2b96aa88314e5d0b0279082b01a5947a4735d))
- Add ([78f9f61](78f9f61c12999b05718c50720b616545a0b09576))
- Add ([d7dfcc3](d7dfcc375e9b6f6f1804205048fa7b93b560e010))

## [1.33.1] - 2024-02-23

[8e69e1d](8e69e1d036175b95ecedb02bfa996f4801a2a107)...[41e0c0b](41e0c0b4ccefbb606fbb218c29f9530eaa3c5a52)

### Bug Fixes

- Correct typing of `useNodesData` return ([1184941](1184941900712877282af052c32f3fd8341f8ef7))

### Miscellaneous Tasks

- Update layout example ([7b39b45](7b39b45641bf171ba55d171adea80d264acb3cd6))
- Update nuxt example ([c7957df](c7957df0e91c92a0978f90b15ac0881db7d58af5))
- Add ([d2f4271](d2f4271b2d0eda90a2d728ee6ffd03953985f844))

## [1.33.0] - 2024-02-21

[8fb6aba](8fb6abaed0563f7aa748ff5d596c5e91d0cfc861)...[8e69e1d](8e69e1d036175b95ecedb02bfa996f4801a2a107)

### Bug Fixes

- Correct prop names for node guide (#1321) ([e64ab35](e64ab352e871daf0df993ae2d10cdb4ab443f5ef))
- Prevent esc keypress when a11y is disabled ([f815ef6](f815ef6dd5855409cddff50d21b62a84941fd0f2))
- Use default cursor and apply drag cursor if node is draggable ([c48d3c9](c48d3c9be3060b7a0149e768a38377a02c49d143))

### Features

- Add type and id to `useNodesData` ([68ba907](68ba9075e93a5ae766dc64b68eeaa121e9b77b14))

### Miscellaneous Tasks

- Cleanup pkg json fields ([978d180](978d18071a2fea3b1460c533b65c56691ee27548))
- Update README.md ([c24287d](c24287d4fc44901a2e5937d25a160d8f19f20afc))
- Add ([5336209](5336209a69be31fc72b89f5f69e811fa08424d18))
- Add ([bb8fc95](bb8fc9594b79c24fc67409091ee054a918ab1262))
- Cleanup ([c7313ca](c7313ca421916691cfa1da9cf905649f5e8f411c))
- Cleanup ([df591b1](df591b1295cfd7b6c9f6ad902e69f5ddf0e8e9a0))
- Add ([54b3f22](54b3f22066245d3b753623d0b71992409f7f5e71))

### Refactor

- Replace vueuse imports with vue ([e5a8465](e5a84656ad368f7e745f1992de4c38a97c579716))

### Testing

- Update `useNodesData` tests ([4666fec](4666fecc39d42fd9f9c6087e1e8fd25933af91ac))

## [1.32.1] - 2024-02-15

[303419d](303419d4b2dcfb6b6497b781e7c7121060ee73cd)...[8fb6aba](8fb6abaed0563f7aa748ff5d596c5e91d0cfc861)

### Bug Fixes

- Correct smoothstep edge pathing ([e5aaaa6](e5aaaa6e8c72322f059f23a805c0b6978d3945a7))

### Miscellaneous Tasks

- Add ([f665072](f66507218c918c1b2fe7fb94934925c63e7d1890))

## [1.32.0] - 2024-02-15

[fd4f0c8](fd4f0c81831716a747ae8337bf01d133f3a28b98)...[303419d](303419d4b2dcfb6b6497b781e7c7121060ee73cd)

### Bug Fixes

- Move node from edges array ([6dd9514](6dd95145b155eedf7f05293668838b354393bac9))
- Wrap marker urls with quotes ([5094e33](5094e330b855c148abdd5c3ade83731f1f6954f3))

### Documentation

- Add run process to layouting example ([7bd2996](7bd29964a82f340510a698040ffd6c5fa0f326e1))
- Update class names in theming guide ([d120aa8](d120aa893d0271dc662f4b422b33d1a9bdc36c2c))

### Examples

- Add example for running a process tree ([0ae7502](0ae75025b6e8744323bbea2b9d8b006a3e53f97b))
- Animation edge ([43a1c9d](43a1c9d2acf8dd7574e23cefbf497b64158b2476))

### Features

- Add animation edge to layouting example ([75355b0](75355b04e730d904da392b12ce1f6a8969032d6e))
- Wait for edge animation to finish to load node ([fafad1e](fafad1e72102e21749a209035d69df48d363b69b))
- Add shuffle to layout example ([a0abe3a](a0abe3af9dd441c7493b8b4da290bd9ef7a36688))
- Add `useLayout` composable ([ce7333f](ce7333fef66e71337519e62fef5b214ac7ba72bf))
- Add `useNodesInitialized` composable ([f2165af](f2165afe6ffee68b4fb1a9922c8ea5827b1c0d26))
- Add `edgeId` to `useHandleConnections` return ([3a0dc0f](3a0dc0fff6d457d98477e856c12e2a32a31b2aa5))

### Miscellaneous Tasks

- Update validation example text ([30f158c](30f158cac7a9096eafd9477e311f40997a1de5c5))
- Cleanup styles ([abf5c3d](abf5c3d0ced13aa540e96c90fd720a6ce5312640))
- Set LR as default in layouting example ([2910951](291095110a07f9785d7715cbf909f4fe95c38b6d))
- Update layout example styles ([f9e4d84](f9e4d84297065dd666108a3ec83eb217c22afae5))
- Reorder menu items ([a99c620](a99c620b18a85ab82eb862bd182d23c92c8f935a))
- Cleanup layouting example ([dc8faec](dc8faecd8cac8d22ee08b07fa521c79f2d2b69e0))
- Colors edges based on target node ([c9f8f6f](c9f8f6f97476e3bc591b03910fd0d2b7575c9aee))
- Put all actions into single panel ([caf874d](caf874dd49a8790176105f0c7c3d81030ec7fb56))
- Cancel upcoming tasks if stopped ([51c0ee0](51c0ee065b30b52e7555d4769d7c9d0998cb8572))
- Abort animation if task was cancelled ([4fc7342](4fc73421c3c1627adad2fee32494cf9681f75088))
- Cleanup comments ([8226796](8226796b8b59a89065e940f8d4e4b0cb77828fee))
- Cleanup styles ([c65f5cf](c65f5cf56e80cfa5813a17c32841525165f08b0f))
- Add spinner to stop btn ([0c441b3](0c441b35dfb0d2072276a432c1b0a2684197795b))
- Cleanup edges example ([f67e5a5](f67e5a57e399950626e02751a5dc8f17f4e192b3))
- Update license ([060f9e4](060f9e4748f761da7d3cd57f514889febb3e2c8d))
- Add ([eb78f77](eb78f77c729ae096dd98045626bc3aef727c9375))
- Cleanup tsconfig & vite config ([49a9f4a](49a9f4aeeef3ace8a20cf6d7d137565f919f7035))
- Add missing generic for output node ([ee8748e](ee8748e936bb1b4796ee27e871fbcf14c39bdb28))
- Update composable jsdocs ([fbb3f63](fbb3f63134477d5f517d092015e3c4c9f3ea3ab3))
- Remove experimental from state ([bbf16e3](bbf16e385cfe1edf69549f9781c024bf0fe828a8))
- Cleanup ([0139e6e](0139e6eb0fb164bf2a1d7e887c243d348830bf5f))
- Add ([bc0a33d](bc0a33d6de9e3c3adeff2a4aa2c70ada89f60b2f))
- Add ([55f0110](55f0110cf61640820bd9f31a7691c9642285d351))
- Add ([31903e4](31903e415d0559fb49069f8cb00140027ed0af8e))
- Deprecate flow props ([46be1fe](46be1fed5be4321d555e6c8ceacdeef5ba8d3527))

### Refactor

- Use composable tester cmp ([9837e0d](9837e0d34f8ff08ff6cd838b2fa6f68ebe5c5b9f))
- Use connection line tester cmp ([96b93e3](96b93e30e328f09637dca21268b9ed5d5850b321))
- Use `data` obj for labels in default nodes ([6c638b8](6c638b8e2772787ea94ed493928ccbc0e3b3ce20))
- Deprecate bgcolor prop ([d288a9b](d288a9b842126e56949d7d3288f89d3d950bf1aa))
- Deprecate getters ([c8c77a2](c8c77a2967c03662a30c324202426ace19622b8c))
- Use `useNodesInitialized` to emit `nodesInitialized` ([ffdea45](ffdea45af47d2aad41121ada3576d09bd1a951c7))
- Rename `useViewport` to `useViewportHelper` ([300c742](300c74235219c2f0adeaf71b5e7930d4ac049a0e))
- Use all nodes for handle lookup ([dda5b58](dda5b58211315d475f426972601a1b8faf045517))

### Testing

- Add `useNodesInitialized` test ([3fa7fde](3fa7fde39440869b4b8d40d6a4427dafffadac1b))

## [1.31.0] - 2024-02-05

[b13d53d](b13d53d60998b050d54e5161fc7d8e85d7cde4df)...[fd4f0c8](fd4f0c81831716a747ae8337bf01d133f3a28b98)

### Bug Fixes

- Import pinia example ([1c54e39](1c54e39c3adf785ed02ee73f6fa196d5131a7e6f))
- Set opacity on intro until el are set ([da8f82a](da8f82a60bef1c01e3919b9718b77c2815be599d))
- Update node dimensions on next tick ([4bbc14b](4bbc14b8827338eb6e9c3ffbcd81f7686b066edd))
- Use existing node/edge obj for assignment ([983971f](983971f576e5c768a9b73080f719aa2c63fdc397))
- Avoid options passed to `useVueFlow` overwriting default state ([04658b2](04658b2c0d78dfe08b18b845365475019d2f5698))
- Avoid adding invalid edges (like null or undefined) ([aaf1069](aaf106938fc9162fc9edf6ec5ad08b786cf5f9b3))

### Documentation

- Update basic example ([4b4bcdc](4b4bcdccbb75733950005f613c9460fc35769fab))
- Add troubleshooting page ([0bfb5f4](0bfb5f40465ca795535f6ca84e362bc1ae0d73dd))
- Add dagre layout example ([3220e20](3220e20c0e5251136c7364848cde0abaa364ee04))

### Features

- Add `useNodeId` composable ([00a1f9d](00a1f9d4846a04ea0e16c3087aea885f17d14404))
- Add `useHandleConnections` composable ([064cfd8](064cfd84b3d4a99d6be4ce469152135ead7c3b3e))
- Add `init` hook ([fd84025](fd84025dd1ccd219b271dc1534e01fa81676b145))
- Add viewport helper to state ([c855dfe](c855dfe454fe69a66c3d9c64420b98455a81515a))
- Add `updateNode` & `updateNodeData` actions to store ([fe1d801](fe1d801d5bdb2c915b00769fe9abbad8f4d14ba4))
- Add `useNodesData` composable ([cecf9d4](cecf9d4c3be33c9e08957fccdd910a16c2c1f30b))
- Add error args to err ([f36fa77](f36fa770c2e26ef1b0939fa44c977d595d029900))

### Miscellaneous Tasks

- Update vueflow config docs ([ab568b1](ab568b19135123e9e3b3d60a8017b075f9a684dd))
- Add ([1ed6dbe](1ed6dbe0d9d8604e6d3c1d3ed9f2653eb461ad83))
- Cleanup ([a9bd82d](a9bd82d28aee64060ed24c61168c511f2fa6b2e1))
- Add ([3f5519d](3f5519da4df8a2a3565f8ae6ba3a69abb8fdb51f))
- Cleanup ([0941e60](0941e609dd98d27b932f7b6d047a2ea88e0ab461))
- Add ([7672672](76726723092bae1c2e1093c45ab7b3736cc39192))
- Add ([662c5fd](662c5fd99867d67fdb8f32387b2625a1eb3d34ab))
- Add ([3e9840a](3e9840a351ca2c8cbfa0e8c9425b9e1157aef29a))
- Deprecate event properties of nodes and edges ([8db9b1a](8db9b1a997d473f756da73294914fa703ded97a9))
- Add ([66d7198](66d7198a2f83ae911894a86678159b284ff6d93a))
- Add ([9e72e72](9e72e725e803d9064654b8b78f759dd1285081e3))
- Cleanup vueflow cmp ([557a679](557a679e8923aabdf79e21df131f947d37ee7877))
- Add ([fbadf94](fbadf9427fc45a6f5ee0bd3b80bd06dbc265d42a))
- Add ([0e03b16](0e03b163284254de30a68c3e1035d894fe51c100))
- Cleanup ([eca0447](eca0447d3b87d1f61652bc8e1ab5f0255cda1634))
- Add ([c443af6](c443af6991ebd0bfaf4b1dd8b5d638f5d5b4b72c))
- Add ([1dff3a1](1dff3a17642a9505a626499b5eedbedd40c9f029))
- Cleanup `useNodesData` types ([533e37e](533e37e624596153637ac4b9d0eecaef758c80e3))
- Add ([6e162d5](6e162d5f02aef5a9abecd874870927b0b19e2a6f))
- Update jsdocs ([2ca5bd8](2ca5bd82a4d4d7ff22d24d0ea96b0a1012be7339))
- Add docs about new composables ([c381e6c](c381e6c11d7d1721e94e22676fcaad7e274c111b))
- Update custom node example ([fc2f36b](fc2f36b41958a9d0f4d105632984327f2f5c2835))
- Add cdn example file ([1006006](10060064f21c4d8cbbed02d4ba195acb92a6ea31))
- Update custom node example ([2637733](2637733aa94e0c0daf61a1a416fab72e781ae788))
- Cleanup basic example and expand comments ([3c8182e](3c8182ead18d7a253b4667f13f566b5db7f6d37d))
- Cleanup connection line example ([27f54fd](27f54fd561ae83fa662e5d3265d0dd5cf108c034))
- Cleanup connection radius example ([be57e51](be57e51685501a66d272b3bdb93335e5d153c866))
- Update drag and drop example ([88beaec](88beaeca2b69b7c9e15f385360b427cc9c17bbd1))
- Update edges example ([14f3abe](14f3abef1a4df64027b4d74bdf5689d16945597b))
- Remove `empty` example ([f5b3d83](f5b3d83731f7e3743d931b4206391f1fc44eee6a))
- Update hidden example ([8ce3e03](8ce3e03ce9afcdefc8011a379f3ebdfbaa5c269b))
- Remove horizontal example ([02057b6](02057b6c6c80e2c88f85a41aa918471a83d4799f))
- Update interaction example ([11f92f4](11f92f4a4a53459be71c53d84786fb801d1f31b2))
- Update intersection example ([d732597](d73259706551411db855f7a51ba7811879609f71))
- Update multi example ([0348850](034885062c94edc148ddc8dcfbecf5d6f59015c3))
- Cleanup examples ([24c2091](24c2091c7a8da529ef8e59f9f29926371552c196))
- Cleanup EdgeWrapper ([cedb1f5](cedb1f51e77a2cf589ed681559f5df8d2e88e12a))
- Update ([cc20329](cc20329be9ab58612e840653dd479083aca9b4a5))
- Add ([3c288e6](3c288e643baa56cdbfd1815f70825af5dab4bcf3))
- Add ([83848f4](83848f4aa4c551a358138ea92dd6da9f929df09b))
- Deprecate some node props ([daff22f](daff22f3cf3a5a133dbbae5eb94d20e03bd2bfff))
- Correct link ([05c4677](05c46770028efe708c1731bdb4ba5ae9cf4c2403))

### Performance

- Replace Array.forEach loops ([c4b4a04](c4b4a04aa083dd87e7ad10d2510ac49e3c69b785))

### Refactor

- Replace watchEffect with onMounted/onBeforeUnmount ([d001d80](d001d802b5922f013f9e9ac21d691d7d27da032e))
- Remove error from `useNodeId` ([aab31f8](aab31f829648ce81e83d9b43136aca79e9c060f4))
- Find handle by id regardless of num of handles ([84c2f6d](84c2f6df99b3cd7b220cab27d20fee3c9f29e7e4))
- Remove unnecessary keys ([97f4a17](97f4a17f8303f2b86f27d1fa0001a3b489cb6fdd))
- Move fitViewOnInit to node dimensions update ([f09b7d9](f09b7d934bb34701fc0fe7886e7bda2fd44dce3f))
- Omit events when calling `toObject` ([72cc175](72cc1751429e79a52225e0a0d4f962d8d0881445))
- Use `useOnInitHandler` to emit `paneReady` event ([5798cc5](5798cc5578cd047dfe82f8839b1e0c0b5a6c8a8e))
- Allow passing `MaybeRefOrGetter` to `useNodesData` ([f4fb4d8](f4fb4d8036049a35be77fee7e8156eb46dccf5e9))
- Allow `null` instead of `undefined` as id for `useHandleConnections` ([7161e9e](7161e9ec90d4329e54c279b1a740ce02bbfb51bb))
- Add missing viewport helper functions to actions ([417a301](417a301b423f5e10f21ca26165d75b04fd582744))
- Call nodes initialized whenever `areNodesInitialized` is true ([584782b](584782bcc625036a02fd6ccdfcfcbb0bebb21072))
- Show repl import map and tsconfig opts ([6f33a3b](6f33a3b50e8a085f967b1f3b86d2b24677575edc))
- Use wider styles for example pages ([32700b1](32700b12d39368357ff5daad4ab087261f3da0a9))
- Call `fitViewOnInit` when node dimensions are initially set ([0544fbd](0544fbdb6a40a8658a4f64e8b7b00c274ece849a))
- Pass renderers to viewport cmp as slots ([cc9f4fb](cc9f4fb24499e2c3f374fc46449cbe05114b56ed))
- Cast zIndex to ref ([259514a](259514a229eab67aac2e7b892308b51ce390ff1b))
- Remove exports from barrel files ([308338f](308338fa7916806e30402fa0d94642e1813d77f6))

### Testing

- Add tests for `updateNodeData` & `updateNode` ([4d8cd3c](4d8cd3c1a4828c8f322203446f411424fc88e976))
- Add tests for `useNodesData` ([7f6ae2f](7f6ae2fbf81aca64b9549a6cc45f1ee5de7acba0))

## [1.30.1] - 2024-01-30

[11a16da](11a16da158a30cf730767275e1a428493b770196)...[b13d53d](b13d53d60998b050d54e5161fc7d8e85d7cde4df)

### Bug Fixes

- Check if values are numeric in `isRect` ([b7cc917](b7cc917a090fefa58e5903174d53d73d40ae6ce0))

### Miscellaneous Tasks

- Add ([05e17d7](05e17d79515b13584691630d4eb62a8b8987a168))

## [1.30.0] - 2024-01-29

[a8feaaa](a8feaaa7ee4f98b2803b49eea026bf8885987e60)...[11a16da](11a16da158a30cf730767275e1a428493b770196)

### Bug Fixes

- Set full width on control btn svgs ([ccaae21](ccaae216f8d8fb73d3580c23bf99b8ce4778676b))

### Miscellaneous Tasks

- Cleanup ([e427e21](e427e21c2894cd8a9cd4207912afc5f7d27f31ec))
- Cleanup intro ([5d2427e](5d2427ec2eba8c777d69dca50044cb4cd54c1c44))
- Add ([1caaf36](1caaf364e78561fba5800f9ed845dc545db2bc47))
- Add ([3d362cb](3d362cb2d370f5be831d94172f9192f8f885d210))
- Cleanup ([1eefc88](1eefc8860ea6416e819fc6eb6d3fdfd09ee9132f))
- Cleanup viewport helper ([5e8001f](5e8001f7b00b5cfd4d8017ddf9a297c1fadb692e))
- Cleanup transform cmp ([e0a48f0](e0a48f05526a37cc19ef8d2f09d896aee0d63fc1))
- Cleanup type issues ([e24f436](e24f436fc50b72a03a4ff8f22cdabfa5169e8e42))
- Update head ([64a2091](64a2091ddba4534a899ece1ac63071c45f74f6e5))
- Update deps ([a79d100](a79d100b258ac5ebd4a30818b8e8336cb5662e81))
- Add vercel speed insights ([b04cc29](b04cc29a6c5261e137e310257271a5421e17ef48))

### Refactor

- Add `fitViewOnInitDone` to state ([308cff5](308cff5f451a9fe6321e55eda2095ae2867105c1))
- Emit pane ready after timeout of 1ms ([abe6006](abe6006a0971842acc87d42e28798698988e9917))
- Suspens transformation pane ([ce229e5](ce229e547f37e657410638abc6143aacb2ce5a6f))
- Remove suspension ([b65f43c](b65f43c5d8dfd331397e23b524531048f89c8fb5))
- Use `useResizeHandler` composable ([a5091b9](a5091b9b0ca9a1fbe9af3d7bc6c4b65127137bdd))
- Trigger fitViewOnInit together with paneReady ([3977875](3977875d0b495de8a52fd240d96658aece8d353c))
- Remove experimental flag ([2259b2a](2259b2ab9ecc7e316dd0c8cb6c527e75df9060a9))

### Testing

- Use transform matrix to confirm node positions ([8a888a9](8a888a91942d3676a96c3f88cd793eeeb7ae34c1))

## [1.29.2] - 2024-01-25

[35a2606](35a2606ff23db864ef580c684827cd5f2984dbc1)...[a8feaaa](a8feaaa7ee4f98b2803b49eea026bf8885987e60)

### Bug Fixes

- Check if key or code exists before matching ([2b82098](2b82098fab22d79ed7016755e9ccd9f41f58b6d1))

### Miscellaneous Tasks

- Add ([390073e](390073e4d2e26b3ce8a2a9e55ee1cbd3773b0c45))
- Cleanup condition ([be9e580](be9e58092a354ba2b5763ed479f8ac9b4f4b3a54))

## [1.29.1] - 2024-01-21

[c4becc3](c4becc3523cb8fbcbf24a657b4a6cd5df1cf60d1)...[35a2606](35a2606ff23db864ef580c684827cd5f2984dbc1)

### Bug Fixes

- Watch `shouldPanOnScroll` & `shouldPanOnDrag` ([9e51070](9e51070144f6ec22f54e95a562966fff502f06e8))

### Miscellaneous Tasks

- Add ([23510ef](23510efc1ffbf7894c269f85271f363a55bef34e))

## [1.29.0] - 2024-01-21

[d9dee8d](d9dee8dfdfc129c3ae1d0c20e127a4f537118d29)...[c4becc3](c4becc3523cb8fbcbf24a657b4a6cd5df1cf60d1)

### Bug Fixes

- Add default handler when no handlers exist ([e5c52a3](e5c52a3dba13c9a04d6058a098dd0cc12c571f3c))
- Add fallback for connection-line type ([5344fec](5344fec3af314e202131ec19ad5a59826437f8b9))
- Merge connection line styles ([f1d3fa2](f1d3fa2aa35976141f53307df87f02de691f1fb4))
- Pass flow id to `getMarkerId` in connection line ([2192fff](2192fff9b27e5b141cc36e8da22dd27fa7f0bb29))
- Return false from bool key filter ([347715d](347715dd111af896164f2e58487628edc804fc10))
- Allow panning on scroll when selection is active ([e7fb681](e7fb6813cdad9a36a919ec3187460f9f6e40c651))
- Await fitView before emitting pane-ready ([ca70a7c](ca70a7cd675f8f238d9d41e5edd84e9e35971927))

### Features

- Expose handler functions ([ffcc20a](ffcc20a26320779344191fb34dae13d6b9d7dd88))
- Expose onClick and onPointerDown handlers ([2f0b00f](2f0b00f8540218e95b0b29e6274e1dc9363b7378))
- Add `useConnection` composable ([1012f2c](1012f2cae923c20c5f06605685eef6b7477dd539))

### Miscellaneous Tasks

- Update LICENSE ([423d608](423d6085658a060d7bcb5df8b02adcd228071c4c))
- Add ([f9ea702](f9ea70210bcaece99735bc1eb132752c34a8840a))
- Add ([2b8fc1a](2b8fc1a65a7a0fb422ec99f91dbb971bc9c5558c))
- Add ([a19892f](a19892feaf27783e130d2c80b070dafd0c6916e4))
- Add ([f8abaaf](f8abaaf34d2f09ba483eb6e97dc5bd084dc24510))
- Add ([72d42ea](72d42eaf98bdbc192da1f25e8d30db0d579f9d36))
- Add ([2e06568](2e0656822a2b32d41a36380425c6ad96a0753118))
- Update antfu eslint conf ([8bf6f26](8bf6f26d3dff21e0e4fc791c37caa080c7918fa8))
- Lint files ([68cfbae](68cfbaebbeec61719a3da09a41de52430a890536))
- Add ([68762a4](68762a49600488bbfcd6543126bb954372e5fb10))
- Cleanup ([d09e46f](d09e46fb2edc2078b0f44ea7aad0b896807efd57))
- Add ([e7e1195](e7e1195b4f6c265e7c7fd29967d495223347477d))
- Add ([c6ec16e](c6ec16ee8b48aa03d570e3eaceb0ae12a673d330))

### Refactor

- Update handle styles ([3364144](3364144b8545b96eb446342c93e68a02f8b18745))

### Reverts

- Inherit attrs ([45b4326](45b4326f721a8a35fcd2de793ddfd20828d36514))

## [1.28.0] - 2024-01-03

[aeed19e](aeed19e35a4228a649378108ba0ce66c910a0069)...[d9dee8d](d9dee8dfdfc129c3ae1d0c20e127a4f537118d29)

### Bug Fixes

- Fix the issue of pushing out the panel when copying a large amount of text to the textarea ([c4fb1ee](c4fb1ee7e3efceae73e20e33f5506082fa62db8e))

### Features

- Add minimap slot types ([476e5d5](476e5d530a8721c348728dda75241dcd1e508eb8))
- Add `MiniMapNodeEmits` interface & export it ([5f0a333](5f0a333b2a1b3999a68ca76097f700894db482f1))
- Add source and target handle ids to edge removal change ([d78a53f](d78a53fcd6f36cf3ea1b59d05aa16bc969ac0ba4))

### Miscellaneous Tasks

- Add ([9c2b281](9c2b281948a7544ce2881dd4468a8a288dd06312))
- Add ([a1bcf66](a1bcf66b4a6d63a4557325c8db858278f1ac89cd))
- Cleanup minimap node emits ([6f57175](6f5717524997ad948ac525d009d97cc5fd78dcf5))
- Cleanup ([7f18def](7f18def7fe65ff2668f6c3c9c75504da1a0ec044))
- Add ([18ed043](18ed0437ada954d28cff7a25e1a0b1ca94343298))
- Cleanup config ([b53f823](b53f82393f0d8688d227897007e5228d8ce0e938))
- Cleanup options api example ([14c8f2f](14c8f2faa17f24cc9beca70230de08c71d15bbe7))

## [1.27.1] - 2023-12-12

[466711f](466711fc3fbd5fd08a91d9ee30f8a0b3efb1d1e9)...[aeed19e](aeed19e35a4228a649378108ba0ce66c910a0069)

### Bug Fixes

- Remove ts-transform-paths and use relative paths ([458b5d4](458b5d42ba3278e9cc86623e02583dff9e5c2825))

### Documentation

- Cleanup copy plugin logs ([04da72f](04da72fbd3a5dc234c4a5a1e43e54391bc860633))
- Move examples dir out of components dir ([bb2bf72](bb2bf720125dc118f72cabe4f5b96fde1d2b7ba2))
- Cleanup ([7d7fefe](7d7fefec7524559ea18404f5b8474ac6d675c2d3))
- Simplify basic example ([0506f6f](0506f6ff93e8fff96ecd05f8c3291aed7bb84e85))

### Miscellaneous Tasks

- Update deps & deps-dev ([7ba258c](7ba258c53b35839268c3a414165f65764292f2a9))
- Add ([b4402cb](b4402cbbf7719d1c1749213b8bead3c34b08e6cd))
- Cleanup scripts ([0b27870](0b2787000c7ff22bc25475db1514d191b8cdde8c))
- Cleanup ([58689d7](58689d751ac8c673f099f4392b1927972d004070))

## [1.27.0] - 2023-12-12

[ff41107](ff411077278482dcf1e65dd89d1286b0f739d1c4)...[466711f](466711fc3fbd5fd08a91d9ee30f8a0b3efb1d1e9)

### Bug Fixes

- Use nullish check when finding edge label renderer el ([eff1afd](eff1afdfded85e424191d1de895ddc5e3a11034d))
- Pass correct node id to resize control ([6895795](68957957aeb979361179b5fce18e937639b54d19))

### Documentation

- Add codesandbox template link ([a6be735](a6be7353e74149ee6fbe2b1d6865fc4ffe05dbc8))
- Add controlled flow guide page ([f203dea](f203dea1eccc8bf8670152af2cf5bffef523547b))

### Miscellaneous Tasks

- Cleanup header level ([73fc998](73fc9982c551040a0d385df36e5a36f567b34693))
- Cleanup pkg json files ([5d9ba67](5d9ba67d01b0861e8de9c46fddbe262962a8c625))
- Cleanup control component slot names ([ce398d7](ce398d7e70b944c5d02ecf212f4efcfa6562e776))
- Add ([a12de29](a12de295460c4b9751f2542ebaa7ab5f832fb3e7))
- Update gitignore file ([eb4cff3](eb4cff30c97327d45ea75786ac40d1bf22c08eb1))
- Add ([6c197c8](6c197c817e54b510ae938f30546110589e5b89c5))
- Cleanup node wrapper ([fb3d6a7](fb3d6a7f13fae70512540d55e4a852bd9fc97f80))
- Add ([eb21d87](eb21d87b62b71bc453a4a190cbc8fee7713e0cfd))
- Cleanup ([aac4c4d](aac4c4d5938b6c277612609e324c259c78a4ea66))
- Add ([f439e1c](f439e1c4e3301a2b83e397bba43688a7146ea2fc))

### Refactor

- Deprecate pkg ([039f5a5](039f5a545dbfb691e15e83553842dcbcc9211cdf))
- Set default drag threshold to `1` ([e2b30e0](e2b30e0b9a8fe9dfcd5cca86976780eafcef6651))
- Return promise from `fromObject` ([c995b80](c995b801ce28d45fa90d5b83f80a8ba6afb04790))

## [1.26.0] - 2023-11-10

[d963558](d96355846492279a4b7ab9fb046ae7164f0f2142)...[ff41107](ff411077278482dcf1e65dd89d1286b0f739d1c4)

### Bug Fixes

- Use correct prop value when watcher triggers ([277979f](277979f72cb357fffd5d5d0dcee0cda240887910))

### Documentation

- Fix typo in node-extent vue-flow property ([6c3cff8](6c3cff8905c77e1e8e504a08971b982bd129bcdc))

### Miscellaneous Tasks

- Remove base `vue-flow` pkg ([2e578ad](2e578ada7d9b842f0df3799823d7e2982d85b1da))
- Add ([9aba9a8](9aba9a8efdab75639632e69af297c01c6bbc893f))
- Add ([9e7ce26](9e7ce26a2b81cde2dd5eaab18322155f4dfbd660))
- Cleanup config ([ff41107](ff411077278482dcf1e65dd89d1286b0f739d1c4))

### Refactor

- Keep connection line snapped to handle while hovering ([ba0cf54](ba0cf54fef7730643c4a91284f2b16ab391e0e3d))

## [1.25.3] - 2023-11-09

[4d1578a](4d1578ae60373fdfb73d5053b140ea8dbd25555a)...[d963558](d96355846492279a4b7ab9fb046ae7164f0f2142)

### Bug Fixes

- Use node rect for intersection check ([0c07bd4](0c07bd4e2ad7164b774607fe2d62ac2929f27c95))
- Respect zoom key when hovering nopan elements ([cc89e99](cc89e995fb6e31e99b41f347e77ebd2ad859c9a5))

### Documentation

- Remove `defaultZoom` opt from config guide ([91c5212](91c521296d11aacaae0e95579110c0058aa8d9c0))

### Miscellaneous Tasks

- Cleanup copy plugin ([26be5cf](26be5cf8d3b98d7b47aaf599ab02b03faf23cfde))
- Add ([0a4e27b](0a4e27baa07519fc6ce6b8394ef5fff05f7575db))
- Add ([448ea7d](448ea7d4d3ba18753490b8034515eda658b8cb23))

## [1.25.2] - 2023-11-08

[ab59b71](ab59b71136e97ca17230ed1cd49ab243dc1f4355)...[4d1578a](4d1578ae60373fdfb73d5053b140ea8dbd25555a)

### Miscellaneous Tasks

- Add ([21460ee](21460ee4725759fbd01cd0f70cefabc2402b2b63))

### Reverts

- Cleanup imports from vueuse/core that exist in vue ([6162389](6162389cc20be48175bf362345a490b08766e0ef))

## [1.25.1] - 2023-11-08

[7489118](74891189e7591776d43817d8bf9dee9a5a711a73)...[ab59b71](ab59b71136e97ca17230ed1cd49ab243dc1f4355)

### Miscellaneous Tasks

- Copy vue flow files on dev build ([529d90a](529d90a3be6a30e5b9dd6a96311e4caea9795900))
- Add ([5e30865](5e308652a3a644d52f05c9aea0882cf2262f844c))
- Add ([8a2304a](8a2304a52e90651e535a701dd8332864e00442c3))
- Cleanup copy plugin ([c59deac](c59deacf3f3289cc5d03da8735f038a2399d0667))

### Reverts

- Import `toValue` from vueuse/core to avoid ambiguous export ([17e5966](17e5966e4f43311d7bbf62f3677303c8dace0c83))
- Wait for d3zoom before setting opts ([e4e3188](e4e3188b76c514cb88672060eb84f5786890b62d))

## [1.25.0] - 2023-11-08

[ea7f843](ea7f8435ef5b4d030fc4b112ac2617e2de1c3936)...[7489118](74891189e7591776d43817d8bf9dee9a5a711a73)

### Documentation

- Update getting-started page ([ec66f90](ec66f90cb08efc74ac3d849ce47e62b0c129692a))
- Remove animxyz ([d670de4](d670de4671a00e1aec9d8eae67d5aab4499a946a))
- Update intro page ([39cf824](39cf82431f34b3ff339e26a346a04e7ca8f11069))
- Cleanup ([fcf3078](fcf3078d5b8116060bdd03a21955b7cbf110f11d))
- Update theming page ([372c374](372c37469ebfc88cdd9ab0e0fd8a1407c6f24486))
- Cleanup ([811595c](811595cd1791c1f68619c55c640301187abc3cf5))
- Add copy icon overrides ([17d9a49](17d9a49610246f4a3d57e713ae06737c1f1a7229))
- Update node page ([1628851](162885199fe392831022f2e65a9819c55599c932))
- Update edge page ([30646f4](30646f4c2b8306e552aeb0895701746d2879f00b))
- Add section on updating node data ([a1691ce](a1691ce91031da98d70009b81f8d44018d59f0f1))
- Add section on updating edge data ([5169eda](5169edad6d664f26ccd66b096e0475ebdf2c20b2))
- Add section on removing nodes & edges ([4786e7a](4786e7ab5eb2c677775380f35bd1fe8ac565713d))
- Extend custom node and edges section ([b493893](b4938930adf4d2767270099ca5d75990a50a9854))

### Features

- Add slots and emits type definition ([196cafd](196cafdf81088644ada5f07ef65ee5e3203985ab))
- Add nodes to `isValidConnection` args ([c1603b2](c1603b2d5848c4e6ae0256ee2c253810a8f27526))

### Miscellaneous Tasks

- Cleanup ([d0161fd](d0161fd417ea7ac7461650749369ed8920503e6a))
- Cleanup placeholder style ([c35c2db](c35c2dbcc069d5605d804ba73bbe8006bb3cd13b))
- Cleanup theming examples ([2b99b77](2b99b77aea809887d644e9d3a02102c83947d08c))
- Cleanup slots ([70ae074](70ae0749b77b5d3f8b7e5e2ea4d8a6b45fa47df0))
- Add ([e010497](e0104975caa97358e969a3508833600e428ee771))
- Add comments ([28b66a3](28b66a3d663cdaad2f1e7f1ba69c59102f33f088))
- Cleanup imports from vueuse/core that exist in vue ([7cc798a](7cc798adae4f755d013d2417859d60643deb6ece))
- Cleanup ([75cb0c9](75cb0c9b1ec8f02ba334762fd7c84fee7ea9e92f))
- Add ([db9a0dc](db9a0dc7d6a829ce3eefd69634cae3b06c4a2f62))
- Cleanup ([45ce985](45ce98558e2047c36346eb86cd5802021eff86e3))

### Refactor

- Remove slots patch ([e54b36a](e54b36ae28fcd749d7ab8f7c5b83c1dbcf9643d4))

## [1.24.2] - 2023-11-04

[41d325b](41d325b61368c0dc1de524210ed21903d2cb1692)...[ea7f843](ea7f8435ef5b4d030fc4b112ac2617e2de1c3936)

### Bug Fixes

- Add immediate flag to prop watchers ([ac8dab3](ac8dab30c78efc7bca236e5344fcedc1bbd87493))
- Do not wait for d3zoom to be available to set skipped opts ([07b3783](07b37830b196c31a7066de8041563c67077ff49b))
- Use existing node for intersection check ([5bda311](5bda311f8d79c30344036a5e22e691e2f0cc5d08))
- Properly cleanup handlers when drag is disabled ([c30ddc6](c30ddc61ed2b41bcb3c4a6c1c392968564a83d3c))

### Miscellaneous Tasks

- Add ([78d5e02](78d5e0281b3edb6f04bace0ffd9ae6b993618bf5))
- Add ([1dfe683](1dfe68306b723eed2263e674674782d337783c86))
- Add ([5a21959](5a2195948279f00642dfd785b6a353aed7e4f265))

## [1.24.1] - 2023-10-30

[c51ff79](c51ff790ce838b89b1f6050625a014a29aacfe40)...[41d325b](41d325b61368c0dc1de524210ed21903d2cb1692)

### Bug Fixes

- Allow pan on drag when pan key is activated ([ffceea9](ffceea93a8bf0bd6f234b302134bee8b838213fa))

### Miscellaneous Tasks

- Add ([04d3c78](04d3c78bd69561848e7088932672e25b03b7504f))

## [1.24.0] - 2023-10-30

[9b6c6e3](9b6c6e380e95673a91feaa8deb08c281aa139c27)...[c51ff79](c51ff790ce838b89b1f6050625a014a29aacfe40)

### Bug Fixes

- Select nodes on drag when threshold is > 0 ([ee45b4e](ee45b4e560cf7c50f63655de752cc0731dcf9570))
- Use correct filter for panOnScroll class ([15c3fd5](15c3fd5dd75ab44c5245b7f4274d2076eb962231))
- Create predicate for string key filters ([11138a6](11138a6d9a43f949b519176ce42b3a41557dd575))
- Allow panning when panKey is pressed ([049b1da](049b1da0c61b8c0303363c18b5c6a063c2c18841))
- Ensure events introduced by the watcher are released when no longer needed ([8651019](8651019eb615186b595d47fe9dd553c229f845fe))
- Push emit handlers into listeners set ([2ecd8de](2ecd8def816320f3ae3b54216f865e4e2245229e))

### Documentation

- Update theme ([28fd495](28fd4955f4a69e310e7f8f901efe85cf75a4336e))
- Update home page styles ([750c01d](750c01df9d8edd76925d1249bafb8beeb0629c9c))
- Update showcase dark bg ([b85f37c](b85f37cc3be358d5c9953f234e055c654e9704ae))
- Update typedoc deps ([247a037](247a037a396c92dc2d650ed00ef89cd7a565dd02))
- Update home page styles ([d0c6133](d0c61330b8f7712210f176c698a4b881c606f9d8))
- Fix kestra link ([0a741cc](0a741cc11616934f8c444777ea105e3426b1d610))
- Add meticulous ([eca82ed](eca82edae1e9d87e101191ec95f1d7e2752b856b))

### Features

- Use nodes from state for `getIntersectingNodes` ([03242dd](03242dde9b162cb4e8d58fb031d67cf0fd2fd508))

### Miscellaneous Tasks

- Update d3 type deps ([b0ffe42](b0ffe420070b0f876fc4514fbd968b8183064096))
- Update to vue 3.3 ([8fa3e34](8fa3e345b65d05eb2151ea34befe13066d730415))
- Update deps ([e51c7e9](e51c7e9c17dafc5262059f82814154f59a462e87))
- Use define slots ([c32c0df](c32c0df4fa8d7706cd4f424c62c029ff52a6f36a))
- Cleanup components ([119f6d1](119f6d15db88064faaf1194e4708ba20d8aa2180))
- Update pnpm-lock.yaml ([8473135](8473135eb84646129684db6ecf6e5121be7d0b8b))
- Add ([961b4cd](961b4cdc3fda327330ab3f14ed92a781e875ac37))
- Update deps ([17a50dc](17a50dc7dc20dfdccdde428beee5b5f7650da56b))
- Cleanup ([1b3b03f](1b3b03f3890979ce70c5f3d1d3c4c839a0fe3f14))
- Add ([675336a](675336ad877a97ddcb77bf165bdc4f68c70cafa6))
- Update README title ([22a8d7c](22a8d7c913052bfb2af944debcba6a77da14d541))
- Add ([85d60f3](85d60f340143516632edaa7548ad1672398fafc0))
- Add ([f449ec0](f449ec08ed3241991cd4a58991feeb660fce14de))
- Update pnpm-lock.yaml ([4ae371a](4ae371afbbb388332df343a07ffd05045ec8fd88))
- Add ([7fd2829](7fd28298ac2ba47e6df729e79426d0f544acbc84))
- Add ([add6406](add6406688669eb21e846ba717207fd7e7dbeee8))
- Cleanup ([53be29d](53be29de8a2833dab0b6328b3d35c1cb3df718d5))
- Add comments ([009e6fa](009e6faf0d21997e21e71e55b5690d81cd51eb63))
- Add ([b195ff8](b195ff86fb1aa9beb0ad9955965613fbb50f25e8))
- Add ([c834ae2](c834ae235a6f862df65ad9da8002ec44de30b891))
- Add ([2b19e41](2b19e41be6d3dd1db602d058e858e5667b7d78ed))

### Performance

- Cleanup possible re-bindings of listeners in useKeyPress ([785f147](785f147236c644887d4e104734d711605ad1301f))
- Cleanup computed vars ([88cfd40](88cfd402edfdb7de4333a680c22e9487138a119e))

### Refactor

- Add warning when viewport noop is triggered ([a32c81a](a32c81aaf3f3efd4d47c6308be21dd237c469047))
- Disable minification ([ec7653e](ec7653e8f351440bb2b87cd329ca8167df55a112))
- Add stub for `addEventListener` in `useWindow` ([2a407f5](2a407f59e3494c443db1738018dbfd764e635cd8))
- Remove primtive typeguards ([3b175a5](3b175a553e6897d5fdb76de0721ebf6e6c6f2ea2))
- Allow adding edges with missing source or target nodes ([7e7e0fb](7e7e0fb8cba5c197123e97d963e67b729b16bf46))
- Remove default event listener void fn ([7494817](74948178424902e2762e5221d5f57e3273259d9c))
- Rename onError arg to triggerError ([0bf1260](0bf12601dff7246221fc2a164f3b4d1aafb11b4e))

## [1.23.0] - 2023-10-06

[a838941](a838941d393fb85a26294e06130b768919404616)...[9b6c6e3](9b6c6e380e95673a91feaa8deb08c281aa139c27)

### Bug Fixes

- Unselect edge if selected and multi-selection is active ([ad7d013](ad7d01305e1aacca35526752878b33d77e8ee524))
- Wait for node to be initialised before enforcing min/max size ([75b1a69](75b1a6944daa061e03ae4bd872eb89034618ff81))
- Respect pan on scroll class name ([e369803](e36980337b68920a128f8381ceb33ac19ebfeb8d))
- Disable panning when `panOnDrag` is `false` ([8716a6e](8716a6e6b8cdd34694b05676ec7d1e14cb38680b))
- Queue node dimensions update to nextTick ([93f0802](93f080225726687da399bbb2359b3172ba13da45))

### Documentation

- Add showcase section to home page ([7ecf37b](7ecf37b20ce020e517c76ad0c2876a2e86735908))
- Update deps ([166b3ef](166b3ef8e94ae7f4c97565e2940609a8f291b591))
- Add kestra to showcase ([2ad5814](2ad581466614992c1b2be705bec74385a318fd29))
- Update vitepress ([db16495](db16495e0ffa80bcf18b561c77201afa36a28543))

### Features

- Add source and target node ids to edge remove changes ([7a01377](7a013771f3d5efec4d23eace5a08fd2fc5ab38b8))
- Allow passing a number as connectable prop ([3e446fa](3e446fab68af6a4e18eaded6b2735c28f8644df0))
- Cleanup handle bounds from node when handle is unmounted ([ce1647a](ce1647ad1efbbc9d9eacda7c6802bc7cb6471866))
- Add `getIncomers`, `getOutgoers` & `getConnectedEdges` as store actions ([edc7669](edc7669b18707fb6cd33c2ebcb62fe2e74debf69))
- Add `areNodesInitialized` getter ([29f3d2d](29f3d2d5e1b74f1f059b9d2cabc029a323964c6b))
- Add `flowToScreenCoordinate` & `screenToFlowCoordinate` to viewport actions ([db894a5](db894a5adb03705cd7acced9913ea39234aa6626))
- Add `nodeDragThreshold` option ([e71a2aa](e71a2aa4efcfcab634dafeb710a9c9056cb2a9ff))

### Miscellaneous Tasks

- Update dev container config ([41015cc](41015cc07feb22f0aaef410c335eac83ae4211df))
- Update node.md (#1097) ([aa2bbd6](aa2bbd62c22464a7c83a6d2948c55f057459e884))
- Add ([2f2036e](2f2036eafcc961c8b929bc7a7b0e25569a52cc2e))
- Cleanup markers ([88882d0](88882d08758ea234aa6ddf676bb1564108650ae3))
- Add ([dcb02cb](dcb02cbfcb920779cd388a276ed5dc8fca9fe8c9))
- Add ([590fa2a](590fa2a754a7cbc9ab77fd87cf967389008ee0a3))
- Add ([5e78795](5e78795764a01b0efad4e1dfe667eb669fc4b0b1))
- Cleanup ([870bc4f](870bc4f74a4214a7096dfc8d1b3f141d5a7fbed9))
- Add ([5e88898](5e888987eb5b1b9792fff6b7fa67f433a3df6f70))
- Add ([1bf4791](1bf479140f1120fd70c3bd353120a98ca5d80141))
- Add ([8ae351f](8ae351ff6b7574e3a0640edc9d423ee2da83cd28))
- Add ([ed31890](ed31890e4a694a5e0a530253f60078419861a89a))
- Add ([c3b10da](c3b10dac0e918a14ff9595ee23014a9336a1f6d5))
- Add ([c7ad8e0](c7ad8e00b20f89a84530fadf595a69b055a8916d))
- Add ([92649ef](92649efcdd8e73fee8ab4994ef4ab6d967bd9eb0))
- Add ([20cd9d8](20cd9d8e298e7f8c5aedada302a56373c3f961f0))
- Add ([01a53e0](01a53e05266c0912916fe50df7bf079756bf77ab))

### Refactor

- Allow using `expandParent` with `parent` extent ([c916284](c916284917e697d1a35c9d0c9cfe608d7c549092))

## [1.22.3] - 2023-08-21

[921c8ce](921c8ceb0327af012da2e48b4d25cb9c3417517c)...[a838941](a838941d393fb85a26294e06130b768919404616)

### Bug Fixes

- Smooth step edge horizontally or vertically aligned nodes ([16bf14c](16bf14c7d40f7b181cc8f0e514f58d54884069d3))
- Add role img to edges if not focusable ([bb1473a](bb1473a6883ef8809afc5793b735120c0ad17e32))
- Pass missing minimap node props ([5f83367](5f8336747ae002e4a0f112f7d7aa2b04c0a8767c))
- Vertically or horizontally aligned nodes ([8943ec7](8943ec762b967e2b3a65e4123a6d8fd4f5cfc929))
- Use os specific key defaults ([67704e5](67704e5a8f800d83cb59864e8a849dc55df61350))
- Horizontal scroll on windows ([86957a0](86957a0c7107cd14891112ed0e9dbaccc8a3839f))
- Better smoothstep edge label position ([2f66300](2f66300f056e08cb1a92ef35991906c44a6d096c))
- Allow passing key combination as string ([0867637](0867637b5053663e3ee7e069ef71945673a72282))
- Clear key on keyup so combinations work during simultaneous keypress ([f095917](f095917e97efa739cb58d987ca2c23aa00689476))
- Reset `isPressed` value when switching from boolean to other keyfilter ([505ecc4](505ecc4c217a98ae93b50be15accb962cdbd5129))
- Enforce min/max width/height on nodes ([06851e6](06851e6894dfc5c0c47a13d0ae142b415deb1bfc))

### Features

- Add offsetScale prop ([fd31d40](fd31d4007ed9d198f96f114f76ebaf6b4cfa748a))

### Miscellaneous Tasks

- Add ([cee9ff7](cee9ff71f0c6f97d1087bfbd5b234a7d58b86e4a))
- Add ([76cce30](76cce30178e7e89a8812757066ab4970a895ba29))
- Add ([c9a1c5b](c9a1c5b2fba8bdba4d9889a618cd42321364f8e1))
- Add ([74cc767](74cc767036e2047c3e27bd4e15b8dfdf0453a3a5))
- Cleanup ([77ccc7e](77ccc7ec86290a8875747e30db2ffa522626ca71))
- Add ([0364a83](0364a83ab96c45393f2e9d99293b9c7006720a56))
- Add ([71aa00b](71aa00bc7af7b577d2f71791cfee90e2e6bbefd0))
- Add ([f0b5f67](f0b5f67284548d74bd7715bee921c7959a302376))
- Add ([a57946a](a57946a32586200e7ac3fe31b0faa37e5104b64f))
- Add ([2f2f537](2f2f537af7a5f7d63eadb562b7373ea164c93d01))
- Cleanup ([65c3a05](65c3a05d844af1e60f6eab2d67188fab1789f783))
- Add ([7cf967a](7cf967a9c3d1066e37039d54be57b8bc63a66289))
- Add ([c47149b](c47149b5361da0a7e6f35f45b859e5c1c87840a1))

## [1.22.2] - 2023-07-27

[2174c5a](2174c5ad5ab531a4024700e2354c84d7c54c0714)...[921c8ce](921c8ceb0327af012da2e48b4d25cb9c3417517c)

### Bug Fixes

- Check if viewport is defined before setting ([9d1f5fa](9d1f5fa62927e6c3e7a3b6ecf604480e3a4ed070))

### Miscellaneous Tasks

- Add ([a69b816](a69b816891c23b83d35da08e15f82c31ed6934ad))

## [1.22.1] - 2023-07-25

[b3c70da](b3c70da5e2f707358c22242d87c20828c011050d)...[2174c5a](2174c5ad5ab531a4024700e2354c84d7c54c0714)

### Bug Fixes

- Wait for viewport helper in `fromObject` action ([fd155e4](fd155e41af8e3c3d563f52966d07ca8b67f47ec0))
- Unwrap blur fn ([ac86b77](ac86b77b8924529a153f651d1d3f3dc3d8101c07))

### Miscellaneous Tasks

- Add ([814d5ed](814d5edb26cbd350d231b3780e09e69e1c1434df))
- Add ([95612ba](95612bae49a2e0dbd2fcfa5e94c1973ab1a80de8))

### Refactor

- Add `viewport` to export obj and deprecate `position` and `zoom` ([eb29f96](eb29f96f967ddb72b663ee26397f8e9b6f803486))

## [1.22.0] - 2023-07-24

[be8a83d](be8a83dab0e75c175f88b20ceae7731ad3810ebd)...[b3c70da](b3c70da5e2f707358c22242d87c20828c011050d)

### Bug Fixes

- Dont wait for nodesInitialized to trigger for viewport helper ([a2e4d99](a2e4d99f5b519ac3d3c89426c44912bf526c3484))
- Watch applyDefault state in useVueFlow scope ([620852b](620852b860237a25bf887e531f0024082f18b74e))
- Use detached scope to dispose state and stop watcher ([45f18d5](45f18d54591b30ca9a2950d3e7625e8ada7f2936))

### Features

- Resolve promise from viewport actions on transition end ([7df2bfa](7df2bfa146a0d9aa8f6f855041f378fb2fca4a06))
- Add `setViewport` and `getViewport` to viewport helper ([9f63252](9f63252c620da84d48184ef2ae153f5073a766a7))
- Add `hasListener` to event hooks ([987538a](987538aebd77c8f2cb9c835ec388404712826ac2))
- Add flag to `removeNodes` to remove children of a node ([c4acb0d](c4acb0d0f67b7a094d55d824de930e73e07d5ea3))
- Allow passing node or id to getoutgoers/getincomers ([2a597f8](2a597f86058be0b000a6e43050bbafd97d865e68))

### Miscellaneous Tasks

- Add ([bf6dcfc](bf6dcfca4aed389f4bebf1713c7b6ca108987d4e))
- Cleanup `useZoomPanHelper` ([42aa13e](42aa13e2a57e2afdbca79f060189631bb25fc415))
- Add ([5395c57](5395c57d5d593b895425066827897274b7f83997))
- Cleanup ([4412516](4412516476d7985167e3427905a79eecadf34687))
- Cleanup dead links ([52ba092](52ba0928f4b74784d9dd36b7bd836efa6be7ba39))
- Add ([4ed3acc](4ed3acc021fd5b1089e8a1f9dadb23b23e01a9a1))
- Add ([581f2b1](581f2b1fec065f489873df8254902df5ec76cb1c))
- Add ([bc2de72](bc2de7254a474359558204c3b42dac904cda778f))
- Add ([02891b3](02891b3aa92641906089406af34a0080fa3f7881))

### Refactor

- Deprecate `setTransform` & `getTransform` ([ed6c298](ed6c2983857030e3450252a48fcfd901249976c1))

## [1.21.3] - 2023-07-24

[07e9e8a](07e9e8a9b6600a753f91a429a67268516951b09f)...[be8a83d](be8a83dab0e75c175f88b20ceae7731ad3810ebd)

### Bug Fixes

- Get correct handle pos for connection line ([17755dd](17755ddb9a6a4aa67554e26869175e5347dcd0e7))
- Abort fit view when there's no nodes to fit around ([6bd442f](6bd442f844548425264e49c90c19d60bc289efd3))

### Features

- Add fitView tests ([db4c2da](db4c2da9a5991821127907919a2c5a4673809cf4))

### Miscellaneous Tasks

- Add ([1ac6591](1ac6591d2384088f9866f1a851fbd922250cfb5f))
- Add ([8780ab5](8780ab5fc1101a7b406da30746f0f8943f04b493))
- Move setState test to separate dir ([faee0e3](faee0e3ddc76a59de49f98f79f02e26793285f9d))

## [1.21.2] - 2023-07-19

[2424cc2](2424cc236e4088c5af85d062d7c5eab80ea774fb)...[07e9e8a](07e9e8a9b6600a753f91a429a67268516951b09f)

### Bug Fixes

- Use post flush when calculating new node pos ([1415652](1415652a1b3cda2a2c6d3b7e5c16b97390864116))
- Connection status prop as nullable ([4f36cef](4f36cef1e8778a08384dab525b92af1b39c0d98c))
- Use noop viewport operations instead of waiting for promise ([4d5bbab](4d5bbab50690fd8b2ab0072e4e69bd1ed5a4bce1))
- Pass handle dom node to valid handle result ([08f749a](08f749ae30926e3d22562734715700c06c499427))

### Miscellaneous Tasks

- Add ([1b92785](1b9278521640127d3bf2316b8c4a9f2dc6e52618))
- Add ([7152064](715206404b8eecfa8a98bc620cc72463e3a367fb))
- Add ([4cd433f](4cd433fbec76a4f452a7c3d6a2a608e4070aac82))
- Add ([bcde916](bcde9161af1cf56d58f276b64a3e8c39f7ce46c1))

## [1.21.1] - 2023-07-10

[f123ffb](f123ffb0150d5b570569810fbdd3f9bdf1eddae4)...[2424cc2](2424cc236e4088c5af85d062d7c5eab80ea774fb)

### Bug Fixes

- Nested nodes extent calculation off ([f52380d](f52380d3d22eacd408211a832fa4dcc70401df32))

### Miscellaneous Tasks

- Add ([f156107](f156107bb0f16a89f121c589aee008c7dec01d56))
- Add ([dce1508](dce15085d135752649c653e279ce0a9d5b33a71b))

## [1.21.0] - 2023-07-10

[eca9ad9](eca9ad9cb93f83a8842207cc302e39f49f1b1a29)...[f123ffb](f123ffb0150d5b570569810fbdd3f9bdf1eddae4)

### Bug Fixes

- Add style to base edge props ([38bb4e1](38bb4e1e12484f5444b2087ebcbf63c51680ba8c))
- Add ref to base edge props ([40732f2](40732f2559bc4c63998a1a53ccd43c770696c48d))
- Use correct class name and style for handle controls (#1010) ([61f8a68](61f8a68b8453ca6b441b0ace66620aff075216c4))
- Prioritize handle below during handle lookup ([245dd82](245dd825749166271f374de692838e263fde7944))
- Clamp node extent by node dimensions to avoid overflow (#1014) ([82e79a6](82e79a6113e7f0b8cf7fab6210e9fd80365cb0a2))

### Miscellaneous Tasks

- Replace the deprecated enum PanelPosition (#979) ([5669c8b](5669c8b1015fa993ce8672f1c1b92709d0cb386c))
- Disable qodana ([11f584a](11f584a08a14e41bbeb237d493bd5def0ddfe1d3))
- Update export ([b2dc046](b2dc046fe91b1d9685388ee4d53adf38fd97147f))
- Cleanup export paths ([903583a](903583a3999592e39d320a464af5bfa8555c02bd))
- Add ([908ea39](908ea3965e5ae8d62260537899ee807b38970012))
- Add ([e21ae68](e21ae682beadc9716eb51ad10ac1bf1747382cdc))
- Cleanup (#1003) ([55de815](55de815a39cf3a3fe398ecbe8df681658688f63e))
- Add missing generic ([0b60cc3](0b60cc3c3e9f0318c52c3af4a6d000b7d8729657))
- Add ([6967067](69670672769251f651cac69a9e5f69f5e14f3d1d))

### Refactor

- Change nodeEl and edgeEl type to allow ref(null) ([435cb9b](435cb9b6876d43e15e5677327bfc12b86f9fb3dc))
- Use sfc for base edge and bind template refs ([80ad6f1](80ad6f1677803f334b517c61ec8668e23fb8cdc5))
- Use normal components for edges ([7d93915](7d93915f369d4665aced83b0e81102f08a88c5b7))
- Resolve slots before returning default component (#1013) ([5838454](58384540868b2f935ac3225d97c87306567cd66b))

## [1.20.2] - 2023-06-15

[a16b7ca](a16b7ca3d01681b8ccb172ccde0316bf267d7352)...[eca9ad9](eca9ad9cb93f83a8842207cc302e39f49f1b1a29)

### Bug Fixes

- Set interaction edge styles so animation does not break pointer ([d2c1c51](d2c1c5185fe4116e9f5b0346748f97e020cd4263))
- Correct connection line calculation ([33b6fe1](33b6fe121ad1507af17900af07fb4df41f82ce8a))
- Reset end handle on connection end ([b017139](b017139d22c55fa4610cac6c0aa1e978a0da2d8b))
- Use validator with null handle when no closest can be found ([6e2c3e5](6e2c3e5281a90d859adb3c31f027008d2be124a4))
- Handle pos calculation ([9d3c358](9d3c3584ff477fa61ecc0a020e0a46cb78bac5dd))
- Trigger connect if end handle exist in state ([b386c85](b386c8580f42a3f5f603b38f84486806e05c83a7))
- Consider handle dimensions when checking for closest handle ([f3931a2](f3931a2c054093f0e184b0851a799f22d8aabb0d))

### Miscellaneous Tasks

- Update floating edges example ([005f696](005f696fbeb9c0addbe379641c21c6163f186ee2))
- Update deps ([4532157](4532157763f1f0682e125ef7c246d9474f928f86))
- Correct bgColor description and type ([48ea70b](48ea70bc3ef863a112c1cca46900e62024c924b1))
- Correct description of auto connect prop ([12f4284](12f4284a0a360cd5e78abb9226c59d94830c84d3))
- Update node and edge doc page ([6eb5e5a](6eb5e5a9862c22b307dd050499979dcfebfaaaef))
- Add ([c4c9283](c4c9283f3af999cdae5e774c2eed5ba4f46596f0))
- Add ([a961e7b](a961e7be00b9ba5c63026f6555f548f87bc85269))
- Cleanup export path ([e7e4f1f](e7e4f1fd0adeeab9e62cf6f9f40496f47f015557))
- Add ([7cd4ed8](7cd4ed8334c963f7e039bf81e952f9d3bd1fc452))
- Add ([2c2fdf9](2c2fdf9577c96cba532bd0679407d25bb492e2fc))
- Add ([5f7d439](5f7d439ee223a0cefac89ad4cc04cfbf8ac797d5))
- Add ([4f4dfc3](4f4dfc32ea464d528cb58e4db6278d72cc48b1b9))
- Remove `groupEdgesByZIndex` util ([4d68397](4d68397119e33b00e6e4fecc0c3972b1b1f404b9))
- Cleanup ([82befe7](82befe722a0f695173a743abedcacc385d105ae0))
- Add ([f604c91](f604c91a7d1177b3d39fadc80768057ca7e9d92b))
- Cleanup ([b350486](b350486db374980e0f9b0e47e5f2a3145d1cfe88))

### Refactor

- Use separate svg container for edges ([8e5d748](8e5d748013cfba28363514e6562778f2305e577f))

## [1.20.1] - 2023-05-25

[0e7f3c2](0e7f3c223ceff311240739ff65f0e8d75e2b433b)...[a16b7ca](a16b7ca3d01681b8ccb172ccde0316bf267d7352)

### Bug Fixes

- Use OR operator to determine `isInteractive` state ([5d16068](5d160689b9f410b278515e520ba314f77a3a25a8))
- Set default viewport type as partial ([1b39615](1b396159ed6c2b62c4a83f45cfb0ace204f7d92c))
- Use all handles in radius and find closest valid one ([1690891](169089180410fcdc490657c719a11dab4becaedd))
- Filter closest handles by validity ([e42897e](e42897e3eddc68850a551152f72c47c19f232394))

### Features

- Add `align` prop ([f5152a9](f5152a9fd35e61cb38ad96b322841c74a4eff2dd))

### Miscellaneous Tasks

- Dynamically import webvitals ([2bac3d5](2bac3d5afcef61503ecb16f0dbe69b4c5e53a304))
- Remove reactivity transform from `useDrag` ([e52f747](e52f74703adc4665626dd0102c473ba4f5e0c7ee))
- Add ([527afd9](527afd99b94022ccc8e780d27ccfebbc26192cff))
- Cleanup unnecessary refs ([13d3be9](13d3be9c332de90bc3dc7460e7ee099a062f663e))
- Add ([c3b0680](c3b0680e895c8724de0479ad505c81d0565624dd))
- Add ([5820fcd](5820fcd8d973474fb81520c0210d8247d46d1dd7))
- Add ([f2974b2](f2974b2272c1a052aed412c3bbf5bd0c05335441))
- Cleanup ([b3412bc](b3412bc8ece6c02428f5fca607c434d6ab474b41))
- Add ([1349461](1349461286dd1a91b3584bda2a8bf9110fa9ae30))
- Cleanup handle cmp ([8fa6ad5](8fa6ad50760090c4800f3a95a4402781b9a86095))
- Add ([2b31cb5](2b31cb56c328c4d12b8d5913ee6902c85eab9c3d))
- Remove auto-imports ([85dea35](85dea35b26d298c19957837f69fad571a054dba8))
- Update turbo deps ([1d2cf7e](1d2cf7eaf42833765ecee3a236bdfccbc31079b2))
- Lint ([128b968](128b968168770059601e8281da37925045d5f64b))
- Update deps ([5a86c7c](5a86c7cf1d2ccc9dd130ae3c17fb3b84ce339515))
- Update slots patch ([77df926](77df92685fd3d03e010518f947a831cc29058140))
- Update vite & vue-tsc ([26943b2](26943b2d85a741979b13adc1db49f82c40ece710))
- Cleanup ([ff9f647](ff9f6471ed73641712d84e28fa2e7dc074c3a1d7))
- Cleanup ([1180ab2](1180ab247fcdead49eb8d546619a0ef808b5c6c0))
- Update pnpm-lock.yaml ([27666d9](27666d9b0fa9af65f1caeedb5f14bfe36c227418))
- Lint ([8466e85](8466e8533020e8cdf0505e7d2b010499bccc2b84))
- Add ([910a354](910a3543f6db5f8a0eba6c3991c2c3ba01f88a26))
- Cleanup ([1a083fc](1a083fc8614916b012b148bcdcfd733a04f21002))
- Remove reactivity transform ([f720f27](f720f273609e76c035d1904da8bce3371a7612aa))
- Cleanup ([c52396b](c52396b43b337c6e41bc4f17b0d43f1a4bb671fb))
- Cleanup ([b2cdb6a](b2cdb6a143c1bb9e8c55f6a3852ddb846c704f64))
- Update deps-dev ([0e5a678](0e5a678a7bf74f826f3051e8c83faad7d44f77fa))
- Lint ([94b43a6](94b43a68d69697044e6b1fceadd82c5d4bfff171))
- Update color selector node example ([4336ff7](4336ff7578b6c54a2173c640aba71a81eb07163d))
- Add ([b9c2ca9](b9c2ca9141fe2f16c604c641deb74a5541bd2482))
- Cleanup ([1e786a9](1e786a9b088e048382dae5275df92b00bd8b747c))

### Refactor

- Pass drag handle to `useDrag` ([20a9521](20a9521cacd2c9af9bc91adebc51391b57405d42))
- Remove unnecessary computed var ([627cbf6](627cbf65a88d86d60d4bdde71fa8dd7dbc2b66ea))
- Remove reactivity transform from connection line component ([9b0b969](9b0b969caf8b720cc2297cc1a2e993d86c745d74))
- Allow ref for isValidConnection in useHandle ([4d505c9](4d505c974c68c22e4ff2e2ae9a51c83a3ebd2a4d))
- Disable zoom in/out btns when max/min zoom is reached ([49fbdad](49fbdadb720801e9cd174f151358629060745b6f))
- Remove auto-imports ([09a97da](09a97da11682371f290a4160a32239dce653de64))
- Remove auto-imports ([9698691](969869110a07cfb09934dfdf8c12ad8b0469b77a))
- Remove auto-imports ([bc0137b](bc0137bae868ad3774e38ad48e8b0916022b64ae))
- Remove auto-imports ([6fd58b6](6fd58b621281f396d181f7226f669477f7a44ce5))
- Remove auto-imports ([9a91278](9a912785a94cc6cddbad6a6134c0ab9872273a38))
- Remove auto-imports ([0a11840](0a11840922b773c9f921a34d5e445c216a00aa6a))
- Add explicit imports and remove auto-imports ([e3e6a03](e3e6a03359937f8a6534aa4aaf862aafab0f84ae))
- Add explicit imports and remove auto-imports ([ed4eaac](ed4eaac34e465595dc0a8b237809ccf1f064ab75))
- Add explicit imports and remove auto-imports ([5da86cb](5da86cbd2d7735bb48b6e5980a74c54dda160d0e))
- Allow passing null as id for find actions ([4421ad0](4421ad0ee753c332b88f011ba32baf627dbf5639))
- Avoid inserting invalid nodes ([06ad0c0](06ad0c0d20f316ef8738c1a69ec255ff6c07b3b8))
- Check if element is object ([4ad10c5](4ad10c50302a0b66694e8b9f85d37e4853c4fbd8))

### Testing

- Update edges tests ([3a1b0ab](3a1b0ab78b04e7d38598164c07bea5feb1ebbff5))
- Update nodes tests ([669a2a3](669a2a3f8cbcb67dfd9ccc5bcec349d3740c3154))
- Update delete key code tests ([f9462d1](f9462d16a95f80ac03cecab50be80aeceb13a5ec))
- Use timeout to avoid cli run fails ([9bf9c64](9bf9c644bef1d3ba4125c592491bc163ca3de974))

## [1.20.0] - 2023-05-11

[ca54537](ca54537d546f071cd810b3e7bba5d2951554b36d)...[0e7f3c2](0e7f3c223ceff311240739ff65f0e8d75e2b433b)

### Bug Fixes

- Do not render edges connected to a hidden node ([4bc576e](4bc576ec7f58980bf8160c1060c4252271c221d0))

### Features

- Add `parent` class name to parent nodes ([26be1d2](26be1d282659963da8105d1e6480e67e7d631c1c))
- Add `fromObject` action to load graph ([abb302c](abb302cb030cb4cba728685dd9e12c7ad35fb667))

### Miscellaneous Tasks

- Add ([616dfcc](616dfcc817f6f692eedb74cd100e7d727e3414ab))
- Remove non-nullable assertion ([833afdb](833afdbd97b160a258db0c4d1f28d2f81530e92d))
- Add ([f174ce7](f174ce7afc14fa545997f92290fa4583a63937ab))
- Add ([74939d0](74939d03251236768a2b2f7534c7d36271329f27))
- Add ([f5e0cef](f5e0cef1166dab44dd2abc72fbcfe44237d13b55))
- Add ([54659d4](54659d4a84f444a1d92f8594cc8381eb0a1d0e3f))
- Add ([1307712](1307712e32aa13ffd9c6e4c067f4ad024d7ac022))
- Cleanup ([da9cbc6](da9cbc6e77e43b65d382a49939be8c51f15cf52c))
- Update deps ([3318a08](3318a0837d7f58959faaa62e9dd787108ad03a53))
- Update deps ([56e7dd0](56e7dd0bd0f298c0daae7b93cda43a94575134e0))
- Update deps ([5610efa](5610efa4701896fc37d945d9285f825dee31fb96))
- Update examples with new API for add/remove ([e464d7b](e464d7b8a5d18213cee9b5d9dd192064ceec1c46))
- Update examples with new API for add/remove ([945af78](945af78c8b8ada41c358547e955a85e211021743))
- Cleanup ([ca302d7](ca302d751006f45339d944f30a4ae072454cc24a))
- Lint ([6b88c97](6b88c97a22d5d61a90b906fdb47b567a2fdd5ba1))
- Add ([51f91d4](51f91d48d648c9623385f3576c7a9467b5b83552))
- Avoid jumping intro ([09e63e0](09e63e0ad676c753addbe45e1f5ac828bbb64beb))
- Update RGB examples ([d470ce1](d470ce1f92eb2a1b242542fa86b28b40573bb77b))

### Refactor

- Allow passing single element to add actions ([ca9eda9](ca9eda98ddc4608c49143897c79d70df112eddbe))
- Remove reactivity transform in node wrapper ([a7db003](a7db003b68e6e3cc6e706c43849ff3f6a85bfd09))
- Allow passing single item to remove actions ([073e987](073e987fa8cc3082509d311977740428998da845))
- Pass id to base edge ([fb09d08](fb09d08e9b4d1637cc8fd84ddb6ba0f1fb87462d))
- Pick target handle if handles are on top of each other ([fb1181f](fb1181f2093f075ed0a47ebd59a5b1786b56dcbd))

## [1.19.4] - 2023-05-10

[d673020](d673020586ec839fc7cd32313d2602c488637645)...[ca54537](ca54537d546f071cd810b3e7bba5d2951554b36d)

### Bug Fixes

- Check if transform changed before applying ([0c34023](0c340231b8d56a8178a2c0f0c0b9439e29fc6cb7))
- Properly reset state and retain reactivity ([6f3c22e](6f3c22ee664112af98e8ade5a2d1f7e2a81aace1))

### Miscellaneous Tasks

- Only re-set elements if breakpoint actually changes ([60327ee](60327ee6a14cf633b8f5109b22083d1a02bcb2c0))
- Check if breakpoint matches ([dff1d72](dff1d72788b2914b0b1a68e1bdf0ffd9c5e0de2b))
- Dynamic box width ([789ec7e](789ec7ee0e5251d89fd6592ef1fcffc9b17fdaaf))
- Mobile intro flow height ([1ecfcf1](1ecfcf100581e79a40112c6a350a213dfc042303))
- Intro min height ([e909f78](e909f78c7199ee1d561c24585aa8df5b221eaabc))
- Add ([732e0f4](732e0f4951ab1fc84d5418b17d995fcc6d4828e7))
- Add ([0889f38](0889f3801b722ca69f5a131cd9601e56906be059))

### Refactor

- Remove reactivity transform from viewport component ([e5591ee](e5591ee1df9b7d8a76958ab984007a184e46c2eb))

## [1.19.3] - 2023-05-05

[f8b8f27](f8b8f27735ff3d71e9c5008ad50d94ee4c3116ae)...[d673020](d673020586ec839fc7cd32313d2602c488637645)

### Bug Fixes

- Emit pane mouse move if no active selection exists ([98e6f17](98e6f1700222003d6b4b6c083580fbdb415dac85))
- Pass selectionKeyCode ref to useKeyPress ([85dcbf4](85dcbf4b46eb961b51969b2ebceead3da2413b8b))
- Check if node exists during drag ([bec2e74](bec2e74dcbc3ef87e9fb3d8d097942c8467c968b))
- Orphaned edge warn for undeletable edges when calculating max z-index ([74a51f4](74a51f4339b12f64e426b2c311be0e36a2ad81f6))

### Miscellaneous Tasks

- Use promise.all to fetch counters ([f42aede](f42aede4400389f020a979be5ed3486bbf6ac82f))
- Remove animation and confetti ([af12660](af126607bc0d4823fc8715f9af0acf51bee0f801))
- Cleanup ([87c5554](87c55541dd4b6db4600436ca5ac34aac80dc0a2f))
- Update handle styles ([926108f](926108f2b7cceba2184368cdce274d5f536bb749))
- Add ([f1c08b8](f1c08b82b6a5847d12ea34cc036a231b581de5df))
- Add ([edb01a7](edb01a735e596ad6646c203d5066a0b0e76e8dfe))
- Add ([558b723](558b7232e5284df7d25ec6865e1585ba1fb14f60))
- Update basic example ([c2b6a62](c2b6a62cff18f51422b34aeb97fd2b513ada884a))
- Add ([34c2258](34c2258a4fbff0a8663f60e52e4a8b84ee031a34))
- Add ([6d808a0](6d808a088f99ac7a69bff802ca8dabaaddd72cdd))

### Refactor

- Return boolean from panBy ([df54220](df542208d263d4f8b76068425fab3141f7ef875b))

## [1.19.2] - 2023-04-26

[c74996d](c74996d75b0b9518fa44902e8749aee46e7244f7)...[f8b8f27](f8b8f27735ff3d71e9c5008ad50d94ee4c3116ae)

### Bug Fixes

- Immediately watch route ([86eb6c0](86eb6c06309cffd92ca5d98d6147f4fbac70fa64))
- Hide resizer when `isVisible` is false ([a3f27fd](a3f27fd901b02ab54fe6dae84ee516789cad5489))
- Remove border, make the control look modern ([ef97685](ef97685c1ee1b73eccb1afd547475c3434053ae2))
- Selected,focus & focus-visible styles not applying correct default colors ([9bd48be](9bd48be27cfdc1ab9b992f4a19eb0e0a4d62aa02))
- Selected,focus ([d6aa757](d6aa757b7441ac93885131b94095ca7687fee846))

### Features

- Add pinia example to vite-examples ([18aeefb](18aeefb0694ec2dfc2a9bf11100a9023f0a57f8d))

### Miscellaneous Tasks

- Set collapsed to false ([f1c38b2](f1c38b28f78b379cbbe81709e0c25cab13170d35))
- Render repl in ssr ([aa62e19](aa62e19ed9723d76798ba371cfb3397279c404d1))
- Add ([980916d](980916d1938468fcade2927e409c0a7abbdb7f60))
- Add ([bc325af](bc325af2abdfe41c1995fddf8ac21f1b29f79e41))
- Correct version access ([40ef9bc](40ef9bc4024b7756dbe709e228adada3c9908606))
- Add ([53884a9](53884a941e0afbd26c23ac1162191f9c187258e2))

### Refactor

- Set vue flow version as regular string instead of ref ([260a3d9](260a3d9a867f41688fa7a14535fc888bd1cdebe6))

## [1.19.1] - 2023-04-23

[544fd05](544fd05d3e088700e62a6a8de8787f62bf8d13f9)...[c74996d](c74996d75b0b9518fa44902e8749aee46e7244f7)

### Bug Fixes

- Correct defaultEdgeOptions type in state ([8db8dc8](8db8dc8fc5117b1e1c4747b20fe8d57393425049))
- Set default edge opts before setting elements ([e41a66d](e41a66dc2d3a713288ffc0e67674e7ae7002aff4))
- Use default color as fallback for css vars ([cdef517](cdef517651f1f4bd2cb9d00ff0bbc6e4361f03b8))

### Miscellaneous Tasks

- Add watch scripts for types and update dev scripts ([0944146](094414684291a29613e467f0fc333d46984fc6b0))
- Update pnpm-lock.yaml ([56ee5ba](56ee5ba6e9af950496a916199c3003921b8a5eb0))
- Correct import path of `defineNuxtConfig` ([20f9910](20f9910793bb53dfa26d25bb0ef93bb54f099f0c))
- Lint ([99866c7](99866c76174b3b5f5a545ad37937a346c31c2423))
- Update deps ([5e4225d](5e4225d0b68528a852c8f236144137d55061b603))
- Update deps ([a639777](a639777cb7921e9af5738faa42f3c9762d9bfe72))
- Fix node version to 18 ([7735c6f](7735c6f07cb1227c74c9535bb8e23a8a13f1f9bc))
- Update config ([e294145](e294145520215d34c6b2deb845c9e02b06ada799))
- Update styles ([70604b9](70604b965695d413f6184a9d11ba287d37dc354d))
- Remove team section ([ea78e82](ea78e827a3159551ec164ce30f361e82ba2a731c))
- Add ([d822005](d8220050abfcbf6c1a8c6a0a1fdbbda97173b610))
- Add ([85de8b0](85de8b03e72ac33bca13a6969aceaf25c5420c6c))
- Disable no-console rule ([ade0784](ade07841b9dd43e32ef8db4674fc529dbd30f87e))
- Lint ([a238c6d](a238c6d3f5ee186b6781a1e90574dfbc489c2dc7))
- Update publish script ([c74996d](c74996d75b0b9518fa44902e8749aee46e7244f7))

## [1.19.0] - 2023-04-11

[fc8cd4b](fc8cd4b9ea5a3ff48a968f87e97b668cf76d0617)...[544fd05](544fd05d3e088700e62a6a8de8787f62bf8d13f9)

### Bug Fixes

- Allow extent when no parent exists ([44049bf](44049bf7145a093ff68d5a2450cca713a4e19331))
- Prevent auto-pan from dragging into infinity ([1b85842](1b85842d4847626729bbff6d7b106f42e7698147))
- Add missing `Type` generic to edge types ([aaeb6dc](aaeb6dc4b805147cb689b747c5f5b092a87b7e15))
- Add missing `Type` generic to node types ([ab482bc](ab482bcf5d446dc5a59051b94449cac83fbbb710))
- Allow passing regular edges to getConnectedEdges ([2b836dd](2b836dd3925ee98a5a33ce130c35d964d6a74252))

### Features

- Add `getConnectedNodes` util ([ec44dca](ec44dca56a3deff42ee9a105eec04a1598310119))
- Allow coordinate extent as range ([4a24509](4a24509f5fd13ccfab34ca30240efe6dca5715a5))
- Allow setting global node extent as range ([717d8e0](717d8e0d43e9dbcadcb2201b7cc73df92f670840))
- Allow setting padding as number ([f3ee95c](f3ee95c81b225023cfb456ffe1c199c25b14be9b))
- Allow passing node ids as string to `getConnectedEdges` ([b3addf6](b3addf63d2ef029d22c29d8f0d5960ba325341b1))

### Miscellaneous Tasks

- Add `MaybeRefOrGetter` type ([2a5af98](2a5af981823faf39441d0e454997471d6ab6f6d7))
- Add eslint rule curly ([ab18bbc](ab18bbc7d8a4f9ab503a5c2bb663a49dc7a68111))
- Lint files ([5560949](5560949ed1256ccd9be1c58e8f85d88597426d32))
- Remove unused watcher ([e4c4bd8](e4c4bd8a941b56ed08842dff9a98ab11e84e784d))
- Cleanup ([1e2a51e](1e2a51ebb5c3d4236fc8e5292c1f5314bc51ec2f))
- Add ([884ca63](884ca633906d998a7119f09616fd5aa15416bc4e))
- Lint files ([56e911c](56e911c1e79910af348eed912a4f486cb57a327e))
- Add ([fefa2a3](fefa2a30ea855e099f338e8b2f71704bd10587ee))
- Deprecate style & class functions ([920fb3c](920fb3c9a49eb0f837366daa4402a5f661e09ed5))
- Cleanup types ([d9be769](d9be769f74806c612e59b0d4deb5be3302ad38a8))
- Cleanup types ([c99a335](c99a33542bbedf9e0d7760cc53bdfa9c0e29b6ea))
- Add ([608921f](608921fc71b8aff39fb0646a11979cd28045a0a9))
- Cleanup types ([4524948](452494851577d069fee907b30f4a8368f44a3e26))
- Add ([f8ab2bd](f8ab2bd2cfc1551f925a656ba01d5de683bc4a7b))
- Add ([27d62b2](27d62b29b756a617fe65527421a82902fb21d1b5))
- Cleanup ([7a55cb9](7a55cb992db364d6d0059d453c21dbc459d8a6b3))
- Add ([c0572f2](c0572f2ee2537f388d20e5bb1c7f69e2914312dd))
- Remove unnecessary async ([fd5aef1](fd5aef1dade7005653e5ec16e7e92e56d2c0e658))
- Deprecate class and style funcs ([378e508](378e50874d38b02d59319e32b515026a8449842b))
- Cleanup condition ([aae4a28](aae4a2870229a9f3a64d7ff521a38775f2f22c0d))
- Add ([c2b1cea](c2b1cea10b54ecaecd8b1c0743ff07d3f046f091))
- Add ([c1fc2b1](c1fc2b1e791641b6ae45cc3630e7dbbe5a9931ba))
- Cleanup ([5ff6c01](5ff6c01b174739594a580c092892a926156105cf))
- Add ([50f8456](50f8456c529d104be037fc3b845314a3f17db277))
- Add exports field to package.json ([31eb8ef](31eb8efeffbb0a5d231e282f4d072cb9384227bd))
- Add ([6922df9](6922df981628bfb2e802dadfc3446c0dd5c2edb4))
- Cleanup exports ([88c59a8](88c59a8f0266fefbbc74cc07b0829240e8ef11c6))
- Remove `MaybeRefOrGetter` util type and use `MaybeComputedRef` ([ac23388](ac23388394e722ee9234ba1edf0ad07808b4dd9a))
- Remove reactivity transform from `useKeyPress` ([72cd853](72cd85350242ce61d50c0d4623cffd608131f580))
- Add `4` to cases for padding search ([e6e0b25](e6e0b25d949fb3f9e8490636470e2c8ed80e1f9e))
- Lint ([4454867](4454867c365c589d04ba7a351e689d512f91f616))
- Lint ([544fd05](544fd05d3e088700e62a6a8de8787f62bf8d13f9))

### Refactor

- Replace computed arg with getter fn ([f19e210](f19e21044287f29f66d6f795fd84671b3063b748))
- Pass node and edge id computed to getters and actions ([ebed966](ebed9663b4d93ab423152a4661423c5f00154e2a))
- Search all edges for connected edges in `useNode` ([f5c8a04](f5c8a0424fc1c84d7460ad66a1efd7b3e0b29a74))
- Allow passing undefined as arg to `findNode` & `findEdge` ([1171e01](1171e01c9c9d63a0b375a5ce7b2f7ffd535e088d))
- Remove unnecessary computed var ([554ebeb](554ebebd13ba1af8c07f98fe354875f5022d7be4))
- Add `onBeforeTransform` arg to `panBy` action ([bfff135](bfff13572ea13ee0e5f1e87cb2e03565f87a0ec5))
- Set default gap to 20 ([1fd438b](1fd438b0b05574f738bc0635fdeca5316cc845ca))

## [1.18.2] - 2023-04-07

[0c05490](0c05490cf3784a97a8590ec710d0619126eeed09)...[fc8cd4b](fc8cd4b9ea5a3ff48a968f87e97b668cf76d0617)

### Bug Fixes

- Set handle connectable undefined as default ([d659d48](d659d482794354fcc806ff6b29c7bdb51c5d8089))

### Miscellaneous Tasks

- Cleanup ([0f18263](0f18263899c0588367dfbb6c724f19360f270c5a))
- Add codeowners file ([79140e9](79140e99c2aa719b539ebcd41cd99211ea87e788))
- Add ([86ecbae](86ecbae6f1c6e498e213e62739e67a82eb20e8b9))

## [1.18.1] - 2023-04-03

[e1b7bfc](e1b7bfcfb60d44056ed37747e23c8cd49a6d5418)...[0c05490](0c05490cf3784a97a8590ec710d0619126eeed09)

### Bug Fixes

- Allow null values to be set ([20dfdda](20dfddaad9551f8de3ccfdfc3793e9951324a4fe))
- Use fallback for connectable start and end ([3222e97](3222e979ffc03c8f407c4d5d5d50d5b4dad04ec6))
- Remove duplicate event binding ([8229ee8](8229ee8748319d5f64c1d8eb368c8d8fa7283d91))
- Use connection click start handle ([c459653](c4596530155afd1b9c28234c557c5e4ca7dd225c))

### Miscellaneous Tasks

- Add ([d261c09](d261c095a82af0a8a6d0975b0d83a56ac0f026f7))
- Add ([f750d0c](f750d0cc71e68ccf8e31979bd98c27ec898041ce))
- Add ([d0a8b9b](d0a8b9b080aa85a8a4ef8829241cd73a75b91636))
- Add ([30b7aeb](30b7aebc6c2e642f01781e09cde2eb8941a11bcc))
- Allow console ([0c05490](0c05490cf3784a97a8590ec710d0619126eeed09))

## [1.18.0] - 2023-04-03

[1ba8183](1ba8183b00652c02067fa4ca9fdf5b21e4716e0a)...[e1b7bfc](e1b7bfcfb60d44056ed37747e23c8cd49a6d5418)

### Bug Fixes

- Correct `isDef` typeguard ([eab9991](eab999176245d6fead4ce7621de0e5a596f2fdb1))

### Features

- Add `clickConnectStart` & `clickConnectEnd` events ([5a50cfd](5a50cfd90b1342fdf341aba17a68fdbaf868c09b))
- Add `inversePan` and `zoomStep` props ([1790566](17905660d6028f2fa188bbdd153dee9463cec136))
- Add `connectableStart` & `connectableEnd` props ([1d3908d](1d3908db6211767549e89b744d4e990e844d0183))
- Add type to edge updater anchor class ([4bb5321](4bb532132eae02e8fe8da5d712dbc1dc8933e388))

### Miscellaneous Tasks

- Add dev scripts ([707aaef](707aaef5350a308c979f63a85d575491df80caf9))
- Add ([4a0d9fe](4a0d9fe4937582d58fcd5ab5ed2a53eee268bc7a))
- Add ([c46020f](c46020fbc26e7af4178fe0684b1e763f5606b1b0))
- Add ([a9852bc](a9852bca128f6b5cc916842cf4b1ac110a9483d6))
- Add ([df46137](df46137d23c0a068e8f80ff1931b4407f7a858f4))
- Cleanup ([26a68e8](26a68e83ed8af30616b682ab3c7fb826742c381b))
- Cleanup handle ([b1c88b3](b1c88b37929fd763ac46b3153e992891cc7d08b7))
- Add missing name to `A11yDescriptions` ([ef94e1a](ef94e1ac19f6d5160bfb6e6577c7c29130f10dc4))
- Add labels to tuple ([1212fac](1212fac27b8c122ea727b7b5f79e94ede246cf52))
- Remove scripts ([d888b0c](d888b0c1ab34fc2927d4bf1bc252070a381ed418))
- Add ([da85ad0](da85ad0aca2dd31d92ead920d6429f8ad3dd641b))
- Add ([54cba6b](54cba6b865e74ea46cf557c5e4c4bee74846f0d3))
- Cleanup ([a105d4c](a105d4c0bfabdd8997f822849143721a91148ea3))
- Disable console log ([491fdb0](491fdb04e160e0082a667b1a515ea62d513f0c6e))
- Add easy connect example ([adccf1b](adccf1b38ede40fcb15a88915cc1ddac1b8fb8bb))
- Allow console ([e1b7bfc](e1b7bfcfb60d44056ed37747e23c8cd49a6d5418))

### Refactor

- Remove reactivity transform vars ([e9ff4cc](e9ff4cca9d39a79765b66c14ae1a39957c12a91c))
- Remove reactivity transform vars ([0f02296](0f02296fcc06cdcaf603dda460434e2a375fb48f))
- Do not remove orphaned edges from state ([63808e5](63808e5dd2fae41d18a0ebcadceb296f69751448))
- Add connection start and end handles to store state ([4efc787](4efc7870677a2211b8cfed2ad61360cfd9b8140a))

## [1.17.6] - 2023-04-02

[c437e41](c437e41092699d87b770589abd211c30ec0ca0f7)...[1ba8183](1ba8183b00652c02067fa4ca9fdf5b21e4716e0a)

### Bug Fixes

- Reset nodes and edges before state ([6c806e8](6c806e80597e9e4f0f634b43fafc651ef328a109))
- Hide transformation pane to avoid flickering of graph ([22accae](22accaed0d851ebb34b97a1d045d93b4ac98a86e))

### Miscellaneous Tasks

- Add ([fd3ed23](fd3ed2390991cb7685c6d2247d2063fec5e7cf49))
- Add ([603aa69](603aa69ec291a8fe18ee91a0b03bc8df60d1bc25))

## [1.17.5] - 2023-03-31

[977ccaa](977ccaa73e38027e400397499aeaf377c99cb9ac)...[c437e41](c437e41092699d87b770589abd211c30ec0ca0f7)

### Bug Fixes

- Handles with connectable false still considered valid ([c4f287c](c4f287c574de1d2011be7a0b29a541bfbda2b43d))
- Unwrap `nodesConnectable` in onClick of handle ([f62e6df](f62e6dfc5318e760e50de424e3478e828f30b3de))
- Connection line pos not matching edge pos ([44d1a4e](44d1a4e3dfaee4a5d8d01ee4c1688455d1b3dd48))

### Miscellaneous Tasks

- Remove reactivity transform from handle ([d0ac0b6](d0ac0b66eacfc9eb18e3ae70063d3d030ff0a4b1))
- Add dev script ([d615564](d6155645e45a9dd632fc8cfc3fde845b75cddc1b))
- Cleanup ([60fefab](60fefab45b16ba26dd5b57db68c0ffc3d70394ed))
- Add ([7fa58c9](7fa58c953939191f5dda31f414f82eebd461c3a1))
- Add ([7772965](77729657fcbd55462a05548dc9a3403f2b1cf6d3))
- Add ([912e14b](912e14b7caaf487331f3e9092f9e446e5a12d795))

## [1.17.4] - 2023-03-31

[36da593](36da593818950269f25fc367a12ea72df1bbfa19)...[977ccaa](977ccaa73e38027e400397499aeaf377c99cb9ac)

### Miscellaneous Tasks

- Update lint scripts ([65db65d](65db65da2f4a53cb4d614788ce8fecac720153c0))
- Upgrade deps-dev ([9d597ff](9d597ff454584b90950f95b27991d63e03846cd3))
- Lint files ([f61e5be](f61e5beb0274a61edc2979e866861326467ba74b))
- Remove expiremental flag ([294c3ba](294c3ba6320217b80496443d3b044bb00b09318e))
- Use cypress action ([09b886d](09b886da36f2917a416693e9c949b919c39d73a7))
- Update cypress ([d154105](d15410523f54e4bed7636727c2e4f9b4d5d8277d))
- Add ([fdf317d](fdf317d35b331abbc76f75dcc05b1b615774ea78))

## [1.17.3] - 2023-03-31

[4a2598f](4a2598ff670d24c5651380bb984bfd6bba7fdd0f)...[36da593](36da593818950269f25fc367a12ea72df1bbfa19)

### Bug Fixes

- Object assign order when parsing node/edge ([ce0002b](ce0002baea0ed0caef571afd1cd617403bb12092))

### Features

- Add install deps action ([d269f57](d269f57d01d8669b134f23f7c2f6344f5b4f3974))

### Miscellaneous Tasks

- Add engines to package.json ([cc4d0da](cc4d0da5cbcbb987edbd1642c4cbe754854c1172))
- Use install deps action ([7dfd41b](7dfd41baa67ad592986771a914169ecc819321c6))
- Update pnpm-lock.yaml ([c87d97e](c87d97e94e3e51bd20f5c6a1afc6b7ff22790f2f))
- Cleanup unused env vars ([1880cdf](1880cdff8f2728adc2995da23a426f3e1e736a9e))
- Update pinia example ([0aee70f](0aee70f6c45f76614737c2ee2555e76e459c6ed2))
- Add ([640adf5](640adf59938f75ad99b928c895bceb47a8a43d0d))

## [1.17.2] - 2023-03-29

[0bc4b73](0bc4b73625ffc5da5b8576d27b1d27ea131a39ee)...[4a2598f](4a2598ff670d24c5651380bb984bfd6bba7fdd0f)

### Bug Fixes

- Make @wheel and @touchstart event passive ([330a3b7](330a3b7a4ff2afb672ddd8ac0f56cd42d6049a50))

### Miscellaneous Tasks

- Add ([51269a4](51269a4e5720b75e2a674124b2eb72a62d0b9ca0))

## [1.17.1] - 2023-03-24

[e7b0c4b](e7b0c4b73ed3b2085bc36b3248463a7401fdafe7)...[0bc4b73](0bc4b73625ffc5da5b8576d27b1d27ea131a39ee)

### Bug Fixes

- Correct return type of getIncomers & getOutgoers ([0501151](0501151e94e9a02d86e3220c273872b3976c54ef))
- Only use visible nodes to check if nodes are initialized ([c330686](c330686833968d9482067f061579da28f1263a9f))
- Add missing error event definition ([976f7c2](976f7c257bda2da81330616756a69451cd4c8a7d))

### Miscellaneous Tasks

- Add ([54ea8a0](54ea8a0d0c6c95931cb2aeb0079751db6447df65))
- Cleanup types ([9791448](97914486db8742332f90ff5aec0f0a5197b8f286))
- Add ([cd5fc0a](cd5fc0a7e7494a4d16831917036f794fc38b6980))
- Add ([693601c](693601cc04a239632bb77f5c3d86d32752d97934))
- Add ([d59cc78](d59cc784960038a765160bdbce3f6f072ee44a8c))
- Cleanup getters ([0cdff91](0cdff913221bf9d9c9cda8eeef71837f8e6273c4))

### Refactor

- Check if node handle bounds exist in `getNodesInitialized` ([2944744](2944744df18ffb73b6ed175caeb2dc3ed2a434ee))

## [1.17.0] - 2023-03-23

[0ab0de1](0ab0de1a4d35247905e756fb4504e8419db05f79)...[e7b0c4b](e7b0c4b73ed3b2085bc36b3248463a7401fdafe7)

### Bug Fixes

- Remove erroneous window.stop in EdgeRendered ([c93e405](c93e4054c37fb16cb3381a24114438451ec5ed89))

### Features

- Add `onError` hook ([8c3f54e](8c3f54ec28873c512f07146f7ef7d4a601acf0f3))
- Add `offset` prop ([1f49358](1f493585696f34405c178deda91767c7e55610ea))
- Allow passing object with only id to `getConnectedEdges` ([79a0967](79a096743dd441abcc62ab12df8619224f5ed339))

### Miscellaneous Tasks

- Add ([5209fca](5209fcaf9dea1ee7937e7b30fd3fbc37927b7ae8))
- Cleanup ([b101bf8](b101bf81dab99b3ad6a8ae4c394951595df8a979))
- Cleanup ([e70ebc2](e70ebc209326033c9aead9ac6cc94b8364b26a56))
- Add ([170f79c](170f79ce60e159ea61a0a1b93e87fb30d937d45b))
- Cleanup ([ceb90c9](ceb90c914e6e780e5a2a358b8d92cd99b1607507))
- Add ([17da28e](17da28e614a4beefbb4dbaf9343e0754d3049219))
- Accept invalid handle id config ([f08af3f](f08af3fc0e06ceed6b32bad230694f87f728fb9e))
- Add ([ad8c181](ad8c1819a7a0a573e0b50f05e9d81bf6069f2303))

## [1.16.5] - 2023-03-22

[12af745](12af745ac72d7d2a0099f70fc946d47c5c949bcd)...[0ab0de1](0ab0de1a4d35247905e756fb4504e8419db05f79)

### Bug Fixes

- Non-passive wheel event listener violation ([e7c39b0](e7c39b065d895875d5079e0bbe6d5877ac6d1b1d))
- Wrong pkg entries ([988d4a2](988d4a2260a07e290ed9cc5c65d3f34ecaf16719))
- Use object assign to parse node ([04598cd](04598cdcf626c536bb0d1ea3796e198e5fc76eed))

### Miscellaneous Tasks

- Update discord link ([80a7049](80a704984375f4619f57a48d2d4f6c64944445d7))
- Watch files and remove alias ([95b346d](95b346d2240ebc0772343653360cf52c6656e323))
- Add ([2f87aa8](2f87aa8578c0bdc1db2669aa06a77389a130e208))
- Cleanup ([0fb4713](0fb4713c0bfc7a5e400604d9baa25e44bb823be5))
- Add ([94df425](94df4258a57bb9e178abba352635618cac6739c6))

## [1.16.4] - 2023-03-17

[e58d24d](e58d24d9f03028342d500bf46a60c40358b93094)...[12af745](12af745ac72d7d2a0099f70fc946d47c5c949bcd)

### Bug Fixes

- Unwrap refs and pass props ([0476dff](0476dffa988126d6e5960894c81ab6818c81a81b))
- Rename `parentNode` prop to `parent` ([fe46e6f](fe46e6f103201b636bde2a3d7702f33d9b8664f2))

## [1.16.3] - 2023-03-17

[b5d579e](b5d579ed3069166dff4a2eeebb063f435563b6b5)...[e58d24d](e58d24d9f03028342d500bf46a60c40358b93094)

### Bug Fixes

- Set source and target position on edge obj ([c9d643d](c9d643d7007fc09a1d73b35175ac5e18cc9be58e))
- Use render fn for node wrapper ([d8434e6](d8434e6e8fea57c4202eaafe03cfc836788cecff))

### Miscellaneous Tasks

- Update custom node example ([e678f6f](e678f6fdd8659200f4b200b62f8bba24abe49c58))
- Cleanup ([ccb302f](ccb302f1329ff32274c74b04faffd86c9753bfdb))

## [1.16.2] - 2023-03-10

[15016ee](15016ee21a9a0e2247444dc880c4a0542702f54f)...[b5d579e](b5d579ed3069166dff4a2eeebb063f435563b6b5)

### Bug Fixes

- Check if valid connection func exists ([79a6fa3](79a6fa318cb4cc62c8bba6375469567c09059365))
- Use computed for edge class and style ([5bd1eed](5bd1eed98e76e4955380d62f8186723a3adadcde))

## [1.16.1] - 2023-03-08

[df87394](df87394ea4ec6733530193065550bd1646ba9f9e)...[15016ee](15016ee21a9a0e2247444dc880c4a0542702f54f)

### Bug Fixes

- Downgrade unplugin auto import ([2b0e6fd](2b0e6fd07273d67601accfcaf084bcb4c6fc2a0f))

### Miscellaneous Tasks

- Bump version ([15016ee](15016ee21a9a0e2247444dc880c4a0542702f54f))

## [1.16.0] - 2023-03-08

[619ce7f](619ce7f4427d2b4257c8df5ccd2217b6ed18e7d7)...[df87394](df87394ea4ec6733530193065550bd1646ba9f9e)

### Bug Fixes

- Force update node dimensions ([284e527](284e527a36283099baf21924370646d667f93a54))
- Add connection target handle id to result type ([046ee41](046ee41e79b8fc1cb6d593a978a9b41d761c48b4))

### Features

- Export clamp util ([5297fdc](5297fdccbfbcd9e099f8aeff3eaa097c1cc474f1))
- Add maxHeight and maxWidth props ([afc29db](afc29db489c9d765b1c48baaf5fc43cf0abb997e))
- Store handle validation in store state ([9fb5515](9fb551569d827237cb1a5766ffb2af862e1349c2))
- Pass targetNode and targetHandle as props ([dc23bc8](dc23bc8920d6a9d5bf33f83cc20259283c046dbe))
- Add `isValidConnection` prop ([05bc748](05bc748100db824a23803a8607a78e1387c0d565))

### Miscellaneous Tasks

- Cleanup store state ([c74382f](c74382fe1d61dd7d90d866449767233c124ec630))
- Update deps ([870c8fd](870c8fd40776fb9a4a713754258e3b89ce3a4a41))
- Bump version ([df87394](df87394ea4ec6733530193065550bd1646ba9f9e))

### Testing

- Add custom connection line component test ([7519b31](7519b31b8fd5621e6ad8dd5ea3c4ac0affa826e9))
- Add isValidConnection prop test ([929e2b5](929e2b5d049eff11f99e5f7a77c354c624d4756d))
- Test if custom props are passed to custom connection line ([3f72713](3f72713e3ed5a1695cce9307ae13151bb78ae8bd))

## [1.15.5] - 2023-03-07

[2fde41e](2fde41e3d313bb2932420ca4a5c694b7cf940775)...[619ce7f](619ce7f4427d2b4257c8df5ccd2217b6ed18e7d7)

### Bug Fixes

- Check if handle is connectable ([f83c87d](f83c87db08f436264cb43f6da5fc44a341d8b6ba))
- Blur node after unselect ([8cf8c51](8cf8c51e0ea372e93b81c3c665a2a0feaa476f02))

### Miscellaneous Tasks

- Add todo ([66e210a](66e210adf4bc76cf93bd7952acd4df0add13b7d6))
- Cleanup deps ([36a12a6](36a12a6fe8136842f01cefee59fc77fd14c02b78))
- Bump version ([619ce7f](619ce7f4427d2b4257c8df5ccd2217b6ed18e7d7))

## [1.15.4] - 2023-03-03

[77d7ba4](77d7ba4dadc1b2c4f2752937463f853953c14811)...[2fde41e](2fde41e3d313bb2932420ca4a5c694b7cf940775)

### Bug Fixes

- Compare internal node dimensions when updating ([da7dc3d](da7dc3de4a564be05de2657e7b60a53d6871cdc3))

### Miscellaneous Tasks

- Update home page ([6d19bb1](6d19bb165bf4cb0e599500bb58b7876f33b92e2c))
- Add transition to banner numbers ([b8b9606](b8b9606496fb48f0d9aa359cdc74ed98b776c9a3))
- Remove transitions ([3d6cb4b](3d6cb4b912309854391fc042dfcc5441af203987))

## [1.15.3] - 2023-03-02

[585f1e8](585f1e8d6a4c8da239d25d2dff9ad7ff8b40a3fc)...[77d7ba4](77d7ba4dadc1b2c4f2752937463f853953c14811)

### Bug Fixes

- Prevent selecting nodes on drag when selectable disabled ([7c026f0](7c026f084ae5a35eb8972e1d8b77dd40c0359141))
- Wait until nodes are initialized ([c5fee5c](c5fee5c4f519e167755c1df16ff17b96a0b0e207))
- Make shouldReplaceId arg in updateEdge optional ([f16e4db](f16e4dbadbdeb3242d91ac6e9fe31ab3cc8a5644))
- Remove duplicate connect start/end emits ([22c4362](22c43628405567e844484b1c488986b1133837d0))
- Wait until fitting view on init ([b509b11](b509b11bfc5e6aefc3f92f16763142e4766f6e61))
- Remove edges before nodes ([77d7ba4](77d7ba4dadc1b2c4f2752937463f853953c14811))

### Miscellaneous Tasks

- Cleanup props ([320ea10](320ea10c88e7d2e78189a135ffec886d257e37ad))
- Cleanup types ([ee8ccfe](ee8ccfe2ccebfe8555f93c9d0fa3f59b069388e7))
- Revert edge renderer & wrapper ([addd0bb](addd0bbb67c72cf4bbdb91e48047d782f84037d0))
- Revert node renderer & wrapper ([566ba8e](566ba8e1f66d7c0451c4b7e944a5dcf9c02c01d6))
- Wait to find edge ([c91aac7](c91aac782d9180d9c2e07ea8053841d2f8857f06))
- Cleanup viewport helper ([ab78dc7](ab78dc7de1c9030dcb98e965aa7010158f657464))

### Refactor

- Cleanup edge and node renderer ([4d535ed](4d535ed34c68b1b50fd886e7b9102b7a19078fc2))
- Cleanup node styles ([e3e3510](e3e35109f151b3bc2acf43259005947cf5828e01))
- Hide edges when we have no dimensions ([50ee96d](50ee96d0c16bd01a06c6d4ccb370a58ca9eaa911))
- Update intro ([5df92c3](5df92c346303677673c1eaad4e78f33fc44047ec))
- Trigger el functions before checking arr length ([fc86787](fc867878fa095f7188acab427391883893918552))

### Testing

- Update connect tests to check if events were emitted ([13db453](13db453b661b21840689afb7eb1e467f0a43fa1d))

## [1.15.2] - 2023-02-24

[23b084e](23b084e8d23cedc9e60224444ff865a1cf29340b)...[585f1e8](585f1e8d6a4c8da239d25d2dff9ad7ff8b40a3fc)

### Bug Fixes

- Cast zIndex to number in node wrapper ([79e7f3c](79e7f3ccdb42bec05a7ac6a45984c535955204b4))
- Check if node el exists before observing ([0ffc2f1](0ffc2f1dff1e027e33eb2dcc24e2b547acfe24ac))
- Prevent undefined being passed to update node internals ([c4b4826](c4b4826a1ac0dc60b36e38b252b7266fea89ee4f))
- Wait until viewport helper is initialized ([f2af818](f2af8188e558b56f4f5fb2966a1f1c898af2db7f))
- Add vite iife build file ([a5644c0](a5644c0ead4f2770d6e0042f24b8b684e3bd8834))
- Use correct umd name for vue flow core ([06b1753](06b1753f48e2e63d9ca9d1dc2eba73b46ca1251d))
- Correct umd export names ([93b2fd0](93b2fd04eb4a6255a519e1b6cbe53f4f7acc90a4))

### Miscellaneous Tasks

- Update turbo ([1762eb4](1762eb43267b3e9fecf69000bd8bbe0926fb464f))
- Build lib when scanning ([a039ceb](a039cebdb9eb821d50f893d1b904abdb939d0757))
- Rename qodana.yml to scan.yml ([4872740](487274089c517eb234f3a2443c3ee461c4f02da6))
- Correct pkg deps ([3211686](3211686c400d1907fbcc79736751af6c8d8758f2))
- Update changeset ([c1ca174](c1ca17476aa9f21305f9406604d874c84639b760))

### Refactor

- Use lifecycle hooks to observe node dimensions ([325efba](325efba85645ca58183a259287a06b3a16dc0727))

### Testing

- Add custom node test ([17c28a7](17c28a7b6dbf73768a5d002160ddb7cdae78e08e))
- Add custom edge test ([e10663a](e10663ad5dca4df962f9c7aed902030d6e2c4244))

## [1.15.1] - 2023-02-22

[8c22ce0](8c22ce0bbbf32b3f683b2a5a34fae0a80088eb1f)...[23b084e](23b084e8d23cedc9e60224444ff865a1cf29340b)

### Bug Fixes

- Downgrade auto imports package ([4e66db6](4e66db654e9596c0e358a62e5eae24e1f571000b))
- Remove export ([3c0d86d](3c0d86d7b4bc1b2f365876f50d46203f52715be8))

## [1.15.0] - 2023-02-22

[7eba916](7eba916604d164721302181a9fb5b23ca6f6ce40)...[8c22ce0](8c22ce0bbbf32b3f683b2a5a34fae0a80088eb1f)

### Bug Fixes

- Hide graph until nodes are ready ([226caeb](226caebd4acf852434a07ce2b9a29ab2cc47d956))

### Features

- Add option to avoid replacing edge id when updating ([4bf4b63](4bf4b6386ee0bb733e125e6d0ad6b10d4b8079d8))
- Add eslint-config to tooling pkgs ([45cbdbf](45cbdbfd270d5c9160708c4eca7d3fb9fc23c6ec))
- Add tsconfig to tooling pkgs ([2a6077e](2a6077ed9f3d31be39375d71f063ffa963852acd))
- Add vite config to tooling pkgs ([8dd4536](8dd453634cf28738f9d31dd844db02a43eaf1bdc))
- Use vite-config tooling pkg ([2aa1857](2aa185756b5027ad94c891afcfc263eb208e7430))

### Miscellaneous Tasks

- Update prevent scrolling comment ([68b07ca](68b07ca705e03049a386b4058d733f579f9b727b))
- Update deps-dev and cleanup ([cbc29e5](cbc29e505daa5c9b45d996643bdd2de4d4b60704))
- Update functional component types ([aafd862](aafd8622f4ec245a9c421c86f084c6ae1f067761))
- Cleanup update edge action ([3cb6d98](3cb6d98f3f1bb021820ef74c169b2aaa4a213e73))
- Update workspace deps-dev ([358faae](358faae21c7902675c2866bfd474c739750becf6))
- Update changeset config ([df6f932](df6f932aac57130ffdb8bd5555fe65448e33919c))
- Update changeset config ([7d6fb44](7d6fb443f08b9b4c4a2f50abaa0ee3c64adfab69))
- Update changeset config ([cb6e3b1](cb6e3b1d86d01f4576bca793962a11b435d5890f))
- Cleanup initial render ([0d9bcf4](0d9bcf4b069d5564e976239d39623a666b25ce30))
- Cleanup unused watcher ([74f2596](74f2596f801dec6e273350f58a4c483f4fb17377))
- Cleanup ([b5103db](b5103dbb7e12d7a928a93ff3ed7daf89c93798d8))
- Cleanup async functions ([58a1ce8](58a1ce8e88f7ed36524621b4438b15eb16d62ba2))
- Cleanup tsconfig ([98db749](98db749e512663d5f409309884c3ce5221bf745e))
- Cleanup tsconfig ([0a0efb4](0a0efb4c8fddb204719c03a02c413bc47fe5645f))
- Cleanup gitignore ([f856d3d](f856d3d04c0183defa0aa4fe8a4f5fe4c32657db))
- Extend from turbo config ([8c22ce0](8c22ce0bbbf32b3f683b2a5a34fae0a80088eb1f))

### Refactor

- Fix packages together in changeset config ([578e6b4](578e6b4cfef280577063b5590c6dd202c8427eef))
- Package names ([c60398d](c60398d0f0eb30306415fb0950b839fa25de8390))
- Rename `e2e` to `tests` ([a3ec3b4](a3ec3b40a7d1da8a3a295db345de348a38fe1cef))
- Package name ([5c0fb91](5c0fb912fc47a7f851608e460f53a0d4482116bd))
- Run build and test on next-release PR ([7b590bd](7b590bd526ca2ed290bcba292977ff145c425e42))
- Rename tooling package scope ([3df4edd](3df4edd7979ec9ffeb0820b03699461e257ef89c))
- Remove waiting for dimensions in zoom pan helper ([d2c6b59](d2c6b592f550ec96e01fc97bd8554ad54dcf76a1))
- Add `useViewport` for store viewport actions ([7cab68e](7cab68ed84c34778934fb28c3abd537200dfe3ef))
- Use noop viewport helper when viewport is not ready ([dfce24a](dfce24a5faf3da3baa32334d1de48741bb06ab1a))
- Immediately set initialized flag ([4b2a978](4b2a978e3ab20663f359a4d0d1ecd82d462aa987))
- Use snap grid to clamp initial node pos ([fa6cb4c](fa6cb4c6d91b4b968e9ebb1610fdf722f7f9bebf))
- Omit internal properties when using `toObject` ([10f5074](10f50740b653654873e5d6dec21927bb0a75a43d))
- Add `release/*` to branch triggers ([eea05f9](eea05f9738cee9462b2ef728003ad8b4ff77d879))

### Testing

- Update min/max zoom tests ([12845eb](12845eb7e2ef3f1c62c02973d1e1a9c8e3b11acd))

## [1.14.3] - 2023-02-15

[2c574ac](2c574acfdf98293e79b1c915ddc4f274781209a9)...[7eba916](7eba916604d164721302181a9fb5b23ca6f6ce40)

### Bug Fixes

- Prevent rendering edges that have been removed ([c528726](c528726f122f65cbd05faa26a8f596de94a259a0))
- Allow null for deprecated connection line type ([1ae5659](1ae5659b6b71695bca64ea173b6d4e9a7caab2c4))
- Add missing straight path switch case ([b7cfec7](b7cfec78424e2044121f757a568b3dc1b8e04261))
- Connections for handles bigger than connection radius ([8a5225a](8a5225ab80172549554fba76d8a7cbdf30fe8b21))
- Correct checkout config ([0bc9ce1](0bc9ce109c96a6cf111e6351d8b0cf5e5aceb343))
- Add compatConfig to all components ([b19b9a8](b19b9a871b51ebdbb5e5c2997ee77b79ef3ce679))

### Examples

- Cleanup examples and remove deprecated usages ([72325d4](72325d48872af5f427c71b3971b378c8be0fb3f2))

### Features

- Add qodana scan ([3435add](3435adddbef33c6c8a468d0adb8732ba26767a7b))
- Add qodana.yaml ([fd18e19](fd18e19375b4fa518677ebd6dfe3b736d175bcce))
- Add qodana scan only for master push ([0734323](073432389cd795a3d7e0b189a672817664266aca))

### Miscellaneous Tasks

- Cleanup build and test workflow ([5b375cd](5b375cdb62cf1c62a0f07c09bdac8a185369fe26))
- Remove unnecessary initializers ([db0ec88](db0ec8836f6af35bf503c30a511620730d8ad0c8))
- Cleanup props ([eb6f7a9](eb6f7a91f21987c1f2ca1ebd4a0c04f2139b2b96))
- Remove any typecast ([9a14d8b](9a14d8b34909db042fd3455fb379e5834ca33d48))
- Cleanup connection line ([cc83ba9](cc83ba95bd79ec8cc90f9312787c0f89270bebb4))

### Refactor

- Use computed to group edges ([c62c18a](c62c18a20d72db1591b69ba8e2cd3fdd7872af9b))
- Use watcheffect to observe node dimensions ([a5ee9d9](a5ee9d978c7d6a7827804a39b23bf2a1a2b0b1a1))
- Fit view initially when node dimensions are updated ([3f21dc7](3f21dc764dcc9fe1d28762f749c3dc411a80efa7))
- Immediately set node dimensions in store action ([9d34251](9d342511f503483b253fdb9614695eb9d9858720))
- Use v-bind to pass connection line props ([ea0696c](ea0696c566e063266d15b7630a725feef38a90da))
- Use `MouseTouchEvent` for `EdgeMouseEvent` type ([09c56a6](09c56a60b316a2c0e43d6cbe084b31d1c0c51976))
- Pass original event to edge update event params ([83636d4](83636d4e53282f8972050c2170407cc5efd1a20e))
- Set `user-select: none` for edge labels ([b6f7cde](b6f7cde655e2d161380343718cde6f0e1485b610))
- Run publish action for next-release branch ([757fa1b](757fa1be72cd38039a6f66929a03225d8287c913))
- Change commit title ([2de90c7](2de90c77432233004909e7b3061b5972c06c7403))

## [1.14.2] - 2023-02-07

[aa59713](aa59713bba61ee41353cbbcb83ed470a5b4ccdf1)...[2c574ac](2c574acfdf98293e79b1c915ddc4f274781209a9)

### Bug Fixes

- Exclude hidden nodes in fitView when includeHiddenNodes is false ([26f16b7](26f16b75f8868138f121af2d42933f9eaea519ad))
- Avoid triggering edge update when mouse btn is not left ([f849999](f849999d20f696c2af075fb1e7de08e9ca2e0669))

### Miscellaneous Tasks

- Replace `default-zoom` with `defaut-viewport` ([0192c65](0192c6515f34a6775f2b9d9380be85b0d8aeb619))
- Use default values when defaultViewport values are missing ([77de369](77de369a3ff5663bb95cda5b8d767c892563944a))
- Update auto-import file ([26b92db](26b92dbe8b63e651cbc3405e1cb86d48784088c9))
- Cleanup and replace `const` with `function` ([bb2c4f4](bb2c4f449ab083c38a57846d85165c5f8c609a49))
- Cleanup useZoomPanHelper ([35daa95](35daa95c229d768ac7030f799e50b5842baeef2e))
- Next release ([2c574ac](2c574acfdf98293e79b1c915ddc4f274781209a9))

### Refactor

- Apply min width and height with aspect ratio ([49aef1e](49aef1ec88aa64662aa3772601e196e04b08db82))

## [1.14.1] - 2023-02-06

[6f02480](6f02480b173115c6702bebcfce56758ed588bc08)...[aa59713](aa59713bba61ee41353cbbcb83ed470a5b4ccdf1)

### Bug Fixes

- Check if prevClosestHandle exists in pointer up ([c800a86](c800a86893ac4877030e91ca5da3660f019d5fcc))

### Miscellaneous Tasks

- Next release ([aa59713](aa59713bba61ee41353cbbcb83ed470a5b4ccdf1))

### Refactor

- Cleanup `useHandle` and set status on actions ([619f4bf](619f4bf3e7f60be8a015dfb2c575602f52f4938a))

## [1.14.0] - 2023-02-05

[8328d78](8328d78ff29309a1213f1e14bd4778726233bc8a)...[6f02480](6f02480b173115c6702bebcfce56758ed588bc08)

### Bug Fixes

- Ios connection error ([f2f3e70](f2f3e70ebe559ead80feaad7012d7985951c8c9e))
- Avoid undraggable selected nodes being dragged ([c7e8bd7](c7e8bd7630d14c875a8f0ad84ba17a7f6b5ddeb3))

### Features

- Add `shouldResize` option ([222b58a](222b58afd45aac9c33ade7bd29bb4fbd41721c10))
- Add connection status to connection lines ([c36cf59](c36cf59a80e0f8c7fc8fc73a275e58c68aac06c0))
- Add vue flow error class ([dc60e11](dc60e112a10c10c01a32ae820842ee03c6c32996))

### Miscellaneous Tasks

- Add comment for panBy action ([3c2255b](3c2255ba52057c8e6bbc6794a9a29952dc5da98e))
- Fix github issues links ([1697e96](1697e965087c821e65d30ef53ffc944d9d5e1530))
- Cleanup ([7f26253](7f26253be1bc461ecd477a9355bea8bd72a6311a))
- Cleanup useVueFlow ([1448543](14485439934f087a483a0fb152dcde220e3159f9))
- Next release ([6f02480](6f02480b173115c6702bebcfce56758ed588bc08))

### Refactor

- Remove unnecessary warning ([c72e75d](c72e75db38e4c12628b1daa11377324f4ea0e1ae))
- Use opposite position for connection lines ([6c00909](6c00909f469ede75cd50cd2cbb52d15bcd3ec72b))

## [1.13.2] - 2023-02-02

[b2cc3f5](b2cc3f5cf9c118b6a9e2208a008194084131eb56)...[8328d78](8328d78ff29309a1213f1e14bd4778726233bc8a)

### Bug Fixes

- Ref access when passing default edge options ([cae9562](cae9562481366c5f47f0c683dc160f46d92693b7))

### Miscellaneous Tasks

- Next release ([8328d78](8328d78ff29309a1213f1e14bd4778726233bc8a))

## [1.13.1] - 2023-02-01

[4f0ddcd](4f0ddcdd26cb9bcfabf9a6bca0172f75911fae3c)...[b2cc3f5](b2cc3f5cf9c118b6a9e2208a008194084131eb56)

### Bug Fixes

- Pass valid connection func params ([a5ebd48](a5ebd480134cb38aa67c4e77e32e44a28bd25c0c))

### Miscellaneous Tasks

- Next release ([b2cc3f5](b2cc3f5cf9c118b6a9e2208a008194084131eb56))

## [1.13.0] - 2023-02-01

[b80bade](b80bade7df3d364c65ee2f4c76116e5b4b59ef76)...[4f0ddcd](4f0ddcdd26cb9bcfabf9a6bca0172f75911fae3c)

### Bug Fixes

- Animated connection line style ([2f81f2a](2f81f2a9c6472666f6dd7a093231af5492fc8a2b))

### Documentation

- Update connection-radius example ([539b85d](539b85dc5973133c5cf9c0b8fc39f73780d8e567))

### Features

- Export `getSimpleEdgeCenter` & `getBezierEdgeCenter` ([492de08](492de08eefc563dfed002bf8949ad44122758667))
- Implement connection radius ([e74a20d](e74a20d923c3b4a5bf70b8bf7da264918b4612a6))
- Do not snap to invalid handles ([e0fbefe](e0fbefef8f1af2a6329fbbdb254db6e7ad09b028))
- Export `isGraphNode` & `isGraphEdge` typeguards ([6ea6034](6ea60349fd2c00e95506b41ed168c6e33ca5cfec))
- Add auto pan props ([84f2235](84f2235f2378b58353583a743a560e290914192a))
- Add auto pan utils ([d0fefdf](d0fefdf04ed1334b1ca268584b9ed03f2cf08606))
- Add `panBy` action to store ([7dba01d](7dba01d880855e5064c4b7695388ba282e0537be))
- Add auto pan on node drag ([0dcfd6f](0dcfd6f9a4e36b6601c7b025808556283b221df4))
- Add pan on connection drag ([35d28ab](35d28abd65908e884a8cf1258c54f9c34683a293))
- Allow setting node/edge type with generic ([7fa9203](7fa9203ccbe290dc98fc00077fc731e251b38f7f))

### Miscellaneous Tasks

- Update license ([22dce89](22dce89f33f8abfbcf9b14c1771868dd1dffcaeb))
- Update deps-dev ([c920dc5](c920dc59b5763692b4568fab7d91dc4c7b5842c8))
- Add missing edge wrapper name ([93bfa54](93bfa54308b0a06911b3d5cfab3d9a64cb9a7b30))
- Add missing type to FlowProps interface ([02952b8](02952b8b6c66132cc855d4de806f0ee7c067aa05))
- Cleanup ([94a094a](94a094aa9e4f94b85ce1e7d8ffffc386987ec859))
- Next release ([36e977f](36e977fa31687e54a19a8efdad6147ec68ff48d1))
- Bump version ([4f0ddcd](4f0ddcdd26cb9bcfabf9a6bca0172f75911fae3c))

### Refactor

- First check element below ([94e1282](94e1282b10facc0eb32f0d5692c1ce71bc462541))
- Move `MaybeElement` type ([51270ca](51270caa73baa814136819d1a5de2122efa79a34))
- Throw warning if dimensions of viewport are 0 ([522efd4](522efd4c94cb4b5f362af0777085d7d9c41b2e82))

## [1.12.7] - 2023-01-23

[c07e62b](c07e62be68e89e9ecdeb1185a39959c353f31e43)...[b80bade](b80bade7df3d364c65ee2f4c76116e5b4b59ef76)

### Bug Fixes

- Hide node selection if no selected nodes exist ([852d4b7](852d4b766738ffd795680c89d24e5b96f00ff781))

### Miscellaneous Tasks

- Next release ([b80bade](b80bade7df3d364c65ee2f4c76116e5b4b59ef76))

## [1.12.6] - 2023-01-19

[28eeaad](28eeaade82ef2bcf3295eb1c443ef1fc026d7a8e)...[c07e62b](c07e62be68e89e9ecdeb1185a39959c353f31e43)

### Bug Fixes

- Use computed var to get node in drag handler ([c13d28d](c13d28d5e2e3b52621b0860b109614bcb71effe6))

### Examples

- Cleanup save-restore controls ([cd06585](cd0658534a858e82789e42f18d00626b530bddd0))

### Miscellaneous Tasks

- Cleanup types in changes util ([00681e5](00681e5321357454d0b29b44a7778b81fe7fe866))
- Next release ([c07e62b](c07e62be68e89e9ecdeb1185a39959c353f31e43))

### Refactor

- Add warning if trying to duplicate an element ([07dad4b](07dad4b491b53bbd85ce8e9edd246f0ffd663b6e))
- Add warning if trying to remove non-existing element ([ec346c3](ec346c3e3b045c3b4a318f83c9c47e8d5a829344))
- Look for parent node in next nodes ([1f9578b](1f9578b657831ef66ef71b98472e8cc146591e9e))
- Do not set preloaded state elements when calling useVueFlow ([c250594](c25059444a01b30ab7c2a69775572b660c2987ad))
- Use `removeSelectedNodes` in click handler ([f0d4763](f0d4763a999f735adbf4250c46b628f0e9ad7f53))
- Remove `extent` option for `setNodes` & `addNodes` ([994ae82](994ae82fdbbbdd5155a7cc679807bc5be65b5c45))
- Avoid re-setting elements twice on mount ([a54a885](a54a88539ad5a28a33d370c0ea1245c99348b231))

## [1.12.5] - 2023-01-18

[df7603f](df7603f52f377bf5bba1f16bfd8bcd0347f016e3)...[28eeaad](28eeaade82ef2bcf3295eb1c443ef1fc026d7a8e)

### Bug Fixes

- Re-group edges when nodes change ([fba7b55](fba7b55f1fd51a4e77e8f613db147057fa6d16f6))
- Wait until node is initialized to clamp when extent is `parent` ([19582de](19582de0215ea7463311d1d2fe62f59521146777))
- Increase timeout to 1 ([000cfd9](000cfd9e9cbf8edc3b3e26c7ce6ccf225268456a))

### Examples

- Revert nesting example ([8afb98e](8afb98e354cdee2b832903e7074a0c4ec5bc129a))

### Miscellaneous Tasks

- Cleanup ([84ffd50](84ffd504290c7c50a8eaec6ee55f30f94e905504))
- Rename `updatePosition` to `clampPosition` ([3e11a31](3e11a3126fb86d66896a09803da56e56bdf279f8))
- Cleanup ([f411f5b](f411f5b560613a1fc0b9d6543e484a59daff6373))
- Replace `getNode` with `findNode` ([203b481](203b4815f89240287c4140523d843546be35e9f0))
- Update changesets ([7314bda](7314bda84cbf3257015370cf99c289830824a42f))
- Next release ([28eeaad](28eeaade82ef2bcf3295eb1c443ef1fc026d7a8e))

### Refactor

- Set node initialized after applying dimensions change ([9276beb](9276beb50df23ab4781e3f6d3992e937dfb0a204))
- Emit nodes initialized if `getNodesInitialized` has same length as nodes state ([d741bd1](d741bd172618e367885f5b3d93c515755e42b3d6))
- Pass initialized nodes to nodes initialized hook ([c1228c4](c1228c406da349ee13201e824dc50ec7d351098f))
- Wait for next tick to expand parent if parent is not initialized yet ([f0fde0a](f0fde0ac96602d2d04749d801fafb8de55db8c1b))
- Always install cypress before testing ([fba062d](fba062df793f1274b7f4aa6da6bc69954b1c76fb))
- Remove caching cypress binary ([05e0b37](05e0b3750629a2771fee8739ca3d1a2768d648b8))

### Reverts

- Await node initialization before clamping initial pos ([de31136](de311361bff07279ec658c7f2d56887a94ed0bc3))

## [1.12.4] - 2023-01-18

[ca96cba](ca96cba5ce31f0092879b06921958c5d1d28b15e)...[df7603f](df7603f52f377bf5bba1f16bfd8bcd0347f016e3)

### Bug Fixes

- Dont trigger ctx menu when dragging with right mouse btn ([7fd2782](7fd2782d00f862fc55459315f074500b0659b087))
- Add timeout when updating positions after extent changes ([3901752](390175226ec4aa41e8bebad849db4142cbc097dd))

### Miscellaneous Tasks

- Update pnpm-lock.yaml ([fdc9d6d](fdc9d6df788cf4b23df76197a80008ccc50f21fc))
- Fix vitepress version ([c1222e8](c1222e8638a906aa3b2cc93a6d6f2b4e02042457))
- Update pnpm-lock.yaml ([2764ddf](2764ddf521c97176593633f743df949c26497c8b))
- Next release ([df7603f](df7603f52f377bf5bba1f16bfd8bcd0347f016e3))

### Refactor

- Use cypress action ([975922c](975922c1d6d7fe57ba55c719acea10de11423dbe))
- Cache cypress binary ([0ad8a74](0ad8a740f70118597bbc52140c913b9032e4ea9d))

## [1.12.3] - 2023-01-18

[e5855a5](e5855a536cb1113a2c6cd42e9902cca7174cf589)...[ca96cba](ca96cba5ce31f0092879b06921958c5d1d28b15e)

### Documentation

- Fix dead link ([55206ff](55206fffdb57ac03a4339d2c74697a27931adb20))

### Miscellaneous Tasks

- Update workspace root deps ([b223279](b22327951b6587fe00eefef9b116128357166dc2))
- Update deps ([64823b1](64823b10a12cace5ac1c0ce0f9bb22a2f8023a24))
- Update deps ([ea836cd](ea836cd3aa70d6e930f5f660690354dfed5b5b6c))
- Update deps ([816403f](816403f7ed8d8a3364bb6dde18294ba4b45f6df1))
- Update deps ([59594ca](59594caae46df39befca0ef82317b69064d025fb))
- Update deps ([8ee3709](8ee37093c5ee1f9824aaa755bc48b4701b8dd753))
- Update pnpm-lock.yaml ([172006c](172006cf90b4df8be690bc98c06624992345cd01))
- Next release ([ca96cba](ca96cba5ce31f0092879b06921958c5d1d28b15e))

### Refactor

- Support key combinations for key codes ([d51499d](d51499de96153c19a88fe906d5129889d00aaca0))
- Keep user selection on right click ([ce992db](ce992db802bc615713155be109e3e1739e9996ea))

### Reverts

- Add vue-flow to deps-dev ([220f0ff](220f0ffa7753d54305053263d87d4a44d6ec6de1))

## [1.12.2] - 2023-01-16

[154472a](154472ade27843729e359be4fc746ff85df885be)...[e5855a5](e5855a536cb1113a2c6cd42e9902cca7174cf589)

### Bug Fixes

- Check if position is a number and not if it's truthy ([9e1ba45](9e1ba45839f9d3484dd9134326c92177ba486f19))
- Always handle keyup ([b7605d6](b7605d6149b399b02f4ec1652abf518a53908c88))

### Miscellaneous Tasks

- Next release ([e5855a5](e5855a536cb1113a2c6cd42e9902cca7174cf589))

## [1.12.1] - 2023-01-12

[459f08c](459f08cddb8006a7a857e7a9727033b7e5f7cbff)...[154472a](154472ade27843729e359be4fc746ff85df885be)

### Bug Fixes

- Bubble up keydown event in node wrapper ([ab2a87f](ab2a87f9c34611d07a4dd63fd6ab7ec9890fd80f))
- Place default slot outside of viewport el ([726ee22](726ee224b9af57aff0b707c1310941b5553e65cb))

### Miscellaneous Tasks

- Cleanup key press composable ([1e88fda](1e88fdaa1df9261f5926b50b3004a16397d95877))
- Next release ([154472a](154472ade27843729e359be4fc746ff85df885be))

## [1.12.0] - 2023-01-11

[d971e91](d971e915409e2b19dd2c72958024a1c163f93b3d)...[459f08c](459f08cddb8006a7a857e7a9727033b7e5f7cbff)

### Features

- Add `zIndex` option to elements ([93b463d](93b463df0c5bdb440f104954fc34cde458134804))
- Always group edges by z-index ([148276d](148276dda6090a3a65f4319dc7be182ec5a3b9dc))
- Use zIndex or style for node elevation ([8c84d5c](8c84d5cea43bccca993250f08ba0bc38e71da688))

### Miscellaneous Tasks

- Cleanup ([0f21d82](0f21d82bf0f28a53a7c4e631ab3c02c73947fd0b))
- Update pos on zindex change ([06451b4](06451b4d0d7ba5f2b9cca557f26af4ee5e74f608))
- Cleanup edge parser ([95f016b](95f016b4134633196dde205f97dedb77c8a546a2))
- Next release ([459f08c](459f08cddb8006a7a857e7a9727033b7e5f7cbff))

## [1.11.1] - 2023-01-07

[b835e17](b835e173beabf2d1b1ba91339d47d1d736be19c5)...[d971e91](d971e915409e2b19dd2c72958024a1c163f93b3d)

### Bug Fixes

- Add `focus` and `focus-visible` styles to nodes to avoid browser styles ([5258d26](5258d263b066067844a4e8ed39e25d54049249b0))

### Miscellaneous Tasks

- Upgrade cypress to latest ([1a0d7e4](1a0d7e4b7288d823b0e6b0b22179ba73bb766926))
- Update pnpm-lock.yaml ([5b0dd28](5b0dd280c072632a9e7050380e328bb8e414aeb1))
- Correct viewport test ([da6183a](da6183a570cb0371da1dfa955e99cb5908f32532))
- Fix type issue ([7c52db1](7c52db16d387afbc5fdbaf5dd36b04e0e6e9dfbb))
- Cleanup ([c89c331](c89c331436823640c902717e80e34910ffc02f58))
- Next release ([d971e91](d971e915409e2b19dd2c72958024a1c163f93b3d))

### Refactor

- Update cache key for turborepo ([0dab5de](0dab5de61cc0270ab96043f02d12432a585b9cdf))
- Use concurrency for publish action ([993504c](993504cbf94dbf3290b5e17e9864538a403d3095))

## [1.11.0] - 2023-01-07

[314f68f](314f68f363ac4d388e8fd16b966d831d99db1472)...[b835e17](b835e173beabf2d1b1ba91339d47d1d736be19c5)

### Bug Fixes

- Prevent unselectable elements from being selected ([7810769](78107698352b94ae4fa24ae77f23b50f7cf18328))

### Features

- Add `deletable` option to nodes and edges ([13f80c0](13f80c02dc889265847b21aca34b55c72ce0897e))

### Miscellaneous Tasks

- Bump version ([bd3720a](bd3720a70d9cfee39c15aa8e6c358ff1eca6b9a2))
- Disable console log in core pkg eslint config ([9923586](9923586581d345bc88632a3cd492ef287281bae1))
- Update console statements ([6596673](6596673726b1647e2010f2a21aa3fe89861efb0b))
- Next release ([b835e17](b835e173beabf2d1b1ba91339d47d1d736be19c5))

### Refactor

- Use `pre` flush in `NodeWrapper` ([7a416ea](7a416eae6161521167a3f7dfe70df02db1685a05))
- Skip updating position if extent has not changed ([6768734](67687348f0e899805044365baad62992c1adbdac))
- Only apply new positions if there are changes ([afe0249](afe024900cadc1dd40be45dae314ff38e1ff6475))
- Do not update positions when `updateNodeInternals` is triggered ([75c11e5](75c11e5f3ee09fe732b2d3ea7c616e18b75d5480))

## [1.10.3] - 2023-01-06

[fafb2e4](fafb2e47130e98c8dd164be047138c11bccbb2e8)...[314f68f](314f68f363ac4d388e8fd16b966d831d99db1472)

### Bug Fixes

- Correct package main field ([2ed95e6](2ed95e6a4ce45dcba97cd6af96879bc8531a7063))
- Correct package main field ([1d7c42f](1d7c42f2da1f96dc95d750888de5e91c787e1b95))
- Correct package main field ([dd8c45b](dd8c45bdf9ed29b62a7f53e1a11c303363f1309b))
- Correct package main field ([32f8e95](32f8e95aac605a09823b5181797602915c28e299))
- Correct package main field ([8653df4](8653df46891205ac2fd52314bd99404548828845))

### Documentation

- Update intro component ([09aa4ee](09aa4ee7b6dc297fb5bff3f53dfdea83712c21aa))
- Update info on dynamic handles ([20dc364](20dc36436077799866121c5995f9a5b228d84381))

### Miscellaneous Tasks

- Next release ([34bede0](34bede0154b91d4a4308a03c90d8ae15ed38e22f))
- Next release ([314f68f](314f68f363ac4d388e8fd16b966d831d99db1472))

### Refactor

- Check if element still exists before attempting removal ([8422dbd](8422dbdc56768debc5618d4d7bcf0e9981f0c805))

## [1.10.2] - 2023-01-05

[58fb546](58fb5461b82a8ec3f4311d9cd24464c4ef26f093)...[fafb2e4](fafb2e47130e98c8dd164be047138c11bccbb2e8)

### Bug Fixes

- Use relative path for tsconfig ([140c643](140c64348d9c730debeb6c531b6a8acef8ebf88d))
- Calculate position and computedPos correctly in `calcNextPosition` ([6aec815](6aec81532c007eab5f50ceeb188883b23db5a25a))

### Miscellaneous Tasks

- Cleanup node wrapper ([fe4309b](fe4309b587b2e3af4410f1f68e80254eb3890201))
- Next release ([fafb2e4](fafb2e47130e98c8dd164be047138c11bccbb2e8))

## [1.10.1] - 2023-01-04

[c3848a1](c3848a17005d25170d25b8dc92694dbd6ee8476d)...[58fb546](58fb5461b82a8ec3f4311d9cd24464c4ef26f093)

### Bug Fixes

- Reapply node extent on change ([94344a6](94344a6d4258696fefd516c43030e8c8685255e6))

### Miscellaneous Tasks

- Next release ([58fb546](58fb5461b82a8ec3f4311d9cd24464c4ef26f093))

## [1.10.0] - 2023-01-04

[16d9bb1](16d9bb138b605c3b0ef958dba31d82e67961e6db)...[c3848a1](c3848a17005d25170d25b8dc92694dbd6ee8476d)

### Features

- Allow setting padding for extent `parent` ([de71b5a](de71b5af6516409065922a9f2043820883d41c40))

### Miscellaneous Tasks

- Add side effects to pkg json ([615ca43](615ca43e07f761a54af097ff0b6db0d61990e65a))
- Update changeset ([350dbc2](350dbc2a212de04cdb3a79260340a8f1414b00f8))
- Next release ([c3848a1](c3848a17005d25170d25b8dc92694dbd6ee8476d))

### Refactor

- Allow omitting width/height styles for parent nodes ([732e773](732e773075bbc481d8ab0811082b60b4ece19ce3))

## [1.9.4] - 2022-12-30

[47b8211](47b821109790cf091b30e2d41f7a174c3eeae1c8)...[16d9bb1](16d9bb138b605c3b0ef958dba31d82e67961e6db)

### Bug Fixes

- Slot props undefined on first render ([c1b1821](c1b1821ee6da7e5f74efcaf9540fda4aa766278f))
- Pass focusable to edge wrapper ([249250e](249250e7afda6248843b311c370d8176a53903dc))

### Features

- Add concurrency ([3701ddc](3701ddcbc925e27b7f94337fbf30672c53c7e33a))
- Add pnpm cache to build-and-test action ([1e0037c](1e0037c5a1d46907ab12c0df9ebefab0bf897dd3))
- Add pnpm cache to publish action ([715b9fe](715b9fed6d4622948393ce981ea650e5ae26ac17))

### Miscellaneous Tasks

- Update repl ([8531ee3](8531ee3ad52246587783dfc9e9c76ea7fecc89b2))
- Cleanup unused vars ([4003101](4003101c70f2ba3e615b9a6f3a455ca75b3a27a3))
- Next release ([16d9bb1](16d9bb138b605c3b0ef958dba31d82e67961e6db))

### Refactor

- Remove `nodes` property from ConnectionLineProps ([839fa6b](839fa6ba22d801b5f7b6f9a0122dbc1253ae49e9))

## [1.9.3] - 2022-12-29

[5356e7b](5356e7be93228f8d1a87e73b203995b119222469)...[47b8211](47b821109790cf091b30e2d41f7a174c3eeae1c8)

### Bug Fixes

- Use correct vue flow aria names ([fbebe56](fbebe562403f07ee43cc3f921315de81835de83a))
- Await target before teleporting to viewport ([6b4a21c](6b4a21ca8105f4acbbfe522d64592e7bf6c9fe08))
- Add container styles to background ([f2df224](f2df2246078962a2afc1a2f4324fbe24e188bce6))

### Miscellaneous Tasks

- Next release ([47b8211](47b821109790cf091b30e2d41f7a174c3eeae1c8))

## [1.9.2] - 2022-12-29

[2e741a2](2e741a25eeef15f542d6346e6382e6e4e54db431)...[5356e7b](5356e7be93228f8d1a87e73b203995b119222469)

### Bug Fixes

- Correct edge component prop types ([608f797](608f797527a3378836b2a3235eab8486668a33e1))

### Documentation

- Remove transitions ([da9ec23](da9ec23188a6a2739f5ed274286d975f6e390e20))
- Update dead links ([9c8c64f](9c8c64fd1d49dcce3b624e7fdc8f02d9f8756747))

### Miscellaneous Tasks

- Next release ([5356e7b](5356e7be93228f8d1a87e73b203995b119222469))

### Refactor

- Use node 18 ([9c4858f](9c4858f4fcd575afd88b28f6d41df6206423dca9))
- Use frozen lockfile ([df58e4f](df58e4fc72b0db8561fba898f6ddaf6bac070f6e))
- Correct default edge types object interface ([b4c5dc5](b4c5dc5d2f306f22e4baf6569fb4f74798509f03))
- Move edge prop types ([37f4985](37f4985c2f4affa6e77583359a564957ec74703d))

## [1.9.1] - 2022-12-25

[d1a581c](d1a581c632c68a53e0c8397b027a391e93f4bfbb)...[2e741a2](2e741a25eeef15f542d6346e6382e6e4e54db431)

### Bug Fixes

- Use regexp to fetch imports in slots patch ([a8f92ba](a8f92bab4db7b06b776746a170febd66692432c0))

### Miscellaneous Tasks

- Fix changelog headline orders ([c22f880](c22f88086d68b5ac5a8c2016abe98c20ff2294d8))
- Next release ([2e741a2](2e741a25eeef15f542d6346e6382e6e4e54db431))

## [1.9.0] - 2022-12-25

[10d312d](10d312d1fca9aacbca5957ddd9e125772e13f796)...[d1a581c](d1a581c632c68a53e0c8397b027a391e93f4bfbb)

### Features

- Add a11y support to nodes selection box ([089859d](089859d837637a3dd92de098af4f572ce2f2c140))
- Implement figma controls ([fd79ab1](fd79ab141debba5def5e30e1a04df62c958cf5d9))

### Miscellaneous Tasks

- Deprecate options api utils ([c1a6945](c1a6945303e49c754333a81c9c20ed2805e6c24e))
- Cleanup examples ([48c4f0a](48c4f0a0eb27bc50ddc8b1d3a6506ca5f228013a))
- Add eslint rule to show error on unused vars ([be06994](be0699496e692f3e8635da5e89846d6e18924e7b))
- Cleanup node wrapper ([e23ca5f](e23ca5f9ce18c4dc1a49cc7ef175529536a182a7))
- Cleanup `useUpdateNodePositions` ([f319f62](f319f6249dae876d3f5cdc32be2bdc0ff97dfa1f))
- Cleanup ([0d29597](0d2959701c95c7846e79625a66ea62707d8c412c))
- Cleanup examples ([4dbb51d](4dbb51d3877a95ea97dfcd3d19dbd95ec6fe8a1a))
- Remove log ([012a19d](012a19ddc904f0be1a4e7dd9341c0762cb60cd9a))
- Next release ([d1a581c](d1a581c632c68a53e0c8397b027a391e93f4bfbb))

### Refactor

- Move velocity logic into `useUpdateNodePositions` ([4260e31](4260e3158fa9f57efc44e297b51d19d220b4ffbb))
- Remove `snapGrid` option from nodes - use global one instead ([2b513b5](2b513b5ae7e33354f8f3d1044a91ce3534822732))
- Remove `selectionOnDrag` prop and use `selectionKeyCode` to trigger selection ([c3e1741](c3e1741a4b8ac4c12cf3678cd41c9aa9ff6c61bd))

### Testing

- Update selector ([31e3a8c](31e3a8cb71120187108d7523503ed507d8031455))

## [1.8.0] - 2022-12-21

[3d62b07](3d62b079ec6171a90187beb2eb26fbecffe50e78)...[10d312d](10d312d1fca9aacbca5957ddd9e125772e13f796)

### Bug Fixes

- Prevent `expandParent` from moving parent node while expanding ([b4daeb6](b4daeb6d8d72351dad1c9264e13873e70da68b21))
- Update `EdgeRef` injection type to `SVGElement` ([912cba3](912cba3844dc55f372008a1c2e55e65fb4e6170d))
- Drag position update ([dd1b150](dd1b15029d7bd03b2a5900514aa9bccd4d0da1cd))

### Documentation

- Update dead links ([6df5746](6df5746064f28816ded6daba59b0f6063ba42619))

### Features

- Add `pathOptions` to edge types ([58ede73](58ede7355e24c7ef30e08d7a6d09cfd712e8f60d))
- Add `focusable` and `ariaLabel` options to edge type ([bbc2712](bbc2712d061a8a7ab3cb3d8143967ba6b7ece46f))
- Add `edgesFocusable` option to store ([361c4b8](361c4b814ec7cacae5f0b2651f42f6b424733577))
- Add `A11yDescriptions` component ([f64e298](f64e29850879b5a2ee2e4e332ab5ef9726fe7297))
- Add `disableKeyboardA11y` option to store options ([5386fc3](5386fc30fb4624fbdf82887600a67c51bdd14f58))
- Add a11y to edge wrapper ([ffbbc35](ffbbc35fe97858950d60aaf9237b26fceb34feb3))
- Implement a11y in nodes ([9f50dd0](9f50dd08650af846078b962cb84819ead2ac27f4))
- Add ariaLabel to minimap options ([9508dea](9508dea8637cb189202ad844e2068e80f5e69930))
- Add A11yDescriptions to VueFlow container ([7195582](7195582a6cccb4c6f9e75cbcc2bcb37f0cea262a))

### Miscellaneous Tasks

- Use renamed `ViewportTransform` type ([6246089](624608938bf381e5973ae9cb44c771e3fbeb8304))
- Cleanup ([9bc88a0](9bc88a0504add83fd806f58f709a870ef17fd5f0))
- Cleanup ([2068280](20682800e867d47ff2fb09191fbaf523e7b2cfc9))
- Add explicit aria desc key imports ([08dc3ad](08dc3ad5a815df70f73186e8cc80a50a6888687d))
- Remove any typecast ([0167a6d](0167a6d766a3e46cc7a9fe39cc73c4b0cddc0c7d))
- Export edge types ([0267b2f](0267b2f19eadcee3ff9f6fde7c63ef6e9ae8b696))
- Cleanup ([7719f18](7719f182415ee754ddbe9e4416a2bb3f0ca202ea))
- Remove unused import ([18aba90](18aba904c8fc7c5095346c1db9338d6ddbaccca6))
- Remove mounted hook for initial clamp ([12c9e4e](12c9e4e07b2aeed6f617fc03967ae5390442ecff))
- Cleanup unused var ([1708aa7](1708aa780272304ee9c538cb2b5738d3e2b4af24))
- Add todo ([828aa5f](828aa5f0bbee2879a0de0a9e4aa7e1181f9603d8))
- Next release ([10d312d](10d312d1fca9aacbca5957ddd9e125772e13f796))

### Refactor

- Rename `viewpane` to `viewport` ([9361a63](9361a637066353e03904f83d5b05f69eec1c3fed))
- Merge `defaultZoom` & `defaultPosition` to `defaultViewport` ([8b2a21b](8b2a21bc079a198c67237af21c60117fc9b44a19))
- Clamp invalid zoom values ([9cbb7df](9cbb7df17c773b5a118d47e05794d6da79ebc62b))
- Add `vueFlowId` to `getMarkerId` ([b0e09f7](b0e09f7661500ac4d576bc0270f85b042ca8fcdb))
- Use `pre` flush for dimensions update on handle change ([06dc2ee](06dc2ee9415767a9e9df0a4d7052ad6394f08e83))

### Reverts

- Type imports ([770ab6c](770ab6ca1ef3b0c58708d2e257f7d360891a8fa5))

## [1.7.2] - 2022-12-19

[952525e](952525e18c849034d80ad756a2f0d957f8b21bee)...[3d62b07](3d62b079ec6171a90187beb2eb26fbecffe50e78)

### Bug Fixes

- Input focus preventing selection rect ([9ac4a0f](9ac4a0fbd2a4d0976226507bf4651da67493b626))

### Features

- Add `elevateNodesOnSelect` option ([af53408](af534083fadfdd6f8c21c65f39130aa8f11b2a7c))

### Miscellaneous Tasks

- Next release ([3d62b07](3d62b079ec6171a90187beb2eb26fbecffe50e78))

### Refactor

- Make label coords optional ([31cdd9f](31cdd9f8990d5c3f590d08ac97c6b02f76f9db8c))
- Group edges on edge selection changes ([d06ce86](d06ce8659d816f97ed6f3dad79c1a258b19f05e6))

## [1.7.1] - 2022-12-18

[88701d2](88701d2cf0744cc7ae085d898700528fad8b0061)...[952525e](952525e18c849034d80ad756a2f0d957f8b21bee)

### Miscellaneous Tasks

- Bump version ([952525e](952525e18c849034d80ad756a2f0d957f8b21bee))

## [1.7.0] - 2022-12-18

[dfecf1c](dfecf1c58be41a5573ab3481bd562395af09e873)...[88701d2](88701d2cf0744cc7ae085d898700528fad8b0061)

### Bug Fixes

- Overwrite state even if it's an empty arr ([dd2a02a](dd2a02ab857957e502b0ff08fa16188da8d1b1ee))
- Node dimensions update condition to only force when dimensions defined ([94c0883](94c0883db8f6fe47a4a77d3e543aeb60751e38db))
- Move watcher timing to pre and sync immediately ([15f73fb](15f73fb4d5340b49b65402486ba27210ca701173))
- Only trigger store watcher immediately when els were set ([f0a4941](f0a49414b79b626cc2b9984e43956b8f4775f3cb))
- Pass flow props to store initializer ([e99a289](e99a289c3ca902471a42c77f16f5f9e49ba57295))

### Features

- Add `getNodesInitialized` getter to store ([5334e73](5334e738295e8d2cb8e091e7e3b84c1fda8d883f))

### Miscellaneous Tasks

- Next release ([f34fddc](f34fddc3e5abcf8aa5f9baca5f28cc88d7bd29d9))
- Next release ([e603d42](e603d42e89c00534530a5b16b91a686bc3b9d756))
- Next release ([88701d2](88701d2cf0744cc7ae085d898700528fad8b0061))

### Refactor

- Make handles optional in `addEdges` ([fad7911](fad79112c81b64e0207fe07a96cfeeaf8e16d0d9))

### Reverts

- Force update on resize observer changes ([657f33b](657f33b8459dbea1a661d1f648cf6e1c7c3f4f68))

## [1.6.3] - 2022-12-14

[9a0e975](9a0e975f0efc66d9b1a1614b8755c005025095a0)...[dfecf1c](dfecf1c58be41a5573ab3481bd562395af09e873)

### Bug Fixes

- Add missing edge class to edge wrapper ([f0f7e7e](f0f7e7e49a98e4e267c028f552420ce81f73adc7))

### Miscellaneous Tasks

- Update custom edge example ([f983549](f983549d1cdaf0ca7b19d40aed1b82dd8721922f))
- Next release ([dfecf1c](dfecf1c58be41a5573ab3481bd562395af09e873))

### Refactor

- Use `vue-flow__handle` in handle bounds selector ([91aa97b](91aa97b144e12988a16959b3b6ad455cef90a0b3))

## [1.6.2] - 2022-12-14

[eef24a3](eef24a368ae91aba305558f02c36a81b896929de)...[9a0e975](9a0e975f0efc66d9b1a1614b8755c005025095a0)

### Bug Fixes

- Element watcher not emitting changes with `addNodes` / `addEdges` ([dab20a6](dab20a6e5c41ccc6e5c215dc97d44a63594352e1))

### Miscellaneous Tasks

- Next release ([9a0e975](9a0e975f0efc66d9b1a1614b8755c005025095a0))

### Refactor

- Check if elements arr has length before overwriting ([db3244c](db3244cbecbf9cd6c7017c8e0bacfe937d3e0c52))
- Remove forced update on resize observer trigger ([4a8d77d](4a8d77d79f5093646de24e1567432661c93deb50))

## [1.6.1] - 2022-12-14

[4425faf](4425faf923d2452c972a680d06c39a9435413bef)...[eef24a3](eef24a368ae91aba305558f02c36a81b896929de)

### Bug Fixes

- Add `initialized` prop to `GraphNode` ([8734a16](8734a16ae61510c367f06e2824ad22952dab9779))
- Await node init to add handle bounds in `Handle` ([b411c1e](b411c1e411cf7715efd03ecb6fc1b6d66f1a94de))

### Documentation

- Correct component name ([6d96898](6d96898bce74fda34dc24bfafd9c981b8de4b5e6))
- Remove `ts` from node-resizer example ([92ac6e2](92ac6e28474dc2785de0fe637d982425f892763c))
- Update component documentation ([22da724](22da724ab7a0ecfc95821377a241957a04be3582))
- Correct resizer example ([af84c13](af84c1397812976689017a69fc2f3358d613a728))
- Add node toolbar and resizer to config ([9d5cda9](9d5cda970c6eafcf1e40c472419c84330a7c10b0))
- Update component documentation with new examples ([15ca63a](15ca63a59c6eb5691339dca01b52272020845a9f))
- Add migration page ([eef24a3](eef24a368ae91aba305558f02c36a81b896929de))

### Miscellaneous Tasks

- Update vue-flow peer dep to 1.6.0 ([2d51a29](2d51a2972a4b70b11630e5d9767d91a3064a786f))
- Remove log ([e69e19a](e69e19a8dfe00288bca666729e660e634e6c9784))
- Next release ([f2eb883](f2eb883b267905cb4ba155dd1825bfd8500f3604))

## [1.6.0] - 2022-12-13

[d02f738](d02f73831863aa2c15a3814ba3faeb41432a88dc)...[4425faf](4425faf923d2452c972a680d06c39a9435413bef)

### Documentation

- Add node resizer example ([f31f007](f31f0073f7a4c9e679a49b3d520b8f137d0ce772))
- Add node-resizer to typedocs config ([8e5a9d0](8e5a9d04ecd75f787f7e0f514a2193fa89c287e9))

### Features

- Add node-resizer pkg ([6815515](681551507af615efa701154f37c2f51c426ed014))
- Add `useGetPointerPosition` composable ([5033bab](5033babdc27ecc71096f68878cef1269e39d8206))
- Add `dragging`, `selected` and `resizing` flag to `GraphNode` ([20c353a](20c353a070a74309465122178bebd5cf2cd13ab6))
- Implement node resizer components ([d883ed7](d883ed782a13f9feb22f78ee5f8423f3b8e6d8ad))
- Add node resizer example ([3f1d725](3f1d7257bf6a53a071b01882f91bd7e0ca8224e6))

### Miscellaneous Tasks

- Remove resize rotate node pkg ([3f4e696](3f4e6961c0724587a8f24f2c24cdf612e94ad406))
- Cleanup ([af801c7](af801c74cec0734d62f2fae2bd590579ca3261f6))
- Cleanup ([2eaf9e4](2eaf9e43406b0456e292d72eb426bc3db778e352))
- Cleanup ([e1c904f](e1c904f97f35554c26b9a4e525fa12bf2b424bbc))
- Update changeset files ([745f1c2](745f1c2682ede4cd9d3d6b7823fdd28042c7ab23))
- Update pnpm-lock.yaml ([9f4c48b](9f4c48b84900777b887c49a1a2dca78a1b8b380e))
- Cleanup ([029a0d9](029a0d9a216388ba6fac33fa2158068b49aceeef))
- Cleanup ([89b5da9](89b5da9ae33aacef1afa9634f9de5e417e174567))
- Add todo msg for adding a plugin ([49d6f45](49d6f452b3c737d9208bb4557921493a99a41ff4))
- Filter addition and removal changes ([217ee6b](217ee6b0dfeaf325b4f3b4197c9dd0183b60a406))
- Update pnpm-lock.yaml ([97791c9](97791c9c31bed9a3c0750b1f695580ea7fda8ec9))
- Cleanup unused vars in `Handle.vue` ([3fc1b39](3fc1b39ce27e41faa49f6f84bfa1b7f7a524b26f))
- Add README ([c5c60b8](c5c60b88949a2f442e624a22ee0f5b2d57c1081f))
- Cleanup ([35d6f30](35d6f309b7c14ba25e3e869ad5740a6e909ce1de))
- Remove unused changeset file ([57d583d](57d583ddb72f0ca593385d52deb2d00639cd2e76))
- Correct pkg versions ([4b7a96c](4b7a96cef9ca796aad250b0f24ca2f455403817d))
- Add missing styles ([7140beb](7140beb7992f6f37359b09e291e045681db098d5))
- Next release ([4425faf](4425faf923d2452c972a680d06c39a9435413bef))

### Refactor

- Move panel component to core pkg ([4fb2653](4fb26533cd6424b495e568567f5886cf0c5bf7b6))
- Remove additional components package ([e44b683](e44b683b744984c2528fbeb6e1661aac4bf36ef2))
- Move minimap to separate package ([2812790](281279044c4f18b18f9f4c651c79652320a93bce))
- Move background into separate package ([c7b5102](c7b51025d0899f59436fd3bd6d1b188066738357))
- Move controls into separate package ([a55f39b](a55f39ba250cee7adce3e1ca99b98ed60f278541))
- Replace `additional-components` package occurrences ([000dd5c](000dd5c9ba635232ad6cacd3943394436868b25b))
- Apply multiple changes at once to element ([9e05f02](9e05f02bc7b23872956e94fc55c75f8629395d71))
- Apply multiple changes at once to element ([99f5e18](99f5e18408e6d016d10a760b914251914274ee03))
- Apply multiple changes at once to element ([5c726ec](5c726ece408ce70fab523f104c8f6dfb83b010ed))

## [1.5.11] - 2022-12-12

[e1179d8](e1179d86cf9ba271fae99af53f4b6dbabaea277b)...[d02f738](d02f73831863aa2c15a3814ba3faeb41432a88dc)

### Bug Fixes

- Add missing `dragging` and `selected` flags to minimap node slots ([dbeba2e](dbeba2e7c8f067540f8c92a2302197755c6d21b3))
- Add missing `dragging` prop to `GraphNode` type ([97426d5](97426d56d5e83736e112dda66e06764d86c2f026))

### Miscellaneous Tasks

- Remove console log ([be662ee](be662eef92a2475a49643e4b8de735c580097593))
- Next release ([d02f738](d02f73831863aa2c15a3814ba3faeb41432a88dc))

## [1.5.10] - 2022-12-12

[1a4a2a6](1a4a2a6275ca94a085fd3e15cb5373f05c23a768)...[e1179d8](e1179d86cf9ba271fae99af53f4b6dbabaea277b)

### Miscellaneous Tasks

- Next release ([e1179d8](e1179d86cf9ba271fae99af53f4b6dbabaea277b))

## [1.5.9] - 2022-12-12

[6a5f363](6a5f3634beffe39aa926407b0a0630ae794ae9a0)...[1a4a2a6](1a4a2a6275ca94a085fd3e15cb5373f05c23a768)

### Bug Fixes

- Add missing dragging flag to nodes ([ddf6e5f](ddf6e5f5db423f5698a7cb488208f6780028eae8))

### Miscellaneous Tasks

- Next release ([bddd505](bddd50551249cf37397871cc8f28be4eb24884bd))

## [1.5.8] - 2022-12-12

[dc2ff64](dc2ff6401d70761d7e216ae86498b44c19e64d82)...[6a5f363](6a5f3634beffe39aa926407b0a0630ae794ae9a0)

### Bug Fixes

- Use connectable prop or global connectable in Handle ([47432a8](47432a8238e0726fe1eb0cc7c6c714fe70759427))
- Prevent watcher being stopped oncleanup ([fdf9516](fdf9516a7f366a4793ad2ad0d038c243ec0df6c7))

### Miscellaneous Tasks

- Next release ([6a5f363](6a5f3634beffe39aa926407b0a0630ae794ae9a0))

## [1.5.7] - 2022-12-10

[ddddc7f](ddddc7f7d449aa0d3c95ec65b745dacdc7f27427)...[dc2ff64](dc2ff6401d70761d7e216ae86498b44c19e64d82)

### Bug Fixes

- Watcher not working with `onMounted` hook ([ac8ef13](ac8ef136325bc42d2528d097a6dfeb0ad7aa559c))
- Node extent not properly applied for child nodes ([9142a2e](9142a2e13ddf3b6a170946316f0e01186f35c3a4))

### Documentation

- Add pkg entrypoints for typedocs ([2e4d69f](2e4d69f4b6cc734a41fa9c93ef074650f6a6911a))

### Refactor

- Use `next release` as release commit message ([dc2ff64](dc2ff6401d70761d7e216ae86498b44c19e64d82))

## [1.5.6] - 2022-12-09

[a4cf9c0](a4cf9c0b3b81599f15cd01693f6657f0c7aabd40)...[ddddc7f](ddddc7f7d449aa0d3c95ec65b745dacdc7f27427)

### Documentation

- Add toolbar example ([52c23e9](52c23e97707afcb57687e5cc46eab319c744d740))
- Add node-toolbar to deps ([8169a1d](8169a1d237bb4f00848933e3e051163a41efb539))
- Cleanup ([e0c4f4d](e0c4f4d64cce8186a683b55c317f587fd6519b71))

### Features

- Add toolbar pkg ([2829f8a](2829f8a92d92644718c85060fa8951fe1c9489dc))
- Add node-toolbar component ([f6acbd8](f6acbd8dc61400a8ae03f8cee7ba9384f251297b))
- Add node-toolbar example ([196215d](196215d9e2d5819c8a7a4b28d96ac8c18815ca6a))

### Miscellaneous Tasks

- Add auto-imports.d.ts ([614ff72](614ff727b97052f61a970fcd8268793e98d831ac))
- Update README.md ([c37bb8a](c37bb8a3cfc2e583b5e5919180c16cf1251097d6))
- Update pnpm-lock.yaml ([7db0575](7db0575fef5cbfa1625c5cf2718c74e2ba509039))

### Refactor

- Deep reactive nodes and edges ([a8f679c](a8f679c36b8c308d6a5003b416234953654b5c06))
- Separate model and store watchers ([473fd83](473fd83c594c7c18e5ba48f6a0f4946d88306dae))
- Dispose v-model watchers on scope dispose ([4103ef6](4103ef60bbb0b80e0092cd1577ec88d2a2e87294))

## [1.5.5] - 2022-12-08

[61d28e8](61d28e81f1524a1a8958e246972b21d1959ff567)...[a4cf9c0](a4cf9c0b3b81599f15cd01693f6657f0c7aabd40)

### Bug Fixes

- Apply translate extent on pan ([602fbad](602fbada4b16720a6278d775e0ed7ab016756a0c))
- Properly calculate node extent ([7daadfc](7daadfc383b866dac1a90ff56c4be523a2188d08))

### Refactor

- Only trigger dragging flag when a change has occured ([dce5d86](dce5d86867a99857157fa50c27c9c73612814a85))

## [1.5.4] - 2022-12-06

[db2c1fd](db2c1fd650325cc29be432999bd1e9d43136dd49)...[61d28e8](61d28e81f1524a1a8958e246972b21d1959ff567)

### Bug Fixes

- Type marker prop in `EdgeProps` ([c673b04](c673b044227a6702c695691be6f94f4331812dec))
- Allow middle mouse pan over edges ([0d44179](0d44179373b271c31e81c8c8bf6743a21eaca773))
- Prevent valid connections on same node and handle ([a1e1304](a1e1304b63f667282b304c6f5964dc9cbd9d7799))

### Miscellaneous Tasks

- Update deps ([4be3188](4be318807e9313107ae02576a458030d592047f3))
- Add extended vue macros ([21523ce](21523ceb4ed1dd10878f4fb118d448b56f62589a))
- Update pnpm-lock.yaml ([016206d](016206d00f1571301a964af3aa4a4d4af99fb7cd))
- Bump version ([61d28e8](61d28e81f1524a1a8958e246972b21d1959ff567))

### Refactor

- Add `HandleConnectableFunc` type ([9cab025](9cab0257d66305ae863442a334885ca324a5986f))
- Remove barrel files and use auto-imports instead ([f4a4736](f4a47368996ebaa289f3f15c2ec2329e3fe907be))
- Enable vue macros betterDefine and remove duplicate interface defs ([27c6c42](27c6c4230389a0b826fa4b3057db89eb82ad1205))
- Omit `type` prop for smooth step edge props ([af699d3](af699d384cf9a3f77ad3ffd9f62e7d9f2dff8982))

## [1.5.3] - 2022-12-05

[f3a6ab8](f3a6ab8417299adaee4d81244a010806166841f3)...[db2c1fd](db2c1fd650325cc29be432999bd1e9d43136dd49)

### Bug Fixes

- Patch `VueFlow` slots after build and apply correct types ([84f82b6](84f82b6ad510232e7e91f382ce05e1d5d3f0f795))

## [1.5.2] - 2022-12-05

[298e44b](298e44b88e097a147d2549a794a3d0cebe559c35)...[f3a6ab8](f3a6ab8417299adaee4d81244a010806166841f3)

### Bug Fixes

- Check for arr length before triggering immediate model watcher ([7dec8b7](7dec8b779cc5335bbddde06cd2bf2c0b3a317750))
- Allow `null` as key-code ([91d7c9d](91d7c9d52a4349a9215cca1c2e6c204d35db0871))
- Render minimap node slot ([3999773](39997732c36c7f58b31df688b14900892fa23003))

### Miscellaneous Tasks

- Update examples header ([f3a6ab8](f3a6ab8417299adaee4d81244a010806166841f3))

### Refactor

- Change `shallowReactive` properties in elements to `reactive` ([99c6786](99c67860cbd03dc0aad99f37a03722970ed4506d))

## [1.5.1] - 2022-12-01

[0c3ae1e](0c3ae1ec501228a375c31134b7390aeeb06babb6)...[298e44b](298e44b88e097a147d2549a794a3d0cebe559c35)

### Bug Fixes

- Update model-value regardless of arr length ([66f866e](66f866e717612553a2b3f7b64f902a761fdc4d4f))
- Nullish check for event obj ([54fbfaa](54fbfaa7de5c102c0f18a52481b8209b285d1863))
- Nullish check for event obj ([649bdb9](649bdb94d4e1b9dc102629eb83b9912ca1c5c7c5))

### Miscellaneous Tasks

- Bump version ([298e44b](298e44b88e097a147d2549a794a3d0cebe559c35))

## [1.5.0] - 2022-11-19

[ee9b1ed](ee9b1ed3a021a999eaeaf5e3a2dab333913d3760)...[0c3ae1e](0c3ae1ec501228a375c31134b7390aeeb06babb6)

### Bug Fixes

- Update position on dimensions change ([1bc6a7d](1bc6a7dcce9ada33b8a6ef216eb920839a6ee83f))

### Features

- Add `__experimentalFeatures` flag to store ([3c66058](3c660583cba464c1887fcabb2aaa2bfcb4547713))
- Add nested flow support for edge alignment (connections dont work) ([bae4324](bae43249e1a5cf40947b8c5cc34342d84287ea79))
- Support touch for connection creation ([b3fdbd8](b3fdbd884a14c06212fd4f78538481609a8032ab))

### Refactor

- Add `connecting` class to `SelectionPane` while connecting ([463b5d7](463b5d70ef3296bf2ecd570be94ad2af027d221e))

## [1.4.2] - 2022-11-17

[64b3cb9](64b3cb972246f3152af03d4f71ab1ba4ab6d1f7c)...[ee9b1ed](ee9b1ed3a021a999eaeaf5e3a2dab333913d3760)

### Bug Fixes

- Elevate child nodes by zIndex +1 ([13c2dfa](13c2dfaeed04bab6848bb113e0cf83a6c6ee5fd0))
- Apply initial extent on nodes ([6f8b16a](6f8b16a8672f4acb172a8d33e44783821c62c500))

### Documentation

- Add info on interactive minimap props ([fd095d1](fd095d1c1d468cf7bc23032007d45387350dc344))
- Add vercel analytics ([a2f125f](a2f125f1e91606d65918a1fdbaeb7183e4b289f0))
- Add vercel analytics ([bce493c](bce493cfe5cb954c55c2f16b7f025634b361546a))

### Features

- Add `maskStrokeColor` and `maskStrokeWidth` props to MiniMap ([e87bb53](e87bb535e3ee611d66159b99af1e287a8263a6dc))

### Miscellaneous Tasks

- Update snap to handle page title ([a56ea41](a56ea41182e4f20d5991ac6eddce97f5ec91923d))
- Center dnd nodes after drop ([d5a9ae0](d5a9ae0101672a604d8f3bac1604faa2216fa788))
- Disable debug mode of analytics ([118d064](118d064c187d573c04c672b4323ae6755367265d))
- Move analytics to mounted hook ([f1b2250](f1b225078d80fdbd29a0353fca5a29d20107df43))
- Cleanup unused prop ([7100c7e](7100c7e173b413e5aeee9b2ad0afbc604e4e6c31))
- Cleanup dimension update ([0876a18](0876a189eb03c458998a860b661b7219c49fd7b8))
- Cleanup drag handler ([4a1cc24](4a1cc24bd88dbc68e493bec2fa9178608ee8a369))
- Cleanup change handler ([a379b4f](a379b4f1cf32754fdf837e45a97152f5f21ccc9e))
- Cleanup import paths ([406b20b](406b20b8babe3c1cf10bce4c23d7ab7d1bd827bd))
- Cleanup node wrapper ([3ca17d4](3ca17d40739d51476c751cd458e539e446644bbf))
- Elevate nested flow on home page ([62918cf](62918cf400d20e6778315b17d942918148dd6f6a))

### Refactor

- Elevate selected nodes zIndex *by* 1000 instead *to* 1000 ([69ffa84](69ffa84473ee937552ed61913a16e34058c5bfc0))

## [1.4.1] - 2022-11-14

[99c15ca](99c15cac6d90a9eed0c96f7dc264a4f487d26f93)...[64b3cb9](64b3cb972246f3152af03d4f71ab1ba4ab6d1f7c)

### Bug Fixes

- When connection mode is `Loose` use all handles as connection line source handle ([cd4383d](cd4383d00e95650396aa9d571d181e3128e961cf))
- Improper check for selection key code in zoom-pan filter ([d677292](d677292131e37e12091c0a34ef8963eb6d06ea4f))

### Documentation

- Update examples ([cd03034](cd03034bdb13dc940ebeeeac9f239a56a0a8f1fd))
- Snappable connection line example ([bb18a68](bb18a68977685885bd24d472458b8dd5bfb95b99))

### Miscellaneous Tasks

- Wrap Repl in client only ([3340377](33403776dc14cd0498dda398f2d9dea38d558d29))
- Pin vite version ([101fa6b](101fa6b223f016a1aa9834be14c7f196e672ed6c))
- Set examples class name once ([4da458b](4da458b0cf495f56c2c7f0c7be258f7fd16124ef))
- Use path el for transition edge example ([d34cf4b](d34cf4bf8fd3465ba004cbb14b7ba18a89004531))
- Remove unnecessary type annotations ([631552f](631552f9ded1ba38cefbf7f76b5bf5e9dffcb071))
- Simplify edge components ([c93ffaf](c93ffafd311ec4f00de0c62af7cebdd49437e545))
- Upgrade deps ([2df9ebb](2df9ebbc3a8ac9520c5e68c6641ab5a3cff0b23b))
- Update vite config ([9744571](9744571f9e54153b27636080747a11939642aabc))
- Pin vite version ([5f63e7c](5f63e7c71ecffc437428272e4c1a8ae65379c01d))
- Add missing `connectionExists` util export ([45dbc95](45dbc95a3a4891045a2db24b5188d6fd3d7ab606))

### Refactor

- Remove default val for edge style obj ([354c721](354c721fd3e72cfc4e071db69816e6ba48fb68ab))

## [1.4.0] - 2022-11-13

[fc84b9c](fc84b9c6f838f2bf466574d5e4bdedcd8139ccfd)...[99c15ca](99c15cac6d90a9eed0c96f7dc264a4f487d26f93)

### Documentation

- Cover screen with intro flow ([537d4a7](537d4a79e6d0d03ae6e968101364ab12e26cf5ed))
- Update node internals on resize ([b389418](b389418a38de2f7a466de90a48e7ad695f158ae5))

### Features

- Add `pointerRadius` prop to edges ([a4fd0eb](a4fd0ebda406b5ea1e6e81b7bf67cc6a379518d5))

### Miscellaneous Tasks

- Rename `pointerRadius` prop to `interactionWidth` ([ec6f870](ec6f870bfd1ec187fcb234c1f670ed66b445715f))
- Remove default val for `interactionWidth` when parsing edges ([d580a47](d580a475bbae97bc9136decd7b69e07c135f83b4))

### Refactor

- Use vue flow id for bg pattern id ([3a0d0a9](3a0d0a9f8f0a38472fd7763b0c28022f9ef61557))

## [1.3.3] - 2022-11-08

[2bfb74d](2bfb74d63bf7730dce02a1737526a02207e90639)...[fc84b9c](fc84b9c6f838f2bf466574d5e4bdedcd8139ccfd)

### Bug Fixes

- Use node name as class name ([95ff059](95ff0596cf1edfc8634c478349f2b48163362e99))
- Render mini map nodes regardless of `onlyRenderVisibleElements` ([7680c52](7680c52153caa479c018bbadf2bc127f77cb6a14))

### Miscellaneous Tasks

- Remove unnecessary imports ([6106e90](6106e90abc9124ebe18efb9eb3ec5def36b59273))

### Performance

- Inject slots to avoid performance drop ([0c0bfe4](0c0bfe48ad608ad8bda86d12d5c2dd925cfd8731))

## [1.3.2] - 2022-11-08

[845d88d](845d88dede87548b9c85d108597c90c8b9d11e55)...[2bfb74d](2bfb74d63bf7730dce02a1737526a02207e90639)

### Bug Fixes

- Prevent edge defaults from overwriting actual edge values ([5b397fa](5b397fa499b22d30d25b605bbb48d2214ffa8db3))
- Fall back to default node or edge type ([6c738bf](6c738bfbfb91126774aacd73e753e11c19532733))

### Features

- Setup turbo cache in gh action ([49c53d0](49c53d0d164af8205a2f237c6b4b13a545bb9e0a))

### Miscellaneous Tasks

- Use getter for edge/node types ([3a5d06d](3a5d06d3b1243cfdfa1735f52611c879860ae82d))

### Refactor

- Place wrapper in separate stacking ctx ([9d3c3fa](9d3c3faa0963fb927e6be0dcda747659f2286946))

### Test

- Add `defaultEdgeOptions` test ([559daf0](559daf0a201e8b8460d949c3e7ead15dcdfd380b))
- Use default element types in check ([7dfc5f9](7dfc5f97e080d220d7f19a328afe644db7dc9430))

## [1.3.1] - 2022-11-07

[98e5481](98e5481507497a9576889f4ee8fc0442674ae0af)...[845d88d](845d88dede87548b9c85d108597c90c8b9d11e55)

### Miscellaneous Tasks

- Update dev dependencies ([d966ff2](d966ff27aa60a391a40d6befbf5a8b13a1db5b3f))
- Upgrade to vite 3 ([489da64](489da64200bcb778287f64a22eca86949e84c164))
- Use auto imports to for utils, composables etc. ([f9af2d3](f9af2d36fd03201685d100f3b50a5ba649924b53))
- Remove unnecessary import paths ([650e752](650e7527aef8745b4e7e5b23b1154ba51cc2f19d))
- Update pkg file names ([1e27b08](1e27b08c4b1db81698d2079377eb19624c36e8cf))
- Upgrade to vite 3 ([74433c4](74433c46e98e1e957678091119778a1c6a71ac20))
- Add README.md ([4fce82e](4fce82ef1e5d22187f4bda609f18e32ccdf5a27a))
- Upgrade vitejs plugin-vue to latest ([047e1fe](047e1fec7d67ab8ede480c2b132c0354ea981e2f))
- Update pkg file names ([0b83f24](0b83f2438bb77d6b74451cfc4e18cbecacaf83e8))
- Update gif ([56ba8a8](56ba8a86567bc7f0ce2b3499b7ed1b601e037e8d))

### Refactor

- Use `event.composedPath` as event target for input dom node check ([1f722f5](1f722f549440ecb0fe363ad45c984b096ab21acf))
- Stop reset of user selection on mouse leave ([fb8a830](fb8a8309e928eeaec90bb654674167e866330a22))

## [1.3.0] - 2022-11-06

[0dc1eb6](0dc1eb686df7a7077b2b10d0976a00ab04622489)...[98e5481](98e5481507497a9576889f4ee8fc0442674ae0af)

### Documentation

- Add intersection example ([8e3864d](8e3864dc0982a2e6173cdef6a5b5733e0d739605))
- Use `EdgeLabelRenderer` in edges example ([8c0acd6](8c0acd624d776812d7e031901d81b15d4e442a80))

### Examples

- Use `EdgeLabelRenderer` in edges example ([a26e83b](a26e83b27d829fe3993ce08caa8fc5e7c1b5366c))

### Features

- Add intersection utils ([4782d70](4782d709c55f7ac674493d87f3de6773e2e1174a))
- Pass node intersections when dragging a single node ([632fa93](632fa932723b39c2095cbd8d415d0a22575c2b31))
- Add `nodesInitialized` event hook ([fe1ba03](fe1ba03eb0d5b5a1cd99ae8d6dbf12b5f65c4b98))
- Add zoomable and pannable to mini map ([bd7fa3c](bd7fa3c14878f5ba23dda16d33dc771d040ea4fe))

### Miscellaneous Tasks

- Update changeset ([4c618e9](4c618e96598e443f9a29f1d7c5bbba224302eb92))
- Correct action name ([8a51391](8a51391c3184fd8ef002077f56d3e9a2e0732863))
- Emit `nodesInitialized` after next tick ([a2e260f](a2e260fbaf2e240aebb010fdbfdd0cc264fd0ad7))

### Refactor

- Add div based edge label renderer ([43ff2a4](43ff2a42e6d77251b3fe7987afa02c19cdb2f240))
- Skip d3 events with no underlying source event ([2a5afe7](2a5afe706ee3d1203579814b22705c1bd2ffb06e))
- Use regular component for mini map nodes ([9b60790](9b60790c31b64737f5fd8873b5718d22814f4ba4))

### Test

- Correct drag test position ([e9943d5](e9943d52ab94badf1ee8a6e296387dd890d1b0c2))

## [1.2.2] - 2022-11-04

[fbfa2ef](fbfa2efbd238d6750c45f6bd4ad359473b75d1e5)...[0dc1eb6](0dc1eb686df7a7077b2b10d0976a00ab04622489)

### Bug Fixes

- Always set a handle id ([84adeb7](84adeb7e392d45c1f1e3bf9cae5e46e93abb8e8b))
- Skip connectable for handles unrelated to connected edges ([49b44e4](49b44e45a3b87bc04066e161a48b0a598951a187))
- Use all handles when connection mode is `Loose` ([43aa810](43aa810884c47ebf6fd32550005c02050fafd8c8))

### Miscellaneous Tasks

- Add blobity composable ([6ab79d5](6ab79d54e40af36b2d3fe4065e6ed7934123ae5d))
- Use blobity only on client side ([2aae2d2](2aae2d2e4e0d3a9074cec52fcbbaeb221e8e7dde))

### Refactor

- Show regular pointer if pane isn't draggable ([73dfca5](73dfca5f574169c53347c2d618499c326631bf66))

## [1.2.1] - 2022-10-25

[0bd8049](0bd8049a4bca7918397fbd1dc30280837f5af013)...[fbfa2ef](fbfa2efbd238d6750c45f6bd4ad359473b75d1e5)

### Bug Fixes

- Disable user selection if `elementsSelectable` is false ([e5dfdb6](e5dfdb6a6dab868879c219d2521e97d555f57300))
- Prevent node selection box from appearing before mouseup ([6e564da](6e564dacf7ad1bf7c2c6327857ce8d4bd9d47584))
- Use shallowReactive for node/edge data & events ([096f67a](096f67a55bd547c159b999cb0d139a7eb9c7e4e6))

### Documentation

- Show changelogs on docs page ([787fc22](787fc225e96c288ea6f8b84b5a3893b23390028d))

### Miscellaneous Tasks

- Update copy plugin ([89a3f48](89a3f480ef60a7029e614bc8c76600d9c758592d))
- Add plugin logs ([1322951](1322951c98cd1f73e45f0899bf3755b76643c5a7))
- Use regular script for changelog page gen ([25010d2](25010d2b8719e8a7614bdd5c360a8ba6bfadb3b1))

## [1.2.0] - 2022-10-21

[578929f](578929f2d96f296fe448569680c773f60fc03afb)...[0bd8049](0bd8049a4bca7918397fbd1dc30280837f5af013)

### Bug Fixes

- Correct filenames for output of pkgs ([240074c](240074ce6d1b7fad62b04b41f3c97347cdfde46b))

### Miscellaneous Tasks

- Add examples group to changelog and filter publish commits ([f3dc89a](f3dc89a747da47ec9df15415d1afb3d6aabfb5f9))

### Refactor

- Log warnings for non-prod node envs ([395fcd2](395fcd2aabc0bcca3101d1538312962007232a10))

### Reverts

- Update changelog only on tag push ([a8831a4](a8831a4c1a7ea8f536f0f2120d659d17bfd1faa9))

## [1.1.4] - 2022-10-18

[9fbd653](9fbd653d92b0e99fb15e1ead86812f4701656474)...[578929f](578929f2d96f296fe448569680c773f60fc03afb)

### Bug Fixes

- Allow undefined as custom theme var value ([dcf607f](dcf607f279b4d98868c3f13c6fcd8c2daf50abf3))
- Add overflow visible to control btn svgs ([c5aebf6](c5aebf65bf15f190d0bb7960a2f314bcefd67a0f))
- Set node dragging on start and end ([ad0f8ff](ad0f8ff3dc863ec0df4e35571715e6f626c3deec))

### Documentation

- Remove 0.x.x warning ([37d2cd0](37d2cd09e2209ad82dcbcd4d74b2cbd79329eb92))
- Fix additional-components imports ([90eac57](90eac5743a77b30ef4e3780be9133558fbbbad4b))

### Miscellaneous Tasks

- Generate base changelog on push into master ([8cfea47](8cfea472e3a00a3513b965fb8e12ab4561f89189))

### Refactor

- Add generics to isNode/isEdge fn ([ce8b04b](ce8b04b7026f97546491b9ebee26aa1d4034c825))
- Add generics to Elements/FlowElements types ([c0fc95d](c0fc95dc5e3eb3875fe800b080a6ff3de7f9be28))
- Data and event properties to be definitely typed ([e6f97b8](e6f97b897cefc9ccb3dffefd55d60ff7ff1f8418))

## [1.1.3] - 2022-10-14

[e9a784a](e9a784a1aaf9916494b129466a38f5f2353620e6)...[9fbd653](9fbd653d92b0e99fb15e1ead86812f4701656474)

### Bug Fixes

- Edge text not properly calculating dimensions ([d4fb795](d4fb7957879d70c2ef7cc9cad02ba85d378c6be2))
- Edge text not properly calculating dimensions ([72c203e](72c203e3d527376221673fccb62dc99ff8061a23))

## [1.1.2] - 2022-10-14

[a33adf0](a33adf0c042674dd48485d6447a883fc1d8b132a)...[e9a784a](e9a784a1aaf9916494b129466a38f5f2353620e6)

### Bug Fixes

- Add missing dragging class to node selection rect ([58d11db](58d11db1f9008f0fffcecfbf5a53f5f23fd9a5b0))
- Elements not correctly unselected ([583efe6](583efe6c68d1e4c05dd3974a9658a24f8bde756a))
- Edge text not aligning correctly into center ([53c70a0](53c70a093b6a44524cf3fb4151a435521efc3da4))
- Pass edge styles to edge path ([34685a5](34685a50c6be5f1a185d4e43fdc76ee2f41b3c0f))

### Miscellaneous Tasks

- Update repl ([4964e4d](4964e4ddbc417d406cb95c823f272b0ae9ddb5c7))
- Remove text fill ([4fa4627](4fa462718f10150850983b290fb025a2342df490))
- Update example ([b5fd332](b5fd332b033519eec53b65cc2ccf8d735899aa82))
- Remove duplicated styles ([530e440](530e4403b410a8719fdcb70fa9715803a169a06e))
- Update example ([285ff5a](285ff5ac306cf8640aff3d29828a164f1f8505e3))
- Update example ([ce30581](ce3058165170a36a93ef33760dd10b7d6a715b26))

### Refactor

- Use flowElements type as arg for removeSelectedElements ([ea9da0a](ea9da0adb77ab53578469963d668d09eda25d79f))

### Reverts

- Add dragging class to node on drag instead of dragstart ([9f48095](9f48095b51fac1d15dd427fe368a0062491adf50))

## [1.1.0] - 2022-10-13

[6c5523d](6c5523db5e3cf807dbdb106f29b8b4410dccc4bd)...[b7697de](b7697de7366b578952b5ad8917b6dcbee50e844c)

### Bug Fixes

- Edges not returned by getter on pane ready event ([607c7c0](607c7c0e69c19b3f02df755b991f22030729961b))
- Pass `connectable` to correct prop ([bc80807](bc808072853b8dc14b9544546165c758b3114af5))
- Only check for matching handle id if an id exists ([a7845c6](a7845c6032bce197392112544d18e6df77bfddf4))
- `connectOnClick` reset before connections can be made ([d420fea](d420feaf489368c4e690f58e527f1049246bbb78))

### Examples

- Update quasar example ([3fcc163](3fcc163509d2a9ea675586e951364027f5386be1))

### Features

- Add `vueflow` pkg that exports all features ([9c78528](9c78528d7f43a341b5754d6b3fa08e208e7d5329))
- Allow setting connectable to `single` for single connection handles ([624438a](624438a0eaf51cb4138bec60dc217182d1d3da52))
- Add `Panel` component ([3541b24](3541b2458735ce9790dcf4a8df1c40df817a1252))
- Add `position` prop to MiniMap & Controls ([875d954](875d95465e0093755746ce283632fc14d9827587))
- Add dragging class to pane ([0044a14](0044a14ac1e96cc8598a2af9caf6803efdacb205))

### Miscellaneous Tasks

- Update README ([d7b956d](d7b956dd2ac9d36907fd38ff2209a824d4ca63b0))
- Remove env.d.ts ([647d605](647d60583b2d587f6b563e7d0dd2ab3cf8c7933f))
- Update README ([03a982c](03a982c10f8a64e3a80a42971b09d87661ae5e05))
- Rename bundle output ([4587540](4587540ef3df842ce9dc8b17b3a04b09f019beeb))
- Update typedocs config to use vueflow pkg as entry ([028d793](028d79306cce7edb7291850e005e18774831d4d0))
- Update repl pkg link names ([688c931](688c931b3a4f69af6c11f16cf26c6a04a122cafb))
- Install `vueflow` pkg ([d1e9ee5](d1e9ee596cef683a6df658aa77f7297cb4d7ca91))
- Lint ([ef3111b](ef3111bde0a52b145067e1afcc8605deb9aeb333))
- Disable pointer events on user selection ([50af804](50af804c47233464218f2fd69e5e67d3c89a6ea1))
- Optional position ([be3fab9](be3fab9c1b3fef0358571c413b555dad6429a2f1))
- Remove unnecessary style ([24f7722](24f7722f7c5c83bf26f8ff29564d7044fc81992c))
- Lint ([5f595c0](5f595c0770b5c9ad2db6720077ef2283b4461408))
- Lint ([31f590b](31f590b89389dfe3ae848868b6c1932445b2b5c2))
- Update changeset to minor bump ([fa0fc69](fa0fc693040808aaa2115e53022f8877c127e5ad))
- Add copy vue flow plugin again ([c086aa8](c086aa8e46bc8a0325b719798a94bda1e79a5a10))
- Add default color to edge text ([1204a44](1204a4496ca05e48d7b7c52b5007e77114663e52))
- Correct version ([b8b325e](b8b325e316798ef24d368564d7b21004be5e7d4d))
- Update CHANGELOG ([f978db2](f978db25e4a3e10a010fc4947922184695c990db))
- Disable pkg until name issue is resolved ([11ee43a](11ee43ac9b910e50b88dca4e52b24db2a908e53e))
- Update styles ([5c3ed51](5c3ed512579b39a99ef5bc360c88470f93a58c79))
- Cleanup var ([71eacd7](71eacd70353f2036400ac6da3c8d60691ea2f2f6))
- Update changeset descriptions ([24924b9](24924b93f36410ded30b52433132e82873fff35a))
- Manually publish pkgs ([7ff551e](7ff551e9df0f72e43e8998cc6d8e85d2ef15f246))
- Update changeset descriptions ([483001d](483001d3f06cfcf3f9ccb2df6f1b5777d09a7788))

### Refactor

- Run turbo pipe before publish ([32aa9e8](32aa9e851b09fd6a6ab9cf9f501dd3e0a1441e7c))
- Rename core pkg dir to `core` ([082050b](082050b1648dd3c6569cab0cd974cf9128647c98))
- Set default for `connectable` to `true` ([0215d49](0215d49ad353e8a0e9e5ff52ff137eda6b753e40))
- Use `HandleConnectable` type for nodes `connectable` prop ([283846c](283846c196fce638b851c0b3d427877093421e74))
- Update base styles ([908b327](908b327224476204527a5078cdb400c04071344f))
- Remove docs from build process and use separate script ([e9d6ec1](e9d6ec16732f37f171cdf09027669818583b8b6a))
- Simplify `useHandle` ([2684272](2684272308355433c6a74c594fd830d9b497dbee))
- Move edge event handlers into Wrapper component ([13fed0a](13fed0a3fb3b74d3e910158574f33229202d06c9))
- Trigger dragging on drag start ([00a5ee0](00a5ee041619bc3c7475c2565a4316e099b798e3))

### Testing

- Search edges for random data ([f7dd7f1](f7dd7f1803ebaea4a74a6b1c1a97c0519e0760c6))
- Add connectOnClick test ([655a27d](655a27d572082cc3686890ef2f794f536ccf335d))
- Add viewpane tests ([0613350](06133505549c96857c3653aaaf230e8c2c604ee2))
- Add `tryAssertion` command to replace `cy.wait` ([5aa94e2](5aa94e2e13492330dc1fdae57f489d4b7f40d38a))
- Properly check element transforms ([e0016db](e0016db07a6d8a8a2d5d8293adce6cc5b0798070))

## [1.0.0] - 2022-10-08

[8fc28f9](8fc28f9b9c9d062dd053590a9bcd206c7845d080)...[6c5523d](6c5523db5e3cf807dbdb106f29b8b4410dccc4bd)

### Bug Fixes

- Remove action not properly removing elements ([9168d7b](9168d7bd751e400aa395dcd32e19d6187d9f6e27))

### Documentation

- Add transition example ([447699c](447699cb0518fd39b17023bea8d3b9d520a9ab96))
- Dynamic transition duration ([62a8750](62a8750da4e9c9d7db230f6f441afe30b6f28864))
- Update typedocs config to support new module structure ([afb3fc7](afb3fc7b495a6e0f3f1ac8dbe4be33df3be074d7))
- Move typedoc to root deps ([6aaef27](6aaef2743d44bd1bb56ce10634c1d24aa2d15569))
- Move typedoc to docs deps ([13d576d](13d576da4b043bb613a1902015d9f25a06708532))
- Update docs and mention removed edge center functions ([42219d3](42219d364006530184baac73d0ca50566263b0ac))
- Bump minimum node version to 14 ([6ac3503](6ac35032b5e7d0b34b8dc6e58a96c51083db2b4b))

### Features

- Support boolean keycode value ([ff520c8](ff520c8a708f195643ae03a2177ac5599df5bf61))
- Add changeset ([eb507c8](eb507c8e7649e703cdeb0ae3512a8476e582efd2))
- Add publish workflow ([86bff35](86bff351ca5bbce4c65201352260ed3bbc5ccf8b))

### Miscellaneous Tasks

- Add issue templates config.yml ([fd07402](fd07402c78c017039f86482366eb78722c5fa52f))
- Update bug report template & config.yml ([0c018a5](0c018a544056b079ec5d2042553fe0c9fcf7d8ba))
- Update pr template ([660fb36](660fb366f7a1e384fe56e431659d62f27ec8a7da))
- Update deps and resolve peer deps ([674fe4f](674fe4f9c9e1a47248bfae918db0f70a3af7a2a9))
- Update workflow file ([6bfb2b8](6bfb2b8a826252fea507dcf1c3ca952f8481ff32))
- Lint ([4593550](4593550f8556421e76ef6cb3afdecb59c0718906))
- Remove typedoc script from additional-components pkg ([acc0526](acc0526fdb89ad133d413f2b3ddbd9f668515ab1))
- Add typedocs script to root ([32c024c](32c024cccb1321bb48f79e79ed719abf7db02a2f))
- Remove vueuse ([97d498c](97d498c117db51d3c31064b58ebb22cc68ca9102))
- Add ignore list to changeset config ([667078e](667078e760903d5e15dd6962bd4153821f4f16bf))
- Rename docs pkg ([7d799de](7d799ded1e302cb89cc38a0db8d9a0310e755736))
- Add changelog-github ([151eae9](151eae98770cf118ac82474d628c7418a25c33bc))
- Remove node cache step ([77953a8](77953a8f8ec630ba5149cf1c8a82adf8f701bc7a))
- Update publish script ([756b36b](756b36b40b609c6edc662b491d49873e9ebe4594))
- Bump version ([6c5523d](6c5523db5e3cf807dbdb106f29b8b4410dccc4bd))

### Refactor

- Remove `useEventListener` from user selection ([5bc5f10](5bc5f10eae57591ce40bae56ce3e0c76faf64778))
- Prevent crash when checking if input dom node ([2a6763c](2a6763cfe1ef6f34ac4cf2acfd099e2bbfc5b24e))
- Change pkg scope to `vue-flow` ([8567e37](8567e3733b98c9140b064c455337fefeca5dcbda))
- Move additional components into separate pkg ([c1bcc02](c1bcc0279733d1611ffb9eab402d05418bcc6661))
- Simplify edge paths and center calculations ([2d76bf3](2d76bf345d8410b33d139768a9ac1c922b606347))
- Remove getEdgeCenter usage ([b1e56f0](b1e56f04032821d4c16627d170fd54aeced65b27))

### Testing

- Update remove action tests ([f9cd905](f9cd9051d852e39359d3b28241e8f4b80ce0a966))
- Add default type to generated nodes ([438ad57](438ad57502cafb9f279e222abc64537ea096997a))
- Correct selected elements calculation ([1601733](160173384cc9ae7bde0bb709f09c6b6713fa621e))
- Check all nodes/edges for selected class ([ca29a08](ca29a08d52f2db4a139057582ad3c63c3aafcb9f))
- Update drag test position ([664953b](664953b537e38f4466069620ea4d21cdb38771c8))
- Cleanup unused imports ([7eb6c52](7eb6c5216f4c18e65bc155d657c1a3fc73048a42))
- Defer checking for selected elements ([a6b6a83](a6b6a83eb65843ecacb4c746cb5e0a30411d43ef))
- Rename flow dir to vue-flow ([b547a1f](b547a1fb0cbf5189710028c780c0b9a55b52dcb0))
- Small delay when checking removed elements ([fd8061d](fd8061ddcca02918a26d9ca32ce29327015afa79))
- Add selection key code tests ([145d934](145d934af879afe1825a367ab1afdb40f4e083a9))
- Add delete key code tests ([ef11069](ef1106910267736862630f279ad054adae7d8031))
- Add additional components tests ([26b2518](26b251886ee3edb92cebc779f4efddef2e70dbad))

## [0.4.41] - 2022-10-07

[247f248](247f248de39a88f78baffa2785cd22e2f5600854)...[8fc28f9](8fc28f9b9c9d062dd053590a9bcd206c7845d080)

### Bug Fixes

- Use resize observer to set viewpane dimensions ([a8d0830](a8d0830dcd4c173e214e6fc5ab22981f74949b31))
- Calculate proper dimensions for view el ([55e4403](55e44030b389969406aa5bdf8d6b35d9b794e5bc))
- Edge-renderer to update on edge updates ([8c0982a](8c0982a7f3ad715236c074d53f8d5a1a3e3d0e81))
- Use filter to remove orphaned edges ([1ad6073](1ad6073699c13685940e8f72b5bddd14e6ae5db3))
- Interrupt edge hidden check if orphaned edge found ([d7282cc](d7282cc572e269aea6af27f1aa50bd7dac2ad1e3))
- Move resize observer to mounted hooks ([de6220b](de6220b3b32c6e8fe9b08f1ea2cca6a58d5f527a))
- Undo handle validation wrapping itself ([f508e6e](f508e6e571349ae5f3b291178e5a6eb92ea8f998))
- Zoom action tests to check for containing str ([72dd98b](72dd98b4641be985a22eae48792caaef2501f7ab))
- Check if element exists in isNode/Edge ([fc263a6](fc263a6814c83452bb3c0f1630d998eae373066e))

### Documentation

- Add blobity opensource license key ([d118888](d1188887c926bbca06b56e6bf7e22daf963bcaec))
- Fix typo ([78f35d5](78f35d516a36a908f22db6eb387596f91fb09be7))
- Use removeEdges in custom edge ([fe918c0](fe918c0bd81ad3c9ee076fe0c7a30cd7cba204ec))

### Features

- Add from position to position change event ([a29d7c8](a29d7c86f050bcdf976577699b37df76fcef2d71))
- Add useNode composable ([70871df](70871df469221daaef393ddefc17b7907d39f43c))
- Add nodeRef injection ([7d992b5](7d992b5ed755db2d42ba3100b88f110dac4e946d))
- Add generics to findNode action ([9b943df](9b943df61a50bde05c3ef83547c3955ef1dcc999))
- Add useEdge composable ([44a65b3](44a65b3bbb57cc33b7aec7a6c597b59fcbc00d7d))
- Add connection actions to store ([b0c168f](b0c168fff71b1b1d6eaa89310b835c165352da9b))
- Add vue flow mount command ([dc30ef4](dc30ef4805ab5b97b16565ec4763e7366c6d85a6))
- Add default command timeout of 1000 ([e81bea1](e81bea1637f7394e47acb776070c61729c702a3d))
- Add tests for add, find & remove actions ([9f59be7](9f59be7afaaba718633de4db3cb6275c514d8c8e))
- Add selected elements action tests ([cc4a007](cc4a007254d4eeba394c522eceb38cdf32e74175))
- Add remove selected elements action tests ([e3327eb](e3327ebea37291da0546f441147d693078d8f188))
- Add set min/max zoom action tests ([3770083](37700836185cd87f99a1683c5b761ad0ad98e658))
- Add update edge test ([fa5b5da](fa5b5da7404c9abe618baed56a78e9fdc6a075a7))
- Add data-id prop to edges ([3461602](3461602c2ce60a6180b8e54dc3c12fdbc5ce745d))
- Add connection line action tests ([9fde0bc](9fde0bc1af3826b278e0d0af4d9a2109cff7f719))
- Add dragging nodes test ([63dae2c](63dae2cd05d028a4d53f1864f92b4107f183ad4d))
- Add connecting nodes test ([e429fdf](e429fdf6c289357d3c19c7e267d3945e12f174cc))
- Add update edge tests ([1526ecd](1526ecd1f1772d9a852e5cee95ed01c3a398c968))
- Add data-type to edge anchors ([9cea132](9cea1326deaf2c033faa754a591a44d2f1a302dd))

### Miscellaneous Tasks

- Remove unused imports ([723a03b](723a03bca1e12479a04f945edce5bb9863a5248c))
- Force dimensions update on type change ([00059aa](00059aabab92565c52663194e0861c552da1f21a))
- Use enum in Marker.vue ([a840a5c](a840a5cf58d7d5e656841ec8533e71f4ccd8600b))
- Cleanup ([f0f24ce](f0f24cee5cd01ae0819d77ec64203d65075e3518))
- Remove log ([bb7a0ba](bb7a0ba50a8d442ba22e7f3b52a1c8b390f3ea78))
- Lint ([8199a1c](8199a1c921252ebee70d9cca7ef88a648e46ce6d))
- Update message ([39d0a1c](39d0a1c886b4c20e7749655946f57acc425d7c39))
- Update deps ([78c8bc7](78c8bc7a34d3ec159ab9cc151619c2bf16470da5))
- Correct edge text ref name ([09476f0](09476f061b9938cf4393442a9601cf75fcfa633f))
- Update cypress scripts ([8ee8996](8ee8996be9954f645b3e3db1b45d2ed33d7feb53))
- Update test vite conf ([c5291e7](c5291e7ab13bf396b5e87552e8cfaf5f603033f1))
- Cleanup ([f1abfc6](f1abfc6ac01893a4ebb3ab952e358c7874c2eb8c))
- Increase wheel delta ([d7ce835](d7ce8350992d186a5ae1cc7f389afd4710968bb9))
- Bump version ([8fc28f9](8fc28f9b9c9d062dd053590a9bcd206c7845d080))

### Refactor

- Use dom matrix to calculate handle bounds zoom ([ee56ddb](ee56ddb0cf1e938b78b272833284d0424c8c0aa0))
- Only update position on mount ([70dd73f](70dd73fb3accd75519b20751f17fc29bac2460c3))
- Cleanup handle calculation logic ([31b0bcb](31b0bcb83a8125cf9827cea713e170deae791d95))
- Use single resize observer for nodes ([a780813](a780813fdbe9b813f580840d4eef460f299e321b))
- Remove unnecessary scope ([bf7594f](bf7594fdbbf71dc92ede4af30b4381eadd24e89a))
- Remove flush timing from drag ([091c3df](091c3dff31953c5b461416d6ab8b72b58c918deb))
- Make handlebounds shallow reactive ([726471c](726471c114a88111146f98f9944b7eea89bccedf))
- Calculate bounds on mount ([1d1447e](1d1447ed10d780896765fe5899b1f6e947993ff0))
- Use connection start handle and remove other props from store ([a443d38](a443d38f123f8853f5505412b2ef8b1be1104a75))
- Emit connection events start and end with actions ([7a657f1](7a657f141aca9ef756edb5c752a00953056f4ba8))
- Upgrade to cypress 10 ([8928eb8](8928eb899b5846c6824158f6d1c5b34b3c51a9b9))
- Move test files ([6e0c0c7](6e0c0c77688c9e19007e4b5c5b76569470341f93))

## [0.4.40] - 2022-09-14

[f7c18df](f7c18df48a2339e75c32510c34bdc8f900009e8f)...[247f248](247f248de39a88f78baffa2785cd22e2f5600854)

### Bug Fixes

- Use `elementFromPoint` ([32a98cd](32a98cd606d27fe63cd75486c87cd274842c212e))
- Align snap grid to 0,0 ([87102eb](87102eb8c24bc7e21fa7aeaaf0dfa47ba2363967))

### Miscellaneous Tasks

- Update pnpm-lock.yaml ([1171e43](1171e434ff5367b7c4e5b59cfde341a13104969e))
- Bump version ([247f248](247f248de39a88f78baffa2785cd22e2f5600854))

## [0.4.39] - 2022-09-12

[ff51560](ff5156042781468d564da8f1822aa33e040f8f29)...[f7c18df](f7c18df48a2339e75c32510c34bdc8f900009e8f)

### Bug Fixes

- Skip applying node extent on mount ([018d711](018d711fc6364b060d52cf08bb074dc07e53f185))

### Features

- Save frame data of node ([c222bb9](c222bb9de55255e399fed0100137f1a0cf02f1ef))
- Updated smoothstep edge routing ([c113d3b](c113d3bd153e88e1cbb29b3732d9402ce835d6cc))

### Miscellaneous Tasks

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

- Bump version ([3e398d4](3e398d451a6ab43b9347b7f7e4954e76dc8c5060))

## [0.4.36] - 2022-08-08

[16b6f42](16b6f429a11d538b579d9fe5616ee61f1774df55)...[f1a1321](f1a1321117169d79345201499917ede855b4d68e)

### Bug Fixes

- Use flush timing `post` in NodeWrapper.vue ([80fd818](80fd8183593923ece480c8ae9bc72ecd4b3eec43))

### Miscellaneous Tasks

- Add `.pnpm-store` to `.gitignore` file ([a9dc02d](a9dc02df8d41056526a40dbb324cda1803e70669))
- Bump version ([f1a1321](f1a1321117169d79345201499917ede855b4d68e))

## [0.4.35] - 2022-08-03

[f473dac](f473dacffe97e8724166c16dc234d94d4720d294)...[16b6f42](16b6f429a11d538b579d9fe5616ee61f1774df55)

### Documentation

- Update intro links ([3638e59](3638e598e4afe7d9e74ebe4adf383847c29162f7))

### Features

- Block keypress on inputs and `.nokey` elements ([250965d](250965d18f86d8930bdece7d4d954b662bdc3ecb))

### Miscellaneous Tasks

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

- Bump version ([dc0ec7a](dc0ec7a27dcf7f1c6d60765e6af2f56074fb281c))

## [0.4.32] - 2022-07-28

[4766510](4766510a13a0cac775c472ec25b2098f276d4308)...[9aa5172](9aa517285b26d6ad9e34caad1dcbc3a27569b19b)

### Bug Fixes

- Prevent initial dimensions being emitted twice ([1db74cf](1db74cf8b6567ec3021f241e1023d1748a04e9a7))

### Miscellaneous Tasks

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

### Reverts

- Explicitly bind emits ([31f0dba](31f0dbafa7a2feafce74416d09caa19e4b0cadc0))
- Use state viewport zoom to calculate handlebounds ([98ff311](98ff31154c703b10fe7e5b0c7b7941aa8e9502b7))

## [0.4.30] - 2022-07-22

[7596c4d](7596c4d325cc126518464553482c04cb0b8e60f9)...[600922a](600922afd921c3c357edfcc27149f451d3aa0e4a)

### Bug Fixes

- Use correct edge event types ([d96e944](d96e944a49eabb3997cbcd40e2c34ee087cfa7c9))

### Miscellaneous Tasks

- Update pnpm-lock.yaml ([78f176c](78f176cf468f35fec65123302c6f7d41f036b1a1))
- Upgrade dependencies ([c16cd46](c16cd464b3b223a394689b9425be9f5eb8923e62))
- Bump version ([600922a](600922afd921c3c357edfcc27149f451d3aa0e4a))

## [0.4.29] - 2022-07-18

[b696eb0](b696eb04f9538a8a5bf25490fd0cc3e0ef9bf50d)...[7596c4d](7596c4d325cc126518464553482c04cb0b8e60f9)

### Bug Fixes

- Check parent dimensions before extending ([7d66094](7d66094b06a94b6894fc6cb98d136175a23cca34))
- Remove child nodes when parent gets removed ([9bca73d](9bca73d76251d89918dc2a69d47c60aeae6e3233))

### Miscellaneous Tasks

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

### Examples

- Fix import path ([942a122](942a122fcb4d2dbabdafb70a925499bfeef96a9e))

### Features

- Add `autoConnect` option ([e047be6](e047be6854da3c4ed97fb7e270e85fd3b8bc3628))

### Miscellaneous Tasks

- Update CHANGELOG.md ([e55a3fb](e55a3fbeb6f06101320714642553807be29434e5))
- Add workflow to generate changelog on `v*`-tags push ([87ad709](87ad709e5eccfda91f95bf73ce8b563518cf1f30))
- Move update position into own function ([c2303f4](c2303f4c2fb0af22dfd6a1a1ec2e9ed5b78950ab))
- Rename postrelease script to changelog ([4a2345b](4a2345b533ea6ec6dd095ecbe83ec320e88dadfa))
- Bump version ([c866df6](c866df6d0615f0e92701fb8eb544744f8aeeeb8c))

### Refactor

- Move `position: absolute` to required handle styles ([8e911de](8e911deaa77fd48fcae0e31fbfcda70167f27bc8))
- Remove ctrl key from drag filter condition ([1aa9230](1aa9230fe4a3cf8f849de4ca6dfc7194d6882069))
- Add `updateNodeInternals` action ([648350c](648350cdedadd4afa4ec58b339a7e67b2a3df539))
- Remove computed position as prop from custom nodes ([4b824b5](4b824b527ff66f26d953df30ecc6e9ba28d02293))

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

- Update CHANGELOG.md ([62dda36](62dda36165baa0cabe400b5a2263cda3945ea2c4))
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
- Update CHANGELOG.md ([fbcd00b](fbcd00b5885ef7cb1506c239e0b3ac3eea90161a))
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
- Update CHANGELOG.md ([b3a1726](b3a172644955bbe17a5a6f45d62855177da548b2))
- Update dependencies ([3dd3c37](3dd3c37fc25e36dafce67be5e7b3cd690c2dca32))
- Update lock file ([77b441b](77b441b1c6803c5543eb7a50315e193e168fb310))
- Use type import for emit definition ([fdc6f40](fdc6f40c3c9f89a3548e3f75c89702ef54888916))
- Update README.md links ([699e252](699e25293556267b5311883cf4201f98f2368924))
- Move `BaseEdgeProps` to types ([e54f7b5](e54f7b56d01f4cfacef0c101cfcc269ab48f8706))

### Reverts

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
- Update CHANGELOG.md ([deef900](deef9000805a36c962e48f47675b1350cc3b8d17))
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

### Examples

- Move current examples into `examples/vite` ([8dd7c79](8dd7c797001fe519510f888d29a4fb1e51033648))
- Add quasar example ([330d6d7](330d6d7eac478159ece58705a57f3a0d4be0bbb8))
- Add nuxt3 example ([f21d317](f21d317fe8dcde10e80d67049f19f9fdec86047e))

### Miscellaneous Tasks

- Update CHANGELOG.md ([710b22e](710b22eb0eab248da57445ff68e31fbd4294e54c))
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

- Update CHANGELOG.md ([bcfc403](bcfc40382c1d840479330c24316f5b2952de53b2))
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

### Examples

- Fix import path ([ee78e92](ee78e925e041877cc02faf0e2655c02270f236a8))

### Features

- Add connected edges to node mouse events ([5b307b5](5b307b548a71f8b3fab25fc45f746f034700ec57))
- Add width and height options to minimap ([0cd6eaf](0cd6eaff359793a02c1b783bd8f84c2351e54f32))
- Add mouse over events for minimap nodes ([7c360bb](7c360bb5c177036b68a6a7a7c6e3eab1353e2f89))
- Add mouseover events for minimap nodes ([d519eba](d519eba4303e1169fd7c743ad7cc0b20506a4c22))
- Add teleport option to nodes ([0d35f1c](0d35f1c7e3c24407241fab6f24cc66c0fcaf2c95))
- Only allow teleport on graph nodes ([e38cb4e](e38cb4e0c2fabe67af60f4d82bf48453afc9a2f0))
- Implement `useDrag` in `NodesSelection.vue` ([674a657](674a65788e85c0f0c38e4dd3aea434173391ebda))

### Miscellaneous Tasks

- Update CHANGELOG.md ([d55aba3](d55aba3f1740218f2c637f3779882c2ec08b423b))
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

- Update CHANGELOG.md ([df43ff3](df43ff3b8b0a83a182207eea4e198f5d1233659c))
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

### Miscellaneous Tasks

- Update CHANGELOG.md ([8459476](8459476a9839263e182e484880ffbca3a1df161d))

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

### Examples

- Add initial class to basic ([bb30db7](bb30db7c08708672e7981736c505a1f27ea3a688))

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
- Update CHANGELOG.md ([b8abc78](b8abc783075d45be3beb1f6c4eac2b577c22e80d))
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
- Update CHANGELOG.md ([c0d9b09](c0d9b09f15eaa63b7cc90d9b81ea4fecb2b34581))
- Update deps ([59870a3](59870a3a55830ff8932d0961a3f66ba134e8baab))
- Update vue to 3.2.25 ([c617494](c617494bb8dc5f341a880451d64055dcdce59bc0))
- Import sort ([c6b8aa8](c6b8aa88eaad4ddd1b23e6a5433cdb454601ce4a))
- Update CHANGELOG.md ([718b3a1](718b3a1d797d54a7999db2f63bd7da3a83d76c29))
- Move ts-patch and typescript-transform-paths to package dev-deps ([c52b870](c52b870a3d6e3e59bb53bbcb41f2c8ca007d005a))
- Update CHANGELOG.md ([35a05fd](35a05fd6c66b7a43cd6e078af3f5ef938d3d5309))
- Remove log ([553355d](553355dd861a58f647ab4f308862e7df617b3ebf))
- Update CHANGELOG.md ([65d1ea2](65d1ea2300d9c155596a47e746f6f47ba44870b9))
- Update CHANGELOG.md ([9bfd810](9bfd8105b8ff9a62575131bfcb89169399dba0cb))
- Remove unused eslint-rules & lint files ([f011ea6](f011ea61b11189d6ead8be8065230fa2f531b316))
- Remove export ([367c7fd](367c7fdf4017cc4197e1a8e3be91b605dd9b4057))
- Update author field ([3142388](31423889d2c0bc340add322502d01110c24f3726))
- Move typedoc to package ([e558ad5](e558ad5bc54de2e0b881f169d0c8daf694500637))
- Change destination dir for docs output ([de75e25](de75e257a5fca746e287c974584b98ac2ec10047))
- Add typedoc pipeline output ([38103a2](38103a25e014cf034f527bfb630f34d9db0cac11))
- Remove lint pipeline dependency ([4ebfb2a](4ebfb2ada5557763964e94efdfcadb8aa6732b85))
- Remove .vscode dir ([914db33](914db337cf0256979110b60336542933c131bef4))
- Update release script ([8e83d6a](8e83d6a2afdc28ececc54fd93ca0e8e4360c5f70))
- Update CHANGELOG.md ([0be67d2](0be67d248540719ec730599f5a1af89d794cc7f6))
- Update LICENSE ([ae4cefe](ae4cefefbc155410c2d21561e0edb0159c19494c))
- Remove comment ([e17fb80](e17fb8094b2ed14466585807ef3bbaedd788b75e))
- Type fix in examples ([efe68d7](efe68d7b547d67c1c7fe4029e1a2ad1c818c2ed9))
- Update CHANGELOG.md ([f2363e2](f2363e2e08d3db1a83ad4745892d777fcc0b1aa8))
- Update CHANGELOG.md ([82fcb5c](82fcb5c234f7727237802f80a037ea76c0ca9868))
- Update CHANGELOG.md ([24c5e11](24c5e11d861f4ea63d39cf7b270c6fcd1d0f9e96))
- Update CHANGELOG.md ([1765da8](1765da8877895601d143dddf29ce348f8178c0b5))
- Update issue templates ([71fbc2b](71fbc2b8a4d50f79a1653738b61b76f3d981a21e))
- Update vue flow version in docs/tests/examples ([99d0627](99d062728acb93949361acc98ced630360ee0844))
- Remove duplicate keys on nodes/edges ([0a21f3c](0a21f3c06893edc03ff35bbf21d29930187acabe))
- Update CHANGELOG.md ([2e13344](2e13344d4e3e1281d402e4328d47819c7d77b1ae))

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

- Update CHANGELOG.md ([2ee33a1](2ee33a188eae7122ef100310a7a67f37a8c3acb0))
- Update lock file ([cb14acd](cb14acd99a2660ac6422e13d93c207ea92d494a5))
- Move custom size check up above watcher ([908657c](908657c7ce48e5031d037e2dd03ea4ab0f27e9bf))
- Update CHANGELOG.md ([75a7b89](75a7b89510f21eb821c42b06e5c7b37cd00d9b95))

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
- Update CHANGELOG.md ([5804ace](5804ace138b2f43fa83e26affec4d86fee26d000))
- Disable auto run of changelog.yml ([94dd8c8](94dd8c8dd57084a47935d05085ce24bb3d1bf26a))
- Update CHANGELOG.md ([47ef8d8](47ef8d8138b07d14a18b247e2f88828bbb92a30b))

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

### Reverts

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

- Typos in README.md ([51b120b](51b120bd764025009982fd0f99a405135674ea22))
- Remove DraggableEvent type from utils file (doesn't exist anymore) ([e77797a](e77797acc74cf38334465617a94a4cba033d9c11))
- Types ([1a7f3da](1a7f3da0b6b55d6c3fa1057bb07ff8bb26e47f89))
- Copy preloadedstate object for pinia to avoid using an existing state when re-creating store ([6347cf9](6347cf97cb7f2502e7c4e489d344823c7628151d))
- Return render function ([e2162c9](e2162c95a89db01510b8f9334d1c6b1bcd9cacc6))
- Edges not updating text ([16e93af](16e93af184fcc3c295eb6b5abeca7e14efa415a5))
- Default position for handle on output node ([05c111e](05c111e5dff6d91c8b9fd64e9d42d7b927044bcb))
- Custom node positions ([e7513b8](e7513b898c04ae80343475236942b6493f030e71))
- Custom edges not displayed correctly ([9e397e6](9e397e68174432bc1409ad9ab216912d73d24da8))
- Marker arrowheads not displayed ([adb5ec5](adb5ec544dcafd10438324437f3e934019fca40d))
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
- Label type in edges ([ff7ee5c](ff7ee5c7fe08b9e94cf9f3104ff21c0132bed370))
- Store actions blocking main thread ([5f500bc](5f500bca184f02b5ca973346fda28352f441a5bf))
- Nodeposdiff not updating correctly on node selection ([c062601](c06260187430c5de3648c5a888f94552003eb36e))
- Zoom pan helper not being initialized timely ([ca2901b](ca2901bc01ab96b04df9f88429bf646c16a72338))
- Valid connection func in handle ([e11fddf](e11fddf70ad8e6a9b6536b7a9d680b93ea6b1a3c))
- Node type change not triggering recalculation of node dimensions ([cd02dd0](cd02dd0444421346bf844b477876e326f488cf52))
- Node not updating handlebounds when handle pos changes ([26b3901](26b3901bd5fcde8c168a7bef1e189736f93765d4))
- Missing bgcolor in background ([ee07aff](ee07affa89b879ac93cb5535369dd78218d94f9c))
- Missing node id in node components/slots ([cb96b1a](cb96b1ab009c748149672a5e68551e4a41f0a848))
- Typings ([6ec8258](6ec8258f33c37f6816f2e8f44827496bdc1f21b1))
- Dedupe and add alias for vue ([3931a59](3931a59524e6422a7c795e258739648957bf27eb))
- Zoom pane not scaling ([a8f7cc2](a8f7cc2389d76e67f7b29cc4a270563d3dc43f4e))
- Custom node example not fitting view ([5437d48](5437d48325979f359f3bb52cc8bb35618a72c237))
- Draggable not updating on nodes ([ea7db92](ea7db92b6e99876efd56e265ed9795f099e07749))

### Features

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

- Remove rollup-plugin-vue ([e5d8338](e5d8338b3299b38c1bf5650eb2c7230d9585cd94))
- Update vueuse to 6.0.0 ([908e741](908e7413991c444936cf17501b9d930c80280bdc))
- Update eslint rules ([77eac0c](77eac0c12a11eb791d037931a9b5428c14db6ff3))
- Use pnpm instead of yarn ([769378a](769378a2ea829cc5c042a3a3e6b5cdd6e9449b11))
- Remove unused deps ([6cfe5f6](6cfe5f6d4348266ab4700a6c3873bc5bf6975842))
- Update draggable ([e9392b1](e9392b13c5cb9f1eae81ef66781f5101a49902ed))
- Downgrade draggale to 0.2.5 due to transformation issue with current version ([9532615](9532615cfd913700cb04ca55d05281b2dbdec56a))

### Refactor

- Resize handler and zoom pan helper to watch until refs are resolved ([a6f7678](a6f7678c0f2930c82b7d9eb57ff1359c8226f674))
- Back to jsx 🥇 ([1d542ab](1d542aba65763afad22e1e7ed28254ba8eb74e79))
- Split types into separate files ([3557284](3557284a404df9fa66c5fb61f25621e5191a52f6))
- Update usekeypress functions ([fec2ef4](fec2ef40da36dbb9b15a9dd910d7a8ee05c600de))

### Update

- Edge label bg true by default ([6b9c608](6b9c6083815a3fc113922d03246d4728735a9490))
- Redirect to basic example as default ([6912993](6912993ebd67323bb7f7e786be62657d61b29659))
- Button edge example to remove edge on click ([156b312](156b3123366b86ff4b14bf8850850c344a211dbb))
- Remove effect watcher from zoom pane ([8d8a4a3](8d8a4a3d1e16dbb5a6f391d6c8e3bb23e4f74baf))
- Add effect scope to useZoomPanHelper.ts ([b8ce50a](b8ce50ae3e770dcf400df7d44759a8837c839eec))
- Add key to node ([22a1dc6](22a1dc6716202c552a337f6ba7ceec9a4e53673a))
- Add measurment (px) to nodes width and font size ([e0bc7e2](e0bc7e2c9695d5bb0877bbe3bd9b0c175961e95e))
- Color prop optional in MarkerDefinitions ([d6a8ed6](d6a8ed6be504aefa97200caf10bcd1173057b707))
- Pass selection key code to zoom pane ([347f1ed](347f1edc3240916c27de73ff9931fddad55b1427))
- Fix node perfomance ([f6f7564](f6f75648948929955f1b6011931b863e83f0e5cf))
- Refactor remaining files to script setup style ([560bdc2](560bdc203be8876b00f18fbb4d56a512c2b8fc89))
- Refactor additional-components ([1ff3a8d](1ff3a8dc9c1926d59858b16ebc5eee603d355d7e))
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

### Features

- Add drag n drop example ([9b78c0f](9b78c0f5d229e3e8f7875cfb145a53a41459abe0))

### Refactor

- Use injected store so we can use a distinct instance not a global one ([6c9d88b](6c9d88b09ddcce9930ff08a430b554e36c00e4c7))

### Update

- Renaming stuff from react flow to revue flow ([d491c01](d491c0196c7b2ac98ed845f95302414261016bec))
- README.md ([3f126f0](3f126f085ec85d356ca06da9fff89cf36560ebe7))
- Base page to basic (no overview currently) ([8f727a4](8f727a4d93025d131b55cff35824dfdd63dd3150))

## [0.0.35] - 2021-07-10

### Bug Fixes

- Try to deploy as package... ([99548a0](99548a0dba01e3890d0852f5ce8249592568b3df))
- Entry ([07721e9](07721e9b75e1daf1d75ece276ea6b94773768941))
- Add vue-demi to external deps in vite.config.ts ([f1ee5b6](f1ee5b61a205c9f046c3582c205c3075f217c44d))
- Add vue-demi to external deps in vite.config.ts ([b9b2615](b9b261578616b61ea838163fff849e7015a1bcf4))
- Proptype ([6a6c5c9](6a6c5c9ee1310c15fd086ad1ce59a145682c119c))
- Some bundle stuff ([f685c7a](f685c7a20a081e18c1ba0b7b89852cfc26ec0e76))

### Features

- Transform react-flow to vue-jsx ([52e1188](52e1188d043f1453b67725a46735916214351590))
- Make edges work ([b2c250e](b2c250ef38e8188b132d043c4897a405622bb759))
- Show connection lines when holding down on handle ([ea98c2a](ea98c2afa1740456cafe10ff6f373bc9f27ab295))
- Update graph on new elements pushed ([1253403](125340341db5084c887453c9d12dcfaa2bed08a1))
- Implement MiniMap, Background and Controls components ([4319e2a](4319e2ac4987734ab99d3e337e69149b624cf285))
- Add np ([5c15967](5c159671ea00dfca58f581923d88e16c9f388db2))
- Add siroc config ([3094cc2](3094cc211d3c6b055e8e6fd21f1eba0283e6acb2))

### Bugfix

- Types file ([bf95b23](bf95b23a7fdc471b987a343566c8bca05084bcc0))
- Utils file ([c977946](c9779467a306f038031043564cf6bcd61e179e87))
- Utils file ([e400b48](e400b48e9c6dda7fd1c75fb397919c66b3c09299))
- Pinia instance not created internally and thus missing from app if not explicitly included ([c8150a2](c8150a252f5331b713374bcc2cfd3672a2e992e0))

### Update

- Gitignore ([e543bd5](e543bd500588212e26c5efdbfd0e5636eb40a8d6))
- Revue-flow index.tsx ([b6d9265](b6d92653174ff92ef22cdb054bc12996a8f879d9))
- Rollup.config.js ([b43623c](b43623ce672a5a429c09fca0faa5e563f95cde7e))
- README.md ([0603a12](0603a12ee0603b73d1b46badd60644aad0351e25))
- Deps ([0c449c9](0c449c9274bbf5de3d6b76f45a30b8ae8107fa1b))
- Remove vue-demi ([59b6af3](59b6af384cc76a1b6c59ad51d977d90ab4ac4847))
- Main ([d934782](d934782cb8c85cb305657e615b7e52f8bf4d3115))
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
- README.md ([fde7ca6](fde7ca665318cac9a1051b2974d4433e4566cea7))
- README.md ([4661b68](4661b685adad568bfd0241c80e1f8a2629f75c45))
- Renaming stuff from react to "revue" ([881655d](881655d4831ca36ae49852d4e75dd28cd7013419))

<!-- generated by git-cliff -->
