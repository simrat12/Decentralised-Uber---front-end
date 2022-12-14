import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
const ethers = require('ethers')

// Import your contract's ABI and address
import myContractABI from '../constants/abi.json';

export default function RequestRide2() {
    const myContractAddress = "0x873DeC81cD4adb5Bc35257aBb98F698C3293D1A7";
    const NETWORK_ID = 5;
    // const [userOrDriver, setUserOrDriver] = useState("fail!");
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const [owner, setOwner] = useState(null);
    const [ride, setRide] = useState("nope");

    const contract = new ethers.Contract(myContractAddress, myContractABI, signer);

    const checkIfAccountChanged = async () => {
        try {
            const {ethereum} = window;
            ethereum.on('accountsChanged', (accounts) => {setOwner(accounts[0]); setRide("nope")});
            } catch (error) {
                console.log(error);
            }
    }

    useEffect(() => {
        checkIfAccountChanged();
    }, [])

    useEffect(() => {
        ride;
    }, [ride])

    async function requestNewRide(startLocation, destination) {

        try {
            let tx = await contract.requestRide(startLocation, destination);
            let receipt = await tx.wait();
            setRide([startLocation, destination]);
        } catch (error) {
            console.log(error)
            setRide("Failed!");
        }
    }

    return (
        <div>
        {(ride == "nope") ?
        <div>
        <h1 className="text-2xl font-bold underline">Request Ride</h1>
        <Formik
          initialValues={{
            startLocation: '',
            destination: '',
          }}
          onSubmit={async ({startLocation, destination}) => {
            await requestNewRide(startLocation, destination);
          }}
        >
          <Form>
            <label htmlFor="startLocation">Enter Starting Location</label>
            <Field id="startLocation" name="startLocation" placeholder=" London" />

            <label htmlFor="destination">Enter Destination</label>
            <Field id="destination" name="destination" placeholder=" Manchester" />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
        </div>
        : (ride.length == 2) ? <div>Ride requested, from {ride[0]} to {ride[1]}</div> : <div>Failed to request ride!</div>}
      </div>
    )

}