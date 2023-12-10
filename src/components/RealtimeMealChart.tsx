import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RealtimeMealChart = () => {
  const [people_count, setPeople] = useState<{ id: number, name: string }[]>([]);

  useEffect(() => {
    getPeople();
    const interval = setInterval(getPeople, 5000); // Fetch new data every 5 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  async function getPeople() {
    const { data } = await supabase.from("people_count").select().order('created_at', { ascending: false }).limit(100);
    if (data) {
      const modifiedData = data.reverse().map((people) => {
        const date = new Date(people.created_at);
        const utc9Date = new Date(date.getTime()); // add 9 hours to convert to UTC+9
        const formattedDate = utc9Date.toLocaleString();
        return { ...people, created_at: formattedDate };
      });
      setPeople(modifiedData);
    }
  }

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={people_count}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="created_at" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="num_of_people"
          name="사람 수"
          stroke="#000000"
          activeDot={{ r: 8 }}
        />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default RealtimeMealChart;
