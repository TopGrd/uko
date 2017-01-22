# 自己尝试写的一个MVC框架  
* MVC模式，数据单向绑定 `<div>{{book}}</div>`,model里的store更改通知视图更新。
* 路由控制，通过hash路由控制页面模板. 路由改变，ajax请求对应的模板

# example(可参考demo)
```js
  let data = {food: 'apple'};
  // 定义MVC
  let FoodModel = new Model(data);
  let FoodView = new View();
  let FoodCtr = new Controller(FoodModel, FoodView);
  // 同理可定义UserCtr
  // 添加路由
  let router = [
    {
      // path  在a标签里为 #/index模式
      url: 'index',
      // template food.uko
      view: 'index',
      controller: FoodCtr,
    }, {
      url: 'user',
      view: 'user',
      controller: UserCtr,
    }
  ];
  uko.start({router: router});
```
