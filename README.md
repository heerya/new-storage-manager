# new-storage-manager

> 管理存储数据的方法，利用LocalStorage和SessionStorage实现的可分组可设置过期时间的数据存储方法

## 安装
``` bash
npm install 'new-storage-manager'
yarn add 'new-storage-manager'
```
## 使用
```javascript
import StorageManager from 'new-storage-manager';
const storage = new StorageManager({expire : 10000, local : true, group : 'heyuxin'});
storage.setStore('age',22,{group:'heyuxin'})
```
## 配置参数
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| expire | 单位 秒|s 存储数据的有效时间 | Number | - | - |
| local | 选择持久存储还是暂时存储 | Boolean | true（持久存储） false（暂时存储）） | false |
| group | 该数据分配的所属组 | String | - | null（不分配） |
## 方法
### setStore
存储数据
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| key | 需要存储值的key | String | - | - |
| val | 需要存储的值 | Any | - | - |
| options | 过期时间和所属组，详见下面表格 | Object | - | null |
options参数
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| expire | 过期时间 | Number | - | - |
| group | 组名称 | String | - | - |
### getStore
获取存储的值
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| key | 指定取值的键 | String | - | - |
### clearStore
清除指定的值
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| key | 指定删除值的键 | String | - | - |
### clearGroup
清空当前组和关联到本组的所有值
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| group | 组名称 | String | - | 不填则为初始化时group的名称 |
### getGroupData
获取当前组和关联到本组的所有值
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| group | 组名称 | String | - | 不填则为初始化时group的名称 |
### clear
清除所有的存储

[github](https://github.com/heerya/new-storage-manager)
