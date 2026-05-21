import './App.css'
import GlassCard from './components/glass-card/glass-card'

function App() {
  return (
   <div className='app-container'>
    <GlassCard tint='cool' onClick={() => console.log('test')}>
      Hello 
    </GlassCard>
   </div>
  )
}

export default App
