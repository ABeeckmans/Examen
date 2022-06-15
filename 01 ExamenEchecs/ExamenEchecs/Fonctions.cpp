#include"Header.h"

//Fonction qui initialise le tableau
//Cette fonction cree une adresse de tableau à ddeux dimensions servant de tableau
//Et lui alloue un certain espace memoire en fonction de la taille entrée par le joueur
Case** InitPlateau(int a_taille)
{
	Case** a_plateau = (Case**)calloc(a_taille, sizeof(Case*));

	for (int i = 0; i < a_taille; i++)
	{
		a_plateau[i] = (Case*)calloc(a_taille, sizeof(Case));
	}

	//On affecte ensuite a chaque case la valeur de sa colonne et de sa ligne
	for (int i = 0; i < a_taille; i++)
	{
		for (int j = 'A'; j < 'A' + a_taille; j++)
		{
			Case temp;
			temp.ligne = i + 1;
			temp.colonne = j;

			if (i % 2 == (j - 'A') % 2)
			{
				temp.couleur = BLANC;
			}
			else
			{
				temp.couleur = NOIR;
			}

			//On considere dans un premier temps qu'il n'y a pas de pions sur le plateau
			temp.pion.valeur = VIDE;
			temp.pion.couleur = (Couleur)RIEN;


			//j a la valeur Ascii correspondant a la lettre de la colonne sur laquelle on travaille
			//Pour avoir la position de la case dans le tableau, il faut donc lui enlever la valeur de 'A' soit 65
			a_plateau[i][j-'A'] = temp;
		}
	}

	//Enfin, on renvoie le tableau créé
	return a_plateau;
}


//Cette fonction va permettre de pouvoir les pions voulus à des endroits précis
void CreerPlacements(Case** a_plateau, int a_taille)
{
	int continuer = 0;
	char choice;
	Pion tempPion;

	int ligne;
	char colonne;

	int peutEtrePlace = 0;

	//On va continuer a proposer de placer des pions au joueur tant qu'il decide de continuer
	while (continuer == 0)
	{
		choice = '\0';
		//On demande au joueur si il veut placer un pion
		//On réitère tant que sa réponse n'est pas valide
		while (choice < '1' || choice > '2')
		{
			system("cls");

			printf("Voulez-vous placer un pion ?\n");
			printf("1 : Oui\n");
			printf("2 : Non\n");

			choice = getch();
		}

		//Si le joueur décide de placer un pion
		//On commence à lui demander les informations sur ce pion
		if (choice == '1')
		{
			//On réinitilaise la variable de choix du joueur afin de bien rentrer dans la boucle WHILE
			choice = '\0';

			//On demande au joueur la valeur du pion placé
			//On réitère tant que sa réponse n'est pas valide
			while (choice < '1' || choice > '6')
			{
				printf("Quel pion voulez vous rajouter ?\n");
				printf("1: PION\n");
				printf("2: TOUR\n");
				printf("3: CAVALIER\n");
				printf("4: FOU\n");
				printf("5: DAME\n");
				printf("6: ROI\n");

				choice = getch();
			}

			//Une fois qu'une réponse valide a été entrée on insère la valeur dans une variable pion temporaire
			//La variable choice a une valeur ASCCI située entre '1' et '6' 
			//Ou entre 49 et 54 en valeur numérique
			//On diminue donc ce choix de 48 afin d'avoir une réponse située entre 1 et 6, ce qui correspond aux valeurs de l'enum Valeur_Pion
			tempPion.valeur = (Valeur_Pion)(choice-48);

			//On réinitilaise la variable de choix du joueur afin de bien rentrer dans la boucle WHILE
			choice = '\0';

			//On demande au joueur la couleur du pion placé
			//On réitère tant que sa réponse n'est pas valide
			while (choice < '1' || choice > '2')
			{
				printf("De quelle couleur est ce pion ?\n");
				printf("1: BLANC\n");
				printf("2: NOIR \n");

				choice = getch();
			}

			//Une fois qu'une réponse valide a été entrée on insère la valeur dans une variable pion temporaire
			//La variable choice a une valeur ASCCI située entre '1' et '2' 
			//Ou entre 49 et 50 en valeur numérique
			//On diminue donc ce choix de 48 afin d'avoir une réponse située entre 1 et 2, ce qui correspond aux valeurs de l'enum Couleur
			tempPion.couleur = (Couleur)(choice-48);

			//On réinitilaise la variable de choix du joueur afin de bien rentrer dans la boucle WHILE
			choice = '\0';

			printf("Vous allez maintenant choisir la case ou le pion sera mis\n");
			system("pause");

			//On demande au joueur le nom de la colonne sur laquelle il veut placer son pion
			//On réitère tant que sa réponse n'est pas valide
			while (toupper(choice) < 'A' || toupper(choice) > 'A' + a_taille - 1)
			{
				printf("Veuillez choisir une colonne (De A a %c)\n", 'A' + a_taille - 1);
				choice = getch();
			}

			colonne = toupper(choice);

			//On remet la valeur de ligne a 0, afin qu'une valeur provenant d'une itération précédente de la boucle n'empeche pas de rentrer dans la boucle WHILE
			ligne = 0;

			//On demande au joueur le nom de la ligne sur laquelle il veut placer son pion
			//On réitère tant que sa réponse n'est pas valide
			while (ligne < 1 || ligne > a_taille)
			{
				printf("Veuillez choisir une ligne (De 1 a %d)\n", a_taille);
				scanf("%d", &ligne);
			}


			//On verifie si un pion n'est pas déjà sur la case choisie
			if (a_plateau[ligne - 1][colonne - 'A'].pion.valeur != VIDE)
			{
				//On réinitilaise la variable de choix du joueur afin de bien rentrer dans la boucle WHILE
				choice = '\0';

				//Si tel est le cas, on demande au joueur si il veut conserver le pion précédent ou bien placer son nouveau pion
				//On réitère tant que sa réponse n'est pas valide
				while (choice < '1' || choice > '2')
				{
					Pion tempPion = a_plateau[ligne - 1][colonne - 'A'].pion;
					printf("%s %s se trouve deja sur la case, voulez-vous remplacer ce pion ?\n", ObtenirValeurPion(tempPion), ObtenirCouleurPion(tempPion));
					printf("1: Oui\n");
					printf("2: Non\n");

					choice = getch();
				}
				
				//Si le joueur ne veut finalement pas placer son pion on modifie une variable afin que,
				//prochainement, la nouvelle valeur entrée ne soit pas insérée dans le tableau
				if (choice == '2')
				{
					peutEtrePlace = 1;
				}

				
			}

			//Si le pion peut être placé on injecte la valeur du pion temporaire créé au sein de notre tableau principal
			//aux coordonées rentrées  par l'utilisateur
			if (peutEtrePlace == 0)
			{
				a_plateau[ligne - 1][colonne - 'A'].pion = tempPion;
			}
			
		}
		//Si le joueur ne veut plus placer de pion, on quitte la boucle
		else
		{
			continuer = 1;
		}
		
		


	}
}

