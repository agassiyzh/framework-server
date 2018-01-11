## API参数

| 参数名        | 是否可选            | 注释                         |
|:--------------|:--------------------|:-----------------------------|
| version       | PRODUCTION必须      | framework 版本号             |
| featureName   | DEVELOPMENT环境必须 | 正在开发的分支名             |
| frameworkName | 必须                | 组件名                       |
| changelog     | PRODUCTION必须      | 在PRODUCTION环境必须要添加   |
| environment   | 必须                | `DEVELOPMENT` / `PRODUCTION` |
| framework     | 必须                | framework 文件zip路径        |
| commitHash    | DEVELOPMENT环境必须 | DEVELOPMENT环境必须要添加    |

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
wget http://xxx.xxx:3000/getframework/PRODUCTION/:frameworkName/:version
```

#### DEVELOPMENT环境
```
wget http://xxx.xxx:3000/getframework/DEVELOPMENT/:frameworkName/:commitHash
```


### 目录结构

```
frameworks/
├── DEVELOPMENT
│   └── frameworkName
│       └── featureName
│           └── commitHash.framework.zip
└── PRODUCTION
    └── frameworkName
        └── version
            └── frameworkName.framework.zip
```
