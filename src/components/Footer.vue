<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <router-link to="/" class="footer-wordmark">Nicole Nisol</router-link>
        <p>{{ $t('welcome.line8') }}</p>
      </div>

      <nav class="footer-links" aria-label="Navigation de pied de page">
        <router-link to="/about">{{ $t('news') }}</router-link>
        <router-link to="/shop">{{ $t('shop') }}</router-link>
        <router-link to="/workshop">{{ $t('writing_workshops') }}</router-link>
        <router-link to="/contact">{{ $t('contact') }}</router-link>
      </nav>

      <div class="footer-social">
        <span>{{ $t('join_me_on_social_media') }}</span>
        <div class="social-links">
          <a
            href="https://www.instagram.com/nicole_4202/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <v-icon>mdi-instagram</v-icon>
          </a>
          <a
            href="https://www.facebook.com/nisol1402/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <v-icon>mdi-facebook</v-icon>
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© {{ new Date().getFullYear() }} Nicole Nisol</span>
      <router-link to="/cgu">{{ $t('button_user_conditions') }}</router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterApp'
};
</script>

<style scoped>
.site-footer {
  padding: 3.5rem max(20px, calc((100% - 1120px) / 2)) 1.2rem;
  background:
    radial-gradient(ellipse at 12% 0%, rgba(216, 203, 220, 0.18), transparent 38%),
    var(--color-plum-dark);
  color: rgba(255, 254, 250, 0.82);
}

.footer-inner {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  align-items: start;
  gap: 2rem;
  padding-bottom: 2.5rem;
}

.footer-wordmark {
  color: var(--color-surface);
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 600;
  text-decoration: none;
}

.footer-brand p {
  max-width: 260px;
  margin: 0.55rem 0 0;
  color: rgba(255, 254, 250, 0.65);
  font-size: 0.86rem;
  line-height: 1.6;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem 1.5rem;
}

.footer-links a,
.footer-bottom a {
  color: rgba(255, 254, 250, 0.82);
  font-size: 0.85rem;
  text-decoration: none;
  transition: color 160ms ease;
}

.footer-links a:hover,
.footer-bottom a:hover {
  color: #fff;
}

.footer-social > span {
  display: block;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
}

.social-links {
  display: flex;
  gap: 0.65rem;
}

.social-links a {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 1px solid rgba(255, 254, 250, 0.24);
  border-radius: 50%;
  color: var(--color-surface);
  transition: background 160ms ease, transform 160ms ease;
}

.social-links a:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 254, 250, 0.16);
  color: rgba(255, 254, 250, 0.55);
  font-size: 0.75rem;
}

.footer-bottom a {
  font-size: inherit;
}

@media (max-width: 700px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
    gap: 2rem 1rem;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 440px) {
  .footer-inner {
    grid-template-columns: 1fr;
  }

  .footer-brand {
    grid-column: auto;
  }

  .footer-bottom {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