//Il s'agit d'une fonction qui renvoie une chaine correspondant a la valeur d'un pion rentré en paramètre
const char* ObtenirValeurPion(Pion a_pion)
{
	switch (a_pion.valeur)
	{
		case VIDE: return "Vide";
			break;

		case PION: return "Pion";
			break;

		case TOUR: return "Tour";
			break;

		case CAVALIER: return "Cavalier";
			break;

		case FOU: return "Fou";
			break;

		case DAME: return "Dame";
			break;

		case ROI: return "Roi";
			break;

		default: return"\0";
			break;

	}
}

//Il s'agit d'une fonction qui renvoie une chaine correspondant a la couleur d'un pion rentré en paramètre
const char* ObtenirCouleurPion(Pion a_pion)
{
	switch (a_pion.couleur)
	{
		case BLANC:
			return "Blanc";

		case NOIR:
			return "Noir";
	
		default :
			return"\0";
	}
}

//Il s'agit d'une fonction écrivant l'ensemble des paramètres rentrés sur un fichier TXT
void SauvegarderParametres(Case** a_plateau, int a_taille, int a_temps1, int a_temps2)
{
	FILE* fichier = NULL;

	//On ouvre une première fois le fichier en mode écriture afin d'effacer son contenu et on indique la taille du plateau, ainsi que le temps restant des deux joueurs
	fichier = fopen("parametres.txt", "w");

	if (fichier != NULL)
	{
		fprintf(fichier, "%d\n%d\n%d\n", a_taille, a_temps1, a_temps2);
		fclose(fichier);
	}

	//On écrit ensuite une ligne par case
	//Chaque ligne possède les infomations suivantes dans cet ordre :
	// 1. La couleur de la case (1 pour Blanc et 2 pour Noir)
	// 2. La valeur du pion se trouvant sur la case (0 si il n'ya pas de pion ou 1 : pion, 2 : tour, 3 : cavalier, 4 : fou, 5 : dame, 6 : roi)
	// 3. La couleur du pion se trouvant sur la case (0 si il n'y a pas de pion ou 1 : blanc, 2 : noir)
	// 4. Le numéro correspondant à la ligne de la case
	// 5. La lettre correspondant à la collonne de la case
	for (int i = 0; i < a_taille; i++)
	{
		for (int j = 0; j < a_taille; j++)
		{
			fichier = fopen("parametres.txt", "a");

			if (fichier != NULL)
			{
				fprintf(fichier, "%d ", a_plateau[i][j].couleur);
				fprintf(fichier, "%d ", a_plateau[i][j].pion.valeur);
				fprintf(fichier, "%d ", a_plateau[i][j].pion.couleur);
				fprintf(fichier, "%d ", a_plateau[i][j].ligne);
				fprintf(fichier, "%c\n", a_plateau[i][j].colonne);
				fclose(fichier);
			}
			
		}
	}
}