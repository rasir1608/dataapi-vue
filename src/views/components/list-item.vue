<template lang="pug">
    .list-item-wrap
        .list-item
            .item-title
                | {{item.projectName}}
            .item-main
                | {{item.remarks}}
            .item-footer
                .form-item-5
                    .label 创建人：
                    .input {{item.creatorName}}
                .form-item-5
                    .label 创建时间：
                    .input {{item.createTime}}
        .list-item-cover
            .list-item-btns
                span(@click='$emit("apply")',v-if='canApply(item)') 申请
                span(@click='$router.push("/project/edite/"+item.projectId)',v-if='item.power > 1') 编辑
                span(@click='$emit("delete")',v-if='item.power === 5') 删除
                span(@click='$router.push("/project/detail/"+item.projectId)') 查看
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            default() {
                return {
                    projectName: '项目1',
                    remarks: ' 此处为项目描述：项目描述',
                    creator: 'rasir',
                    createTime: '2018-06-30',
                    power: '',
                };
            },
        },
    },
    data() {
        return {
            
        };
    },
    methods: {
      canApply(item) {
        return !/^\d$/.test(item.power);
      },
    },
};
</script>

<style lang="scss">
    .list-item-wrap{
        width:200px;
        height: 300px;
        border-radius: $borderRadius;
        background: $border;
        padding: 5px;
        position: relative;
        margin: 10px;
         &:hover{
            .list-item-cover{
                display: flex;
            }
        }
        .list-item{
            height: 100%;
            width: 100%;
            border-radius: $borderRadius;
            background: $white;
            border: 1px solid $border;
            display: flex;
            flex-direction: column;
            .item-title{
                text-align: center;
                font-size: $textFont;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid $border;
            }
            .item-main{
                flex: 1;
                text-indent: 2em;
                padding: 5px;
            }
            .item-footer{
                height: 50px;
                display: flex;
                align-items: center;
                flex-direction: column;
                border-top: 1px solid $border;
                padding: 0 5px;
                .form-item-5{
                    min-width: initial;
                    padding: 0;
                }
            }
        }
        .list-item-cover{
            position: absolute;
            z-index: 100;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: rgba(0,0,0,0.3);
            display: none;
            align-items: center;
            justify-content: center;
            .list-item-btns{
                display: flex;
                span{
                    width: 50px;
                    height: 50px;
                    margin: 5px;
                    border-radius: 50%;
                    background: $pr;
                    color:$white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    &:hover{
                        background: #66b1ff;
                    }
                }
            }
        }
    }
</style>
