// Import libraries
import React from "react"
import firebase from "firebase"
import {map_to_gradient} from "../helpers/GradientMapping"

// Import components
import {Helmet} from "react-helmet"
import MapGL, {Marker} from "react-map-gl"
import {IconContext} from "react-icons"
import {GiPlainCircle} from "react-icons/gi"

// Import stylesheets
import "../stylesheets/LiveMap.css"

// Import configuration
import configuration from "../configuration/LiveMap.json"

// Define component
class LiveMap extends React.Component{

	constructor(){

		super()

		// Connect to Firebase
		var datacenter = configuration.database.displayed_datacenter
		var firebaseApp = firebase.initializeApp(configuration.database.configs[datacenter])

		// Try anonymous sign in
		firebase.auth().signInAnonymously().catch(function(error){
			var errorMessage = error.message;
			console.error(errorMessage)
		})

		// Set state
		this.state = {
			viewport: configuration.map.initial_location,
			database: {
				app: firebaseApp
			},
			datas: {
				clusters: [],
				points: []
			}
		}

	}

	// Method that checks if there are new changes in the database
	componentDidMount(){

		var component = this

		// When sign in is complete
		firebase.auth().onAuthStateChanged(function(user){

			if (user){

				// Get datas
				component.state.database.app.database().ref("/").on("value", function(snapshot){

					const data = snapshot.val()
					var clusters = []
					var points = []

					data.clusters.forEach(cluster => {
						clusters.push({
							latitude: cluster.center.lat,
							longitude: cluster.center.lon,
							elements: cluster.elements
						})
					})

					for (var feature_name in data.features){

						var feature = data.features[feature_name]

						points.push({
							latitude: feature.geometry.coordinates[0],
							longitude: feature.geometry.coordinates[1]
						})

					}

					// Set state
					component.setState({
						datas: {
							clusters: clusters,
							points: points
						}
					})

				})

			}

		});

	}

	// Method that modifies the viewport of the map
	changeMapViewport = viewport => this.setState({viewport})

	// Method that renders the component
	render(){

		// Generate clusters markers
		var cluster_markers = this.state.datas.clusters.map((element, index) => {

			var ratio = Math.min(element.elements / configuration.map.max_elements_in_cluster, 1)
			var size = Math.min(element.elements + 5, 100)

			// Get cluster style
			var style = {
				color: map_to_gradient(ratio, configuration.map.gradient_colors.first, configuration.map.gradient_colors.second),
				size: size
			}

			return (
				<Marker
					latitude={element.latitude} longitude={element.longitude}
					key={index}
				>
					<IconContext.Provider value={style}>
						<GiPlainCircle/>
					</IconContext.Provider>
				</Marker>
			)
		})

		// Generate points markers
		var points_markers = this.state.datas.points.map((element, index) => {
			return (
				<Marker
					latitude={element.latitude} longitude={element.longitude}
					key={index}
				>
					<GiPlainCircle className="point-marker"/>
				</Marker>
			)
		})

		// Return
		return (
			<div>
				
				{/* Title and favicon */}
				<Helmet>

					<title>{configuration.application.name}</title>
					<link rel="shortcut icon" type="image/png" href={configuration.application.favicon.path}/>

				</Helmet>

				{/* Map */}
				<div id="MapContainer">
					<MapGL
						{...this.state.viewport}
						mapboxApiAccessToken="pk.eyJ1IjoiaW9zaWZhY2hlIiwiYSI6ImNrOGQ4cndhZTAxeTMzZmx6OGQ1Y3doaWEifQ.pt-PopnReVyjgd9FENGlJA"
						width="100vw"
						height="100vh"
						onViewportChange={this.changeMapViewport}
						mapStyle="mapbox://styles/iosifache/ck8dao8c20voi1io4kjur93v6"
					>
						{points_markers}
						{cluster_markers}
					</MapGL>
				</div>

			</div>
		)

	}

}

// Export
export default LiveMap