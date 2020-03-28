<template>
  <div class="scenic-detail">
    <!-- 标题 -->
    <h2 class="title">西街</h2>

    <!-- 图片 -->
    <div class="top-img">
      <div class="big-container">
        <el-image class="big-img" :src="bigUrl" fit="cover"></el-image>
      </div>
      <div>
        <el-image class="small-img" :src="smallUrl1" fit="cover"></el-image>
        <el-image class="small-img" :src="smallUrl2" fit="cover"></el-image>
      </div>
    </div>

    <!-- 介绍 -->
    <ul class="introduce">
      <li class="introduce-item">历经1400多年的西街，是阳朔最古老繁华的街道，也是阳朔重要旅游景点之一。</li>
      <li class="introduce-item">西街由觅食、逛街、泡吧等多个词汇集结而成，正因如此丰富多彩，成了阳朔一道独特而靓丽的风景线。</li>
      <li class="introduce-item">不足1km 的街道由石板砌成，呈弯曲的S形，两旁房屋古朴典雅，桂北明清时期风格，小青瓦、坡屋面、白粉墙、吊阳台。</li>
      <li class="introduce-item">街上摆满了各种旅游纪念品，两旁的商铺都是中西合璧的，几乎所有的招牌都是中英文对照，服务员能用流利外语为游客服务。</li>
      <li class="introduce-item">来西街，久负盛名当属阳朔第一名菜的啤酒鱼不可不尝，这里还有很多酒吧，夜幕降临，比白昼更加热闹。</li>
    </ul>

    <!-- 旅游信息 -->
    <div class="info">
      <div class="info-item">
        <span>用时参考：3小时以上</span>
      </div>
      <div class="info-item">
        交通
        <div class="info-content">
          公交:<br>
          两江机场--在机场乘坐机场大巴至桂林民航大厦转16路公交车民主路站下(35KM)<br>
          桂林火车站--在火车站对面公交车站乘坐16路23路公交到象山景区站下(2KM)<br>
          桂林汽车站--在其车站对面公交车站乘坐16路23路公交到象山景区站下(1KM)<br>
          中心广场--从中心广场走至正阳步行街南端，再向东走200米<br>
          自驾车:<br>
          景区自带收费停车场<br>
          下机场高速后沿翠竹路行至上海路口，左转(下立交桥),行至民主路的桂花广场(景区停车场)<br>
          (自驾车)近"滨江路"与民主路交叉处行至民主路的桂花广场(景区停车场)</div>
      </div>
      <div class="info-item">
        门票
        <div class="info-content"> 成人票:51人民币；半价票:27.5人民币；双人票:102人民币 (1月1日-12月31日 周一-周日)<br>
          半票:60岁以上老人、6-18周岁未成年人、全日制大学本科及以下学历学生持有效证件<br>
          免票:现役军人、离休军人、残疾军人、烈属、离休干部、残疾人、1.2米以下儿童、桂林市民<br>
          tips:<br>
          PC端官网预订票价：55元</div>
      </div>
      <div class="info-item">
        开放时间
        <div class="info-content">
          <div>06:30-19:00 (4月1日-10月31日 周一-周日)<br>
            07:00-18:30 (11月1日-次年3月31日 周一-周日)<br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bigUrl: 'http://n1-q.mafengwo.net/s11/M00/AA/72/wKgBEFt6YMOAaSGxABZLvE0A5r899.jpeg?imageMogr2%2Fthumbnail%2F%21690x370r%2Fgravity%2FCenter%2Fcrop%2F%21690x370%2Fquality%2F100',
        smallUrl1: 'http://b1-q.mafengwo.net/s11/M00/CF/04/wKgBEFtzpC-ALU1eAA9Uh9RZZJ410.jpeg?imageMogr2%2Fthumbnail%2F%21305x183r%2Fgravity%2FCenter%2Fcrop%2F%21305x183%2Fquality%2F100',
        smallUrl2: 'http://n1-q.mafengwo.net/s12/M00/DD/51/wKgED1uksKCABydEAA4EiMlQEPQ71.jpeg?imageMogr2%2Fthumbnail%2F%21305x183r%2Fgravity%2FCenter%2Fcrop%2F%21305x183%2Fquality%2F100',
      }
    },

    methods: {

    },
  }

</script>

<style lang='scss' scoped>
  // .scenic-detail {
  //   border: 1px solid #000;
  // }

  .title {
    font-size: 30px;
    font-weight: normal;
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
      margin-bottom: 20px;
    }

    .info-content {
      padding-left: 2em;
    }
  }

</style>
