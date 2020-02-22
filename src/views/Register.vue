<template>
    <!-- 注册框 -->
    <div class="box-container">
      <div class="header">
        <h2 class="title">注册</h2>
        <span class="hint">已经注册？<span class="link" @click="isLogin = !isLogin">马上登录</span></span>
      </div>

      <div class="body">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm2" label-width="100px">

          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button class="btn" type="primary" @click="submitForm('ruleForm2')">注册</el-button>
          </el-form-item>

        </el-form>
      </div>

    </div>
</template>

<script>
  export default {
    name: 'Register',

    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
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

        rules: {
          name: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          pass: [{
            required: true,
            validator: validatePass,
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
      }
    }

  }

</style>
