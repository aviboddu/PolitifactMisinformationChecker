//content.js

$('*:not(:has(*:not(:empty)))').each(async function(index) {
	//Builds and changes the HTML for every leaf of the DOM (excluding empty nodes)
	htmlText = await buildHTML(splitText($(this).text().toString()));
	$(this).html(htmlText);
});

function splitText(t) {
	//Splits the text into sentences.
	var regex = new RegExp("(?<=[.!?:])\s");
    return t.split(regex);
}

async function buildHTML(textArray) {
	//Builds the new HTML with CSS, etc. based on the misinformation type from the server
	if(!textArray) {
		return "";
	}
	var c;
	for(c = 0; c < textArray.length; c++) {
		if(!textArray[c].includes("{")) {
			var URL = 'https://politifactmisinformation.herokuapp.com/query?s=' + encodeURI(textArray[c]);
			var misinformationType = await ajaxCall(URL);
			if(misinformationType && misinformationType["items"][0]) {
				switch(misinformationType["items"][0].type) {
					case 0:
						textArray[c] = "<a href=\"" + misinformationType["items"][0].url + "\" style=\"color:#FF0000\">"+ textArray[c] + "</a>";
						break;
					case 1:
						textArray[c] = "<a href=\"" + misinformationType["items"][0].url + "\" style=\"color:#FFA500\">"+ textArray[c] + "</a>";
						break;
					case 2:
						textArray[c] = "<a href=\"" + misinformationType["items"][0].url + "\" style=\"color:#FFFF00\">"+ textArray[c] + "</a>";
						break;
					case 3:
						textArray[c] = "<a href=\"" + misinformationType["items"][0].url + "\" style=\"color:#FF009A\">"+ textArray[c] + "</a>";
						break;
					case 4:
						textArray[c] = "<a href=\"" + misinformationType["items"][0].url + "\" style=\"color:#00FFDE\">"+ textArray[c] + "</a>";
						break;
					case 5:
						textArray[c] = "<a href=\"" + misinformationType["items"][0].url + "\" style=\"color:#00FF00\">"+ textArray[c] + "</a>";
						break;
				}
			}
		}
	}
	return textArray.join("");
}

async function ajaxCall(URL) {//Sends the request to the server
//The use of await and async everywhere is inspired from this article: https://petetasker.com/using-async-await-jquerys-ajax
	let result;
	try {
		result = await $.ajax(URL,{type:'GET'});
		return result;
	} catch (error) {
		console.error(error);
	}
}

//These are used to handle the server's ajax calls for sites like Twitter.
//The idea is from this medium article: https://medium.com/@aidobreen/fixing-twitter-with-a-chrome-extension-1f53320f5a01
function modify() {
	$('*').bind('DOMSubtreeModified.event1',DOMModificationHandler);
}

function DOMModificationHandler(){
    $(this).unbind('DOMSubtreeModified.event1');
    setTimeout(function(){
        modify();
        $('*').bind('DOMSubtreeModified.event1',
                                   DOMModificationHandler);
    },10);
}
$('*').bind('DOMSubtreeModified.event1',DOMModificationHandler);