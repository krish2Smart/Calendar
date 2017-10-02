/**
 * 
 */
var selectedDate;
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var renderCalendar = {
	"actionurl" : "null",
	"seturl" : function(actionurl, month_yearurl, monthurl, yearurl, prevurl, nexturl, dateurl, datelisturl) {
		renderCalendar["actionurl"] = actionurl;
		renderCalendar["month_year"]["actionurl"] = month_yearurl;
		renderCalendar["month_year"]["monthurl"] = monthurl;
		renderCalendar["month_year"]["yearurl"] = yearurl;
		renderCalendar["month_year"]["prev"]["actionurl"] = prevurl;
		renderCalendar["month_year"]["next"]["actionurl"] = nexturl;
		renderCalendar["date"]["actionurl"] = dateurl;
		renderCalendar["date"]["datelisturl"] = datelisturl;
	},
	"load" : function() {
		var HTMLContent = "<div class = \"month_year-container\" id = "+renderCalendar["month_year"]["actionurl"]+">";
		HTMLContent += "<ul>";
		HTMLContent += "<li><a href = \"#\" class = \"prev\" id = "+renderCalendar["month_year"]["prev"]["actionurl"]+">&#10094;</a></li>";
		HTMLContent += "<li><a href = \"#\" class = \"next\" id = "+renderCalendar["month_year"]["next"]["actionurl"]+">&#10095;</a></li>";
		HTMLContent += "<li class = \"content\"><span class = \"month\" id = "+renderCalendar["month_year"]["monthurl"]+"></span><br><span class = \"year\" id = "+renderCalendar["month_year"]["yearurl"]+"></span></li>"
		HTMLContent += "</ul>";
		HTMLContent += "</div>";
		HTMLContent += "<div class = \"weekdays-container\">";
		HTMLContent += "<ul>";
		HTMLContent += "<li>S</li>";
		HTMLContent += "<li>M</li>";
		HTMLContent += "<li>T</li>";
		HTMLContent += "<li>W</li>";
		HTMLContent += "<li>T</li>";
		HTMLContent += "<li>F</li>";
		HTMLContent += "<li>S</li>";
		HTMLContent += "</ul>";
		HTMLContent += "</div>";
		HTMLContent += "<div class = \"date-container\" id = "+renderCalendar["date"]["actionurl"]+"></div>";
		HTMLContent += "<div class = \"submit\">";
		HTMLContent += "<input type = \"submit\" value = \"Ok\" class = \"ok-btn\" id = \"from-ok-btn\">";
		HTMLContent += "</div>";
		var elem = document.getElementById(renderCalendar["actionurl"]);
		elem.innerHTML = HTMLContent;
	},
	"month_year" : {
		"actionurl" : "null",
		"monthurl" : "null",
		"yearurl" : "null",
		"prev" : {
			"actionurl" : "null",
			"action" : function() {
				var elem = document.getElementById(renderCalendar["month_year"]["monthurl"]);
				var month = elem.getAttribute("data-target") - 1;
				elem = document.getElementById(renderCalendar["month_year"]["yearurl"]);
				var year = elem.getAttribute("data-target");
				var date;
				if(month == 0) {
					date = new Date(year - 1, 11, 1);
				} else {
					date = new Date(year, month - 1, 1);
				}
				renderCalendar["month_year"]["load"](date);
				renderCalendar["date"]["load"](date);
			}
		},
		"next" : {
			"actionurl" : "null",
			"action" : function() {
				var elem = document.getElementById(renderCalendar["month_year"]["monthurl"]);
				var month = elem.getAttribute("data-target") - 1;
				elem = document.getElementById(renderCalendar["month_year"]["yearurl"]);
				var year = elem.getAttribute("data-target");
				var date;
				if(month == 11) {
					date = new Date(++year, 0, 1);
				} else {
					date = new Date(year, month + 1, 1);
				}
				renderCalendar["month_year"]["load"](date);
				renderCalendar["date"]["load"](date);
			}
		},
		"load" : function(date) {
			if(date === undefined)
				date = new Date();
			var curMonth = date.getMonth();
			var elem = document.getElementById(renderCalendar["month_year"]["monthurl"]);
			elem.innerText = monthNames[curMonth];
			elem.setAttribute("data-target", curMonth+1);
			var curYear = date.getFullYear();
			elem = document.getElementById(renderCalendar["month_year"]["yearurl"]);
			elem.innerText = curYear;
			elem.setAttribute("data-target", curYear);
		}
	},
	"date" : {
		"actionurl" : "null",
		"datelisturl" : "null",
		"load" : function(date) {
			if(date === undefined)
				date = new Date();
			var month = date.getMonth();
			var year = date.getFullYear();
			var today = date.getDate();
			date = new Date(year, month, 1);
			var startDay = date.getDay();
			date = new Date(year, month+1, 0);
			var lastDate = date.getDate();
			var lastDay = date.getDay();
			date = new Date();
			var curMonth = date.getMonth();
			var curDate = date.getDate();
			var curYear = date.getFullYear();
			var HTMLContent = "<ul>";
			for(i = 0; i < startDay; i++)
					HTMLContent += "<li><a href = \"#\"></a></li>";
			for(i = 1; i <= lastDate; i++) {
				if((month < curMonth && year <= curYear) || (year == curYear && month == curMonth && i < curDate) || (year < curYear)) {
						HTMLContent += "<li class = \"date-inactive\"><a>"+i+"</a></li>";
				} else if(i == today) {
					HTMLContent += "<li data-target = "+i+" class = \""+renderCalendar["date"]["datelisturl"]+" selected-date\"><a href = \"#\">"+i+"</a></li>";
					selectedDate = i;
				} else {
					HTMLContent += "<li data-target = "+i+" class = \""+renderCalendar["date"]["datelisturl"]+" unselected-date\"><a href = \"#\">"+i+"</a></li>";
				}
			}
			for(i = lastDay + 1; i <= 6; i++)
				HTMLContent += "<li><a href = \"#\"></a></li>";
			HTMLContent += "</ul>";
			var elem = document.getElementById(renderCalendar["date"]["actionurl"]);
			elem.innerHTML = HTMLContent;
			var dateValue = document.getElementsByClassName(renderCalendar["date"]["datelisturl"]);
			for(i = 0; i < dateValue.length; i++) {
				dateValue[i].addEventListener("click", function() {
					for(j = 0; j < dateValue.length; j++) {
						if(dateValue[j].classList.contains("selected-date")) {
							dateValue[j].classList.remove("selected-date");
							dateValue[j].classList.add("unselected-date");
						}
							
					}
					this.classList.remove("unselected-date");
					this.classList.add("selected-date");
				});
			}
		}
	}
}

