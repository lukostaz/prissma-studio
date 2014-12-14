console.log('Prissma Studio started.');
var cnt = 1;


$(document).ready(function(){

	// google.maps.event.addDomListener(window, 'load', init);

	// multiple prefixes
	var next = 1;
    $(".add-more").click(function(e){
        e.preventDefault();
        var addto = "#field-prefix-" + next;
        var addRemove = "#field-prefix-" + (next);
        next = next + 1;
        var newIn = '<input autocomplete="off" class="input form-inline form-prefix" id="field-prefix-' + next + '" name="field-prefix-' + next + '" type="url">';
        var newInput = $(newIn);
        var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >-</button></div><div id="field-prefix-">';
        var removeButton = $(removeBtn);
        $(addto).after(newInput);
        $(addRemove).after(removeButton);
        $("#field-prefix-" + next).attr('data-source',$(addto).attr('data-source'));
        $("#count-user-prefixes").val(next);  
        
            $('.remove-me').click(function(e){
                e.preventDefault();
                var fieldNum = this.id.charAt(this.id.length-1);
                var fieldID = "#field-prefix-" + fieldNum;
                $(this).remove();
                $(fieldID).remove();
            });
    });






	// Generate .ttl file
	$("#generateButton").click(function() {

		var prismName = $("#inputName").val();
		
		var baseURI = $("#inputBaseURI").val();
		if (! baseURI)
			baseURI = 'http://example.org'
		
		var prismURI = baseURI + '#prism-' + cnt;
		var ctxURI = baseURI + '#ctx-prism-' + cnt;
		var stylesheetLink = $("#inputCSS").val();


		
		


		var writer = N3.Writer();
		
		// add prefixes
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


		// add triples: general
		writer.addTriple(prismURI, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://ns.inria.fr/prissma/v2#Prism');
		writer.addTriple(prismURI, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://www.w3.org/2004/09/fresnel#Group');
		if (prismName)
			writer.addTriple(prismURI, 'http://www.w3.org/2000/01/rdf-schema#label', '"' + prismName + '"');		
		if (stylesheetLink)
		writer.addTriple(prismURI, 'http://www.w3.org/2004/09/fresnel#stylesheetLink', stylesheetLink);		


		// add triples: lenses


		// add triples: formats


		// add triples: ctx
		writer.addTriple(prismURI, 'http://www.w3.org/2004/09/fresnel#purpose', ctxURI);		
		






		// serialize and download ttl file
		writer.end(function (error, result) { 
			console.log(result); 
			window.URL = window.webkitURL || window.URL;
			var contentType = 'text/turtle';
			var csvFile = new Blob([result], {type: contentType});
			var a = document.createElement('a');
			if (prismName)
				a.download = prismName + '.ttl';
			else
				a.download = 'prism-' + cnt + '.ttl';
			a.href = window.URL.createObjectURL(csvFile);
			a.textContent = 'Download result';
			a.dataset.downloadurl = [contentType, a.download, a.href].join(':');
			a.click();
		});
	});
});



