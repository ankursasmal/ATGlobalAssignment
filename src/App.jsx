 
 import React, { useEffect, useState } from 'react'
 import axios from 'axios';
  function App() {
  let [spenner,setspenner]=useState(true)

let [user,setuser]=useState([]);
 let [see,setsee]=useState(true)
let[Filteruser,setFilteruser]=useState([]);
 let [shownUserId, setShownUserId] = useState(null);

// function for destructruing data fron api
async function Apidata(){
  try{
    let res=await axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users');

//  console.log(res.data);

// because some data are missing so i slice  the array 
setFilteruser(res.data.slice(11,res.data.length));
setuser(res.data.slice(11,res.data.length));
// for spinner
setspenner(false);

  }
  catch(error){
console.log('Data not fetch from Api due to:',error.message);
  }
}

 
// for call one time when page 1st time load
useEffect(()=>{
  Apidata();

   },[])
 
 
  //  onclick userDetail appear in rigth side
   let handelShowDetail = (e, userId) => {
    e.preventDefault();
     setShownUserId(prevUserid => prevUserid === userId ? null : userId);
   }
 

  
 return (
     <div className='container ' >


    <div className='d-flex  justify-center ' style={{flexDirection:'column',alignItems:'center'}}  >
<a  style={{fontSize:'4vw',fontWeight:'600',margin:'20px 0'}}>User Details</a>

<input type="text" placeholder='search user according fristName' className='rounded-pill' style={{padding:'1vw 2vw',width:'60vw',marginTop:'15px',marginBottom:'23px',fontSize:'1.8vw'}}   onChange={(e)=>{
  e.preventDefault();
  setuser(Filteruser.filter((val => val.profile.firstName.toLowerCase().includes(e.target.value))));

}}/>

{user ?(spenner? <img src='./spin.gif'  style={{width:'10vw'}} /> :( <> 
 { user.map((values,i)=>{
   return ( 
    <div key={i}  className='shadow-lg p-3 mb-5 bg-body rounded' style={{display:'flex',alignItems:'center',justifyContent:'center',margin:'15 20',}}   >
    <div  className='m-3 ' style={{width:'36vw' ,display:'flex',flexDirection:'column',alignItems:'center' }}  >
          <img src={values.avatar} className='rounded-circle' style={{width:'20vw',height:'20vw'}} value={values.id} onClick={(e) => handelShowDetail(e, values.id)}/>
        <h1 style={{fontWeight:'600',fontSize:'4vw',color:'#3495e1'}}>{values.profile.firstName || ""} {" "}{values.profile.lastName || ""}</h1>

          </div>
  {/*  show on click */}
   {shownUserId === values.id ?  <div  className='mr-10 ' id={values.id} style={{width:'36vw' }}>

<h1   style={{fontWeight:'600',fontSize:'4vw',color:'#3495e1'}}>{values.profile.firstName || ""} {" "}{values.profile.lastName || ""}</h1>
<h3 style={{fontSize:'2.3vw'}}>{values.jobTitle }</h3>
<h3 style={{fontSize:'2.3vw'}}>{values.profile.email || ""}</h3>
 <h3 style={{fontSize:'2.3vw'}}>{values.createdAt}</h3>
 
  <h3 style={{fontSize:'2.3vw',fontWeight:'600',color:'#7281d4'}} onClick={()=>{see?setsee(false):setsee(true)}}>Other Info... </h3>
{!see?  <div>
    <h3 style={{fontSize:'2.3vw'}}><a style={{fontSize:'2.3vw',color:'#88c4ce',fontWeight:'500'}}>Bio:</a>{" "}{values.Bio}</h3>
    <h3 style={{fontSize:'2.3vw'}}><a style={{fontSize:'2.3vw',color:'#88c4ce',fontWeight:'500'}}>UserName:</a>{values.profile.username || ""}</h3>

<a></a>
    </div>:null}

</div>:null}
       
   </div>
   )
   })
   
   }
</>
)
 
  ):<a>loading....</a> }
    </div>
    
     </div>      
   )
 }
 
 export default App
 