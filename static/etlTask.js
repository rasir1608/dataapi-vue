const etlTaskInfo = {
    id: 1,
    appId: 1,
    'name|5-10': 'SGS',
    'remark|5-20': 'OLSGSLAE',
    taskType: 'ETL', //任务类型
    cycleType: 'DYA', //调度周期
    cycleTime: { //调度时间 year mounth day week hour minute 
      'hour|0-23': 1,
      'minute|0-59': 30,
    },
    createTime: 1528168189284, //长整型数据
    modifyTime: 1528168189284, //长整型数据
    isUse: true, //是否冻结状态
    owner: { //创建人信息包含id和name
      id: 10001,
      name: '雷文俊',
    },
    'priority|0-4': 1, //优先级
    'retryTimes|0-5': 3, //重试次数
    'retryInterval|1': [5, 10, 15, 30, 60], //间隔时间
    etlInfo: {
      srcCfg: { //源表配置
        ds: {
          id: 10, //数据源ID
          name: 'srcDsname', //数据源名称
        },
        database: 'srcdbname', //数据库或者命名空间名称
        table: 'srctablename', //表名
        'columns|8': [{
          name: 'srccolumn1', //字段名
          type: 'vachar2', //字段类型
          nameHint: '', //字段名称被从表中修改
          typeHint: '', //字段类型被从表中修改
        }],
        type: 2,
        splitPk: '',
        whereSql: '', //数据过滤
        initData: 1528168189284, //全量拉取时间初始化时间
      },
      destCfg: { //目标表配置
        ds: {
          id: 1, //数据源ID
          name: 'destdsname', //数据源名称
        },
        database: 'destdbname', //数据库或者命名空间名称
        table: 'desttablename', //表名
        'columns|10': [{
          name: 'destcolumn1', //字段名
          columnfa: 'cf1', //hbase的列族
          type: 'vachar2', //字段类型
          nameHint: '', //字段名称被从表中修改
          typeHint: '', //字段类型被从表中修改
        }],
        type: 6,
        rowkeyColumn: [],
        path: '', //hdfs 填写的目标地址
        mode: '', //hbase模式 noraml
        writeMode: '', //清理规则|冲突规则  replace|insert
      },
      columnLen: 2, //用户实际配置的字段数量
      destColumnfamily: ['fa1', 'fa2', 'fa3', 'fa4', 'fa5'], //hbase中所有的列族
      srcColumnNameOptions: ['srccolumn1', 'srccolumn2', 'srccolumn3', 'srccolumn4', 'srccolumn5', 'srccolumn6', 'srccolumn7', 'srccolumn8'], //源表中所有字段集合
      destColumnNameOptions: ['destcolumn11', 'destcolumn12', 'destcolumn13', 'destcolumn14', 'destcolumn15', 'destcolumn16', 'destcolumn17', 'destcolumn18', 'destcolumn19', 'destcolumn10'], //目标表中所有字段集合
    },
};

