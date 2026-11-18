<template>
  <div class="home-page">
    <section class="hero-section">
      <div class="hero-inner">
        <div class="hero-copy">
          <p class="hero-kicker">
            <span class="lavender-sprig" aria-hidden="true">✦</span>
            {{ $t('writing_workshops') }} · {{ $t('shop') }}
          </p>
          <h1>Bonjour et bienvenue !</h1>
          <p class="hero-lead">
            {{ $t('welcome.line1') }} {{ $t('welcome.line2') }}
          </p>
          <div class="hero-actions">
            <v-btn class="hero-primary" size="large" @click="$router.push('/shop')">
              {{ $t('button.shop') }}
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
            <router-link class="hero-secondary" to="/workshop">
              {{ $t('writing_workshops') }}
            </router-link>
          </div>
          <div class="hero-signature">
            <span class="signature-rule"></span>
            <span>{{ $t('welcome.signature') }}</span>
          </div>
        </div>

        <div class="hero-portrait">
          <div class="portrait-frame">
            <img src="@/assets/img/Nicole.jpeg" alt="Nicole Nisol, autrice" />
          </div>
          <div class="portrait-caption">
            <span>Nicole Nisol</span>
            <small>{{ $t('welcome.signature') }}</small>
          </div>
          <span class="portrait-ornament" aria-hidden="true">✳</span>
        </div>
      </div>
      <span class="hero-note" aria-hidden="true">Au fil des mots</span>
    </section>

    <section class="welcome-section page-shell">
      <div class="welcome-heading">
        <p class="page-kicker">01 — {{ $t('news') }}</p>
        <h2 class="page-title">Un univers à découvrir</h2>
        <p class="page-intro">{{ $t('welcome.line3') }}</p>
      </div>

      <div class="welcome-guides">
        <article class="guide-card">
          <span class="guide-icon"><v-icon>mdi-feather</v-icon></span>
          <p>{{ $t('welcome.line4') }}</p>
        </article>
        <article class="guide-card">
          <span class="guide-icon"><v-icon>mdi-book-open-page-variant-outline</v-icon></span>
          <p>{{ $t('welcome.line5') }}</p>
        </article>
        <article class="guide-card">
          <span class="guide-icon"><v-icon>mdi-email-outline</v-icon></span>
          <p>{{ $t('welcome.line6') }}</p>
        </article>
      </div>

      <div class="welcome-closer">
        <p>{{ $t('welcome.line7') }} {{ $t('welcome.line8') }}</p>
        <p class="welcome-signoff">
          {{ $t('welcome.line9') }}
          <strong>{{ $t('welcome.signature') }}</strong>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AccueilPage'
};
</script>

<style scoped>
.hero-section {
  position: relative;
  display: grid;
  min-height: min(720px, calc(100vh - 82px));
  overflow: hidden;
  align-items: center;
  background:
    linear-gradient(90deg, rgba(250, 248, 243, 0.94) 0%, rgba(250, 248, 243, 0.83) 48%, rgba(250, 248, 243, 0.28) 100%),
    url('@/assets/img/backgroundLavande.jpeg') center 53% / cover;
}

.hero-inner {
  display: grid;
  width: min(1120px, calc(100% - 40px));
  margin: 0 auto;
  padding: clamp(3.5rem, 8vw, 7rem) 0;
  align-items: center;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.8fr);
  gap: clamp(2.5rem, 8vw, 7rem);
}

.hero-copy {
  max-width: 650px;
}

.hero-kicker {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin: 0 0 1.2rem;
  color: var(--color-plum);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.lavender-sprig {
  color: var(--color-sage);
  font-size: 1.35rem;
}

.hero-copy h1 {
  max-width: 650px;
  margin: 0;
  color: var(--color-plum-dark);
  font-family: var(--font-display);
  font-size: clamp(3.8rem, 8vw, 6.7rem);
  font-weight: 500;
  letter-spacing: -0.035em;
  line-height: 0.88;
}

.hero-lead {
  max-width: 550px;
  margin: 1.75rem 0 0;
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.4vw, 1.8rem);
  line-height: 1.3;
}

.hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.3rem;
  margin-top: 2rem;
}

.hero-primary {
  min-height: 52px;
  padding-inline: 1.3rem;
  border-radius: 999px;
  background: var(--color-plum-dark) !important;
  color: var(--color-surface) !important;
  font-weight: 600;
}

.hero-primary:hover {
  background: var(--color-plum) !important;
}

.hero-secondary {
  color: var(--color-plum-dark);
  font-size: 0.92rem;
  font-weight: 700;
  text-decoration-color: var(--color-lavender-deep);
  text-underline-offset: 5px;
}

.hero-signature {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 2.5rem;
  color: var(--color-muted);
  font-family: var(--font-signature);
  font-size: 1.45rem;
}

.signature-rule {
  width: 42px;
  height: 1px;
  background: var(--color-lavender-deep);
}

.hero-portrait {
  position: relative;
  justify-self: center;
  width: min(100%, 390px);
  padding: 1rem 1rem 3.5rem;
  border: 1px solid rgba(255, 254, 250, 0.8);
  background: rgba(255, 254, 250, 0.58);
  box-shadow: var(--shadow-soft);
  transform: rotate(2deg);
}

.portrait-frame {
  height: clamp(320px, 42vw, 490px);
  overflow: hidden;
  background: var(--color-lavender);
}

.portrait-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portrait-caption {
  position: absolute;
  right: 1rem;
  bottom: 0.75rem;
  left: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  color: var(--color-plum-dark);
  font-family: var(--font-display);
  font-size: 1.35rem;
}

.portrait-caption small {
  color: var(--color-muted);
  font-family: var(--font-body);
  font-size: 0.67rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.portrait-ornament {
  position: absolute;
  top: -1.6rem;
  right: -1.7rem;
  color: var(--color-plum);
  font-size: 3.5rem;
}

.hero-note {
  position: absolute;
  right: 1.6rem;
  bottom: 2rem;
  color: rgba(74, 57, 79, 0.62);
  font-family: var(--font-signature);
  font-size: 1.6rem;
  transform: rotate(-8deg);
}

.welcome-heading {
  max-width: 650px;
  margin: 0 auto 2.5rem;
  text-align: center;
}

.welcome-heading .page-title {
  font-size: clamp(2.8rem, 5vw, 4rem);
}

.welcome-guides {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.guide-card {
  min-height: 210px;
  padding: clamp(1.4rem, 3vw, 2rem);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: 0 8px 26px rgba(58, 42, 63, 0.04);
}

.guide-card p {
  margin: 1.1rem 0 0;
  color: var(--color-muted);
  line-height: 1.7;
}

.guide-icon {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border-radius: 50%;
  background: var(--color-lavender);
  color: var(--color-plum);
}

.welcome-closer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  margin-top: 2.5rem;
  color: var(--color-muted);
}

.welcome-closer p {
  margin: 0;
  line-height: 1.7;
}

.welcome-signoff {
  text-align: right;
}

.welcome-signoff strong {
  display: block;
  margin-top: 0.35rem;
  color: var(--color-plum);
  font-family: var(--font-signature);
  font-size: 1.7rem;
  font-weight: 600;
}

@media (max-width: 760px) {
  .hero-section {
    min-height: auto;
    background:
      linear-gradient(180deg, rgba(250, 248, 243, 0.9), rgba(250, 248, 243, 0.7)),
      url('@/assets/img/backgroundLavande.jpeg') center / cover;
  }

  .hero-inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .hero-copy {
    text-align: center;
  }

  .hero-kicker,
  .hero-actions,
  .hero-signature {
    justify-content: center;
  }

  .hero-portrait {
    width: min(78%, 340px);
  }

  .welcome-guides {
    grid-template-columns: 1fr;
  }

  .guide-card {
    min-height: auto;
  }

  .welcome-closer {
    align-items: flex-start;
    flex-direction: column;
  }

  .welcome-signoff {
    text-align: left;
  }
}
</style>
