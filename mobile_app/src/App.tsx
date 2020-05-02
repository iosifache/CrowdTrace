// Import libraries
import React from "react"
import {
	Redirect,
	Route
} from "react-router-dom"
import {IonReactRouter} from "@ionic/react-router"

// Import components
import {
	IonApp, 
	IonRouterOutlet
} from "@ionic/react"

// Import pages
import Home from "./pages/Home"

// Import stylesheets
import "@ionic/react/css/core.css"
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"

// Define component
const App: React.FC = () => (

	<IonApp>

		{/* Router */}
		<IonReactRouter>
			<IonRouterOutlet>
				<Route path="/" exact render={() => <Redirect to="/home" />}/>
				<Route path="/home" exact={true} component={Home}/>
			</IonRouterOutlet>
		</IonReactRouter>

	</IonApp>

)

// Export
export default App