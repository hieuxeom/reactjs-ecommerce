import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useParams } from "react-router-dom";

EditContact.propTypes = {};

function EditContact(props) {

    const { id } = useParams();

    const [lName, setLName] = useState("");
    const [fName, setFName] = useState("");
    const [country, setCountry] = useState("");
    const [subject, setSubject] = useState("");

    const getProfile = () => {
        axios.get(`http://localhost:3000/profile/${id}`).then(response => response.data).then((response) => {
            console.log(response);
            setLName(response.lName);
            setFName(response.fName);
            setSubject(response.subject);
            setCountry(response.country);
        });
    };

    const editProfile = () => {
        axios.put(`http://localhost:3000/profile/${id}`, {
            "fName": fName,
            "lName": lName,
            "country": country,
            "subject": subject
        });
    };

    useEffect(() => {
        console.log(id);
        getProfile();
    }, [id]);
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

            <Button fullWidth={true} onClick={editProfile}>Submit</Button>
        </div>
    );
}

export default EditContact;