const responseTaskInfo = {
  id: 1,
  appId: 1,
  'name|5-10': 'SGS',
  'remark|5-20': 'OLSGSLAE',
  taskType: 'ETL', //任务类型
  cycleType: 'DYA', //调度周期
  cycleTime: { //调度时间 year mounth day week hour minute 
    'hour|0-23': 1,
    'minute|0-59': 30,
  },
  createTime: 1528168189284, //长整型数据
  modifyTime: 1528168189284, //长整型数据
  isUse: true, //是否冻结状态
  owner: { //创建人信息包含id和name
    id: 10001,
    name: '雷文俊',
  },
  'priority|0-4': 1, //优先级
  'retryTimes|0-5': 3, //重试次数
  'retryInterval|1': [5, 10, 15, 30, 60], //间隔时间
  etlInfo: {
    appId: 1,
    createTime: 1527177600000,
    creator: '80002790',
    srcDatasourceId: 53,
    srcTable: 'ecs.address',
    destDatasourceId: 4815,
    destTable: 'mon.extra_info',
    etlJobContent: '"{"destCfg":{"column":[{"columnfa":"cf","comment":"地址ID","index":0,"name":"id","nullable":true,"partition":false,"primaryKey":false,"type":"long"},{"columnfa":"cf","comment":"联系人","index":1,"name":"contact","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"省份","index":2,"name":"province","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"市","index":3,"name":"city","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"区(县)","index":4,"name":"district","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"详细住址","index":5,"name":"address","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"联系电话","index":6,"name":"phone","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"手机","index":7,"name":"mobile","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"邮政编码","index":8,"name":"zip_code","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"是否默认地址  0 否,1 是","index":9,"name":"default_flag","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"地址类型(0 收货地址,1 发货地址,2 退货地址)","index":10,"name":"type","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"创建时间","index":11,"name":"create_date","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"创建人","index":12,"name":"creator","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"最后修改时间","index":13,"name":"modify_date","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"修改人","index":14,"name":"modifier","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"会员编号","index":15,"name":"member_no","nullable":true,"partition":false,"primaryKey":false,"type":"long"},{"columnfa":"cf","comment":"会员类型(1 商家；2 买家)","index":16,"name":"member_type","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"城市编码","index":17,"name":"city_code","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"自定义1","index":18,"name":"ext1","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"自定义2","index":19,"name":"ext2","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"自定义3","index":20,"name":"ext3","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"公司名称","index":21,"name":"company_name","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"columnfa":"cf","comment":"身份证","index":22,"name":"card_id","nullable":true,"partition":false,"primaryKey":false,"type":"string"}],"columnLen":23,"columnfamily":["cf"],"ds":[{"drName":"hbase测试","dsId":[4815],"table":["mon.extra_info"]}],"mode":"normal","rowkeyColumn":[{"index":4,"type":"string"},{"index":5,"type":"string"},{"index":6,"type":"string"}],"type":6,"writeMode":"truncate"},"srcCfg":{"column":[{"comment":"地址ID","index":0,"name":"id","nullable":true,"partition":false,"primaryKey":false,"type":"bigint"},{"comment":"联系人","index":1,"name":"contact","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"省份","index":2,"name":"province","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"市","index":3,"name":"city","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"区(县)","index":4,"name":"district","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"详细住址","index":5,"name":"address","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"联系电话","index":6,"name":"phone","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"手机","index":7,"name":"mobile","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"邮政编码","index":8,"name":"zip_code","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"是否默认地址  0 否,1 是","index":9,"name":"default_flag","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"地址类型(0 收货地址,1 发货地址,2 退货地址)","index":10,"name":"type","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"创建时间","index":11,"name":"create_date","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"创建人","index":12,"name":"creator","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"最后修改时间","index":13,"name":"modify_date","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"修改人","index":14,"name":"modifier","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"会员编号","index":15,"name":"member_no","nullable":true,"partition":false,"primaryKey":false,"type":"bigint"},{"comment":"会员类型(1 商家；2 买家)","index":16,"name":"member_type","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"城市编码","index":17,"name":"city_code","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"自定义1","index":18,"name":"ext1","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"自定义2","index":19,"name":"ext2","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"自定义3","index":20,"name":"ext3","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"公司名称","index":21,"name":"company_name","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"身份证","index":22,"name":"card_id","nullable":true,"partition":false,"primaryKey":false,"type":"string"},{"comment":"","index":23,"name":"pt_month","nullable":true,"partition":true,"type":"string"},{"comment":"","index":24,"name":"pt_date","nullable":true,"partition":true,"type":"string"}],"decrpt":[],"ds":[{"drName":"77.200","dsId":[53],"table":["ecs.address"]}],"encrpt":[],"partition":{"pt_date":"$[time(yyyyMMdd,-1d)]","pt_month":"$[time(yyyyMMdd,-1d)]"},"splitPk":"mobile","type":5}}"',
    modifier: '80002790',
    modifyTime: 1527177600000,
  },
};

