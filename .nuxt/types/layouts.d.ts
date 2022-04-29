import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "dashboard" | "page"
declare module "/Users/davidoregan/dev/websites/doregan.com/node_modules/nuxt3/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}