#!/usr/bin/env python
#This script can let you get the dominant name of one ip 
import requests
from bs4 import BeautifulSoup 
import sys

if len(sys.argv) < 2:
	print '[*] Help: scripy.py dominant/ip ...'
else:
	payload = {'q':str(sys.argv[1])}
	header = {'host':'reverseip.domaintools.com','connection':'keep-alive','cache-control':'max-age=0','user-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36'}

	res = requests.get("http://reverseip.domaintools.com/search/",params=payload,headers=header)
	code = BeautifulSoup(res.text,"html.parser")
	print ' '*24+'RESULT'
	print '-'*50
	print ' '*4+'[*]'+' Search:'+sys.argv[1]
	fi = code.find_all("td", class_="ip-domain-col")
	count = 1
	for i in fi:
		print ' '*4+'[*] '+str(count)+': '+i.text
		count += 1
	print '-'*50
