console.log('Prissma Studio started.');
var cnt = 1;


$(document).ready(function(){


	var tabID = 1;
	 //display first tab
        var tabFirst = $('#tab-list a:first');
        tabFirst.tab('show');

    $('#btn-add-tab').click(function () {
        tabID++;
        $('#tab-list').append($('<li role="presentation"><a href="#tab' + tabID + '" role="tab" data-toggle="tab">Lens ' + tabID + '<button class="close" type="button" title="Remove this page">×</button></a></li>'));
        $('.tab-content').append($('<div class="tab-pane fade" id="tab' + tabID + '"> </div>'));
    });
    
    $('#tab-list').on('click','.close',function(){
        var tabID = $(this).parents('a').attr('href');
        $(this).parents('li').remove();
        $(tabID).remove();

        //display first tab
        var tabFirst = $('#tab-list a:first');
        tabFirst.tab('show');
    });








	



	







	
	// date and time
	$('#datetimepicker-date-start').datetimepicker();
	$('#datetimepicker-date-end').datetimepicker();






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
		var poiURI = baseURI + '#poi-prism-' + cnt;
		var timeURI = baseURI + '#time-prism-' + cnt;
		var hwURI = baseURI + '#hw-prism-' + cnt;
		var swURI = baseURI + '#sw-prism-' + cnt;
		var stylesheetLink = $("#inputCSS").val();


		// read user prefixes
		var userPrefixes = $("#inputPrefixes").tagsinput('items');
		for (var i = 0; i < userPrefixes.length; i++) {
		   var tokens = userPrefixes[i].split(" ");
		   writer.addPrefix(tokens[0], tokens[1]);
		}
	


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
		writer.addPrefix('common', 'http://www.w3.org/2007/uwa/context/common.owl#');
		


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




		
		// ========= usr
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
			if (URI.parse(interests[i]))
		   		var interest = interests[i];
		   	else
		   		var interest = '"' + interests[i] + '"';
		   writer.addTriple(usrURI, 'http://xmlns.com/foaf/0.1/interest', interest);
		}

		var knows = $("#inputKnows").tagsinput('items');
		for (var i = 0; i < knows.length; i++) {
			if (URI.parse(knows[i]))
		   		var know = knows[i];
		   	else
		   		var know = '"' + knows[i] + '"';
		   writer.addTriple(usrURI, 'http://xmlns.com/foaf/0.1/knows', know);
		}

		
		if (inputUserFirstName)
			writer.addTriple(usrURI, 'http://xmlns.com/foaf/0.1/givenName', inputUserFirstName);
		if (inputUserLastName)
			writer.addTriple(usrURI, 'http://xmlns.com/foaf/0.1/familyName', inputUserLastName);
		if (gender)
			writer.addTriple(usrURI, 'http://xmlns.com/foaf/0.1/gender', gender);
		if (inputUserOrganization)
			writer.addTriple(usrURI, 'http://xmlns.com/foaf/0.1/member', inputUserOrganization);
		if (age)
		writer.addTriple(usrURI, 'http://xmlns.com/foaf/0.1/age', age);
		
		




		// ==========  dev
		if (inputOS){

			if (!URI.parse(inputOS))
		   		var inputOS = '"' + inputOS + '"';

			writer.addTriple(devURI, 'http://www.w3.org/2007/uwa/context/software.owl#operatingSystem', swURI);
			writer.addTriple(swURI, 'http://www.w3.org/2007/uwa/context/common.owl#name', inputOS);

		}
		if (inputModel){

			if (!URI.parse(inputModel))
		   		var inputModel = '"' + inputModel + '"';

			writer.addTriple(devURI, 'http://www.w3.org/2007/uwa/context/hardware.owl#deviceHardware', hwURI);
			writer.addTriple(hwURI, 'http://www.w3.org/2007/uwa/context/common.owl#name', inputModel);

		}
			
		// other device prop (hw properties)
		var otherDevProps = $("#inputOtherDevProps").tagsinput('items');
		for (var i = 0; i < otherDevProps.length; i++) {
			
			var tokens = otherDevProps[i].split(" ");
		   	var pref = tokens[0];
		   	var obj = tokens[1];

			if (!URI.parse(obj))
		   		var obj = '"' + obj + '"';
		   writer.addTriple(hwURI, pref, obj);
		}







		// ======== env
		var radius = distanceWidget.get('distance');
		var pos = distanceWidget.get('position');


		if (pos && radius){
			writer.addTriple(envURI, 'http://ns.inria.fr/prissma/v2#poi', poiURI);
			var lat = pos.k;
			var lon = pos.B;
			writer.addTriple(poiURI, 'http://www.w3.org/2003/01/geo/wgs84_pos#lat', '"' + lat + '"' );
			writer.addTriple(poiURI, 'http://www.w3.org/2003/01/geo/wgs84_pos#lon', '"' + lon + '"' );
			writer.addTriple(poiURI, 'http://ns.inria.fr/prissma/v2#radius', '"' + radius + '"');
		}
		

		var dateStart = $('#datetimepicker-date-start').data("DateTimePicker").getDate();
		// var timeStart = $('#datetimepicker-time-start').data("DateTimePicker").getDate().toString();
		var dateEnd = $('#datetimepicker-date-end').data("DateTimePicker").getDate();
		// var timeEnd = $('#datetimepicker-time-end').data("DateTimePicker").getDate().toString();

		var duration =  Math.abs(dateEnd - dateStart);
		var delay = moment.duration(duration);
		var durationISO = delay.toISOString(duration);


		writer.addTriple(envURI, 'http://purl.org/ontology/ao/core#time', timeURI);
		writer.addTriple(timeURI, 'http://purl.org/NET/c4dm/timeline.owl#start', '"' + dateStart.toISOString() + '"');
		writer.addTriple(timeURI, 'http://purl.org/NET/c4dm/timeline.owl#duration', '"' + durationISO + '"');


		var activities = $("#inputActivities").tagsinput('items');
		for (var i = 0; i < activities.length; i++) {
			if (URI.parse(activities[i]))
		   		var activity = activities[i];
		   	else
		   		var activity = '"' + activities[i] + '"';
		   writer.addTriple(envURI, 'http://purl.org/ontology/ao/core#activity', activity);
		}

		var nearbyEntities = $("#inputNearby").tagsinput('items');
		for (var i = 0; i < nearbyEntities.length; i++) {
		   if (URI.parse(nearbyEntities[i]))
		   		var nearbyEnt = nearbyEntities[i];
		   else
		   		var nearbyEnt = '"' + nearbyEntities[i] + '"';
		   writer.addTriple(envURI, 'http://ns.inria.fr/prissma/v2#nearbyEntity', nearbyEnt);
		}


		var motion;
		if ($("#inputUserFirstName").val())
			motion = true;
		else
			motion = false;
		writer.addTriple(envURI, 'http://ns.inria.fr/prissma/v2#motion', '"' + motion + '"');



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



