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
};

