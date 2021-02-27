<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  width: 100%;
  min-width: 1200px;
  height: 100%;
  margin: 0;
  position: relative;
  font-size: 15px;
  // font-family: tahoma, arial, 'Hiragino Sans GB', '\5b8b\4f53', sans-serif;
    h3, p{
      margin: 0;
    }
}
#app {
  width: 100%;
  height: 100%;
  position: relative;
}
// amcharts 左下角logo类名
.amcharts-AmChartsLogo-group {
    display: none !important;
}
@keyframes on_translateYS {
  from {
    opacity: 0;
    transform: translateY(-0.106667rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes show_opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes show_opacity_white {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.15;
  }
}

@keyframes on_translateX {
  from {
    opacity: 0;
    transform: translateX(0.8rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes on_translateX1 {
  from {
    opacity: 0;
    transform: translateX(-0.8rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes on_translateXx {
  from {
    opacity: 0;
    transform: translateX(0.266667rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes on_translateXx1 {
  from {
    opacity: 0;
    transform: translateX(-0.266667rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes on_translateXB {
  from {
    opacity: 0;
    transform: translateX(4rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes on_translateXB1 {
  from {
    opacity: 0;
    transform: translateX(-4rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes on_translateY {
  from {
    opacity: 0;
    transform: translateY(-0.8rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes on_translateYs {
  from {
    opacity: 0;
    transform: translateY(-0.2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes on_translateYsf {
  from {
    opacity: 0;
    transform: translateY(0.2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes on_translateYf {
  from {
    opacity: 0;
    transform: translateY(0.8rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes on_translateY_white {
  from {
    opacity: 0;
    transform: translateY(-0.8rem) translateX(-50%);
  }
  to {
    opacity: 0.15;
    transform: translateY(0) translateX(-50%);
  }
}

@keyframes on_scaleY {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
}

@keyframes on_scaleX {
  from {
    opacity: 0;
    transform: scaleX(0.8);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

@keyframes on_scale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
