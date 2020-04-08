<template>
  <div class="line-schedule">
    <div class="header">
      <h3 class="h3">旅途统计</h3>
      <!-- <span>({{dayTotal}}天)</span> -->
      <!-- <el-link class="span" :underline="false" type="primary" @click="viewAll">{{ textAll }}</el-link> -->
    </div>

    <div class="body">
      <h4 class="num">
        <p class="p">统计</p>
      </h4>

      <div v-show="!showAll">
        <ul class="summary">
          <li class="item" title="景点">
            <div class="box">
              <i class="iconfont icon-scenic-spot"></i>
            </div>
            <span>{{scenicCount}}</span>
          </li>
          <li class="item" title="餐厅">
            <div class="box">
              <i class="iconfont icon-dining-room"></i>
            </div>
            <span>{{diningCount}}</span>
          </li>
          <li class="item" title="住宿">
            <div class="box">
              <i class="iconfont icon-hotel"></i>
            </div>
            <span>{{hotelCount}}</span>
          </li>
          <li class="item" title="购物">
            <div class="box">
              <i class="iconfont icon-shopping"></i>
            </div>
            <span>{{shoppingCount}}</span>
          </li>
        </ul>
      </div>

      <div v-show="showAll" class="line-all">
        <div class="day" v-for="(item, index) in 3" :key="index">
          <div class="date-container">
            <span class="date">2020.01.26</span>
            <span>第1天</span>
          </div>
          <ul>
            <li class="line-item">
              <i class="iconfont icon-scenic-spot"></i>
              <el-link :underline="false">阳朔</el-link>
            </li>
            <li class="line-item">
              <i class="iconfont icon-dining-room"></i>布加拉迪大饭店
            </li>
            <li class="line-item">
              <i class="iconfont icon-hotel"></i>香格里拉
            </li>
            <li class="line-item">
              <i class="iconfont icon-shopping"></i>微笑堂
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lists: Array,
  },

  data() {
    return {
      showAll: false,
      // dayTotal: 0,
      scenicCount: 0,
      diningCount: 0,
      hotelCount: 0,
      shoppingCount: 0,
    }
  },

  // computed: {
  //   textAll() {
  //     return this.showAll ? '收起' : '查看全部'
  //   }
  // },

  watch: {
    lists(newVal) {
      newVal.forEach(item => {
        item.sections.forEach(sec => {
          switch (sec.addressType) {
            case 1:
              this.scenicCount++;
              break;
            case 2:
              this.diningCount++;
              break;
            case 3:
              this.hotelCount++;
              break;
            case 4:
              this.shoppingCount++;
              break;
          }
        })
      })

      // this.dayTotal = newVal.length
    },
  },

  methods: {
    viewAll() {
      this.showAll = !this.showAll
    }
  }
}
</script>

<style lang="scss" scoped>
.line-schedule {
  margin-left: 30px;
  width: 260px;
}

.iconfont {
  color: $color-primary;
}

.header {
  display: flex;
  margin-bottom: 20px;

  .span {
    margin-left: auto;
  }
}

.body {
  border: 1px solid $border-color-base;
  border-radius: 4px;
  padding: 0 26px;

  .num {
    margin-bottom: 19px;
    font-size: 14px;
    text-align: center;
    height: 29px;
    line-height: 36px;
    color: #5c5c5c;
    position: relative;
    border-bottom: 1px solid #5c5c5c;
    .p {
      position: absolute;
      background-color: #fff;
      line-height: 15px;
      padding: 0 10px;
      top: 20px;
      left: 50%;
      margin-left: -30px;
    }
  }

  .summary {
    display: flex;
    flex-wrap: wrap;
    font-weight: bold;

    .item {
      width: 50%;
      height: 32px;
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      padding-left: 10px;
    }

    .box {
      height: 32px;
      width: 30px;
      border: 1px solid $color-text-secondary;
      line-height: 32px;
      margin-right: 8px;
      text-align: center;
    }
  }

  .info {
    line-height: 25px;
    margin-bottom: 12px;
    font-size: 13px;
    color: $color-text-secondary;
    text-align: center;

    .dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      border-radius: 100%;
      background: #909399;
      margin: 0 5px;
      position: relative;
      bottom: 3px;
    }
  }

  .line-all {
    font-size: 13px;

    .day {
      margin-bottom: 30px;
    }

    .iconfont {
      font-size: 20px;
      margin-right: 8px;
    }

    .date-container {
      font-size: 12px;
      margin-bottom: 12px;
    }

    .date {
      margin-right: 8px;
    }

    .line-item {
      line-height: 30px;
      padding-left: 10px;
      border: 1px solid $border-color-light;
      margin-bottom: 8px;
    }
  }
}
</style>
