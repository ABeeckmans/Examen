//On cree une structure case pour avoir toutes les infos
function Case(valeurPion, couleurPion) {
    this.valeurPion = valeurPion;
    this.couleurPion = couleurPion;
}

//On récupère la div du plateau
var plateau = document.getElementById("plateau");
var tableauCase = [];

var tableauInfoCases = [];

var sizeX = 800;
var sizeY = 800;


const myInput = document.getElementById('myFile');
myInput.addEventListener('change', ReadFileLineByLine);

let fileContentArray;
var NBCASES = 15;
var time1;
var time2;
var timer1 = document.getElementById("timer1");
var timer2 = document.getElementById("timer2");
var turnText = document.getElementById("turn");
var turn = 1;
turnText.innerHTML = turn;

//On lit le fichier et on stocke chaque ligne dans un tableau
function ReadFileLineByLine()
{

    var myFile = this.files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function(event)
    {
        //On divise le contenu du tableau en ligne
        //Chaque ligne devient un élément du tableau
        var fileContent = event.target.result;
        fileContentArray = fileContent.split(/\r\n|\n/);

        //Pour le document texte on stocke la taille du plateau qui est indiquée sur la première ligne
        NBCASES = parseInt(fileContentArray[0]);

        //On stocke les valeurs de temps restants sur la deuxième ligne et la troisième
        time1 = parseInt(fileContentArray[1]);
        time2 = parseInt(fileContentArray[2]);

        var position = 3;

        //On cree un tableau avec les infos des differents pions presents sur chaque case
        for(let i = 0; i<NBCASES; i++)
        {
            tableauInfoCases.push([]);
            for(let j = 0; j<NBCASES; j++)
            {
                //On cree une structure case temporaire
                var tempCase = new Case;

                //On stocke dans cette case la couleur du pion sur laquelle elle se trouve
                tempCase.couleurPion = parseInt(fileContentArray[position][4]);

                //On stocke dans cette case la valeur du pion sur laquelle elle se trouve
                tempCase.valeurPion = parseInt(fileContentArray[position][2]);

                //On rajoute cette case au tableau nouvellement crée
                tableauInfoCases[i].push(tempCase);
                position++;
            }
        }

        //Une fois cela fait, on génère le plateau en HTML
        GenererPlateau();
        
        
    }
    );
    reader.readAsText(myFile);
}

//La fonction Update est appelée toutes les secondes
setInterval(Update, 1000);
function Update()
{
    //On affiche les timers en miutes : secondes dans l'HTML
    timer1.innerHTML = Math.floor(time1/60) + ":";
    if(time1%60 < 10)
    {
        timer1.innerHTML += "0";
    } 
    timer1.innerHTML += time1%60;

    timer2.innerHTML = Math.floor(time2/60) + ":";
    if(time2%60 < 10)
    {
        timer2.innerHTML += "0";
    } 
    timer2.innerHTML += time2%60;

    //On réduit le temps d'un timer seulement si c'est le joueur à qui correspond ce time rqui est en train de jouer
    if( time1 > 0 && turn == 1)
    {
        time1--;
    }
    
    if(time2 > 0 && turn == 2)
    {
        time2--;
    }

    //On efface l'echiquier et on affiche un message si le jeu arrive à cours de temps
    if(time1 == 0)
    {
        plateau.innerHTML='Le joueu1 est à cours de temps';
    }

    if(time2 == 0)
    {
        plateau.innerHTML='Le joueu1 est à cours de temps';
    }
    
}



