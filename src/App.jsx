import { useState, useRef, useEffect} from 'react'
import { db,auth } from "./firebase";

import './styles/App.css'
import './styles/navbar.css'
import './styles/sidebar.css'
import './styles/components.css'
import plus from './assets/circle-plus-filled-svgrepo-com.svg'
import trash from './assets/trash-circle-fill-svgrepo-com.svg'
import trash2 from './assets/trash-can-solid-full.svg'

import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth";
import {collection,addDoc,getDoc,doc, setDoc,updateDoc } from "firebase/firestore";

import {Test,OkPopup,TextPopup,OptionPopup} from "./components/popup-components.jsx";

function App() {
  // ================LOGIN AND LOGOUT===============================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  var [isLoggedIn, setIsLoggedIn] = useState(false);

  var [userDATA, setUiserData] = useState({});
  var [disenoData, setDienoData] = useState(['DLM']);


  async function signup() {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Account created");
    } catch (err) {
      console.error(err.message);
    }
  }

  async function login() {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("LOGGED IIIN")
      setIsLoggedIn(prev =>true)

      alert("Logged in");
      loadData();
    } catch (err) {
      console.error(err.message);
    }
  }

  async function logout() {
    console.log("LOGGED OUUTTT")
    setIsLoggedIn(prev =>false)
    await signOut(auth);
  }

  // ================GET AND ADD DOCS===============================
  async function loadData() {
    const userRef = doc(
      db,
      "users",
      auth.currentUser.uid
    );

    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      setUiserData(snapshot.data().AppData)
      setDienoData(snapshot.data().diseno)
    } else {
      console.log("No data found");
    }
  }

  async function saveData() {
    try {
      /*
      await setDoc(doc(db, "users", auth.currentUser.uid),{
        favoriteColor: "pink",
        score: 100
      });
      */
      //var key = document.getElementById("keyD").value;
      //var value = document.getElementById("valD").value;

      //console.log(key);console.log(value);

      //let dict = {}
      //dict[key]= value;

      await updateDoc(
        doc(db, "users", auth.currentUser.uid),
        {
          [`AppData.${inputRef.current.value}`]: lines
        }
      );
      
      console.log("Saved!");
    } catch (err) {
      console.error(err);
    }
  }
  async function updateDiseno(){
    try {
      await updateDoc(
        doc(db, "users", auth.currentUser.uid),
        {
          ['diseno']: disenoData
        }
      );
      console.log("Updated disenos!");
    } catch (err) {
      console.error(err);
    }
  }

  // ================Tree Hierarchy App===============================
  const [sidebarOpen, setSidebarOpen] = useState(false);
  function toggleSidebar() {setSidebarOpen(prev => !prev);}

  const sizeOptions = [80,85,90,94,215];

  const today = new Date().toISOString().split("T")[0];


  const [lines, setLaines] = useState({});
  const inputRef = useRef(null);
  
  function addLine() {
    setLaines(prev => ({
      ...prev,
      [Object.keys(prev).length]: { cliente: '', 'details':{} }
    }));
  }
  function deleteLine(){
    setLaines(prev => {
      const copy = { ...prev };
      delete copy[Object.keys(copy).length - 1];
      return copy;
    });
  }
  function addChild(lineIndex) {
    setLaines(prev => ({
      ...prev,
      [lineIndex]: {
        ...prev[lineIndex],
        details: {
          ...prev[lineIndex].details,
          [Object.keys(prev[lineIndex].details).length]: {diseno: 'DLM',medida: 80,cantidad: 0}
        }
      }
    }));
  }
  function deleteChild(lineIndex) {
    setLaines(prev => {
      const details = { ...prev[lineIndex].details };
      delete details[Object.keys(details).length - 1];
      return {
        ...prev,
        [lineIndex]: {
          ...prev[lineIndex],
          'details' : details// o solo  details
        }
      };
    });
  }
  function changeCLiente(index,value){
    setLaines(prev =>{
      const details = { ...prev[index].details };
      return {
        ...prev,
        [index]:{'cliente':value, details}
      }      
    }
    )
  }
  function increase(index,childIndex) {
    setLaines(prev => {
      const detailscopy = {...prev[index]['details'][childIndex]};
      detailscopy.cantidad++;
      return {...prev,
      [index]:{
        ...prev[index],
        ['details']: {
          ...prev[index].details,
          [childIndex]: detailscopy
        }
      }}
    });
  }
  function decrease(index,childIndex) {
    setLaines(prev => {
      const detailscopy = {...prev[index]['details'][childIndex]};
      if (detailscopy.cantidad > 0){ detailscopy.cantidad--;}else{return prev}
      return {...prev,
      [index]:{
        ...prev[index],
        ['details']: {
          ...prev[index].details,
          [childIndex]: detailscopy
        }
      }}
    });
  }
  function changeValue(index,childIndex, value) {
    setLaines(prev => {
      const detailscopy = {...prev[index]['details'][childIndex]};
      detailscopy.cantidad = Number(value);
      return {...prev,
      [index]:{
        ...prev[index],
        ['details']: {
          ...prev[index].details,
          [childIndex]: detailscopy
        }
      }}
    });
  }
  function handleChangeD(index,childIndex,value) {
    lines[index]['details'][childIndex].diseno = value;
  }
  function handleChangeM(index,childIndex,value) {
    lines[index]['details'][childIndex].medida = Number(value);
  }

  //============TIMES RENDERED============================
  //const count = useRef(0);
  useEffect(() => {
    updateDiseno();
    //count.current = count.current + 1;
    //console.log('RENDERED'/*, count.current*/);
    //console.log(lines);
  },[disenoData]);//Runs on every render

  //============ SAVE ============================
  const [dvalue, setDValue] = useState(today);
  function handleDateChange(e) {
    setDValue(e.target.value);
  }

  var [isVisible, setIsVisible] = useState(false);

  function FLIP(){
    setIsVisible(prev =>!prev)
  }

  function loadPaper(v){
    setLaines(prev => userDATA[v])
  }

  function Tash(){
    console.log('tash');
  }

  let [testText, setTestText] = useState("mcDIgnlushPlingushl");
  function popupInput(){
    let r= prompt("Please enter ANYTHING \n I BEG YUU", "");
    setTestText(r);
  }

  //================================ POPUPS ==================================
  const [showSettings, setshouwSettings] = useState(false);
  const [setti, setSetti] = useState("Display");
  const agregarInptRef = useRef(null);
  const borrarInptRef = useRef(null);


  const [showPopup, setShowPopup] = useState(false);
  const [showTextPopup, setShowTextPopup] = useState(false);
  const [showOptionPopup, setShowOptionPopup] = useState(false);

  function popSet(){setshouwSettings(prev=>!prev);}
  function popo1(){setShowPopup(prev=>!prev);}
  function popo2(){setShowTextPopup(prev=>!prev);}
  function popo3(){setShowOptionPopup(prev=>!prev);}
  function popoALL(){setShowPopup(prev=>!prev);setShowTextPopup(prev=>!prev);setShowOptionPopup(prev=>!prev);}




  return (
    <>

    <nav className="">
      <div id="container-fluid">
        <a id="navbar-brand" href="#">Cuenta llantas {isVisible && <span>pukiiii ;3</span>}</a>

        <button className="" id="menu-toggle" onClick={toggleSidebar}>☰</button>
      </div>
    </nav>
    <div id="sidebar" className={sidebarOpen ? "sidebar active" : "sidebar"}>
     <div id="sidebar-container">
        {isLoggedIn ? 
        <>
          <input type="date" id="date" ref={inputRef} value={dvalue} onChange={handleDateChange}/>
          <button id="saveBtn" className="BigB" title="Guardar los datos" onClick={saveData}>Save Dataa 💾</button>
          <br/>
          <button onClick={popSet} className="BigB">⚙ Settings </button><br/>
          <div className='folderContainer'>
            {Object.keys(userDATA).map((key) => (
              <div key={`${key}`} data-value={`${key}`} className='sidebar-option' onClick={(e)=>loadPaper(e.currentTarget.dataset.value)}>
                <div>{key}</div>
                <button onClick={Tash}><img className='button-line' src={trash2} alt="" className='iconn2' /></button>
              </div>
            ))}
        </div>
        </>
        : 
        <>
          <h1>Log in first</h1>
        </> }
      </div>

    </div>
    {isLoggedIn ? <>
    <div id="content">
      <div id="container">
        {Object.entries(lines).map((children) => (
          <div className="line-container" key={`c${children[0]}`}>
            <div className='line-line'>
              <input type="text" id={`inp${children[0]}`} key={children[0]} placeholder={`Cliente${parseInt(children[0]) + 1}...` } onChange={(e) => changeCLiente(children[0], e.target.value)} value={children[1].cliente ?? "No bio provided."}/>
              <button title='Crear una fila nueva' className='button-line' onClick={() => addChild(children[0])}><img src={plus} alt="" className='iconn' /></button>
              <button title='Eliminar la ultima fila creada' className='button-line' onClick={() => deleteChild(children[0])}><img src={trash} alt="" className='iconn' /></button>
            </div>
            <div>
              {Object.entries(children[1]['details']).map((child) => (
                <div key={`${children[0]}${child[0]}`} className='info-container'>
                  <select name="" id={`s${children[0]}${child[0]}`} onChange={(e)=>handleChangeD(children[0],child[0],e.target.value)} value={child[1].diseno}>
                    {disenoData.map((TiOP, index) => (
                      <option key={`${index}${child[0]}${TiOP}`}>{TiOP}</option>
                    ))};
                  </select>
                  <select name="" id={`z${children[0]}${child[0]}`} onChange={(e)=>handleChangeM(children[0],child[0],e.target.value)} value={child[1].medida}>
                    {sizeOptions.map((siOP, index) => (
                      <option key={`${index}${child[0]}${siOP}`}>{siOP}</option>
                    ))};
                  </select>
                  {<input type="number" id={`${children[0]}${child[0]}`} min="0" placeholder="Amount.." value={child[1].cantidad} onChange={(e) => changeValue(children[0],child[0], e.target.value)} /> }
                  <button title='Menos' className='BigB mathBtn' onClick={() => decrease(children[0],child[0])}>-</button>
                  <button title='Más' className='BigB mathBtn' onClick={() => increase(children[0],child[0])}>+</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <br/>
      <button id="newBtn" className="BigB" title="Crear un cliente nuevo" onClick={addLine}>New</button>
      <button id="delBtn" className="BigB" title="Borrar el ultimo cliente creado" onClick={deleteLine}>Delete</button>
      
      <br/> 
      <button onClick={FLIP}>VISIBLEE</button>

    </div>
    </> : 
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" id="email" autoComplete="on" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <br />
      <button onClick={login} className="BigB">Login</button>
    </div> }
 
      {showSettings && 
      <div className="overlay">
        <div className="Settings">
          <h1>Settings</h1>
          {
            setti === "agregar" ? 
            <>
            <h2>Agregar</h2>
            <input ref={agregarInptRef} type="text" name="" id="" placeholder='diseño...'/>
            <button onClick={() => {
              let ee =  agregarInptRef.current.value;
              setDienoData(prev=>[...prev,ee]);
              setSetti("Display");
              setshouwSettings(false);
              }}>Aceptar</button>
            <br/><br/><br/>
            <button className="midBtn" onClick={() => setSetti("Display")}>volver</button>
            </>
            
            : setti === "borrar" ?             
            <>
            <h2>Borrar</h2>
            <select ref={borrarInptRef} name="" id="">
              {disenoData.map((value, index) => (
                <option key={`Sett${index}${value}`}>{value}</option>
              ))};
            </select>
            <button onClick={() => {
              let ee =  borrarInptRef.current.value;
              console.log(disenoData);
              console.log(disenoData.filter(dise=>dise!=ee));
              setDienoData(prev => (prev.filter(dise=>dise!=ee)));
              setSetti("Display");
              setshouwSettings(false);
              }}>Aceptar</button>
            <br/><br/><br/>
            <button className="midBtn" onClick={() => setSetti("Display")}>volver</button>
            </>
            :
            <>
              <div>
                <div  style={{fontSize: "1.6rem"}}>Diseño</div>
                <button className="midBtn" onClick={() => setSetti("agregar")}>Agregar</button>
                <button className="midBtn" onClick={() => setSetti("borrar")}>Borrar</button>
              </div>
              <br />
              <div>
                <div  style={{fontSize: "1.6rem"}}>Log Out</div>
                <button className="midBtn"  onClick={logout} >Log Out</button>
              </div>
              
              <br/><br/><br/>
              <button className="midBtn" onClick={() => setshouwSettings(false)}>volver</button>
            </>
          }

        </div>
      </div>}   

{isVisible && 
<>       
<p>SEXCO</p>
<p>{testText}</p>
<button onClick={popupInput}>Try it</button>
<button onClick={popo1}>OkPopup</button><button onClick={popo2}>TextPopup</button><button onClick={popo3}>OptionPopup</button><button onClick={popoALL}>ALL</button>

       <OptionPopup
         isOpen={showOptionPopup}
         options={["Easy", "Medium", "Hard"]}
         onSubmit={(value) => console.log(value)}
         onClose={() => setShowOptionPopup(false)}
       />
      <TextPopup
         isOpen={showTextPopup}
         onClose={() => setShowTextPopup(false)}
         onSubmit={(value) => console.log(value)}
       /> 
       <OkPopup
         isOpen={showPopup}
         onClose={() => setShowPopup(false)}
         message="Data saved successfully!"
       />  
</>}   

  </>
  );
}

export default App;

