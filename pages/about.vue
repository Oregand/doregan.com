<template>
  <NuxtLayout name="page">
    <PageWrapper class="flex flex-col justify-center items-center">
      <PageHeader>
        <PageTitle :text="$t('pages.about.title')" class="capitalize" />
      </PageHeader>
      <PageBody>
        <div class="flex flex-col items-center">
          <img
            src="https://avatars.githubusercontent.com/u/41994283?v=4"
            class="inline-block rounded-full"
            alt="oregand"
            width="100"
            height="100"
          />
          <Button
            size="xs"
            text="David O'Regan (@oregand)"
            class="font-extrabold mt-4"
            href="https://github.com/oregand"
          />
        </div>
      </PageBody>
    </PageWrapper>
  </NuxtLayout>
</template>
