import './App.css';
import {AppLayout} from "./components/layout/AppLayout";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <div>
            <BrowserRouter>
                <AppLayout/>
            </BrowserRouter>
        </div>
    );
}

export default App;
