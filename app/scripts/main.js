console.log('Prissma Studio started.');


$(document).ready(function(){

	$("#generateButton").click(function() {

		var prismName = $("#inputName").val();


		var writer = N3.Writer();
		writer.addPrefix('rdfs', 'http://www.w3.org/2000/01/rdf-schema#');
		writer.addPrefix('prissma', 'http://ns.inria.fr/prissma/v2#');
		writer.addPrefix('fresnel', 'http://www.w3.org/2004/09/fresnel#');
		writer.addPrefix('foaf', 'http://xmlns.com/foaf/0.1/');
		writer.addPrefix('geo', 'http://www.w3.org/2003/01/geo/wgs84_pos#');
		writer.addPrefix('ao', 'http://purl.org/ontology/ao/core#');
		writer.addPrefix('time', 'http://www.w3.org/2006/time#');
		writer.addPrefix('dcn', 'http://www.w3.org/2007/uwa/context/deliverycontext.owl#');
		writer.addPrefix('hard', 'http://www.w3.org/2007/uwa/context/hardware.owl#');
		writer.addPrefix('soft', 'http://www.w3.org/2007/uwa/context/software.owl#');
		writer.addPrefix('tl', 'http://purl.org/NET/c4dm/timeline.owl#');


		writer.addTriple('http://example.org/prism1', 'http://www.w3.org/2000/01/rdf-schema#label', '"' + prismName + '"');
		


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



