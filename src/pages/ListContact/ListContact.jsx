import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

ListContact.propTypes = {};

function ListContact(props) {

    const [listContact, setListContact] = useState([]);

    const navigate = useNavigate();

    const getListContact = () => {
        axios.get("http://localhost:3000/profile")
            .then((response) => response.data)
            .then((response) => {
                console.log(response);
                setListContact(response);
            });
    };

    const deleteContact = (id) => {
        axios.delete(`http://localhost:3000/profile/${id}`)
            .then((response) => {
                console.log(response.data);
            });

    };

    useEffect(() => {
        getListContact();
    }, []);
    return (
        <table className={"w-full"}>
            <thead>
            <tr>
                <th className={"text-center"}>First Name</th>
                <th className={"text-center"}>Last Name</th>
                <th className={"text-center"}>Country</th>
                <th className={"text-center"}>Subject</th>
                <th className={"text-center"}>Action</th>
            </tr>

            </thead>
            <tbody>
            {listContact.map((item, index) => (
                <tr key={index}>
                    <td className={"p-4 text-center"}>{item.fName}</td>
                    <td className={"p-4 text-center"}>{item.lName}</td>
                    <td className={"p-4 text-center"}>{item.country}</td>
                    <td className={"p-4 text-center"}>{item.subject}</td>
                    <td className={"p-4 text-center"}>
                        <div className={"flex gap-4"}>
                            <Button onClick={() => {
                                navigate(`/edit-contact/${item.id}`);
                            }}>Sửa</Button>
                            <Button onClick={() => deleteContact(item.id)}>Xóa</Button>
                        </div>
                    </td>
                </tr>
            ))}

            </tbody>
        </table>
    );
}

export default ListContact;