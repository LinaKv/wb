import './App.scss';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Outlet } from 'react-router-dom';
import { NAVIGATION } from './config/Navigation';
import { BRANDING } from './config/Branding';

function App() {
    return (
        <AppProvider navigation={NAVIGATION} branding={BRANDING}>
            <Outlet />
        </AppProvider>
    );
}

export default App;
