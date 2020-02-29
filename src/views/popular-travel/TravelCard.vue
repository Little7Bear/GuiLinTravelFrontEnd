<template>
  <div class="travel-card">
    <el-card shadow="hover">
      <div class="img-container">
        <el-image :src="imgUrl"></el-image>
        <div class="img-cover"></div>
      </div>



      <div class="card-footer">
        <div class="footer-left">
          <h4 class="card-title">光脚走缅甸，见证虔诚的佛心虔诚的佛心</h4>

          <div class="user-container">
            <el-avatar :size="25" :src="circleUrl"></el-avatar>
            <span class="user-name">团子E菲</span>
            <span class="date">2020.10.21</span>

          </div>
        </div>

        <div class="footer-right">
          <div class="icon-container">
            <i class="iconfont  icon-love"></i>
            <span class="icon-count">9999</span>
          </div>

          <div class="icon-container">
            <i class="iconfont  icon-comment"></i>
            <span class="icon-count">5</span>
          </div>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentDate: new Date(),
        imgUrl: 'http://photos.breadtrip.com/photo_2020_02_01_27aabfecb6aa5c2bb0781d5f144b288c.jpg?imageView/2/w/960/q/85',
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      }
    },
  }

</script>

<style lang='scss' scoped>
  /deep/ {
    .el-card__body {
      padding: 0;
    }

    .el-image {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }

  // 图片
  .img-container {
    position: relative;
    width: 100%;
    height: 156px;
    cursor: pointer;

    &:hover {
      .img-cover {
        display: block;
      }
    }

    .img-cover {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba($color: #000, $alpha: .3);
    }
  }

  // 下方文字
  .travel-card {
    width: 300px;

    .card-footer {
      padding: 10px;
      display: flex;

      .footer-left {
        width: 210px;
        border-right: 1px solid #dedede;

        .card-title {
          margin: 0;
          @include one-ellipsis;
        }

        .user-container {
          display: flex;
          margin-top: 10px;
          align-items: center;
          font-size: 14px;
          color: #333;

          .user-name {
            margin-left: 10px;
            margin-right: 10px;
          }

          .date {
            font-size: 13px;
            align-items: flex-end;
            color: #777;
          }
        }
      }

      .footer-right {
        .icon-container {
          padding-left: 10px;
          display: flex;
          align-items: center;

          .iconfont {
            font-size: 18px;
            cursor: pointer;
            margin-left: auto;
            margin-right: 5px;
          }

          .icon-count {
            font-size: 12px;
            width: 28px;
            color: #777;
          }

          &:last-of-type {
            margin-top: 5px;
          }
        }
      }
    }

  }

</style>
