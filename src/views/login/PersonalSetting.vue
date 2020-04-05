<template>
    <div class="personal-setting">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="头像" class="item-avatar">
                <div class="avatar-container">
                    <el-avatar :size="50" :src="form.avatar_url"></el-avatar>
                    <el-upload
                        :action="uploadUrl"
                        :headers="avatarHeaders"
                        :show-file-list="false"
                        :multiple="false"
                        :on-success="onAvatarSuccess"
                        :on-error="onAvatarError"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <el-link :underline="false" type="primary" @click="isChange=!isChange">修改密码</el-link>
                </div>
            </el-form-item>

            <el-form-item label="用户名：">
                <el-input v-model="form.name" maxlength="12" show-word-limit></el-input>
            </el-form-item>

            <el-form-item label="性别：">
                <el-radio-group v-model="form.gender">
                    <el-radio label="male">男</el-radio>
                    <el-radio label="female">女</el-radio>
                    <el-radio label="secret">保密</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="生日：">
                <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">更新</el-button>
            </el-form-item>
        </el-form>

        <!-- 修改密码 -->
        <div class="password-wrapper" v-show="isChange">
            <el-input v-model="oldPassword" placeholder="旧密码" type="password"></el-input>
            <el-input v-model="newPassword" placeholder="新密码" type="password"></el-input>
            <el-button type="primary" @click="changePassword">更新密码</el-button>
        </div>
    </div>
</template>

<script>
import request from './request'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            form: {
                avatar_url: '',
                name: '',
                gender: '',
                birthday: '',
            },

            oldPassword: '',
            newPassword: '',
            isChange: false,

        }
    },

    created() {
        this._queryData()

    },

    computed: {
        ...mapState([
            'user',
            'token'
        ]),

        uploadUrl() {
            return `/upload/users/${this.user.id}`
        },

        avatarHeaders() {
            return { Authorization: `Bearer ${this.token}` }
        },
    },

    methods: {
        _queryData() {
            request.findById(this.user.id)
                .then(res => {
                    this.form = res.user
                })
        },

        onSubmit() {
            request.update(this.user.id, this.form)
                .then(res => {
                    this.$message({
                        message: '更新成功',
                        type: 'success'
                    });

                    this.form = res.user
                })
        },

        changePassword() {
            let params = {
                oldPassword: this.oldPassword,
                newPassword: this.newPassword,
            }
            request.updatePassword(this.user.id, params)
                .then(res => {
                    if (res.code === 0) {
                        this.$message({
                            message: '密码已更新',
                            type: 'success'
                        });
                    }
                })
        },


        onAvatarSuccess() {
            this._queryData(this.params)
        },

        onAvatarError() {
            this.$message.error('上传失败请重试!');
        },

        beforeAvatarUpload(file) {
            const isLt10M = file.size / 1024 / 1024 <= 10;

            if (!isLt10M) {
                this.$message.error('上传头像图片大小不能超过 10MB!');
            }
            return isLt10M;
        },

    },

}

</script>

<style lang='scss' scoped>
.personal-setting {
    display: flex;
    border: 1px solid $border-color-base;
}

/deep/ {
    .el-form {
        width: 350px;
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

    .el-upload {
        margin-left: 20px;
    }
}

.password-wrapper {
    margin-top: 30px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;

    .el-input {
        margin-bottom: 20px;
    }
}
</style>
