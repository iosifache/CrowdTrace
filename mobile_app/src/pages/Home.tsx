// Import libraries
import React, {useState, useEffect} from "react"
import firebase from "firebase"
import {Plugins} from '@capacitor/core';
import {Geolocation} from "@ionic-native/geolocation"
import WebFont from "webfontloader"

// Import components
import {
	IonContent, 
	IonDatetime,
	IonFooter,
	IonHeader, 
	IonIcon,
	IonImg,
	IonItem,
	IonLabel,
	IonList,
	IonPage, 
	IonRadio,
	IonRadioGroup,
	IonSegment,
	IonSegmentButton,
	IonText,
	IonTitle,
	IonToast,
	IonToolbar
} from "@ionic/react"
import {
	heart, 
	logoGithub, 
	logoIonic, 
	play, 
	stop
} from "ionicons/icons"
import {Helmet} from "react-helmet"

// Import stylesheets
import "../stylesheets/Home.css"

// Import configuration
import configuration from "../configuration/Home.json" 

// Declare TypeScript types and functions
type DatacenterID = keyof typeof configuration.database.configs
declare function setInterval(handler: () => void, delay: number): Number
declare function clearInterval(scheduled: Number): void
function isKeyof<T extends object>(obj: T, possibleKey: keyof any): possibleKey is keyof T{
	return possibleKey in obj;
}

// Load fonts
WebFont.load({
    google: {
        families: ["Roboto:300,400,500,700,900", "sans-serif"]
    }
})

// Add listnerfor back button
Plugins.App.addListener("backButton", function(){
	Plugins.App.exitApp()
})

// Define Home component
const Home: React.FC = () => {

	const [datacenter, setDatacenter] = useState<string>();
	const [beaconingInterval, setBeaconingInterval] = useState<string>()
	const [showToast, setShowToast] = useState(false);
	var intervalID: Number
	var firebaseApp: firebase.app.App
	var userID: string

	// Function that closes the splash screen
	useEffect(() => {

		Plugins.SplashScreen.hide()

	})

	// Function that beacon
	const beacon = async () => {

		// Log
		console.log("Inside beaconing function ")

		Geolocation.getCurrentPosition().then(data => {

			// Create new object
			var location_object = JSON.parse(JSON.stringify(configuration.database.template))
			location_object.geometry.coordinates[0] = data.coords.latitude
			location_object.geometry.coordinates[1] = data.coords.longitude
			location_object.properties.id = userID
			location_object.properties.timestamp = (new Date()).getTime()

			// Log
			console.log("Coordinates are: (" + data.coords.latitude + ", " + data.coords.longitude + ")")

			// Push object to database
			firebaseApp.database().ref("features").push(location_object)

		}).catch((error) => {

			// Log
			console.log("Error getting location: " + error)

		});

	}
	
	// Function that starts beaconing
	const startBeaconing = () => {

		// Check if a datacenter was selected || (new Date(beaconingInterval)).getMinutes() == 0 && (new Date(beaconingInterval)).getMinutes() == 0
		if (!datacenter || !beaconingInterval){
			setShowToast(true)
			return
		}
		else{

			// Compute and check interval
			var date = new Date(beaconingInterval)
			var interval_in_miliseconds = 1000 * (60 * date.getMinutes() + date.getSeconds())
			if (interval_in_miliseconds === 0){
				setShowToast(true)
				return
			}
			else if (isKeyof(configuration.database.configs, datacenter)){

				// Init Firebase app if needed
				if (!firebase.apps.length)
					firebaseApp = firebase.initializeApp(configuration.database.configs[datacenter])

				// Try anonymous sign in
				firebase.auth().signInAnonymously().catch(function(error){
					var errorMessage = error.message;
					console.error(errorMessage)
				})
				
				// When sign in is complete
				firebase.auth().onAuthStateChanged(function(user){

					if (user){
						userID = user.uid
						
						// Log
						console.log("The user ID is: " + userID)
						console.log("The selected interval is: " + interval_in_miliseconds)

					}
		
				});

				// Call beaconing function
				intervalID = setInterval(beacon, interval_in_miliseconds)

			}

		}

	}

	// Function that stops beaconing
	const stopBeaconing = () => {

		clearInterval(intervalID)

	}

	return (
		<IonPage>

			{/* Elements from head */}
			<Helmet>

				{/* Title */}
				<title>{configuration.application.name}</title>

				{/* Favicon */}
				<link rel="shortcut icon" type="image/png" href={configuration.application.favicon.path}/>

			</Helmet>

			{/* Header */}
			<IonHeader>

				<IonToolbar>

					<IonTitle className="logo-title">
						<IonImg src={configuration.application.logo.path} className="logo-image"/>
						{configuration.application.name}
					</IonTitle>

				</IonToolbar>

			</IonHeader>

			{/* Main content */}
			<IonContent>
				
				<IonList>

					{/* Datacenter Select */}
					<IonItem lines="none" className="bottom-border bottom-border-dashed">
						<IonLabel>
							{configuration.inputs.labels.datacenter_url}
						</IonLabel>
					</IonItem>
					<IonRadioGroup value={datacenter} onIonChange={e => setDatacenter(e.detail.value)}>

						{configuration.radios.datacenters.map((element, key) => {

							var class_name = (element.is_last) ? "bottom-border" : ""

							return (
								<IonItem lines="none" className={class_name} key={key}>
									<IonLabel>{element.label}</IonLabel>
									<IonRadio slot="start" value={element.value} disabled={element.is_disabled}/>
								</IonItem>
							)

						})}

					</IonRadioGroup>

					{/* Beacons interval */}
					<IonItem>
						<IonLabel position="floating">
							{configuration.inputs.labels.beacons_interval}
						</IonLabel>
						<IonDatetime 
							displayFormat={configuration.inputs.formats.interval} 
							pickerFormat={configuration.inputs.formats.interval}
							value={beaconingInterval}
							minuteValues={configuration.inputs.possible_values.minutes}
							onIonChange={e => setBeaconingInterval(e.detail.value!)}
						/>
					</IonItem>

				</IonList>

				{/* Button to start beaconing */}
				<IonSegment onIonChange={e => console.log("Segment selected", e.detail.value)}>
					<IonSegmentButton value="start" onClick={startBeaconing}>
						<IonLabel>
							{configuration.buttons.captions.start} <IonIcon icon={play} className="start-icon"/>
						</IonLabel>
					</IonSegmentButton>
					<IonSegmentButton value="stop" onClick={stopBeaconing}>
						<IonLabel>
							{configuration.buttons.captions.stop} <IonIcon icon={stop} className="stop-icon"/>
						</IonLabel>
					</IonSegmentButton>
				</IonSegment>

			</IonContent>

			{/* Footer */}
			<IonFooter>
				<IonText>
					{configuration.texts.made_with[0]} <a href={configuration.application.resources_links.ionic}><IonIcon icon={logoIonic} className="logo-ionic-icon"/></a> {configuration.texts.made_with[1]} <IonIcon icon={heart} className="heart-icon"/>. {configuration.texts.project_on} <a href={configuration.application.github.url}><IonIcon icon={logoGithub} className="github-icon"/></a>
				</IonText>
			</IonFooter>

			{/* Toast */}
			<IonToast
				message={configuration.toasts.invalid_firebase_url.message}
				duration={configuration.toasts.invalid_firebase_url.duration}
				isOpen={showToast}
				onDidDismiss={() => setShowToast(false)}
			/>

		</IonPage>
	)
}

// Export
export default Home