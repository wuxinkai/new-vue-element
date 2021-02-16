import Mock from 'mockjs';

var Assets = [];

function getRandom(arr) {
  var len = arr.length;
  var i = Math.ceil(Math.random() * (len)) % len;
  return arr[i];
}

for (let i = 0; i < 100; i++) {
  Assets.push(Mock.mock({
    id: i + 1,
    ASSET_A1_30: `0000${i + 1}`,
    ASSET_A1_20: getRandom(["电脑", "纸", "笔", '橡皮', '铅笔橡皮']),
    ASSET_A1_AUTOID: Math.floor(Math.random() * 1000),
    ASSET_A1_50: Math.floor(Math.random() * 1000),
    ASSET_A1_60: Math.floor(Math.random() * 1000),
    strASSET_A1_60: "",
    ASSET_A1_10: Math.floor(Math.random() * 10),
    ASSET_A1_280: Math.floor(Math.random() * 10000),
    strASSET_A1_280: "",
    ASSET_A1_100: Math.floor(Math.random() * 100),
    strASSET_A1_100: getRandom(["财务部仓库", "销售部仓库", "产品部仓库", "研发部仓库"]),
    ASSET_A1_160: Math.floor(Math.random() * 100),
    strASSET_A1_160: getRandom(["戴尔", "华为", "小米", "联想"]),
    ASSET_A1_180: Math.floor(Math.random() * 1000),
    strASSET_A1_180: getRandom(["戴尔", "华为", "小米", "联想"]),
    ASSET_A1_120: Math.floor(Math.random() * 1000),
    ASSET_A1_400: Mock.Random.date(),
    ASSET_A1_220: Math.floor(Math.random() * 10),
    strASSET_A1_220: getRandom(["研发部", "产品部", "销售部", '财务部']),
    ASSET_A1_210: getRandom(["陈工", "徐工", "王工"]),
    ASSET_A1_350: getRandom(["线上测试", "线下测试"]),
    ASSET_A1_360: getRandom(["戴尔", "华为", "小米", "联想"]),
    ASSET_A1_150: getRandom(["京东", "天猫", "拼多多"]),
    ASSET_A1_370: Math.floor(Math.random() * 10),
    ASSET_A1_390: Math.floor(Math.random() * 10)
  }));
}



export { Assets };
