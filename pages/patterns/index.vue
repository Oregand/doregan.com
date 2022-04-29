<template>
  <NuxtLayout name="page">
    <PageWrapper>
      <PageHeader>
        <PageTitle :text="$t('pages.patterns.title')" class="capitalize" />
      </PageHeader>
      <PageBody>
        <PageSection>
          <p><strong>Design patterns </strong>
            are typical solutions to common problems
              in software design. Each pattern is like a blueprint
              that you can customize to solve a particular
              design problem in your code.
          </p>
        </PageSection>
      </PageBody>
    </PageWrapper>
  </NuxtLayout>
</template>
