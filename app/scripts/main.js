console.log('Prissma Studio started.');
var cnt = 1;


$(document).ready(function(){

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



	// date and time
	$('#datetimepicker-date').datetimepicker({pickTime: false});
	$('#datetimepicker-time').datetimepicker({pickDate: false});






	// Generate .ttl file
	$("#generateButton").click(function() {


		var writer = N3.Writer();

		var prismName = $("#inputName").val();
		
		var baseURI = $("#inputBaseURI").val();
		if (! baseURI)
			baseURI = 'http://example.org'
		
		var prismURI = baseURI + '#prism-' + cnt;
		var ctxURI = baseURI + '#ctx-prism-' + cnt;
		var usrURI = $("#inputUserURI").val();
		if (! usrURI)
			usrURI = baseURI + '#usr-prism-' + cnt;
		var devURI = baseURI + '#dev-prism-' + cnt;
		var envURI = baseURI + '#env-prism-' + cnt;
		var stylesheetLink = $("#inputCSS").val();


		// read user prefixes
		var userPrefixes = $("#inputPrefixes").tagsinput('items');
		for (var i = 0; i < userPrefixes.length; i++) {
		   var tokens = userPrefixes[i].split(" ");
		   writer.addPrefix(tokens[0], tokens[1]);
		}
	

		//TODO: lenses and formats





		//dev




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
		writer.addTriple(ctxURI, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://ns.inria.fr/prissma/v2#Context');
		writer.addTriple(ctxURI, 'http://ns.inria.fr/prissma/v2#user', usrURI);
		writer.addTriple(ctxURI, 'http://ns.inria.fr/prissma/v2#device', devURI);
		writer.addTriple(ctxURI, 'http://ns.inria.fr/prissma/v2#environment', envURI);
		writer.addTriple(usrURI, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://ns.inria.fr/prissma/v2#User');
		writer.addTriple(devURI, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://ns.inria.fr/prissma/v2#Device');
		writer.addTriple(envURI, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'http://ns.inria.fr/prissma/v2#Environment');




		
		// usr
		var inputUserFirstName = $("#inputUserFirstName").val(); 
		var inputUserLastName = $("#inputUserLastName").val(); 
		var inputUserOrganization = $("#inputUserOrganization").val(); 
		
		var isMale = $("#isMaleRadio").val();
		var isFemale = $("#isFemaleRadio").val();
		var gender;
		if (isMale == 'true')
			gender = 'male'
		if (isFemale == 'true')
			gender = 'female'

		var age = $("#inputAge").val();

		var interests = $("#inputInterests").tagsinput('items');
		for (var i = 0; i < interests.length; i++) {
		   writer.addTriple(usrURI, 'http://xmlns.com/foaf/0.1/interest', interests[i]);
		}

		var knows = $("#inputKnows").tagsinput('items');
		for (var i = 0; i < knows.length; i++) {
		   writer.addTriple(usrURI, 'http://xmlns.com/foaf/0.1/knows', knows[i]);
		}

		
		writer.addTriple(envURI, 'http://xmlns.com/foaf/0.1/givenName', inputUserFirstName);
		writer.addTriple(envURI, 'http://xmlns.com/foaf/0.1/familyName', inputUserLastName);
		writer.addTriple(envURI, 'http://xmlns.com/foaf/0.1/gender', gender);
		writer.addTriple(envURI, 'http://xmlns.com/foaf/0.1/member', inputUserOrganization);
		writer.addTriple(envURI, 'http://xmlns.com/foaf/0.1/age', age);
		
		



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



