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

## Resurse :inbox_tray:

### Pentru Server

### Pentru Aplicatia de Telefon Mobil

#### Dezvoltare

| Nume                              | Tip                                                                           | Link                                                                     |
|-----------------------------------|-------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| **Ionic Framework and Capacitor** | SDK pentru dezvoltare de aplicatii mobile cross-platform                      | [website](https://ionicframework.com)                                    |
| **React Helmet**                  | librarie pentru React.js pentru schimbari in head-ul documentului             | [Github repository](https://github.com/nfl/react-helmet)                 |
| **Web Font Loader**               | librarie pentru React.js pentru incarcare de font-urilor                      | [Github repository](https://github.com/typekit/webfontloader)            |
| **Resources Generator**           | script de Node.js pentru mutarea resurselor generate pentru Capacitor         | [Gist](https://gist.github.com/dalezak/a6b1de39091f4ace220695d72717ac71) |
| **capacitor-resources**           | tool CLI pentru generarea de icons pentru Capacitor                           | [Github repository](https://github.com/leopq/capacitor-resources)        |
| **Firebase**                      | conector pentru baza de date NoSQL                                            | [website](https://firebase.google.com)                                   |
| **FlatIcon**                      | website de pe care a fost preluat logo-ul                                     | [website](https://www.flaticon.com)                                      |

#### Build, Debug si Deploy

| Nume                              | Tip                                                                           | Link                                                                     |
|-----------------------------------|-------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| **Gradle** `5.6.4`                | sistem de automatizare folosit pentru build-ul proiectului de Android Studio  | [website](https://gradle.org)                                            |
| **Uber Apk Signer**               | tool CLI pentru semnare, aliniere zip si verificare de `.apk`                 | [Github](https://github.com/patrickfav/uber-apk-signer)                  |
| **Android Debug Bridge**          | tool CLI pentru comunicarea cu device-uri Android                             | [website](https://developer.android.com/studio/command-line/adb)         |
| **click**                         | modul de Python pentru CLI                                                    | [website](https://click.palletsprojects.com/en/7.x)                      |

### Altele

| Nume                              | Tip                                                                           | Link                                                                     |
|-----------------------------------|-------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| **Firebase**                      | BaaS (Backend-as-a-Service), pentru baza de date NoSQL                        | [website](https://firebase.google.com)                                   |
| **GeoJSON**                       | format de codificare a datelor geografice                                     | [website](https://geojson.org)                                           |