function GenererPlateau()
{
    //On crée un tableau en 2D de div
    //Chaque div sera une case du tableau
    for(let i = 0; i<NBCASES; i++)
    {
        tableauCase.push([]);
        for(let j = 0; j<NBCASES; j++)
        {
            tableauCase[i].push(document.createElement("div"));
            tableauCase[i][j].className = "case";

            //Certaines cases prennent également l'attribut qui leur permet de s'afficher en noir
            if(j%2 != i%2)
            {
                tableauCase[i][j].className = "case black";
            }

            tableauCase[i][j].style.width = (sizeX)/NBCASES + "px";
            tableauCase[i][j].style.height = (sizeY)/NBCASES + "px";

            //Chque case est cliquable
            tableauCase[i][j].addEventListener("click", focusCase);

            //On rajoute l'image d'un pion dans la case si nécessaire
            var img = document.createElement('img');
            switch(tableauInfoCases[i][j].valeurPion)
            {
                case 1:
                    if(tableauInfoCases[i][j].couleurPion == 1)
                    {
                        img.src = "Images/BPion.png";  
                    }
                    else
                    {
                        img.src = "Images/NPion.png";  
                    }
                    break;

                case 2:
                    if(tableauInfoCases[i][j].couleurPion == 1)
                    {
                        img.src = "Images/BTour.png";  
                    }
                    else
                    {
                        img.src = "Images/NTour.png";  
                    }
                    break;

                case 3:
                    if(tableauInfoCases[i][j].couleurPion == 1)
                    {
                        img.src = "Images/BCavalier.png";  
                    }
                    else
                    {
                        img.src = "Images/NCavalier.png";  
                    }
                    break;

                case 4:
                    if(tableauInfoCases[i][j].couleurPion == 1)
                    {
                        img.src = "Images/BFou.png";  
                    }
                    else
                    {
                        img.src = "Images/NFou.png";  
                    }
                    break;

                case 5:
                    if(tableauInfoCases[i][j].couleurPion == 1)
                    {
                        img.src = "Images/BReine.png";  
                    }
                    else
                    {
                        img.src = "Images/NReine.png";  
                    }
                    break;

                case 6:
                    if(tableauInfoCases[i][j].couleurPion == 1)
                    {
                        img.src = "Images/BRoi.png";  
                    }
                    else
                    {
                        img.src = "Images/NRoi.png";  
                    }
                    break;
            }

            //On rajoute l'image choisie à la case
            tableauCase[i][j].appendChild(img);
            
            //On rajoute la case au plateau
            plateau.appendChild(tableauCase[i][j]);
        }
    }
}

