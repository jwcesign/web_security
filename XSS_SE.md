##  各种XSS
* <img src="#"/**/onerror=alert(/xss/) width=100>
* onload
* 对于标签属性可以构造XSS，可以用16进制数据避开过滤，有且只有标签属性。如<img src='a' onerror='&#97;&#108;&#101;&#114;&#116;&#40;&#49;&#41;'></img>
##  防御思路
* 防止构造自己的标签:replace(str,"<","&#x3C;")
* 防止来自标签属性的攻击：如<img src='none' onerror="alert(/xss/)">
* 防止来自事件的机制的威胁。如<a href=’#‘ onmouseover=“alert(/xss/)”></a>
##  网页挂马
* html挂马法，如iframe
* js挂马，如用<script src='......../a.js'>
* 
