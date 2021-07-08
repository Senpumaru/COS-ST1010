import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab';
import { Box } from '@material-ui/core';

function ErrorScreen() {
    return (
        <Box p={2}>
            <Alert severity="error">
                <AlertTitle>Внимание</AlertTitle>
                Вы пробуете зайти на для вас недоступную страницу или страницу которая не существует.
                <br></br>
                1. В случае если вы здесь по ошибке, вернитесь обратно в главное меню или пройдите авторизацию
                <br></br>
                2. Возможно у вас нет прав на доступ к данному ресурсу, свяжитесь с пользователями высшей категории чтобы получить права на доступ
                <br></br>
                <strong>Постоянные попытки получить доступ к сайту без прав отслеживаются!</strong>
            </Alert>
        </Box>
    )
}

export default ErrorScreen
