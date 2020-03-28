<template>
  <div class="scenic">
    <!-- 表单 -->
    <ul class="table">
      <li class="table-item" v-for="(item, index) in table" :key="index" @click="viewDetails(item)">
        <ImageCover :src="item.imgUrl" />
        <div class="item-bottom">{{item.name}}</div>
      </li>
    </ul>

    <!-- 分页 -->
    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage"
      layout="total, prev, pager, next, jumper" :page-size="pageSize" :total="total" background></el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        table: [{
            id: '1',
            imgUrl: 'http://n1-q.mafengwo.net/s6/M00/6B/3E/wKgB4lOUVU2AO9SCAASZJ6eRoz432.jpeg?imageMogr2%2Fthumbnail%2F%21192x130r%2Fgravity%2FCenter%2Fcrop%2F%21192x130%2Fquality%2F100',
            name: '遇龙河'
          },
          {
            id: '1',
            imgUrl: 'http://n1-q.mafengwo.net/s6/M00/6B/3E/wKgB4lOUVU2AO9SCAASZJ6eRoz432.jpeg?imageMogr2%2Fthumbnail%2F%21192x130r%2Fgravity%2FCenter%2Fcrop%2F%21192x130%2Fquality%2F100',
            name: '遇龙河'
          },
          {
            id: '1',
            imgUrl: 'http://n1-q.mafengwo.net/s6/M00/6B/3E/wKgB4lOUVU2AO9SCAASZJ6eRoz432.jpeg?imageMogr2%2Fthumbnail%2F%21192x130r%2Fgravity%2FCenter%2Fcrop%2F%21192x130%2Fquality%2F100',
            name: '遇龙河'
          },
          {
            id: '1',
            imgUrl: 'http://n1-q.mafengwo.net/s6/M00/6B/3E/wKgB4lOUVU2AO9SCAASZJ6eRoz432.jpeg?imageMogr2%2Fthumbnail%2F%21192x130r%2Fgravity%2FCenter%2Fcrop%2F%21192x130%2Fquality%2F100',
            name: '遇龙河'
          },
          {
            id: '1',
            imgUrl: 'http://n1-q.mafengwo.net/s6/M00/6B/3E/wKgB4lOUVU2AO9SCAASZJ6eRoz432.jpeg?imageMogr2%2Fthumbnail%2F%21192x130r%2Fgravity%2FCenter%2Fcrop%2F%21192x130%2Fquality%2F100',
            name: '遇龙河'
          },
          {
            id: '1',
            imgUrl: 'http://n1-q.mafengwo.net/s6/M00/6B/3E/wKgB4lOUVU2AO9SCAASZJ6eRoz432.jpeg?imageMogr2%2Fthumbnail%2F%21192x130r%2Fgravity%2FCenter%2Fcrop%2F%21192x130%2Fquality%2F100',
            name: '遇龙河'
          },
          {
            id: '1',
            imgUrl: 'http://n1-q.mafengwo.net/s6/M00/6B/3E/wKgB4lOUVU2AO9SCAASZJ6eRoz432.jpeg?imageMogr2%2Fthumbnail%2F%21192x130r%2Fgravity%2FCenter%2Fcrop%2F%21192x130%2Fquality%2F100',
            name: '遇龙河'
          },
          {
            id: '1',
            imgUrl: 'http://n1-q.mafengwo.net/s6/M00/6B/3E/wKgB4lOUVU2AO9SCAASZJ6eRoz432.jpeg?imageMogr2%2Fthumbnail%2F%21192x130r%2Fgravity%2FCenter%2Fcrop%2F%21192x130%2Fquality%2F100',
            name: '遇龙河'
          },
          {
            id: '1',
            imgUrl: 'http://n1-q.mafengwo.net/s6/M00/6B/3E/wKgB4lOUVU2AO9SCAASZJ6eRoz432.jpeg?imageMogr2%2Fthumbnail%2F%21192x130r%2Fgravity%2FCenter%2Fcrop%2F%21192x130%2Fquality%2F100',
            name: '遇龙河'
          },
          {
            id: '1',
            imgUrl: 'http://n1-q.mafengwo.net/s6/M00/6B/3E/wKgB4lOUVU2AO9SCAASZJ6eRoz432.jpeg?imageMogr2%2Fthumbnail%2F%21192x130r%2Fgravity%2FCenter%2Fcrop%2F%21192x130%2Fquality%2F100',
            name: '遇龙河'
          },
          {
            id: '1',
            imgUrl: 'http://n1-q.mafengwo.net/s6/M00/6B/3E/wKgB4lOUVU2AO9SCAASZJ6eRoz432.jpeg?imageMogr2%2Fthumbnail%2F%21192x130r%2Fgravity%2FCenter%2Fcrop%2F%21192x130%2Fquality%2F100',
            name: '遇龙河'
          },
          {
            id: '1',
            imgUrl: 'http://n1-q.mafengwo.net/s6/M00/6B/3E/wKgB4lOUVU2AO9SCAASZJ6eRoz432.jpeg?imageMogr2%2Fthumbnail%2F%21192x130r%2Fgravity%2FCenter%2Fcrop%2F%21192x130%2Fquality%2F100',
            name: '遇龙河'
          },
        ],
        currentPage: 1,
        pageSize: 10,
        total: 100
      }
    },

    methods: {
      handleCurrentChange(val) {

      },

      viewDetails(param) {
        this.$router.push({
          name: "scenic-detail",
          params: {
            id: param.id,
          }
        })
      },

    }
  }

</script>

<style lang="scss" scoped>
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
