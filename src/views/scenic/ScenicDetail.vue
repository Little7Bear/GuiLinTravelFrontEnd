<template>
  <div class="scenic-detail" v-loading="loading">
    <!-- 标题区域 -->
    <div class="title-container">
      <!-- 标题 -->
      <h2 class="title">{{table.title}}</h2>
      <!-- 操作栏 -->
      <div>
        <el-button type="primary" @click="onEdit" v-permission="'0'">编辑</el-button>

        <el-popconfirm
          class="popconfirm-del"
          title="确定删除这个景点吗？"
          icon="el-icon-info"
          iconColor="red"
          @onConfirm="onDelete"
          v-permission="'0'"
        >
          <el-button slot="reference" type="danger">删除</el-button>
        </el-popconfirm>

        <el-button
          style="margin-left:auto;"
          type="primary"
          round
          icon="el-icon-back"
          @click="$router.back()"
        >返回</el-button>
      </div>
    </div>

    <!-- 图片 -->
    <div class="top-img">
      <div class="big-container">
        <el-image class="big-img" :src="table.imgs[0]" fit="cover"></el-image>
      </div>
      <div>
        <el-image class="small-img" :src="table.imgs[1]" fit="cover"></el-image>
        <el-image class="small-img" :src="table.imgs[2]" fit="cover"></el-image>
      </div>
    </div>

    <!-- 介绍 -->
    <ul class="introduce">
      <li class="introduce-item" v-for="(summary, index) in table.summarys" :key="index">{{summary}}</li>
    </ul>

    <!-- 旅游信息 -->
    <div class="info">
      <div class="info-item">
        <div class="item-title">用时参考</div>
        {{table.reference}}
      </div>
      <div class="info-item">
        <div class="item-title">交通</div>
        <div v-html="table.traffic"></div>
      </div>
      <div class="info-item">
        <div class="item-title">门票</div>
        <div v-html="table.ticket"></div>
      </div>
      <div class="info-item">
        <div class="item-title">开放时间</div>
        <div v-html="table.openTime"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import scenic from '@/api/scenic';


export default {
  data() {
    return {
      id: '',
      loading: false,
      table: {
        imgs: ['', '', ''],
        summarys: [],
        reference: '',
        traffic: '',
        ticket: '',
        openTime: '',
      }
    }
  },

  computed: {
    ...mapState([
      'user',
    ]),
  },

  created() {
    this.id = this.$route.query.id
    if (this.id) {
      this._queryData(this.id)
    }
  },

  methods: {
    _queryData(id) {
      this.loading = true
      scenic.findByID(id)
        .then(res => {
          let { data } = res
          let { summary } = data
          data.summarys = summary.split('<br/>')
          this.table = data
          this.loading = false
        })
        .catch(err => {
          this.loading = false
        })
    },

    onEdit() {
      this.$router.push({
        name: 'ScenicCreate',
        query: { id: this.$route.query.id }
      })
    },

    onDelete() {
      scenic.delete(this.$route.query.id)
        .then(res => {
          this.$router.replace({ name: 'Scenic' })
        })
    }
  },
}

</script>

<style lang='scss' scoped>
// .scenic-detail {
//   border: 1px solid #000;
// }

.title-container {
  display: flex;
  justify-content: space-between;

  .title {
    font-size: 30px;
    font-weight: normal;
  }

  .popconfirm-del {
    margin: 0 20px;
  }
}

.top-img {
  margin-top: 20px;
  display: flex;

  .big-img {
    width: 615px;
    height: 370px;
    margin-right: 8px;
  }

  .small-img {
    width: 305px;
    height: 183px;

    &:first-of-type {
      margin-bottom: 2px;
    }
  }
}

.introduce {
  margin-top: 20px;
  list-style: initial;
  padding-left: 16px;
  line-height: 24px;
}

.info {
  margin-top: 20px;
  line-height: 24px;

  .info-item {
    margin-bottom: 30px;
    .item-title {
      margin-bottom: 5px;
    }
  }
}
</style>