window.addEventListener("load", loadEvents);

function loadEvents() {
	var btn = null;
	//if(document.getElementById() !== null) {
		renderCalendar["seturl"]("from-calendar-container", "from-month_year-container", "from-month-value", "from-year-value", "from-prev", "from-next", "from-date-container", "from-date-value");
		renderCalendar["load"]();
	//}
	//if(document.getElementById() !== null) {
		renderCalendar["month_year"]["load"]();
	//}
	//if(document.getElementById() !== null) {
		renderCalendar["date"]["load"]();
	//}
	if(document.getElementById(renderCalendar["month_year"]["prev"]["actionurl"]) !== null) {
		btn = document.getElementById(renderCalendar["month_year"]["prev"]["actionurl"]);
		btn.addEventListener("click", function() {
			renderCalendar["seturl"]("from-calendar-container", "from-month_year-container", "from-month-value", "from-year-value", "from-prev", "from-next", "from-date-container", "from-date-value");
			renderCalendar["month_year"]["prev"]["action"]();
		});
	}
	if(document.getElementById(renderCalendar["month_year"]["next"]["actionurl"]) !== null) {
		btn = document.getElementById(renderCalendar["month_year"]["next"]["actionurl"]);
		btn.addEventListener("click", function() {
			renderCalendar["seturl"]("from-calendar-container", "from-month_year-container", "from-month-value", "from-year-value", "from-prev", "from-next", "from-date-container", "from-date-value");
			renderCalendar["month_year"]["next"]["action"]();
		});
	}
	
	//if(document.getElementById() !== null) {
		renderCalendar["seturl"]("to-calendar-container", "to-month_year-container", "to-month-value", "to-year-value", "to-prev", "to-next", "to-date-container", "to-date-value");
		renderCalendar["load"]();
	//}
	//if(document.getElementById() !== null) {
		renderCalendar["month_year"]["load"]();
	//}
	//if(document.getElementById() !== null) {
		renderCalendar["date"]["load"]();
	//}
	if(document.getElementById(renderCalendar["month_year"]["prev"]["actionurl"]) !== null) {
		btn = document.getElementById(renderCalendar["month_year"]["prev"]["actionurl"]);
		btn.addEventListener("click", function() {
			renderCalendar["seturl"]("to-calendar-container", "to-month_year-container", "to-month-value", "to-year-value", "to-prev", "to-next", "to-date-container", "to-date-value");
			renderCalendar["month_year"]["prev"]["action"]();
		});
	}
	if(document.getElementById(renderCalendar["month_year"]["next"]["actionurl"]) !== null) {
		btn = document.getElementById(renderCalendar["month_year"]["next"]["actionurl"]);
		btn.addEventListener("click", function() {
			renderCalendar["seturl"]("to-calendar-container", "to-month_year-container", "to-month-value", "to-year-value", "to-prev", "to-next", "to-date-container", "to-date-value");
			renderCalendar["month_year"]["next"]["action"]();
		});
	}
}


