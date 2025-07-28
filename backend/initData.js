const sequelize = require('./config/database');
const BlindBox = require('./models/BlindBox');

async function initData() {
  try {
    // 同步模型
    await sequelize.sync({ force: true }); // 注意：force: true 会删除现有数据
    
    // 创建测试盲盒
    await BlindBox.create({
      name: "动漫手办盲盒",
      description: "随机获得一款动漫手办",
      price: 99,
      imageUrl: "https://img.tukuppt.com/png_preview/00/54/93/P7ki87FNea.jpg!/fw/780",
      items: [
        { name: "路飞", imageUrl: "https://cbu01.alicdn.com/img/ibank/2020/349/453/17358354943_283562059.jpg", probability: 30 },
        { name: "鸣人", imageUrl: "https://cbu01.alicdn.com/img/ibank/O1CN01NPY3nw1rmHfAVlGHB_!!2013035673-0-cib.jpg", probability: 20 },
        { name: "佐助", imageUrl: "https://cbu01.alicdn.com/img/ibank/O1CN01YQJAFX22sepO6jZD2_!!2183097176-0-cib.jpg", probability: 10 },
        { name: "悟空", imageUrl: "https://img.alicdn.com/i4/2211635673946/O1CN01AGfzEm1f1Je4F527d_!!2211635673946.jpg", probability: 40 }
      ]
    });

    console.log('初始化数据完成');
  } catch (error) {
    console.error('初始化数据失败:', error);
  } finally {
    sequelize.close();
  }
}

initData();