#include"Header.h"
void main()
{

	//On cr�e un tableau � 2 Dimensions servant de tableau
	Case** plateau;
	int taille;
	int temps1;
	int temps2;

	//On demande � l'utilisateur la taille du plateau
	printf("Quelle taille d�sirez-vous pour le plateau ?\n");
	scanf("%d", &taille);

	
	//On donne � ce tableau la valeur d un tableau initialis�
	plateau = InitPlateau(taille);

	//On demande au joueur si il veut placer des pions
	CreerPlacements(plateau, taille);

	//On demande � l'utilisateur le temps restant de chaque joueur
	int minutes;
	printf("Combien de minutes reste-t-il au Joueur 1 ?\n");
	scanf("%d", &minutes);

	printf("Combien de secondes reste-t-il au Joueur 1 ?\n");
	scanf("%d", &temps1);
	temps1 += 60 * minutes;

	printf("Combien de minutes reste-t-il au Joueur 2 ?\n");
	scanf("%d", &minutes);

	printf("Combien de temps (en secondes) reste-t-il au Joueur 2 ?\n");
	scanf("%d", &temps2);
	temps2 += 60 * minutes;

	printf("\n");

	for (int i = 0; i < taille; i++)
	{
		for (int j = 0; j < taille; j++)
		{
			printf("%d", plateau[i][j].pion.valeur);
		}
		printf("\n");
	}
	//On inscrit les param�tres dans un document txt
	SauvegarderParametres(plateau, taille, temps1, temps2);


	system("pause");
	free(plateau);
}