import { MessageBox } from 'element-ui';

export default {
  // 深度拷贝
  deepCloneObject(obj) {
    if (typeof obj === 'object' && obj !== null) {
        if (obj.constructor === Array) {
            const newArr = [];
            for (let i = 0; i < obj.length; i++) {
                newArr[i] = this.deepCloneObject(obj[i]);
            }
            return newArr;
        }
            const newObj = {};
            Object.keys(obj).forEach((key) => {
                newObj[key] = this.deepCloneObject(obj[key]);
            });
            return newObj;
    }
        return obj;
  },
};


