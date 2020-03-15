<template>
  <div class="nav-floor">
    <!-- 左侧导航栏 -->
    <ol class="nav-side" ref="nav">
      <li class="nav-item" v-for="(item, index) in list.length" :key="index">
        <!-- 文字 -->
        <span class="nav-text" @click="choose(index)">第{{index+1}}天</span>
        <!-- 线条 -->
        <div class="item-tail"></div>
        <!-- 节点 -->
        <div :class="['item-node', {active:current===index}]" @click="choose(index)"></div>
      </li>
    </ol>

    <!-- 右侧内容 -->
    <ul class="floor-content" ref="content" id="d">
      <li v-for="(item, index) in list" :key="index" v-show="index===current" class="content-item">
        <!-- 天气 -->
        <div class="weather">
          <i class="iconfont icon-sunshine"></i>
          <span>{{item.date}}</span>
        </div>

        <!-- 卡片 -->
        <el-card v-for="(card, index) in item.cards" :key="index">
          <!-- 图片 -->
          <ImageCover :src="card.cardImage" class="image" />
          <div style="padding: 14px;">
            <!-- 文字 -->
            <p class="card-text">{{card.text}}</p>
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

  },

  data() {
    return {
      current: 0,
      scrollTop: 0,
      list: [
        {
          date: '2020-01-26',
          cards: [
            {
              time: '2020-03-15 15:03:42',
              text: '今天布达拉宫开放的网络直播云旅游，而我无意也选择了这样一个特殊的时间去拉萨，好几个月前就订好了机票，准备春节来拉萨过个暖冬，晒晒太阳。可所有的计划都因为一个吃蝙蝠的人打乱了，但一切的经历也变得极为特殊而难忘。',
              location: '阳朔西街',
              cardImage: 'http://photos.breadtrip.com/photo_2020_03_01_d2b2383b314a4e7c4f43671444f4daf4.jpg?imageView/2/w/960/q/85',
            }, {
              time: '2020-03-15 15:03:42',
              text: '下了飞机稍作休整，有轻微的高反但不严重，所以去八廓街转一圈，大昭寺下午来不及进去了。',
              location: '阳朔西街',
              cardImage: 'http://photos.breadtrip.com/photo_2020_02_29_d3664550280659fa978d16f4b70c077f.jpg?imageView/2/w/960/q/85',
            },
          ]
        },
        {
          date: '2020-01-27',
          cards: [
            {
              time: '2020-03-15 15:03:42',
              text: '原来计划初一晚上到青海，然后坐火车沿路慢慢欣赏着大好河山进藏，但后来看疫情一天天严重起来，担心火车路上太久，空间又封闭，还是退了火车票改从青海飞到拉萨。但拉萨那时候还没出现病例，下了飞机测了体温，正常也就放我们出来了。',
              location: '阳朔西街',
              cardImage: 'http://photos.breadtrip.com/photo_2020_03_01_3d748a3c7874087388a27e7ea05939b4.jpg?imageView/2/w/960/q/85',
            }, {
              time: '2020-03-15 15:03:42',
              text: '今天布达拉宫开放的网络直播云旅游，而我无意也选择了这样一个特殊的时间去拉萨，好几个月前就订好了机票，准备春节来拉萨过个暖冬，晒晒太阳。可所有的计划都因为一个吃蝙蝠的人打乱了，但一切的经历也变得极为特殊而难忘。',
              location: '阳朔西街',
              cardImage: 'http://photos.breadtrip.com/photo_2020_03_01_d2b2383b314a4e7c4f43671444f4daf4.jpg?imageView/2/w/960/q/85',
            },
          ]
        },
      ]
    }
  },

  mounted() {
    this.$nextTick(function () {
      // 滑动时显示点赞栏
      window.addEventListener(
        'scroll',
        this.fixed
      )
    })
  },

  methods: {
    choose(index) {
      this.current = index;
    },

    fixed() {
      this.scrollTop = document.documentElement.scrollTop
      if (this.scrollTop > 166) {
        this.$refs.nav.style.top = 0;
      } else {
        this.$refs.nav.style.top = 200 + 'px';
      }
    },
  },
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
  display: flex;
}

// 导航
.nav-side {
  display: inline-block;
  position: fixed;
  top: 200px;

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
  flex: auto;
  margin-left: 100px;

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