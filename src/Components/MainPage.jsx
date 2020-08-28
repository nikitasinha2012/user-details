import React, { Component } from 'react';
import { Card, Modal, Button } from 'antd';
import dateFormat from 'dateformat';
import 'antd/dist/antd.css';
import './MainPage.css';
import "react-datepicker/dist/react-datepicker.css";
import TimeRange from 'react-time-range';
import moment from 'moment';

class MainPage extends Component {
    constructor() {
        super()
        this.state = {
            userDetails: [],
            selectedUserDetails: [],
            visible: false,
            visibleNested: false,
            curTime: new Date(),
            selectedDate: new Date()
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

    showModal = (id) => {
        this.setState({
            visible: true,
            selectedUserDetails: this.state.userDetails.filter((x) => x.id === id),
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
            visibleNested: false
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
            visibleNested: false
        });
    };

    handleChange(event) {
        this.setState({
            selectedDate: event.target.value
        });
    }
    showNestedModal = () => {
        this.setState({
            visibleNested: true
        });
    };


    render() {
        const { userDetails, selectedDate, curTime } = this.state;
        const convertedPresentDate = dateFormat(curTime, "mmm dd yyyy");
        const convertedSelectedDate = dateFormat(selectedDate, "mmm dd yyyy");
        console.log('user detaisl?', userDetails)
        return (
            <div className="container">
                <input type="text" className="input-field" />
                {
                    userDetails.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className="user-details" onClick={this.showModal} >
                                    <img src={item.avatar} className="avatar" />
                                    <span className="user-name">{item.first_name} {item.last_name}</span>
                                </div>
                                <Modal
                                    title="Basic Modal"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                >
                                    <p>ID : {item.id}</p>
                                    <p>First Name: {item.first_name}</p>
                                    <p>Last Name: {item.last_name}</p>
                                    <p>Email : {item.email}</p>
                                    <TimeRange
                                        startMoment={this.state.startTime}
                                        endMoment={this.state.endTime}
                                        onChange={this.returnFunction}
                                    />
                                </Modal>
                            </div>
                        )
                    })
                }

            </div>
        )
    }
}

export default MainPage;
