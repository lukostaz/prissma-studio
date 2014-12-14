console.log('Prissma Studio started.');


$(document).ready(function(){

	$("#generateButton").click(function() {

		var prismName = $("#inputName").val();

		
		var writer = N3.Writer();
		writer.addPrefix('rdfs', 'http://www.w3.org/2000/01/rdf-schema#');
		writer.addPrefix('prissma', 'http://ns.inria.fr/prissma/v2#');
		writer.addTriple('http://example.org/prism1', 'prissma:name', '"' + prismName + '"');
		


		// serialize and download ttl file
		writer.end(function (error, result) { 
			console.log(result); 
			window.URL = window.webkitURL || window.URL;
			var contentType = 'text/turtle';
			var csvFile = new Blob([result], {type: contentType});
			var a = document.createElement('a');
			a.download = prismName + '.ttl';
			a.href = window.URL.createObjectURL(csvFile);
			a.textContent = 'Download result';
			a.dataset.downloadurl = [contentType, a.download, a.href].join(':');
			a.click();


		});




		

	});
});



