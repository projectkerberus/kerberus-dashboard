# @backstage/plugin-jenkins

## 0.4.4

### Patch Changes

- 5baf2ff0f: Show error in Jenkins card for errors exposed by the Jenkins API
- Updated dependencies [add62a455]
- Updated dependencies [cc592248b]
- Updated dependencies [17c497b81]
- Updated dependencies [704875e26]
  - @backstage/catalog-model@0.8.0
  - @backstage/core@0.7.11
  - @backstage/plugin-catalog-react@0.2.0

## 0.4.3

### Patch Changes

- 062bbf90f: chore: bump `@testing-library/user-event` from 12.8.3 to 13.1.8
- 675a569a9: chore: bump `react-use` dependency in all packages
- Updated dependencies [062bbf90f]
- Updated dependencies [10c008a3a]
- Updated dependencies [889d89b6e]
- Updated dependencies [16be1d093]
- Updated dependencies [3f988cb63]
- Updated dependencies [675a569a9]
  - @backstage/core@0.7.9
  - @backstage/plugin-catalog-react@0.1.6
  - @backstage/catalog-model@0.7.9

## 0.4.2

### Patch Changes

- c614ede9a: Updated README to have up-to-date install instructions.
- Updated dependencies [9afcac5af]
- Updated dependencies [e0c9ed759]
- Updated dependencies [6eaecbd81]
  - @backstage/core@0.7.7

## 0.4.1

### Patch Changes

- 01ccef4c7: Introduce `useRouteRefParams` to `core-api` to retrieve typed route parameters.
- Updated dependencies [01ccef4c7]
- Updated dependencies [fcc3ada24]
- Updated dependencies [4618774ff]
- Updated dependencies [df59930b3]
  - @backstage/plugin-catalog-react@0.1.3
  - @backstage/core@0.7.3
  - @backstage/theme@0.2.5

## 0.4.0

### Minor Changes

- e8b2ed9cc: Changed the way project slug is extracted from an entity. Up until now, the plugin assumed that the project slug is always of the format "owner/repo". However, this is not something that is enforced by Jenkins and sometimes the project name doesn't contain an owner.
  Since this split is not used anywhere and the entire project slug is always used as-is, removed this distinction and just read the project slug from the annotation as-is.

### Patch Changes

- 9ca0e4009: use local version of lowerCase and upperCase methods
- Updated dependencies [8686eb38c]
- Updated dependencies [9ca0e4009]
- Updated dependencies [34ff49b0f]
  - @backstage/core@0.7.2
  - @backstage/plugin-catalog-react@0.1.2

## 0.3.12

### Patch Changes

