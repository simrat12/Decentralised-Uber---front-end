import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
const ethers = require('ethers')

// Import your contract's ABI and address
import myContractABI from '../constants/abi.json';

export default function CancelRide2() {
    const myContractAddress = "0x873DeC81cD4adb5Bc35257aBb98F698C3293D1A7";
    const NETWORK_ID = 5;
    // const [userOrDriver, setUserOrDriver] = useState("fail!");
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const [owner, setOwner] = useState(null);
    const [cancelledRide, setCancelledRide] = useState("nope");

    const contract = new ethers.Contract(myContractAddress, myContractABI, signer);

    const checkIfAccountChanged = async () => {
        try {
            const {ethereum} = window;
            ethereum.on('accountsChanged', (accounts) => {setOwner(accounts[0]); setCancelledRide("nope")});
            } catch (error) {
                console.log(error);
            }
    }

    useEffect(() => {
        checkIfAccountChanged();
    }, [])

    useEffect(() => {
        cancelledRide;
    }, [cancelledRide])

    async function cancelNewRide(requestID) {

        try {
            let tx = await contract.cancel_ride(requestID);
            let receipt = await tx.wait();
            setCancelledRide("yes");
        } catch (error) {
            console.log(error)
            setCancelledRide("Failed");
        }
    }

    return (
        <div>
        {(cancelledRide == "nope") ?
        <div>
        <h1 className="text-2xl font-bold underline">Cancel Ride</h1>
        <Formik
          initialValues={{
            requestID: '',
          }}
          onSubmit={async ({requestID}) => {
            await cancelNewRide(requestID);
          }}
        >
          <Form>
            <label htmlFor="requestID">Enter Ride ID</label>
            <Field id="requestID" name="requestID" placeholder="  1" />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
        </div>
        : (cancelledRide == "yes") ? <div>Ride Cancelled!</div> : <div>Failed to request ride!</div>}
      </div>
    )

}