var level=2;
var gametype;
var muzyka=0;

var myshotrate=1;
var enemyshotrate=1;

var counter=0;
var counter_ships=0;

var blue_points=0;
var red_points=0;

var menu_sound=new Audio("menu.mp3");
var game_sound=new Audio("game.mp3");
var shot_sound=new Audio("shot.mp3");

game_sound.play();

function add()
{
	document.getElementById("new-game-settings").classList.add("new-game-animation");
	document.getElementById("new-game-settings").style="opacity:1";
}

function startbutton()
{
	
	for (var i = 0; i < document.getElementsByTagName("input").length ; i++) 
	{

		if (document.getElementsByTagName("input")[i].checked&&i<3) 
			{
				var liczba = document.getElementsByTagName("input")[i];
				console.log("wchodzi!");
				level=document.getElementsByTagName("input")[i].value;
				console.log("wychodzi!");

			}

		else if(document.getElementsByTagName("input")[i].checked) 
			{
				var liczba = document.getElementsByTagName("input")[i];
				gametype=liczba.value;
				muzyka++;
				
			}
	}

	alert(level);

	if (level==0&&gametype>2) 
	{
		setTimeout(function(){window.location.href="game.html";},2000);
		document.getElementById("background-game").classList.add("przyciemnienie");
		
	}
	else if (level==1&&gametype>2) 
	{
		setTimeout(function(){window.location.href="game.html";},2000);
		document.getElementById("background-game").classList.add("przyciemnienie");
		//myshotrate=0.5;
		//enemyshotrate=0.8;
	}
	else if (level==2&&gametype>2) 
	{
		setTimeout(function(){window.location.href="game.html";},2000);
		document.getElementById("background-game").classList.add("przyciemnienie");
		//myshotrate=0.2;
		//enemyshotrate=0.6;
	}
	else
	{
		document.getElementById("wynik2").innerHTML="Nie zaznaczyłeś poziomu trudności lub trybu rozgrywki";
	}
	 	
}

/////////////////////////////////////////////GAME /////////////////////////////////////////////

function startgame()
{
	var body = document.getElementById("your-ships");
	var body2= document.getElementById("enemy-ships");

	var infochancetohit = document.getElementById("chancetohit");

	if (level==1) 
	{
		infochancetohit.innerHTML="50/80%";
	}
	else if (level==2) 
	{
		infochancetohit.innerHTML="Szansa na trafienie 20/60%";
	}

	alert(level);

	for (var i = 1; i < 110; i++) 
		{
			
			if (counter==10) 
			{
				var div1 = document.createElement("div");
				div1.style="clear:both;";
				body.appendChild(div1);

				var div2 = document.createElement("div");
				div2.style="clear:both;";
				body2.appendChild(div2);

				counter=0;
			}
			else
			{
				var div1 = document.createElement("div");
				div1.id=i;
				div1.classList.add("field");
				div1.setAttribute("onclick","addship(this.id);");
				document.getElementById("your-ships").appendChild(div1);

				var div2 = document.createElement("div");
				div2.id=i+110;
				div2.classList.add("field");
				document.getElementById("enemy-ships").appendChild(div2);

				counter++;

			}

		}
}

function addship(id)
{
	document.getElementById(id).style='background-image: url("ship-mini.png");opacity:1;';
	document.getElementById(id).value="1";
	counter_ships++;
	document.getElementById("information").innerHTML="Rozłóż statki na planszy!";

	if (counter_ships==10) 
	{
	remove();
	addenemyships();

	document.getElementById("information").innerHTML="Atakuj!";

	}
}



function remove()
{
	for (var i = 1; i < 110; i++) 
	{

		if (i%11==0) 
		{

		}
		else
		{
	 		var field = document.getElementById(i);
	 		field.setAttribute("onclick","off");
		}

	}
}

function addenemyships()
{
	var enemyshipsleft=10;

	for (var i = 111; i < 220; i++) 
	{

		if (i%11==0) 
		{

		}
		else
		{
	 		var losowanie = Math.floor((Math.random()*10)+1);
	 		var enemydiv=document.getElementById(i);
	 		enemydiv.setAttribute("onclick","fire(this.id);");


	 		if (losowanie>9&&enemyshipsleft>0) 
	 		{
	 			
	 			enemydiv.value="1";
	 			enemyshipsleft--;

	 		}
	 		else if (i==219&&enemyshipsleft>0) 
	 		{
	 			i=111;
	 		}


		}

	}

}

