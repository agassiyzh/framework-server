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

```bash
curl http://xxx.xxx:8080/download/:frameworkName/:version -O -J
```

### DELETE

```bash
curl -X 'DELETE' http://xxx.xxx:8080/framework/:frameworkName/:version
```

### 获取一个Framework的所有版本

```bash
curl http://xxx.xxx:8080/framework/:frameworkName
```

---

### PS

所有接口后面都可以加上`json`输出format后的json,`yaml`为yaml格式输出。但是不能同时使用。

```bash
curl http://xxx.xxx:8080/framework/:frameworkName?json
curl http://xxx.xxx:8080/framework/:frameworkName?yaml
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
