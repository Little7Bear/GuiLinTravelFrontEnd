<template>
    <div class="travel-card">
        <el-card shadow="hover">
            <div class="img-container">
                <el-image :src="cover"></el-image>
                <div class="img-cover"></div>
            </div>

            <div class="card-footer">
                <div class="footer-left">
                    <h4 class="card-title">{{title}}</h4>

                    <div class="user-container">
                        <el-avatar :size="25" :src="avatar"></el-avatar>
                        <span class="user-name">{{name}}</span>
                        <span class="date">{{date}}</span>
                    </div>
                </div>

                <div class="footer-right">
                    <div class="icon-container">
                        <i class="iconfont icon-loved"></i>
                        <span class="icon-count">{{loveCount}}</span>
                    </div>

                    <div class="icon-container">
                        <i class="iconfont icon-comment"></i>
                        <span class="icon-count">{{commentCount}}</span>
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
            title: "光脚走缅甸，见证虔诚的佛心虔诚的佛心",
            name: "团子E菲",
            date: "2020-03-02",
            cover:
                "http://photos.breadtrip.com/photo_2020_02_01_27aabfecb6aa5c2bb0781d5f144b288c.jpg?imageView/2/w/960/q/85",
            avatar:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            loveCount: 9999,
            commentCount: 536
        };
    }
};
</script>

<style lang='scss' scoped>
/deep/ {
    .el-card {
        // margin-right: 10px;
        
        &:hover {
            cursor: pointer;

            .img-cover {
                display: block;
            }
        }
    }

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

    .img-cover {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba($color: #000, $alpha: 0.3);
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
                    margin-left: auto;
                    margin-right: 5px;
                }

                .icon-loved {
                    color: red;
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
