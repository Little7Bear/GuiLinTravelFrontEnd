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
        <span class="order-text">{{order.label}}</span>
        <span class="current-icon"></span>
      </div>
    </div>

    <ul class="card-container" v-loading="loading">
      <li v-for="(item, index) in lists" :key="index">
        <TravelCard v-bind="item" />
      </li>
    </ul>
    <div class="empty-prompt" v-if="lists.length === 0">暂无数据</div>
    <!-- 分页 -->
    <el-pagination
      layout="total, prev, pager, next, jumper"
      background
      :current-page="params.pageIndex"
      :page-size="params.pageSize"
      :total="total"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import TravelCard from './components/TravelCard'
import note from '@/api/note';

export default {
  components: {
    TravelCard
  },

  data() {
    return {
      lists: [],
      orders: [
        { label: '热门', value: 'hot' },
        { label: '最新', value: 'latest' }],
      orderActive: 0,
      params: {
        pageIndex: 1,
        pageSize: 9,
        sort: 'hot'
      },
      total: 0,
      loading: false,
    }
  },

  created() {
    this._queryData(this.params)
  },

  computed: {
    sortValue() {
      return this.orders[this.orderActive].value
    },
  },

  watch: {
    orderActive(index) {
      this._queryData(this.params);
    },

    params: {
      deep: true,
      handler(newVal) {
        this._queryData(this.params)
      },
    },
  },

  methods: {
    _queryData(params) {
      params.sort = this.sortValue
      this.loading = true
      note.findAll(params)
        .then(res => {
          this.loading = false
          let data = res.data
          this.lists = data
          this.total = res.total
        })
        .catch(err => {
          this.loading = false
        })
    },

    changePage(page) {
      this.params.pageIndex = page;
    },

    toggleSort(index) {
      this.orderActive = index
    },
  }
}

</script>

<style lang='scss' scoped>
.popular-travel {
  // 排序方式
  .order {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    color: $color-text-primary;
  }

  .order-text {
    cursor: pointer;
  }

  .order-item {
    position: relative;
    padding-right: 15px;
    margin-right: 15px;
    border-right: 1px solid $border-color-light;
    font-size: $font-size-extra-large;

    &:last-of-type {
      border-right: none;
    }
  }

  .is-active {
    color: $color-text-secondary;

    .current-icon {
      display: block;
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
    border-color: transparent transparent $color-text-secondary transparent;
  }

  // 卡片
  .card-container {
    height: 763px;
    padding-top: 20px;
    border-top: 1px solid $border-color-base;
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    justify-content: space-between;
    grid-auto-flow: row dense;
    row-gap: 20px;
  }

  .empty-prompt {
    text-align: center;
  }

  // 分页
  .el-pagination {
    margin-top: 40px;
    text-align: center;
  }
}
</style>
