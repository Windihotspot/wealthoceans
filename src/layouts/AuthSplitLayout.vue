<template>
   
  <div class="split-page">
     
    <!-- soft decorative shapes on the lavender background, purely cosmetic -->
    <span class="deco deco--sq deco--tl" />
    <span class="deco deco--sq deco--br" />
    <span class="deco deco--dot deco--mid" />
    

        
    <div class="split-card max-w-5xl">
      <!-- LEFT: dark brand panel -->
      <div class="split-left">
        <!-- <img :src="logoSrc" alt="Logo" class="split-logo" /> -->

        <div class="split-illustration">
          <img :src="illustrationSrc" alt="" />
        </div>

        <h2 class="split-headline">{{ headline }}</h2>
        <p class="split-subtext">{{ subtext }}</p>

        <div v-if="steps" class="split-dots">
          <span
            v-for="n in steps"
            :key="n"
            class="dot"
            :class="{ active: n - 1 === activeStep }"
          />
        </div>
      </div>

      <!-- RIGHT: white form panel -->
      <div class="split-right">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    logoSrc: string
    illustrationSrc: string
    headline: string
    subtext: string
    /** total number of step dots to render on the left panel. omit to hide. */
    steps?: number
    /** zero-based index of the active step dot */
    activeStep?: number
  }>(),
  {
    steps: 0,
    activeStep: 0
  }
)
</script>

<style scoped>
.split-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at 15% 15%, #e7e9fb 0%, #dcdff6 45%, #d2d6f0 100%);
}

.deco {
  position: absolute;
  opacity: 0.7;
}
.deco--sq {
  width: 16px;
  height: 16px;
  background: #ffffff;
  transform: rotate(45deg);
  box-shadow: 0 4px 10px rgba(76, 59, 158, 0.15);
}
.deco--tl {
  top: 8%;
  left: 10%;
}
.deco--br {
  bottom: 10%;
  right: 12%;
}
.deco--dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #7c2fe0;
}
.deco--mid {
  top: 55%;
  right: 6%;
}

.split-card {
  display: flex;
  width: 100%;
  min-height: 640px;
  border-radius: 28px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 30px 80px rgba(64, 39, 148, 0.25);
  position: relative;
  z-index: 1;
}

.split-left {
  flex: 1 1 46%;
  padding: 44px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #ffffff;
  background: radial-gradient(circle at 20% 0%, #2b1157 0%, #180b38 55%, #120830 100%);
  position: relative;
}

.split-logo {
  align-self: flex-start;
  height: 26px;
  margin-bottom: 36px;
}

.split-illustration {
  width: 100%;
  max-width: 280px;
  margin-bottom: 28px;
}
.split-illustration img {
  width: 100%;
  display: block;
}

.split-headline {
  font-size: 21px;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.3;
}
.split-subtext {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  max-width: 260px;
  margin-bottom: 26px;
  line-height: 1.5;
}

.split-dots {
  display: flex;
  gap: 6px;
  margin-top: auto;
}
.dot {
  width: 26px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.25);
  transition: all 0.2s ease;
}
.dot.active {
  background: #a855f7;
  width: 34px;
}

.split-right {
  flex: 1 1 54%;
  padding: 56px 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ffffff;
}

@media (max-width: 900px) {
  .split-left {
    display: none;
  }
  .split-right {
    padding: 40px 24px;
  }
}
</style>
