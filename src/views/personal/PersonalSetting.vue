<template>
  <div class="personal-setting">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="头像" class="item-avatar">
        <div class="avatar-container">
          <el-avatar :size="50" :src="circleUrl"></el-avatar>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
          >
            <el-button v-show="isEdit" size="small" type="primary"
              >点击上传</el-button
            >
          </el-upload>
        </div>
      </el-form-item>

      <el-form-item label="用户名：">
        <el-input
          v-show="isEdit"
          v-model="form.name"
          maxlength="12"
          show-word-limit
        ></el-input>
        <span v-show="!isEdit">拉斯科技的法律</span>
      </el-form-item>

      <el-form-item label="性别：">
        <el-radio-group v-show="isEdit" v-model="form.gender">
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
        </el-radio-group>
        <span v-show="!isEdit">男</span>
      </el-form-item>

      <el-form-item label="生日：">
        <el-date-picker
          v-show="isEdit"
          v-model="form.birthday"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
        <span v-show="!isEdit">2020-04-02</span>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onEdit">{{
          isEdit ? "取消" : "编辑"
        }}</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        gender: '',
        birthday: '',
      },

      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      isEdit: false,
    }
  },

  computed: {
    id() {
      return this.$store.state.userID;
    },
  },

  created() {
    
  },

  methods: {
    onEdit() {
      this.isEdit = !this.isEdit
    },

    onSubmit() {

    },

  },

}
</script>

<style lang='scss' scoped>
/deep/ {
  .el-form {
    border: 1px solid $border-color-base;
    border-radius: 6px;
    padding: 20px;
  }

  .el-input {
    width: 250px;
  }

  .el-link {
    margin-left: 20px;
  }

  .item-avatar {
    .el-form-item__label {
      padding-right: 30px;
    }
  }

  .avatar-container {
    display: flex;
    align-items: center;
  }

  // .el-avatar {
  //   display: inline-block;
  // }

  .el-upload {
    margin-left: 20px;
  }
}

.personal-setting {
  // width: 500px;
  // border: 1px solid #000;
}
</style>