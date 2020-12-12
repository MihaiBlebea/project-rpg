import './App.css'
import Map from './components/Map/Map'
import Camera from './components/Camera/Camera'

function App() {
    return (
        <div className="App">
            <Camera>
                <Map name="Serban"></Map>
            </Camera>
        </div>
    );
}

export default App;
