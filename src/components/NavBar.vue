<template>
  <header class="site-header">
    <nav class="site-nav" aria-label="Navigation principale">
      <router-link class="brand-mark" to="/" aria-label="Nicole Nisol, accueil" @click="closeMenu">
        <span class="brand-monogram">N</span>
        <span class="brand-name">Nicole Nisol<small>Autrice</small></span>
      </router-link>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-label="Ouvrir ou fermer le menu"
        @click="menuOpen = !menuOpen"
      >
        <v-icon>{{ menuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
      </button>

      <div class="site-nav__links" :class="{ 'is-open': menuOpen }">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          class="site-nav__link"
          :to="link.to"
          exact-active-class="is-active"
          @click="closeMenu"
        >
          {{ link.label }}
        </router-link>

        <label class="language-control">
          <span class="visually-hidden">Langue</span>
          <select :value="currentLocale" aria-label="Langue" @change="setLanguage($event.target.value)">
            <option v-for="language in languages" :key="language.value" :value="language.value">
              {{ language.value.toUpperCase() }}
            </option>
          </select>
        </label>

        <router-link class="basket-link" to="/checkout" :aria-label="`${$t('basket')} (${basketItemCount})`" @click="closeMenu">
          <v-icon>mdi-basket-outline</v-icon>
          <span>{{ $t('basket') }}</span>
          <span class="basket-count">{{ basketItemCount }}</span>
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import authService from '@/services/authService';
import { mapState } from 'vuex';

export default {
  name: 'NavigationBar',
  data() {
    return {
      isLoggedIn: false,
      username: '',
      menuOpen: false,
      unsubscribeAuth: null,
      currentLocale: this.$i18n.locale,
      languages: [
        { value: 'fr', text: 'Français' },
        { value: 'en', text: 'English' },
        { value: 'nl', text: 'Nederlands' },
        { value: 'es', text: 'Español' },
        { value: 'de', text: 'Deutsch' }
      ]
    };
  },
  computed: {
    ...mapState({
      basketItems: state => state.basket.items,
    }),
    basketItemCount() {
      return this.basketItems.length;
    },
    navLinks() {
      return [
        { label: this.$t('home'), to: '/' },
        { label: this.$t('news'), to: '/about' },
        { label: this.$t('shop'), to: '/shop' },
        { label: this.$t('writing_workshops'), to: '/workshop' },
        { label: this.$t('contact'), to: '/contact' }
      ];
    }
  },
  methods: {
    closeMenu() {
      this.menuOpen = false;
    },
    setLanguage(lang) {
      this.currentLocale = lang;
      this.$i18n.locale = lang;
      localStorage.setItem('lang', lang);
    },
    async logout() {
      try {
        await authService.logout();
      } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
      }
    },
    updateAuthenticationStatus(user) {
      this.isLoggedIn = Boolean(user);
      this.username = user ? (user.displayName || user.email || '') : '';
    }
  },
  mounted() {
    const saved = localStorage.getItem('lang');
    if (saved) {
      this.currentLocale = saved;
      this.$i18n.locale = saved;
    }
  },
  created() {
    this.unsubscribeAuth = authService.subscribe(
      (user) => this.updateAuthenticationStatus(user),
      (error) => console.error('Erreur de suivi de session Firebase :', error)
    );
  },
  beforeUnmount() {
    if (this.unsubscribeAuth) this.unsubscribeAuth();
  }
};
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid rgba(104, 79, 112, 0.1);
  background: rgba(255, 254, 250, 0.94);
  backdrop-filter: blur(16px);
}

.site-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(1240px, calc(100% - 40px));
  min-height: 82px;
  margin: 0 auto;
  gap: 2rem;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-plum-dark);
  text-decoration: none;
}

.brand-monogram {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 1px solid var(--color-lavender-deep);
  border-radius: 50%;
  color: var(--color-plum);
  font-family: var(--font-display);
  font-size: 1.8rem;
  line-height: 1;
}

.brand-name {
  display: grid;
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 600;
  line-height: 0.9;
}

.brand-name small {
  margin-top: 0.35rem;
  color: var(--color-muted);
  font-family: var(--font-body);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.site-nav__links {
  display: flex;
  align-items: center;
  gap: clamp(0.7rem, 2vw, 1.7rem);
}

.site-nav__link {
  position: relative;
  padding: 0.55rem 0;
  color: var(--color-muted);
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 180ms ease;
}

.site-nav__link::after {
  position: absolute;
  right: 0;
  bottom: 0.2rem;
  left: 0;
  height: 1px;
  background: var(--color-plum);
  content: "";
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 180ms ease;
}

.site-nav__link:hover,
.site-nav__link.is-active {
  color: var(--color-plum-dark);
}

.site-nav__link:hover::after,
.site-nav__link.is-active::after {
  transform: scaleX(1);
}

.language-control select {
  min-height: 38px;
  padding: 0 1.8rem 0 0.7rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-surface);
  color: var(--color-plum-dark);
  font-size: 0.74rem;
  font-weight: 700;
}

.basket-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.65rem 0.9rem;
  border-radius: 999px;
  background: var(--color-plum-dark);
  color: #fffefa;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 180ms ease, transform 180ms ease;
}

.basket-link:hover {
  background: var(--color-plum);
  color: #fffefa;
  transform: translateY(-1px);
}

.basket-count {
  display: grid;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  place-items: center;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  font-size: 0.72rem;
}

.menu-toggle {
  display: none;
  width: 42px;
  height: 42px;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  background: var(--color-surface);
  color: var(--color-plum);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
}

@media (max-width: 900px) {
  .site-nav {
    min-height: 72px;
  }

  .menu-toggle {
    display: grid;
    place-items: center;
    margin-left: auto;
  }

  .site-nav__links {
    position: absolute;
    top: calc(100% + 1px);
    right: 0;
    left: 0;
    display: none;
    align-items: stretch;
    padding: 1rem 20px 1.4rem;
    border-bottom: 1px solid var(--color-border);
    background: var(--color-surface);
    box-shadow: var(--shadow-soft);
  }

  .site-nav__links.is-open {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  .site-nav__link {
    padding: 0.65rem 0.2rem;
  }

  .site-nav__link::after {
    display: none;
  }

  .language-control select,
  .basket-link {
    align-self: flex-start;
  }
}

@media (max-width: 420px) {
  .site-nav {
    width: calc(100% - 28px);
  }
}
</style>
