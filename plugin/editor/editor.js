(function(){
	
var codes = document.getElementsByTagName('code');
for (var i = codes.length - 1; i >= 0; --i) {
	var codeTag = codes[i];
	if (!codeTag.classList.contains('live')) {
		continue;
	}

	var code = codeTag.textContent;

	code = code.replace(/\t/g, '    ');

	while (code[0] == '\n') {
		code = code.substring(1);
	}

	var indent = '';
	while (code[indent.length] == ' ') {
		indent += ' ';
	}
	code = code.replace(new RegExp('\n' + indent, 'g'), '\n').trim();

	if (code.substring(0, 2) == '#\n') {
		code = code.substring(2);
	}

	console.log(code);

	var no_exec = codeTag.classList.contains('no-exec');
	var pdf_exec = codeTag.classList.contains('pdf-exec');

	if (pdf_exec && window.location.search.indexOf('print-pdf') != -1) {
		no_exec = false;
	}

	var lang =
			codeTag.classList.contains('cpp') ? 'c_cpp' :
			codeTag.classList.contains('rust') ? 'rust' :
			'rust';
	var iframe = document.createElement('iframe');
	iframe.classList.add('code');
	iframe.setAttribute('src', '/web.html');

	var width = codeTag.getAttribute("width");
	if (width) iframe.style.width = width;

	var height = codeTag.getAttribute("height");
	if (height) iframe.style.height = height;

	codeTag.parentElement.replaceChild(iframe, codeTag);
	(function(lang, code, no_exec) {
		iframe.contentWindow.addEventListener('DOMContentLoaded', function() {
			var editor = this.init(lang, code, no_exec);

			/*
    		var newHeight = editor.getSession().getScreenLength()
          		  * editor.renderer.lineHeight
          		  + editor.renderer.scrollBar.getWidth();
          	iframe.style.height = Math.ceil(newHeight).toString() + "px";
          	editor.resize();
          	*/
		});
	})(lang, code, no_exec);
}

})();