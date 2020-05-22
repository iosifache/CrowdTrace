// Import libraries
import React from "react"
import {
	BrowserRouter as Router,
	Route, 
	Switch
} from "react-router-dom"

// Import components
import LiveMap from "./pages/LiveMap"

// Define component
const App = () => (

	<Router>
		<Switch>
			<Route path="/" exact component={LiveMap}/>
		</Switch>
	</Router>

)

// Export
export default App