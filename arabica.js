window.onload = function(){
    var phoneticResultDiv = document.getElementById('phonetic-result');
    var resultDiv = document.getElementById('result');
    var arabicText = '';

    var sourceTextArea = document.getElementById('source-text');


    var updateText = function(){
	var src = sourceTextArea.value;
	src = src.replaceAll('i', 'і');
	var p = cyrillicToPhonetic(src);
	arabicText = phoneticToArabic(p);
	resultDiv.innerHTML = arabicText;
    };
    
    sourceTextArea.onkeyup = updateText;
    sourceTextArea.onfocus = function(){
	sourceTextArea.select();
    };

    resultDiv.onclick = function(){
	var range = document.createRange();
	range.setStart(resultDiv, 0);
	range.setEnd(resultDiv, 1); 	
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(range);
    }

    document.getElementById('btn-copy').onclick = function(){
	navigator.clipboard.writeText(arabicText);
    };
    updateText();

    function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
    }
    
    async function downloadSVG(){
	const font = await opentype.load('fonts/Scheherazade-Bold.ttf');
	const path = font.getPath(arabicText, 0, 150, 72);
	const bb = path.getBoundingBox();
	const svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="'+bb.x1 + ' ' + bb.y1 +' '+(bb.x2-bb.x1)+' '+(bb.y2-bb.y1)+'">' + path.toSVG() + '</svg>';
	download('arabica.svg', svg);
    }
    document.getElementById('btn-download-svg').onclick = downloadSVG;

};

