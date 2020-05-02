// Import libraries
import React, {useState} from "react"
import WebFont from "webfontloader"

// Import components
import {
	IonContent, 
	IonDatetime,
	IonFooter,
	IonHeader, 
	IonIcon,
	IonImg,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonPage, 
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

// Load fonts
WebFont.load({
    google: {
        families: ["Roboto:300,400,500,700,900", "sans-serif"]
    }
})

// Define Home component
const Home: React.FC = () => {

	const [url, setURL] = useState<string>()
	const [showToast, setShowToast] = useState(false);

	// Function that starts beaconing
	const startBeaconing = () => {
		
		// Check if Firebase URL is valid
		const validation_rule = new RegExp(configuration.inputs.validation_rules.firebase_url, 'i')
		var match = url?.match(validation_rule)
		if (!match || match[0] !== url)
			setShowToast(true)

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

					{/* Logo */}
					<IonImg src={configuration.application.logo.path} className="logo-image"/>

					{/* Title */}
					<IonTitle className="logo-title">
						{configuration.application.name}
					</IonTitle>

				</IonToolbar>
			</IonHeader>

			{/* Main content */}
			<IonContent>

				<IonList>

					{/* Datacenter URL */}
					<IonItem>
						<IonLabel position="floating">
							{configuration.inputs.labels.datacenter_url}
						</IonLabel>
						<IonInput 
							type="url" value={url}
							inputmode="url"
							onIonChange={e => setURL(e.detail.value!)}
						/>
					</IonItem>

					{/* Beacons interval */}
					<IonItem>
						<IonLabel position="floating">
							{configuration.inputs.labels.beacons_interval}
						</IonLabel>
						<IonDatetime 
							displayFormat={configuration.inputs.formats.interval} 
							pickerFormat={configuration.inputs.formats.interval}
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
					<IonSegmentButton value="stop">
						<IonLabel>
							{configuration.buttons.captions.stop} <IonIcon icon={stop} className="stop-icon"/>
						</IonLabel>
					</IonSegmentButton>
				</IonSegment>

			</IonContent>

			{/* Footer */}
			<IonFooter>
				<IonText>
					{configuration.texts.made_with[0]} <IonIcon icon={logoIonic} className="logo-ionic-icon"/> {configuration.texts.made_with[1]} <IonIcon icon={heart} className="heart-icon"/>. {configuration.texts.project_on} <a href={configuration.application.github.url}><IonIcon icon={logoGithub} className="github-icon"/></a>
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