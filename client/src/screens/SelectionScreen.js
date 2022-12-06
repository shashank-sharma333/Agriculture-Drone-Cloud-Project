import React from "react"
    import "./SelectionScreen.css"
    import {Routes, Route, useHistory} from "react-router-dom";

    

    export default function SelectionScreen() {

        const navigate = useHistory();

        const navigateToHome = () => {
            // 👇️ navigate to /contacts
            navigate.push('/');
        };
        async function register(){

            // if(password!=cpassword)
            // {
            //     alert("passwords not matched")
            // }
            // else{
            //     const user={
            //         name,
            //         email,
            //         password
            //         }
                
            //     try {
            //       setloading(true)
            //       const result = await axios.post('/api/users/register',user)
            //       setloading(false)
            //       setsuccess(true)
            //       setemail('')
            //       setname('')
            //       setcpassword('')
            //       setpassword('')
            //     } catch (error) {
            //       seterror(true)
            //       setloading(false)
            //       console.log(error);
            //     }
            
            // }
    
        }
    return (
        <div className="register-1 flex-col-hstart-vstart clip-contents">
        <div className="form-section">
            <div className="divider flex-col-hstart-vstart clip-contents">
            <p className="txt-255">or</p>
            
            &ensp;  &ensp;
            </div>
            
            <div class="text-center">
                <div className="button-sign-up  ">
                    <button onClick={navigateToHome} className="btn btn-primary text">Back</button>
                </div>
            </div>
            
       

            <p className="txt-112">Select Role to Register As</p>
        <a href="/createprofile">
            <img    
            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/0ppb7yxkqy8-1804%3A2152?alt=media&token=280f1cb8-beb9-4309-a6e8-3b7011a1464a"
            alt="Not Found"
            className="ellipse-1"
        
            />
            </a>
            <div className="group-185 flex-row">
            <p className="txt-779">Farmer</p>
            <p className="txt-723">Drone Pilot</p>
            </div>
            <a href="/createpilotprofile">
            <img
            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/0ppb7yxkqy8-1804%3A2155?alt=media&token=1ae276d0-51af-4d2f-b7a6-a39ae2d64c87"
            alt="Not Found"
            className="ellipse-2"
            /> 
            </a>
        </div>
        
        <p className="txt-119">Welcome! Let’s finish your registration.</p>
       
        </div>
    )
    }