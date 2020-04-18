<template>
  <div class="scenic" v-loading="loading">
    <!-- 表单 -->
    <ul class="table">
      <li
        class="table-item"
        v-for="(item, index) in table"
        :key="index"
        @click="viewDetails(item.id)"
      >
        <ImageCover :src="item.cover" />
        <div class="item-bottom">{{item.title}}</div>
      </li>
    </ul>

    <!-- 分页 -->
    <el-pagination
      @current-change="changePage"
      :current-page="params.pageIndex"
      layout="total, prev, pager, next, jumper"
      :page-size="params.pageSize"
      :total="total"
      background
    ></el-pagination>
  </div>
</template>

<script>
import scenic from '@/api/scenic';

export default {
  data() {
    return {
      params: {
        pageIndex: 1,
        pageSize: 12,
      },

      table: [
        // {
        //   id: '1',
        //   cover: 'http://n1-q.mafengwo.',
        //   title: '遇龙河'
        // }
      ],
      total: 0,
      loading: false,
    }
  },

  watch: {
    params: {
      deep: true,
      handler(newVal) {
        this._queryData(this.params)
      },
    },
  },

  created() {
    this._queryData(this.params)
  },

  methods: {
    _queryData(params) {
      this.loading = true
      scenic.findAll(params)
        .then(res => {
          let { data } = res
          this.table = data
          this.loading = false
          this.total = res.total
        })
        .catch(err => {
          this.loading = false
        })
    },

    changePage(pageIndex) {
      this.params.pageIndex = pageIndex;
    },

    viewDetails(id) {
      this.$router.push({ name: 'ScenicDetail', query: { id } })
    },

  }
}

</script>

<style lang="scss" scoped>
.scenic {
  min-height: 200px;
}

.table {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  grid-auto-flow: row dense;
  grid-gap: 20px 10px;
}

.table-item {
  .img-cover {
    height: 130px;
  }

  .item-bottom {
    line-height: 40px;
    text-align: center;
    color: #1f1f1f;
    border: 1px solid $border-color-base;
  }

  &:hover {
    cursor: pointer;

    .item-bottom {
      color: $color-primary;
    }
  }
}

.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
