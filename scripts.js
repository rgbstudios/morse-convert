$(function() {
	let english = $('#english');
	let morse = $('#morse');
	//convert back to get rid of invalid input
	english.change(function() {
		morse.val(englishToMorse(english.val() ) );
		english.val(morseToEnglish(morse.val() ) );
	});
	morse.change(function() {
		english.val(morseToEnglish(morse.val() ) );
		morse.val(englishToMorse(english.val() ) );
	});

	let morVals = {
	'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....','I':'..','J':'.---','K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-','U':'..-','V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..','0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.','?':'..--..'
	};
	let engVals = {
	'.-':'A','-...':'B','-.-.':'C','-..':'D','.':'E','..-.':'F','--.':'G','....':'H','..':'I','.---':'J','-.-':'K','.-..':'L','--':'M','-.':'N','---':'O','.--.':'P','--.-':'Q','.-.':'R','...':'S','-':'T','..-':'U','...-':'V','.--':'W','-..-':'X','-.--':'Y','--..':'Z','-----':'0','.----':'1','..---':'2','...--':'3','....-':'4','.....':'5','-....':'6','--...':'7','---..':'8','----.':'9','..--..':'?'
	};

	//characters seperated by spaces, spaces between words represented as slashes
	function englishToMorse(str) {
		let rtn = '';
		for(char in str) {
			if(str[char]==' ')
				rtn += ' / ';
			else
				rtn += (morVals[str[char].toUpperCase() ] || '') + ' ';
		}
		return rtn;
	}
	function morseToEnglish(str) {
		let rtn = '';
		let strs = str.split(' ');
		for(item in strs) {
			if(strs[item]=='/')
				rtn += ' ';
			else if(strs[item]!='')
				rtn += engVals[strs[item] ] || '';
		}
		return rtn;
	}

	//initial convert
	english.val('sos');
	english.change();
	english.select();

	//setup table
	for(item in morVals) {
		let tr = document.createElement('tr');
		let td1 = document.createElement('td');
		let td2 = document.createElement('td');
		td1.innerHTML = item;
		td2.innerHTML = morVals[item];
		tr.appendChild(td1);
		tr.appendChild(td2);
		document.getElementById('tbody').appendChild(tr);
	}

	//close and copy buttons
	$('#clearEnglish').click(function() {
		english.val('');
		english.focus();
	});
	$('#clearMorse').click(function() {
		morse.val('');
		morse.focus();
	});
	$('#copyEnglish').click(function() {
		english.select();
		document.execCommand('copy');
	});
	$('#copyMorse').click(function() {
		morse.select();
		document.execCommand('copy');
	});

	//search table
	$('#search').keyup(function() {
		let value = $(this).val().toUpperCase();
		$('#tbody tr').filter(function() {
			$(this).toggle($(this).text().toUpperCase().indexOf(value) > -1);
		});
	});

});
