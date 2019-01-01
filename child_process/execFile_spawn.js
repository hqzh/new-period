const {exec,spawn} = require('child_process');

//example是使用C语言编写的一个hello world程序，在mac平台下使用GCC编译，在windows上运行下面的代码可能会出现错误
const child = exec('example', (error, stdout, stderr) => {
    if (error) {
        throw error;
    }
    console.log(stdout);
});

// 使用spawn写法
const ls = spawn('example');

ls.stdout.on('data',function (data) {
    console.log('stdout:',data.toString())
})

ls.stderr.on('data',function (data) {
    console.log('stderr:',data.toString())
})

ls.on('close',function (code) {
    console.log('child process exited with code :', code)
})