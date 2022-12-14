import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
const ethers = require('ethers')

// Import your contract's ABI and address
import myContractABI from '../constants/abi.json';

export default function LandingPage2() {
    console.log("test");
    const myContractAddress = "0x873DeC81cD4adb5Bc35257aBb98F698C3293D1A7";
    const NETWORK_ID = 5;
    // const [userOrDriver, setUserOrDriver] = useState("fail!");
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const [owner, setOwner] = useState(null);
    const [registered, setRegistered] = useState("no");

    const contract = new ethers.Contract(myContractAddress, myContractABI, signer);

    // if (!web3.currentProvider) {
    //     return <div>Please install and connect metamask.</div>;
    // }
    
    // if (web3.eth.net.getId() !== NETWORK_ID) {
    //     return <div>Please connect to the correct network.</div>;
    // } 

    const checkIfAccountChanged = async () => {
        try {
            const {ethereum} = window;
            ethereum.on('accountsChanged', (accounts) => {setOwner(accounts[0]); setRegistered("no")});
            } catch (error) {
                console.log(error);
            }
    }

    useEffect(() => {
        checkIfAccountChanged();
    }, [])

    useEffect(() => {
        registered;
    }, [registered])

    // useEffect(() =>{
    //     userOrDriver
    // }, [userOrDriver])


    // async function handleClickIfUser() {
    //     // call the registerUser function in your contract using the user's inputs and the first account in their metamask wallet
    //     let name1 = document.getElementById("name").value;
    //     let city = document.getElementById("city").value;
    //     let isPremium = document.getElementById("preference").value;
    //     let acc = await provider.listAccounts()

    //     try {
    //         await contract.RegisterUser(acc[0], name1, city, isPremium);
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }

    async function handleClickIfUser2(name1, city, isPremium) {
        // call the registerUser function in your contract using the user's inputs and the first account in their metamask wallet
        let acc = await provider.listAccounts()

        try {
            let tx = await contract.RegisterUser(acc[0], name1, city, isPremium);
            let receipt = await tx.wait();
            setRegistered("yes");
        } catch(err) {
            console.log(err);
            setRegistered("failed");
        }
    }

    // async function handleClickIfDriver() {
    //     // call the registerUser function in your contract using the user's inputs and the first account in their metamask wallet
    //     let name1 = document.getElementById("name").value;
    //     let city = document.getElementById("city").value;
    //     let isPremium = document.getElementById("preference").value;
    //     let acc = await provider.listAccounts()

    //     try {
    //         await contract.RegisterDriver(acc[0], name1, city, isPremium);
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }

    async function handleClickIfDriver2(name1, city) {
        // call the registerUser function in your contract using the user's inputs and the first account in their metamask wallet
        let acc = await provider.listAccounts()
        console.log(acc[0]);
        console.log(name1);
        console.log(city);

        try {
            let tx = await contract.RegisterDriver(acc[0], city, name1);
            let receipt = await tx.wait();
            setRegistered("yes");
        } catch(err) {
            console.log(err);
            setRegistered("failed");
        }
    }

    // function register() {
    //     let pref = document.getElementById("userOrDriver").value;
    //     setUserOrDriver(pref);
    //     console.log("changed!");
    //     console.log(userOrDriver);
    // }

    return (
        <div> {console.log(registered)}
        {(registered == "no") ?
        <div>
        <h1 className="text-3xl font-bold underline">Sign Up</h1>
        <Formik
          initialValues={{
            UserOrDriver: '',
            Name: '',
            City: '',
            Preference: '',
          }}
          onSubmit={async ({UserOrDriver, Name, City, Preference}) => {
            if (UserOrDriver == "User") {
                await handleClickIfUser2(Name, City, Preference);
            } else if (UserOrDriver == "Driver") {
                await handleClickIfDriver2(Name, City);
            }
          }}
        >
          <Form>
            <label htmlFor="UserOrDriver"></label>
            <Field id="UserOrDriver" name="UserOrDriver" placeholder="UserOrDriver" />

            <label htmlFor="Name">Name</label>
            <Field id="Name" name="Name" placeholder=" Jane" />
    
            <label htmlFor="City">City</label>
            <Field id="City" name="City" placeholder=" London" />
    
            <label htmlFor="Preference">Premium Membership?</label>
            <Field
              id="Preference"
              name="Preference"
              placeholder=" Yes"
              type="Preference"
            />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
      : (registered == "yes") ? <div className="text-3xl font-bold">Submission Successful!</div> : <div className="text-3xl font-bold">Submission Failed!</div>}
      </div>
    )

    // return (
    //     <div>TESTING! 
    //         <div>
    //             <input type="text" name="userOrDriver" id="userOrDriver"></input>
    //             <button style={{height: "30px", width: "100px"}} onClick={() => register()}></button>
    //         </div>
    //         <div>
    //             <input type="text" name="name" id="name" ></input>
    //             <input type="text" name="city" id="city" ></input>
    //             <input type="text" name="preference" id="preference" ></input>
    //         </div>
    //         <div>{(userOrDriver == "User") ?
    //             <button onClick={async () => await handleClickIfUser()}>Register as User here</button> : (userOrDriver == "Driver") ?
    //             <button onClick={async () => await handleClickIfDriver()}>Register as Driver here</button> : <></>}
    //         </div>
    //     </div>
    // )
}

