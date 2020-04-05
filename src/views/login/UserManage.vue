<template>
    <div class="user-manage">
        <el-table :data="tableData" v-loading="loading">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="name" label="用户名"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
            <el-table-column prop="date" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-popconfirm
                        title="确定删除此用户吗？"
                        icon="el-icon-info"
                        iconColor="red"
                        @onConfirm="onDelete(scope.row)"
                    >
                        <el-button slot="reference" size="mini" type="danger">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            @current-change="changePage"
            :current-page="params.pageIndex"
            :page-size="params.pageSize"
            :total="total"
            layout="total, prev, pager, next, jumper"
            background
        ></el-pagination>
    </div>
</template>

<script>
import request from './request';

export default {
    data() {
        return {
            tableData: [],
            params: {
                pageIndex: 1,
                pageSize: 10,
            },

            total: 0,
            loading: false,
        }
    },

    created() {
        this._queryData(this.params);
    },

    watch: {
        params: {
            deep: true,
            handler(newVal) {
                this._queryData(this.params)
            },
        },

    },

    methods: {
        _queryData(params) {
            this.loading = true
            request.findAll(params)
                .then(res => {
                    this.loading = false
                    this.total = res.total
                    let users = res.users
                    let temp = []

                    users.forEach(item => {
                        let obj = {}

                        obj.id = item.id
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
                .catch(err => {
                    this.loading = false
                })
        },

        onDelete(row) {
            this.loading = true;
            request.delete(row.id)
                .then(res => {
                    this.loading = false
                    this._queryData(this.params)
                })
                .catch(err => {
                    this.loading = false
                })
        },

        changePage(page) {
            this.params.pageIndex = page;
        },
    },

}
</script>

<style lang='scss' scoped>
/deep/ {
    .el-table {
        height: 575px;
    }

    .el-pagination {
        margin-top: 20px;
        text-align: center;
    }
}
</style>