<template>
    <div class="user-manage">
        <el-table :data="tableData">
            <el-table-column prop="name" label="用户名"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
            <el-table-column prop="date" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-popconfirm title="确定删除此用户吗？" icon="el-icon-info" iconColor="red">
                        <el-button
                            slot="reference"
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import request from './request';

export default {
    data() {
        return {
            tableData: [{
                name: '王小虎',
                gender: '男',
                date: '2016-05-02',
            }]
        }
    },

    created() {
        let params = { pageIndex: 1, pageSize: 10 }
        request.findAll(params)
            .then(res => {
                let data = res.data.users
                let temp = []

                data.forEach(item => {
                    let obj = {}

                    obj.name = item.name
                    switch (item.gender) {
                        case 'male':
                            obj.gender = '男'
                            break;
                        case 'female':
                            obj.gender = '女'
                            break;
                        default:
                            obj.gender = '保密'
                            break;
                    }
                    obj.date = this.$dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')

                    temp.push(obj)
                });

                this.tableData = temp
            })
    },

    methods: {
        handleDelete(index, row) {

        },
    },

}
</script>

<style lang='less' scoped>
</style>