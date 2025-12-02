<template>
  <v-container class="py-10">
    <v-card class="pa-6" elevation="3">
      <v-card-title class="text-h5 font-weight-bold">
        {{ $t('cgu.page_title') }}
      </v-card-title>

      <v-divider class="my-4" />

      <v-card-text>
        <p class="text-body-1 font-italic mb-6">
          {{ $t('cgu.last_update') }} <br />
          {{ $t('cgu.intro_message') }}
        </p>

        <v-expansion-panels multiple>
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
</style>
