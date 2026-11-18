<template>
  <v-container class="terms-page page-shell">
    <v-card class="terms-card pa-6" elevation="0">
      <v-card-title class="terms-title">
        {{ $t('cgu.page_title') }}
      </v-card-title>

      <v-divider class="my-4" />

      <v-card-text>
        <p class="text-body-1 font-italic mb-6">
          {{ $t('cgu.last_update') }} <br />
          {{ $t('cgu.intro_message') }}
        </p>

        <v-expansion-panels class="terms-panels" multiple>
          <v-expansion-panel
            v-for="(article, index) in articles"
            :key="index"
          >
            <v-expansion-panel-title class="font-weight-medium">
              {{ article.title }}
            </v-expansion-panel-title>

            <v-expansion-panel-text>
              <div v-html="article.content"></div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "CGU",
  computed: {
    articles() {
      return [
        {
          title: this.$t("cgu.article_1_title"),
          content: `<p>${this.$t("cgu.article_1_text")}</p>`,
        },
        {
          title: this.$t("cgu.article_2_title"),
          content: `
            <p>${this.$t("cgu.article_2_text_1")}</p>
            <p>${this.$t("cgu.article_2_text_2")}</p>
          `,
        },
        {
          title: this.$t("cgu.article_3_title"),
          content: `
            <p>${this.$t("cgu.article_3_text_1")}</p>
            <p>${this.$t("cgu.article_3_text_2")}</p>
          `,
        },
        {
          title: this.$t("cgu.article_4_title"),
          content: `
            <p>${this.$t("cgu.article_4_text_1")}</p>
            <p>${this.$t("cgu.article_4_text_2")}</p>
          `,
        },
        {
          title: this.$t("cgu.article_5_title"),
          content: `<p>${this.$t("cgu.article_5_text")}</p>`,
        },
        {
          title: this.$t("cgu.article_6_title"),
          content: `<p>${this.$t("cgu.article_6_text")}</p>`,
        },
        {
          title: this.$t("cgu.article_7_title"),
          content: `<p>${this.$t("cgu.article_7_text")}</p>`,
        },
        {
          title: this.$t("cgu.article_8_title"),
          content: `<p>${this.$t("cgu.article_8_text")}</p>`,
        },
      ];
    },
  },
};
</script>

<style scoped>
p {
  margin-bottom: 1em;
}

.terms-page {
  max-width: 1040px;
}

.terms-card {
  padding: clamp(1.25rem, 4vw, 3rem) !important;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: var(--shadow-soft);
}

.terms-title {
  color: var(--color-plum-dark);
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 600;
  white-space: normal;
}

.terms-panels {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 16px;
}
</style>
