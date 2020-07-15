//Erstellen der Ramtabelle	

function generateRam(){
 p = document.getElementById("RamTBody");
	while (p.firstChild) {
		p.removeChild(p.firstChild);
		}
	 
  for (var n = 0;n<1000; n++){
	newtr = document.createElement("tr");
    //erstellen der Spalten
	newtd1 =document.createElement("td");
	newtd = document.createElement("td");
	newtd2 = document.createElement("td");
	newtd3 = document.createElement("td");
	newtd4 = document.createElement("td");
	//erstellen der Inhalte
	newtd1.appendChild(document.createTextNode(n));
	newtd.appendChild(document.createTextNode("00.000"));

	//einfügen der Spalten
	Att= document.createAttribute("class");
	Att.value = "col1";
	newtd1.setAttributeNode(Att);
	
	tdwith= document.createAttribute("width");
	tdwith.value = "25%";
	newtd1.setAttributeNode(Att);
	newtd1.setAttributeNode(tdwith);
	
	newtr.appendChild(newtd1);
	
	Att= document.createAttribute("class");
	Att.value = "col2";
	newtd.setAttributeNode(Att);
		tdwith= document.createAttribute("width");
	tdwith.value = "25%";
	
	newtd.setAttributeNode(tdwith);
	newtr.appendChild(newtd);
	
	Att= document.createAttribute("class");
	Att.value = "col4";
	newtd3.setAttributeNode(Att);
		tdwith= document.createAttribute("width");
	tdwith.value = "25%";	
	newtd3.setAttributeNode(tdwith);
	newtr.appendChild(newtd3);
	
	Att= document.createAttribute("class");
	Att.value = "col5";
	newtd4.setAttributeNode(Att);
	tdwith= document.createAttribute("width");
	tdwith.value = "25%";
	newtd4.setAttributeNode(tdwith);
	newtr.appendChild(newtd4);
	
	
	//Zum erkennen auf welche Spalte gecklickt wurde
	Att= document.createAttribute("class");
	Att.value = "RamCell";
	newtr.setAttributeNode(Att);
	Att= document.createAttribute("ID");
	Att.value =  n;
	
	newtr.setAttributeNode(Att);  
	p.appendChild(newtr);
	//Onclick event für eingeben von Daten

	document.getElementsByClassName("RamCell")[n].addEventListener("click",EditRam)
  };
}//ende GenerateRam

function updateRam(){
	
	for(i=0;i<1000;i++){
	  writeToRam(parseInt(Ram[i]),i)
  }

	
}

function GenerateMicroCodeTable(){

	var p = document.getElementById("McTBody");
	
	//Löschen der alten einträge (wichtig wenn Mc von Datei geladen wird)
	while (p.firstChild) {
    p.removeChild(p.firstChild);
	}
	 
	 
	 
	 
for( i= 0;i<200;i++){
	newtr = document.createElement("tr");
	
	Att= document.createAttribute("class");
	Att.value = "MicroCodeTable";
	newtr.setAttributeNode(Att);
	
	
    //erstellen der Spalten
	newtd1 =document.createElement("td");
	newtd2 = document.createElement("td")
	Att= document.createAttribute("class");
	Att.value = "Mccol1";
	newtd1.setAttributeNode(Att);
	Att= document.createAttribute("class");
	Att.value = "Mccol2";
	newtd2.setAttributeNode(Att);
	newtd1.appendChild(document.createTextNode(zeroPad(i,3)));
	
	newtr.appendChild(newtd1);

	newtd2.innerText = microCodeToText(parseInt(MicroCode[i]))
newtr.appendChild(newtd2);	
p.appendChild(newtr);	
}



//einfügen der Auswahlmöglichkeiten für die eingabe in den Ram 
p = document.getElementById("CommandSelect");
while (p.firstChild) {//entfernen alter einträge(wichtig wenn Mc neu geladen wird)
		p.removeChild(p.firstChild);
		}
for(i= 200; i< MicroCode.length; i++){

	document.getElementsByClassName("Mccol1")[(i-200)*10].appendChild(document.createTextNode("   " +MicroCode[i] + ":" ));

	if(i>200){ //fetch nicht als auswählbaren befehl
	newOption = document.createElement("option");	
	Att= document.createAttribute("value");
	Att.value = i-200;
	newOption.setAttributeNode(Att);
	newOption.appendChild(document.createTextNode(zeroPad((i-200),2) + ": " +  MicroCode[i]));
	p.appendChild(newOption)
	}
}

updateRam();//damit die neuen Macrobefehle im Ram angezeigt werden
}

function microCodeToText(id){//nimmt eine Microcodeid an und übersetzt diese in den Text wie er in der Tabelle steht

	switch(id)	{
case 0:
return"---";
break;	
case 2://
return"ram ---> db ";
break;
	
case 1://
return"db ---> ram";
break;	

case 13://
return"plus";
break;	


case 14://
return"minus";
break;	

case 12://
return"acc:=0";
break;	

case 18://
return"db ---> acc";
break;

case 15://
return"acc ---> db ";
break;

case 16://
return"acc++";
break;

case 17://
return"acc--";
break;

case 3://
return"db ---> ins";
break;

case 5://
return"ins ---> mc";
break;

case 11://
return"ins ---> pc";
break;

case 4://
return"ins ---> ab";
break;

case 8://
return"pc ---> ab";
break;
	
case 7://
return"mc:=0";
break;

case 9://
return"pc++";
break;

case 10://
return"acc=0?->pc++";
break;

case 19://
return"stop";
break;

default:
console.log("Ungültiger Befehl " +befehl);
break

	
}//case
	
}

