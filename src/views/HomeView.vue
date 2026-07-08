<template>
  <div class="page-root">
    <!-- Ambient background effects -->
    <div class="bg-mesh"></div>
    <div class="bg-grain"></div>

    <!-- ─── Nav ─── -->
    <header class="site-nav">
      <img src="../assets/wealthoceans-removebg-preview.png" alt="Wealth Oceans" class="nav-logo" />
      <div class="nav-badge">
        <span class="nav-badge-dot"></span>
        <span>Waitlist Open</span>
      </div>
    </header>

    <!-- ─── Main Grid ─── -->
    <main class="page-grid">
      <!-- LEFT COLUMN -->
      <section class="left-col">
        <!-- Eyebrow -->
        <div class="eyebrow-tag">
          <span class="eyebrow-icon">⬡</span>
          AI-Powered Lead Conversion Infrastructure
        </div>

        <!-- Headline -->
        <h1 class="headline">
          Stop Losing Leads<br />
          <span class="headline-accent">the Moment They<br />Show Interest.</span>
        </h1>

        <!-- Mobile card -->
        <div class="mobile-card-slot">
          <WaitlistCard />
        </div>

        <!-- Body copy -->
        <p class="body-lead">
          Most businesses don't lose sales because of bad offers. They lose them because
          <em>nothing happens when interest is highest.</em>
        </p>

        <!-- Feature box -->
        <div class="feature-box">
          <div class="feature-box-inner">
            <p class="feature-intro">
              Wealth Oceans Technologies is launching an
              <span class="gold-text">AI-powered conversion system</span>
              that captures leads, responds instantly, asks the right questions, and follows up
              across your website, ads, and social DMs — even when your team is offline.
            </p>

            <p class="feature-label">The Intelligent Conversion Infrastructure</p>

            <ul class="feature-list">
              <li>
                <span class="check-mark">✦</span>
                <span>No missed follow-ups</span>
              </li>
              <li>
                <span class="check-mark">✦</span>
                <span>No poor conversions</span>
              </li>
              <li>
                <span class="check-mark">✦</span>
                <span>No wasted ad spend</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Stats bar -->
        <div class="stats-bar">
          <div class="stat-item">
            <span class="stat-num">3×</span>
            <span class="stat-label">Higher response rate</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">24/7</span>
            <span class="stat-label">Automated follow-up</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">37%</span>
            <span class="stat-label">Early-access discount</span>
          </div>
        </div>

        <!-- Brand footer -->
        <div class="brand-footer">
          <div class="brand-divider"></div>
          <div class="brand-info">
            <p class="brand-name">Wealth Oceans Technologies Ltd</p>
            <p class="brand-tagline">Lead. Nurture. Convert. With AI.</p>
          </div>
        </div>
      </section>

      <!-- RIGHT COLUMN (desktop) -->
      <aside class="right-col">
        <WaitlistCard />
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import WaitlistCard from '@/components/WaitlistCard.vue'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

/* ─── Variables ─── */
:root {
  --gold: #c9a96e;
  --gold-light: #e0c898;
  --gold-dim: rgba(201, 169, 110, 0.18);
  --ink: #0b0918;
  --surface: #120f1e;
  --surface-2: #1a1728;
  --text-primary: #f0ece0;
  --text-secondary: rgba(240, 236, 224, 0.55);
  --text-muted: rgba(240, 236, 224, 0.3);
}

/* ─── Root ─── */
.page-root {
  position: relative;
  min-height: 100vh;
  background-color: #0b0918;
  font-family: 'DM Sans', sans-serif;
  overflow: hidden;
}

/* ─── Background ─── */
.bg-mesh {
  position: fixed;
  inset: 0;
  background: radial-gradient(
      ellipse 80% 60% at 70% 10%,
      rgba(201, 169, 110, 0.08) 0%,
      transparent 60%
    ),
    radial-gradient(ellipse 60% 80% at 10% 90%, rgba(100, 80, 180, 0.07) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 90% 80%, rgba(60, 40, 120, 0.06) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

.bg-grain {
  position: fixed;
  inset: 0;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}

/* ─── Nav ─── */
.site-nav {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 48px;
  border-bottom: 1px solid rgba(201, 169, 110, 0.08);
}

.nav-logo {
  height: 52px;
  width: auto;
  filter: brightness(1.1);
}

.nav-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(201, 169, 110, 0.08);
  border: 1px solid rgba(201, 169, 110, 0.2);
  border-radius: 100px;
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(201, 169, 110, 0.9);
  letter-spacing: 0.04em;
}

.nav-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #c9a96e;
  box-shadow: 0 0 8px #c9a96e;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

/* ─── Page Grid ─── */
.page-grid {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 64px 48px 80px;
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 80px;
  align-items: center;
}

/* ─── Left Col ─── */
.left-col {
  display: flex;
  flex-direction: column;
}

/* Eyebrow */
.eyebrow-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(201, 169, 110, 0.85);
  border: 1px solid rgba(201, 169, 110, 0.2);
  border-radius: 100px;
  padding: 6px 16px;
  width: fit-content;
  margin-bottom: 28px;
  background: rgba(201, 169, 110, 0.06);
}
.eyebrow-icon {
  font-size: 14px;
  color: #c9a96e;
}

