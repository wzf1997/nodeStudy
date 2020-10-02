给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]


```
 const map=new Map()
  nums.foreach((value,index)=>{
   let  key =  map.get(target-value)
    if(  key!==undefined){
      return [ key,index]
     }else{
      map.set(value,index)
     }
  })
```
 
map  是js es6中 一种新的数据结构 一种键值对  他和对象存储的最大区别  就是对象的key 只能是字符串  但是 map 这种数据结构 可以key 可以是任意的  可以是一个数组  或者 是一个对象 甚至是dom 元素 map 也是一种构造函数  

//  map 数据结构中   key 的设置 本质上是 如果key  是基本数据类型  只要 两个值

//  严格相等的时候  -0  和 0 就是一样的    true  和”true“  就是不一样的  
//  null  和 undefined  也是不一样的   但是有一个比较特殊 就是 NaN 是表示相等的


//  复杂数据类型 比较的是内存地址  内存地址不一样 获得的value  就是不一样的 