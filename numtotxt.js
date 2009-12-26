var ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
var tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
var large = ["", "", "thousand", "million", "billion", "trillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion", "undecillion", "duodecillion", "tredecillion", "quattuordecillion", "quindecillion", "sexdecillion", "septendecillion", "octodecillion", "novemdecillion", "vigintillion", "unvigintillion", "dovigintillion", "trevigintillion", "quattuorvigintillion", "quinvigintillion", "sexvigintillion", "septenvigintillion", "octovigintillion", "novemvigintillion", "trigintillion", "untrigintillion", "dotrigintillion", "tretrigintillion", "quattuortrigintillion", "quintrigintillion", "sextrigintillion", "septentrigintillion", "octotrigintillion", "novemtrigintillion"];
var maxdigits = large.length * 3;

var input, output;

onload = function () {
	input = document.getElementById("inNum");
	output = document.getElementById("outText");
	input.onkeyup = convert_click;
	input.onkeypress = check_character;
}

function check_character(e) {
	var code = e ? e.which : event.keyCode;
	if (code === 46) {
		if (input.value.indexOf(".") !== -1) {
			if (input.selectionStart) {
				var loc = input.selectionStart - (input.selectionStart > input.value.indexOf(".") ? 1 : 0);
				input.value = input.value.replace(".", "");
				input.setSelectionRange(loc, loc);
			} else if (document.selection) {
				input.focus();
				document.selection.createRange().text = ".";
			}
		}
	}
	else if (code === 45 || code === 43) {
		var loc = input.selectionStart + (input.value[0] === "-" || input.value[0] === "+" ? 0 : 1);
		input.value = String.fromCharCode(code) + input.value.substr(input.value[0] === "-" || input.value[0] === "+" ? 1 : 0);
		input.setSelectionRange(loc, loc);
		return false;
	}
	else if (code > 31 && (code < 48 || code > 57)) return false;
}

function convert_click() {
	var number = input.value.replace(/ /g, "");
	output.value = "";
	if (number == "") return;

	if (number.indexOf(".") === -1) number += ".";

	if (/^[+-]?\d{0,133}[\.]\d{0,133}$/.test(number)) {
		input.style.backgroundColor = "";
		document.getElementById("LegendIn").innerHTML = "Number";
	} else {
		input.style.backgroundColor = "red";
		document.getElementById("LegendIn").innerHTML = "Number (Error: Not a number)";
	}

	var whole = number.substring(0, number.indexOf("."));
	var fraction = number.substr(number.indexOf(".") + 1);
	if (fraction.length > maxdigits) {
		input.style.backgroundColor = "yellow";
		document.getElementById("LegendOut").innerHTML = "Words (Warning: Fractional portion trimmed by " + (fraction.length - maxdigits) + " digit" + (fraction.length - maxdigits > 1 ? "s" : "") + ")";
	} else {
		input.style.backgroundColor = "";
		document.getElementById("LegendOut").innerHTML = "Words";
	}
//	number = clean(number);
//	input.value = number.replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1 ");
//	input.value = number;
	for (var x = 0; x < number.length / 3; x++)
		output.value += block_to_text(number);
	output.style.fontSize = "3em";
	while (output.scrollHeight > output.offsetHeight)
		output.style.fontSize = parseFloat(output.style.fontSize) - 0.1 + "em";
	var whole = (number + ".").substring(0, number.indexOf("."));
}

function clean(number) {
	return number.replace(/[^\+\-\d.,]/, "");
}

function block_to_text(block) {
	var out;
	if (block >= 100) {
		out = ones[block / 100 >> 0] + " hundred ";
		block %= 100;
	}
	if (block <= 20)
		return (out + ones[block]).rtrim();
	else
		return (out + tens[block / 10 >> 0] + "-" + ones[block % 10]).rtrim();
}

String.prototype.trim = function () {
	return this.replace(/^\s+|\s+$/g, "");
}
String.prototype.ltrim = function () {
	return this.replace(/^\s+/, "");
}
String.prototype.rtrim = function () {
	return this.replace(/\s+$/, "");
}
