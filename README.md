# JS-Reverse
## JS逆向 记录
### 不同网站的登录，其密码的加密形式，涉及 RSA，AES，DES，MD5，Sha1
### 使用方法 ，调用每个文件中的最后一个getPass函数，传入相应的密码，返回加密后的密码，推荐使用nodejs运行： 
```
node xxxxx.js 
```
#### 如果需要打印输出结果，可以在每一个文件后面添加一行 
```console.log(getPass('123456'));
```
 即可。 如果有其他参数，可能是RSA的公钥，在浏览器的返回值获取即可。

 ### 文件汇总：
- https://store.steampowered.com/ Steam游戏平台登录
- http://www.csti.cn/index.htm 重庆科技资源共享平台
- http://yhz566.com/ 一号站
- https://www.yy.com/ 歪歪语音
- https://zp.job5156.com/ 智聘通
- https://www.renren.com/ 人人网
- https://account.wps.cn/ 金山WPS
- https://jisilu.cn 集思录



如有更多逆向探讨，可以加QQ群： 759746505
