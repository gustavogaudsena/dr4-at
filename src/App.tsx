import './App.scss'
import AppProvider from './Context'
import Router from './routes'

function App() {

  return (
    <AppProvider>
      <Router />
    </AppProvider>
  )
}

export default App
