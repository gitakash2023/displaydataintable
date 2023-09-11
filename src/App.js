import { useEffect, useState } from "react"


function App() {
  //  declared status
  const [data ,setData]=useState([])
  const [input,setInput]=useState("")
  const[filteredData,setFilteredData]=useState([])

// fuction for fetching data
  const fetchData = async()=>{
    try {
      // use fetch function to fetch data from api
      const response =  await fetch("https://jsonplaceholder.typicode.com/users")
      const jsonData = await response.json()
      // set  jsonData to state variable data
      setData(jsonData) 
      setFilteredData(jsonData)
    } catch (error) {
      console.log("error")  
    }
  }
  // useEffect function for fetching data
  useEffect(()=>{
    fetchData()
  },[])
  //  function for onChangeHandler
  const handleFilterChange = (e) => {
    const searchTerms = e.target.value.toLowerCase();
    setInput(searchTerms);

    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerms) ||
        item.email.toLowerCase().includes(searchTerms)
    );

    setFilteredData(filtered);
  };
  return (
  <>
  <div style={{display:"flex",justifyContent:"center",marginTop:"40px",fontSize:"16px"}}>
    <input type="text"  value={input} onChange={handleFilterChange}
    placeholder="Search"
    
     style={{borderRadius:"10px",padding:"10px"}}/>
  </div>
     <div>
        <h1 style={{textAlign:"center",color:"red"}}>Data Table</h1>
        <div style={{display:"flex",justifyContent:"center"}}>
        <table style={{marginLeft:"80px",border:"1px solid blue"}}>
          <thead >
            <tr >
              <th style={{color:"blue"}}>Name</th>
              <th style={{color:"blue"}}>Email</th>
              <th style={{color:"blue"}}>City</th>
            </tr>
          </thead>
          <tbody >
            {filteredData.map((ele) => (
              <tr key={ele.id} style={{border:"1px solid red"}}>
                <td style={{border:"1px solid red"}}>{ele.name}</td>
                
                <td style={{border:"1px solid red"}}>{ele.email}</td>
                <td style={{border:"1px solid red"}}>{ele.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
  </>
  );
}

export default App;
