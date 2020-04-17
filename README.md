# CrowdTrace :busts_in_silhouette:

## Componente Principale :open_file_folder:

1. **baza de date *Google Firebase***
	- drept de inserare de date anonimizate prin intermediul aplicatiei pentru telefonul mobil
	- drept de citire prin intermediul server-ului
2. **server**
	- generare aleatoare de puncte miscatoare in interiorul Bucurestiului
	- interogari ale bazei de date pentru un anumit esantion de timp
	- clusterizarea datelor cu **ST-DBSCAN**
	- afisarea datelor pe harta a clusterelor
3. **aplicatie pentru telefonul mobil**
	- implementare in *Ionic React*
	- permisiune pentru acces la *GPS*
	- interactiune directa cu baza de date pentru inserarea de locatii