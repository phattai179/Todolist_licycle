import { ADD_TASK, CHANGE_THEME, DELETE_TASK, DONE_TASK, EDIT_TASK, UPDATE_TASK } from "../Type/ToDoListType";

export const changeThemeAction = (themeId) => ({
    type: CHANGE_THEME,
    themeId
})

export const addTaskAction = (newTask) => ({
    type: ADD_TASK,
    newTask
})

export const doneTaskAction = (taskId) => ({
    type: DONE_TASK,
    taskId
}) 

export const deleteAction = (taskName) => ({
    type: DELETE_TASK,
    taskName
})

export const editTaskAction = (task) => ({
    type: EDIT_TASK,
    task
})

export const updateTaskAction = (taskName) => ({
    type: UPDATE_TASK,
    taskName
})