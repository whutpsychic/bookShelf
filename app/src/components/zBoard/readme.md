# API

| props           | type      | defaultValue | 单位 | description                        |
| --------------- | --------- | ------------ | ---- | ---------------------------------- |
| defaultShow     | {Number}  | 1            |      | 默认从第几个开始显示               |
| autoScroll      | {Boolean} | true         |      | 是否自动滚动展示                   |
| scrollTime      | {Number}  | 5000         | ms   | 自动滚动展示时间间隔               |
| showNextPreBtns | {Boolean} | true         |      | 是否可显示“上一个”“下一个”按钮 |
| showSelectBtns  | {Boolean} | true         |      | 是否显示底部按钮组                 |
|                 |           |              |      |                                    |

# 使用注意
* 容器一定要有固定的大小


# 更新日志

**__v0.1.0__**

* 更新功能
 1.每次跳转将会重置下一次自动跳转时间。
 2.新增拖拽事件（支持移动端）
 
 
 