/* Headline */
.headline {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(42px, 5.5vw, 68px);
  font-weight: 700;
  line-height: 1.05;
  color: #f0ece0;
  letter-spacing: -0.03em;
  margin: 0 0 28px;
}

.headline-accent {
  background: linear-gradient(120deg, #c9a96e 0%, #e0c898 50%, #c9a96e 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-style: italic;
}

/* Mobile card slot */
.mobile-card-slot {
  display: none;
  margin-bottom: 32px;
}

/* Body copy */
.body-lead {
  font-size: 17px;
  line-height: 1.7;
  color: rgba(240, 236, 224, 0.6);
  margin: 0 0 36px;
  max-width: 520px;
}
.body-lead em {
  font-style: normal;
  color: #f0ece0;
  font-weight: 500;
}

/* Feature box */
.feature-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(201, 169, 110, 0.12);
  border-radius: 20px;
  padding: 2px;
  margin-bottom: 36px;
}
.feature-box-inner {
  background: linear-gradient(145deg, rgba(26, 23, 40, 0.8) 0%, rgba(18, 15, 30, 0.9) 100%);
  border-radius: 18px;
  padding: 28px 32px;
}

.feature-intro {
  font-size: 15px;
  line-height: 1.7;
  color: rgba(240, 236, 224, 0.65);
  margin: 0 0 20px;
}
.gold-text {
  color: #c9a96e;
  font-weight: 500;
}

.feature-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(201, 169, 110, 0.6);
  margin: 0 0 16px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.feature-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: rgba(240, 236, 224, 0.8);
  font-weight: 500;
}
.check-mark {
  color: #c9a96e;
  font-size: 12px;
  flex-shrink: 0;
}

/* Stats bar */
.stats-bar {
  display: flex;
  align-items: center;
  gap: 0;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(201, 169, 110, 0.1);
  border-radius: 16px;
  padding: 20px 28px;
  margin-bottom: 40px;
}
.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.stat-num {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 28px;
  font-weight: 700;
  color: #c9a96e;
  letter-spacing: -0.02em;
  line-height: 1;
}
.stat-label {
  font-size: 11px;
  font-weight: 500;
  color: rgba(240, 236, 224, 0.4);
  text-align: center;
  letter-spacing: 0.03em;
}
.stat-divider {
  width: 1px;
  height: 36px;
  background: rgba(201, 169, 110, 0.15);
}

/* Brand footer */
.brand-footer {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.brand-divider {
  height: 1px;
  background: linear-gradient(90deg, rgba(201, 169, 110, 0.2) 0%, transparent 100%);
}
.brand-name {
  font-size: 14px;
  font-weight: 600;
  color: rgba(240, 236, 224, 0.7);
  margin: 0;
}
.brand-tagline {
  font-size: 12px;
  color: rgba(240, 236, 224, 0.35);
  margin: 0;
  font-style: italic;
  letter-spacing: 0.04em;
}

/* ─── Right Col ─── */
.right-col {
  position: sticky;
  top: 40px;
}

/* ─── Responsive ─── */
@media (max-width: 1024px) {
  .site-nav {
    padding: 20px 28px;
  }
  .page-grid {
    grid-template-columns: 1fr;
    padding: 40px 28px 60px;
    gap: 0;
  }
  .right-col {
    display: none;
  }
  .mobile-card-slot {
    display: block;
  }
  .headline {
    font-size: clamp(36px, 8vw, 52px);
  }
  .stats-bar {
    gap: 0;
    padding: 16px 20px;
  }
  .stat-num {
    font-size: 22px;
  }
}

@media (max-width: 480px) {
  .site-nav {
    padding: 16px 20px;
  }
  .page-grid {
    padding: 28px 20px 48px;
  }
  .stats-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .stat-divider {
    width: 40px;
    height: 1px;
  }
  .stat-item {
    align-items: flex-start;
  }
}
</style>