//Fonction qui s'effectue quand le joueur clique sur une case
function focusCase(e){
    
    var posX;
    var posY;

    var pionX;
    var pionY;

    //On vérifie d'abord si le joueur veut se déplacer et donc si il a cliqué sur une case de de déplacement
    if(e.target.parentElement.className =="case target")
    {
        for (let i=0; i < NBCASES; i++)
        {
            for(let j=0; j < NBCASES; j++)
            {
                //On sauveagrde la position de la case cliquée
                if(e.target.parentElement == tableauCase[i][j])
                {
                posX = j;
                posY = i;
                }

                //On sauvegarde la position d ela case où se trouve le pion
                if(tableauCase[i][j].id == "focus")
                {
                pionX = j;
                pionY = i;
                }
            }
        }


        //Le pion se déplace d'une case à l'autre uniquement si c'est le tour de cette couleur de joueur
        if(tableauInfoCases[pionY][pionX].couleurPion == turn)
        {
            //On déplace le pion 
            tableauCase[posY][posX].firstChild.src = tableauCase[pionY][pionX].firstChild.src;
            tableauInfoCases[posY][posX].valeurPion = tableauInfoCases[pionY][pionX].valeurPion;
            tableauInfoCases[posY][posX].couleurPion = tableauInfoCases[pionY][pionX].couleurPion;

            //On vide la case précédente
            tableauCase[pionY][pionX].firstChild.src = "";
            tableauInfoCases[pionY][pionX].valeurPion = 0;
            tableauInfoCases[pionY][pionX].couleurPion = 0;

            //On change de joueur et on l'affiche dans l'HTML
            if(turn == 1)
            {
                turn = 2;
            }
            else
            {
                turn = 1;
            }
            turnText.innerHTML =turn;

        }
        

    }

    //On enleve la classe focus et target sur toutes les cases pour 'nettoyer l'échiquier'
    for (let i=0; i < NBCASES; i++){
        for(let j=0; j < NBCASES; j++)
        {
            if (tableauCase[i][j].id == "focus" || tableauCase[i][j].className == "case target"){
                tableauCase[i][j].removeAttribute("id");
                
                if(j%2 != i%2)
                {
                    tableauCase[i][j].className = "case black";
                }
                else
                {
                    tableauCase[i][j].className ="case";
                }
            }

            if(e.target.parentElement == tableauCase[i][j])
            {
                posX = j;
                posY = i;
            }
        }
        
    }
    //On focus la case sélectionnée
    e.target.parentElement.id ="focus";


    //Apparition des déplacements possibles
    if(posX >= 0 && posX < NBCASES && posY >= 0 && posY < NBCASES)
    {
        //On vérifie les déplacements possibles en fonction de la position du pion
        switch(tableauInfoCases[posY][posX].valeurPion)
        {
            //Déplacement du pion
            case 1:
                if(tableauInfoCases[posY][posX].couleurPion == 1 && posY > 0)
                {   
                    if(tableauInfoCases[posY-1][posX].couleurPion == 0)
                    {
                        tableauCase[posY-1][posX].className = "case target";
                    }
                    
                    //Si le joueur est en début de plateau
                    if(posY == 6 && tableauInfoCases[posY-2][posX].couleurPion == 0)
                    {
                        tableauCase[posY-2][posX].className = "case target";
                    }

                    //Attaque gauche
                    if(posX > 0)
                    {
                        
                        if(tableauInfoCases[posY-1][posX-1].couleurPion == 2)
                        {
                            console.log(tableauInfoCases[posY-1][posX-1].couleurPion);
                            tableauCase[posY-1][posX-1].className = "case target";
                        }
                    }
                    

                    //Attaque droite
                    if(posX < NBCASES - 1)
                    {
                        if(tableauInfoCases[posY-1][posX+1].couleurPion == 2)
                        {
                            tableauCase[posY-1][posX+1].className = "case target";
                        }
                    }
                    
                }
                //Pions noirs
                else
                {
                    if(tableauInfoCases[posY][posX].couleurPion == 2 && posY < NBCASES-1)
                    {
                        if(tableauInfoCases[posY+1][posX].couleurPion == 0)
                        {
                            tableauCase[posY+1][posX].className = "case target";
                        }
                        

                        //Si le joueur est en début de plateau
                        if(posY == 1 && tableauInfoCases[posY+2][posX].couleurPion == 0)
                        {
                            tableauCase[posY+2][posX].className = "case target";
                        }

                        //Attaque gauche
                        if(posX > 0)
                        {
                            if(tableauInfoCases[posY+1][posX-1].couleurPion == 1)
                            {
                                tableauCase[posY+1][posX-1].className = "case target";
                            }
                        }
                        

                        //Attaque droite
                        if(posX < NBCASES - 1)
                        {
                            if(tableauInfoCases[posY+1][posX+1].couleurPion == 1)
                            {
                                tableauCase[posY+1][posX+1].className = "case target";
                            }
                        }
                        
                    }
                }
                break;


            //Déplacement de la tour
            case 2:
                DeplacementTour(posX, posY);
                break;

            //Déplacements du cavalier
            case 3:

                DeplacementCavalier(posX, posY);            
                break;

            //Déplacement du fou
            case 4:
                
                DeplacementFou(posX, posY);
                break;

            case 5:

            DeplacementDame(posX, posY);
                break;

            case 6:
                DeplacementRoi(posX, posY);
                break;
        }

        
    }


}




