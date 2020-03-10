<template>
    <div class="popular-travel">
        <div class="order">
            <div
                v-for="(order, index) in orders"
                :key="index"
                class="order-item"
                :class="{'is-active': index === orderActive}"
                @click="toggleSort(index)"
            >
                <span>{{order}}</span>
                <span class="current-icon"></span>
            </div>
        </div>

        <div class="card-container">
            <TravelCard v-for="(item, index) in 20" :key="index" />
        </div>
    </div>
</template>

<script>
import TravelCard from './TravelCard'

export default {
  components: {
    TravelCard
  },

  data () {
    return {
      cards: [20],
      orders: ['热门', '最新'],
      orderActive: 0
    }
  },

  methods: {
    toggleSort (index) {
      this.orderActive = index
    }
  }
}
</script>

<style lang='scss' scoped>
/deep/ {
    .el-divider {
        height: 25px;
        margin: 0 15px;
        margin-top: 5px;
    }
}

.popular-travel {
    // 排序方式
    .order {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        color: #000;

        span {
            font-size: 24px;
            cursor: pointer;
        }
    }

    .order-item {
        position: relative;
        padding-right: 15px;
        margin-right: 15px;
        border-right: 1px solid #e7e7e7;

        &:last-of-type {
            border-right: none;
        }
    }

    .current-icon {
        display: none;
        width: 0;
        height: 0;
        position: absolute;
        bottom: -31px;
        left: 20px;
        transform: translateY(-100%);
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent #ccc transparent;
    }

    .is-active {
        color: #b0b0b0;
        .current-icon {
            display: block;
        }
    }

    // 卡片
    .card-container {
        padding-top: 20px;
        border-top: 1px solid #e7e7e7;
        display: grid;
        grid-template-columns: repeat(auto-fill, 300px);
        justify-content: space-between;
        grid-auto-flow: row dense;
        row-gap: 20px;
    }
}
</style>