- 0452ba238: - Add Jenkins logo to project page.
  - Move to new Backstage breadcrumb component.
  - Change references of deprecated "Job" terminology to "Project" per [Jenkins Glossary](https://www.jenkins.io/doc/book/glossary/).
- Updated dependencies [12d8f27a6]
- Updated dependencies [40c0fdbaa]
- Updated dependencies [2a271d89e]
- Updated dependencies [bece09057]
- Updated dependencies [169f48deb]
- Updated dependencies [8a1566719]
- Updated dependencies [9d455f69a]
- Updated dependencies [4c049a1a1]
- Updated dependencies [02816ecd7]
  - @backstage/catalog-model@0.7.3
  - @backstage/core@0.7.0
  - @backstage/plugin-catalog-react@0.1.1

## 0.3.11

### Patch Changes

- Updated dependencies [3a58084b6]
- Updated dependencies [e799e74d4]
- Updated dependencies [d0760ecdf]
- Updated dependencies [1407b34c6]
- Updated dependencies [88f1f1b60]
- Updated dependencies [bad21a085]
- Updated dependencies [9615e68fb]
- Updated dependencies [49f9b7346]
- Updated dependencies [5c2e2863f]
- Updated dependencies [3a58084b6]
- Updated dependencies [2c1f2a7c2]
  - @backstage/core@0.6.3
  - @backstage/plugin-catalog-react@0.1.0
  - @backstage/catalog-model@0.7.2

## 0.3.10

### Patch Changes

- f4c2bcf54: Use a more strict type for `variant` of cards.
- Updated dependencies [fd3f2a8c0]
- Updated dependencies [d34d26125]
- Updated dependencies [0af242b6d]
- Updated dependencies [f4c2bcf54]
- Updated dependencies [10a0124e0]
- Updated dependencies [07e226872]
- Updated dependencies [f62e7abe5]
- Updated dependencies [96f378d10]
- Updated dependencies [688b73110]
  - @backstage/core@0.6.2
  - @backstage/plugin-catalog-react@0.0.4

## 0.3.9

### Patch Changes

- 53348f0af: Improve display of duration in latest build card
- 025c0c7bf: Migrate to new composability API, exporting the plugin instance as `jenkinsPlugin`, the entity content as `EntityJenkinsContent`, the entity conditional as `isJenkinsAvailable`, and the entity card as `EntityLatestJenkinsRunCard`.
- Updated dependencies [19d354c78]
- Updated dependencies [b51ee6ece]
  - @backstage/plugin-catalog-react@0.0.3
  - @backstage/core@0.6.1

## 0.3.8

### Patch Changes

- 019fe39a0: Switch dependency from `@backstage/plugin-catalog` to `@backstage/plugin-catalog-react`.
- Updated dependencies [12ece98cd]
- Updated dependencies [d82246867]
- Updated dependencies [7fc89bae2]
- Updated dependencies [c810082ae]
- Updated dependencies [5fa3bdb55]
- Updated dependencies [6e612ce25]
- Updated dependencies [025e122c3]
- Updated dependencies [21e624ba9]
- Updated dependencies [da9f53c60]
- Updated dependencies [32c95605f]
- Updated dependencies [7881f2117]
- Updated dependencies [54c7d02f7]
- Updated dependencies [11cb5ef94]
  - @backstage/core@0.6.0
  - @backstage/plugin-catalog-react@0.0.2
  - @backstage/theme@0.2.3
  - @backstage/catalog-model@0.7.1

## 0.3.7

### Patch Changes

- 9f8faed25: Update Jenkins card with build date, duration, and rename card to "latest" build.
- Updated dependencies [a4e636c8f]
- Updated dependencies [099c5cf4f]
- Updated dependencies [a08db734c]
  - @backstage/plugin-catalog@0.2.13

## 0.3.6

### Patch Changes

- Updated dependencies [def2307f3]
- Updated dependencies [efd6ef753]
- Updated dependencies [593632f07]
- Updated dependencies [33846acfc]
- Updated dependencies [a187b8ad0]
- Updated dependencies [f04db53d7]
- Updated dependencies [a93f42213]
  - @backstage/catalog-model@0.7.0
  - @backstage/core@0.5.0
  - @backstage/plugin-catalog@0.2.12

## 0.3.5

### Patch Changes

- feabc7f0c: Handle missing ObjectMetadataAction in Jenkins API
- Updated dependencies [f3b064e1c]
- Updated dependencies [c00488983]
- Updated dependencies [265a7ab30]
- Updated dependencies [abbee6fff]
- Updated dependencies [147fadcb9]
  - @backstage/catalog-model@0.6.1
  - @backstage/plugin-catalog@0.2.11
  - @backstage/core@0.4.4

## 0.3.4

### Patch Changes

- Updated dependencies [c911061b7]
- Updated dependencies [8ef71ed32]
- Updated dependencies [0e6298f7e]
- Updated dependencies [ac3560b42]
  - @backstage/catalog-model@0.6.0
  - @backstage/core@0.4.1
  - @backstage/plugin-catalog@0.2.7

## 0.3.3

### Patch Changes

- b2a07d2dc: Avoid loading data from Jenkins twice. Don't load data when navigating through the pages as all data from all pages is already loaded.
- 04efbbdd2: Refactor to support ADR004 module exporting.

  For more information, see https://backstage.io/docs/architecture-decisions/adrs-adr004.

- 0f8877168: Improve loading speed of the CI/CD page.
  Only request the necessary fields from Jenkins to keep the request size low.
  In addition everything is loaded in a single request, instead of requesting
  each job and build individually. As this (and also the previous behavior) can
  lead to a big amount of data, this limits the amount of jobs to 50.
  For each job, only the latest build is loaded. Loading the full build history
  of a job can lead to excessive load on the Jenkins instance.
- Updated dependencies [2527628e1]
- Updated dependencies [6011b7d3e]
- Updated dependencies [1c69d4716]
- Updated dependencies [83b6e0c1f]
- Updated dependencies [1665ae8bb]
- Updated dependencies [04f26f88d]
- Updated dependencies [ff243ce96]
  - @backstage/core@0.4.0
  - @backstage/plugin-catalog@0.2.6
  - @backstage/catalog-model@0.5.0
  - @backstage/theme@0.2.2

## 0.3.2

### Patch Changes

- Updated dependencies [08835a61d]
- Updated dependencies [a9fd599f7]
- Updated dependencies [bcc211a08]
- Updated dependencies [ebf37bbae]
  - @backstage/catalog-model@0.4.0
  - @backstage/plugin-catalog@0.2.5

## 0.3.1

### Patch Changes

- Updated dependencies [475fc0aaa]
- Updated dependencies [1166fcc36]
- Updated dependencies [1185919f3]
  - @backstage/core@0.3.2
  - @backstage/catalog-model@0.3.0
  - @backstage/plugin-catalog@0.2.3

## 0.3.0

### Minor Changes

- a41730c6e: Add tooltip for Jenkins rerun button

### Patch Changes

- Updated dependencies [7b37d65fd]
- Updated dependencies [4aca74e08]
- Updated dependencies [e8f69ba93]
- Updated dependencies [0c0798f08]
- Updated dependencies [0c0798f08]
- Updated dependencies [199237d2f]
- Updated dependencies [6627b626f]
- Updated dependencies [4577e377b]
- Updated dependencies [2d0bd1be7]
  - @backstage/core@0.3.0
  - @backstage/theme@0.2.1
  - @backstage/plugin-catalog@0.2.1

## 0.2.0

### Minor Changes

- 28edd7d29: Create backend plugin through CLI
- 6d97d2d6f: The InfoCard variant `'height100'` is deprecated. Use variant `'gridItem'` instead.

  When the InfoCard is displayed as a grid item within a grid, you may want items to have the same height for all items.
  Set to the `'gridItem'` variant to display the InfoCard with full height suitable for Grid:
  `<InfoCard variant="gridItem">...</InfoCard>`

  Changed the InfoCards in '@backstage/plugin-github-actions', '@backstage/plugin-jenkins', '@backstage/plugin-lighthouse'
  to pass an optional variant to the corresponding card of the plugin.

  As a result the overview content of the EntityPage shows cards with full height suitable for Grid.

### Patch Changes

- 1297dcb3a: Refactor to use DiscoveryApi
- Updated dependencies [28edd7d29]
- Updated dependencies [819a70229]
- Updated dependencies [3a4236570]
- Updated dependencies [ae5983387]
- Updated dependencies [0d4459c08]
- Updated dependencies [482b6313d]
- Updated dependencies [e0be86b6f]
- Updated dependencies [f70a52868]
- Updated dependencies [12b5fe940]
- Updated dependencies [368fd8243]
- Updated dependencies [1c60f716e]
- Updated dependencies [144c66d50]
- Updated dependencies [a768a07fb]
- Updated dependencies [b79017fd3]
- Updated dependencies [6d97d2d6f]
- Updated dependencies [5adfc005e]
- Updated dependencies [f0aa01bcc]
- Updated dependencies [0aecfded0]
- Updated dependencies [93a3fa3ae]
- Updated dependencies [782f3b354]
- Updated dependencies [8b9c8196f]
- Updated dependencies [2713f28f4]
- Updated dependencies [406015b0d]
- Updated dependencies [82759d3e4]
- Updated dependencies [60d40892c]
- Updated dependencies [ac8d5d5c7]
- Updated dependencies [2ebcfac8d]
- Updated dependencies [fa56f4615]
- Updated dependencies [ebca83d48]
- Updated dependencies [aca79334f]
- Updated dependencies [c0d5242a0]
- Updated dependencies [b3d57961c]
- Updated dependencies [0b956f21b]
- Updated dependencies [97c2cb19b]
- Updated dependencies [3beb5c9fc]
- Updated dependencies [754e31db5]
- Updated dependencies [1611c6dbc]
  - @backstage/plugin-catalog@0.2.0
  - @backstage/core@0.2.0
  - @backstage/catalog-model@0.2.0
  - @backstage/theme@0.2.0
