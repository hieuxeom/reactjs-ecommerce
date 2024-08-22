import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Textarea } from "@nextui-org/react";
import axios from "axios";

FinalTest.propTypes = {};

function FinalTest(props) {

    const [lName, setLName] = useState("");
    const [fName, setFName] = useState("");
    const [country, setCountry] = useState("");
    const [subject, setSubject] = useState("");

    const submitNewProfile = () => {
        axios.post("http://localhost:3000/profile", {
            "fName": fName,
            "lName": lName,
            "country": country,
            "subject": subject
        });
    };
    return (
        <div className={"w-full flex flex-col gap-4"}>

            <Input label={"First Name"}
                   value={fName}
                   onValueChange={setFName}
            />
            <Input label={"Last Name"}
                   value={lName}
                   onValueChange={setLName}
            />

            <Input label={"Country"}
                   value={country}
                   onValueChange={setCountry}
            />
            <Textarea label={"Subject"}
                      value={subject}
                      onValueChange={setSubject}
            />

            <Button fullWidth={true} onClick={submitNewProfile}>Submit</Button>
        </div>
    );
}

export default FinalTest;