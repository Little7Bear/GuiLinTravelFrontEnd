<template>
  <div class="create-travel">
    <!-- 头部 -->
    <div class="header">
      <span>游记名称：</span>
      <el-input v-model="name" placeholder="请输入名称" maxlength="15" show-word-limit class="name"></el-input>

      <span>日期：</span>
      <el-date-picker v-model="activeSection.date" type="date" placeholder="选择日期"></el-date-picker>

      <el-button type="primary" :disabled="createDisabled">生成游记</el-button>

      <el-button type="primary" round icon="el-icon-back" @click="$router.back()">返回</el-button>
    </div>

    <div class="content">
      <!-- 侧边照片选择器 -->
      <div class="sidebar">
        <!-- 日期 -->
        <ol class="day-wrapper">
          <el-scrollbar ref="elscrollbar1">
            <li class="day" v-for="(day, i) in days" :key="i" @click="selectDay(i)">
              <div :class="{ 'active-text': i === currentDayIndex }">
                <span>第{{ i + 1 }}天</span>
                <sup class="el-icon-close" v-show="i === currentDayIndex" @click.stop="delDay(i)"></sup>
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
          <el-scrollbar ref="elscrollbar2">
            <li
              v-for="(section, index) in activeDay.sections"
              :key="index"
              class="img-item"
              @click.stop="selectImg(index)"
            >
              <img :src="section.url" alt="图片" class="thumbnail" />
              <div class="shade" v-show="activeDay.currentImg === index">
                <i class="el-icon-edit"></i>
                <i class="el-icon-error" @click.stop="delImg(section,index)"></i>
              </div>
            </li>

            <el-upload
              ref="upload"
              :action="uploadUrl"
              :headers="uploadHeaders"
              :show-file-list="false"
              :multiple="false"
              :auto-upload="false"
              :on-success="onUploadSuccess"
              :on-change="onUploadChange"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-scrollbar>
        </ol>
      </div>

      <!-- 描述 -->
      <div class="describe">
        <div class="img-container">
          <el-image v-show="showBigImg" :src="bigImgUrl" fit="cover"></el-image>
        </div>

        <el-input
          type="textarea"
          rows="8"
          placeholder="请输入照片描述"
          maxlength="500"
          v-model="activeSection.describe"
          show-word-limit
          resize="none"
        ></el-input>
      </div>

      <!-- 时间地点 -->
      <div class="toolbar">
        <el-form ref="form" :model="activeSection" label-width="80px" label-position="top">
          <el-form-item label="时间">
            <el-time-picker v-model="activeSection.time" placeholder="请选择时间"></el-time-picker>
          </el-form-item>

          <el-form-item label="地点类型">
            <el-select v-model="activeSection.addressType" placeholder="请选择地点类型">
              <el-option
                v-for="item in addressTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="地点名称">
            <el-input v-model="activeSection.address" placeholder="请输入地点"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      name: '', //游记名称
      createDisabled: true, //能否生成游记
      //总数据
      days: [],
      currentDayIndex: -1, //选中天下标
      activeDay: { //选中天数据
        sections: [],
        currentImg: -1,
        imgActive: 0,
      },
      activeSection: { //选中章节数据
        url: '',
        date: '',
        time: '',
        addressType: '',
        address: '',
        describe: '',
      },

      addressTypes: [{
        value: 1,
        label: '景点'
      },
      {
        value: 2,
        label: '餐厅'
      },
      {
        value: 3,
        label: '住宿'
      },
      {
        value: 4,
        label: '购物'
      }
      ],
      areas: [{
        value: 1,
        label: '桂林市区'
      },
      {
        value: 2,
        label: '阳朔'
      },
      {
        value: 3,
        label: '全州'
      },
      {
        value: 4,
        label: '兴安'
      }
      ],
    }
  },

  computed: {
    ...mapState([
      'user',
      'token'
    ]),

    uploadUrl() {
      return `/upload/notes/${this.user.id}`
    },

    uploadHeaders() {
      return {
        Authorization: `Bearer ${this.token}`
      }
    },

    showBigImg() {
      return this.activeSection.url !== ''
    },

    bigImgUrl() {
      return this.activeSection.url
    },

  },

  watch: {
    //监听第几天展示不同天数的数据
    currentDayIndex: {
      handler(newVal) {
        if (newVal < 0) {
          this.activeDay = {
            sections: [],
            currentImg: -1,
            imgActive: 0,
          }
          return;
        }
        this.activeDay = this.days[newVal]
        this.activeDay.currentImg = -1
        // this.activeSection = {
        //   url: '',
        //   date: '',
        //   time: '',
        //   addressType: '',
        //   address: '',
        //   describe: '',
        // }
      },
    },

    'activeDay.currentImg': {
      handler(newVal) {
        if (newVal >= 0) {
          this.activeSection = this.activeDay.sections[newVal]
        }
      },
    },

  },

  methods: {
    // 添加天数
    addDay() {
      let obj = {
        sections: [],
        currentImg: -1,
      }

      this.days.push(obj)
      this.currentDayIndex = this.days.length - 1

      // 元素滚动到底部
      const scrollbar = this.$refs.elscrollbar1.$refs.wrap
      this.$nextTick(() => {
        scrollbar.scrollTop = scrollbar.scrollHeight
      })
    },

    delDay(index) {
      this.days.splice(index, 1)
      this.currentDayIndex = index - 1
    },

    selectDay(index) {
      this.currentDayIndex = index
    },

    selectImg(index, item) {
      this.activeDay.currentImg = index
    },

    delImg(section, index) {
      this.$refs.upload.abort(section.file)
      this.activeSection = {
        url: '',
        date: '',
        time: '',
        addressType: '',
        address: '',
        describe: '',
      }
      this.activeDay.currentImg = - 1
      this.activeDay.sections.splice(index, 1)
    },

    onUploadSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
    },

    onUploadChange(file, fileList) {
      //   console.log(file);
      let section = {
        url: file.url,
        date: '',
        time: '',
        addressType: '',
        address: '',
        describe: '',
        file: file
      }
      this.days[this.currentDayIndex].sections.push(section);

      // 元素滚动到底部
      const scrollbar = this.$refs.elscrollbar2.$refs.wrap
      this.$nextTick(() => {
        scrollbar.scrollTop = scrollbar.scrollHeight
      })
    },
  }
}

</script>

<style lang='scss' scoped>
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

  .img-active {
    opacity: 1;
  }

  li:focus {
    outline-width: 0;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}

.header {
  display: flex;
  align-items: center;

  .name {
    width: 280px;
  }

  .el-input {
    margin-right: 20px;
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
    height: 500px;
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
      border: 1px solid $border-color-light;
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

//中间描述
.describe {
  width: 400px;
  margin: 0 16px;
  padding-top: 30px;

  .img-container {
    margin-bottom: 20px;
    width: 400px;
    height: 300px;
    border: 1px solid $border-color-light;
    border-radius: 10px;
  }

  .el-image {
    border-radius: 10px;
    width: 100%;
    height: 100%;
  }
}

// 右边表单
.toolbar {
  padding-top: 30px;
  margin-left: 15px;
  width: 260px;

  /deep/ .el-input__inner {
    width: 220px;
  }
}
</style>
