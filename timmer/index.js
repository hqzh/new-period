// 差异，和字面意思相反。
process.nextTick(function (params) {
  // 先执行
  console.log(111)
})

setImmediate(function (params) {
  // 后执行
  console.log('你是',params)
}, 'zhangsan')

function recurse(i) {
  while (i < 99999999999999) {
    //不报错，因为没有生成call stack
    setImmediate(recurse,i++)
    //报错
    // process.nextTick(recurse(i++))
    console.log(i)

  } 
}

recurse(0)