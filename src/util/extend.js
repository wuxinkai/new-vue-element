/**
 * 数组筛选
 * @param {Object}} {item:{type:"",vla:""}}
 * @return {Array} []
 * 接收object参数，多属性之间是and关系，
1.可以直接 字段:值 等于匹配
2.可以 字段:{type,vla} 指定匹配
3.可以 字段:function() 自定义匹配
 */
Array.prototype.search = function(searchdata) {
  let t = this;
  let typefn = {
    ["包含"]: (item, val) => {
      return item.includes(val);
    },
    ["开始"]: (item, val) => {
      return item.startsWith(val);
    },
    ["结束"]: (item, val) => {
      return item.endsWith(val);
    },
    ["等于"]: (item, val) => {
      return item == val;
    },
    ["不等于"]: (item, val) => {
      return item != val;
    },
    ["大于"]: (item, val) => {
      return item > val;
    },
    ["小于"]: (item, val) => {
      return item < val;
    },
    ["大于等于"]: (item, val) => {
      return item >= val;
    },
    ["小于等于"]: (item, val) => {
      return item <= val;
    }
  };
  let data = t.filter(item => {
    return Object.keys(searchdata).every(i => {
      let { type = "等于", val = searchdata[i] } = searchdata[i];
      let fn = typefn[type];
      if (typeof val == "function") {
        return val(item[i]);
      }
      return fn(item[i], val);
    });
  });
  if (Object.keys(searchdata).length == 0) {
    data = t;
  }
  return data;
};

/**
 * 关联表 返回关联后的数据，原数据也被修改
 * @param opt [对比表，对比表字段，对应的本表字段]
 */
Array.prototype.leftJoin = function(...opt) {
  
  opt.forEach(item => {
    //新表 新表字段 原始字段
    let [newtable, newCol1, oldCol, ...other] = item;
    let newkeys = {};
    Object.keys(newtable[0]).forEach(i => {
      Object.assign(newkeys, { [i]: "" });
    });
    this.forEach(data => {
      let newdata = newtable.search({ [newCol1]: data[oldCol] });
      if (newdata && newdata.length > 0) {
        Object.assign(data, newdata[0]);
      } else {
        Object.assign(data, newkeys);
      }
    });
  });
  return this;
};

Array.prototype.getChildren = function(key, pid) {
  const newdata = [];
  const getChildren = item => {
    let thisc = this.search({ [pid]: item[key] });
    // console.log({ [pid]: item[key] })
    thisc.forEach(thisc_item => {
      const _c = getChildren(thisc_item);
      if (_c && _c.length != 0) {
        thisc_item.children = _c;
      }
    });
    return thisc;
  };
  this.forEach(item => {
    // debugger
    if (!item[pid]) {
      item.children = getChildren(item);
      newdata.push(item);
    } else if (this.search({ [key]: item[pid] }).length == 0) {
      newdata.push(item);
    }
  });
  return newdata;
};
Array.prototype.asyncFn = function() {
  return asyncSequentializer(this);
};
//顺序执行await
const asyncSequentializer = (() => {
  const toPromise = x => {
    if (x instanceof Promise) {
      // if promise just return it
      console.log("Promise :>> ", x);
      return x;
    }

    if (typeof x === "function") {
      // if function is not async this will turn its result into a promise
      // if it is async this will await for the result
      return (async () => await x())();
    }

    return Promise.resolve(x);
  };

  return list => {
    const results = [];

    return (
      list
        .reduce((lastPromise, currentPromise) => {
          return lastPromise.then(res => {
            results.push(res); // collect the results
            return toPromise(currentPromise);
          });
        }, toPromise(list.shift()))
        // collect the final result and return the array of results as resolved promise
        .then(res => Promise.resolve([...results, res]))
    );
  };
})();
