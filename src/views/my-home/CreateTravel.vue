<template>
  <div class="create-travel">
    <div class="header">
      <span>游记名称：</span>
      <el-input v-model="name" placeholder="请输入内容"></el-input>
      <el-button type="primary">生成游记</el-button>
      <el-button
        type="primary"
        round
        icon="el-icon-back"
        @click="$router.back()"
        >返回</el-button
      >
    </div>

    <div class="content">
      <!-- 侧边照片选择器 -->
      <div class="sidebar">
        <!-- 日期 -->
        <ol class="day-wrapper" id="day">
          <el-scrollbar ref="elscrollbar">
            <li
              class="day"
              v-for="(item, index) in dayArr"
              :key="index"
              @click="selectDay(index)"
            >
              <div :class="{ 'active-text': index === currentDay }">
                <span>第{{ item }}天</span>
                <sup
                  class="el-icon-close"
                  v-show="index === currentDay"
                  @click.stop="delDay(index)"
                ></sup>
              </div>
            </li>
            <div>
              <el-button type="primary" size="mini" @click.stop="addDay">
                添加
                <i class="el-icon-plus"></i>
              </el-button>
            </div>
          </el-scrollbar>
        </ol>

        <!-- 照片 -->
        <ol class="img-wrapper">
          <el-scrollbar>
            <li
              v-for="(item, index) in imgArr"
              :key="index"
              class="img-item"
              @click.stop="selectImg(index)"
            >
              <img :src="item.url" alt="图片" class="thumbnail" />
              <div class="shade" v-show="currentImg === index">
                <i class="el-icon-edit"></i>
                <i class="el-icon-error" @click="delImg(item)"></i>
              </div>
            </li>

            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-scrollbar>
        </ol>
      </div>

      <!-- 描述 -->
      <div class="describe"></div>

      <!-- 时间地点 -->
      <div class="toolbar"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      currentDay: 0,
      currentImg: 0,
      imgArr: [
        {
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          value: 1
        }
        // {
        //   url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //   value: 2
        // },
        // {
        //   url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //   value: 3
        // },
        // {
        //   url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //   value: 4
        // },
        // {
        //   url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //   value: 5
        // },
      ],
      dayArr: [1, 2, 3]
    }
  },

  methods: {
    selectDay (index) {
      this.currentDay = index
    },

    addDay (index) {
      this.dayArr.push(this.dayArr.length + 1)
      this.currentDay = this.dayArr.length - 1
      // 元素滚动
      const div = this.$refs.elscrollbar.$refs.wrap
      this.$nextTick(() => {
        div.scrollTop = div.scrollHeight
      })
    },

    delDay (index) {
      this.dayArr.splice(index, 1)
      this.currentDay = index - 1
    },

    selectImg (index, item) {
      this.currentImg = index
    },

    delImg (item) {
      console.log(item.value)
    }
  }
}
</script>

<style lang='scss' scoped>
// .create-travel{
//   border: 1px solid #000;
// }

/deep/ {
  // 上传组件
  .el-upload--picture-card {
    width: 126px;
    height: 130px;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 126px;
    height: 130px;
  }
}

.header {
  display: flex;
  align-items: center;

  .el-input {
    width: 300px;
    margin-right: auto;
  }
}

.content {
  display: flex;
}

// 侧边照片选择器
.sidebar {
  margin-top: 30px;
  border-right: 1px solid $border-color-base;
  display: flex;
  user-select: none;

  // 日期
  .day-wrapper {
    width: 70px;
    height: 50vh;
  }

  .day {
    padding-top: 5px;
    margin-bottom: 15px;
    cursor: pointer;
  }

  .active-text {
    color: $color-primary;
  }

  .el-button--mini {
    padding: 5px;
  }

  .el-icon-close {
    margin-left: 5px;

    &:hover {
      font-size: 14px;
    }
  }

  // 图片
  .img-wrapper {
    width: 150px;
    height: 70vh;
  }

  .img-item {
    width: 126px;
    height: 130px;
    margin-bottom: 20px;
    position: relative;
    cursor: pointer;

    .thumbnail {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      object-fit: cover;
    }

    .shade {
      position: absolute;
      border-radius: 6px;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: rgba($color: #000, $alpha: 0.3);
      color: #ddd;

      .el-icon-edit {
        font-size: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .el-icon-error {
        position: absolute;
        font-size: 20px;
        top: 5px;
        right: 5px;
      }
    }

    &:hover {
      .shade {
        display: block;
      }
    }
  }

  .img-item-add {
    border: 1px solid $border-color-light;
    border-radius: 6px;
    font-size: 60px;
    background: #000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
  }
}
</style>
