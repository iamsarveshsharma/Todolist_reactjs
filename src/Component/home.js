import React, {useEffect, useState} from 'react';
import styles from "../CSS/home.module.css"
import axios from "axios";

function Home() {

    const [allMessages, setAllMessages] = useState([]);
    const [errorMessages, setErrorMessages] = useState("")
    const [task, setTask] = useState("")
    const [activeTab, setActiveTab] = useState(0);
    useEffect(
        () => {
            if (activeTab === 0) {
                axios({
                    url: "http://localhost:9191/getAllTasks",
                    method: "GET",
                })
                    .then(response => {
                        setAllMessages(response.data)
                    })
                    .catch(error => {
                        alert(error.response.data['message'])
                    })
            } else if (activeTab === 1) {
                axios({
                    url: "http://localhost:9191/getActiveTasks",
                    method: "GET",
                })
                    .then(response => {
                        setAllMessages(response.data)
                    })
                    .catch(error => {
                        alert(error.response.data['message'])
                    })
            } else if (activeTab === 2) {
                axios({
                    url: "http://localhost:9191/getAllCompletedTasks",
                    method: "GET",
                })
                    .then(response => {
                        setAllMessages(response.data)
                    })
                    .catch(error => {
                        alert(error.response.data['message'])
                    })
            }
        }, [activeTab]
    )

    return (<>
            <div className={styles.to_Do_Body}>
                <div className={styles.searchBar}>
                    <label><h2>Task Information</h2></label>
                    <input onChange={(data) => setTask(data.target.value)} type="text" placeholder="Enter Your Task"/>
                    <button onClick={() => {
                        const data = {
                            "message": task,
                        };

                        axios.put(
                            "http://localhost:9191/addTask", data
                        )
                            .then(response => {
                                const active = activeTab;
                                setActiveTab(10)
                                setActiveTab(active)
                            })
                            .catch(error => {
                                setErrorMessages(error.response.data['message'])
                                alert(errorMessages)
                            })
                    }}>Add
                    </button>
                </div>
                <br/>
                <div className={styles.bar}>
                    <button onClick={() => setActiveTab(0)}><label>All</label></button>
                    <button onClick={() => setActiveTab(1)}><label>Active</label></button>
                    <button onClick={() => setActiveTab(2)}><label>Completed</label></button>
                </div>

                <div>
                    <table>
                        <thead>
                        <tr>
                            <td>Task Name</td>
                            <td></td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                        {allMessages != null ? allMessages.map((task, index) => {
                            return (

                                <tr key={task.message + index.toString()}>
                                    <td>{task.message}</td>
                                    <td>
                                        <label className={styles.switch}>
                                            <input onChange={() => {
                                                axios.post(
                                                    "http://localhost:9191/updateStatus/" + task.id,
                                                )
                                                    .then(response => {
                                                        const active = activeTab;
                                                        setActiveTab(10)
                                                        setActiveTab(active)
                                                    })
                                                    .catch(error => {
                                                        setErrorMessages(error.response.data['message'])
                                                        alert(errorMessages)
                                                    })
                                            }} type="checkbox"/>
                                            <span className={styles.slider}></span>
                                        </label>
                                    </td>
                                    <td>
                                        <label onClick={() => {
                                            axios.delete(
                                                "http://localhost:9191/deleteTask/" + task.id,
                                            )
                                                .then(response => {
                                                    const active = activeTab;
                                                    setActiveTab(10)
                                                    setActiveTab(active)
                                                })
                                                .catch(error => {
                                                    setErrorMessages(error.response.data['message'])
                                                    alert(errorMessages)
                                                })
                                        }}>X</label>
                                    </td>
                                </tr>
                            );
                        }) : ""
                        }
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
}

export default Home;
