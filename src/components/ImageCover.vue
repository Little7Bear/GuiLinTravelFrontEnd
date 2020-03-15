<template>
  <div class="img-cover">
    <el-image :src="src"></el-image>
    <div class="cover"></div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: 'http://photos.breadtrip.com/photo_2020_02_01_27aabfecb6aa5c2bb0781d5f144b288c.jpg?imageView/2/w/960/q/85'
    }
  }
}
</script>

<style lang='scss' scoped>
/deep/ .el-image {
  width: 100%;
  height: 100%;
}

.img-cover {
  position: relative;
  cursor: pointer;

  .cover {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000, $alpha: 0.3);
  }

  &:hover {
    .cover {
      display: block;
    }
  }
}
</style>