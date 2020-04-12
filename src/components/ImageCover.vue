<template>
  <div class="img-cover">
    <el-image :src="src" fit="cover">
      <div slot="placeholder" class="image-slot">
        加载中
        <span class="dot">...</span>
      </div>
    </el-image>
    <div class="cover"></div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
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
  // cursor: pointer;

  .cover {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000, $alpha: 0);
  }

  &:hover {
    .cover {
      display: block;
    }
  }
}
</style>