function DeplacementTour(a_posX, a_posY)
{
    DeplacementDiagonal(a_posX, a_posY, 0, -1);
    DeplacementDiagonal(a_posX, a_posY, 0, 1);

    DeplacementDiagonal(a_posX, a_posY, -1, 0);
    DeplacementDiagonal(a_posX, a_posY, 1, 0);
}

function DeplacementCavalier(a_posX, a_posY)
{
    DeplacementEnL(a_posX, a_posY, -2, -1);
    DeplacementEnL(a_posX, a_posY, -2, 1);

    DeplacementEnL(a_posX, a_posY, 2, -1);
    DeplacementEnL(a_posX, a_posY, 2, 1);

    DeplacementEnL(a_posX, a_posY, -1, -2);
    DeplacementEnL(a_posX, a_posY, -1, 2);

    DeplacementEnL(a_posX, a_posY, 1, -2);
    DeplacementEnL(a_posX, a_posY, 1, 2);
}

function DeplacementFou(a_posX, a_posY)
{
    //Haut gauche
    DeplacementDiagonal(a_posX, a_posY, -1, -1);

    //Haut Droite
    DeplacementDiagonal(a_posX, a_posY, -1, 1);

    //Bas Gauche
    DeplacementDiagonal(a_posX, a_posY, 1, -1);

    //Bas Droite
    DeplacementDiagonal(a_posX, a_posY, 1, 1);
}

function DeplacementDame(a_posX, a_posY)
{
    DeplacementTour(a_posX,a_posY);
    DeplacementRoi(a_posX, a_posY);
    DeplacementFou(a_posX,a_posY);
}

function DeplacementRoi(a_posX, a_posY)
{
    DeplacementUneCase(a_posX, a_posY, -1, 0);
    DeplacementUneCase(a_posX, a_posY, 1, 0);

    DeplacementUneCase(a_posX, a_posY, 0, -1);
    DeplacementUneCase(a_posX, a_posY, 0, 1);
}

function DeplacementEnL(a_posX, a_posY, a_decalageHorizontal, a_deplacementVertical)
{
    let tempX = a_posX + a_decalageHorizontal;
    let tempY = a_posY + a_deplacementVertical;

    if(tempX >= 0 && tempX < NBCASES && tempY >= 0 && tempY < NBCASES)
    {
        if(tableauInfoCases[tempY][tempX].couleurPion != tableauInfoCases[a_posY][a_posX].couleurPion)
        {
            tableauCase[tempY][tempX].className ="case target";
        }
    }
}

function DeplacementDiagonal(a_posX, a_posY, a_deplacementVertical, a_deplacementHorizontal)
{
    let tempX = a_posX + a_deplacementHorizontal;
    let tempY = a_posY + a_deplacementVertical;

    console.log();

    while(tempX >= 0 && tempX < NBCASES && tempY >=0 && tempY < NBCASES && tableauInfoCases[tempY][tempX].valeurPion == 0)
    {
        tableauCase[tempY][tempX].className ="case target";
        tempX += a_deplacementHorizontal;
        tempY += a_deplacementVertical;
    }

    //Si un pion adverse est sur la dernière case de la range on le prend aussi
    if(tempX >= 0 && tempX < NBCASES && tempY >=0 && tempY < NBCASES)
    {
        if(tableauInfoCases[tempY][tempX].couleurPion != tableauInfoCases[a_posY][a_posX].couleurPion)
        {
            tableauCase[tempY][tempX].className ="case target";
        }
    }
}

function DeplacementUneCase(a_posX, a_posY, a_vertical, a_horizontal)
{
    let tempX = a_posX + a_horizontal;
    let tempY = a_posY + a_vertical;

    if(tempX >= 0 && tempX < NBCASES && tempY >=0 && tempY < NBCASES)
    {
        if(tableauInfoCases[tempY][tempX].couleurPion != tableauInfoCases[a_posY][a_posX].couleurPion)
        {
            tableauCase[tempY][tempX].className ="case target";
        }
    }
}


