<template>
  <NuxtLayout name="page">
    <PageWrapper>
      <PageHeader>
        <PageTitle :text="$t('pages.dashboard.index.title')" class="capitalize" />
      </PageHeader>
      <PageBody>
        <PageSection>
          <p>
            We all hate JavaScript.
          </p>
        </PageSection>
      </PageBody>
    </PageWrapper>
  </NuxtLayout>
</template>