// 在使用babel-cli的过程中，有一个 .babelrc 文件,里面可能会有这样一个配置

{
  "presets": [
    "es2015",
    "stage-0",
  ]
}

// 其中es2015表示假设我们身处es2015还没有落地的2015年，我们想要使用es2015

// 而stage-0，官方说明如下：

// stage-0 - Strawman: just an idea, possible Babel plugin. 任何TC39的成员都可以提出的草案，随时被废弃。

// stage-1 - Proposal: this is worth working on. 这是一个比较正式的提议，表示要进一步讨论

// stage-2 - Draft: initial spec. 在上一步的基础上进行尽可能详细的讨论，到了这个阶段后，只允许增量修改

// stage-3 - Candidate: complete spec and initial browser implementations. 对提案的讨论基本完成，等待用户的反馈，只有发生重大问题时才会修改

// stage-4 - Finished: will be added to the next yearly release.  经过了充分的测试，已经准备写进新标准了。

// 对babel而言，stage是向下包含的，即stage-0是包含了stage1 stage2 stage3 stage4的内容

//默认情况下，babel只转换最新的js语法，但不会转换一个新的API，如promise，iterator等，以及一些新增的对象方法array.form()等，要转换这些还要使用第三方插件babel-polyfill