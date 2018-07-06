<template lang="pug">
  .project-main
    .project-interface-list
      .project-interface-list-title
        span 接口列表：
      .project-interface-list-table
        el-table.interface-table(:data='interfaceData.list',stripe)
          el-table-column(label='序号',type='index')
          el-table-column(label='接口ID',prop='id',min-width='60')
          el-table-column(label='接口名称',prop='name',min-width='100',show-overflow-tooltip)
          el-table-column(label='Method',prop='method',min-width='70')
          el-table-column(label='URL',prop='path',min-width='180',show-overflow-tooltip)
          el-table-column(label='Content-type',prop='contentType',min-width='150',show-overflow-tooltip)
          el-table-column(label='描述',prop='remarks',min-width='180',show-overflow-tooltip)
          el-table-column(label='创建人',prop='creatorName',min-width='80')
          el-table-column(label='创建时间',prop='createTime',min-width='100')
            span(slot-scope='scope') {{ scope.row.createTime | formatDate('YYYY-MM-DD') }}
          el-table-column(label='操作',min-width='120',align='center')
            template(slot-scope='scope')
              el-button(type='text',icon='el-icon-edit',title='编辑',v-if='canEdite(scope.row)',@click='$router.push("/project/interface/edite/"+scope.row.id)')
              el-button(type='text',icon='el-icon-delete',title='删除',v-if='canEdite(scope.row)',@click='$emit("delete",scope.row)')
              el-button(type='text',icon='el-icon-view',title='查看详情',@click='$router.push("/project/interface/detail/"+scope.row.id)')
    .project-interface-pagination(v-if='interfaceData.total')
      el-pagination(layout="total, prev, pager, next,sizes, jumper",@size-change='sizeChange',:page-sizes="[10, 20, 30, 40]",:page-size="search.size",:current-page.sync="search.currentPage",:total="interfaceData.total")
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  props: ['isEdite', 'search'],
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'interfaceData',
    ]),
  },
  methods: {
    sizeChange(size) {
      this.search.size = size;
    },
    canEdite(row) {
      return this.isEdite && row.power > 1;
    },
  },
};
</script>
<style lang="scss">
.project-main{
  .project-interface-list{
    background: $white;
    border: 1px solid $border;
    border-radius: $borderRadius;
    .project-interface-list-title{
      padding:10px 20px;
      border-bottom: 1px solid $border;
      font-size: $normalFont;
    }
    .project-interface-list-table{
      padding: 10px 20px;
      .el-button{
        padding: 0;
        font-size: $bigFont;
        .el-icon-delete{
          color: $red;
        }
        .el-icon-view{
          color: $black;
        }
      }
    }
  }
  .project-interface-pagination{
    background: $white;
    border: 1px solid $border;
    border-radius: $borderRadius;
    padding: 20px;
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
