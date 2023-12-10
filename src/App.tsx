import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Neis from 'neis.ts'
import { Logger } from 'tslog'
import RealtimeMealChart from './components/RealtimeMealChart'



function App() {
  const [count, setCount] = useState(0)

  const neis = new Neis({
    key: '41a29aeda063494ebed4932f8eab7a20',
    logger: new Logger(),
  })

  neis
    .getSchool({
      ATPT_OFCDC_SC_CODE: 'P10',
      SD_SCHUL_CODE: '8320104',
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.error(err)
    })

  const mealInfo = neis.getMeal({
    ATPT_OFCDC_SC_CODE: 'P10',
    SD_SCHUL_CODE: '8320104',
    MLSV_YMD: '20210929',
  })
  console.log(mealInfo)


  return (
    <div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='font-sans'>
        Click on the Vite and React logos to learn more. 안녕하세요요. \(1+1=2\)
      </p>

      <h1 className='text-4xl font-sans font-bold'>실시간 급식실 혼잡도</h1>
      <div className='font-sans'>
      <RealtimeMealChart />
      </div>
    </div>      
  )
}

export default App
