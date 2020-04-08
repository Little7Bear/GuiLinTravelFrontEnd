<template>
  <div class="nav-floor">
    <!-- 左侧导航栏 -->
    <ol class="nav-side" ref="nav">
      <li class="nav-item" v-for="(item, index) in dayTotal" :key="index">
        <!-- 文字 -->
        <span class="nav-text" @click="choose(index)">第{{ index + 1 }}天</span>
        <!-- 线条 -->
        <div class="item-tail"></div>
        <!-- 节点 -->
        <div :class="['item-node', { active: current === index }]" @click="choose(index)"></div>
      </li>
    </ol>

    <!-- 右侧内容 -->
    <ul class="floor-content" ref="content">
      <li
        v-for="(item, index) in days"
        :key="index"
        v-show="index === current"
        class="content-item"
      >
        <!-- 天气 -->
        <div class="weather">
          <i class="iconfont icon-sunshine"></i>
          <span>{{ item.date }}</span>
        </div>

        <!-- 卡片 -->
        <el-card v-for="(card, index) in item.sections" :key="index">
          <!-- 图片 -->
          <ImageCover :src="card.image" class="image" />
          <div style="padding: 14px;">
            <!-- 文字 -->
            <p class="card-text">{{ card.text }}</p>
            <!-- 时间等 -->
            <div class="bottom">
              <i class="iconfont icon-time"></i>
              <time class="time">{{ card.time }}</time>

              <i class="iconfont icon-location"></i>
              <time class="time">{{ card.location }}</time>
            </div>
          </div>
        </el-card>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    lists: Array
  },

  data() {
    return {
      current: 0,
      scrollTop: 0,
      dayTotal: 0,
      days: []
    }
  },

  mounted() {
    this.$nextTick(function () {
      // 滚动固定
      window.addEventListener(
        'scroll',
        this.handleScroll
      )
    })
  },

  watch: {
    lists(newVal) {
      let days = []
      newVal.forEach(item => {
        let day = {
          date: item.date,
          sections: []
        }

        item.sections.forEach(sec => {
          let section = {
            time: sec.time,
            text: sec.describe,
            location: sec.address,
            image: sec.url,
          }
          day.sections.push(section)
        })

        days.push(day)
      })
      this.days = days
      this.dayTotal = days.length
    },
  },

  methods: {
    choose(index) {
      this.current = index
    },

    handleScroll() {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (this.scrollTop > 186) {
        this.$refs.nav.style.position = 'fixed'
        this.$refs.nav.style.top = '60px'
        this.$refs.nav.style.left = 'auto'
      } else {
        this.$refs.nav.style.position = 'absolute'
        this.$refs.nav.style.top = 0
      }
    }
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang='scss' scoped>
/deep/ .el-card {
  width: 570px;
  margin-bottom: 20px;

  .el-card__body {
    padding: 0;
  }

  .image {
    width: 100%;
    height: 380px;
  }

  .card-text {
    text-align: justify;
    line-height: 20px;
  }

  .bottom {
    font-size: 13px;
    margin-top: 6px;
    color: $color-text-secondary;
    display: flex;
    align-items: center;
  }

  .icon-time {
    margin-right: 10px;
    font-size: 15px;
  }

  .icon-location {
    font-size: 18px;
    margin-left: auto;
  }
}

.nav-floor {
  position: relative;
}

// 导航
.nav-side {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;

  .nav-item {
    position: relative;
    text-align: right;
    padding-right: 25px;
    padding-bottom: 40px;

    &:last-of-type {
      padding-bottom: 0;
    }
  }

  .nav-text {
    &:hover {
      color: $color-primary;
      cursor: pointer;
    }
  }

  .item-tail {
    position: absolute;
    right: 7px;
    top: 0;
    height: 100%;
    border-left: 3px solid #e4e7ed;
  }

  .item-node {
    position: absolute;
    margin-left: 10px;
    right: 0;
    top: 0;
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: #e4e7ed;
    border-radius: 50%;
    cursor: pointer;
  }

  .active {
    background: $color-primary;
  }
}

// 内容
.floor-content {
  margin-left: 90px;

  // 天气
  .weather {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .icon-sunshine {
    margin-right: 15px;
  }
}
</style>
