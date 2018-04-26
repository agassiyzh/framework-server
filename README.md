## API参数


| 参数名        | DEVELOPMENT必填 | PRODUCTION必填 | 注释                         |
|:--------------|:---------------:|:--------------:|:-----------------------------|
| environment   |        ✅        |       ✅        | `DEVELOPMENT` / `PRODUCTION` |
| frameworkName |        ✅        |       ✅        | 组件名                       |
| framework     |        ✅        |       ✅        | framework 文件zip路径        |
| version       |        ❌        |       ✅        | framework 版本号             |
| changelog     |        ❌        |       ✅        | 本次版本的改动说明           |
| featureName   |        ✅        |       ❌        | 正在开发的分支名             |
| commitHash    |        ✅        |       ❌        | git 的commit hash ID         |


## Example

### upload

```bash
curl http://xxxx.xxx:3000/upload \
  -F "frameworkName=name" \
  -F "version=0.0.1" \
  -F "environment=PRODUCTION" \
  -F "changelog=这个版本改了什么" \
  -F "featureName=report" \
  -F "environment=PRODUCTION" \
  -F "framework=@/framework/zip/path" \
  -F "commitHash=xxxxxxx"
```

### download

#### PRODUCTION环境
```bash
curl http://xxx.xxx:3000/getframework/PRODUCTION/:frameworkName/:version -O -J
```

#### DEVELOPMENT环境
```bash
curl http://xxx.xxx:3000/getframework/DEVELOPMENT/:frameworkName/:featureName/:commitHash -O -J
```

### DELETE

```bash
# PRODUCTION环境
curl -X 'DELETE' http://xxx.xxx:3000/deleteframework/PRODUCTION/:frameworkName/:version -O -J
```

```bash
# DEVELOPMENT环境
curl -X 'DELETE' http://xxx.xxx:3000/deleteframework/DEVELOPMENT/:frameworkName/:featureName/:commitHash -O -J
```


### 目录结构

```
frameworks/
├── DEVELOPMENT
│   └── frameworkName
│       └── featureName
│           └── commitHash.framework.zip
├── PRODUCTION
│   └── frameworkName
│       └── version
│           └── frameworkName.framework.zip
└── db.sqlite3
```


### TODO

- [x] 上传文件zip格式检查
- [ ] 一个首页展示
- [ ] 查询
- [ ] 删除接口
