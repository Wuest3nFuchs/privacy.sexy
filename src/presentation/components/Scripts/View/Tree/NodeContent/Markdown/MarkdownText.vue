<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    class="markdown-text"
    v-html="htmlOutput"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { CompositeMarkdownRenderer } from './CompositeMarkdownRenderer';

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const htmlOutput = computed<string>(() => convertMarkdownToHtml(props.text));

    return {
      htmlOutput,
    };
  },
});

function convertMarkdownToHtml(markdownText: string): string {
  const renderer = new CompositeMarkdownRenderer();
  return renderer.render(markdownText);
}
</script>

<style lang="scss"> /* Not scoped due to element styling such as "a". */
@use "@/presentation/assets/styles/main" as *;
@import './markdown-styles.scss';

$text-color: $color-on-primary;

.markdown-text {
  color: $text-color;
  font-size: $font-size-absolute-normal;
  font-family: $font-main;
  @include markdown-text-styles;
}
</style>
