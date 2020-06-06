const ADD = 'ADD';
const DELETE = 'DELETE';
/**
 * 管理存储数据方法
 * @param
 * expire:number  单位 秒|s 存储数据的有效时间 默认 null 不限制存储时间
 * local:boolean  true ? 持久存储 : 暂时存储 默认 false 暂时存储
 * group:string   是否为该数据分配所属组 默认 null 不分配
 */
class StorageManager {

  constructor ({expire = null, local = false, group = null} = {}) {
    this.expire = expire; // 过期时间
    this.local = local; // true ? 持久存储 : 暂时存储
    this.group = group; // 所属组
    this.API = this._getAPI(local);
  }
  /**
   * 存储数据
   * @param {*} key 需要存储的key
   * @param {*} val 需要存储的值
   * @param {*} options 过期时间和所属组 以当前传入的expire 和 group 为主
   */
  setStore (key = '', val = '', options = {expire: null, group: null}) {
    if (key === '' || val === '') {
      throw new Error('参数错误');
    }
    this._set(key, val, options);
  }
  /**
   * 获取存储的值
   * @param {*} key 指定的键
   * @returns 被存储的值
   */
  getStore (key) {
    try {
      if (!key) throw new Error('参数错误');
      const data = this._getData(key);
      if (!data) return data;
      const {val, expire} = data;
      if (!expire || expire > this._timeStamp()) return val;
      // 过期的数据直接clear
      this.clearStore(key);
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  /**
   * 清除指定的值
   * @param {*} key 指定的键
   * @returns 无
   */
  clearStore (key) {
    const data = this._getData(key);
    if (!data) return true;
    this.API.removeItem(key);
    const {group} = data;
    this._deleteKeyFromGroup(key, group);
    return true;
  }
  /**
   * 清空当前组和关联到本组的所有值
   * @param {*} group 不填则为初始化时group的名称
   */
  clearGroup (group) {
    group = this._groupName(group);
    const keys = this._getData(group);
    keys && keys.forEach(key => {
      this.API.removeItem(key);
    });
    this.API.removeItem(group);
  }
  /**
   * @param {*} group 不填则为初始化时group的名称
   * @returns 被存储的值
   */
  getGroupData (group) {
    const keys = this._getData(this._groupName(group));
    return keys.map(key => {
      return {
        key,
        val: this.getStore(key)
      };
    });
  }
  /**
   * 清除所有的存储
   */
  clear () {
    this.API.clear();
  }
  // 私有方法 start
  _getData (key) {
    try {
      const data = this.API.getItem(key);
      return data ? JSON.parse(data) : data;
    } catch (err) {
      throw new Error(err);
    }
  }
  _set (key, val, {expire = null, group = null} = {}) {
    this.API.setItem(key, JSON.stringify({
      val,
      group: group ? group : this.group,
      expire: this._getExpire(expire)
    }));
    this._addKeyToGroup(key, group);
  }
  _getExpire (expire) {
    expire === null ? expire = this.expire : '';

    return expire ? this._timeStamp() + expire * 1000 : null;
  }
  _timeStamp () {
    return new Date().getTime();
  }
  _getAPI (local) {
    const {localStorage, sessionStorage} = window;
    return local ? localStorage : sessionStorage;
  }
  _addKeyToGroup (key, group) {
    this._updateGroup(key, group, ADD);
  }
  _deleteKeyFromGroup(key, group) {
    this._updateGroup(key, group, DELETE);
  }
  _updateGroup (key, group, type) {
    group = this._groupName(group);
    if (group) {
      let data = JSON.parse(this.API.getItem(group)) || [];
      if (type === ADD && !data.includes(key)) {
        data.push(key);
      } else if (type === DELETE) {
        data = data.filter(item => item != key);
      }
      this.API.setItem(group, JSON.stringify(data));
    }
  }
  _groupName (group) {
    group = group || this.group;
    if (!group) throw new Error('缺少参数group');
    return `${group}-storageManagerGroupName`;
  }
  // 私有方法 end
}
export default  StorageManager;