function fire(id)
{
	console.log(level);
	var losowanie = Math.floor((Math.random()*10));

	if (level==0) 
	{
		var enemy=document.getElementById(id);

		if (enemy.value=="1") 
		{
			enemy.style.backgroundImage='url("ship-mini-death.png")';
			enemy.setAttribute("onclick","off");
			enemy.style.opacity="1";
			blue_points++;

			var mypoints = document.getElementById("score-blue").innerHTML=blue_points;
			
		}
		else
		{
			enemy.style.backgroundColor="yellow";
			enemy.setAttribute("onclick","off");
			
		}
	}
	else if (level==1&&losowanie>5) 
	{
		var enemy=document.getElementById(id);

		if (enemy.value=="1") 
		{
			enemy.style.backgroundImage='url("ship-mini-death.png")';
			enemy.setAttribute("onclick","off");
			enemy.style.opacity="1";
			blue_points++;

			var mypoints = document.getElementById("score-blue").innerHTML=blue_points;
			
		}
		else
		{
			enemy.style.backgroundColor="yellow";
			enemy.setAttribute("onclick","off");
			
		}
	}
	else if (level==2&&losowanie>8) 
	{
		var enemy=document.getElementById(id);

		if (enemy.value=="1") 
		{
			enemy.style.backgroundImage='url("ship-mini-death.png")';
			enemy.setAttribute("onclick","off");
			enemy.style.opacity="1";
			blue_points++;

			var mypoints = document.getElementById("score-blue").innerHTML=blue_points;
			
		}
		else
		{
			enemy.style.backgroundColor="yellow";
			enemy.setAttribute("onclick","off");
			
		}
	}
	
	shot_sound.play();

	//explosion();

	if (blue_points==10) 
	{
		victory();
	}
	else
	{
		disableattack();

		setTimeout(enemyfire,4000);
		setTimeout(enableattack,7000);
		document.getElementById("information").innerHTML="Czekaj na ruch przeciwnika!";
	}

	

	
}

function enemyfire()
{
	var losowanie = Math.floor((Math.random()*109)+1);
	var losowanie2 = Math.floor((Math.random()*10));

	if (losowanie%11==0) 
	{
		enemyfire();
	}
	else
	{
		if (level==0) 
		{
				var myfield=document.getElementById(losowanie);

				if (myfield.value!="0") 
				{

					if (myfield.value=="1") 
					{
						myfield.style.backgroundImage='url("ship-mini-death.png")';
						myfield.value="0";
						red_points++;
						var mypoints = document.getElementById("score-red").innerHTML=red_points;
					}
					else
					{
						myfield.value="0";
						myfield.backgroundImage="";
						myfield.style.backgroundColor="green";
					}

				}
				else
				{
					enemyfire();
				}
		}

		else if (level==1&&losowanie2<9) 
		{
			var myfield=document.getElementById(losowanie);

				if (myfield.value!="0") 
				{

					if (myfield.value=="1") 
					{
						myfield.style.backgroundImage='url("ship-mini-death.png")';
						myfield.value="0";
						red_points++;
						var mypoints = document.getElementById("score-red").innerHTML=red_points;
					}
					else
					{
						myfield.value="0";
						myfield.backgroundImage="";
						myfield.style.backgroundColor="green";
					}

				}
				else
				{
					enemyfire();
				}
		}

		else if (level==2&losowanie2<7) 
		{
			var myfield=document.getElementById(losowanie);

				if (myfield.value!="0") 
				{

					if (myfield.value=="1") 
					{
						myfield.style.backgroundImage='url("ship-mini-death.png")';
						myfield.value="0";
						red_points++;
						var mypoints = document.getElementById("score-red").innerHTML=red_points;
					}
					else
					{
						myfield.value="0";
						myfield.backgroundImage="";
						myfield.style.backgroundColor="green";
					}

				}
				else
				{
					enemyfire();
				}
		}

		

		

		
	}
	shot_sound.play();

	document.getElementById("information").innerHTML="Atakuj!";

	if (red_points==10) 
	{
		defeat();
	}

}

function disableattack()
{

	document.getElementById("enemy-ships").classList.add("disable-event");	
}

function enableattack()
{
	document.getElementById("enemy-ships").classList.remove("disable-event");
}

function victory()
{
	document.getElementById("information").innerHTML="Wygranko! Poczekaj na menu główne!";
	document.getElementById("game").classList.add("disable-event");

	setTimeout(function(){window.location.href="index.html";},10000);
}

function defeat()
{
	document.getElementById("information").innerHTML="Przegranko! Poczekaj na menu główne!";
	document.getElementById("game").classList.add("disable-event");
	setTimeout(function(){window.location.href="index.html";},10000);
}



/*function explosion(id)
{
	var mainCanvas=document.getElementById("210");
	alert("dziala funkcja!");
	var mainContext=mainCanvas.getContext('2d');
	alert("dziala funkcja2!");


	alert("weszło!");
	var x="200";
	var y=event.clientY;

	mainContext.clearRect(0, 0, 200, 200);
	alert("przeczytalo pozycje!");

	mainContext.beginPath();
	alert("zaczelo rysować");

	var radius=10;

	mainContext.arc(200,200,10,0,Math.PI*2,false);
	mainContext.closePath();

	mainContext.fillStyle="#111111";
	mainContext.fill();

}*/

function attack(id)
{
	
}


