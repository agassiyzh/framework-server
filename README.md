## API参数


| 参数名        |    必填 | 注释                         |
|:--------------|:--------------:|:-----------------------------|
| frameworkName |       ✅        | 组件名                       |
| framework     |       ✅        | framework 文件zip路径        |
| version       |       ✅        | framework 版本号             |
| changelog     |       ✅        | 本次版本的改动说明           |



## Example

### upload

```bash
curl http://xxxx.xxx:3000/upload \
  -F "frameworkName=name" \
  -F "version=0.0.1" \
  -F "changelog=这个版本改了什么" \
  -F "framework=@/framework/zip/path" \
```

### download

#### PRODUCTION环境
```bash
curl http://xxx.xxx:3000/download/:frameworkName/:version -O -J
```

### DELETE

```bash
curl -X 'DELETE' http://xxx.xxx:3000/framework/:frameworkName/:version -O -J
```


### 目录结构

```
Frameworks
├── FramewrokA
│   └── 0.0.10
│       └── FramewrokB.framework.zip
└── FramewrokB
    ├── 0.0.1
    │   └── FramewrokB.framework.zip
    └── 0.0.2
        └── FramewrokB.framework.zip
```


### TODO

- [x] 上传文件zip格式检查
- [ ] 一个首页展示
- [ ] 查询
- [ ] 删除接口