const oldEtlInfo = {
  destCfg: {
    column: [
        {
            columnfa: 'cf',
            comment: '地址ID',
            index: 0,
            name: 'id',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'long',
        },
        {
            columnfa: 'cf',
            comment: '联系人',
            index: 1,
            name: 'contact',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '省份',
            index: 2,
            name: 'province',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '市',
            index: 3,
            name: 'city',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '区(县)',
            index: 4,
            name: 'district',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '详细住址',
            index: 5,
            name: 'address',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '联系电话',
            index: 6,
            name: 'phone',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '手机',
            index: 7,
            name: 'mobile',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '邮政编码',
            index: 8,
            name: 'zip_code',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '是否默认地址  0 否,1 是',
            index: 9,
            name: 'default_flag',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '地址类型(0 收货地址,1 发货地址,2 退货地址)',
            index: 10,
            name: 'type',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '创建时间',
            index: 11,
            name: 'create_date',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '创建人',
            index: 12,
            name: 'creator',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '最后修改时间',
            index: 13,
            name: 'modify_date',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '修改人',
            index: 14,
            name: 'modifier',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '会员编号',
            index: 15,
            name: 'member_no',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'long',
        },
        {
            columnfa: 'cf',
            comment: '会员类型(1 商家；2 买家)',
            index: 16,
            name: 'member_type',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '城市编码',
            index: 17,
            name: 'city_code',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '自定义1',
            index: 18,
            name: 'ext1',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '自定义2',
            index: 19,
            name: 'ext2',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '自定义3',
            index: 20,
            name: 'ext3',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '公司名称',
            index: 21,
            name: 'company_name',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            columnfa: 'cf',
            comment: '身份证',
            index: 22,
            name: 'card_id',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
    ],
    columnLen: 23,
    columnfamily: [
        'cf',
    ],
    ds: [
        {
            drName: 'hbase测试',
            dsId: [
                4815,
            ],
            table: [
                'mon.extra_info',
            ],
        },
    ],
    mode: 'normal',
    rowkeyColumn: [
        {
            index: 4,
            type: 'string',
        },
        {
            index: 5,
            type: 'string',
        },
        {
            index: 6,
            type: 'string',
        },
    ],
    type: 6,
    writeMode: 'truncate',
  },
  srcCfg: {
    column: [
        {
            comment: '地址ID',
            index: 0,
            name: 'id',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'bigint',
        },
        {
            comment: '联系人',
            index: 1,
            name: 'contact',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '省份',
            index: 2,
            name: 'province',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '市',
            index: 3,
            name: 'city',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '区(县)',
            index: 4,
            name: 'district',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '详细住址',
            index: 5,
            name: 'address',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '联系电话',
            index: 6,
            name: 'phone',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '手机',
            index: 7,
            name: 'mobile',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '邮政编码',
            index: 8,
            name: 'zip_code',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '是否默认地址  0 否,1 是',
            index: 9,
            name: 'default_flag',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '地址类型(0 收货地址,1 发货地址,2 退货地址)',
            index: 10,
            name: 'type',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '创建时间',
            index: 11,
            name: 'create_date',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '创建人',
            index: 12,
            name: 'creator',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '最后修改时间',
            index: 13,
            name: 'modify_date',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '修改人',
            index: 14,
            name: 'modifier',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '会员编号',
            index: 15,
            name: 'member_no',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'bigint',
        },
        {
            comment: '会员类型(1 商家；2 买家)',
            index: 16,
            name: 'member_type',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '城市编码',
            index: 17,
            name: 'city_code',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '自定义1',
            index: 18,
            name: 'ext1',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '自定义2',
            index: 19,
            name: 'ext2',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '自定义3',
            index: 20,
            name: 'ext3',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '公司名称',
            index: 21,
            name: 'company_name',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '身份证',
            index: 22,
            name: 'card_id',
            nullable: true,
            partition: false,
            primaryKey: false,
            type: 'string',
        },
        {
            comment: '',
            index: 23,
            name: 'pt_month',
            nullable: true,
            partition: true,
            type: 'string',
        },
        {
            comment: '',
            index: 24,
            name: 'pt_date',
            nullable: true,
            partition: true,
            type: 'string',
        },
    ],
    decrpt: [],
    ds: [
        {
            drName: '77.200',
            dsId: [
                53,
            ],
            table: [
                'ecs.address',
            ],
        },
    ],
    encrpt: [],
    partition: {
        pt_date: '$[time(yyyyMMdd,-1d)]',
        pt_month: '$[time(yyyyMMdd,-1d)]',
    },
    splitPk: 'mobile',
    type: 5,
  },
};
console.log(etlTaskInfo, responseTaskInfo, oldEtlInfo);