// import { ToDoListPrimaryTheme } from "../../BaiTapStyleComponents/Theme/ToDoListPrimaryTheme"
import { ADD_TASK, CHANGE_THEME, DELETE_TASK, DONE_TASK, EDIT_TASK, UPDATE_TASK } from "../Type/ToDoListType"
import { arrTheme } from '../../BaiTapStyleComponents/Theme/ThemeManager'
import { ToDoListDarkTheme } from "../../BaiTapStyleComponents/Theme/ToDoListDarkTheme"

const stateDefault = {
    taskList: [
        { id: "task-1", taskName: "task 1", done: true },
        { id: "task-2", taskName: "task 2", done: false },
        { id: "task-3", taskName: "task 3", done: true },
        { id: "task-4", taskName: "task 4", done: false },
    ],
    themeToDoList: ToDoListDarkTheme,
    taskEdit: { id: "-1", taskName: "", done: true },


}

export const ToDoListReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case CHANGE_THEME: {
            let themeChange = arrTheme.find(theme => theme.id === action.themeId)

            if (themeChange) {
                state.themeToDoList = themeChange.theme
            }

            return { ...state }
        }

        case ADD_TASK: {
            let taskListUpdate = [...state.taskList]
            // Kiểm tra rổng
            if (action.newTask.taskName.trim() === "") {
                alert('taskName is required')
                return { ...state }
            }

            // Kiểm tra tồn tại
            let index = taskListUpdate.findIndex(task => task.taskName === action.newTask.taskName)

            if (index !== -1) {
                alert("taskName is exist")
                return { ...state }
            }

            taskListUpdate.push(action.newTask)
            return { ...state, taskList: taskListUpdate }
        }

        case DONE_TASK: {
            let taskListUpdate = [...state.taskList]

            let index = taskListUpdate.findIndex(task => task.id === action.taskId)

            if (index !== -1) {
                taskListUpdate[index].done = true;
            }

            return { ...state, taskList: taskListUpdate }
        }

        case DELETE_TASK: {
            let taskListUpdate = [...state.taskList]
            taskListUpdate = taskListUpdate.filter(task => task.taskName !== action.taskName);

            return { ...state, taskList: taskListUpdate }

        }

        case EDIT_TASK: {
            return { ...state, taskEdit: action.task }
        }

        case UPDATE_TASK : {

            state.taskEdit = {...state.taskEdit, taskName: action.taskName}

            let taskListUpdate = [...state.taskList]

            let index = taskListUpdate.findIndex(task => task.id === state.taskEdit.id)

            if(index !== -1){
                taskListUpdate[index] = state.taskEdit
            }

            state.taskEdit = {id : "-1", taskName: "", done: false}
            // state.taskEdit.id = '-1'
            // state.taskEdit.taskName = ""
            
            return {...state, taskList: taskListUpdate}

        }

        default: return { ...state }

    }
}


