<template>
  <transition name="el-fade-in">
    <div class="page-up" @click="scrollToTop" v-show="toTopShow">
      <i class="el-icon-caret-top"></i>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      toTopShow: false,
      scrollTop: 0
    }
  },

  mounted() {
    this.$nextTick(function () {
      window.addEventListener(
        'scroll',
        this.$_.debounce(this.handleScroll, 500)
      )
    })
  },

  methods: {
    handleScroll() {
      this.scrollTop = document.documentElement.scrollTop
      if (this.scrollTop > 300) {
        this.toTopShow = true
      } else {
        this.toTopShow = false
      }
    },

    scrollToTop() {
      let timer = null
      const _this = this
      cancelAnimationFrame(timer)

      timer = requestAnimationFrame(function fn() {
        if (_this.scrollTop > 5000) {
          _this.scrollTop -= 1000

          document.documentElement.scrollTop = _this.scrollTop
          timer = requestAnimationFrame(fn)
        } else if (_this.scrollTop > 1000 && _this.scrollTop <= 5000) {
          _this.scrollTop -= 500
          document.documentElement.scrollTop = _this.scrollTop
          timer = requestAnimationFrame(fn)
        } else if (_this.scrollTop > 200 && _this.scrollTop <= 1000) {
          _this.scrollTop -= 100
          document.documentElement.scrollTop = _this.scrollTop
          timer = requestAnimationFrame(fn)
        } else if (_this.scrollTop > 50 && _this.scrollTop <= 200) {
          _this.scrollTop -= 10
          document.documentElement.scrollTop = _this.scrollTop
          timer = requestAnimationFrame(fn)
        } else if (_this.scrollTop > 0 && _this.scrollTop <= 50) {
          _this.scrollTop -= 5
          document.documentElement.scrollTop = _this.scrollTop
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer)
          _this.toTopShow = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped >
.page-up {
  background-color: $color-primary;
  position: fixed;
  right: calc((100% - 930px) / 2 - 60px);
  bottom: 30px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  opacity: 0.5;
  z-index: 100;

  @media screen and (max-width: 1100px) {
    right: calc((100% - 900px) / 2);
  }

  .el-icon-caret-top {
    color: #fff;
    display: block;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
  }
  p {
    display: none;
    text-align: center;
    color: #fff;
  }
  &:hover {
    opacity: 1;
  }
}
</style>
