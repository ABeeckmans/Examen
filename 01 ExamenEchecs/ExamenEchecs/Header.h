#pragma once
#pragma warning(disable:4996)

#include<stdio.h>
#include<stdlib.h>
#include<malloc.h>
#include<conio.h>
#include<string.h>
#include<ctype.h>

//Un pion ou une case peut etre soit noir, soit blanc
//La valeur RIEN est utilisée dans le cas où il n'y a pas de pions
typedef enum Couleur
{
	RIEN,
	BLANC,
	NOIR
}Couleur;

//Un pion peut avoir 6 roles
//On prend également en compte la possibilité qu'il n'y ait pas de pion sur la case
typedef enum Valeur_Pion
{
	VIDE,
	PION = 1,
	TOUR = 2,
	CAVALIER = 3,
	FOU = 4,
	DAME = 5,
	ROI = 6
}Valeur_Pion;

//Un pion se définit :
// 1. Par son rôle
// 2. Par la couleur de l'équipe à laquelle il appartient
typedef struct Pion
{
	Valeur_Pion valeur;
	Couleur couleur;


}Pion;

//Comme demandé dans la consigne, une case se définit par :
// 1. Sa couleur
// 2. Sa Colonne
// 3. Sa Ligne
//On précise également quel pion (si il y en a un) se trouve sur la case
typedef struct Case
{
	Couleur couleur;
	Pion pion;
	char colonne;
	int ligne;
}Case;


//PROTOTYPES
Case** InitPlateau(int a_taille);
void CreerPlacements(Case** a_plateau, int a_taille);
void SauvegarderParametres(Case** a_plateau, int a_taille, int a_temps1, int a_temps2);


const char* ObtenirValeurPion(Pion a_pion);
const char* ObtenirCouleurPion(Pion a_pion);
