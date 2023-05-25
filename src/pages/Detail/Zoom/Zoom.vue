<template>
  <div class="spec-preview">
    <img :src="(skuImageList[currentIndex] || {}).imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big" >
      <img :src="(skuImageList[currentIndex] || {}).imgUrl" ref="big" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: ["skuImageList"],
  mounted() {
    //获取兄弟组件传来的index
    this.$bus.$on("getIndex", (index) => {
      this.currentIndex = index;
    });
  },
  methods: {
    handler(event) {
      let mask = this.$refs.mask;
      let big = this.$refs.big
      let zuo = event.offsetX - mask.offsetWidth / 2;
      let shang = event.offsetY - mask.offsetHeight / 2;
      //约束范围
      if (zuo <= 0) {
        zuo = 0;
      }
      if (zuo >= mask.offsetWidth) {
        zuo = mask.offsetWidth;
      }
      if(shang <= 0){
        shang = 0
      }
      if(shang >= mask.offsetHeight){
        shang = mask.offsetHeight
      }
      //修改元素的left、top值
      mask.style.left = zuo + "px";
      mask.style.top = shang + "px";
      big.style.left = -2 * zuo + 'px'
      big.style.top = -2 * shang + 'px'
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;
    

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>