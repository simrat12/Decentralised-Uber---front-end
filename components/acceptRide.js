import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
const ethers = require('ethers')

// Import your contract's ABI and address
import myContractABI from '../constants/abi.json';

export default function AcceptRide2() {
    const myContractAddress = "0x873DeC81cD4adb5Bc35257aBb98F698C3293D1A7";
    const NETWORK_ID = 5;
    // const [userOrDriver, setUserOrDriver] = useState("fail!");
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const [owner, setOwner] = useState(null);
    const [acceptedRide, setAcceptedRide] = useState("nope");

    const contract = new ethers.Contract(myContractAddress, myContractABI, signer);

    const checkIfAccountChanged = async () => {
        try {
            const {ethereum} = window;
            ethereum.on('accountsChanged', (accounts) => {setOwner(accounts[0]); setAcceptedRide("nope")});
            } catch (error) {
                console.log(error);
            }
    }

    useEffect(() => {
        checkIfAccountChanged();
    }, [])

    useEffect(() => {
        acceptedRide;
    }, [acceptedRide])

    async function acceptNewRide(requestID) {

        try {
            let tx = await contract.acceptRide(requestID);
            let receipt = await tx.wait();
            setAcceptedRide("yes");
        } catch (error) {
            console.log(error)
            setAcceptedRide("Failed");
        }
    }

    return (
        <div>
        {(acceptedRide == "nope") ?
        <div>
        <h1 className="text-2xl font-bold underline">Accept Ride</h1>
        <Formik
          initialValues={{
            requestID: '',
          }}
          onSubmit={async ({requestID}) => {
            await acceptNewRide(requestID);
          }}
        >
          <Form>
            <label htmlFor="requestID">Enter Ride ID</label>
            <Field id="requestID" name="requestID" placeholder="  1" />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
        </div>
        : (acceptedRide == "yes") ? <div>Ride Accepted!</div> : <div>Failed to accept ride!</div>}
      </div>
    )

}