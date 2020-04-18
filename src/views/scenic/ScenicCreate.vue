<template>
  <div class="scenic-create" v-loading="loading">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="景点名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="图片集" prop="imgs">
        <el-upload
          list-type="picture-card"
          :action="uploadUrl"
          :file-list="fileList"
          :headers="uploadHeaders"
          :multiple="false"
          :before-upload="onUploadBefore"
          :on-success="onUploadSuccess"
          :on-remove="onUploadRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="景点摘要" prop="summary">
        <el-input
          type="textarea"
          placeholder="请输入摘要"
          :autosize="{ minRows: 2, maxRows: 6 }"
          resize="none"
          v-model="ruleForm.summary"
        ></el-input>
      </el-form-item>

      <el-form-item label="用时参考" prop="reference">
        <el-input placeholder="请输入用时参考" v-model="ruleForm.reference"></el-input>
      </el-form-item>

      <el-form-item label="交通信息">
        <el-input
          type="textarea"
          placeholder="请输入交通信息"
          :autosize="{ minRows: 2, maxRows: 6 }"
          resize="none"
          v-model="ruleForm.traffic"
        ></el-input>
      </el-form-item>

      <el-form-item label="门票信息">
        <el-input
          type="textarea"
          placeholder="请输入门票信息"
          :autosize="{ minRows: 2, maxRows: 6 }"
          resize="none"
          v-model="ruleForm.ticket"
        ></el-input>
      </el-form-item>

      <el-form-item label="开放时间">
        <el-input
          type="textarea"
          placeholder="请输入开放时间信息"
          :autosize="{ minRows: 2, maxRows: 6 }"
          resize="none"
          v-model="ruleForm.openTime"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即{{edit?'更新':'创建'}}</el-button>

        <el-popconfirm
          class="popconfirm-quit"
          title="确定放弃此次编辑吗？"
          icon="el-icon-info"
          iconColor="red"
          @onConfirm="quitForm()"
          v-if="!edit"
        >
          <el-button slot="reference">取消</el-button>
        </el-popconfirm>

        <el-button v-else @click="quitForm()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import scenic from '@/api/scenic';

export default {
  data() {
    return {
      loading: false,
      edit: false,//是否编辑模式
      fileList: [],//图片集

      ruleForm: {
        name: '',
        imgs: [],
        summary: '',
        reference: '',
        traffic: '',
        ticket: '',
        openTime: '',
      },

      rules: {
        name: [
          { required: true, message: '请输入景点名称', trigger: 'blur' },
          { max: 50, message: '最多50个字符', trigger: 'blur' }
        ],
        // imgs: [
        //   { required: true, message: '请上传图片', trigger: 'blur' },
        // ],
        summary: [
          { required: true, message: '请输入摘要', trigger: 'blur' },
        ],
      }
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

    id() {
      return this.$route.query.id
    },
  },


  created() {
    // 编辑状态
    if (this.id) {
      this._queryData(this.id)
    }
  },

  watch: {
    id(value) {
      if (!value) {
        this._reset()
      }
    },
  },

  methods: {
    _queryData(id) {
      this.loading = true
      scenic.findByID(id)
        .then(res => {
          let { data } = res
          data.name = data.title
          let { imgs } = data
          imgs.forEach(img => {
            this.fileList.push({ url: img })
          });
          this.ruleForm = data
          this.edit = true
          this.loading = false
        })
    },

    onUploadBefore() {
      if (this.ruleForm.imgs.length > 2) {
        this.$message('最多上传3张图片')
        return false;
      }
    },

    onUploadSuccess(response, file, fileList) {
      this.ruleForm.imgs.push(response.url)
    },

    onUploadRemove(file) {
      if (file.response) {
        let url = file.response.url
        let imgs = this.ruleForm.imgs
        imgs.forEach((img, i) => {
          if (img === url) {
            imgs.splice(i, 1)
          }
        });
      }

      if (file.url) {
        let url = file.url
        let imgs = this.ruleForm.imgs
        imgs.forEach((img, i) => {
          if (img === url) {
            imgs.splice(i, 1)
          }
        });
      }
    },

    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let { summary, traffic, ticket, openTime } = this.ruleForm
          this.ruleForm.summary = format(summary);
          this.ruleForm.traffic = traffic && format(traffic);
          this.ruleForm.ticket = ticket && format(ticket);
          this.ruleForm.openTime = openTime && format(openTime);

          if (this.edit) {//编辑
            scenic.update(this.$route.query.id, this.ruleForm)
              .then(res => {
                this.$message.success('更新成功')
              })
            return;
          }

          //创建
          this.ruleForm.userId = this.user.id
          scenic.create(this.ruleForm)
            .then(res => {
              this.$router.replace({ name: 'Scenic' })
            })
        } else {
          return false;
        }
      });
    },

    quitForm() {
      this.$router.back()
    },

    _reset() {
      this.ruleForm = {
        name: '',
        imgs: [],
        summary: '',
        reference: '',
        traffic: '',
        ticket: '',
        openTime: '',
      }
      this.fileList = []
      this.edit = false
    },
  },
}

function format(text) {//转换回车、空格
  return text.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
}
</script>

<style lang='scss' scoped>
.popconfirm-quit {
  margin-left: 20px;
}
</style>