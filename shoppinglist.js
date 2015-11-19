var text = `
słodycze & przekąski

* 340 g gorzkiej czekolady



oleje & tłuszcze

* 175 g oliwy z oliwek

produkty zbożowe (mąka, ryż, kasza, makaron itp.)

* 1885 g mąki pszennej

* 350 g ryżu długoziarnistego

* 400 g mąki pszennej razowej



mrożonki

* 300 g lodów waniliowych

* 450 - 500 g truskawek, mrożonych

`;

var list = [];

var lines = text.split("\n");
var numLines = lines.length;
var currentCategory = {};
for (var i = 0; i < numLines; i++) {
  var line = lines[i];
  if (line.length > 0) {
	if (line.indexOf('*') == 0) {
		currentCategory.products.push({name:line.substring(2), bought:false});
	} else {
		currentCategory = {name:line, products:[]};
		list.push(currentCategory);
	}
  }
}

for (var i=0; i<list.length; i++) {
	console.log("- " + list[i].name);
	for (var j = 0; j < list[i].products.length; j++) {
		console.log("-- " + list[i].products[j].name);
	}
}