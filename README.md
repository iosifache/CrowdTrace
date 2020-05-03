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
3. **aplicatie de telefonul mobil**
	- implementare in *Ionic React*
	- permisiune pentru acces la *GPS*
	- interactiune directa cu baza de date pentru inserarea de locatii

## Resurse

### Pentru Server

### Pentru Aplicatia de Telefon Mobil

| Nume                | Tip                                                                  | Link                                                          |
|---------------------|----------------------------------------------------------------------|---------------------------------------------------------------|
| **Ionic Framework** | SDK pentru dezvoltare de aplicatii mobile cross-platform             | [website](https://ionicframework.com/)                        |
| **Firebase**        | connector pentru baza de date NoSQL                                  | [website](https://firebase.google.com/)                       |
| **React Helmet**    | librarie de JavaScript pentru schimbari in head-ul documentului      | [Github repository](https://github.com/nfl/react-helmet)      |
| **Web Font Loader** | librarie de Javascript pentru incarcare de font-urilor               | [Github repository](https://github.com/typekit/webfontloader) |
| **FlatIcon**        | website de pe care au fost preluate logo-ul si favicon-ul            | [website](https://www.flaticon.com/)                          |

### Altele

| Nume                | Tip                                                                  | Link                                                          |
|---------------------|----------------------------------------------------------------------|---------------------------------------------------------------|
| **Firebase**        | BaaS (Backend-as-a-Service), pentru baza de date NoSQL               | [website](https://firebase.google.com/)                       |
| **GeoJSON**         | format de codificare a datelor geografice                            | [website](https://geojson.org/)                               |