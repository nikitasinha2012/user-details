
import React, { Component } from 'react';
import { Card, Modal, Button } from 'antd';
import { AppointmentPicker } from 'react-appointment-picker';
import AvailableTimes from 'react-available-times';
import './MainPage.css';
import 'antd/dist/antd.css';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import { FormControl } from 'react-bootstrap'
import moment from "moment";


class MainPage extends Component {
    constructor() {
        super();
        let now = new Date();
        let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
        let end = moment(start).add(1, "days").subtract(1, "seconds");
        this.state = {
            userDetails: [],
            selectedUserDetails: [],
            loading: false,
            start: start,
            end: end,
            text: '',
            t:''
        }
    }
    componentDidMount() {
        fetch('https://reqres.in/api/users?page=2', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({ userDetails: data.data })
            });
    }
    applyCallback = (startDate, endDate) => {
        var d = new Date(startDate)
        var d1=new Date(endDate)
        this.setState({
            start: startDate,
            end: endDate
        }
        );
    }

    showModal = (id) => {
        fetch(`https://reqres.in/api/users/${id}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    visible: true,
                    selectedUserDetails: data.data
                });
            })

    };

    handleOk = (id,firstName,lastName,email) => {
        const data = { id,firstName, lastName, email};
        fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        console.log('id>',id,firstName,lastName,email);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


    render() {
        const { userDetails, selectedUserDetails, text,t } = this.state;
        console.log('time?', moment.utc(this.state.start).format("DD-MM-yyyy"))
        let now = new Date();
        let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
        let end = moment(start).add(1, "days").subtract(1, "seconds");
        let ranges = {
            "Today Only": [moment(start), moment(end)],
            "Yesterday Only": [moment(start).subtract(1, "days"), moment(end).subtract(1, "days")],
            "3 Days": [moment(start).subtract(3, "days"), moment(end)]
        }
        let local = {
            "format": "DD-MM-YYYY HH:mm",
            "sundayFirst": false
        }
        let maxDate = moment(start).add(24, "hour")
        return (
            <div className="container">
                <input type="text"></input>
                {
                    userDetails.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className="user-details" onClick={this.showModal.bind(this, item.id)} >
                                    <img src={item.avatar} className="avatar" />
                                    <span className="user-name">{item.first_name} {item.last_name}</span>
                                </div>
                                <Modal
                                    title="Basic Modal"
                                    visible={this.state.visible}
                                    onOk={this.handleOk.bind(this, item.id,item.first_name,item.last_name,item.email)}
                                    onCancel={this.handleCancel}
                                >
                                    <div key={index}>
                                        <p>ID : {selectedUserDetails.id}</p>
                                        <p>First Name : {selectedUserDetails.first_name}</p>
                                        <p>Last Name : {selectedUserDetails.last_name}</p>
                                        <p>Email : {selectedUserDetails.email}</p>
                                    </div>
                                    <div>
                                        <DateTimeRangeContainer
                                            ranges={ranges}
                                            start={this.state.start}
                                            end={this.state.end}
                                            local={local}
                                            maxDate={maxDate}
                                            applyCallback={this.applyCallback}
                                        >
                                            <FormControl
                                                id="formControlsTextB"
                                                type="text"
                                                label="Text"
                                                placeholder="Enter text"
                                                value={text}
                                            />
                                        </DateTimeRangeContainer>
                                    </div>
                                </Modal>
                            </div>


                        )
                    })
                }
            </div>
        )

    }
}

export default MainPage