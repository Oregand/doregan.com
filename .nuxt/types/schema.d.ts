import { NuxtModule } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtConfig {
    ["windicss"]?: typeof import("nuxt-windicss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
  }
  interface PublicRuntimeConfig {
     app: {
        baseURL: string,

        buildAssetsDir: string,

        assetsPath: any,

        cdnURL: any,
    },
  }
  interface PrivateRuntimeConfig {
  
  }
}