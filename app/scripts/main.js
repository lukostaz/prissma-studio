console.log('Prissma Studio started.');


$(document).ready(function(){

	$("#generateButton").click(function() {
		// var label = $("#inputName").val();

		var writer = N3.Writer({ 'prissma': 'http://ns.inria.fr/prissma/v2#' });
		writer.addTriple({
			subject:   'http://example.org/prism1',
			predicate: 'rdfs:label',
			object:    '"' + $("#inputName").val() + '"'
		});
		writer.end(function (error, result) { console.log(result); });


	});
});



