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
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="100px">

          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-link type="primary" class="forget">忘记密码?</el-link>
            <el-button class="btn" type="primary" @click="submitForm('ruleForm1')">登录</el-button>
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
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px">

          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm2.name"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
          </el-form-item>

          <div class="r-hint">单击注册表示您同意我们的<el-link type="primary">服务条款</el-link>
          </div>
          <el-form-item>
            <el-button class="btn" type="primary" @click="submitForm('ruleForm2')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',

    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        isLogin: true,

        ruleForm: {
          name: '',
          pass: '',
          checkPass: '',
        },

        ruleForm2: {
          name: '',
          pass: '',
          checkPass: '',
        },

        rules: {
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

        rules2: {
          name: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 10,
              message: '长度在 1 到 10 个字符',
              trigger: 'blur'
            }
          ],
          pass: [{
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }, {
            min: 6,
            max: 20,
            message: '密码至少6位',
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
          line-height: 1;
          margin-bottom: 10px;
          font-size: 12px;
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
  }

</style>
