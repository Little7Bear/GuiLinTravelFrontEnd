<template>
  <div class="like-count" @click="giveLike">
    <i :class="['iconfont',isLike?iconName[0]:iconName[1]]"></i>
    <span>{{likeCount}}</span>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0
    },
    iconName: {
      type: Array,
      required: true,
      default: () => {
        return ["icon-liked", "icon-like"];
      }
    }
  },

  created() {
    this.likeCount = this.count;
  },

  data() {
    return {
      isLike: false,
      likeCount: 0
    };
  },

  methods: {
    giveLike() {
      this.isLike = !this.isLike;
      if (this.isLike) {
        this.likeCount++;
      } else {
        this.likeCount--;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.like-count {
  display: inline-block;
}

.iconfont {
  font-size: 20px;
  margin-right: 5px;
  cursor: pointer;
}
</style>