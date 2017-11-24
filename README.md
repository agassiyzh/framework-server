## API参数

| 参数名        | 是否可选 | 注释                         |
|:--------------|:---------|:-----------------------------|
| version       | Yes      | framework 版本号             |
| featureName   | No       | 正在开发的分支名             |
| frameworkName | Yes      | 组件名                       |
| changelog     | No       |                              |
| environment   | Yes      | `DEVELOPMENT` / `PRODUCTION` |
| framework     | Yes      | framework 文件zip路径        |

## Example

### upload

```bash
curl http://xxxx.xxx:3000/upload -F "frameworkName=name" \
  -F "version=0.0.1" \
  -F "environment=PRODUCTION" \
  -F "changelog=这个版本改了什么" \
  -F "" \
  -F "" \
  -F "framework=@/framework/zip/path" \
```

### download

```bash
wget http://xxx.xxx:3000/:env/:frameworkName/:version
```
