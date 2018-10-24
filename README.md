# ZhongArt on Next

## How to dev

CMD

```bash
npm run dev
```
本地 PC :[localhost:3000/](http://localhost:3000/):
mac :[169.254.208.117:3000/](http://169.254.208.117:3000/) , 网线局域网在本地console 

```bash
ipcnfig
Ethernet adapter Ethernet:
.....
Autoconfiguration IPv4 Address. . : 169.254.208.117
```

递交
```bash
*递交开发版本*
npm run pushdev
```



## 输出
文件自动输出到 out 目录

```bash

npm run pushsito
# 递交问题查看是否在Git Bash 控制台执行

#----- 如果递交失败,在out文件夹中
git reset --hard
// 或者
git pull

#----- ？？？其他
npm run prestart
npm run preexport

```



## Next step


更新 nextjs 到 6+
更新 next-redux-wrapper 到 2.0+
更新 redux 到 4.0.0+
修复 更新后 的cross-env 失败
