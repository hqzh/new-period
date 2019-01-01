const { spawn } = require('child_process');
// child_process.spawn(command[, args][, options])

// command <string> 运行的命令。
// args <string[]> 参数列表。
// options <Object>

// 开一个进程运行 ls -lh /urs  只能在Linux和mac 下执行
// const ls = spawn('ls', ['-lh', '/usr']);

// windows  由此可以说明第一个参数是文件名而非命令，上面的ls在Linux下也是一个ls的可执行文件，而在Windows中并没有名为dir的可执行文件，需要通过cmd或power shell之类的工具提供执行环境
const ls = spawn('cmd', ['dir']);
// const ls = spawn('powershell', ['dir']);

ls.stdout.on('data', (data) => {
  console.log(`输出：${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`错误：${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出码：${code}`);
});

