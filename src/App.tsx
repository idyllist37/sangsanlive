import './App.css'
import Neis from 'neis.ts'
import { Logger } from 'tslog'
import RealtimeMealChart from './components/RealtimeMealChart'



function App() {

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
      <h1 className='text-4xl font-sans font-bold'>실시간 급식실 혼잡도</h1>
      <div className='font-sans'>
      <RealtimeMealChart />
      </div>
    </div>      
  )
}

export default App
