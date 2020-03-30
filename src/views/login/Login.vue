<template>
  <div class="login">
    <!-- logo -->
    <div class="logo-container">
      <img class="logo" src="@/assets/logo.png" alt="logo">
    </div>

    <!-- 登录框 -->
    <div class="box-container" v-show="isLogin">
      <div class="header">
        <h2 class="title">登录</h2>
        <div class="hint">还没有帐号？<el-link type="primary" @click="isLogin = !isLogin">马上注册</el-link>
        </div>
      </div>

      <div class="body">
        <el-form :model="loginFrom" :rules="loginRules" ref="loginForm" label-width="100px">

          <el-form-item label="用户名" prop="name">
            <el-input v-model="loginFrom.name"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pass" class="last-item">
            <el-input type="password" v-model="loginFrom.pass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-checkbox v-model="loginFrom.recordPass">记住密码</el-checkbox>
            <el-link type="primary" class="forget" :underline="false">忘记密码?</el-link>
            <el-button class="btn" type="primary" @click="login('loginForm')">登录</el-button>
          </el-form-item>

        </el-form>
      </div>

    </div>

    <!-- 注册框 -->
    <div class="box-container" v-show="!isLogin">
      <div class="header">
        <h2 class="title">注册</h2>
        <div class="hint">已经注册？<el-link type="primary" class="link" @click="isLogin = !isLogin">马上登录</el-link>
        </div>
      </div>

      <div class="body">
        <el-form :model="registerFrom" :rules="registerRules" ref="registerFrom" label-width="100px">

          <el-form-item label="用户名" prop="name" type="email">
            <el-input v-model="registerFrom.name"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="registerFrom.pass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="checkPass" class="last-item">
            <el-input type="password" v-model="registerFrom.checkPass" autocomplete="off"></el-input>
          </el-form-item>

          <div class="r-hint">单击注册表示您同意我们的<el-link type="primary" @click="viewTerm">服务条款</el-link>
          </div>

          <el-form-item>
            <el-button class="btn" type="primary" @click="register('registerFrom')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>

    <!-- 服务条款 -->
    <el-dialog title="服务条款" :visible.sync="dialogVisible" center>
      <div class="service-terms" v-html="term"></div>
    </el-dialog>
  </div>
</template>

<script>
  import term from './term';

  export default {
    name: 'Login',

    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerFrom.checkPass !== '') {
            this.$refs.registerFrom.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerFrom.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        isLogin: false,
        dialogVisible: false,
        term: term,

        loginFrom: {
          name: '',
          pass: '',
          recordPass: false,
        },

        registerFrom: {
          name: '',
          pass: '',
          checkPass: '',
        },

        loginRules: {
          name: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            }],
          pass: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        },

        registerRules: {
          name: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            }],
          pass: [{
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }, {
            min: 6,
            max: 15,
            message: '长度为6到15位',
            trigger: 'blur'
          }],
          checkPass: [{
            required: true,
            validator: validatePass2,
            trigger: 'blur'
          }],
        },
      }
    },

    methods: {
      login(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('登录');
          }
        });
      },

      register(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('注册');
          }
        });
      },

      viewTerm() {
        this.dialogVisible = !this.dialogVisible;
      },
    },
  }

</script>

<style lang="scss" scoped>
  .login {
    .logo-container {
      .logo {
        display: block;
        margin: 20px auto;
        width: 300px;
      }
    }

    .box-container {
      width: 500px;
      border: 1px solid #e5e5e5;
      margin: 0 auto;

      .header {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 24px;
        border-bottom: 1px solid #e5e5e5;
        position: relative;

        .title {
          line-height: 50px;
          font-size: 20px;
          font-weight: bold;
          color: #545454;
          margin-right: 20px;
        }

        .hint {
          position: absolute;
          right: 30px;
          font-size: 12px;
          color: #808080;
          display: flex;
          align-items: center;
        }
      }

      .body {
        padding: 24px;
        padding-bottom: 0;
        padding-left: 0;

        .link {
          float: right;
        }

        .btn {
          width: 373px;
        }

        .forget {
          float: right;
        }

        .r-hint {
          font-size: 13px;
          margin-left: 100px;
          height: 30px;
          color: #909399;
          display: flex;
          align-items: center;
        }
      }
    }

    .service-terms {
      text-align: justify;
      line-height: 24px;
      font-size: 13px;
    }

    .last-item {
      margin-bottom: 10px;
    }
  }

</style>
