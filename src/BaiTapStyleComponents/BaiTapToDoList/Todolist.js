import { ThemeProvider } from 'styled-components'
import { Button } from '../Components/Button'
import { Container } from '../Components/Container'
// import { Dropdown } from '../Components/Dropdown'
import { Heading3 } from '../Components/Heading'
import { TextField } from '../Components/TextField'
import { Table, Thead, Th, Tr } from '../Components/Table'
// import { ToDoListDarkTheme } from '../Theme/ToDoListDarkTheme'
// import { ToDoListLightTheme } from '../Theme/ToDoListLightTheme'
// import { ToDoListPrimaryTheme } from '../Theme/ToDoListPrimaryTheme'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { arrTheme } from '../Theme/ThemeManager'
import { addTaskAction, deleteAction, doneTaskAction, editTaskAction, updateTaskAction } from '../../redux/Action/ToDoListAction'

// import { changeThemeAction} from '../../redux/Action/ToDoListAction'

class Todolist extends Component {

    state = {
        taskName: '',
        disabled: true
    }

    renderTaskToDo = () => {
        return this.props.taskList.filter(task => !task.done).map((task, index) => {
            return <Tr key={index}>
                <Th style={{ verticalAlign: "middle" }} >{task.taskName}</Th>
                <Th className="text-right">
                    <Button onClick={() => {

                        this.setState({
                            disabled: false
                        }, () => {
                            this.props.dispatch(editTaskAction(task))

                        })

                    }} className="ml-1">
                        <i class="fa fa-edit"></i>
                    </Button>

                    <Button onClick={() => {
                        this.props.dispatch(doneTaskAction(task.id))
                    }} className="ml-1" >
                        <i class="fa fa-check"></i>
                    </Button>

                    <Button onClick={() => {
                        this.props.dispatch(deleteAction(task.taskName))
                    }} className="ml-1" >
                        <i class="fa fa-trash-alt"></i>
                    </Button>
                </Th>
            </Tr>
        })
    }

    renderTaskCompleted = () => {
        return this.props.taskList.filter(task => task.done).map((task, index) => {
            return <Tr key={index}>
                <Th style={{ verticalAlign: "middle" }} >{task.taskName}</Th>
                <Th className="text-right">
                    <Button onClick={() => {
                        this.props.dispatch(deleteAction(task.taskName))
                    }} ><i class="fa fa-trash-alt"></i></Button>
                </Th>
            </Tr>
        })
    }

    renderTheme = () => {
        return arrTheme.map((theme, index) => {
            return <option value={theme.id} key={index}>
                {theme.name}
            </option>
        })
    }

    // // Lifecycle b???ng d?????i 16.4 nh???n v??o props m???i ???????c th???c thi tr?????c render

    // componentWillReceiveProps(newProps) {
    //     this.setState({
    //         taskName: newProps.taskEdit.taskName
    //     })
    // }


    // Lifecycle t??nh kh??ng truy xu???t ???????c tr??? this
    // static getDerivedStateFromProps(newProps, currentState) {
    //     // newProps: l?? props m???i, props c?? l?? this.props (kh??ng truy xu???t ???????c)
    //     // CurrentState ???ng v???i state hi???n t???i this.state
    //     // Ho???c tr??? v??? state m???i (this.state)

    //     let newState = { ...currentState, taskName: newProps.taskEdit.taskName }
    //     return newState
    //     //return newState
    //     // tr??? v??? null state gi??? nguy??n
    //     //return null
    // }


    render() {
        return (
            <ThemeProvider theme={this.props.themeToDoList}>
                <Container className="w-50 mt-5" >
                    {/* <Dropdown onChange={(e) => {
                        let { value } = e.target

                        this.props.dispatch(changeThemeAction(value))

                    }}>
                        {this.renderTheme()}
                        
                    </Dropdown> */}
                    {/* <option>Dark theme</option>
                        <option>Light theme</option>
                        <option>Primary theme</option> */}

                    <Heading3>To do list</Heading3>
                    {/* <Lable>Task name</Lable>
                    <br></br>
                    <Input className = "w-50"></Input> */}
                    <TextField value={this.state.taskName} onChange={(e) => {

                        this.setState({
                            taskName: e.target.value
                        }, () => {
                            console.log(this.state)
                        })

                    }} lable="Task name" className="w-50" ></TextField>

                    <Button onClick={() => {
                        let { taskName } = this.state
                        let task = {
                            id: Date.now(),
                            taskName: taskName,
                            done: false
                        }
                        this.props.dispatch(addTaskAction(task))
                    }} className="ml-2"><i class="fa fa-plus"></i> Add task</Button>

                    {this.state.disabled ?
                        <Button disabled onClick={() => {
                            this.props.dispatch(updateTaskAction(this.state.taskName))
                        }} className="ml-2"><i class="fa fa-upload"></i> Update task</Button> :

                        <Button onClick={() => {

                            console.log('taskname', this.state)
                            let {taskName} = this.state

                            this.setState({
                                disabled: true,
                                taskName: ""
                            }, () => {
                                console.log(this.state)
                                console.log(taskName)
                                this.props.dispatch(updateTaskAction(taskName))
                            })
                        }} className="ml-2"><i class="fa fa-upload"></i> Update task</Button>
                    }

                    <hr className="text-dark p-0" style={{ height: "5px" }}></hr>

                    <Heading3>Task to do</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskToDo()}
                            {/* <Tr>
                                <Th style={{ verticalAlign: "middle" }} >task name</Th>
                                <Th className="text-right">
                                    <Button className="ml-1">
                                        <i class="fa fa-edit"></i>
                                    </Button>
                                    <Button className="ml-1" >
                                        <i class="fa fa-check"></i>
                                    </Button>
                                    <Button className="ml-1" >
                                        <i class="fa fa-trash-alt"></i>
                                    </Button>
                                </Th>
                            </Tr>

                            <Tr>
                                <Th style={{ verticalAlign: "middle" }} >task name</Th>
                                <Th className="text-right">
                                    <Button className="ml-1">
                                        <i class="fa fa-edit"></i>
                                    </Button>
                                    <Button className="ml-1" >
                                        <i class="fa fa-check"></i>
                                    </Button>
                                    <Button className="ml-1" >
                                        <i class="fa fa-trash-alt"></i>
                                    </Button>
                                </Th>
                            </Tr> */}
                        </Thead>
                    </Table>

                    <Heading3>Task completed</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskCompleted()}
                            {/* <Tr>
                                <Th style={{ verticalAlign: "middle" }} >task name</Th>
                                <Th className="text-right">
                                    <Button><i class="fa fa-trash-alt"></i></Button>
                                </Th>
                            </Tr>
                            <Tr>
                                <Th style={{ verticalAlign: "middle" }} >task name</Th>
                                <Th className="text-right">
                                    <Button><i class="fa fa-trash-alt"></i></Button>
                                </Th>
                            </Tr> */}
                        </Thead>
                    </Table>

                </Container>

            </ThemeProvider>
        )
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
            this.setState({
                taskName: this.props.taskEdit.taskName
            })
        }


    }
}

const mapStateToProps = (state) => ({
    taskList: state.ToDoListReducer.taskList,
    themeToDoList: state.ToDoListReducer.themeToDoList,
    taskEdit: state.ToDoListReducer.taskEdit,
})

export default connect(mapStateToProps)(Todolist)